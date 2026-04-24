import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-display text-base tracking-[0.18em] uppercase font-medium">
            Eastern<span className="text-muted-foreground"> / </span>Movement
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-sm">
          <a href="#packages" className="text-muted-foreground hover:text-foreground transition-colors">
            Packages
          </a>
          <a href="#philosophy" className="text-muted-foreground hover:text-foreground transition-colors">
            Philosophy
          </a>
          <Link to="/train-at-lifetime" className="text-muted-foreground hover:text-foreground transition-colors">
            Life Time
          </Link>
        </nav>
        <a
          href="#consultation"
          className="text-xs uppercase tracking-[0.18em] px-4 py-2 border border-border hover:bg-foreground hover:text-background transition-colors"
        >
          Book Consultation
        </a>
      </div>
    </header>
  );
}
