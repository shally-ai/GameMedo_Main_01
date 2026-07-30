import { motion } from "framer-motion";
import {
  Dribbble,
  Trophy,
  Target,
  Volleyball,
  Bike,
  Flag,
  Heart,
  Footprints,
} from "lucide-react";

const sports = [
  { icon: Trophy, name: "Football" },
  { icon: Dribbble, name: "Basketball" },
  { icon: Target, name: "Soccer" },
  { icon: Bike, name: "Baseball" },
  { icon: Volleyball, name: "Volleyball" },
  { icon: Footprints, name: "Track & Field" },
  { icon: Heart, name: "Cheer" },
  { icon: Flag, name: "Cross Country" },
];

const SportsSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase mb-4">Sports We Cover</h2>
          <p className="text-muted-foreground">We create graphics and videos for all major high school sports.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {sports.map((sport, i) => (
            <motion.div
              key={sport.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-lg p-5 flex flex-col items-center gap-3 hover:border-primary/50 transition-colors"
            >
              <sport.icon className="w-7 h-7 text-primary" />
              <span className="font-heading text-sm tracking-wider uppercase">{sport.name}</span>
            </motion.div>
          ))}
        </div>

        <p className="text-muted-foreground text-sm">
          Your sport not listed? <span className="text-primary">We still got you.</span>
        </p>
      </div>
    </section>
  );
};

export default SportsSection;
