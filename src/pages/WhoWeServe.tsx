import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import CTASection from "@/components/CTASection";
import { Users, Sparkles, Target, Compass, CheckCircle2, ChevronRight } from "lucide-react";

const WhoWeServe: React.FC = () => {
  const faqs = [
    {
      q: "Do you support middle schools or just high schools?",
      a: "We work with both middle schools and high schools. Our graphic packages and website systems scale down or up to fit your school's specific budget and sports offerings."
    },
    {
      q: "Can you create graphics for all sports?",
      a: "Yes, we support all varsity and junior varsity programs: football, basketball, soccer, baseball, softball, track & field, cross country, volleyball, wrestling, swimming, lacrosse, cheer, and golf."
    },
    {
      q: "Do you offer district-wide plans?",
      a: "Yes! We design custom district plans that cover all high schools and middle schools in a district. This ensures brand consistency across schools and saves budget."
    },
    {
      q: "Can club or travel teams use GameMedo?",
      a: "Absolutely. In addition to public and private school athletic departments, we support club networks, travel leagues, and independent sports academies."
    },
    {
      q: "How do we get started for our upcoming season?",
      a: "Select a package or book a consultation via our booking call calendar. We'll set up your branding assets (logos, hex colors) and assign your support crew before the season kicks off."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Who We Serve — Middle Schools, High Schools & Varsity Programs"
        description="Dedicated services for middle schools, high schools, junior varsity and varsity athletic departments across the United States."
        keywords="school athletic departments, varsity sports graphics, junior varsity highlights, middle school sports design, district wide athletic packages"
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
              <Users className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-heading tracking-[0.2em] uppercase text-primary">Supporting School Programs Nationwide</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-5xl md:text-7xl font-bold uppercase leading-tight mb-8"
            >
              Who We <span className="text-gradient">Serve</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              Dedicated design, video, and administrative services for middle schools, high schools, junior varsity, and varsity athletic departments across the United States.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a href="#booking" className="btn-primary flex items-center gap-2">
                Book a School Consultation <ChevronRight className="w-4 h-4" />
              </a>
              <a href="/contact" className="btn-secondary">
                Request Program Quote
              </a>
            </motion.div>
          </div>
        </section>

        {/* Who We Support */}
        <section className="py-20 md:py-28 container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-tight mb-4">
              Programs We <span className="text-gradient">Empower</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We specialize in custom design and assistant programs for educational athletic departments.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-6 h-6 text-primary" />,
                title: "Varsity Athletic Programs",
                desc: "High-impact visual branding, player commitments, recap video reels, and next-generation athletic portals."
              },
              {
                icon: <Sparkles className="w-6 h-6 text-primary" />,
                title: "Middle & Junior Highs",
                desc: "Accessible and budget-friendly packages focusing on key sports announcements, schedules, and team roster layouts."
              },
              {
                icon: <Compass className="w-6 h-6 text-primary" />,
                title: "School Districts & Clubs",
                desc: "Unified district packages ensuring visual alignment across multiple schools, and support for travel leagues."
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

export default WhoWeServe;
