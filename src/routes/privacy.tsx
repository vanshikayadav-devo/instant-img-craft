import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — SnapCut AI" },
      { name: "description", content: "How SnapCut AI handles your images, data and privacy." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 prose prose-neutral">
      <h1 className="text-4xl font-bold">Privacy Policy</h1>
      <p className="mt-3 text-muted-foreground">Last updated: June 10, 2026</p>

      <Section title="Image processing & storage">
        Images you upload are transmitted over HTTPS to our AI processing pipeline and stored temporarily on Cloudinary
        for delivery. Processed images are automatically deleted after a short retention window.
      </Section>
      <Section title="Account data">
        If you create an account, we store your email and authentication identifiers via Supabase Auth. We never sell your data.
      </Section>
      <Section title="Cookies">
        We use essential cookies to keep you signed in and to remember preferences. We do not use third-party advertising cookies.
      </Section>
      <Section title="Your rights">
        You may request export or deletion of your account data at any time by contacting us.
      </Section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}
