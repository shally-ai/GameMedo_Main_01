import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "GameMedo completely transformed how we present our athletics program. Our highlight videos get hundreds of shares now and our student-athletes feel like pros. The admin support alone saves me hours every week.",
    name: "Marcus T.",
    title: "Athletic Director",
    school: "Riverside High School, CA",
    sports: "14 Varsity Sports",
  },
  {
    quote:
      "I used to spend entire weekends updating our website and creating game-day graphics. Since hiring GameMedo, that's all handled — and it looks better than anything I could have made myself.",
    name: "Jennifer R.",
    title: "Athletic Director",
    school: "Westfield Academy, TX",
    sports: "11 Varsity Sports",
  },
  {
    quote:
      "Our recruiting portal redesign was done in less than two weeks. The quality was outstanding, and they understood exactly what coaches and student-athletes need. I've already referred three other ADs to them.",
    name: "Coach David K.",
    title: "Athletic Director & Head Coach",
    school: "Lincoln Athletic Department, OH",
    sports: "9 Varsity Sports",
  },
];

export const TestimonialsAD = () => {
  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-5xl font-bold uppercase mb-4"
          >
            What Athletic Directors Are Saying
          </motion.h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Trusted by athletic departments across the country to handle their creative, digital, and administrative needs.
          </p>
          <div className="flex items-center justify-center gap-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-primary fill-primary" />
            ))}
            <span className="ml-2 text-sm text-muted-foreground font-heading tracking-widest">5.0 Average Rating</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="bg-card border border-border rounded-2xl p-8 flex flex-col hover:border-primary/30 transition-colors"
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4 shrink-0" />
              <p className="text-sm text-foreground/80 leading-relaxed italic flex-grow mb-6">
                "{t.quote}"
              </p>
              <div className="border-t border-border pt-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-lg font-heading shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-heading text-sm font-bold tracking-wide text-foreground">{t.name}</p>
                  <p className="text-xs text-primary">{t.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-widest">
                    {t.school} · {t.sports}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
