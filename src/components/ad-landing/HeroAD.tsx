import { motion } from "framer-motion";
import { Calendar, Clock, MonitorPlay, Users, LayoutDashboard, ClipboardList } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroADProps {
  openModal: () => void;
}

const problems = [
  { icon: Clock, text: "Limited time" },
  { icon: Users, text: "Managing multiple sports programs" },
  { icon: MonitorPlay, text: "Keeping websites updated" },
  { icon: LayoutDashboard, text: "Promoting teams & athletes" },
  { icon: ClipboardList, text: "Handling administrative tasks" },
];

export const HeroAD = ({ openModal }: HeroADProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Athletic facility" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-heading text-xs tracking-widest uppercase"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          For Athletic Directors
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-[1.1] tracking-tight mb-8"
        >
          Get Your Time Back.<br />
          <span className="text-gradient">Elevate Your Athletic Program.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
            As an Athletic Director, you wear too many hats. You shouldn't have to be a graphic designer, webmaster, and social media manager on top of your real job.
          </p>

          <div className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 text-left">
            <h3 className="font-heading text-lg font-bold uppercase tracking-wider text-foreground mb-4 text-center border-b border-white/10 pb-4">
              We Solve Your Biggest Challenges
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {problems.map((prob, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <prob.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground/80">{prob.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-primary font-bold text-lg">GameMedo handles the creative & admin work so you can focus on your athletes.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={openModal}
            className="bg-primary text-primary-foreground font-heading text-sm tracking-widest uppercase px-10 py-5 rounded-xl glow-orange hover:brightness-110 transition-all inline-flex items-center justify-center gap-2 text-base"
          >
            <Calendar className="w-5 h-5" />
            Schedule a Discovery Call
          </button>
          <a
            href="#get-quote"
            className="inline-flex items-center justify-center gap-2 border border-foreground/20 text-foreground font-heading text-sm tracking-widest uppercase px-10 py-5 rounded-xl hover:border-primary hover:text-primary transition"
          >
            Request a Free Quote
          </a>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-4 text-xs text-muted-foreground/60 uppercase tracking-[0.2em] font-heading"
        >
          Free 15-min call · Custom proposal in 24h · No commitment
        </motion.p>
      </div>
    </section>
  );
};
