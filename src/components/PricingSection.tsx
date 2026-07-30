import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, ShieldCheck, BadgeCheck, ThumbsUp } from "lucide-react";
import { BookingModal } from "./BookingModal";
import { supabase } from "@/integrations/supabase/client";

// Fallback defaults — used if Supabase has no data yet
const defaultPackages = [
  {
    name: "Basic",
    price: "$199",
    unit: "/mo",
    subtitle: "For small programs ready to ditch the spreadsheets.",
    cta: "Get Started — Monthly",
    popular: false,
    features: ["Athletics website", "Roster & schedule management", "Basic QR ticketing", "Email support"],
  },
  {
    name: "Standard",
    price: "$399",
    unit: "/mo",
    subtitle: "Most popular for high schools running 10+ teams.",
    cta: "Book Demo — Monthly",
    popular: true,
    features: ["Everything in Basic", "Live scores & streaming", "Auto social graphics", "Advanced ticketing analytics", "Priority support"],
  },
  {
    name: "Premium",
    price: "Custom",
    unit: "",
    subtitle: "For colleges and large districts that demand everything.",
    cta: "Book Demo",
    popular: false,
    features: ["Everything in Standard", "Cinematic intro videos", "Dedicated success manager", "Custom integrations & SSO", "On-site onboarding"],
  },
];

interface PricingPackage {
  name: string;
  price: string;
  unit?: string;
  subtitle?: string;
  cta?: string;
  popular?: boolean;
  features: string | string[];
}

const PricingSection = () => {
  const [packages, setPackages] = useState(defaultPackages);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const { data } = await supabase
          .from("content")
          .select("pricing")
          .eq("id", "main")
          .maybeSingle();

        if (data?.pricing && Array.isArray(data.pricing)) {
          // Merge Supabase data with defaults — Supabase wins for shared fields,
          // defaults fill in new fields (subtitle, cta, popular) not yet in DB
          const merged = (data.pricing as PricingPackage[]).map((pkg, i) => {
            const fallback = defaultPackages[i] || defaultPackages[0];
            return {
              // New design fields — use DB value if set, else fall back to default
              name: pkg.name || fallback.name,
              price: pkg.price || fallback.price,
              unit: pkg.unit ?? fallback.unit,
              subtitle: (pkg as any).subtitle || fallback.subtitle,
              cta: (pkg as any).cta || fallback.cta,
              popular: i === 1, // Always mark the middle card as popular
              // Features: DB stores as comma-separated string, convert to array
              features:
                typeof pkg.features === "string"
                  ? pkg.features.split(",").map((f) => f.trim()).filter(Boolean)
                  : Array.isArray(pkg.features)
                  ? pkg.features
                  : fallback.features,
            };
          });
          setPackages(merged);
        }
      } catch (err) {
        console.error("PricingSection: failed to fetch from Supabase", err);
        // Silently fall back to defaults
      }
    };

    fetchPricing();
  }, []);

  return (
    <section id="pricing" className="section-padding bg-background">
      <div className="container mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase mb-3">Simple Pricing</h2>
          <p className="text-muted-foreground mb-1">Choose the plan that fits your program. No hidden fees.</p>
          <p className="text-primary/80 text-xs font-heading tracking-[0.2em] uppercase">
            Most programs start with Standard — our most popular pick.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-md md:max-w-3xl lg:max-w-none mx-auto mt-10 items-start">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative flex flex-col text-left rounded-[2rem] p-7 min-w-0 break-words transition-all duration-300 ${
                pkg.popular
                  ? "bg-[#1a1208] border-2 border-primary shadow-[0_0_50px_-10px_rgba(255,107,0,0.4)]"
                  : "bg-[#111111] border border-white/8 hover:border-white/20"
              }`}
            >
              {/* Most Popular badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-primary text-primary-foreground font-heading text-xs font-bold tracking-widest uppercase px-5 py-1.5 rounded-full whitespace-nowrap shadow-lg shadow-primary/30">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Card header */}
              <div className="pt-2 mb-6">
                <h3 className={`font-heading text-2xl font-bold mb-2 ${pkg.popular ? "text-foreground" : "text-foreground/90"}`}>
                  {pkg.name}
                </h3>
                {pkg.subtitle && (
                  <p className="text-muted-foreground text-sm leading-relaxed">{pkg.subtitle}</p>
                )}
              </div>

              {/* Price */}
              <div className="mb-5">
                <span className="font-heading font-black leading-none text-5xl md:text-6xl text-foreground">
                  {pkg.price}
                </span>
                {pkg.unit && (
                  <span className="text-muted-foreground text-base ml-1">{pkg.unit}</span>
                )}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => pkg.name.toLowerCase() === "premium" ? setIsModalOpen(true) : window.location.href='/order'}
                className={`w-full font-heading text-sm font-bold tracking-wider uppercase py-4 rounded-2xl mb-7 transition-all duration-300 active:scale-95 ${
                  pkg.popular
                    ? "bg-primary text-primary-foreground hover:brightness-110 shadow-lg shadow-primary/30"
                    : "bg-white/8 text-foreground border border-white/10 hover:bg-white/15 hover:border-white/20"
                }`}
              >
                {pkg.cta || (pkg.name.toLowerCase() === "premium" ? "Book Demo" : "Quick Start")}
              </button>

              {/* Divider */}
              <div className="h-px bg-white/8 mb-6" />

              {/* Features list */}
              <ul className="space-y-3.5 flex-1">
                {(Array.isArray(pkg.features) ? pkg.features : []).map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-10 mb-6 text-xs text-muted-foreground font-heading tracking-widest uppercase"
        >
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-500" /> Secure Payment
          </span>
          <span className="w-1 h-1 rounded-full bg-border hidden sm:block" />
          <span className="flex items-center gap-2">
            <BadgeCheck className="w-4 h-4 text-primary" /> 50+ Programs Served
          </span>
          <span className="w-1 h-1 rounded-full bg-border hidden sm:block" />
          <span className="flex items-center gap-2">
            <ThumbsUp className="w-4 h-4 text-orange-400" /> Satisfaction Guaranteed
          </span>
        </motion.div>

        {/* Rescue link */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground/70 text-sm"
        >
          Not sure which plan is right?{" "}
          <button
            onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
            className="text-primary hover:underline font-medium transition-colors"
          >
            Book a free 15-min strategy call →
          </button>
        </motion.p>
      </div>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default PricingSection;
