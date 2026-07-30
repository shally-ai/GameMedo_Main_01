import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import SEO from "@/components/SEO";
import { Sparkles, Trophy, Users, Zap, ShieldCheck, Target, Loader2 } from "lucide-react";

const iconMap = [Users, Sparkles, Zap, ShieldCheck];

const About = () => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from("content")
          .select("about")
          .eq("id", "main")
          .maybeSingle();

        if (data?.about) {
          setContent(data.about);
        }
      } catch (error) {
        console.error("Error fetching about content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const defaultContent = {
    title: "Elevating Athletic Legacies",
    subtitle: "We believe every athlete and every team deserves to look like the pros. GameMedo was founded to bridge the gap between amateur sports and elite-level digital branding.",
    mission: "Our mission is simple: To empower high school and varsity programs with professional-grade visual assets that drive engagement, attract recruiters, and build team pride.",
    videoUrl: "",
    stats: [
      { label: "Teams Trusted", value: "50+" },
      { label: "Designs Created", value: "1,200+" },
      { label: "Turnaround", value: "24-48h" },
      { label: "Satisfaction", value: "99+" },
    ]
  };

  const aboutData = content || defaultContent;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="About GameMedo — Sports Marketing & Video Production for Schools" 
        description="Learn about GameMedo, our mission to support athletic departments, and our experience producing highlight videos and athletic websites for schools nationwide."
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
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-heading tracking-[0.2em] uppercase text-primary">The GameMedo Story</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-5xl md:text-7xl font-bold uppercase leading-tight mb-8"
            >
              {aboutData.title.split(' ').slice(0, -2).join(' ')} <span className="text-gradient">{aboutData.title.split(' ').slice(-2).join(' ')}</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl leading-relaxed"
            >
              {aboutData.subtitle}
            </motion.p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-padding container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase">Our <span className="text-primary">Mission</span></h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {aboutData.mission}
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold uppercase text-sm">Focus</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">Dedicated exclusively to sports programs.</p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold uppercase text-sm">Quality</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">Professional standards in every pixel.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-2xl overflow-hidden bg-secondary border border-border/50 group shadow-2xl"
            >
              {aboutData.videoUrl ? (
                <video 
                  src={aboutData.videoUrl} 
                  className="w-full h-full object-cover" 
                  controls 
                  poster="/og-image.png"
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-primary/50" />
                  </div>
                  <div className="p-8 h-full flex flex-col justify-end relative z-10">
                    <p className="font-heading text-2xl font-bold uppercase leading-none mb-2">Designed For Greatness</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Built by athletes, for athletes.</p>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-secondary/30 border-y border-border/50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {aboutData.stats?.map((stat: any, i: number) => {
                const Icon = iconMap[i % iconMap.length];
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center space-y-3"
                  >
                    <div className="mx-auto w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-heading text-3xl md:text-4xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section-padding container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase mb-4">Why <span className="text-gradient">GameMedo?</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We aren't just a design agency. We are your team's creative powerhouse, providing the tools you need to stand out.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Elite Quality",
                description: "We use professional workflows and high-end software to ensure every graphic and video is broadcast-ready.",
                icon: Trophy
              },
              {
                title: "Incredible Speed",
                description: "In sports, timing is everything. We deliver your assets faster than anyone else in the game.",
                icon: Zap
              },
              {
                title: "Affordable Pricing",
                description: "We've optimized our process to provide professional quality at a fraction of agency costs.",
                icon: ShieldCheck
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 space-y-4 group hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold uppercase">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default About;
