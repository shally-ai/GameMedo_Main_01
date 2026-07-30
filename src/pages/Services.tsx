import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import { 
  Film, 
  Laptop, 
  Settings, 
  Share2, 
  UserCheck, 
  Sparkles, 
  ChevronRight, 
  Users 
} from "lucide-react";

const Services: React.FC = () => {
  const servicesList = [
    {
      icon: <Film className="w-6 h-6 text-primary" />,
      title: "Sports Highlight & Hype Videos",
      desc: "Cinematic, high-energy video production for athletes, teams, and whole athletic departments. Deliver high school highlights and recruitment-ready videos to stand out online.",
      link: "/services/sports-highlight-videos"
    },
    {
      icon: <Laptop className="w-6 h-6 text-primary" />,
      title: "Athletic Website Design",
      desc: "Custom, responsive athletic web platforms built to showcase your varsity teams. Featuring clean scoreboards, direct roster panels, and simple content editing.",
      link: "/services/athletic-website-design"
    },
    {
      icon: <Settings className="w-6 h-6 text-primary" />,
      title: "Athletic Website Management",
      desc: "Ongoing administrative updates, game schedule configurations, and safe database management. Let our webmasters maintain your site so you can focus on coaches and athletes.",
      link: "/services/athletic-website-management"
    },
    {
      icon: <Share2 className="w-6 h-6 text-primary" />,
      title: "Social Media Management",
      desc: "Daily game-day announcements, match result posters, and schedule updates posted directly to your platforms. Boost fan engagement and spotlight student-athletes consistently.",
      link: "/services/social-media-management"
    },
    {
      icon: <UserCheck className="w-6 h-6 text-primary" />,
      title: "Virtual Assistant for Athletic Directors",
      desc: "Dedicated administrative support to free up your day. We organize booster threads, coordinate transportation plans, and format athletic releases efficiently.",
      link: "/services/virtual-assistant-athletic-directors"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="GameMedo Services - Sports Video, Website Design & Athletic Department Support"
        description="GameMedo offers sports highlight videos, athletic website design, website management, social media management, and virtual assistant services for middle school, high school, and varsity athletic departments."
        keywords="GameMedo services, athletic department services, sports video production service, high school athletic website design, social media for athletic departments, virtual assistant athletic director"
        url="https://gamemedo.com/services"
        canonical="https://gamemedo.com/services"
      />
      <Navbar />
      <Breadcrumb items={[
        { label: "Services" }
      ]} />

      <main className="pt-8 pb-20">
        {/* Header/Hero section */}
        <section className="relative py-12 md:py-20 overflow-hidden border-b border-border/50 mb-16">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.08)_0%,transparent_70%)]" />
          
          <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-heading tracking-[0.2em] uppercase text-primary">All-In-One Support Suite</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl md:text-6xl font-bold uppercase leading-tight mb-6"
            >
              Sports Agency Services for <span className="text-gradient">High School Athletic Departments</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Elevate your team's visual brand and streamline your administrative operations. Explore our specialized services built to support schools and varsity leagues.
            </motion.p>
          </div>
        </section>

        {/* Directory Grid */}
        <section className="container mx-auto px-4 max-w-6xl mb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-secondary/30 border border-white/5 hover:border-primary/20 transition-all duration-300 p-8 rounded-2xl flex flex-col justify-between group"
              >
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h2 className="font-heading text-xl font-bold uppercase text-foreground">{service.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                </div>
                
                <div className="mt-8 pt-4 border-t border-white/5">
                  <a href={service.link} className="inline-flex items-center gap-1 text-sm font-heading font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-wider">
                    Learn More <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Who We Work With */}
        <section className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-secondary/20 border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Users className="w-6 h-6 text-primary" />
            </div>
            
            <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase mb-4 text-foreground">
              Who We <span className="text-gradient">Work With</span>
            </h2>
            
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-8">
              GameMedo partners with middle schools, high schools, varsity programs, and junior varsity athletic departments across the United States. Whether you need a single video or a full-service athletic media partnership, we have a solution for your program.
            </p>
            
            <a href="/who-we-serve" className="btn-primary inline-flex items-center gap-2">
              View All Programs <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
