import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — SnapCut AI" },
      { name: "description", content: "The terms governing your use of SnapCut AI." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold">Terms of Service</h1>
      <p className="mt-3 text-muted-foreground">Last updated: June 10, 2026</p>

      <Section title="User ownership">
        You retain full ownership of images you upload and of the processed outputs we return to you.
      </Section>
      <Section title="Service limitations">
        SnapCut AI is provided “as is.” Processing times, availability and quality may vary, and free-tier limits apply.
      </Section>
      <Section title="Acceptable use">
        You agree not to upload content that is illegal, infringing, harmful, or that violates the rights of others.
      </Section>
      <Section title="Account & billing">
        Paid plans renew automatically until cancelled. You can cancel at any time from your dashboard.
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
