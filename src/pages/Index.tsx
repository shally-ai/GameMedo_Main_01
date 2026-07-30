import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import StickyBookingBar from "@/components/StickyBookingBar";
import SEO from "@/components/SEO";
import TrustBar from "@/components/TrustBar";


const WhoWeServeSection = () => {
  const categories = [
    {
      title: "Middle Schools",
      desc: "Highlight reels, simple team sites, and basic graphics to build early student pride and community engagement."
    },
    {
      title: "High Schools",
      desc: "Full-scale athletic branding, multi-sport highlight packages, and dedicated web systems for school divisions."
    },
    {
      title: "Varsity & Junior Varsity Programs",
      desc: "Elite recruiting videos, social match cards, and dedicated AD assistance to manage competitive programs."
    }
  ];

  return (
    <section className="section-padding bg-secondary/10 border-y border-border/50 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase mb-4">
            Who We <span className="text-gradient">Serve</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
            From middle school tournaments to varsity athletic associations, we deliver customized digital media support nationwide.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((item, idx) => (
            <Link
              key={idx}
              to="/who-we-serve"
              className="group bg-card/45 backdrop-blur-sm border border-border/50 hover:border-primary/30 rounded-2xl p-8 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-heading text-xl font-bold uppercase text-foreground mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-1.5 text-xs font-heading font-bold text-primary uppercase tracking-wider">
                Learn Programs <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const LatestBlogSection = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("id, title, slug, excerpt, category, published_at")
          .eq("is_published", true)
          .order("published_at", { ascending: false })
          .limit(3);

        if (!error && data) {
          setPosts(data);
        }
      } catch (err) {
        console.error("Error fetching homepage posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentPosts();
  }, []);

  if (loading || posts.length === 0) return null;

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase mb-4">
            Resources for <span className="text-gradient">Athletic Directors</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
            Get the latest sports marketing playbooks, AD templates, and video highlight guidelines.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group bg-card/45 backdrop-blur-sm border border-border/50 hover:border-primary/30 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between h-full"
            >
              <div>
                <span className="text-[10px] font-heading uppercase text-primary mb-3 block">
                  {post.category}
                </span>
                <h3 className="font-heading text-lg font-bold uppercase text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3 mb-4">
                  {post.excerpt || "Click to read full details..."}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-heading font-bold text-primary uppercase tracking-wider">
                Read Post <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary font-heading text-xs tracking-[0.2em] uppercase px-8 py-3.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            View All Resources
          </Link>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <div className="grain-overlay" />
      <SEO
        title="GameMedo | High School & Varsity Sports Graphic Design & Video Editing"
        description="GameMedo helps middle schools, high schools, and varsity athletic departments across the U.S. with sports highlight videos, athletic website design, social media management, and virtual assistant services for Athletic Directors."
        keywords="high school sports graphics, varsity highlight videos, athletic website design, sports video production, athletic department services, GameMedo"
        url="https://gamemedo.com/"
        canonical="https://gamemedo.com/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "GameMedo",
          "url": "https://gamemedo.com",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "50",
            "bestRating": "5",
            "worstRating": "1"
          }
        }}
      />
      <Navbar />
      <HeroSection />
      <TrustBar />
      <ServicesSection />
      <HowItWorksSection />
      <WhoWeServeSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <LatestBlogSection />
      <Footer />
      <StickyBookingBar />
    </div>
  );
};

export default Index;
