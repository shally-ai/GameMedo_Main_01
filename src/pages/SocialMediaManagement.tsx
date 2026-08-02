import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import { Share2, Sparkles, Zap, Image, CheckCircle2, ChevronRight } from "lucide-react";

const SocialMediaManagement: React.FC = () => {
  const faqs = [
    {
      q: "Which social media platforms do you support?",
      a: "We actively design and schedule content for Instagram, Twitter/X, TikTok, and Facebook. We set up platforms to match your high school colors and varsity brand."
    },
    {
      q: "Do you create the design templates and edit videos too?",
      a: "Yes, we handle the complete design pipeline. This includes game-day announcements, match results, commitment announcements, player spotlights, and short video hype edits."
    },
    {
      q: "How do we coordinate scores and announcements?",
      a: "We set up a streamlined communication link (via Slack, WhatsApp, email, or our dashboard) so coaches or ADs can text us scores, schedules, or last-minute updates."
    },
    {
      q: "Do you post during live games?",
      a: "Our standard package covers pre-game hype, post-game results, and weekly recaps. If you need live-tweeting or real-time game updates, we can set up specialized game-day setups."
    },
    {
      q: "Can we review posts before they go live?",
      a: "Yes! We compile a weekly social calendar and submit drafts for review so you have complete oversight of what gets published."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Social Media Management for Athletic Departments | GameMedo"
        description="Done-for-you social media management for high school athletics. We manage Instagram, Twitter, and Facebook with game-day graphics and updates."
        keywords="social media management athletic departments, high school sports social media, varsity athletics Instagram management, school sports social media manager, athletic department Facebook management"
        url="https://gamemedo.com/services/social-media-management"
        canonical="https://gamemedo.com/services/social-media-management"
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
        { label: "Social Media Management" }
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
              <Share2 className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-heading tracking-[0.2em] uppercase text-primary">Grow Your Fan Base</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-5xl md:text-7xl font-bold uppercase leading-tight mb-8"
            >
              Social Media Management for <span className="text-gradient">Athletic Departments</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              Social media strategy, content creation, and daily posting for athletic departments to increase engagement and grow fan support.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a href="#booking" className="btn-primary flex items-center gap-2">
                Book a Strategy Call <ChevronRight className="w-4 h-4" />
              </a>
              <a href="/samples" className="btn-secondary">
                View Design Portfolio
              </a>
            </motion.div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-20 md:py-28 container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-tight mb-4">
              Engage Your <span className="text-gradient">Community</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Stand out on social media feeds with pro-level templates and continuous, professional sports coverage.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Image className="w-6 h-6 text-primary" />,
                title: "Game Day Templates",
                desc: "Custom match-up templates, rosters, schedules, commitment designs, and varsity graphics representing your colors."
              },
              {
                icon: <Sparkles className="w-6 h-6 text-primary" />,
                title: "Consistent Posting",
                desc: "Never let your social channels go cold. We maintain continuous content schedules throughout the season."
              },
              {
                icon: <Zap className="w-6 h-6 text-primary" />,
                title: "Sponsor Highlights",
                desc: "Integrate booster sponsors and local business ads seamlessly into post graphics to generate brand revenue."
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

export default SocialMediaManagement;
