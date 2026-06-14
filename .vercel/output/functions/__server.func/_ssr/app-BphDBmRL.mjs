import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-Bnk2je-q.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { C as Coins, c as LoaderCircle, d as ImageOff, R as RefreshCw, D as Download, T as Trash2, e as CloudUpload, I as Image } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, n as numberType } from "../_libs/zod.mjs";
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
const ACCEPT = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
function UploadDropzone({ onFile, disabled }) {
  const [hover, setHover] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  const pick = reactExports.useCallback((f) => {
    if (!f) return;
    if (!ACCEPT.includes(f.type)) return alert("Unsupported file. Use PNG, JPG or WEBP.");
    if (f.size > 12 * 1024 * 1024) return alert("Max file size is 12MB.");
    onFile(f);
  }, [onFile]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      onDragOver: (e) => {
        e.preventDefault();
        setHover(true);
      },
      onDragLeave: () => setHover(false),
      onDrop: (e) => {
        e.preventDefault();
        setHover(false);
        pick(e.dataTransfer.files?.[0]);
      },
      onClick: () => !disabled && inputRef.current?.click(),
      className: `group relative cursor-pointer rounded-3xl border-2 border-dashed transition-all p-12 text-center
        ${hover ? "border-primary bg-primary/5" : "border-border bg-card/60 hover:bg-card"}
        ${disabled ? "opacity-60 pointer-events-none" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: inputRef,
            type: "file",
            accept: ACCEPT.join(","),
            className: "hidden",
            onChange: (e) => pick(e.target.files?.[0])
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl gradient-bg shadow-[var(--shadow-glow)] group-hover:scale-105 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { className: "h-7 w-7 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 text-lg font-semibold", children: "Drop your image here" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
          "or ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text font-medium", children: "browse files" }),
          " from your computer"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-3.5 w-3.5" }),
          " PNG · JPG · WEBP · up to 12MB"
        ] })
      ]
    }
  );
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const ImageDataSchema = objectType({
  base64: stringType(),
  name: stringType(),
  type: stringType(),
  size: numberType()
});
const removeBackgroundServer = createServerFn({
  method: "POST"
}).validator(ImageDataSchema).handler(createSsrRpc("9277ff05e4ed7bb93dcc50c07d49074d2c32ad187e0b1bd2e1c50b357289d897"));
async function removeBackground(file) {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  const result = await removeBackgroundServer({
    data: {
      base64,
      name: file.name,
      type: file.type,
      size: file.size
    }
  });
  if (!result.success) {
    throw new Error("Failed to remove background");
  }
  return result;
}
const getProcessedImageUrl = createServerFn({
  method: "POST"
}).validator(objectType({
  requestId: stringType()
})).handler(createSsrRpc("bab8c29a056825a138d325bde479c415c8b94748881635f4a4b7aeef253338ef"));
const DAILY_FREE_CREDITS = 100;
const MAX_CREDITS_PER_IMAGE = 25;
const STORAGE_KEY = "snapcut.credits.v1";
function today() {
  return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function read() {
  if (typeof window === "undefined") return { date: today(), used: 0 };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { date: today(), used: 0 };
    const parsed = JSON.parse(raw);
    if (parsed.date !== today()) return { date: today(), used: 0 };
    return parsed;
  } catch {
    return { date: today(), used: 0 };
  }
}
function write(state) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
function estimateCost(fileSizeBytes) {
  const mb = fileSizeBytes / (1024 * 1024);
  if (mb <= 1) return 5;
  if (mb <= 3) return 10;
  if (mb <= 6) return 15;
  if (mb <= 9) return 20;
  return MAX_CREDITS_PER_IMAGE;
}
function getRemaining() {
  const s = read();
  return Math.max(0, DAILY_FREE_CREDITS - s.used);
}
function canAfford(cost) {
  return getRemaining() >= cost;
}
function consume(cost) {
  const s = read();
  const next = { date: today(), used: Math.min(DAILY_FREE_CREDITS, s.used + cost) };
  write(next);
  return DAILY_FREE_CREDITS - next.used;
}
function formatBytes(bytes, decimals = 1) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
function AppPage() {
  const [status, setStatus] = reactExports.useState("idle");
  const [originalUrl, setOriginalUrl] = reactExports.useState(null);
  const [resultUrl, setResultUrl] = reactExports.useState(null);
  const [resultImageError, setResultImageError] = reactExports.useState(false);
  const [time, setTime] = reactExports.useState(null);
  const [errorMessage, setErrorMessage] = reactExports.useState(null);
  const [remaining, setRemaining] = reactExports.useState(DAILY_FREE_CREDITS);
  const [lastCost, setLastCost] = reactExports.useState(null);
  const [fileName, setFileName] = reactExports.useState("snapcut.png");
  const [activeTab, setActiveTab] = reactExports.useState("remove");
  const [history, setHistory] = reactExports.useState([]);
  reactExports.useEffect(() => {
    setRemaining(getRemaining());
    const stored = localStorage.getItem("snapcut_history");
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);
  const addToHistory = (resultUrl2, fileName2, fileSize, procTime) => {
    const newItem = {
      id: `hist_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      fileName: fileName2,
      resultUrl: resultUrl2,
      timestamp: Date.now(),
      processingTime: procTime,
      fileSize
    };
    setHistory((prev) => {
      const updated = [newItem, ...prev].slice(0, 50);
      localStorage.setItem("snapcut_history", JSON.stringify(updated));
      return updated;
    });
  };
  const deleteFromHistory = (id) => {
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
  function viewFromHistory(item) {
    setResultUrl(item.resultUrl);
    setOriginalUrl(item.resultUrl);
    setFileName(item.fileName);
    setResultImageError(false);
    setTime(item.processingTime ?? null);
    setStatus("success");
    setActiveTab("remove");
  }
  async function handleFile(file) {
    const cost = estimateCost(file.size);
    if (!canAfford(cost)) {
      toast.error(`Not enough credits. This image costs ${cost}, you have ${getRemaining()} left today.`);
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
      if (res.polling && res.requestId) {
        console.log("⏳ Polling for webhook result...", res.requestId);
        setTime(res.processingTime ?? null);
        let pollingAttempts = 0;
        const maxAttempts = 60;
        const pollInterval = setInterval(async () => {
          pollingAttempts++;
          try {
            const result = await getProcessedImageUrl({
              data: {
                requestId: res.requestId
              }
            });
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
        }, 2e3);
      } else {
        if (!res.imageUrl) {
          throw new Error("No processed image URL returned");
        }
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-6 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold font-heading", children: "Remove background" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Upload an image and we'll do the rest." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 mx-auto max-w-2xl rounded-2xl border border-border bg-card/60 p-4 flex items-center justify-between gap-4 shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl gradient-bg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "h-5 w-5 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-semibold", children: [
            remaining,
            " / ",
            DAILY_FREE_CREDITS,
            " credits left today"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "Each image costs 5–",
            MAX_CREDITS_PER_IMAGE,
            " credits based on file size. Resets daily."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:block h-2 w-32 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full gradient-bg transition-all", style: {
        width: `${remaining / DAILY_FREE_CREDITS * 100}%`
      } }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex rounded-full bg-muted/60 p-1 border border-border/40 backdrop-blur-[4px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("remove"), className: `rounded-full px-6 py-2 text-sm font-medium transition-all cursor-pointer ${activeTab === "remove" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`, children: "Remove Background" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveTab("history"), className: `rounded-full px-6 py-2 text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${activeTab === "history" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`, children: [
        "History",
        history.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white transition-transform duration-300 scale-100", children: history.length })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10", children: [
      activeTab === "remove" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        status === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsx(UploadDropzone, { onFile: handleFile }),
        status === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-card p-16 text-center shadow-[var(--shadow-soft)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mx-auto h-10 w-10 animate-spin text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 text-lg font-semibold animate-pulse", children: "Removing background…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Our AI is isolating your subject." })
        ] }),
        status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-destructive/30 bg-destructive/5 p-12 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ImageOff, { className: "mx-auto h-10 w-10 text-destructive" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-lg font-semibold", children: "Processing failed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-1 max-w-2xl text-sm text-muted-foreground", children: errorMessage || "Please try with a different image." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: reset, className: "mt-6 inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-medium text-white gradient-bg cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }),
            " Try again"
          ] })
        ] }),
        status === "success" && originalUrl && resultUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 animate-in fade-in-50 duration-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border overflow-hidden bg-muted", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: originalUrl, alt: "Original", className: "h-80 w-full object-contain md:h-96" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 text-center text-xs font-medium text-muted-foreground bg-card/40 border-t border-border/50", children: "Before" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border overflow-hidden checker-bg relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resultUrl, alt: "Background removed", className: "h-80 w-full object-contain md:h-96 transition-all duration-300", referrerPolicy: "no-referrer", onLoad: () => setResultImageError(false), onError: () => setResultImageError(true) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 text-center text-xs font-medium text-muted-foreground bg-card/80 border-t border-border/50", children: "After" })
            ] })
          ] }),
          resultImageError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900", children: [
            "The processed URL was received, but the browser could not render it as an image.",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: resultUrl, target: "_blank", rel: "noreferrer", className: "font-semibold underline", children: "Open returned URL" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Result" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 text-xl font-semibold", children: "Background removed" }),
            time && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
              "Processed in ",
              time
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col gap-2 sm:flex-row", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `/api/download?url=${encodeURIComponent(resultUrl || "")}&filename=${encodeURIComponent(fileName.replace(/\.[^/.]+$/, "") + "-no-bg.png")}`, className: "inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-white gradient-bg shadow-[var(--shadow-glow)] hover:opacity-95 transition-opacity", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
                " Download PNG"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: reset, className: "inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-border px-5 text-sm font-medium hover:bg-accent transition-colors cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }),
                " Upload another"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-xl border border-border bg-muted/40 p-4 text-xs text-muted-foreground", children: [
              "Used ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: lastCost }),
              " credits ·",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: remaining }),
              " left today.",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/pricing", className: "gradient-text font-medium", children: "Upgrade to Pro" }),
              " ",
              "for unlimited HD removals."
            ] })
          ] })
        ] })
      ] }),
      activeTab === "history" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 animate-in fade-in-50 duration-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold font-heading", children: "Recent Removals" }),
          history.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: clearAllHistory, className: "text-xs font-semibold text-destructive hover:underline cursor-pointer", children: "Clear all" })
        ] }),
        history.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-dashed border-border bg-card/40 p-16 text-center shadow-[var(--shadow-soft)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ImageOff, { className: "mx-auto h-12 w-12 text-muted-foreground/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 text-lg font-semibold", children: "No history yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground max-w-sm mx-auto", children: "Upload an image and remove its background to see it here." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("remove"), className: "mt-6 inline-flex h-9 items-center rounded-full px-5 text-sm font-medium text-white gradient-bg cursor-pointer", children: "Get started" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 md:grid-cols-3", children: history.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col hover:-translate-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-square w-full checker-bg flex items-center justify-center p-4 relative overflow-hidden bg-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.resultUrl, alt: item.fileName, className: "max-h-full max-w-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] group-hover:scale-103 transition-transform duration-300", referrerPolicy: "no-referrer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-background/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => viewFromHistory(item), className: "flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border shadow-sm text-foreground hover:bg-accent transition-colors cursor-pointer", title: "View Details", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `/api/download?url=${encodeURIComponent(item.resultUrl)}&filename=${encodeURIComponent(item.fileName.replace(/\.[^/.]+$/, "") + "-no-bg.png")}`, className: "flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm hover:opacity-90 transition-opacity", title: "Download", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => deleteFromHistory(item.id), className: "flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive border border-destructive/20 shadow-sm hover:bg-destructive/20 transition-colors cursor-pointer", title: "Delete", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex-1 flex flex-col justify-between gap-1 border-t border-border bg-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm truncate", title: item.fileName, children: item.fileName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(item.timestamp).toLocaleDateString(void 0, {
                month: "short",
                day: "numeric",
                year: "numeric"
              }) }),
              item.fileSize && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatBytes(item.fileSize) })
            ] })
          ] })
        ] }, item.id)) })
      ] })
    ] })
  ] });
}
export {
  AppPage as component
};
