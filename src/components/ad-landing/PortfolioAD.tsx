import { motion } from "framer-motion";
import { Play, Image as ImageIcon, Monitor, ArrowUpRight } from "lucide-react";

const portfolioItems = [
  {
    type: "video",
    title: "Varsity Football Roster Intro",
    category: "Roster Videos",
    description: "Cinematic player reveal with team intro used at the season opener",
    color: "from-orange-900/60 to-background",
    icon: Play,
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-400",
    tag: "Video Production",
  },
  {
    type: "graphic",
    title: "Game Day Social Media Kit",
    category: "Sports Graphics",
    description: "Matchup graphics, score updates, and player spotlight templates",
    color: "from-blue-900/60 to-background",
    icon: ImageIcon,
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    tag: "Graphic Design",
  },
  {
    type: "website",
    title: "Riverside Athletics Hub",
    category: "Athletic Websites",
    description: "Full redesign: rosters, schedules, news, and recruiting portal",
    color: "from-emerald-900/60 to-background",
    icon: Monitor,
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    tag: "Web Design",
  },
  {
    type: "video",
    title: "End-of-Season Hype Reel",
    category: "Highlight Videos",
    description: "Multi-sport season highlight compilation for banquet and social",
    color: "from-purple-900/60 to-background",
    icon: Play,
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
    tag: "Video Production",
  },
  {
    type: "graphic",
    title: "Athlete Commitment Graphic",
    category: "Sports Graphics",
    description: "Custom commitment edits shared across Twitter, Instagram, and Facebook",
    color: "from-rose-900/60 to-background",
    icon: ImageIcon,
    iconBg: "bg-rose-500/20",
    iconColor: "text-rose-400",
    tag: "Graphic Design",
  },
  {
    type: "website",
    title: "Recruiting & Roster Portal",
    category: "Athletic Websites",
    description: "Complete athlete profiles with stats, bios, and video integration",
    color: "from-amber-900/60 to-background",
    icon: Monitor,
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400",
    tag: "Web Design",
  },
];

export const PortfolioAD = () => {
  return (
    <section className="py-24 bg-secondary border-t border-border" id="portfolio">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-5xl font-bold uppercase mb-4"
          >
            Proven Work for Athletic Programs
          </motion.h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A sample of what we build for high school and college athletic departments every week.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b ${item.color} p-6 cursor-pointer hover:border-white/20 transition-all hover:scale-[1.02] duration-300`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-8">
                <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center`}>
                  <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                <span className="text-[10px] font-heading tracking-widest uppercase text-muted-foreground border border-white/10 px-3 py-1 rounded-full">
                  {item.tag}
                </span>
              </div>

              {/* Visual placeholder bar */}
              <div className="flex gap-1.5 mb-6">
                <div className="h-1 w-1/3 rounded-full bg-white/10" />
                <div className="h-1 w-1/2 rounded-full bg-white/20" />
                <div className="h-1 w-1/6 rounded-full bg-white/10" />
              </div>
              <div className="flex gap-1.5 mb-8">
                <div className="h-1 w-1/2 rounded-full bg-white/10" />
                <div className="h-1 w-1/4 rounded-full bg-white/20" />
                <div className="h-1 w-1/4 rounded-full bg-white/10" />
              </div>

              {/* Info */}
              <div>
                <span className="inline-block text-[10px] font-heading tracking-widest uppercase text-primary bg-primary/10 px-3 py-1 rounded-full mb-2">
                  {item.category}
                </span>
                <h3 className="font-heading text-lg font-bold text-foreground mb-1.5">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </div>

              {/* Hover arrow */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4 text-primary" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className="text-sm text-muted-foreground">
            Want to see actual samples?{" "}
            <a href="/samples" className="text-primary hover:underline font-medium">
              Browse our full portfolio →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
