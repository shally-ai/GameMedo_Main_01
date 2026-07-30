import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import { Laptop, Sparkles, Server, Zap, CheckCircle2, ChevronRight } from "lucide-react";

const AthleticWebsiteDesign: React.FC = () => {
  const faqs = [
    {
      q: "How long does it take to build a custom athletic website?",
      a: "Most athletic websites are designed, developed, and launched within 3–4 weeks. Timeline varies based on your department size, roster integrations, and booster specifications."
    },
    {
      q: "Can we update scores, schedules, and rosters ourselves?",
      a: "Yes! Every website we build comes with a simplified, easy-to-use content management interface (CMS) so Athletic Directors, coaches, or designated staff can post updates instantly."
    },
    {
      q: "Do the websites connect with schedule feeds and live scores?",
      a: "Absolutely. We build integrations that pull from external scheduling platforms or allow manual rapid-posting so fans always stay up-to-date with live scoreboards."
    },
    {
      q: "Are the designs fully responsive on mobile?",
      a: "Yes, every page is designed mobile-first. Since over 75% of sports fans check scores on their phones, we guarantee a premium experience on mobile devices and tablets."
    },
    {
      q: "Do you offer booster club or fundraising sub-pages?",
      a: "Yes, booster club fundraising, sponsorship banners, merch store integration, and donation forms can be built-in to help fund your athletic programs."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Athletic Website Design for High Schools & Varsity Programs | GameMedo"
        description="Professional athletic website design for high school and varsity sports programs. Mobile-first, ADA-compliant websites with live rosters, schedules, and recruiting-ready features."
        keywords="athletic website design, high school sports website, varsity athletic website, school sports website design, athletic department website builder, high school athletics website"
        url="https://gamemedo.com/services/athletic-website-design"
        canonical="https://gamemedo.com/services/athletic-website-design"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.a
            }
          }))
        }}
      />
      <Navbar />
      <Breadcrumb items={[
        { label: "Services", href: "/services" },
        { label: "Athletic Website Design" }
      ]} />

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
              <Laptop className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-heading tracking-[0.2em] uppercase text-primary">Websites Designed for Champions</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-5xl md:text-7xl font-bold uppercase leading-tight mb-8"
            >
              Athletic Website Design for <span className="text-gradient">High Schools & Varsity Programs</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              Custom web platforms built specifically for high schools, varsity programs, and athletic directors. Live scores, team rosters, and booster integration.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a href="#booking" className="btn-primary flex items-center gap-2">
                Book a Design Strategy Session <ChevronRight className="w-4 h-4" />
              </a>
              <a href="/samples" className="btn-secondary">
                See Website Demos
              </a>
            </motion.div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-20 md:py-28 container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-tight mb-4">
              Designed for <span className="text-gradient">Performance</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our athletic websites stand out visually and provide high-performing utilities for athletic departments.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Server className="w-6 h-6 text-primary" />,
                title: "Live Game Feeds",
                desc: "Real-time updates, game schedules, bracket displays, and immediate scoreboard access so fans never miss a beat."
              },
              {
                icon: <Sparkles className="w-6 h-6 text-primary" />,
                title: "Recruiting Portals",
                desc: "Embed roster profiles, athletic bios, recruiting highlight reels, and coach contact coordinates for high-level recruits."
              },
              {
                icon: <Zap className="w-6 h-6 text-primary" />,
                title: "Booster Club Tools",
                desc: "Donation triggers, sponsorship layouts, and booster club sections built to drive program funding."
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

export default AthleticWebsiteDesign;
