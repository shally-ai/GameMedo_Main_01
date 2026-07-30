import { motion } from "framer-motion";
import { ExternalLink, Calendar, ChevronRight } from "lucide-react";

interface WorkWithUsADProps {
  openModal: () => void;
}

export const WorkWithUsAD = ({ openModal }: WorkWithUsADProps) => {
  return (
    <section className="py-24 bg-background border-t border-border" id="hire-us">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-5xl font-bold uppercase mb-4"
          >
            Ready to Get Started? <span className="text-primary">Let's Talk.</span>
          </motion.h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The best outcomes come from working directly with our team. You can also find us on the major freelance platforms if that's easier for your school's procurement process.
          </p>
        </div>

        {/* Primary: Direct */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#1a1208] border-2 border-primary rounded-3xl p-8 md:p-12 text-center mb-6 shadow-[0_0_60px_-20px_rgba(255,107,0,0.35)] relative overflow-hidden"
        >
          {/* BG glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10">
            <span className="inline-block bg-primary text-primary-foreground font-heading text-[10px] font-bold tracking-widest uppercase px-5 py-1.5 rounded-full mb-6">
              Best Value · Most Recommended
            </span>
            <h3 className="font-heading text-3xl md:text-4xl font-bold uppercase mb-3">
              Work Directly With GameMedo
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Get priority access, faster turnaround, dedicated support, and the full range of services under one retainer. No platform fees. No middlemen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={openModal}
                className="bg-primary text-primary-foreground font-heading text-sm tracking-widest uppercase px-10 py-5 rounded-xl glow-orange hover:brightness-110 transition-all inline-flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Schedule a Free Discovery Call
              </button>
              <a
                href="#get-quote"
                className="inline-flex items-center justify-center gap-2 border border-foreground/20 text-foreground font-heading text-sm tracking-widest uppercase px-10 py-5 rounded-xl hover:border-primary hover:text-primary transition"
              >
                Request a Quote <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Secondary: Platforms */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card/50 border border-border rounded-2xl p-6"
        >
          <p className="text-center text-xs text-muted-foreground uppercase tracking-widest font-heading mb-5">
            Also available on freelance platforms for school procurement
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.fiverr.com/vfxdesigna/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-border bg-secondary hover:bg-secondary/80 text-foreground py-3 px-8 rounded-xl text-sm font-bold tracking-wide transition-colors"
            >
              <span className="text-[#1dbf73] font-bold">fi</span>
              Fiverr
              <ExternalLink className="w-3.5 h-3.5 opacity-50" />
            </a>
            <a
              href="https://www.upwork.com/freelancers/~01c05bdfbb75cbd7ec"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-border bg-secondary hover:bg-secondary/80 text-foreground py-3 px-8 rounded-xl text-sm font-bold tracking-wide transition-colors"
            >
              <span className="text-[#14a800] font-bold">Up</span>
              Upwork
              <ExternalLink className="w-3.5 h-3.5 opacity-50" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
