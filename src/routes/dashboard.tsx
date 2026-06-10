import { createFileRoute, Link } from "@tanstack/react-router";
import { Image as ImageIcon, Coins, CreditCard, Clock } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — SnapCut AI" },
      { name: "description", content: "Track your usage, credits, subscription and download history." },
    ],
  }),
  component: Dashboard,
});

const STATS = [
  { icon: ImageIcon, label: "Images processed", value: "128" },
  { icon: Coins, label: "Remaining credits", value: "72" },
  { icon: CreditCard, label: "Current plan", value: "Pro" },
  { icon: Clock, label: "Next billing", value: "Apr 12, 2026" },
];

const HISTORY = [
  { name: "hero-shot.png", date: "Today · 14:21", status: "Processed" },
  { name: "product-1.png", date: "Today · 13:02", status: "Processed" },
  { name: "headshot.png", date: "Yesterday", status: "Processed" },
  { name: "banner.png", date: "Mar 28", status: "Processed" },
];

function Dashboard() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="mt-1 text-muted-foreground">Here's an overview of your account.</p>
        </div>
        <Link to="/app" className="inline-flex h-10 items-center rounded-full px-5 text-sm font-semibold text-white gradient-bg shadow-[var(--shadow-glow)]">
          New upload
        </Link>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl gradient-bg flex items-center justify-center">
                <s.icon className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="mt-4 text-2xl font-bold">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
          <h3 className="text-lg font-semibold">Recent activity</h3>
          <div className="mt-4 divide-y divide-border">
            {HISTORY.map((h, i) => (
              <div key={i} className="flex items-center justify-between py-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg checker-bg" />
                  <div>
                    <div className="font-medium">{h.name}</div>
                    <div className="text-xs text-muted-foreground">{h.date}</div>
                  </div>
                </div>
                <span className="text-xs rounded-full px-2.5 py-1 bg-primary/10 text-primary font-medium">{h.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
          <h3 className="text-lg font-semibold">Subscription</h3>
          <p className="mt-1 text-sm text-muted-foreground">You're on the Pro plan.</p>
          <div className="mt-4 rounded-xl gradient-bg p-5 text-white">
            <div className="text-xs uppercase tracking-wider opacity-80">Pro · ₹299/mo</div>
            <div className="mt-1 text-2xl font-bold">Unlimited HD removals</div>
            <div className="mt-3 text-sm opacity-90">Renews Apr 12, 2026</div>
          </div>
          <Link to="/pricing" className="mt-4 inline-flex h-10 items-center rounded-full border border-border px-4 text-sm font-medium hover:bg-accent transition-colors">
            Manage plan
          </Link>
        </div>
      </div>
    </section>
  );
}
