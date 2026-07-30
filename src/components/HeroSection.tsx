import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { HeroMediaModal } from "./HeroMediaModal";
import { BookingModal } from "./BookingModal";
import heroBg from "@/assets/hero-bg.jpg";
import { Play } from "lucide-react";

interface HeroMedia {
  id: string;
  title: string;
  type: "video" | "graphic";
  media_url: string;
  created_at: number;
}

const HeroSection = () => {
  const [heroContent, setHeroContent] = useState({
    titleStart: "Modern School's ",
    titleHighlight: "Athletic Solution",
    subtitle: "Complete athletic solution for modern school sports programs. GameMedo helps schools and sports teams build and manage a powerful digital presence. For more...",
    ctaText: "Book Demo",
    ctaUrl: "https://calendar.app.google/f6jg8ZqxVD2iVZtD8"
  });

  const [mediaItems, setMediaItems] = useState<HeroMedia[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<{ url: string; type: "video" | "graphic"; title: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Content
        const { data: docSnap } = await supabase.from("content").select("hero").eq("id", "main").maybeSingle();
        if (docSnap?.hero) {
          setHeroContent(prev => ({ ...prev, ...docSnap.hero }));
        }

        // Fetch Hero Media
        const { data: mediaData } = await supabase.from("hero_media").select("*");
        if (mediaData) {
          setMediaItems((mediaData as HeroMedia[]).sort((a, b) => b.created_at - a.created_at).slice(0, 6));
        }

      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    };
    fetchData();
  }, []);

  const openModal = (media: HeroMedia) => {
    setSelectedMedia({ url: media.media_url, type: media.type, title: media.title });
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 md:pt-32">
        {/* Background */}
        <div className="absolute inset-0">
          <img src={heroBg} alt="Sports background showing blurred stadium lights and field" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-left md:text-center max-w-5xl">
          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-3 mb-8 justify-start md:justify-center">

            <span className="text-[10px] sm:text-xs font-heading tracking-[0.3em] uppercase text-primary/80 border border-primary/20 px-5 py-2.5 rounded-full bg-primary/5">
              TRUSTED BY 50+ Varsity ADs
            </span>
            <span className="hidden sm:flex text-[10px] sm:text-xs font-heading tracking-[0.3em] uppercase text-orange-300 border border-orange-400/20 px-5 py-2.5 rounded-full bg-orange-400/5 items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              Limited Spring Slots Open
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="font-heading text-[2.6rem] sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase leading-[0.95] tracking-tighter mb-8">
            <span className="block text-white mb-1">{heroContent.titleStart.trim()}</span>
            <span className="block text-primary">{heroContent.titleHighlight.trim()}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {heroContent.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-start md:justify-center">

            <a
              href="/order"
              className="bg-primary text-primary-foreground font-heading text-base tracking-widest uppercase px-12 py-5 rounded-lg glow-orange hover:brightness-110 transition inline-flex items-center justify-center gap-3">
              Quick Start
              <span className="text-xl">→</span>
            </a>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 border border-white/10 text-white font-heading text-base tracking-widest uppercase px-12 py-5 rounded-lg hover:bg-white/5 transition">
              Book Strategy Call
            </button>
          </motion.div>

          {/* Social proof micro-line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-[10px] sm:text-[11px] text-muted-foreground/40 uppercase tracking-[0.25em] font-heading mt-8 text-left md:text-center">
            Join 50+ varsity programs already dominating their brand.
          </motion.p>
        </div>

        {/* Showcase grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ 
            opacity: 1, 
            y: [0, -10, 0],
          }}
          transition={{ 
            opacity: { delay: 1.1, duration: 0.8 },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative z-10 container mx-auto px-4 mt-16 mb-8 max-w-5xl">

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 rounded-xl overflow-hidden border border-border bg-card p-3">
            {mediaItems.map((item, i) =>
              <div 
                key={item.id} 
                className="relative group cursor-pointer overflow-hidden rounded-lg bg-black/50"
                onClick={() => openModal(item)}
              >
                {item.type === "video" ? (
                  <video
                    src={item.media_url}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    muted
                    loop
                    onMouseEnter={(e) => e.currentTarget.play()} 
                    onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                  />
                ) : (
                  <img
                    src={item.media_url}
                    alt={item.title}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" 
                  />
                )}

                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/0 group-hover:bg-background/40 transition-colors duration-300">
                  <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/50 flex flex-col items-center justify-center mb-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_15px_rgba(255,107,0,0.5)]">
                    <Play className="w-5 h-5 text-primary fill-primary ml-1" />
                  </div>
                </div>
              </div>
            )}
            
            {/* Skeleton placeholders if less than 6 items exist */}
            {mediaItems.length < 6 && [...Array(6 - mediaItems.length)].map((_, i) => (
               <div key={`empty-${i}`} className="bg-secondary/20 aspect-[4/3] rounded-lg border border-dashed border-border/50 flex items-center justify-center">
                  <span className="text-muted-foreground/30 font-heading text-xs uppercase tracking-widest">Available</span>
               </div>
            ))}
          </div>
        </motion.div>

        <HeroMediaModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          media={selectedMedia} 
        />
      </section>

      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </>
  );
};

export default HeroSection;