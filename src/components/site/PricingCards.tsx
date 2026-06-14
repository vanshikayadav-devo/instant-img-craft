import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { initializePayment } from "@/lib/razorpay";
import { getIsPro, setIsPro } from "@/lib/credits";
import { toast } from "sonner";

const PLANS = [
  {
    name: "Free", price: "₹0", per: "/month", cta: "Start free", to: "/app", highlight: false,
    features: ["100 credits / day", "5–25 credits per image (by size)", "Standard quality", "Watermarked output"],
  },
  {
    name: "Pro", price: "₹299", per: "/month", cta: "Upgrade to Pro", highlight: true,
    features: ["Unlimited images", "HD quality output", "No watermark", "Priority processing", "Download history"],
  },
  {
    name: "Business", price: "Custom", per: "", cta: "Contact sales", to: "/contact", highlight: false,
    features: ["Bulk processing", "API access", "Team seats", "Priority support", "Custom SLA"],
  },
];

export function PricingCards() {
  const [isPro, setIsProState] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsProState(getIsPro());
    const handleUpdate = () => setIsProState(getIsPro());
    window.addEventListener("creditsUpdated", handleUpdate);
    return () => window.removeEventListener("creditsUpdated", handleUpdate);
  }, []);

  const handleSubscribePro = async () => {
    if (isPro) {
      toast.info("You are already subscribed to the Pro plan!");
      return;
    }
    
    setLoading(true);
    try {
      await initializePayment({
        amount: 299,
        onSuccess: (paymentId) => {
          setIsPro(true);
          toast.success("Payment successful! You are now upgraded to Pro.");
          setLoading(false);
        },
        onFailure: (err) => {
          console.error("Payment failed", err);
          toast.error(err instanceof Error ? err.message : "Payment failed. Please try again.");
          setLoading(false);
        },
      });
    } catch (err) {
      console.error(err);
      toast.error("An error occurred starting the payment.");
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {PLANS.map((p) => {
        const isProPlan = p.name === "Pro";
        
        return (
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
            
            {isProPlan ? (
              <button
                onClick={handleSubscribePro}
                disabled={loading}
                className={`mt-8 inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition-all cursor-pointer disabled:opacity-50
                  ${isPro
                    ? "border border-primary text-primary hover:bg-primary/5"
                    : "text-white gradient-bg hover:opacity-95 shadow-[var(--shadow-glow)]"
                  }`}
              >
                {loading ? "Processing..." : isPro ? "Active Plan (Pro)" : p.cta}
              </button>
            ) : (
              <Link
                to={p.to}
                className={`mt-8 inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition-all
                  ${p.highlight
                    ? "text-white gradient-bg hover:opacity-95 shadow-[var(--shadow-glow)]"
                    : "border border-border hover:bg-accent"}`}
              >
                {p.cta}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}

