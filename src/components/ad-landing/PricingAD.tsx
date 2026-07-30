import { motion } from "framer-motion";
import { Check, Calendar, ChevronRight } from "lucide-react";

interface PricingADProps {
  openModal: () => void;
}

const tiers = [
  {
    name: "Starter",
    from: "$149",
    tagline: "Per Project",
    description: "Perfect for one-off projects — a single graphic package, social post series, or roster video.",
    features: [
      "Game day graphic packages",
      "Player spotlight posts",
      "Commitment announcements",
      "48-hour turnaround",
    ],
    popular: false,
    cta: "Request a Quote",
    type: "quote",
  },
  {
    name: "Program",
    from: "$499",
    tagline: "Per Month",
    description: "Ongoing creative + admin support for your full athletic department. Our most popular plan for ADs.",
    features: [
      "Everything in Starter",
      "Monthly social media content",
      "Website updates & management",
      "Highlight video (1 per month)",
      "VA admin support (up to 10h)",
      "Priority turnaround",
    ],
    popular: true,
    cta: "Schedule a Discovery Call",
    type: "call",
  },
  {
    name: "Department",
    from: "$999",
    tagline: "Per Month",
    description: "Full-service partnership — dedicated support for large athletic programs with multiple sports.",
    features: [
      "Everything in Program",
      "Unlimited graphic requests",
      "2 highlight videos per month",
      "Roster intro video included",
      "VA support (up to 25h)",
      "Dedicated account manager",
    ],
    popular: false,
    cta: "Let's Discuss",
    type: "call",
  },
];

export const PricingAD = ({ openModal }: PricingADProps) => {
  return (
    <section className="py-24 bg-secondary border-t border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-5xl font-bold uppercase mb-4"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Flexible packages for every athletic department size. Starting is easy—scale up as you grow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl p-8 flex flex-col transition-all ${
                tier.popular
                  ? "bg-[#1a1208] border-2 border-primary shadow-[0_0_40px_-10px_rgba(255,107,0,0.35)]"
                  : "bg-card border border-border hover:border-white/20"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground font-heading text-[10px] font-bold tracking-widest uppercase px-5 py-1.5 rounded-full whitespace-nowrap shadow-lg shadow-primary/30">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="font-heading text-2xl font-bold mb-1 pt-2">{tier.name}</h3>
              <div className="mb-3">
                <span className="text-xs text-muted-foreground uppercase tracking-widest font-heading">Starting from</span>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="font-heading font-black text-4xl">{tier.from}</span>
                  <span className="text-muted-foreground text-sm">/ {tier.tagline}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-6 pb-6 border-b border-white/10 leading-relaxed">
                {tier.description}
              </p>

              <ul className="space-y-3 flex-grow mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              {tier.type === "call" ? (
                <button
                  onClick={openModal}
                  className={`w-full flex items-center justify-center gap-2 font-heading text-xs uppercase tracking-widest py-4 rounded-2xl transition-all ${
                    tier.popular
                      ? "bg-primary text-primary-foreground hover:brightness-110 glow-orange"
                      : "bg-secondary border border-border hover:border-white/20 text-foreground"
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  {tier.cta}
                </button>
              ) : (
                <a
                  href="#get-quote"
                  className="w-full flex items-center justify-center gap-2 font-heading text-xs uppercase tracking-widest py-4 rounded-2xl border border-border hover:border-white/20 text-foreground bg-secondary transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                  {tier.cta}
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground/60 mt-8 font-heading tracking-widest uppercase">
          Need a custom package for a large athletic department?{" "}
          <button onClick={openModal} className="text-primary hover:underline">
            Let's talk →
          </button>
        </p>
      </div>
    </section>
  );
};
