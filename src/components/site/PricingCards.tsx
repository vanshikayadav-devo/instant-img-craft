import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";

const PLANS = [
  {
    name: "Free", price: "₹0", per: "/month", cta: "Start free", to: "/app", highlight: false,
    features: ["5 images per day", "Standard quality", "Watermarked output", "Web access"],
  },
  {
    name: "Pro", price: "₹299", per: "/month", cta: "Upgrade to Pro", to: "/auth", highlight: true,
    features: ["Unlimited images", "HD quality output", "No watermark", "Priority processing", "Download history"],
  },
  {
    name: "Business", price: "Custom", per: "", cta: "Contact sales", to: "/contact", highlight: false,
    features: ["Bulk processing", "API access", "Team seats", "Priority support", "Custom SLA"],
  },
];

export function PricingCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {PLANS.map((p) => (
        <div
          key={p.name}
          className={`relative rounded-3xl border p-7 flex flex-col bg-card transition-all
            ${p.highlight
              ? "border-transparent shadow-[var(--shadow-glow)] ring-1 ring-primary/30"
              : "border-border shadow-[var(--shadow-soft)] hover:-translate-y-0.5"}`}
        >
          {p.highlight && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-bg text-white text-[11px] font-semibold px-3 py-1 shadow-md">
              MOST POPULAR
            </span>
          )}
          <div className="text-sm font-medium text-muted-foreground">{p.name}</div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className={`text-4xl font-bold ${p.highlight ? "gradient-text" : ""}`}>{p.price}</span>
            <span className="text-sm text-muted-foreground">{p.per}</span>
          </div>
          <ul className="mt-6 space-y-3 text-sm">
            {p.features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" /> {f}
              </li>
            ))}
          </ul>
          <Link
            to={p.to}
            className={`mt-8 inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition-all
              ${p.highlight
                ? "text-white gradient-bg hover:opacity-95 shadow-[var(--shadow-glow)]"
                : "border border-border hover:bg-accent"}`}
          >
            {p.cta}
          </Link>
        </div>
      ))}
    </div>
  );
}
