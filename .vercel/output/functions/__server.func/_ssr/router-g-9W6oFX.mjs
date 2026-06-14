import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, L as Link } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { s as storeResult } from "./webhook-results-xKR3EnNR.mjs";
import { S as Sparkles } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const appCss = "/assets/styles-BjdfqoXw.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const NAV = [
  { to: "/app", label: "Remove BG" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" }
];
function Navbar() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 glass border-b border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 h-16 flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 font-semibold tracking-tight", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-8 w-8 items-center justify-center rounded-lg gradient-bg shadow-[var(--shadow-glow)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-base", children: [
        "Snap",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "Cut" }),
        " AI"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden md:flex items-center gap-7 text-sm text-muted-foreground", children: NAV.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: n.to,
        className: "transition-colors hover:text-foreground",
        activeProps: { className: "text-foreground" },
        children: n.label
      },
      n.to
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/auth",
          className: "hidden sm:inline-flex h-9 items-center px-3 text-sm text-muted-foreground hover:text-foreground transition-colors",
          children: "Sign in"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/app",
          className: "inline-flex h-9 items-center rounded-full px-4 text-sm font-medium text-white gradient-bg shadow-[var(--shadow-glow)] hover:opacity-95 transition-opacity",
          children: "Try free"
        }
      )
    ] })
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "mt-24 border-t border-border/60 bg-background/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex h-8 w-8 items-center justify-center rounded-lg gradient-bg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-white" }) }),
          "SnapCut AI"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground max-w-xs", children: "Remove image backgrounds instantly with AI. Built for creators, ecommerce and teams." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FooterCol, { title: "Product", links: [["/app", "Remove BG"], ["/pricing", "Pricing"], ["/dashboard", "Dashboard"]] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FooterCol, { title: "Company", links: [["/about", "About"], ["/contact", "Contact"]] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FooterCol, { title: "Legal", links: [["/privacy", "Privacy"], ["/terms", "Terms"]] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/60 py-5 text-center text-xs text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " SnapCut AI. All rights reserved."
    ] })
  ] });
}
function FooterCol({ title, links }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold mb-3", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm text-muted-foreground", children: links.map(([to, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to, className: "hover:text-foreground transition-colors", children: label }) }, to)) })
  ] });
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold gradient-text", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "mt-6 inline-flex h-10 items-center rounded-full px-5 text-sm font-medium text-white gradient-bg", children: "Go home" })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  const router = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong. Try refreshing." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "inline-flex h-10 items-center rounded-full px-5 text-sm font-medium text-white gradient-bg",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "inline-flex h-10 items-center rounded-full border border-border px-5 text-sm", children: "Home" })
    ] })
  ] }) });
}
const Route$c = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SnapCut AI — Remove Image Background in One Click" },
      { name: "description", content: "AI-powered background removal in seconds. Upload, process and download transparent PNGs. No editing skills required." },
      { property: "og:title", content: "SnapCut AI — Remove Image Background in One Click" },
      { property: "og:description", content: "Instant AI-powered background removal for creators, ecommerce and teams." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SnapCut AI" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$c.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-center" })
  ] });
}
const $$splitComponentImporter$8 = () => import("./terms-Bz6uXHU1.mjs");
const Route$b = createFileRoute("/terms")({
  head: () => ({
    meta: [{
      title: "Terms of Service — SnapCut AI"
    }, {
      name: "description",
      content: "The terms governing your use of SnapCut AI."
    }, {
      property: "og:url",
      content: "/terms"
    }],
    links: [{
      rel: "canonical",
      href: "/terms"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const BASE_URL = "";
const PATHS = ["/", "/app", "/pricing", "/about", "/contact", "/privacy", "/terms"];
const Route$a = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = PATHS.map(
          (p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600"
          }
        });
      }
    }
  }
});
const $$splitComponentImporter$7 = () => import("./privacy-DsgA68Dl.mjs");
const Route$9 = createFileRoute("/privacy")({
  head: () => ({
    meta: [{
      title: "Privacy Policy — SnapCut AI"
    }, {
      name: "description",
      content: "How SnapCut AI handles your images, data and privacy."
    }, {
      property: "og:url",
      content: "/privacy"
    }],
    links: [{
      rel: "canonical",
      href: "/privacy"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./pricing-jui4wCCf.mjs");
const Route$8 = createFileRoute("/pricing")({
  head: () => ({
    meta: [{
      title: "Pricing — SnapCut AI"
    }, {
      name: "description",
      content: "Simple, transparent pricing. Start free or upgrade to Pro for HD output and unlimited images."
    }, {
      property: "og:title",
      content: "Pricing — SnapCut AI"
    }, {
      property: "og:description",
      content: "Free, Pro and Business plans for AI background removal."
    }, {
      property: "og:url",
      content: "/pricing"
    }],
    links: [{
      rel: "canonical",
      href: "/pricing"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./dashboard-CWppR2Sc.mjs");
const Route$7 = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{
      title: "Dashboard — SnapCut AI"
    }, {
      name: "description",
      content: "Track your usage, credits, subscription and download history."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./contact-DPDRGpVi.mjs");
const Route$6 = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact — SnapCut AI"
    }, {
      name: "description",
      content: "Get in touch with the SnapCut AI team. We typically respond within one business day."
    }, {
      property: "og:title",
      content: "Contact — SnapCut AI"
    }, {
      property: "og:description",
      content: "Get in touch with the SnapCut AI team."
    }, {
      property: "og:url",
      content: "/contact"
    }],
    links: [{
      rel: "canonical",
      href: "/contact"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./auth-BptnUcvG.mjs");
const Route$5 = createFileRoute("/auth")({
  head: () => ({
    meta: [{
      title: "Sign in — SnapCut AI"
    }, {
      name: "description",
      content: "Sign in or create your SnapCut AI account to unlock more credits and HD downloads."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./app-BphDBmRL.mjs");
const Route$4 = createFileRoute("/app")({
  head: () => ({
    meta: [{
      title: "Remove Background — SnapCut AI"
    }, {
      name: "description",
      content: "Upload an image and let SnapCut AI remove the background instantly. Download a transparent PNG."
    }, {
      property: "og:title",
      content: "Remove Background — SnapCut AI"
    }, {
      property: "og:description",
      content: "Upload, process, download. AI background removal in seconds."
    }, {
      property: "og:url",
      content: "/app"
    }],
    links: [{
      rel: "canonical",
      href: "/app"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./about-DEgGL7bY.mjs");
const Route$3 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "About — SnapCut AI"
    }, {
      name: "description",
      content: "We're on a mission to make professional image editing accessible to everyone."
    }, {
      property: "og:title",
      content: "About — SnapCut AI"
    }, {
      property: "og:description",
      content: "Making professional image editing accessible to everyone."
    }, {
      property: "og:url",
      content: "/about"
    }],
    links: [{
      rel: "canonical",
      href: "/about"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-BJMzZ47o.mjs");
const Route$2 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "SnapCut AI — Remove Image Background in One Click"
    }, {
      name: "description",
      content: "AI background removal in seconds. Drag, drop, download transparent PNGs. Built for ecommerce, designers and creators."
    }, {
      property: "og:title",
      content: "SnapCut AI — Remove Image Background in One Click"
    }, {
      property: "og:description",
      content: "AI background removal in seconds. Built for ecommerce, designers and creators."
    }, {
      property: "og:url",
      content: "/"
    }],
    links: [{
      rel: "canonical",
      href: "/"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const Route$1 = createFileRoute("/api/download")({
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
          const response = await fetch(imageUrl);
          if (!response.ok) {
            return Response.json({ error: "Failed to fetch image" }, { status: 500 });
          }
          const blob = await response.blob();
          const headers = new Headers();
          headers.set("Content-Disposition", `attachment; filename="${filename}"`);
          headers.set("Content-Type", response.headers.get("Content-Type") || "image/png");
          return new Response(blob, {
            status: 200,
            headers
          });
        } catch (error) {
          console.error("Download proxy error:", error);
          return Response.json({ error: "Internal server error" }, { status: 500 });
        }
      }
    }
  }
});
const IMAGE_URL_KEYS = [
  "url",
  "imageUrl",
  "image_url",
  "image",
  "imageURL",
  "outputUrl",
  "output_url",
  "output",
  "resultUrl",
  "result_url",
  "result",
  "secure_url",
  "downloadUrl",
  "download_url",
  "webContentLink",
  "webViewLink"
];
function extractImageUrl(value) {
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed.startsWith("{") && trimmed.endsWith("}") || trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const result = extractImageUrl(JSON.parse(trimmed));
        if (result) return result;
      } catch {
      }
    }
    if (isRenderableImageUrl(trimmed)) {
      return trimmed;
    }
    const match = trimmed.match(/https?:\/\/[^\s"'<>]+/i);
    return match?.[0] ?? null;
  }
  if (Array.isArray(value)) {
    for (const item of value) {
      const result = extractImageUrl(item);
      if (result) return result;
    }
    return null;
  }
  if (!value || typeof value !== "object") {
    return null;
  }
  const record = value;
  for (const key of IMAGE_URL_KEYS) {
    const result = extractImageUrl(record[key]);
    if (result) return result;
  }
  for (const item of Object.values(record)) {
    const result = extractImageUrl(item);
    if (result) return result;
  }
  return null;
}
function isRenderableImageUrl(value) {
  if (value.startsWith("data:image/")) {
    return true;
  }
  try {
    const url = new URL(value);
    return /^https?:$/.test(url.protocol);
  } catch {
    return false;
  }
}
const Route = createFileRoute("/api/webhook/callback")({
  server: {
    handlers: {
      POST: async (context) => {
        try {
          const req = context.request;
          const payload = await readWebhookPayload(req);
          const requestId = extractTextValue(payload, ["requestId", "requestID", "id"]) || req.headers.get("x-request-id");
          const imageUrl = extractImageUrl(payload);
          if (!requestId || !imageUrl) {
            return Response.json(
              {
                success: false,
                error: "Missing requestId or image URL"
              },
              { status: 400 }
            );
          }
          storeResult(requestId, imageUrl);
          console.log(`Webhook callback received - Request: ${requestId}, URL: ${imageUrl}`);
          return Response.json({
            success: true,
            message: "Result stored successfully",
            requestId,
            url: imageUrl
          });
        } catch (error) {
          console.error("Webhook callback error:", error);
          return Response.json(
            {
              success: false,
              error: "Failed to process callback"
            },
            { status: 500 }
          );
        }
      }
    }
  }
});
async function readWebhookPayload(req) {
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
function getText(value) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}
function extractTextValue(value, keys) {
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
  const record = value;
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
const TermsRoute = Route$b.update({
  id: "/terms",
  path: "/terms",
  getParentRoute: () => Route$c
});
const SitemapDotxmlRoute = Route$a.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$c
});
const PrivacyRoute = Route$9.update({
  id: "/privacy",
  path: "/privacy",
  getParentRoute: () => Route$c
});
const PricingRoute = Route$8.update({
  id: "/pricing",
  path: "/pricing",
  getParentRoute: () => Route$c
});
const DashboardRoute = Route$7.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$c
});
const ContactRoute = Route$6.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$c
});
const AuthRoute = Route$5.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$c
});
const AppRoute = Route$4.update({
  id: "/app",
  path: "/app",
  getParentRoute: () => Route$c
});
const AboutRoute = Route$3.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$c
});
const IndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$c
});
const ApiDownloadRoute = Route$1.update({
  id: "/api/download",
  path: "/api/download",
  getParentRoute: () => Route$c
});
const ApiWebhookCallbackRoute = Route.update({
  id: "/api/webhook/callback",
  path: "/api/webhook/callback",
  getParentRoute: () => Route$c
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AppRoute,
  AuthRoute,
  ContactRoute,
  DashboardRoute,
  PricingRoute,
  PrivacyRoute,
  SitemapDotxmlRoute,
  TermsRoute,
  ApiDownloadRoute,
  ApiWebhookCallbackRoute
};
const routeTree = Route$c._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
