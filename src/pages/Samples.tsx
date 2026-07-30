import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { api, Sample } from "@/integrations/api";
import { motion, AnimatePresence } from "framer-motion";
import { Video, Image as ImageIcon, Globe, X, ExternalLink, Maximize2, PlayCircle, Layout } from "lucide-react";
import Navbar from "@/components/Navbar";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SocialPreview from "@/components/SocialPreview";
import { Instagram, Facebook, Twitter } from "lucide-react";
import SampleCard from "@/components/samples/SampleCard";

const Samples = () => {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<"all" | "video" | "graphic" | "website">("all");
  
  const [searchParams, setSearchParams] = useSearchParams();
  const previewId = searchParams.get("preview");
  const previewSample = samples.find(s => s.id.toString() === previewId) || null;

  const setPreviewSample = (sample: Sample | null) => {
    if (sample) {
      searchParams.set("preview", sample.id.toString());
    } else {
      searchParams.delete("preview");
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    fetchSamples();
  }, []);

  const fetchSamples = async () => {
    try {
      const data = await api.getSamples();
      setSamples(data);
    } catch (error) {
      console.error("Error fetching samples:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSamples = samples.filter((sample) => 
    activeFilter === "all" ? true : sample.type === activeFilter
  );

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary/30">
      <SEO 
        title="GameMedo Portfolio — Sports Graphics, Videos & Athletic Websites" 
        description="View our highlight videos, hype reels, website examples, and design work created for high school and varsity athletic programs."
      />
      <Navbar />
      
      <main className="flex-1 pt-40 pb-24 px-4 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[150px] -z-10" />

        <div className="container mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-white/5 mb-4 md:mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Premium Portfolio</span>
            </div>
            <h1 className="font-heading text-5xl md:text-8xl font-bold uppercase mb-4 md:mb-6 tracking-tighter leading-[0.9]">
              The <span className="text-gradient">Showroom</span>
            </h1>
            <p className="text-muted-foreground max-w-3xl mx-auto text-base md:text-xl font-light leading-relaxed px-4">
              Witness the intersection of athletic passion and high-end digital craftsmanship. 
              Our work is designed to dominate the digital landscape.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 md:gap-6 mb-12 md:mb-20 px-2"
          >
            {["all", "graphic", "video", "website"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter as any)}
                className={`group relative px-4 md:px-8 py-2.5 md:py-3 rounded-xl font-heading text-[10px] md:text-xs tracking-[0.2em] uppercase transition-all duration-500 overflow-hidden border ${
                  activeFilter === filter
                    ? "bg-primary text-white border-primary shadow-[0_0_30px_rgba(255,77,0,0.3)]"
                    : "bg-secondary/30 text-muted-foreground border-white/5 hover:border-white/20 hover:text-white"
                }`}
              >
                <span className="relative z-10">
                  {filter === "all" ? "All Projects" : filter === "graphic" ? "Graphics" : filter === "video" ? "Motion" : "Websites"}
                </span>
              </button>
            ))}
          </motion.div>

          {loading ? (
            <div className="flex flex-col justify-center items-center py-20 md:py-40 gap-6">
              <div className="relative">
                <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              </div>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-muted-foreground animate-pulse">Initializing Gallery</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              <AnimatePresence mode="popLayout">
                {filteredSamples.map((sample, index) => (
                  <SampleCard 
                    key={sample.id} 
                    sample={sample} 
                    index={index} 
                    onClick={setPreviewSample} 
                  />
                ))}
              </AnimatePresence>
            </div>
          )}

          {!loading && filteredSamples.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 md:py-40 bg-secondary/10 rounded-3xl border border-white/5 mx-4"
            >
              <Layout className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground uppercase tracking-widest text-xs md:text-sm">No masterpieces found in this collection.</p>
            </motion.div>
          )}
        </div>
      </main>


      {/* Full Size / Website Preview Modal */}
      {previewSample && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-10">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewSample(null)}
            className="absolute inset-0 bg-black/95 md:bg-black/90 backdrop-blur-sm cursor-zoom-out"
          />
          
          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-6xl max-h-[95vh] md:max-h-full bg-card border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10"
          >
            <div className="flex items-center justify-between p-4 md:p-6 bg-secondary/50 border-b border-white/5 backdrop-blur-xl">
              <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                  {previewSample.type === 'website' ? <Globe className="w-4 h-4 md:w-5 md:h-5 text-primary" /> : previewSample.type === 'video' ? <Video className="w-4 h-4 md:w-5 md:h-5 text-primary" /> : <ImageIcon className="w-4 h-4 md:w-5 md:h-5 text-primary" />}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-primary leading-none mb-1">Preview</span>
                  <span className="text-foreground font-heading text-sm md:text-lg tracking-wider uppercase truncate">
                    {previewSample.title}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                {(previewSample.type === 'website' ? previewSample.website_url : previewSample.media_url) && (
                  <a 
                    href={previewSample.type === 'website' ? previewSample.website_url : previewSample.media_url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-white transition-all bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-xs uppercase tracking-widest font-bold"
                    title="Open in new tab"
                  >
                    Live <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <button 
                  onClick={() => setPreviewSample(null)}
                  className="bg-white/5 hover:bg-red-500/20 text-muted-foreground hover:text-red-500 transition-all p-2.5 md:p-2 rounded-xl"
                  title="Close preview"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4 md:p-12 custom-scrollbar">
              <div className="max-w-5xl mx-auto space-y-10 md:space-y-16 pb-8 md:pb-12">
                {previewSample.type === "website" && previewSample.website_url ? (
                    <div className="h-[60vh] md:h-[70vh] w-full rounded-xl md:rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white">
                      <iframe 
                        src={previewSample.website_url} 
                        className="w-full h-full border-none"
                        title="Website Sample Preview"
                      />
                    </div>
                ) : (
                  <>
                    {/* Original Media */}
                    <div className="flex flex-col items-center">
                      <div className="w-full flex justify-center bg-black/40 rounded-xl md:rounded-2xl overflow-hidden border border-white/5 shadow-inner">
                        {previewSample.type === "video" ? (
                          <video 
                            src={previewSample.media_url}
                            className="max-w-full max-h-[60vh] md:max-h-[70vh] shadow-2xl"
                            controls
                            autoPlay
                            playsInline
                            preload="auto"
                          />
                        ) : (
                          <img 
                            src={previewSample.media_url}
                            alt={previewSample.title}
                            className="max-w-full max-h-[60vh] md:max-h-[70vh] shadow-2xl object-contain"
                          />
                        )}
                      </div>
                    </div>

                    {/* Social Media Section */}
                    <div className="pt-10 md:pt-12 border-t border-white/5">
                      <div className="text-center mb-8 md:mb-12">
                        <h4 className="font-heading text-2xl md:text-3xl font-bold uppercase mb-2 md:mb-3 tracking-wider">Social <span className="text-gradient">Mockups</span></h4>
                        <p className="text-muted-foreground text-[10px] md:text-xs uppercase tracking-[0.3em]">Cross-platform presence</p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 items-start justify-items-center">
                        {[
                          { platform: "instagram", icon: Instagram, label: "Instagram Feed", color: "text-primary" },
                          { platform: "facebook", icon: Facebook, label: "Facebook Mobile", color: "text-blue-500" },
                          { platform: "twitter", icon: Twitter, label: "X Timeline", color: "text-sky-400" }
                        ].map((p) => (
                          <div key={p.platform} className="w-full flex flex-col items-center gap-4 md:gap-6">
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-white/5 px-4 py-2 rounded-full border border-white/5">
                              <p.icon size={14} className={p.color} /> {p.label}
                            </div>
                            <div className="w-full max-w-[280px] md:max-w-sm transform hover:scale-[1.02] transition-transform duration-500">
                              <SocialPreview 
                                type={previewSample.type as any}
                                mediaUrl={previewSample.media_url}
                                platform={p.platform as any}
                                title={previewSample.title}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="px-8 py-4 bg-secondary/30 text-center text-[10px] text-muted-foreground uppercase tracking-[0.4em] border-t border-white/5">
              Secure Digital Showroom • Internal Portfolio Experience
            </div>
          </motion.div>
        </div>
      )}

      <BookingSection />
      <Footer />
    </div>
  );
};

export default Samples;
