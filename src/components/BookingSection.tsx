import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Calendar as CalendarIcon, Clock, Users, Zap, ShieldCheck } from "lucide-react";

const BookingSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section id="booking" className="section-padding bg-background relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Content & Strategy */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 space-y-10"
          >
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20"
              >
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-[11px] font-heading tracking-[0.3em] uppercase text-primary font-bold">Limited Availability</span>
              </motion.div>
              
              <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-[0.9] tracking-tight">
                Let's <span className="text-gradient block">Talk Strategy</span>
              </h2>
              
              <p className="text-muted-foreground text-xl leading-relaxed max-w-md">
                Fuel your program's growth with a high-impact discovery session. No fluff, just pure strategy.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                { 
                  icon: <Users className="w-5 h-5" />, 
                  title: "1:1 Expert Consultation", 
                  desc: "Direct access to our elite design lead." 
                },
                { 
                  icon: <Zap className="w-5 h-5" />, 
                  title: "Audit & Growth Plan", 
                  desc: "We analyze your current brand and identify wins." 
                },
                { 
                  icon: <Clock className="w-5 h-5" />, 
                  title: "Fast-Track Results", 
                  desc: "Get a clear roadmap for your next season." 
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="group flex gap-5 p-5 rounded-2xl bg-secondary/30 border border-white/5 hover:bg-secondary/50 hover:border-primary/20 transition-all duration-300"
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground mb-1">{item.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] font-heading text-muted-foreground/60">
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500/50" /> Secure Booking</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="flex items-center gap-2"><CalendarIcon className="w-4 h-4 text-primary/50" /> Instant Sync</span>
            </div>
          </motion.div>

          {/* Right Side: Embedded Calendar in Browser Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="relative">
              {/* Decorative Glow */}
              <div className="absolute -inset-4 bg-primary/20 rounded-[2.5rem] blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000" />
              
              <div className="relative bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)]">
                {/* Browser Header */}
                <div className="bg-[#151515] px-6 py-4 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-inner" />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-inner" />
                      <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-inner" />
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-2 bg-black/40 px-4 py-1.5 rounded-lg border border-white/5 w-1/2">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] font-heading tracking-widest uppercase text-muted-foreground truncate">gamemedo.com/schedule-strategy-call</span>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                    <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                    <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                  </div>
                </div>
                
                {/* Calendar Content Area */}
                <div className="relative w-full bg-white h-[650px] md:h-[750px] overflow-hidden">
                  {!isLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-white z-20">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
                        <CalendarIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-primary/40" />
                      </div>
                      <div className="space-y-2 text-center">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.5em] font-heading font-bold animate-pulse">Syncing Calendar</p>
                        <p className="text-[8px] text-muted-foreground/40 uppercase tracking-widest">Establishing secure connection...</p>
                      </div>
                    </div>
                  )}
                  
                  <iframe 
                    src="https://calendar.app.google/f6jg8ZqxVD2iVZtD8" 
                    style={{ border: 0 }} 
                    width="100%" 
                    height="100%" 
                    frameBorder="0"
                    title="Schedule an appointment"
                    className={`w-full h-full transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'}`}
                    onLoad={() => setIsLoaded(true)}
                  />

                  {/* Subtle Gradient Overlay for integration */}
                  <div className="absolute inset-0 pointer-events-none border-[12px] border-[#0a0a0a] rounded-xl" />
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                className="absolute -bottom-6 -right-6 md:right-12 bg-white text-black p-4 rounded-xl shadow-2xl border border-white/20 hidden md:flex items-center gap-4 z-30"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-heading font-bold uppercase tracking-wider leading-none">Free Consultation</p>
                  <p className="text-[8px] uppercase tracking-widest text-muted-foreground mt-1">Valued at $150.00</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BookingSection;

