import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const withoutGameMedo = [
  "Multiple vendors & freelancers to manage",
  "More coordination and back-and-forth emails",
  "Wasted time on administrative & creative tasks",
  "Inconsistent branding across platforms",
  "Slow turnaround times for game day content",
  "Added stress during busy sports seasons"
];

const withGameMedo = [
  "One reliable, dedicated partner",
  "Streamlined communication & faster execution",
  "Time freed up to focus on athletes & coaches",
  "Consistent, professional branding everywhere",
  "Rapid delivery for urgent game day needs",
  "Peace of mind knowing the work is handled"
];

export const ComparisonAD = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-5xl font-bold uppercase mb-4"
          >
            The Clear Choice for ADs
          </motion.h2>
          <p className="text-muted-foreground text-lg">See why athletic departments are consolidating their services with us.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Without GameMedo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border p-8 rounded-3xl"
          >
            <h3 className="font-heading text-xl font-bold text-center uppercase tracking-wide mb-8 text-muted-foreground border-b border-border pb-4">
              Without GameMedo
            </h3>
            <ul className="space-y-5">
              {withoutGameMedo.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 bg-red-500/10 p-1 rounded-full shrink-0">
                    <X className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* With GameMedo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#1a1208] border-2 border-primary p-8 rounded-3xl shadow-[0_0_40px_-10px_rgba(255,107,0,0.3)] relative"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-primary text-primary-foreground font-heading text-[10px] font-bold tracking-widest uppercase px-5 py-1.5 rounded-full whitespace-nowrap shadow-lg">
                The GameMedo Way
              </span>
            </div>
            <h3 className="font-heading text-xl font-bold text-center uppercase tracking-wide mb-8 text-foreground border-b border-white/10 pb-4">
              With GameMedo
            </h3>
            <ul className="space-y-5">
              {withGameMedo.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 bg-green-500/20 p-1 rounded-full shrink-0">
                    <Check className="w-4 h-4 text-green-500" />
                  </div>
                  <span className="text-foreground font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
