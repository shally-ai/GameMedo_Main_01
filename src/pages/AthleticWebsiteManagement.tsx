import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import { Settings, Sparkles, Clock, RefreshCw, CheckCircle2, ChevronRight } from "lucide-react";

const AthleticWebsiteManagement: React.FC = () => {
  const faqs = [
    {
      q: "What is included in athletic website management?",
      a: "Our management service includes posting weekly schedules, uploading roster sheets, publishing team announcements, formatting images, updating sponsor banners, and maintaining backend security and hosting."
    },
    {
      q: "How fast do you process website update requests?",
      a: "Most minor updates (ruster additions, schedule changes, text corrections) are completed within 12–24 hours of submission. Major updates are scheduled and completed within 2–3 business days."
    },
    {
      q: "Do you supply domain names and hosting support?",
      a: "Yes, we handle SSL configuration, domain mapping, DNS settings, and fast CDN hosting setup as part of our monthly maintenance package."
    },
    {
      q: "Can we still log in and make edits ourselves?",
      a: "Absolutely. We set up user accounts with levels of access so your athletic directors or head coaches can make updates alongside our management team."
    },
    {
      q: "Is there a limit on how many requests we can submit?",
      a: "Our standard monthly packages come with unlimited minor content changes. Heavy structural edits or page additions are quoted separately or scoped into a custom plan."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Athletic Website Management for High Schools | GameMedo"
        description="Ongoing athletic website management for high school programs. We handle roster updates, schedule changes, and security so you can focus on winning."
        keywords="athletic website management, high school sports website maintenance, athletic department website updates, school sports website manager, varsity website management service"
        url="https://gamemedo.com/services/athletic-website-management"
        canonical="https://gamemedo.com/services/athletic-website-management"
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
        { label: "Athletic Website Management" }
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
              <Settings className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-heading tracking-[0.2em] uppercase text-primary">Stress-Free Site Maintenance</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-5xl md:text-7xl font-bold uppercase leading-tight mb-8"
            >
              Athletic Website Management for <span className="text-gradient">School Athletic Departments</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              Ongoing website management for athletic departments. Content updates, schedules, roster management, and security patches so ADs can focus on sports.
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
              <a href="/contact" className="btn-secondary">
                Request a Custom Quote
              </a>
            </motion.div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-20 md:py-28 container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-tight mb-4">
              Our Core <span className="text-gradient">Services</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We handle the day-to-day web updates, ensuring your school site stays fresh, fast, and fully secure.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <RefreshCw className="w-6 h-6 text-primary" />,
                title: "Schedule & Roster Updates",
                desc: "Send us your roster adjustments and schedule changes. We format, upload, and update the sheets across all pages."
              },
              {
                icon: <Clock className="w-6 h-6 text-primary" />,
                title: "12-24h SLA Updates",
                desc: "Submit edits anytime. Our dedicated webmasters pick up requests and deploy changes within a prompt SLA window."
              },
              {
                icon: <Sparkles className="w-6 h-6 text-primary" />,
                title: "Security & Backups",
                desc: "We run monthly plugin updates, security scans, vulnerability checks, and automated backups to prevent downtime."
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

export default AthleticWebsiteManagement;
