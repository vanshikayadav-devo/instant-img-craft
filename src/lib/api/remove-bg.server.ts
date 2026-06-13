import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { extractImageUrl } from "./image-url";
import { storeResult } from "./webhook-results";

export interface RemoveBgResponse {
  success: boolean;
  imageUrl?: string;
  processingTime?: string;
  requestId?: string;
  polling?: boolean;
}

const ImageDataSchema = z.object({
  base64: z.string(),
  name: z.string(),
  type: z.string(),
  size: z.number(),
});

type ImageData = z.infer<typeof ImageDataSchema>;

const N8N_WEBHOOK_URL = "https://vanshika-devo.app.n8n.cloud/webhook/remove-background";

/**
 * Server-side function to remove background using Cloudinary or the configured webhook.
 */
export const removeBackgroundServer = createServerFn({ method: "POST" })
  .validator(ImageDataSchema)
  .handler(async ({ data: imageData }) => {
    try {
      const startTime = Date.now();
      const requestId = `req_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
      const callbackUrl = `${process.env.VITE_APP_URL || "http://localhost:8080"}/api/webhook/callback`;

      const cloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME;
      const apiKey = process.env.VITE_CLOUDINARY_API_KEY;
      const apiSecret = process.env.VITE_CLOUDINARY_API_SECRET;
      const webhookUrl = process.env.VITE_WEBHOOK_URL || N8N_WEBHOOK_URL;

      const buffer = Buffer.from(imageData.base64, "base64");
      const hasCloudinaryConfig = Boolean(
        cloudName &&
        !cloudName.includes("your_") &&
        apiKey &&
        !apiKey.includes("your_") &&
        apiSecret &&
        !apiSecret.includes("your_"),
      );

      if (!hasCloudinaryConfig) {
        if (!webhookUrl) {
          throw new Error(
            "No background-removal service configured. Set VITE_WEBHOOK_URL or Cloudinary credentials in .env.local.",
          );
        }

        console.log("Webhook mode: sending image for background removal...");
        console.log(`Image: ${imageData.name} (${(buffer.length / 1024).toFixed(2)} KB)`);
        console.log(`Request ID: ${requestId}`);
        console.log(`Callback URL: ${callbackUrl}`);

        const webhookResultUrl = await sendToWebhook(
          buffer,
          imageData.name,
          imageData.type,
          webhookUrl,
          requestId,
          callbackUrl,
        );

        const processingTime = `${((Date.now() - startTime) / 1000).toFixed(1)} sec`;

        console.log("Request success: n8n returned a processed image URL");
        console.log("Final image URL:", webhookResultUrl);
        storeResult(requestId, webhookResultUrl);
        return {
          success: true,
          imageUrl: webhookResultUrl,
          requestId,
          polling: false,
          processingTime,
        } as RemoveBgResponse;
      }

      const formData = new FormData();
      formData.append("file", new Blob([buffer], { type: imageData.type }));
      formData.append("api_key", apiKey!);
      formData.append(
        "transformation",
        JSON.stringify([
          {
            effect: "background_removal",
            quality: "auto",
          },
        ]),
      );

      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Cloudinary upload failed: ${error.error?.message || response.statusText}`);
      }

      const result = (await response.json()) as { secure_url?: string };
      if (!result.secure_url) {
        throw new Error("Cloudinary did not return a processed image URL.");
      }

      return {
        success: true,
        imageUrl: result.secure_url,
        processingTime: `${((Date.now() - startTime) / 1000).toFixed(1)} sec`,
        polling: false,
      } as RemoveBgResponse;
    } catch (error) {
      console.error("Background removal error:", error);
      throw error;
    }
  });

/**
 * Send image data to the webhook. The n8n Webhook node handles multipart uploads
 * more reliably than raw request bodies, so the file and metadata are sent as form fields.
 */
async function sendToWebhook(
  buffer: Buffer,
  fileName: string,
  fileType: string,
  webhookUrl: string,
  requestId: string,
  callbackUrl: string,
): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("file", new Blob([buffer], { type: fileType }), fileName);
    formData.append("requestId", requestId);
    formData.append("callbackUrl", callbackUrl);
    formData.append("fileName", fileName);
    formData.append("fileType", fileType);
    formData.append("fileSize", buffer.length.toString());

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "X-Image-Name": fileName,
        "X-Image-Type": fileType,
        "X-Image-Size": buffer.length.toString(),
        "X-Request-ID": requestId,
        "X-Callback-URL": callbackUrl,
      },
      body: formData,
    });

    console.log("Webhook request completed:", {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Webhook error response:", errorBody);
      throw new Error(
        `Webhook request failed with status ${response.status}: ${response.statusText}`,
      );
    }

    const contentType = response.headers.get("content-type") || "";

    if (contentType.startsWith("image/")) {
      const imageBuffer = Buffer.from(await response.arrayBuffer());
      const imageUrl = `data:${contentType};base64,${imageBuffer.toString("base64")}`;
      console.log("Webhook response: image binary");
      console.log("Final image URL:", imageUrl);
      return imageUrl;
    }

    if (contentType.includes("application/json")) {
      const data = (await response.json()) as { url?: unknown };
      console.log("Webhook response:", data);

      const imageUrl = typeof data.url === "string" ? data.url.trim() : "";
      if (!imageUrl) {
        console.error("Webhook JSON is missing data.url:", data);
        throw new Error('Webhook response did not include a valid "url" field.');
      }

      console.log("Final image URL:", imageUrl);
      return imageUrl;
    }

    const responseText = await response.text();
    console.log("Webhook response:", responseText);

    if (!responseText.trim()) {
      console.error("Webhook returned an empty response body.");
      throw new Error(
        'Webhook returned an empty response body. Make sure the n8n Respond to Webhook node returns JSON like { "url": "https://.../result.png" }.',
      );
    }

    const imageUrl = extractImageUrl(responseText);
    if (!imageUrl) {
      console.error("Webhook response did not include a usable image URL:", responseText);
      throw new Error('Webhook response did not include a valid "url" field.');
    }

    console.log("Final image URL:", imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("Error sending image to webhook:", error);
    throw error;
  }
}
