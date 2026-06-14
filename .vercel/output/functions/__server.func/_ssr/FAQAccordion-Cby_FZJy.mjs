import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { R as Root2, I as Item, H as Header, T as Trigger2, C as Content2 } from "../_libs/radix-ui__react-accordion.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { j as Check, k as ChevronDown } from "../_libs/lucide-react.mjs";
const PLANS = [
  {
    name: "Free",
    price: "₹0",
    per: "/month",
    cta: "Start free",
    to: "/app",
    highlight: false,
    features: ["100 credits / day", "5–25 credits per image (by size)", "Standard quality", "Watermarked output"]
  },
  {
    name: "Pro",
    price: "₹299",
    per: "/month",
    cta: "Upgrade to Pro",
    to: "/auth",
    highlight: true,
    features: ["Unlimited images", "HD quality output", "No watermark", "Priority processing", "Download history"]
  },
  {
    name: "Business",
    price: "Custom",
    per: "",
    cta: "Contact sales",
    to: "/contact",
    highlight: false,
    features: ["Bulk processing", "API access", "Team seats", "Priority support", "Custom SLA"]
  }
];
function PricingCards() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-3", children: PLANS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `relative rounded-3xl border p-7 flex flex-col bg-card transition-all
            ${p.highlight ? "border-transparent shadow-[var(--shadow-glow)] ring-1 ring-primary/30" : "border-border shadow-[var(--shadow-soft)] hover:-translate-y-0.5"}`,
      children: [
        p.highlight && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-bg text-white text-[11px] font-semibold px-3 py-1 shadow-md", children: "MOST POPULAR" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground", children: p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-baseline gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-4xl font-bold ${p.highlight ? "gradient-text" : ""}`, children: p.price }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: p.per })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 space-y-3 text-sm", children: p.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 mt-0.5 text-primary shrink-0" }),
          " ",
          f
        ] }, f)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: p.to,
            className: `mt-8 inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition-all
              ${p.highlight ? "text-white gradient-bg hover:opacity-95 shadow-[var(--shadow-glow)]" : "border border-border hover:bg-accent"}`,
            children: p.cta
          }
        )
      ]
    },
    p.name
  )) });
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Accordion = Root2;
const AccordionItem = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Item, { ref, className: cn("border-b", className), ...props }));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { className: "flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Trigger2,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = Trigger2.displayName;
const AccordionContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = Content2.displayName;
const FAQ = [
  ["Is SnapCut AI free?", "Yes. The Free plan gives you 100 credits every day. Each image costs between 5 and 25 credits depending on its file size, so you can process many images per day at no cost."],
  ["How fast is it?", "Most images are processed in 1–3 seconds thanks to our AI pipeline running on optimized GPU workers."],
  ["Is my image secure?", "Uploads are processed over HTTPS, stored temporarily on Cloudinary, and auto-deleted shortly after."],
  ["Which file formats work?", "PNG, JPG, JPEG and WEBP up to 12MB. Output is always a transparent PNG."],
  ["Are images stored permanently?", "No. We only retain images for a short period to deliver the result, then they are deleted automatically."]
];
function FAQAccordion() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "single", collapsible: true, className: "w-full", children: FAQ.map(([q, a], i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: `i-${i}`, className: "border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "text-left text-base font-medium", children: q }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "text-muted-foreground", children: a })
  ] }, i)) });
}
export {
  FAQAccordion as F,
  PricingCards as P
};
