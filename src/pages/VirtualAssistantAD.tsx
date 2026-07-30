import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import CTASection from "@/components/CTASection";
import { UserCheck, Sparkles, Clock, Shield, CheckCircle2, ChevronRight } from "lucide-react";

const VirtualAssistantAD: React.FC = () => {
  const faqs = [
    {
      q: "What tasks can a sports Virtual Assistant handle?",
      a: "Our VAs manage team scheduling, bus/transportation coordination, booster club email threads, game day volunteer signups, athletic registrations, and document organization."
    },
    {
      q: "Are the VAs familiar with school athletic systems?",
      a: "Yes, our assistants are trained in common athletic schedulers, booster management apps, registration systems, and school database tools."
    },
    {
      q: "How do we communicate with our assigned VA?",
      a: "You will have a dedicated assistant who can be reached via text, email, Slack, or scheduled weekly check-in calls to align on the week's tasks."
    },
    {
      q: "Is student data kept private and secure?",
      a: "Security is our top priority. We sign strict NDA agreements, operate under FERPA-aligned data guidelines, and utilize password management tools to restrict data access."
    },
    {
      q: "What plan options do you offer?",
      a: "We offer flexible part-time and monthly support retainers (typically 10, 20, or 40 hours per week). Schedule a call to review which workload aligns with your needs."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Virtual Assistant Services for Athletic Directors"
        description="Virtual administrative support for Athletic Directors: scheduling, communications, event coordination, registration, and booster club support."
        keywords="virtual assistant athletic director, sports administration assistant, athletic department administrative support, high school AD help, booster club coordinator"
      />
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden border-b border-border/50">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.1)_0%,transparent_70%)]" />
          
          <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <UserCheck className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-heading tracking-[0.2em] uppercase text-primary">Your Dedicated Admin Partner</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-5xl md:text-7xl font-bold uppercase leading-tight mb-8"
            >
              Virtual Assistant <span className="text-gradient">for ADs</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              Virtual administrative support built specifically for Athletic Directors. We handle the scheduling, email lists, and event coordination so you can focus on the game.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a href="#booking" className="btn-primary flex items-center gap-2">
                Book a Free Consultation <ChevronRight className="w-4 h-4" />
              </a>
              <a href="/contact" className="btn-secondary">
                View Custom Retainers
              </a>
            </motion.div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-20 md:py-28 container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-tight mb-4">
              Get Hours <span className="text-gradient">Back Weekly</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our sports Virtual Assistants manage the back-office operations so ADs save 10+ hours a week.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="w-6 h-6 text-primary" />,
                title: "Logistics & Scheduling",
                desc: "Coordinate game locations, transport routes, official bookings, calendar updates, and team schedules without conflicts."
              },
              {
                icon: <Sparkles className="w-6 h-6 text-primary" />,
                title: "Booster Club Outreach",
                desc: "Manage sponsor packages, fundraising emails, booster club correspondence, and volunteer sign-ups for concession stands."
              },
              {
                icon: <Shield className="w-6 h-6 text-primary" />,
                title: "FERPA-Compliant Secure Operations",
                desc: "Secure storage of physical releases, insurance files, emergency contacts, and student registration details."
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-secondary/30 border border-white/5 hover:border-primary/20 transition-all duration-300 p-8 rounded-2xl flex flex-col gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="font-heading text-xl font-bold uppercase text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Standard FAQ Accordion Layout */}
        <section className="py-20 bg-secondary/10 border-t border-b border-border/50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-center mb-12">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="p-6 rounded-2xl bg-background/50 border border-white/5">
                  <h4 className="font-heading font-bold text-lg text-foreground mb-2 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    {faq.q}
                  </h4>
                  <p className="text-muted-foreground text-sm pl-8 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default VirtualAssistantAD;
