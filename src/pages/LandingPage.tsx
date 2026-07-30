import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Check, Star, Play, ShieldCheck, BadgeCheck, ThumbsUp, Calendar, Zap, Film, Palette, Globe, GraduationCap } from "lucide-react";
import { BookingModal } from "@/components/BookingModal";
import SEO from "@/components/SEO";
import logo from "@/assets/logo.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import { trackConversion } from "@/lib/trackConversion";

const testimonials = [
  {
    quote: "Our players were hyped! The graphics GameMedo created set the tone for every home game. Best investment we made all season.",
    name: "Coach Martinez",
    school: "Lincoln High School",
  },
  {
    quote: "The highlight videos and player spotlights were absolutely professional. Parents and fans loved every second.",
    name: "AD Johnson",
    school: "Westfield Academy",
  },
  {
    quote: "GameMedo transformed our team's brand. We've already ordered for next season. Incredible quality and turnaround.",
    name: "Coach Davis",
    school: "Riverside High",
  },
];

const services = [
  { icon: Film, label: "Sports Intro Videos", desc: "Cinematic game-day openers for jumbotrons & social" },
  { icon: Palette, label: "Social Media Graphics", desc: "Game posters, commitment reveals, season packages" },
  { icon: Globe, label: "Athletic Websites", desc: "Roster, schedules, scores & recruiting portals" },
  { icon: GraduationCap, label: "Recruiting Highlights", desc: "Pro-quality reels that get athletes noticed" },
];

interface PricingPkg {
  name: string;
  price: string;
  unit?: string;
  features: string | string[];
  popular?: boolean;
}

// Fallback used while Supabase loads or if fetch fails
const fallbackPricing: PricingPkg[] = [
  { name: "Basic",    price: "$79",   unit: "/ project", popular: false, features: ["Game Day Graphics", "Highlight Clips", "Social Templates", "48h Turnaround"] },
  { name: "Standard", price: "$259",  unit: "/ project", popular: true,  features: ["All Basic Features", "Custom Motion Graphics", "Recruiting Profiles", "Priority Support"] },
  { name: "Premium",  price: "$599",  unit: "/ project", popular: false, features: ["All Standard Features", "Cinematic Hype Reels", "Full Season Branding", "Priority 24h Support"] },
];

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pricing, setPricing] = useState<PricingPkg[]>(fallbackPricing);

  // Fetch live pricing from Supabase (same source as homepage)
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const { data } = await supabase
          .from("content")
          .select("pricing")
          .eq("id", "main")
          .maybeSingle();

        if (data?.pricing && Array.isArray(data.pricing)) {
          const merged = (data.pricing as PricingPkg[]).map((pkg, i) => ({
            name: pkg.name || fallbackPricing[i]?.name,
            price: pkg.price || fallbackPricing[i]?.price,
            unit: (pkg as any).unit ?? fallbackPricing[i]?.unit,
            popular: i === 1, // always highlight middle card
            features:
              typeof pkg.features === "string"
                ? pkg.features.split(",").map((f) => f.trim()).filter(Boolean)
                : Array.isArray(pkg.features)
                ? pkg.features
                : fallbackPricing[i]?.features,
          }));
          setPricing(merged);
        }
      } catch (err) {
        console.error("LandingPage: pricing fetch failed, using fallback", err);
      }
    };
    fetchPricing();
  }, []);

  const openModal = () => {
    trackConversion("lp_cta_click");
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="High School Sports Intro Videos & Graphics | GameMedo"
        description="Professional sports intro videos, social media graphics & athletic websites for high school programs. Trusted by 50+ varsity ADs. Book a free strategy call today."
        keywords="high school sports intro videos, varsity sports graphics, athletic department website, sports highlight reel, game day graphics, recruiting highlight video"
        url="https://gamemedo.com/lp"
        noIndex={true}
      />

      {/* ─── Minimal Header ─────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src={logo} alt="GameMedo" className="h-9 w-9 rounded-full" />
            <span className="font-heading text-xl font-bold tracking-wider">
              GAME<span className="text-primary">MEDO</span>
            </span>
          </a>
          <button
            onClick={openModal}
            className="bg-primary text-primary-foreground font-heading text-xs tracking-widest uppercase px-5 py-2.5 rounded-lg hover:brightness-110 transition glow-orange"
          >
            Book Free Call
          </button>
        </div>
      </header>

      {/* ─── Hero ───────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Sports stadium" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/75 to-background" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
          {/* Trust pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-8"
          >
            <span className="text-xs font-heading tracking-[0.25em] uppercase text-primary border border-primary/30 px-4 py-2 rounded-full bg-primary/5">
              Trusted by 50+ Varsity ADs
            </span>
            <span className="text-xs font-heading tracking-[0.2em] uppercase text-orange-300 border border-orange-400/40 px-4 py-2 rounded-full bg-orange-400/10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              Limited Spring Slots
            </span>
          </motion.div>

          {/* Headline — matches ad keyword intent */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold uppercase leading-[0.92] tracking-tight mb-6"
          >
            High School Sports<br />
            <span className="text-gradient">Intro Videos &amp; Graphics</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Cinematic game-day videos, social media graphics, and athletic websites for high school &amp; varsity programs — elite quality, delivered fast.
          </motion.p>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
          >
            <a
              href="/order"
              className="bg-primary text-primary-foreground font-heading text-sm tracking-widest uppercase px-10 py-5 rounded-xl glow-orange hover:brightness-110 transition-all inline-flex items-center justify-center gap-2 text-base"
            >
              Quick Start
              <span>→</span>
            </a>
            <button
              onClick={openModal}
              className="inline-flex items-center justify-center gap-2 border border-foreground/20 text-foreground font-heading text-sm tracking-widest uppercase px-10 py-5 rounded-xl hover:border-primary hover:text-primary transition"
            >
              <Calendar className="w-4 h-4" />
              Book Free Call
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xs text-muted-foreground/60 uppercase tracking-[0.2em] font-heading"
          >
            Free 15-min call · No credit card · No commitment
          </motion.p>
        </div>
      </section>

      {/* ─── What We Do ─────────────────────────────────────────── */}
      <section className="py-20 bg-secondary">
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-4xl font-bold uppercase text-center mb-12"
          >
            Everything Your Program Needs
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-sm font-bold uppercase tracking-wider mb-2">{s.label}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ───────────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-4xl font-bold uppercase text-center mb-4"
          >
            Coaches &amp; ADs Love Us
          </motion.h2>
          <p className="text-muted-foreground text-center mb-12 text-sm">Rated 5 stars by 50+ varsity programs across the country.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="bg-card border border-border rounded-2xl p-7"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading text-xs font-bold uppercase tracking-wider">{t.name}</p>
                    <p className="text-muted-foreground text-[10px] uppercase tracking-widest">{t.school}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing Snapshot (live from Supabase) ───────────────── */}
      <section className="py-20 bg-secondary">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase mb-3">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground mb-10">No hidden fees. Choose the package that fits your program.</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {pricing.map((pkg, i) => {
                const featureList = Array.isArray(pkg.features)
                  ? pkg.features
                  : typeof pkg.features === "string"
                  ? (pkg.features as string).split(",").map((f) => f.trim()).filter(Boolean)
                  : [];
                return (
                  <div
                    key={pkg.name || i}
                    className={`relative rounded-[2rem] p-7 text-left transition-all ${
                      pkg.popular
                        ? "bg-[#1a1208] border-2 border-primary shadow-[0_0_40px_-10px_rgba(255,107,0,0.4)]"
                        : "bg-card border border-border hover:border-white/20"
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="bg-primary text-primary-foreground font-heading text-[10px] font-bold tracking-widest uppercase px-5 py-1.5 rounded-full whitespace-nowrap shadow-lg shadow-primary/30">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <h3 className="font-heading text-2xl font-bold mb-3 pt-2">{pkg.name}</h3>
                    <div className="mb-5">
                      <span className="font-heading font-black text-5xl text-foreground">{pkg.price}</span>
                      {pkg.unit && <span className="text-muted-foreground text-base ml-1">{pkg.unit}</span>}
                    </div>
                    <ul className="space-y-3">
                      {featureList.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={openModal}
                      className={`w-full mt-6 font-heading text-xs font-bold tracking-widest uppercase py-4 rounded-2xl transition-all ${
                        pkg.popular
                          ? "bg-primary text-primary-foreground hover:brightness-110"
                          : "bg-white/8 text-foreground border border-white/10 hover:bg-white/15"
                      }`}
                    >
                      Book Free Demo
                    </button>
                  </div>
                );
              })}
            </div>

            <p className="text-muted-foreground/70 text-xs uppercase tracking-widest font-heading">
              Not sure which plan fits? <button onClick={openModal} className="text-primary hover:underline ml-1">Book a free 15-min call →</button>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Final CTA ──────────────────────────────────────────── */}
      <section className="py-24 bg-background text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase mb-4">
              Ready to <span className="text-gradient">Elevate</span> Your Program?
            </h2>
            <p className="text-muted-foreground mb-8 text-base leading-relaxed">
              Book a free 15-minute call. We'll audit your current brand and show you exactly how we can help — no pressure, no commitment.
            </p>
            <button
              onClick={openModal}
              className="bg-primary text-primary-foreground font-heading text-sm tracking-widest uppercase px-12 py-5 rounded-xl glow-orange hover:brightness-110 transition-all inline-flex items-center gap-2 text-base"
            >
              <Calendar className="w-5 h-5" />
              Book Free Strategy Call
            </button>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-5 mt-8 text-xs text-muted-foreground font-heading tracking-widest uppercase">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green-500" /> Secure</span>
              <span className="flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-primary" /> 50+ Programs</span>
              <span className="flex items-center gap-1.5"><ThumbsUp className="w-4 h-4 text-orange-400" /> 5-Star Rated</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Minimal Footer ─────────────────────────────────────── */}
      <footer className="border-t border-border py-6 text-center">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} GameMedo</span>
          <a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-primary transition-colors">Terms</a>
          <a href="/" className="hover:text-primary transition-colors">Main Site</a>
        </div>
      </footer>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default LandingPage;
