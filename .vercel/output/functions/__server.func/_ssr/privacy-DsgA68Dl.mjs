import { j as jsxRuntimeExports } from "../_libs/react.mjs";
function Privacy() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "mx-auto max-w-3xl px-6 py-16 prose prose-neutral", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold", children: "Privacy Policy" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Last updated: June 10, 2026" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Image processing & storage", children: "Images you upload are transmitted over HTTPS to our AI processing pipeline and stored temporarily on Cloudinary for delivery. Processed images are automatically deleted after a short retention window." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Account data", children: "If you create an account, we store your email and authentication identifiers via Supabase Auth. We never sell your data." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Cookies", children: "We use essential cookies to keep you signed in and to remember preferences. We do not use third-party advertising cookies." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Your rights", children: "You may request export or deletion of your account data at any time by contacting us." })
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
  Privacy as component
};
