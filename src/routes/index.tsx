import { createFileRoute } from "@tanstack/react-router";
import heroImage from "@/assets/hero.jpg";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PricingMenu } from "@/components/PricingMenu";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eastern Movement — Premium Performance Training in Miami" },
      {
        name: "description",
        content:
          "Personal training built on movement quality and performance. Online coaching and in-person sessions at Amli Joya South Miami and Life Time Coral Gables.",
      },
      { property: "og:title", content: "Eastern Movement — Performance Training" },
      {
        property: "og:description",
        content:
          "Online coaching, in-person sessions at Amli Joya South Miami, and Life Time Coral Gables.",
      },
      { property: "og:image", content: heroImage },
      { name: "twitter:image", content: heroImage },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section className="relative min-h-screen pt-16 flex items-end overflow-hidden">
        <img
          src={heroImage}
          alt="Athlete in motion training in a minimal concrete studio"
          width={1080}
          height={1920}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pb-20 lg:pb-32 w-full">
          <div className="max-w-3xl">
            <div className="eyebrow mb-6">Eastern Movement · Miami</div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8 font-display">
              Movement.
              <br />
              Performance.
              <br />
              <span className="text-muted-foreground">Mastery.</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
              Personal training engineered around how your body is meant to
              move. Online programming and in-person coaching for clients who
              want lasting results — not workouts.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                id="consultation"
                href="#packages"
                className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background text-xs uppercase tracking-[0.2em] hover:bg-bone transition-colors"
              >
                Book a 30-Minute Consultation
              </a>
              <a
                href="#packages"
                className="inline-flex items-center justify-center px-8 py-4 border border-border text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
              >
                View Training Packages
              </a>
            </div>
          </div>
        </div>

        {/* Hero meta strip */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border/40 backdrop-blur-sm bg-background/40">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <div>Online · Worldwide</div>
            <div>Amli Joya · South Miami</div>
            <div>Life Time · Coral Gables</div>
            <div className="text-right hidden md:block">Est. Miami</div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section id="philosophy" className="py-28 lg:py-40 border-t border-border/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="eyebrow mb-5">01 — Philosophy</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              Train the way the body
              <br />
              <span className="text-muted-foreground">was designed to move.</span>
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 lg:pt-4">
            <p className="text-lg lg:text-xl leading-relaxed mb-8">
              Eastern Movement is built on a simple premise: real performance
              starts with movement quality. Every program is engineered around
              your structure, your goals, and the long arc of how you want to
              live in your body — not just how you want to look in 12 weeks.
            </p>
            <div className="grid sm:grid-cols-3 gap-8 mt-12 pt-12 border-t border-border/60">
              <div>
                <div className="text-3xl font-display mb-2">10+</div>
                <div className="eyebrow">Years coaching</div>
              </div>
              <div>
                <div className="text-3xl font-display mb-2">2</div>
                <div className="eyebrow">Premier locations</div>
              </div>
              <div>
                <div className="text-3xl font-display mb-2">∞</div>
                <div className="eyebrow">Programs written</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <PricingMenu />

      {/* LIFE TIME CTA */}
      <section
        id="lifetime"
        className="relative py-28 lg:py-40 border-t border-border/60 bg-charcoal overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--bone)_1px,_transparent_1px)] [background-size:32px_32px]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 lg:px-10 text-center">
          <div className="eyebrow mb-6">03 — Life Time · Coral Gables</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6">
            Already a member at
            <br />
            Life Time Coral Gables?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Train with Eastern Movement at your home club. Tell us about your
            goals and we'll be in touch to build your program.
          </p>
          <a
            href="/train-at-lifetime"
            className="inline-flex items-center justify-center px-10 py-5 bg-foreground text-background text-xs uppercase tracking-[0.2em] hover:bg-bone transition-colors"
          >
            Train at Life Time
            <span className="ml-3">→</span>
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
