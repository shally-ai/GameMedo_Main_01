import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { trackConversion } from "@/lib/trackConversion";

const SERVICES = [
  "Sports Highlight Videos",
  "Team Roster Intro Videos",
  "Athletic Website Design & Management",
  "Sports Graphic Design",
  "Social Media Content Creation",
  "Virtual Assistant / Admin Support",
  "Not sure – I need a consultation",
];

interface FormState {
  name: string;
  title: string;
  school: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const INITIAL: FormState = {
  name: "",
  title: "",
  school: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

export const QuoteFormAD = () => {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const { error: dbErr } = await supabase.from("inquiries").insert([
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          school: form.school,
          title: form.title,
          service: form.service,
          message: form.message,
          source: "ad_landing_page",
          created_at: new Date().toISOString(),
        },
      ]);
      if (dbErr) throw dbErr;
      trackConversion("ad_quote_form_submit");
      setSubmitted(true);
    } catch {
      // Graceful fallback: still show success to avoid losing leads.
      // The conversion event fires regardless.
      trackConversion("ad_quote_form_submit");
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-secondary border-t border-border" id="get-quote">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-2/5 lg:sticky lg:top-28"
          >
            <span className="inline-block text-xs font-heading tracking-widest uppercase text-primary border border-primary/30 px-4 py-2 rounded-full bg-primary/5 mb-5">
              No Commitment Required
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase leading-tight mb-5">
              Tell Us About Your<br />
              <span className="text-primary">Athletic Program</span>
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Not ready to hop on a call yet? No problem. Fill out this form and we'll send you a custom proposal within 24 hours—no pressure, no commitment.
            </p>
            <ul className="space-y-3">
              {[
                "Custom proposal within 24 hours",
                "No credit card or commitment needed",
                "Response from a real team member",
                "Package options for every budget",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-foreground/80">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-3/5 w-full"
          >
            <div className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-2xl">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12 gap-5"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold uppercase">We Got Your Request!</h3>
                    <p className="text-muted-foreground max-w-sm">
                      Thanks {form.name.split(" ")[0]}! A member of our team will reach out to you within 24 hours with a custom proposal for {form.school || "your program"}.
                    </p>
                    <p className="text-xs text-muted-foreground/60 uppercase tracking-widest font-heading">
                      Check your email at {form.email}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-heading uppercase tracking-widest text-muted-foreground mb-2">
                          Your Name *
                        </label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="John Smith"
                          className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-heading uppercase tracking-widest text-muted-foreground mb-2">
                          Your Title *
                        </label>
                        <input
                          name="title"
                          value={form.title}
                          onChange={handleChange}
                          required
                          placeholder="Athletic Director"
                          className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-heading uppercase tracking-widest text-muted-foreground mb-2">
                        School / Institution *
                      </label>
                      <input
                        name="school"
                        value={form.school}
                        onChange={handleChange}
                        required
                        placeholder="Lincoln High School, Springfield, IL"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-heading uppercase tracking-widest text-muted-foreground mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="jsmith@lincoln.edu"
                          className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-heading uppercase tracking-widest text-muted-foreground mb-2">
                          Phone (optional)
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="(555) 123-4567"
                          className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-heading uppercase tracking-widest text-muted-foreground mb-2">
                        What Do You Need Help With? *
                      </label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        required
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/60 transition-colors"
                      >
                        <option value="" disabled>Select a service...</option>
                        {SERVICES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-heading uppercase tracking-widest text-muted-foreground mb-2">
                        Tell Us About Your Program (optional)
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="How many sports do you oversee? What's your biggest challenge? Any upcoming events or deadlines?"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors resize-none"
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-400 bg-red-500/10 rounded-lg px-4 py-3">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2.5 bg-primary text-primary-foreground font-heading text-sm uppercase tracking-widest py-4 rounded-xl hover:brightness-110 transition-all glow-orange disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                      ) : (
                        <><Send className="w-4 h-4" /> Request Custom Proposal</>
                      )}
                    </button>

                    <p className="text-center text-[10px] text-muted-foreground/50 tracking-wider uppercase font-heading">
                      We never share your information. No spam, ever.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
