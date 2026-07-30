import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Palette, Film, Globe, Settings, UserCheck, Plus, Minus, LucideIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const defaultServices = [
  {
    icon: Film,
    title: "Sports Highlight & Hype Videos",
    description: "Cinematic, high-energy video production for athletes, teams, and whole athletic departments. Deliver high school highlights and recruitment-ready videos to stand out online.",
    link: "/services/sports-highlight-videos"
  },
  {
    icon: Globe,
    title: "Athletic Website Design",
    description: "Custom, responsive athletic web platforms built to showcase your varsity teams. Featuring clean scoreboards, direct roster panels, and simple content editing.",
    link: "/services/athletic-website-design"
  },
  {
    icon: Settings,
    title: "Athletic Website Management",
    description: "Ongoing administrative updates, game schedule configurations, and safe database management. Let our webmasters maintain your site so you can focus on coaches and athletes.",
    link: "/services/athletic-website-management"
  },
  {
    icon: Palette,
    title: "Social Media Management",
    description: "Daily game-day announcements, match result posters, and schedule updates posted directly to your platforms. Boost fan engagement and spotlight student-athletes consistently.",
    link: "/services/social-media-management"
  },
  {
    icon: UserCheck,
    title: "Virtual Assistant for ADs",
    description: "Dedicated administrative support to free up your day. We organize booster threads, coordinate transportation plans, and format athletic releases efficiently.",
    link: "/services/virtual-assistant-athletic-directors"
  }
];

const iconMap: Record<string, LucideIcon> = {
  "Sports Highlight & Hype Videos": Film,
  "Athletic Website Design": Globe,
  "Athletic Website Management": Settings,
  "Social Media Management": Palette,
  "Virtual Assistant for ADs": UserCheck,
};

const linkMap: Record<string, string> = {
  "Sports Highlight & Hype Videos": "/services/sports-highlight-videos",
  "Athletic Website Design": "/services/athletic-website-design",
  "Athletic Website Management": "/services/athletic-website-management",
  "Social Media Management": "/services/social-media-management",
  "Virtual Assistant for ADs": "/services/virtual-assistant-athletic-directors",
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
      className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/40 transition-all duration-500 flex flex-col justify-between h-full min-w-[300px] md:min-w-0 snap-center"
    >
      <div>
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        
        <h3 className="font-heading text-lg font-bold uppercase tracking-tight mb-3 group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        
        <div className="relative">
          <p className={`text-muted-foreground text-xs leading-relaxed transition-all duration-300 ${!isExpanded ? 'line-clamp-3' : ''}`}>
            {service.description}
          </p>
          
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 mb-4 flex items-center gap-1.5 text-[10px] font-heading font-bold uppercase tracking-widest text-primary hover:text-orange-400 transition-colors"
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
      </div>

      <div className="mt-4 pt-4 border-t border-white/5">
        <Link 
          to={service.link}
          className="inline-flex items-center gap-1 text-[10px] font-heading font-bold uppercase tracking-widest text-primary hover:text-orange-400 transition-colors"
        >
          Go to Service Detail →
        </Link>
      </div>

      {/* Decorative background element */}
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
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
             const linkPath = linkMap[fbService.title] || localService.link;

             return {
               title: fbService.title,
               description: fbService.description,
               icon: IconComponent,
               link: linkPath
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

        {/* Swipe / Grid Container */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8 md:pb-0 scrollbar-hide snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0">
          {servicesData.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>

        {/* Actions bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading text-xs tracking-[0.2em] uppercase px-8 py-3.5 rounded-full hover:brightness-110 transition-all duration-300"
          >
            Explore All Services
          </Link>
          <a
            href="/#pricing"
            className="inline-flex items-center gap-2 bg-secondary/50 border border-white/10 text-muted-foreground font-heading text-xs tracking-[0.2em] uppercase px-8 py-3.5 rounded-full hover:bg-secondary hover:text-foreground transition-all duration-300"
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
