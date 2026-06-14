import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as Sparkles, Z as Zap, f as ShieldCheck, G as Globe } from "../_libs/lucide-react.mjs";
const VALUES = [{
  icon: Sparkles,
  title: "Simplicity",
  desc: "One click. Zero friction. Editing should feel invisible."
}, {
  icon: Zap,
  title: "Speed",
  desc: "Optimized AI pipeline so results land in seconds, not minutes."
}, {
  icon: ShieldCheck,
  title: "Privacy",
  desc: "Your images are processed securely and deleted automatically."
}, {
  icon: Globe,
  title: "Accessibility",
  desc: "Pro-grade editing in your browser — no installs, no learning curve."
}];
function About() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-4xl px-6 py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold", children: "Our mission" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-lg text-muted-foreground", children: [
        "Make ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text font-semibold", children: "professional image editing" }),
        " accessible to everyone — from solo creators to global teams."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14 grid gap-5 sm:grid-cols-2", children: VALUES.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl gradient-bg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(v.icon, { className: "h-5 w-5 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 font-semibold", children: v.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm text-muted-foreground", children: v.desc })
    ] }, v.title)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-14 rounded-3xl border border-border bg-card p-8 md:p-12 shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Why we built SnapCut AI" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground leading-relaxed", children: "Removing image backgrounds used to mean opening heavy software, learning complex tools, or hiring a designer. We believed it shouldn't. SnapCut AI turns a slow, manual chore into a single click — so you can spend your time on the work that actually matters." })
    ] })
  ] });
}
export {
  About as component
};
