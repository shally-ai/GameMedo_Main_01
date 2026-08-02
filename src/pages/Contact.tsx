import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Mail, Phone, MapPin, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const name    = (form.elements.namedItem("fullName")    as HTMLInputElement).value.trim();
    const email   = (form.elements.namedItem("email")       as HTMLInputElement).value.trim();
    const team    = (form.elements.namedItem("team")        as HTMLInputElement).value.trim();
    const subject = (form.elements.namedItem("subject")     as HTMLSelectElement).value;
    const message = (form.elements.namedItem("message")     as HTMLTextAreaElement).value.trim();

    try {
      const { error } = await supabase.from("contact_messages").insert([
        { name, email, team: team || null, subject, message },
      ]);

      if (error) throw error;

      toast({
        title: "Message Sent! ✅",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
    } catch (err: any) {
      console.error("Contact form error:", err);
      toast({
        title: "Failed to Send",
        description: err?.message || "Something went wrong. Please email us directly at support@gamemedo.com.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Contact GameMedo | Athletic Department Support & Services"
        description="Get in touch with GameMedo to start your next sports graphic design, highlight video, website design, or virtual assistant project today."
        keywords="contact GameMedo, sports services inquiry, athletic department support contact, hire sports video company, athletic director services contact"
        url="https://gamemedo.com/contact"
        canonical="https://gamemedo.com/contact"
      />
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden border-b border-border/50">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.1)_0%,transparent_70%)]" />

          <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-heading tracking-[0.2em] uppercase text-primary">Get In Touch</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-5xl md:text-7xl font-bold uppercase leading-tight mb-8"
            >
              Let's Build Your <span className="text-gradient">Legacy</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl leading-relaxed"
            >
              Have a question or ready to start your next project? Reach out to us and let's make your team look like the pros.
            </motion.p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="section-padding container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div>
                <h2 className="font-heading text-3xl font-bold uppercase mb-6">Contact <span className="text-primary">Information</span></h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Whether you're looking for a one-off project or a full-season partnership, we're here to help. Reach out through any of the channels below.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Mail,   label: "Email Us",  value: "support@gamemedo.com",  href: "mailto:support@gamemedo.com" },
                  { icon: Phone,  label: "Call Us",   value: "Book a Call →",          href: "https://calendly.com/gamemedo" },
                  { icon: MapPin, label: "Location",  value: "Available Worldwide",    href: "#" },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-6 p-6 glass-card group hover:border-primary/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-1">{item.label}</p>
                      <p className="font-heading text-lg font-bold uppercase tracking-tight">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 md:p-12 border-primary/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-xs tracking-widest uppercase text-muted-foreground">Full Name</label>
                    <input
                      id="fullName"
                      name="fullName"
                      required
                      type="text"
                      placeholder="Enter your name"
                      className="w-full bg-secondary/50 border border-border rounded px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs tracking-widest uppercase text-muted-foreground">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      required
                      type="email"
                      placeholder="Enter your email"
                      className="w-full bg-secondary/50 border border-border rounded px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="team" className="text-xs tracking-widest uppercase text-muted-foreground">Team / School</label>
                  <input
                    id="team"
                    name="team"
                    type="text"
                    placeholder="Enter your team name"
                    className="w-full bg-secondary/50 border border-border rounded px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs tracking-widest uppercase text-muted-foreground">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full bg-secondary/50 border border-border rounded px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="New Project">New Project</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Support">Support</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs tracking-widest uppercase text-muted-foreground">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full bg-secondary/50 border border-border rounded px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground font-heading text-sm tracking-widest uppercase px-8 py-4 rounded glow-orange hover:brightness-110 transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    "Sending Message..."
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
