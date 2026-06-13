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

      // Decode base64 to buffer
      const buffer = Buffer.from(imageData.base64, 'base64');

      // Send binary image data to webhook (fire and forget, non-blocking)
      if (webhookUrl) {
        sendToWebhook(buffer, imageData.name, imageData.type, webhookUrl, requestId, callbackUrl).catch((err) => {
          console.error("Failed to send image to webhook:", err);
        });
      }

      // Check if using real Cloudinary or demo mode
      const isDemo = !cloudName || cloudName.includes("your_") || !apiKey || apiKey.includes("your_");

      if (isDemo) {
        // DEMO MODE - Simulate background removal with transparent version
        console.log("📦 DEMO MODE: Processing image...");
        console.log(`📷 Image: ${imageData.name} (${(buffer.length / 1024).toFixed(2)} KB)`);
        console.log(`📡 Webhook: ${webhookUrl ? "✅ Binary data sent" : "⚠️ No webhook configured"}`);
        console.log(`📋 Request ID: ${requestId}`);
        console.log(`🔗 Callback URL: ${callbackUrl}`);
        
        // Generate transparent PNG with subject (demo simulation)
        const demoResultUrl = generateDemoTransparentImage(imageData);
        
        // Store result immediately for demo (in production, n8n will do this)
        storeResult(requestId, demoResultUrl);
        console.log(`✅ Demo result with transparent background ready`);
        
        const endTime = Date.now();
        const processingTime = ((endTime - startTime) / 1000).toFixed(1);

        // Return request ID for polling
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
 * Send binary image data to webhook
 */
async function sendToWebhook(
  buffer: Buffer,
  fileName: string,
  fileType: string,
  webhookUrl: string,
  requestId: string,
  callbackUrl: string
): Promise<void> {
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": fileType,
        "X-Image-Name": fileName,
        "X-Image-Type": fileType,
        "X-Image-Size": buffer.length.toString(),
        "X-Request-ID": requestId,
        "X-Callback-URL": callbackUrl,
      },
      body: buffer,
    });

    if (!response.ok) {
      console.warn(
        `Webhook request failed with status ${response.status}: ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error sending image to webhook:", error);
  }

  return extractImageUrlFromWebhookResponse(response);
}
