import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import TrustBar from "@/components/TrustBar";
import CTASection from "@/components/CTASection";
import { Play, Sparkles, Clock, Film, CheckCircle2, ChevronRight } from "lucide-react";

const SportsHighlightVideos: React.FC = () => {
  const faqs = [
    {
      q: "How long does a highlight video take to edit?",
      a: "Our standard turnaround time is 5–7 business days once we receive all the raw footage. We also offer rush options of 24–48 hours if you have an urgent deadline."
    },
    {
      q: "What format should I provide the raw footage in?",
      a: "We accept all major formats including MP4, MOV, and AVI. You can upload files directly via Google Drive, Dropbox, Hudl links, or our secure upload portal."
    },
    {
      q: "Do you create hype videos for social media?",
      a: "Yes! We specialize in producing vertical (9:16) format hypes for TikTok, Instagram Reels, and YouTube Shorts, alongside standard landscape (16:9) formats."
    },
    {
      q: "Can you add player spotlight markers/effects?",
      a: "Absolutely. We add circular spot shadows, arrows, and highlighting effects to make it clear which athlete to track, which is essential for recruiting reels."
    },
    {
      q: "What is your pricing model?",
      a: "Single player recruitment reels start at $299. Custom team hype videos and season recaps vary based on length and production requirements — contact us for a quote."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Sports Highlight & Hype Videos for High Schools | GameMedo"
        description="Professional sports highlight videos and hype reels for varsity athletic programs. Recruiting reels and season recaps with fast 5-7 day turnaround."
        keywords="sports highlight videos high school, varsity hype videos, recruiting highlight reel service, high school football video editing, athletic department video production, sports video editing for schools"
        url="https://gamemedo.com/services/sports-highlight-videos"
        canonical="https://gamemedo.com/services/sports-highlight-videos"
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
        { label: "Sports Highlight & Hype Videos" }
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
              <Film className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-heading tracking-[0.2em] uppercase text-primary">Cinematic Sports Editing</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-5xl md:text-7xl font-bold uppercase leading-tight mb-8"
            >
              Sports Highlight & Hype Videos for <span className="text-gradient">High School Athletics</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              Get high-impact highlight reels and crowd-sourced hype videos designed for school events, recruiting, and social engagement.
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
                View Portfolio
              </a>
            </motion.div>
          </div>
        </section>

        <TrustBar />

        {/* What We Offer */}
        <section className="py-20 md:py-28 container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-tight mb-4">
              What We <span className="text-gradient">Deliver</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From athletic recruiting reels to full-team championship recaps, we turn raw footage into cinematic gold.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Play className="w-6 h-6 text-primary" />,
                title: "Recruiting Reels",
                desc: "Spotlight reels designed for college coaches. Includes player identification marks, stats overlays, and selective pacing."
              },
              {
                icon: <Sparkles className="w-6 h-6 text-primary" />,
                title: "Team Hype Videos",
                desc: "High-energy intro videos to play on stadium big screens or social channels before game day. Build team spirit and excitement."
              },
              {
                icon: <Clock className="w-6 h-6 text-primary" />,
                title: "Rapid Season Recaps",
                desc: "Fast-turnaround post-game edits and full-season retrospectives highlighting key moments and championship victories."
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

export default SportsHighlightVideos;
