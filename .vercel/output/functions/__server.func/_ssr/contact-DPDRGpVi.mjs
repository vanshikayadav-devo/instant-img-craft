import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { M as Mail } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
function Contact() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-3xl px-6 py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold", children: "Get in touch" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Questions, feedback or partnerships — we'd love to hear from you." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      toast.success("Message sent! We'll be in touch.");
      e.target.reset();
    }, className: "mt-10 rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)] space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Name", name: "name", placeholder: "Your name", required: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Email", name: "email", type: "email", placeholder: "you@email.com", required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Message" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { required: true, name: "message", rows: 5, placeholder: "Tell us a bit about what you need…", className: "mt-1.5 w-full rounded-2xl border border-input bg-background p-4 text-sm outline-none focus:ring-2 focus:ring-ring" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white gradient-bg shadow-[var(--shadow-glow)] hover:opacity-95 transition-opacity", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }),
        " Send message"
      ] })
    ] })
  ] });
}
function Input(props) {
  const {
    label,
    ...rest
  } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ...rest, className: "mt-1.5 w-full h-11 rounded-full border border-input bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring" })
  ] });
}
export {
  Contact as component
};
