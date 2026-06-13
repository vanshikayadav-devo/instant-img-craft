import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { extractImageUrl } from "@/lib/api/image-url";
import { storeResult } from "@/lib/api/webhook-results";

export const Route = createFileRoute("/api/webhook/callback")({
  server: {
    handlers: {
      POST: async (context) => {
        try {
          const req = context.request;
          const payload = await readWebhookPayload(req);
          const requestId =
            extractTextValue(payload, ["requestId", "requestID", "id"]) ||
            req.headers.get("x-request-id");
          const imageUrl = extractImageUrl(payload);

          if (!requestId || !imageUrl) {
            return Response.json(
              {
                success: false,
                error: "Missing requestId or image URL",
              },
              { status: 400 },
            );
          }

          storeResult(requestId, imageUrl);
          console.log(`Webhook callback received - Request: ${requestId}, URL: ${imageUrl}`);

          return Response.json({
            success: true,
            message: "Result stored successfully",
            requestId,
            url: imageUrl,
          });
        } catch (error) {
          console.error("Webhook callback error:", error);
          return Response.json(
            {
              success: false,
              error: "Failed to process callback",
            },
            { status: 500 },
          );
        }
      },
    },
  },
});

async function readWebhookPayload(req: Request): Promise<unknown> {
  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return req.json();
  }

  const text = await req.text();
  if (!text.trim()) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function getText(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function extractTextValue(value: unknown, keys: string[]): string | null {
  const direct = getText(value);
  if (direct) {
    return direct;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const result = extractTextValue(item, keys);
      if (result) return result;
    }
    return null;
  }

  if (!value || typeof value !== "object") {
    return null;
  }

  const record = value as Record<string, unknown>;

  for (const key of keys) {
    const result = getText(record[key]);
    if (result) return result;
  }

  for (const item of Object.values(record)) {
    const result = extractTextValue(item, keys);
    if (result) return result;
  }

  return null;
}
