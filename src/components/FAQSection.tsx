import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What types of sports intro videos do you create?",
    a: "We create high-impact, cinematic intro videos for individual athletes and entire teams. Whether it's for a jumbotron, social media reveal, or recruiting highlights, we use pro-level effects and editing to make your program stand out.",
  },
  {
    q: "Can you handle social media graphics for an entire season?",
    a: "Absolutely! We specialize in seasonal packages for social media and websites. This includes game-day graphics, score updates, player of the week, and commitment announcements—all optimized for Instagram, X (Twitter), and Facebook.",
  },
  {
    q: "What is included in a 'Complete Athletic Website'?",
    a: "Our complete websites are built for elite programs. They include dynamic rosters, automated schedules, news feeds, recruitment portals, and high-performance hosting. Everything is designed to be mobile-responsive and easy for staff to update.",
  },
  {
    q: "How fast is the turnaround for graphics and videos?",
    a: "Sports graphics typically have a 24-48 hour turnaround. Intro videos take 3-5 days depending on complexity. For complete websites, we usually launch within 10-14 days after receiving all program assets.",
  },
  {
    q: "Can I request revisions for my projects?",
    a: "Yes, every project comes with a set number of revisions. We work closely with your coaching staff and athletic directors to ensure the final product perfectly represents your school or team's brand.",
  },
  {
    q: "Do you offer branding packages for new programs?",
    a: "Yes! If you're starting a new program or need a refresh, we can handle everything from logo design and social media templates to your first intro video and full website launch.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-padding bg-secondary">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase mb-4">Frequently Asked Questions</h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-heading text-sm md:text-base font-semibold uppercase pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-primary shrink-0 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
