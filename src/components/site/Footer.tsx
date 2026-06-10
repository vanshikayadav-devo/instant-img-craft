import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-background/40">
      <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg gradient-bg">
              <Sparkles className="h-4 w-4 text-white" />
            </span>
            SnapCut AI
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Remove image backgrounds instantly with AI. Built for creators, ecommerce and teams.
          </p>
        </div>
        <FooterCol title="Product" links={[["/app","Remove BG"],["/pricing","Pricing"],["/dashboard","Dashboard"]]} />
        <FooterCol title="Company" links={[["/about","About"],["/contact","Contact"]]} />
        <FooterCol title="Legal" links={[["/privacy","Privacy"],["/terms","Terms"]]} />
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} SnapCut AI. All rights reserved.
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string,string][] }) {
  return (
    <div>
      <div className="text-sm font-semibold mb-3">{title}</div>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {links.map(([to, label]) => (
          <li key={to}>
            <Link to={to} className="hover:text-foreground transition-colors">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
