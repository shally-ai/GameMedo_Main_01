import { motion } from "framer-motion";
import { Sample } from "@/integrations/api";
import { PlayCircle, Image as ImageIcon, Globe, Maximize2, ExternalLink } from "lucide-react";

interface SampleCardProps {
  sample: Sample;
  onClick: (sample: Sample) => void;
  index: number;
}

const SampleCard = ({ sample, onClick, index }: SampleCardProps) => {
  const isVideo = sample.type === "video";
  const isWebsite = sample.type === "website";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative rounded-2xl overflow-hidden bg-card/40 border border-white/10 hover:border-primary/50 transition-all duration-500 shadow-2xl cursor-pointer"
      onClick={() => onClick(sample)}
    >
      {/* Media Container */}
      <div className="aspect-video relative overflow-hidden bg-black/20">
        {isVideo ? (
          sample.thumbnail_url ? (
            <img 
              src={sample.thumbnail_url} 
              alt={sample.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-secondary to-black">
              <PlayCircle className="w-16 h-16 text-primary/80 group-hover:scale-110 transition-transform duration-500" />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Video Edit</span>
            </div>
          )
        ) : (
          <img 
            src={sample.media_url} 
            alt={sample.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            loading="lazy"
          />
        )}

        {/* Glossy Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Light Sweep Effect */}
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg]" />

        {/* Type Icon Badge */}
        <div className="absolute top-4 right-4 z-10 p-2.5 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 text-white/90 transform translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          {sample.type === "graphic" && <ImageIcon className="w-4 h-4" />}
          {sample.type === "video" && <PlayCircle className="w-4 h-4" />}
          {sample.type === "website" && <Globe className="w-4 h-4" />}
        </div>

        {/* Hover Action Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="bg-primary text-white p-4 rounded-full shadow-[0_0_30px_rgba(255,77,0,0.5)] transform scale-50 group-hover:scale-100 transition-transform duration-500">
            {isWebsite ? <ExternalLink className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
          </div>
        </div>
      </div>

      {/* Info Section (Glassmorphism) */}
      <div className="p-6 relative">
        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-md" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              {sample.type === "video" ? "Motion Design" : isWebsite ? "Web Experience" : "Graphic Design"}
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <h3 className="font-heading font-bold text-xl uppercase tracking-wider text-white group-hover:text-primary transition-colors duration-300 line-clamp-1">
            {sample.title}
          </h3>
          <p className="text-muted-foreground text-xs mt-2 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {isWebsite ? "Explore this fully interactive high-performance web experience." : "Custom high-impact design crafted specifically for athlete branding."}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SampleCard;
