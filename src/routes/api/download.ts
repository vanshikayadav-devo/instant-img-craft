import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/download")({
  server: {
    handlers: {
      GET: async (context) => {
        try {
          const url = new URL(context.request.url);
          const imageUrl = url.searchParams.get("url");
          const filename = url.searchParams.get("filename") || "snapcut-no-bg.png";

          if (!imageUrl) {
            return Response.json({ error: "Missing url parameter" }, { status: 400 });
          }

          // Fetch the image from Cloudinary or webhook url
          const response = await fetch(imageUrl);
          if (!response.ok) {
            return Response.json({ error: "Failed to fetch image" }, { status: 500 });
          }

          const blob = await response.blob();
          const headers = new Headers();
          
          // Force file download by setting Content-Disposition header
          headers.set("Content-Disposition", `attachment; filename="${filename}"`);
          headers.set("Content-Type", response.headers.get("Content-Type") || "image/png");

          return new Response(blob, {
            status: 200,
            headers,
          });
        } catch (error) {
          console.error("Download proxy error:", error);
          return Response.json({ error: "Internal server error" }, { status: 500 });
        }
      },
    },
  },
});
