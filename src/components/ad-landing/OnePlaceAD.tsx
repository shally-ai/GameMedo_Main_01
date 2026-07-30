import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export const OnePlaceAD = () => {
  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase leading-tight mb-6 text-foreground">
              Everything Your <span className="text-primary">Athletic Department</span> Needs in One Place
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Stop juggling multiple freelancers, dealing with unresponsive agencies, and trying to learn complicated design software yourself. GameMedo consolidates all your creative, digital, and administrative needs under one reliable roof.
            </p>
            
            <ul className="space-y-4">
              {[
                "No more chasing down multiple vendors for a single project.",
                "Consistent branding across videos, graphics, and your website.",
                "Faster turnaround times for urgent game-day announcements.",
                "More time for you to focus on your coaches and student-athletes."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 w-full bg-secondary border border-border p-8 rounded-3xl shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <h3 className="font-heading text-2xl font-bold uppercase mb-6 text-center">The GameMedo Advantage</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-xl border border-border text-center">
                  <span className="block text-3xl font-bold text-primary mb-1">1</span>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-heading">Reliable Partner</span>
                </div>
                <div className="bg-card p-4 rounded-xl border border-border text-center">
                  <span className="block text-3xl font-bold text-primary mb-1">0</span>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-heading">Headaches</span>
                </div>
                <div className="col-span-2 bg-card p-6 rounded-xl border border-border mt-2">
                  <p className="text-sm italic text-muted-foreground text-center">
                    "Since switching to GameMedo, our athletic department runs smoother. We finally have a consistent brand image and our fans love the new content."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
