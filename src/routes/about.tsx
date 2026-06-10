import { createFileRoute } from "@tanstack/react-router";
import { Zap, Sparkles, ShieldCheck, Globe } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — SnapCut AI" },
      { name: "description", content: "We're on a mission to make professional image editing accessible to everyone." },
      { property: "og:title", content: "About — SnapCut AI" },
      { property: "og:description", content: "Making professional image editing accessible to everyone." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const VALUES = [
  { icon: Sparkles, title: "Simplicity", desc: "One click. Zero friction. Editing should feel invisible." },
  { icon: Zap, title: "Speed", desc: "Optimized AI pipeline so results land in seconds, not minutes." },
  { icon: ShieldCheck, title: "Privacy", desc: "Your images are processed securely and deleted automatically." },
  { icon: Globe, title: "Accessibility", desc: "Pro-grade editing in your browser — no installs, no learning curve." },
];

function About() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Our mission</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Make <span className="gradient-text font-semibold">professional image editing</span> accessible to everyone — from solo creators to global teams.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {VALUES.map((v) => (
          <div key={v.title} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <div className="h-10 w-10 rounded-xl gradient-bg flex items-center justify-center">
              <v.icon className="h-5 w-5 text-white" />
            </div>
            <div className="mt-4 font-semibold">{v.title}</div>
            <div className="mt-1 text-sm text-muted-foreground">{v.desc}</div>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-3xl border border-border bg-card p-8 md:p-12 shadow-[var(--shadow-soft)]">
        <h2 className="text-2xl font-bold">Why we built SnapCut AI</h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Removing image backgrounds used to mean opening heavy software, learning complex tools, or hiring a designer. We believed it shouldn't.
          SnapCut AI turns a slow, manual chore into a single click — so you can spend your time on the work that actually matters.
        </p>
      </div>
    </section>
  );
}
