import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/refund-cancellation")({
  head: () => ({
    meta: [
      { title: "Refund and Cancellation Policy — SnapCut AI" },
      { name: "description", content: "Learn about the refund and cancellation guidelines for SnapCut AI Pro subscriptions." },
      { property: "og:url", content: "/refund-cancellation" },
    ],
    links: [{ rel: "canonical", href: "/refund-cancellation" }],
  }),
  component: RefundCancellation,
});

function RefundCancellation() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 prose prose-neutral">
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-bold font-heading">Cancellation & Refund Policy</h1>
        <p className="mt-3 text-muted-foreground">Last updated: June 14, 2026</p>
      </div>

      <div className="mt-8 space-y-6">
        <Section title="1. Cancellation of Subscription">
          <p className="mt-2 text-muted-foreground leading-relaxed">
            You can cancel your SnapCut AI Pro subscription at any time. To cancel, navigate to your user account dashboard and click "Cancel Subscription". 
            Upon cancellation, your Pro features and unlimited access will continue until the end of your current active billing cycle, and no further recurring payments will be initiated.
          </p>
        </Section>

        <Section title="2. Refund Eligibility">
          <p className="mt-2 text-muted-foreground leading-relaxed">
            We offer a **7-day money-back guarantee** on initial purchases of our Pro plan. If you are unsatisfied with our AI background removal quality, you can request a full refund within 7 calendar days of your initial payment.
          </p>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            Refund requests made after the 7-day period will not be eligible for a refund, and payments for subsequent monthly renewals are non-refundable.
          </p>
        </Section>

        <Section title="3. Refund Processing">
          <p className="mt-2 text-muted-foreground leading-relaxed">
            To request a refund, please send an email to <span className="text-foreground font-semibold">support@snapcut.ai</span> from your registered email address with the payment transaction details (such as the Razorpay payment ID). 
          </p>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            Once approved, the refund will be processed and automatically credited back to your original payment method (bank account, credit/debit card, or UPI wallet) via Razorpay within **5-7 business days**.
          </p>
        </Section>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="pt-4 border-t border-border/40">
      <h2 className="text-xl font-bold font-heading text-foreground">{title}</h2>
      <div className="mt-2">{children}</div>
    </div>
  );
}
