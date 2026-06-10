import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, RefreshCw, Loader2, ImageOff } from "lucide-react";
import { UploadDropzone } from "@/components/site/UploadDropzone";
import { BeforeAfterSlider } from "@/components/site/BeforeAfterSlider";
import { removeBackground } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Remove Background — SnapCut AI" },
      { name: "description", content: "Upload an image and let SnapCut AI remove the background instantly. Download a transparent PNG." },
      { property: "og:title", content: "Remove Background — SnapCut AI" },
      { property: "og:description", content: "Upload, process, download. AI background removal in seconds." },
      { property: "og:url", content: "/app" },
    ],
    links: [{ rel: "canonical", href: "/app" }],
  }),
  component: AppPage,
});

type Status = "idle" | "loading" | "success" | "error";

function AppPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  async function handleFile(file: File) {
    setStatus("loading");
    setOriginalUrl(URL.createObjectURL(file));
    setResultUrl(null);
    try {
      const res = await removeBackground(file);
      if (!res.success) throw new Error("Failed");
      setResultUrl(res.imageUrl);
      setTime(res.processingTime ?? null);
      setStatus("success");
      toast.success("Background removed");
    } catch (err) {
      console.error(err);
      setStatus("error");
      toast.error("Something went wrong. Try again.");
    }
  }

  function reset() {
    setStatus("idle");
    setOriginalUrl(null);
    setResultUrl(null);
    setTime(null);
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold">Remove background</h1>
        <p className="mt-2 text-muted-foreground">Upload an image and we'll do the rest.</p>
      </div>

      <div className="mt-10">
        {status === "idle" && <UploadDropzone onFile={handleFile} />}

        {status === "loading" && (
          <div className="rounded-3xl border border-border bg-card p-16 text-center shadow-[var(--shadow-soft)]">
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
            <h3 className="mt-5 text-lg font-semibold">Removing background…</h3>
            <p className="mt-1 text-sm text-muted-foreground">Our AI is isolating your subject.</p>
          </div>
        )}

        {status === "error" && (
          <div className="rounded-3xl border border-destructive/30 bg-destructive/5 p-12 text-center">
            <ImageOff className="mx-auto h-10 w-10 text-destructive" />
            <h3 className="mt-4 text-lg font-semibold">Processing failed</h3>
            <p className="mt-1 text-sm text-muted-foreground">Please try with a different image.</p>
            <button
              onClick={reset}
              className="mt-6 inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-medium text-white gradient-bg"
            >
              <RefreshCw className="h-4 w-4" /> Try again
            </button>
          </div>
        )}

        {status === "success" && originalUrl && resultUrl && (
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <BeforeAfterSlider beforeSrc={originalUrl} afterSrc={resultUrl} />
            <div className="rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)]">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Result</div>
              <h3 className="mt-1 text-xl font-semibold">Background removed</h3>
              {time && <p className="mt-1 text-sm text-muted-foreground">Processed in {time}</p>}
              <div className="mt-6 flex flex-col gap-2">
                <a
                  href={resultUrl}
                  download="snapcut-ai.png"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-white gradient-bg shadow-[var(--shadow-glow)] hover:opacity-95 transition-opacity"
                >
                  <Download className="h-4 w-4" /> Download PNG
                </a>
                <button
                  onClick={reset}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border px-5 text-sm font-medium hover:bg-accent transition-colors"
                >
                  <RefreshCw className="h-4 w-4" /> Upload another
                </button>
              </div>
              <div className="mt-6 rounded-xl border border-border bg-muted/40 p-4 text-xs text-muted-foreground">
                Free plan includes 5 images/day with a small watermark.{" "}
                <a href="/pricing" className="gradient-text font-medium">Upgrade to Pro</a> for HD output without watermark.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
