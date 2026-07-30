import { motion } from "framer-motion";
import { Film, UserSquare2, Globe, Palette, Share2, HeadphonesIcon } from "lucide-react";

const services = [
  {
    icon: Film,
    title: "Sports Highlight Videos",
    description: "High-energy, cinematic highlight reels that capture the defining moments of your season. Perfect for end-of-year banquets and social media engagement."
  },
  {
    icon: UserSquare2,
    title: "Team Roster Intro Videos",
    description: "Professional, broadcast-quality roster intros for jumbotrons, social media, and hype sessions that make your athletes feel like pros."
  },
  {
    icon: Globe,
    title: "Athletic Website Design & Management",
    description: "Modern, easy-to-navigate websites for your athletic department. We handle all the updates so you never have to wrestle with clunky CMS platforms again."
  },
  {
    icon: Palette,
    title: "Sports Graphic Design",
    description: "Custom, high-quality graphics for game days, player commitments, final scores, and special announcements that elevate your school's brand."
  },
  {
    icon: Share2,
    title: "Social Media Content Creation",
    description: "Consistent, engaging social media posts tailored to your athletic programs to boost student attendance and community support."
  },
  {
    icon: HeadphonesIcon,
    title: "Virtual Assistant Services",
    description: "Dedicated administrative support tailored for ADs: website & schedule updates, roster management, data entry, email management, and research tasks."
  }
];

export const ServicesAD = () => {
  return (
    <section className="py-24 bg-secondary" id="services">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-5xl font-bold uppercase mb-6"
          >
            Comprehensive Support for Your Athletic Department
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            We provide everything you need to run a modern, professional, and engaging athletic program—without the overhead of a full-time creative team.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border p-8 rounded-2xl hover:border-primary/50 transition-colors group"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-bold tracking-wide uppercase mb-3 text-foreground">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
