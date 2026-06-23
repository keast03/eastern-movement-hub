import { createFileRoute } from "@tanstack/react-router";
import profileImage from "@/assets/hero.jpg";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Eastern Movement" },
      {
        name: "description",
        content: "Meet Kevin East, founder of Eastern Movement. Personal performance training engineered around movement quality and biomechanical mastery.",
      },
    ],
  }),
  component: () => <About />,
});

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-24 lg:pt-40 lg:pb-40">
        {/* Subtle Top Breadcrumb */}
        <div className="border-b border-border/40 pb-6 mb-16 lg:mb-24">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Eastern Movement <span className="mx-2 text-border">/</span> About Me
          </div>
        </div>

        {/* Core Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Your Profile Photo */}
          <div className="lg:col-span-5 bg-muted aspect-[3/4] relative overflow-hidden border border-border/40">
            <img
              src={profileImage}
              alt="Kevin East - Performance Coach"
              className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
            />
          </div>

          {/* Right Column: Narrative Biography */}
          <div className="lg:col-span-7 space-y-8 lg:space-y-10">
            <div>
              <div className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
                02 — Kevin East / Founder & Coach
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display leading-[1.05] tracking-tight">
                Movement quality is the foundation of high performance.
              </h1>
            </div>

            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed font-light">
              <p>
                Real athletic longevity and structural performance start by cutting through the noise. Every program I design is mechanically engineered around an individual's physical framework, functional diagnostic screens, and clear metric targets.
              </p>
              
              <p>
                My coaching philosophy treats training with clinical intent. By prioritizing movement mechanics over simple fatigue, we shift daily workouts away from mindless output and transform them into technical physical mastery.
              </p>

              <p>
                Whether building automated remote strategies or coaching on the training floor at premier facilities, the directive remains absolute: building a body capable of moving flawlessly and performing with zero restriction.
              </p>
            </div>

            {/* Signature Block */}
            <div className="pt-6 border-t border-border/40">
              <div className="text-sm uppercase tracking-widest font-medium text-foreground">Kevin East</div>
              <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground mt-1">
                NASM-CES · Performance Coach
              </div>
            </div>

          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}