import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Check, Clock, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GigCheckoutModal from "@/components/GigCheckoutModal";
import DiscountPopup from "@/components/DiscountPopup";
import SEO from "@/components/SEO";

interface Gig {
  id: string;
  title: string;
  description: string;
  price: number;
  delivery_days: number;
  image_url: string;
  video_url?: string | null;
  features: string[];
  who_it_for?: string;
  problem_solved?: string;
  final_output?: string;
  additional_images?: string[];
  pdf_url?: string;
}

const Accordion = ({ title, children, preview }: { title: string, children: React.ReactNode, preview?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-xl overflow-hidden mb-4 bg-secondary/20">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-secondary/30 transition-colors text-left"
      >
        <div className="flex flex-col">
          <span className="text-sm font-bold uppercase tracking-widest text-primary mb-1">{title}</span>
          {!isOpen && preview && (
            <p className="text-sm text-muted-foreground line-clamp-1">{preview}</p>
          )}
        </div>
        <ChevronRight className={cn("w-4 h-4 text-muted-foreground transition-transform duration-300", isOpen ? "rotate-90" : "")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-4 pb-4 pt-0 text-sm text-muted-foreground leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const OrderGigs = () => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGig, setSelectedGig] = useState<Gig | null>(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  
  // Helper to strip HTML for preview
  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  const fetchGigs = async () => {
    try {
      const { data, error } = await supabase
        .from("custom_gigs")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) {
        if (error.code === '42P01') {
          console.warn("Table custom_gigs does not exist yet.");
          setGigs([]);
        } else {
          throw error;
        }
      } else {
        setGigs(data as Gig[]);
      }
    } catch (error) {
      console.error("Error fetching gigs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderGig = (gig: Gig) => {
    setSelectedGig(gig);
    setIsDetailsModalOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const handleViewDetails = (gig: Gig) => {
    setSelectedGig(gig);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary/30">
      <SEO title="Order Gigs" noIndex={true} />
      <Navbar />
      <DiscountPopup />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Header */}
          <div className="text-center mb-16 mt-8">
            <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">
              Order Custom <span className="text-primary">Gigs</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Professional sports graphics and highlight reels. Delivered fast, right to your inbox.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : gigs.length === 0 ? (
            <div className="text-center py-20 bg-card border border-border rounded-2xl">
              <h2 className="font-heading text-2xl font-bold mb-2">Check back soon!</h2>
              <p className="text-muted-foreground">We are currently updating our gig packages.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gigs.map(gig => (
                <div key={gig.id} className="group flex flex-col bg-card border border-border hover:border-primary/50 transition-all duration-300 rounded-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(255,107,0,0.15)] hover:-translate-y-1">
                  
                  <div className="cursor-pointer" onClick={() => handleViewDetails(gig)}>
                    {gig.video_url ? (
                      <div className="w-full h-56 overflow-hidden relative bg-black">
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 pointer-events-none" />
                        <video
                          src={gig.video_url}
                          poster={gig.image_url}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                          muted
                          loop
                          playsInline
                          onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                          onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                        />
                        <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur text-white p-1.5 rounded-full">
                          <Clock className="w-3 h-3 text-primary opacity-0" />
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white ml-0.5"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        </div>
                        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 text-white text-sm font-bold bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full">
                          <Clock className="w-4 h-4 text-primary" />
                          {gig.delivery_days} Day Delivery
                        </div>
                        <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <div className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">View Details</div>
                        </div>
                      </div>
                    ) : gig.image_url ? (
                      <div className="w-full h-56 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 pointer-events-none" />
                        <img src={gig.image_url} alt={gig.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 text-white text-sm font-bold bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full">
                          <Clock className="w-4 h-4 text-primary" />
                          {gig.delivery_days} Day Delivery
                        </div>
                        <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <div className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">View Details</div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-32 bg-secondary flex items-center justify-center border-b border-border relative">
                        <div className="flex items-center gap-2 text-foreground font-bold">
                          <Clock className="w-4 h-4 text-primary" />
                          {gig.delivery_days} Day Delivery
                        </div>
                        <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <div className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">View Details</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-heading text-2xl font-bold uppercase mb-2 leading-tight cursor-pointer hover:text-primary transition-colors" onClick={() => handleViewDetails(gig)}>
                      {gig.title}
                    </h3>

                    <div className="mt-4 mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">Key Highlights</h4>
                      <ul className="space-y-2.5">
                        {gig.features && gig.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                            <span className="text-foreground/80 font-medium">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Accordion 
                      title="Detailed Description" 
                      preview={stripHtml(gig.description).substring(0, 100) + "..."}
                    >
                      <div className="space-y-4">
                        <div>
                          <p className="font-bold text-xs uppercase tracking-wider text-foreground mb-1">What's Included:</p>
                          <div 
                            className="text-sm text-muted-foreground prose prose-invert max-w-none leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: gig.description }}
                          />
                        </div>
                        {gig.who_it_for && (
                          <div>
                            <p className="font-bold text-xs uppercase tracking-wider text-foreground mb-1">Who it's for:</p>
                            <p className="text-sm text-muted-foreground">{gig.who_it_for}</p>
                          </div>
                        )}
                        {gig.problem_solved && (
                          <div>
                            <p className="font-bold text-xs uppercase tracking-wider text-foreground mb-1">Problem it solves:</p>
                            <p className="text-sm text-muted-foreground">{gig.problem_solved}</p>
                          </div>
                        )}
                        {gig.final_output && (
                          <div>
                            <p className="font-bold text-xs uppercase tracking-wider text-foreground mb-1">Final output:</p>
                            <p className="text-sm text-muted-foreground">{gig.final_output}</p>
                          </div>
                        )}
                      </div>
                    </Accordion>

                    <div className="mt-auto pt-4 border-t border-border">
                      <button 
                        onClick={() => handleOrderGig(gig)}
                        className="w-full bg-secondary hover:bg-primary text-foreground hover:text-primary-foreground font-heading uppercase tracking-widest text-sm font-bold py-4 rounded-xl flex justify-between items-center px-6 transition-colors group/btn"
                      >
                        <span>Order Now</span>
                        <div className="flex items-center gap-2">
                          <span>${Number(gig.price).toFixed(2)}</span>
                          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />

      {/* Details Modal */}
      <AnimatePresence>
        {isDetailsModalOpen && selectedGig && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDetailsModalOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-card border border-border shadow-2xl rounded-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="bg-secondary/50 px-6 py-4 border-b border-border flex justify-between items-center shrink-0">
                <h2 className="font-heading font-bold text-xl uppercase tracking-wide">{selectedGig.title}</h2>
                <button onClick={() => setIsDetailsModalOpen(false)} className="p-2 text-muted-foreground hover:text-foreground bg-background/50 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Media Section */}
                <div className="w-full md:w-1/2 bg-black flex items-center justify-center border-r border-border/30">
                  {selectedGig.video_url ? (
                    <div className="w-full aspect-video md:aspect-auto md:h-full relative">
                      <video 
                        src={selectedGig.video_url} 
                        poster={selectedGig.image_url}
                        controls 
                        className="w-full h-full object-contain"
                        autoPlay
                      />
                    </div>
                  ) : selectedGig.image_url ? (
                    <div className="w-full h-64 md:h-full relative">
                      <img src={selectedGig.image_url} alt={selectedGig.title} className="w-full h-full object-contain" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-4 text-muted-foreground">
                      <Clock className="w-12 h-12 opacity-20" />
                      <p className="font-heading uppercase tracking-widest text-xs">No Preview Available</p>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 flex flex-col overflow-hidden">
                  <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                    <div className="flex justify-between items-center mb-8 pb-4 border-b border-border/50">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm font-bold bg-secondary/50 px-3 py-1.5 rounded-lg">
                        <Clock className="w-4 h-4 text-primary" />
                        {selectedGig.delivery_days} Day Delivery
                      </div>
                      <div className="text-2xl font-bold font-heading text-primary">${Number(selectedGig.price).toFixed(2)}</div>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <h3 className="font-bold text-sm uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          What the Service Includes
                        </h3>
                        <div 
                          className="prose prose-invert max-w-none text-muted-foreground text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: selectedGig.description || "No detailed description provided." }}
                        />
                      </div>

                      <div className="space-y-6">
                        {selectedGig.who_it_for && (
                          <div>
                            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-foreground mb-2 opacity-80">Who it's for</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed bg-secondary/20 p-3 rounded-lg border border-border/30">{selectedGig.who_it_for}</p>
                          </div>
                        )}
                        {selectedGig.problem_solved && (
                          <div>
                            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-foreground mb-2 opacity-80">Problem it solves</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed bg-secondary/20 p-3 rounded-lg border border-border/30">{selectedGig.problem_solved}</p>
                          </div>
                        )}
                      </div>

                      {selectedGig.final_output && (
                        <div className="bg-primary/5 p-4 rounded-xl border border-primary/20">
                          <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-primary mb-2">Final Output</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed font-medium">{selectedGig.final_output}</p>
                        </div>
                      )}

                      {selectedGig.features && selectedGig.features.length > 0 && (
                        <div>
                          <h3 className="font-bold text-sm uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            Key Highlights
                          </h3>
                          <ul className="space-y-2.5">
                            {selectedGig.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-3 text-sm text-muted-foreground group">
                                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                  <Check className="w-3 h-3 text-primary" />
                                </div>
                                <span className="font-medium">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedGig.additional_images && selectedGig.additional_images.length > 0 && (
                        <div>
                          <h3 className="font-bold text-sm uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            Portfolio Gallery
                          </h3>
                          <div className="grid grid-cols-2 gap-3">
                            {selectedGig.additional_images.map((img, idx) => (
                              <div key={idx} className="aspect-video rounded-lg overflow-hidden border border-border/50 group/img cursor-zoom-in">
                                <img 
                                  src={img} 
                                  alt={`Portfolio ${idx}`} 
                                  className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500"
                                  onClick={() => window.open(img, '_blank')}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedGig.pdf_url && (
                        <div className="pt-4">
                          <a 
                            href={selectedGig.pdf_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary/80 text-foreground px-5 py-3 rounded-xl border border-border/50 text-sm font-bold transition-all w-full md:w-auto"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
                            View Information PDF
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Modal Footer CTA (Inside Content Column on Desktop) */}
                  <div className="p-6 border-t border-border bg-secondary/30">
                    <button 
                      onClick={() => handleOrderGig(selectedGig)}
                      className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_20px_rgba(255,107,0,0.2)] hover:shadow-[0_0_30px_rgba(255,107,0,0.4)] flex items-center justify-center gap-2 group"
                    >
                      <span>Order Now</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <GigCheckoutModal 
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        gig={selectedGig}
      />
    </div>
  );
};

export default OrderGigs;
