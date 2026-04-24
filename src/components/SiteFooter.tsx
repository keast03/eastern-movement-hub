export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-ink">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="font-display text-lg tracking-[0.18em] uppercase">
            Eastern <span className="text-muted-foreground">/</span> Movement
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
            Performance training built on movement quality. Online and in-person
            coaching for serious clients.
          </p>
        </div>
        <div>
          <div className="eyebrow mb-4">Train</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Online Coaching</li>
            <li>Amli Joya — South Miami</li>
            <li>Life Time — Coral Gables</li>
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-4">Contact</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>hello@easternmovement.com</li>
            <li>Miami, FL</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row justify-between gap-2 text-xs text-muted-foreground tracking-wider uppercase">
          <span>© {new Date().getFullYear()} Eastern Movement</span>
          <span>Movement · Performance · Mastery</span>
        </div>
      </div>
    </footer>
  );
}
