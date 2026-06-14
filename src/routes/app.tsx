import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Download, RefreshCw, Loader2, ImageOff, Coins, Trash2, ShieldAlert } from "lucide-react";
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
  getIsPro,
  setIsPro,
} from "@/lib/credits";
import { initializePayment } from "@/lib/razorpay";


export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Remove Background — SnapCut AI" },
      {
        name: "description",
        content:
          "Upload an image and let SnapCut AI remove the background instantly. Download a transparent PNG.",
      },
      { property: "og:title", content: "Remove Background — SnapCut AI" },
      {
        property: "og:description",
        content: "Upload, process, download. AI background removal in seconds.",
      },
      { property: "og:url", content: "/app" },
    ],
    links: [{ rel: "canonical", href: "/app" }],
  }),
  component: AppPage,
});

type Status = "idle" | "loading" | "success" | "error";

interface HistoryItem {
  id: string;
  fileName: string;
  resultUrl: string;
  timestamp: number;
  processingTime?: string | null;
  fileSize?: number;
}

function formatBytes(bytes: number, decimals = 1) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

function AppPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultImageError, setResultImageError] = useState(false);
  const [time, setTime] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPro, setIsProState] = useState(false);
  const [remaining, setRemaining] = useState<number>(DAILY_FREE_CREDITS);
  const [lastCost, setLastCost] = useState<number | null>(null);
  const [fileName, setFileName] = useState<string>("snapcut.png");

  const [activeTab, setActiveTab] = useState<"remove" | "history">("remove");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setRemaining(getRemaining());
    setIsProState(getIsPro());

    const handleUpdate = () => {
      setRemaining(getRemaining());
      setIsProState(getIsPro());
    };

    window.addEventListener("creditsUpdated", handleUpdate);

    // Load history from localStorage
    const stored = localStorage.getItem("snapcut_history");
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }

    return () => {
      window.removeEventListener("creditsUpdated", handleUpdate);
    };
  }, []);


  const addToHistory = (
    resultUrl: string,
    fileName: string,
    fileSize?: number,
    procTime?: string | null,
  ) => {
    const newItem: HistoryItem = {
      id: `hist_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      fileName,
      resultUrl,
      timestamp: Date.now(),
      processingTime: procTime,
      fileSize,
    };

    setHistory((prev) => {
      const updated = [newItem, ...prev].slice(0, 50);
      localStorage.setItem("snapcut_history", JSON.stringify(updated));
      return updated;
    });
  };

  const deleteFromHistory = (id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("snapcut_history", JSON.stringify(updated));
      return updated;
    });
    toast.success("Removed from history");
  };

  const clearAllHistory = () => {
    if (confirm("Are you sure you want to clear your entire history?")) {
      setHistory([]);
      localStorage.removeItem("snapcut_history");
      toast.success("History cleared");
    }
  };

  function viewFromHistory(item: HistoryItem) {
    setResultUrl(item.resultUrl);
    setOriginalUrl(item.resultUrl);
    setFileName(item.fileName);
    setResultImageError(false);
    setTime(item.processingTime ?? null);
    setStatus("success");
    setActiveTab("remove");
  }

  async function handleFile(file: File) {
    const cost = estimateCost(file.size);
    if (!canAfford(cost)) {
      toast("Not enough credits", {
        description: `This image costs ${cost} credits, and you have ${getRemaining()} left today. Upgrade to Pro for unlimited access.`,
        action: {
          label: "Upgrade for ₹299",
          onClick: async () => {
            try {
              await initializePayment({
                amount: 299,
                onSuccess: (paymentId) => {
                  setIsPro(true);
                  toast.success("Upgrade successful! You now have unlimited credits.");
                },
                onFailure: (err) => {
                  toast.error(err instanceof Error ? err.message : "Payment failed");
                }
              });
            } catch (err) {
              console.error(err);
            }
          }
        },
        duration: 10000,
      });
      return;
    }
    setLastCost(cost);
    setFileName(file.name);
    setStatus("loading");
    setOriginalUrl(URL.createObjectURL(file));
    setResultUrl(null);
    setResultImageError(false);
    setErrorMessage(null);
    try {
      const res = await removeBackground(file);
      console.log("Background removal API response:", res);
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
              setResultImageError(false);
              setStatus("success");
              toast.success("Background removed");
              console.log("✅ Result received from webhook:", result.url);
              addToHistory(result.url, file.name, file.size, res.processingTime);
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
        if (!res.imageUrl) {
          throw new Error("No processed image URL returned");
        }

        // Direct result from the background-removal service
        console.log("Final image URL:", res.imageUrl);
        setResultUrl(res.imageUrl);
        setResultImageError(false);
        setTime(res.processingTime ?? null);
        setStatus("success");
        toast.success("Background removed");
        addToHistory(res.imageUrl, file.name, file.size, res.processingTime);
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      const message = err instanceof Error ? err.message : "Something went wrong. Try again.";
      setErrorMessage(message);
      toast.error(message);
    }
  }

  function reset() {
    setStatus("idle");
    setOriginalUrl(null);
    setResultUrl(null);
    setResultImageError(false);
    setTime(null);
    setErrorMessage(null);
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold font-heading">Remove background</h1>
        <p className="mt-2 text-muted-foreground">Upload an image and we'll do the rest.</p>
      </div>

      <div className="mt-6 mx-auto max-w-2xl rounded-2xl border border-border bg-card/60 p-4 flex items-center justify-between gap-4 shadow-[var(--shadow-soft)]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl gradient-bg flex items-center justify-center">
            <Coins className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold">
              {remaining} / {DAILY_FREE_CREDITS} credits left today
            </div>
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

      {/* Tabs Control */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex rounded-full bg-muted/60 p-1 border border-border/40 backdrop-blur-[4px]">
          <button
            onClick={() => setActiveTab("remove")}
            className={`rounded-full px-6 py-2 text-sm font-medium transition-all cursor-pointer ${
              activeTab === "remove"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Remove Background
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`rounded-full px-6 py-2 text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "history"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            History
            {history.length > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white transition-transform duration-300 scale-100">
                {history.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="mt-10">
        {activeTab === "remove" && (
          <>
            {status === "idle" && <UploadDropzone onFile={handleFile} />}

            {status === "loading" && (
              <div className="rounded-3xl border border-border bg-card p-16 text-center shadow-[var(--shadow-soft)]">
                <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
                <h3 className="mt-5 text-lg font-semibold animate-pulse">Removing background…</h3>
                <p className="mt-1 text-sm text-muted-foreground">Our AI is isolating your subject.</p>
              </div>
            )}

            {status === "error" && (
              <div className="rounded-3xl border border-destructive/30 bg-destructive/5 p-12 text-center">
                <ImageOff className="mx-auto h-10 w-10 text-destructive" />
                <h3 className="mt-4 text-lg font-semibold">Processing failed</h3>
                <p className="mx-auto mt-1 max-w-2xl text-sm text-muted-foreground">
                  {errorMessage || "Please try with a different image."}
                </p>
                <button
                  onClick={reset}
                  className="mt-6 inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-medium text-white gradient-bg cursor-pointer"
                >
                  <RefreshCw className="h-4 w-4" /> Try again
                </button>
              </div>
            )}

            {status === "success" && originalUrl && resultUrl && (
              <div className="grid gap-8 animate-in fade-in-50 duration-500">
                {/* Before and After Images Side by Side */}
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Before */}
                  <div className="rounded-2xl border border-border overflow-hidden bg-muted">
                    <img
                      src={originalUrl}
                      alt="Original"
                      className="h-80 w-full object-contain md:h-96"
                    />
                    <div className="p-3 text-center text-xs font-medium text-muted-foreground bg-card/40 border-t border-border/50">
                      Before
                    </div>
                  </div>
                  {/* After */}
                  <div className="rounded-2xl border border-border overflow-hidden checker-bg relative">
                    <img
                      src={resultUrl}
                      alt="Background removed"
                      className="h-80 w-full object-contain md:h-96 transition-all duration-300"
                      referrerPolicy="no-referrer"
                      onLoad={() => setResultImageError(false)}
                      onError={() => setResultImageError(true)}
                    />
                    <div className="p-3 text-center text-xs font-medium text-muted-foreground bg-card/80 border-t border-border/50">
                      After
                    </div>
                  </div>
                </div>
                {resultImageError && (
                  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
                    The processed URL was received, but the browser could not render it as an image.{" "}
                    <a
                      href={resultUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold underline"
                    >
                      Open returned URL
                    </a>
                  </div>
                )}

                <div className="rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)]">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Result</div>
                  <h3 className="mt-1 text-xl font-semibold">Background removed</h3>
                  {time && <p className="mt-1 text-sm text-muted-foreground">Processed in {time}</p>}
                  <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                    <a
                      href={`/api/download?url=${encodeURIComponent(resultUrl || "")}&filename=${encodeURIComponent(fileName.replace(/\.[^/.]+$/, "") + "-no-bg.png")}`}
                      className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-white gradient-bg shadow-[var(--shadow-glow)] hover:opacity-95 transition-opacity"
                    >
                      <Download className="h-4 w-4" /> Download PNG
                    </a>
                    <button
                      onClick={reset}
                      className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-border px-5 text-sm font-medium hover:bg-accent transition-colors cursor-pointer"
                    >
                      <RefreshCw className="h-4 w-4" /> Upload another
                    </button>
                  </div>
                  <div className="mt-6 rounded-xl border border-border bg-muted/40 p-4 text-xs text-muted-foreground">
                    Used <span className="font-semibold text-foreground">{lastCost}</span> credits ·{" "}
                    <span className="font-semibold text-foreground">{remaining}</span> left today.{" "}
                    <a href="/pricing" className="gradient-text font-medium">
                      Upgrade to Pro
                    </a>{" "}
                    for unlimited HD removals.
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "history" && (
          <div className="grid gap-6 animate-in fade-in-50 duration-400">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-heading">Recent Removals</h2>
              {history.length > 0 && (
                <button
                  onClick={clearAllHistory}
                  className="text-xs font-semibold text-destructive hover:underline cursor-pointer"
                >
                  Clear all
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border bg-card/40 p-16 text-center shadow-[var(--shadow-soft)]">
                <ImageOff className="mx-auto h-12 w-12 text-muted-foreground/60" />
                <h3 className="mt-5 text-lg font-semibold">No history yet</h3>
                <p className="mt-1 text-sm text-muted-foreground max-w-sm mx-auto">
                  Upload an image and remove its background to see it here.
                </p>
                <button
                  onClick={() => setActiveTab("remove")}
                  className="mt-6 inline-flex h-9 items-center rounded-full px-5 text-sm font-medium text-white gradient-bg cursor-pointer"
                >
                  Get started
                </button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="group relative rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col hover:-translate-y-0.5"
                  >
                    {/* Thumbnail checker-bg */}
                    <div className="aspect-square w-full checker-bg flex items-center justify-center p-4 relative overflow-hidden bg-muted">
                      <img
                        src={item.resultUrl}
                        alt={item.fileName}
                        className="max-h-full max-w-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] group-hover:scale-103 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      {/* Action overlay */}
                      <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                        <button
                          onClick={() => viewFromHistory(item)}
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border shadow-sm text-foreground hover:bg-accent transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </button>
                        <a
                          href={`/api/download?url=${encodeURIComponent(item.resultUrl)}&filename=${encodeURIComponent(item.fileName.replace(/\.[^/.]+$/, "") + "-no-bg.png")}`}
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
                          title="Download"
                        >
                          <Download className="h-4 w-4" />
                        </a>
                        <button
                          onClick={() => deleteFromHistory(item.id)}
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive border border-destructive/20 shadow-sm hover:bg-destructive/20 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    {/* Meta information */}
                    <div className="p-4 flex-1 flex flex-col justify-between gap-1 border-t border-border bg-card">
                      <div className="font-semibold text-sm truncate" title={item.fileName}>
                        {item.fileName}
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                        <span>
                          {new Date(item.timestamp).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        {item.fileSize && <span>{formatBytes(item.fileSize)}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
