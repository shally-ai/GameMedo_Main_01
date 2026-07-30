import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Film, Globe, GraduationCap, LucideIcon, Plus, Minus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const defaultServices = [
  {
    icon: Film,
    title: "Sports Intro Videos",
    description: "Cinematic, high-energy intro videos designed for jumbotrons, team reveals, and social media. We bring the heat with pro-level editing, custom sound design, and motion graphics that demand attention from the first second.",
  },
  {
    icon: Palette,
    title: "Social Media Graphics",
    description: "Full-scale graphic support for your entire season. From game-day posters to commitment reveals, we ensure your brand looks elite across every digital platform with consistent, high-impact designs.",
  },
  {
    icon: Globe,
    title: "Athletic Websites",
    description: "Next-generation web platforms built for elite programs. Dynamic rosters, real-time schedules, and recruitment-ready interfaces that dominate the digital space and make program management effortless.",
  },
  {
    icon: GraduationCap,
    title: "Recruiting Highlights",
    description: "Specialized highlight reels for athletes looking to play at the next level. We focus on key plays, player identification, and professional presentation to get you noticed by college coaches and scouts.",
  },
];

const iconMap: Record<string, LucideIcon> = {
  "Sports Intro Videos": Film,
  "Social Media Graphics": Palette,
  "Athletic Websites": Globe,
  "Recruiting Highlights": GraduationCap,
};

const ServiceCard = ({ service, index }: { service: any; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/40 transition-all duration-500 flex flex-col h-full min-w-[300px] lg:min-w-0 snap-center"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      
      <h3 className="font-heading text-lg font-bold uppercase tracking-tight mb-3 group-hover:text-primary transition-colors">
        {service.title}
      </h3>
      
      <div className="relative flex-grow">
        <p className={`text-muted-foreground text-xs leading-relaxed transition-all duration-300 ${!isExpanded ? 'line-clamp-3' : ''}`}>
          {service.description}
        </p>
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 flex items-center gap-1.5 text-[10px] font-heading font-bold uppercase tracking-widest text-primary hover:text-orange-400 transition-colors"
        >
          {isExpanded ? (
            <>
              <Minus className="w-3 h-3" /> Show Less
            </>
          ) : (
            <>
              <Plus className="w-3 h-3" /> Read More
            </>
          )}
        </button>
      </div>

      {/* Decorative element */}
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon className="w-16 h-16" />
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const [servicesData, setServicesData] = useState(defaultServices);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data: docSnap } = await supabase.from("content").select("services").eq("id", "main").maybeSingle();
        if (docSnap?.services) {
          const fbServices = docSnap.services;
          const mergedServices = fbServices.map((fbService: { title: string; description: string }, index: number) => {
             const localService = defaultServices[index] || defaultServices[0];
             const IconComponent = iconMap[fbService.title] || localService.icon;

             return {
               title: fbService.title,
               description: fbService.description,
               icon: IconComponent
             }
          });
          setServicesData(mergedServices);
        }
      } catch (error) {
        console.error("Error fetching services content:", error);
      }
    };
    fetchContent();
  }, []);

  return (
    <section id="services" className="section-padding bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-heading tracking-[0.2em] uppercase text-primary font-bold">Our Expertise</span>
          </div>
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase">Our Services</h2>
        </motion.div>

        {/* Mobile Swipe / Desktop Grid Container */}
        <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-8 pb-8 lg:pb-0 scrollbar-hide snap-x snap-mandatory -mx-4 px-4 lg:mx-0 lg:px-0">
          {servicesData.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>

        {/* Bridge CTA — guide users to pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 text-center"
        >
          <p className="text-muted-foreground text-sm mb-4">
            Ready to elevate your program?
          </p>
          <a
            href="/#pricing"
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary font-heading text-xs tracking-[0.2em] uppercase px-8 py-3.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            See our packages &amp; pricing
            <span className="text-base leading-none">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;

