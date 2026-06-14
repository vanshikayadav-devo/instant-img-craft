import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shipping-delivery")({
  head: () => ({
    meta: [
      { title: "Shipping & Delivery Policy — SnapCut AI" },
      { name: "description", content: "Details on digital delivery of SnapCut AI Pro features and services." },
      { property: "og:url", content: "/shipping-delivery" },
    ],
    links: [{ rel: "canonical", href: "/shipping-delivery" }],
  }),
  component: ShippingDelivery,
});

function ShippingDelivery() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 prose prose-neutral">
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-bold font-heading">Shipping & Delivery Policy</h1>
        <p className="mt-3 text-muted-foreground">Last updated: June 14, 2026</p>
      </div>

      <div className="mt-8 space-y-6">
        <Section title="1. Digital Delivery Only">
          <p className="mt-2 text-muted-foreground leading-relaxed">
            SnapCut AI is a software-as-a-service (SaaS) web application. We do not ship physical products, packages, or materials. 
            Therefore, no physical shipping fees, logistics, or delivery times are associated with your purchases.
          </p>
        </Section>

        <Section title="2. Instant Access">
          <p className="mt-2 text-muted-foreground leading-relaxed">
            Upon successful completion of payment through our payment gateway (**Razorpay**), your subscription status is updated instantly. 
            Your account is immediately credited with the corresponding benefits (such as unlimited HD image removal permissions). 
            You will receive a payment confirmation email from Razorpay and an invoice to your registered email address.
          </p>
        </Section>

        <Section title="3. Support for Access Issues">
          <p className="mt-2 text-muted-foreground leading-relaxed">
            If you do not see your account status updated to Pro or if you face any issues accessing your digital credits after a successful payment, please contact our support team immediately at <span className="text-foreground font-semibold">support@snapcut.ai</span>. 
            We will verify the payment on our gateway and activate your credits manually within 12-24 hours.
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
