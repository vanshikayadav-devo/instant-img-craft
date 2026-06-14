import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
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
 * Generate a demo transparent image to show background removal effect
 */
function generateDemoTransparentImage(imageData: ImageData): string {
  // For demo: Create a visual representation showing the background is removed
  // The original image is shown but we'll create a masked/extracted version
  
  // Strategy: Create an SVG that shows the same image content but on transparent background
  // using an image element with opacity effect to simulate background removal
  
  const svgData = `
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:rgba(100,150,255,0.9);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgba(50,100,200,0.3);stop-opacity:1" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <!-- Transparent background (checkerboard pattern will show through) -->
      <!-- Subject: Gradient circle representing the extracted subject -->
      <circle cx="200" cy="200" r="120" fill="url(#grad1)" filter="url(#glow)" opacity="0.95"/>
      <!-- Inner highlight to show dimension -->
      <circle cx="200" cy="200" r="100" fill="rgba(150,180,255,0.4)"/>
      <!-- Subtle shadow for depth -->
      <circle cx="200" cy="220" r="90" fill="rgba(20,50,120,0.15)"/>
    </svg>
  `;
  
  // Encode SVG as data URL
  const encodedSvg = encodeURIComponent(svgData.trim());
  return `data:image/svg+xml;utf8,${encodedSvg}`;
}

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

      // Check if using real Cloudinary or demo mode
      const isDemo = !cloudName || cloudName.includes("your_") || !apiKey || apiKey.includes("your_");

      // Send binary image data to webhook; n8n returns a Cloudinary URL (JSON or plain text), not binary PNG
      let webhookImageUrl: string | null = null;
      if (webhookUrl) {
        try {
          webhookImageUrl = await sendToWebhook(
            buffer,
            imageData.name,
            imageData.type,
            webhookUrl,
            requestId,
            callbackUrl,
          );
          if (webhookImageUrl) {
            storeResult(requestId, webhookImageUrl);
            console.log(`✅ Webhook returned image URL: ${webhookImageUrl}`);
          }
        } catch (err) {
          console.error("Failed to send image to webhook:", err);
        }
      }

      if (isDemo) {
        console.log("📦 DEMO MODE: Processing image...");
        console.log(`📷 Image: ${imageData.name} (${(buffer.length / 1024).toFixed(2)} KB)`);
        console.log(`📡 Webhook: ${webhookUrl ? "✅ Request sent" : "⚠️ No webhook configured"}`);
        console.log(`📋 Request ID: ${requestId}`);
        console.log(`🔗 Callback URL: ${callbackUrl}`);

        const endTime = Date.now();
        const processingTime = ((endTime - startTime) / 1000).toFixed(1);

        // Webhook returned a Cloudinary URL directly — use it, do not poll or use demo placeholder
        if (webhookImageUrl) {
          return {
            success: true,
            imageUrl: webhookImageUrl,
            requestId,
            polling: false,
            processingTime: `${processingTime} sec`,
          } as RemoveBgResponse;
        }

        // Webhook configured but async (n8n will POST to callback) — poll for real URL
        if (webhookUrl) {
          return {
            success: true,
            requestId,
            polling: true,
            processingTime: `${processingTime} sec`,
          } as RemoveBgResponse;
        }

        // No webhook — local demo placeholder only
        const demoResultUrl = generateDemoTransparentImage(imageData);
        storeResult(requestId, demoResultUrl);

        return {
          success: true,
          imageUrl: demoResultUrl,
          requestId,
          polling: false,
          processingTime: `${processingTime} sec (demo mode)`,
        } as RemoveBgResponse;
      }

      // PRODUCTION MODE - Use real Cloudinary
      if (!cloudName || !apiKey || !apiSecret) {
        throw new Error("Cloudinary credentials not configured. Please set VITE_CLOUDINARY_CLOUD_NAME, VITE_CLOUDINARY_API_KEY, and VITE_CLOUDINARY_API_SECRET in .env.local");
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
 * Extract a hosted image URL from webhook response.
 * n8n returns JSON like { url: "https://res.cloudinary.com/..." } or a plain URL string — not binary PNG.
 */
async function extractImageUrlFromWebhookResponse(response: Response): Promise<string | null> {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const data = (await response.json()) as Record<string, unknown>;
    const candidate =
      data.url ?? data.imageUrl ?? data.secure_url ?? data.image_url ?? data.output;
    if (typeof candidate === "string" && /^https?:\/\//.test(candidate)) {
      return candidate;
    }
    return null;
  }

  const text = (await response.text()).trim();
  if (/^https?:\/\//.test(text)) {
    return text;
  }

  return null;
}

/**
 * Send binary image data to webhook and return any image URL in the response body.
 */
async function sendToWebhook(
  buffer: Buffer,
  fileName: string,
  fileType: string,
  webhookUrl: string,
  requestId: string,
  callbackUrl: string
): Promise<string | null> {
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
    return null;
  }

  return extractImageUrlFromWebhookResponse(response);
}
