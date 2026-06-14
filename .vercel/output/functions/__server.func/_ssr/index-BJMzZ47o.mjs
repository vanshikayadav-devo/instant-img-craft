import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PricingCards, F as FAQAccordion } from "./FAQAccordion-Cby_FZJy.mjs";
import { S as Sparkles, A as ArrowRight, Z as Zap, W as WandSparkles, f as ShieldCheck, g as ShoppingBag, h as Megaphone, P as Palette, i as Camera, Q as Quote } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-accordion.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-collapsible.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
function BeforeAfterSlider({ beforeSrc, afterSrc, className = "" }) {
  const ref = reactExports.useRef(null);
  const [pos, setPos] = reactExports.useState(50);
  const dragging = reactExports.useRef(false);
  const move = reactExports.useCallback((clientX) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = (clientX - rect.left) / rect.width * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);
  reactExports.useEffect(() => {
    const up = () => dragging.current = false;
    const mv = (e) => dragging.current && move(e.clientX);
    const tm = (e) => dragging.current && move(e.touches[0].clientX);
    window.addEventListener("mouseup", up);
    window.addEventListener("mousemove", mv);
    window.addEventListener("touchmove", tm);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("touchmove", tm);
      window.removeEventListener("touchend", up);
    };
  }, [move]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      className: `relative select-none overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] ${className}`,
      onMouseDown: (e) => {
        dragging.current = true;
        move(e.clientX);
      },
      onTouchStart: (e) => {
        dragging.current = true;
        move(e.touches[0].clientX);
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: beforeSrc, alt: "Original", className: "block w-full h-auto", draggable: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 checker-bg overflow-hidden",
            style: { clipPath: `inset(0 0 0 ${pos}%)` },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: afterSrc, alt: "Background removed", className: "block w-full h-full object-cover", draggable: false })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)]",
            style: { left: `${pos}%` },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center text-xs font-semibold gradient-text", children: "⇆" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute top-3 left-3 text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-black/50 text-white", children: "Before" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute top-3 right-3 text-[10px] uppercase tracking-wider px-2 py-1 rounded gradient-bg text-white", children: "After" })
      ]
    }
  );
}
const demoBefore = "/assets/demo-before-DugLHgZe.jpg";
const demoAfter = "/assets/demo-after-BzLHKGZ0.png";
function Home() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Features, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HowItWorks, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(UseCases, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Testimonials, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PricingSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FAQSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FinalCTA, {})
  ] });
}
function Hero() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[1200px] rounded-full blur-3xl opacity-30 gradient-bg" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-6 pt-20 pb-16 grid lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-primary" }),
          "Powered by next-gen AI · v2.0"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-5 text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight", children: [
          "Remove background from any image in",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "one click" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-lg text-muted-foreground max-w-xl", children: "AI-powered background removal in seconds. No editing skills required. Upload an image and get a clean, transparent PNG instantly." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app", className: "inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white gradient-bg shadow-[var(--shadow-glow)] hover:opacity-95 transition-opacity", children: [
            "Upload image ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#how-it-works", className: "inline-flex h-12 items-center rounded-full border border-border bg-card px-6 text-sm font-semibold hover:bg-accent transition-colors", children: "See demo" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3.5 w-3.5 text-primary" }),
            " One click"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "h-3.5 w-3.5 text-primary" }),
            " HD quality"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5 text-primary" }),
            " Secure upload"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-4 rounded-3xl gradient-bg opacity-20 blur-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BeforeAfterSlider, { beforeSrc: demoBefore, afterSrc: demoAfter })
      ] })
    ] })
  ] });
}
function Features() {
  const items = [{
    icon: Zap,
    title: "Lightning fast",
    desc: "Processed in 1–3 seconds on optimized AI workers."
  }, {
    icon: WandSparkles,
    title: "HD quality",
    desc: "Clean cutouts with crisp edges, even around hair."
  }, {
    icon: ShieldCheck,
    title: "Private & secure",
    desc: "HTTPS upload. Images auto-deleted after processing."
  }, {
    icon: Sparkles,
    title: "No skills needed",
    desc: "Drop your image. We handle the rest."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-6 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 md:grid-cols-2 lg:grid-cols-4", children: items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl gradient-bg flex items-center justify-center shadow-[var(--shadow-glow)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(it.icon, { className: "h-5 w-5 text-white" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 font-semibold", children: it.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm text-muted-foreground", children: it.desc })
  ] }, it.title)) }) });
}
function HowItWorks() {
  const steps = [{
    n: "01",
    title: "Upload image",
    desc: "Drag & drop a PNG, JPG or WEBP file."
  }, {
    n: "02",
    title: "AI removes background",
    desc: "Our model isolates your subject in seconds."
  }, {
    n: "03",
    title: "Download result",
    desc: "Save your transparent PNG, ready to use."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "how-it-works", className: "mx-auto max-w-7xl px-6 py-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-bold", children: "How it works" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Three steps from raw photo to ready-to-use cutout." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-5 md:grid-cols-3", children: steps.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl border border-border bg-card p-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-mono gradient-text", children: s.n }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-lg font-semibold", children: s.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm text-muted-foreground", children: s.desc })
    ] }, s.n)) })
  ] });
}
function UseCases() {
  const cards = [{
    icon: ShoppingBag,
    title: "Ecommerce",
    desc: "Clean product shots on white or transparent backgrounds for any storefront."
  }, {
    icon: Megaphone,
    title: "Marketing",
    desc: "Hero images, banners and ads without waiting on a designer."
  }, {
    icon: Palette,
    title: "Design",
    desc: "Composite mockups and creative work in a fraction of the time."
  }, {
    icon: Camera,
    title: "Social media",
    desc: "Stand-out posts, stories and thumbnails in one tap."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-6 py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-bold", children: "Built for every kind of creator" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "From single sellers to global teams." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4", children: cards.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-2xl border border-border bg-card p-6 hover:-translate-y-0.5 transition-transform shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "h-6 w-6 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 font-semibold", children: c.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm text-muted-foreground", children: c.desc })
    ] }, c.title)) })
  ] });
}
function Testimonials() {
  const items = [{
    q: "SnapCut AI saved our store hours of editing. Product photos look amazing.",
    a: "Ananya R.",
    r: "Founder, Loom & Hue"
  }, {
    q: "The cutouts are clean — even around hair. Faster than anything we've tried.",
    a: "Marcus D.",
    r: "Creative Director"
  }, {
    q: "We removed backgrounds for our entire catalog in one afternoon.",
    a: "Priya S.",
    r: "Marketing Lead"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-6 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 md:grid-cols-3", children: items.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "h-5 w-5 text-primary" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-relaxed", children: t.q }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: t.a }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs", children: t.r })
    ] })
  ] }, i)) }) });
}
function PricingSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-6 py-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-bold", children: "Simple, transparent pricing" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Start free. Upgrade when you're ready." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PricingCards, {}) })
  ] });
}
function FAQSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-3xl px-6 py-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-bold", children: "Frequently asked" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Everything you need to know about SnapCut AI." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FAQAccordion, {}) })
  ] });
}
function FinalCTA() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-6 pb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl gradient-bg p-12 md:p-16 text-center text-white shadow-[var(--shadow-glow)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 opacity-20", style: {
      backgroundImage: "radial-gradient(circle at 20% 30%, white, transparent 50%), radial-gradient(circle at 80% 70%, white, transparent 50%)"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "relative text-3xl md:text-4xl font-bold", children: "Start removing backgrounds instantly" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "relative mt-3 text-white/80 max-w-xl mx-auto", children: "No signup needed to try. Your first 5 images are on us, every day." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app", className: "relative mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-foreground hover:bg-white/90 transition-colors", children: [
      "Try SnapCut AI free ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
    ] })
  ] }) });
}
export {
  Home as component
};
