import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Zap, ShieldCheck, Wand2, ShoppingBag, Megaphone, Palette, Camera, Quote } from "lucide-react";
import { BeforeAfterSlider } from "@/components/site/BeforeAfterSlider";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { PricingCards } from "@/components/site/PricingCards";
import demoBefore from "@/assets/demo-before.jpg";
import demoAfter from "@/assets/demo-after.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SnapCut AI — Remove Image Background in One Click" },
      { name: "description", content: "AI background removal in seconds. Drag, drop, download transparent PNGs. Built for ecommerce, designers and creators." },
      { property: "og:title", content: "SnapCut AI — Remove Image Background in One Click" },
      { property: "og:description", content: "AI background removal in seconds. Built for ecommerce, designers and creators." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <UseCases />
      <Testimonials />
      <PricingSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[1200px] rounded-full blur-3xl opacity-30 gradient-bg" />
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Powered by next-gen AI · v2.0
          </div>
          <h1 className="mt-5 text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight">
            Remove background from any image in{" "}
            <span className="gradient-text">one click</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl">
            AI-powered background removal in seconds. No editing skills required. Upload an image and get a clean, transparent PNG instantly.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/app"
              className="inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white gradient-bg shadow-[var(--shadow-glow)] hover:opacity-95 transition-opacity"
            >
              Upload image <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex h-12 items-center rounded-full border border-border bg-card px-6 text-sm font-semibold hover:bg-accent transition-colors"
            >
              See demo
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-primary" /> One click</span>
            <span className="inline-flex items-center gap-1.5"><Wand2 className="h-3.5 w-3.5 text-primary" /> HD quality</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> Secure upload</span>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl gradient-bg opacity-20 blur-2xl" />
          <BeforeAfterSlider beforeSrc={demoBefore} afterSrc={demoAfter} />
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: Zap, title: "Lightning fast", desc: "Processed in 1–3 seconds on optimized AI workers." },
    { icon: Wand2, title: "HD quality", desc: "Clean cutouts with crisp edges, even around hair." },
    { icon: ShieldCheck, title: "Private & secure", desc: "HTTPS upload. Images auto-deleted after processing." },
    { icon: Sparkles, title: "No skills needed", desc: "Drop your image. We handle the rest." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.title} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <div className="h-10 w-10 rounded-xl gradient-bg flex items-center justify-center shadow-[var(--shadow-glow)]">
              <it.icon className="h-5 w-5 text-white" />
            </div>
            <div className="mt-4 font-semibold">{it.title}</div>
            <div className="mt-1 text-sm text-muted-foreground">{it.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Upload image", desc: "Drag & drop a PNG, JPG or WEBP file." },
    { n: "02", title: "AI removes background", desc: "Our model isolates your subject in seconds." },
    { n: "03", title: "Download result", desc: "Save your transparent PNG, ready to use." },
  ];
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-20">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold">How it works</h2>
        <p className="mt-3 text-muted-foreground">Three steps from raw photo to ready-to-use cutout.</p>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="relative rounded-2xl border border-border bg-card p-7">
            <div className="text-sm font-mono gradient-text">{s.n}</div>
            <div className="mt-2 text-lg font-semibold">{s.title}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function UseCases() {
  const cards = [
    { icon: ShoppingBag, title: "Ecommerce", desc: "Clean product shots on white or transparent backgrounds for any storefront." },
    { icon: Megaphone, title: "Marketing", desc: "Hero images, banners and ads without waiting on a designer." },
    { icon: Palette, title: "Design", desc: "Composite mockups and creative work in a fraction of the time." },
    { icon: Camera, title: "Social media", desc: "Stand-out posts, stories and thumbnails in one tap." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold">Built for every kind of creator</h2>
        <p className="mt-3 text-muted-foreground">From single sellers to global teams.</p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.title} className="group rounded-2xl border border-border bg-card p-6 hover:-translate-y-0.5 transition-transform shadow-[var(--shadow-soft)]">
            <c.icon className="h-6 w-6 text-primary" />
            <div className="mt-4 font-semibold">{c.title}</div>
            <div className="mt-1 text-sm text-muted-foreground">{c.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { q: "SnapCut AI saved our store hours of editing. Product photos look amazing.", a: "Ananya R.", r: "Founder, Loom & Hue" },
    { q: "The cutouts are clean — even around hair. Faster than anything we've tried.", a: "Marcus D.", r: "Creative Director" },
    { q: "We removed backgrounds for our entire catalog in one afternoon.", a: "Priya S.", r: "Marketing Lead" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((t, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <Quote className="h-5 w-5 text-primary" />
            <p className="mt-3 text-sm leading-relaxed">{t.q}</p>
            <div className="mt-5 text-sm">
              <div className="font-semibold">{t.a}</div>
              <div className="text-muted-foreground text-xs">{t.r}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold">Simple, transparent pricing</h2>
        <p className="mt-3 text-muted-foreground">Start free. Upgrade when you're ready.</p>
      </div>
      <div className="mt-12"><PricingCards /></div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold">Frequently asked</h2>
        <p className="mt-3 text-muted-foreground">Everything you need to know about SnapCut AI.</p>
      </div>
      <div className="mt-10"><FAQAccordion /></div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16">
      <div className="relative overflow-hidden rounded-3xl gradient-bg p-12 md:p-16 text-center text-white shadow-[var(--shadow-glow)]">
        <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, white, transparent 50%), radial-gradient(circle at 80% 70%, white, transparent 50%)" }} />
        <h2 className="relative text-3xl md:text-4xl font-bold">Start removing backgrounds instantly</h2>
        <p className="relative mt-3 text-white/80 max-w-xl mx-auto">No signup needed to try. Your first 5 images are on us, every day.</p>
        <Link to="/app" className="relative mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-foreground hover:bg-white/90 transition-colors">
          Try SnapCut AI free <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
