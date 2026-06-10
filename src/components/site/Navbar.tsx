import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

const NAV = [
  { to: "/app", label: "Remove BG" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 glass border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg gradient-bg shadow-[var(--shadow-glow)]">
            <Sparkles className="h-4 w-4 text-white" />
          </span>
          <span className="text-base">
            Snap<span className="gradient-text">Cut</span> AI
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/auth"
            className="hidden sm:inline-flex h-9 items-center px-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign in
          </Link>
          <Link
            to="/app"
            className="inline-flex h-9 items-center rounded-full px-4 text-sm font-medium text-white gradient-bg shadow-[var(--shadow-glow)] hover:opacity-95 transition-opacity"
          >
            Try free
          </Link>
        </div>
      </div>
    </header>
  );
}
