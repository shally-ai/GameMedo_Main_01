import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  quote: string;
  name: string;
  role?: string;
  school: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "GameMedo transformed how we present our athletic program online. Parents and students love the new website and our social media engagement tripled in the first month.",
    name: "Coach Marcus Johnson",
    role: "Athletic Director",
    school: "Jefferson High School Athletics"
  },
  {
    quote: "The virtual assistant service has been a game changer. I get back 10+ hours every week that I used to spend on scheduling and emails.",
    name: "Sarah Williams",
    role: "Athletic Director",
    school: "Riverside Middle School"
  },
  {
    quote: "Our highlight videos are now at a professional level. College coaches have actually reached out after watching reels GameMedo produced for our players.",
    name: "Coach David Reyes",
    role: "Varsity Football Coach",
    school: "Central High School"
  }
];

const TestimonialsSection = () => {
  const [testimonialsData, setTestimonialsData] = useState<Testimonial[]>(testimonials);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: "start",
    containScroll: "trimSnaps",
    breakpoints: {
      "(min-width: 768px)": { active: false }
    }
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data: docSnap } = await supabase.from("content").select("testimonials").eq("id", "main").maybeSingle();
        if (docSnap?.testimonials && Array.isArray(docSnap.testimonials) && docSnap.testimonials.length > 0) {
          // Comment out to enforce the requested placeholder testimonials
          // setTestimonialsData(docSnap.testimonials as Testimonial[]);
        }
      } catch (error) {
        console.error("Error fetching testimonials content:", error);
      }
    };
    fetchContent();
  }, []);

  return (
    <section className="section-padding bg-secondary overflow-hidden">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Mobile View: Swipeable Slider */}
        <div className="md:hidden">
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex">
              {testimonialsData.map((t, i) => (
                <div key={i} className="embla__slide flex-[0_0_100%] min-w-0 px-4">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-card border border-border rounded-xl p-8 h-full shadow-lg"
                  >
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-5 h-5 text-primary fill-primary" />
                      ))}
                    </div>
                    <p className="text-foreground text-base leading-relaxed mb-8 italic">"{t.quote}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-heading text-sm font-bold uppercase tracking-wider">{t.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {t.role ? `${t.role}, ` : ""}{t.school}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  selectedIndex === index ? "bg-primary w-8" : "bg-primary/20"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop View: Grid Layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {testimonialsData.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card border border-border rounded-xl p-8 hover:border-primary/30 transition-colors shadow-sm"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-primary fill-primary" />
                ))}
              </div>
              <p className="text-foreground text-sm leading-relaxed mb-8 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-heading text-xs font-bold uppercase tracking-wider">{t.name}</p>
                  <p className="text-muted-foreground text-[10px] uppercase tracking-widest">
                    {t.role ? `${t.role}, ` : ""}{t.school}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
