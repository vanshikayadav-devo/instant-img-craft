import { j as jsxRuntimeExports } from "../_libs/react.mjs";
function Terms() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "mx-auto max-w-3xl px-6 py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold", children: "Terms of Service" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Last updated: June 10, 2026" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "User ownership", children: "You retain full ownership of images you upload and of the processed outputs we return to you." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Service limitations", children: "SnapCut AI is provided “as is.” Processing times, availability and quality may vary, and free-tier limits apply." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Acceptable use", children: "You agree not to upload content that is illegal, infringing, harmful, or that violates the rights of others." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Account & billing", children: "Paid plans renew automatically until cancelled. You can cancel at any time from your dashboard." })
  ] });
}
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground leading-relaxed", children })
  ] });
}
export {
  Terms as component
};
