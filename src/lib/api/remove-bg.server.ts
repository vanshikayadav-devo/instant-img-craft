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
 * Server-side function to remove background using Cloudinary API
 */
export const removeBackgroundServer = createServerFn({ method: "POST" })
  .validator(ImageDataSchema)
  .handler(async ({ data: imageData }) => {
    try {
      const startTime = Date.now();
      
      // Generate unique request ID
      const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const callbackUrl = `${process.env.VITE_APP_URL || "http://localhost:8080"}/api/webhook/callback`;
      
      const cloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME;
      const apiKey = process.env.VITE_CLOUDINARY_API_KEY;
      const apiSecret = process.env.VITE_CLOUDINARY_API_SECRET;
      const webhookUrl = process.env.VITE_WEBHOOK_URL;

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
          requestId,
          polling: true,
          processingTime: `${processingTime} sec (demo mode)`,
        } as RemoveBgResponse;
      }

      // PRODUCTION MODE - Use real Cloudinary
      if (!cloudName || !apiKey || !apiSecret) {
        throw new Error("Cloudinary credentials not configured. Please set VITE_CLOUDINARY_CLOUD_NAME, VITE_CLOUDINARY_API_KEY, and VITE_CLOUDINARY_API_SECRET in .env.local");
      }

      // Create FormData for upload
      const formData = new FormData();
      formData.append("file", new Blob([buffer], { type: imageData.type }));
      formData.append("api_key", apiKey);
      formData.append("transformation", JSON.stringify([
        {
          effect: "background_removal",
          quality: "auto",
        },
      ]));

      // Upload to Cloudinary
      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Cloudinary upload failed: ${error.error?.message || response.statusText}`);
      }

      const result = await response.json() as any;
      const endTime = Date.now();
      const processingTime = ((endTime - startTime) / 1000).toFixed(1);

      return {
        success: true,
        imageUrl: result.secure_url,
        processingTime: `${processingTime} sec`,
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
}
