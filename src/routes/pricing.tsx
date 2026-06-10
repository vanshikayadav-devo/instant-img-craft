import { createFileRoute } from "@tanstack/react-router";
import { PricingCards } from "@/components/site/PricingCards";
import { FAQAccordion } from "@/components/site/FAQAccordion";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — SnapCut AI" },
      { name: "description", content: "Simple, transparent pricing. Start free or upgrade to Pro for HD output and unlimited images." },
      { property: "og:title", content: "Pricing — SnapCut AI" },
      { property: "og:description", content: "Free, Pro and Business plans for AI background removal." },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold">Pricing that scales with you</h1>
        <p className="mt-3 text-muted-foreground">Start free. Upgrade when you need more. Cancel anytime.</p>
      </div>
      <div className="mt-12"><PricingCards /></div>

      <div className="mt-24 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center">Common questions</h2>
        <div className="mt-8"><FAQAccordion /></div>
      </div>
    </section>
  );
}
