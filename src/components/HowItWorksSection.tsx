import { motion } from "framer-motion";
import { Search, PenTool, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    num: "01",
    title: "Strategic Discovery",
    description: "We dive deep into your program's goals to tailor a strategy for your website, graphics, or intro video.",
  },
  {
    icon: PenTool,
    num: "02",
    title: "Creative Execution",
    description: "Our elite designers and editors craft your content using your team's unique colors, logos, and identity.",
  },
  {
    icon: Rocket,
    num: "03",
    title: "Game-Day Launch",
    description: "Receive your cinematic video, social graphics, or custom website, fully optimized and ready to dominate.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section-padding bg-secondary relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent hidden md:block" />

      <div className="container mx-auto max-w-6xl relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-[10px] font-heading tracking-[0.2em] uppercase text-primary font-bold">The Process</span>
          </div>
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase">How We Elevate You</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-20">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Step Number Badge */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-5xl font-heading font-black text-primary/5 select-none transition-all duration-500 group-hover:text-primary/10 group-hover:-translate-y-2">
                {step.num}
              </div>

              {/* Icon Container */}
              <div className="w-20 h-20 rounded-2xl bg-background border border-border flex items-center justify-center mb-8 relative z-10 group-hover:border-primary/50 group-hover:scale-110 transition-all duration-500 shadow-xl">
                <step.icon className="w-8 h-8 text-primary" />
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
              </div>

              <h3 className="font-heading text-xl font-bold uppercase mb-4 tracking-tight group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              
              <p className="text-muted-foreground text-sm leading-relaxed max-w-[280px]">
                {step.description}
              </p>

              {/* Connector for desktop */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[70%] w-[60%] h-px bg-gradient-to-r from-primary/30 to-transparent pointer-events-none" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

