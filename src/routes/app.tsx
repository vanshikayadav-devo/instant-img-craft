import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Download, RefreshCw, Loader2, ImageOff, Coins } from "lucide-react";
import { UploadDropzone } from "@/components/site/UploadDropzone";
import { removeBackground } from "@/lib/api";
import { getProcessedImageUrl } from "@/lib/api/get-result.server";
import { toast } from "sonner";
import {
  DAILY_FREE_CREDITS,
  MAX_CREDITS_PER_IMAGE,
  canAfford,
  consume,
  estimateCost,
  getRemaining,
} from "@/lib/credits";

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
  const [remaining, setRemaining] = useState<number>(DAILY_FREE_CREDITS);
  const [lastCost, setLastCost] = useState<number | null>(null);

  useEffect(() => {
    setRemaining(getRemaining());
  }, []);

  async function handleFile(file: File) {
    const cost = estimateCost(file.size);
    if (!canAfford(cost)) {
      toast.error(
        `Not enough credits. This image costs ${cost}, you have ${getRemaining()} left today.`,
      );
      return;
    }
    setLastCost(cost);
    setStatus("loading");
    setOriginalUrl(URL.createObjectURL(file));
    setResultUrl(null);
    try {
      const res = await removeBackground(file);
      if (!res.success) throw new Error("Failed");
      
      const left = consume(cost);
      setRemaining(left);
      
      // If polling is required (webhook processing)
      if (res.polling && res.requestId) {
        console.log("⏳ Polling for webhook result...", res.requestId);
        setTime(res.processingTime ?? null);
        
        // Poll for result
        let pollingAttempts = 0;
        const maxAttempts = 60; // 2 minutes timeout (60 * 2 seconds)
        
        const pollInterval = setInterval(async () => {
          pollingAttempts++;
          
          try {
            const result = await getProcessedImageUrl({ data: { requestId: res.requestId! } });
            
            if (result.found && result.url) {
              clearInterval(pollInterval);
              setResultUrl(result.url);
              setStatus("success");
              toast.success("Background removed");
              console.log("✅ Result received from webhook:", result.url);
            } else if (pollingAttempts >= maxAttempts) {
              clearInterval(pollInterval);
              setStatus("error");
              toast.error("Processing timeout. Please try again.");
            }
          } catch (err) {
            console.error("Polling error:", err);
            if (pollingAttempts >= maxAttempts) {
              clearInterval(pollInterval);
              setStatus("error");
              toast.error("Processing failed. Please try again.");
            }
          }
        }, 2000); // Poll every 2 seconds
      } else {
        // Direct result (demo or immediate processing)
        setResultUrl(res.imageUrl || null);
        setTime(res.processingTime ?? null);
        setStatus("success");
        toast.success("Background removed");
      }
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

      <div className="mt-6 mx-auto max-w-2xl rounded-2xl border border-border bg-card/60 p-4 flex items-center justify-between gap-4 shadow-[var(--shadow-soft)]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl gradient-bg flex items-center justify-center">
            <Coins className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold">{remaining} / {DAILY_FREE_CREDITS} credits left today</div>
            <div className="text-xs text-muted-foreground">
              Each image costs 5–{MAX_CREDITS_PER_IMAGE} credits based on file size. Resets daily.
            </div>
          </div>
        </div>
        <div className="hidden sm:block h-2 w-32 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full gradient-bg transition-all"
            style={{ width: `${(remaining / DAILY_FREE_CREDITS) * 100}%` }}
          />
        </div>
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
          <div className="grid gap-8">
            {/* Before and After Images Side by Side */}
            <div className="grid grid-cols-2 gap-6">
              {/* Before */}
              <div className="rounded-2xl border border-border overflow-hidden bg-muted">
                <img 
                  src={originalUrl} 
                  alt="Original" 
                  className="w-full h-auto object-cover max-h-96"
                />
                <div className="p-3 text-center text-xs font-medium text-muted-foreground">Before</div>
              </div>
              {/* After */}
              <div className="rounded-2xl border border-border overflow-hidden bg-muted">
                <img 
                  src={resultUrl} 
                  alt="Background removed" 
                  className="w-full h-auto object-cover max-h-96"
                />
                <div className="p-3 text-center text-xs font-medium text-muted-foreground">After</div>
              </div>
            </div>
            
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
                Used <span className="font-semibold text-foreground">{lastCost}</span> credits ·{" "}
                <span className="font-semibold text-foreground">{remaining}</span> left today.{" "}
                <a href="/pricing" className="gradient-text font-medium">Upgrade to Pro</a> for unlimited HD removals.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
