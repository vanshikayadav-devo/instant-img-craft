import { c as createServerRpc } from "./createServerRpc-BFe2SfXJ.mjs";
import { a as createServerFn } from "./server-Bnk2je-q.mjs";
import { s as storeResult } from "./webhook-results-xKR3EnNR.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, n as numberType, s as stringType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const ImageDataSchema = objectType({
  base64: stringType(),
  name: stringType(),
  type: stringType(),
  size: numberType()
});
const N8N_WEBHOOK_URL = "https://vanshika-devo.app.n8n.cloud/webhook/remove-background";
function generateDemoTransparentImage(imageData) {
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
  const encodedSvg = encodeURIComponent(svgData.trim());
  return `data:image/svg+xml;utf8,${encodedSvg}`;
}
const removeBackgroundServer_createServerFn_handler = createServerRpc({
  id: "9277ff05e4ed7bb93dcc50c07d49074d2c32ad187e0b1bd2e1c50b357289d897",
  name: "removeBackgroundServer",
  filename: "src/lib/api/remove-bg.server.ts"
}, (opts) => removeBackgroundServer.__executeServer(opts));
const removeBackgroundServer = createServerFn({
  method: "POST"
}).validator(ImageDataSchema).handler(removeBackgroundServer_createServerFn_handler, async ({
  data: imageData
}) => {
  try {
    const startTime = Date.now();
    const requestId = `req_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    const callbackUrl = `${process.env.VITE_APP_URL || "http://localhost:8080"}/api/webhook/callback`;
    const cloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.VITE_CLOUDINARY_API_KEY;
    const apiSecret = process.env.VITE_CLOUDINARY_API_SECRET;
    const webhookUrl = process.env.VITE_WEBHOOK_URL || N8N_WEBHOOK_URL;
    const buffer = Buffer.from(imageData.base64, "base64");
    const isDemo = !cloudName || cloudName.includes("your_") || !apiKey || apiKey.includes("your_");
    let webhookImageUrl = null;
    if (webhookUrl) {
      try {
        webhookImageUrl = await sendToWebhook(buffer, imageData.name, imageData.type, webhookUrl, requestId, callbackUrl);
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
      const processingTime = ((endTime - startTime) / 1e3).toFixed(1);
      if (webhookImageUrl) {
        return {
          success: true,
          imageUrl: webhookImageUrl,
          requestId,
          polling: false,
          processingTime: `${processingTime} sec`
        };
      }
      if (webhookUrl) {
        return {
          success: true,
          requestId,
          polling: true,
          processingTime: `${processingTime} sec`
        };
      }
      const demoResultUrl = generateDemoTransparentImage(imageData);
      storeResult(requestId, demoResultUrl);
      return {
        success: true,
        imageUrl: demoResultUrl,
        requestId,
        polling: false,
        processingTime: `${processingTime} sec (demo mode)`
      };
    }
    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error("Cloudinary credentials not configured. Please set VITE_CLOUDINARY_CLOUD_NAME, VITE_CLOUDINARY_API_KEY, and VITE_CLOUDINARY_API_SECRET in .env.local");
    }
    const formData = new FormData();
    formData.append("file", new Blob([buffer], {
      type: imageData.type
    }));
    formData.append("api_key", apiKey);
    formData.append("transformation", JSON.stringify([{
      effect: "background_removal",
      quality: "auto"
    }]));
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const response = await fetch(uploadUrl, {
      method: "POST",
      body: formData
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Cloudinary upload failed: ${error.error?.message || response.statusText}`);
    }
    const result = await response.json();
    if (!result.secure_url) {
      throw new Error("Cloudinary did not return a processed image URL.");
    }
    return {
      success: true,
      imageUrl: result.secure_url,
      processingTime: `${((Date.now() - startTime) / 1e3).toFixed(1)} sec`,
      polling: false
    };
  } catch (error) {
    console.error("Background removal error:", error);
    throw error;
  }
});
async function extractImageUrlFromWebhookResponse(response) {
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const data = await response.json();
    const candidate = data.url ?? data.imageUrl ?? data.secure_url ?? data.image_url ?? data.output;
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
async function sendToWebhook(buffer, fileName, fileType, webhookUrl, requestId, callbackUrl) {
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": fileType,
      "X-Image-Name": fileName,
      "X-Image-Type": fileType,
      "X-Image-Size": buffer.length.toString(),
      "X-Request-ID": requestId,
      "X-Callback-URL": callbackUrl
    },
    body: buffer
  });
  if (!response.ok) {
    console.warn(`Webhook request failed with status ${response.status}: ${response.statusText}`);
    return null;
  }
  return extractImageUrlFromWebhookResponse(response);
}
export {
  removeBackgroundServer_createServerFn_handler
};
