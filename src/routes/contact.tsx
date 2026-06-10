import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SnapCut AI" },
      { name: "description", content: "Get in touch with the SnapCut AI team. We typically respond within one business day." },
      { property: "og:title", content: "Contact — SnapCut AI" },
      { property: "og:description", content: "Get in touch with the SnapCut AI team." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Get in touch</h1>
        <p className="mt-3 text-muted-foreground">Questions, feedback or partnerships — we'd love to hear from you.</p>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); toast.success("Message sent! We'll be in touch."); (e.target as HTMLFormElement).reset(); }}
        className="mt-10 rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)] space-y-4"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Name" name="name" placeholder="Your name" required />
          <Input label="Email" name="email" type="email" placeholder="you@email.com" required />
        </div>
        <div>
          <label className="text-sm font-medium">Message</label>
          <textarea
            required
            name="message"
            rows={5}
            placeholder="Tell us a bit about what you need…"
            className="mt-1.5 w-full rounded-2xl border border-input bg-background p-4 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button
          type="submit"
          className="inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white gradient-bg shadow-[var(--shadow-glow)] hover:opacity-95 transition-opacity"
        >
          <Mail className="h-4 w-4" /> Send message
        </button>
      </form>
    </section>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        {...rest}
        className="mt-1.5 w-full h-11 rounded-full border border-input bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
