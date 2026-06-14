import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — SnapCut AI" },
      { name: "description", content: "How SnapCut AI handles your images, payment data and privacy." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 prose prose-neutral">
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-bold font-heading">Privacy Policy</h1>
        <p className="mt-3 text-muted-foreground">Last updated: June 14, 2026</p>
      </div>

      <div className="mt-8 space-y-6">
        <Section title="1. Information We Collect">
          <p className="mt-2 text-muted-foreground leading-relaxed">
            At SnapCut AI, we collect information necessary to provide you with background removal services. This includes:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground text-sm">
            <li><strong>Account details:</strong> Email address when creating an account or subscribing.</li>
            <li><strong>Image Data:</strong> Images you upload are stored temporarily strictly for the purpose of processing.</li>
            <li><strong>Usage Logs:</strong> Metrics on browser type, time spent, and processed image counts.</li>
          </ul>
        </Section>

        <Section title="2. Payment & Transaction Security">
          <p className="mt-2 text-muted-foreground leading-relaxed">
            We use **Razorpay** as our third-party payment gateway handler to process all transactions securely. 
            All payment credentials and data (credit card numbers, bank details, etc.) are captured directly by Razorpay's secure systems. 
            SnapCut AI does not store, see, or have access to your full payment credentials. 
            Please refer to the <a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Razorpay Privacy Policy</a> for details on how they protect and manage your payment information.
          </p>
        </Section>

        <Section title="3. Image Storage & Deletion">
          <p className="mt-2 text-muted-foreground leading-relaxed">
            Images uploaded to SnapCut AI are securely transferred via HTTPS. To serve the download link, we temporarily host files. 
            Processed and original images are automatically deleted from our servers within 24 hours of creation. 
            We do not use your personal images to train our AI models without your explicit consent.
          </p>
        </Section>

        <Section title="4. Cookies and Local Storage">
          <p className="mt-2 text-muted-foreground leading-relaxed">
            We use browser local storage and essential cookies to maintain user session states, credit counts, and processing history. 
            We do not use tracking or advertising cookies.
          </p>
        </Section>

        <Section title="5. Your Privacy Rights & Contact">
          <p className="mt-2 text-muted-foreground leading-relaxed">
            You can request details about the personal data we hold about you or ask for its deletion at any time. 
            For any queries, contact our privacy coordinator at <span className="text-foreground font-semibold">support@snapcut.ai</span>.
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

