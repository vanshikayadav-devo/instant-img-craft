import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { storeResult } from "@/lib/api/webhook-results";

export const Route = createFileRoute("/api/webhook/callback")({
  server: {
    handlers: {
      POST: async (context) => {
        try {
          const req = context.request;
          const data = await req.json() as { requestId?: string; url?: string };

          if (!data.requestId || !data.url) {
            return new Response(
              JSON.stringify({
                success: false,
                error: "Missing requestId or url",
              }),
              {
                status: 400,
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          // Store the result
          storeResult(data.requestId, data.url);

          console.log(`✅ Webhook callback received - Request: ${data.requestId}, URL: ${data.url}`);

          return new Response(
            JSON.stringify({
              success: true,
              message: "Result stored successfully",
              requestId: data.requestId,
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            }
          );
        } catch (error) {
          console.error("Webhook callback error:", error);
          return new Response(
            JSON.stringify({
              success: false,
              error: "Failed to process callback",
            }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      },
    },
  },
});
