import { useState } from "react";

type Location = "online" | "in-person";

interface Tier {
  name: string;
  frequency: string;
  description: string;
  price: { online: string; "in-person": string };
  highlighted?: boolean;
}

const tiers: Tier[] = [
  {
    name: "Foundation",
    frequency: "2× per week",
    description: "Build consistency. Movement quality, strength fundamentals, and recovery.",
    price: { online: "$320", "in-person": "$520" },
  },
  {
    name: "Performance",
    frequency: "3× per week",
    description: "Accelerate results. Progressive overload, conditioning, and mobility programming.",
    price: { online: "$460", "in-person": "$740" },
    highlighted: true,
  },
  {
    name: "Elite",
    frequency: "High volume",
    description: "Athlete-level commitment. Custom blocks, daily check-ins, and full performance support.",
    price: { online: "$680", "in-person": "$1,080" },
  },
];

export function PricingMenu() {
  const [location, setLocation] = useState<Location>("online");

  return (
    <section id="packages" className="py-28 lg:py-40 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-5">02 — Training Packages</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              Monthly subscriptions.
              <br />
              <span className="text-muted-foreground">Built around your goals.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
            <p className="text-base text-muted-foreground leading-relaxed max-w-md">
              Choose your training environment, then your weekly volume. All
              packages renew monthly and include programming, session tracking,
              and direct trainer access.
            </p>
          </div>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex border border-border p-1 rounded-sm">
            <button
              onClick={() => setLocation("online")}
              className={`px-6 py-3 text-xs uppercase tracking-[0.18em] transition-colors ${
                location === "online"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Online Coaching
            </button>
            <button
              onClick={() => setLocation("in-person")}
              className={`px-6 py-3 text-xs uppercase tracking-[0.18em] transition-colors ${
                location === "in-person"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              In-Person · Amli Joya
            </button>
          </div>
        </div>

        {/* Tiers */}
        <div className="grid md:grid-cols-3 gap-px bg-border/60 border border-border/60">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative bg-background p-8 lg:p-10 flex flex-col ${
                tier.highlighted ? "lg:-my-4 lg:py-14 bg-card" : ""
              }`}
            >
              {tier.highlighted && (
                <div className="absolute top-4 right-4 eyebrow text-[0.6rem]">
                  Most Chosen
                </div>
              )}
              <div className="eyebrow mb-3">{tier.frequency}</div>
              <h3 className="text-3xl mb-4">{tier.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8 min-h-[3rem]">
                {tier.description}
              </p>
              <div className="mb-8">
                <span className="text-5xl font-display tracking-tight">
                  {tier.price[location]}
                </span>
                <span className="text-sm text-muted-foreground ml-2">/ month</span>
              </div>
              <button
                className={`mt-auto py-4 text-xs uppercase tracking-[0.18em] transition-colors ${
                  tier.highlighted
                    ? "bg-foreground text-background hover:bg-bone"
                    : "border border-border hover:bg-foreground hover:text-background"
                }`}
              >
                Start Training
              </button>
            </div>
          ))}
        </div>

        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground text-center mt-10">
          Cancel anytime · 30-minute consultation included
        </p>
      </div>
    </section>
  );
}
