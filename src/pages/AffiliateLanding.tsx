import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import {
  Users, DollarSign, Zap, Loader2, Eye, EyeOff,
  Mail, Lock, User as UserIcon, ArrowRight, CheckCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

type FormMode = "signup" | "login";

const AffiliateLanding = () => {
  const [commissionRate, setCommissionRate] = useState<number | null>(null);
  const [mode, setMode] = useState<FormMode>("signup");
  const [showForm, setShowForm] = useState(false);

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch commission rate from Supabase content table
  useEffect(() => {
    const fetchRate = async () => {
      try {
        const { data } = await supabase
          .from("content")
          .select("affiliate")
          .eq("id", "main")
          .maybeSingle();
        setCommissionRate(data?.affiliate?.commissionRate ?? 25);
      } catch {
        setCommissionRate(25);
      }
    };
    fetchRate();
  }, []);

  // If user is already logged in, send them to the dashboard
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) navigate("/affiliate/dashboard");
    });
  }, [navigate]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({ title: "Name required", description: "Please enter your full name.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name.trim() },
          emailRedirectTo: window.location.origin + "/affiliate/dashboard",
        },
      });

      if (error) throw error;

      // If email confirmation is disabled in Supabase, user is auto-confirmed
      if (data.session) {
        toast({ title: "Welcome aboard! 🎉", description: "Your affiliate account is ready." });
        navigate("/affiliate/dashboard");
      } else {
        // Email confirmation required
        toast({
          title: "Check your email!",
          description: "We sent you a confirmation link. Click it to activate your account.",
        });
        setShowForm(false);
      }
    } catch (err: any) {
      toast({ title: "Signup Failed", description: err.message || "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.session) navigate("/affiliate/dashboard");
    } catch (err: any) {
      toast({ title: "Login Failed", description: err.message || "Invalid email or password.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast({ title: "Enter your email first", description: "Type your email above then click Forgot Password.", variant: "destructive" });
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/affiliate/dashboard",
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Reset email sent!", description: "Check your inbox for a password reset link." });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Join our Affiliate Program"
        description="Earn high commissions by promoting GameMedo sports design services to your network."
        url="https://gamemedo.com/affiliate"
      />
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* ── Hero ─────────────────────────────────────── */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block mb-4 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full"
            >
              <span className="text-primary font-heading text-xs tracking-widest uppercase font-bold">
                Partner Program
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl md:text-6xl font-bold uppercase mb-6"
            >
              Earn{" "}
              <span className="text-primary">
                {commissionRate !== null ? `${commissionRate}% Commission` : "…"}
              </span>
              <br />
              Per Referral
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10"
            >
              Join the GameMedo affiliate program and earn industry-leading commissions by
              promoting the best sports design services to teams and athletes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <button
                onClick={() => { setMode("signup"); setShowForm(true); }}
                className="bg-primary text-primary-foreground font-heading text-sm tracking-widest uppercase px-10 py-4 rounded-lg glow-orange hover:brightness-110 transition flex items-center gap-2 mx-auto sm:mx-0"
              >
                <Zap className="w-4 h-4 fill-current" />
                Join the Program Now
              </button>
              <button
                onClick={() => { setMode("login"); setShowForm(true); }}
                className="border border-border text-foreground font-heading text-sm tracking-widest uppercase px-10 py-4 rounded-lg hover:border-primary hover:text-primary transition flex items-center gap-2 mx-auto sm:mx-0"
              >
                <ArrowRight className="w-4 h-4" />
                Already a Partner? Sign In
              </button>
            </motion.div>
          </div>

          {/* ── Inline Sign Up / Login Form ───────────────── */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden mb-16"
              >
                <div className="max-w-md mx-auto bg-card border border-border rounded-2xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                  {/* Tabs */}
                  <div className="flex rounded-lg bg-secondary overflow-hidden mb-6">
                    {(["signup", "login"] as FormMode[]).map((m) => (
                      <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={`flex-1 py-2.5 text-xs font-heading font-bold uppercase tracking-widest transition-all ${
                          mode === m
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {m === "signup" ? "Create Account" : "Sign In"}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={mode === "signup" ? handleSignup : handleLogin} className="space-y-4">
                    {/* Name — only on signup */}
                    {mode === "signup" && (
                      <div>
                        <label htmlFor="aff-name" className="text-xs uppercase tracking-widest text-muted-foreground block mb-1.5">Full Name</label>
                        <div className="relative">
                          <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            id="aff-name"
                            name="fullName"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Coach Smith"
                            className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition"
                          />
                        </div>
                      </div>
                    )}

                    {/* Email */}
                    <div>
                      <label htmlFor="aff-email" className="text-xs uppercase tracking-widest text-muted-foreground block mb-1.5">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          id="aff-email"
                          name="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="you@school.edu"
                          className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label htmlFor="aff-password" className="text-xs uppercase tracking-widest text-muted-foreground block mb-1.5">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          id="aff-password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          minLength={8}
                          placeholder={mode === "signup" ? "Min 8 characters" : "Your password"}
                          className="w-full bg-secondary border border-border rounded-lg pl-10 pr-12 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Forgot password (login only) */}
                    {mode === "login" && (
                      <div className="text-right">
                        <button type="button" onClick={handleForgotPassword} className="text-xs text-primary hover:underline">
                          Forgot password?
                        </button>
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary text-primary-foreground font-heading text-sm tracking-widest uppercase py-4 rounded-lg glow-orange hover:brightness-110 transition flex items-center justify-center gap-2 mt-2"
                    >
                      {loading
                        ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
                        : mode === "signup"
                          ? <><CheckCircle className="w-4 h-4" /> Create My Affiliate Account</>
                          : <><ArrowRight className="w-4 h-4" /> Sign In to Dashboard</>
                      }
                    </button>

                    {mode === "signup" && (
                      <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
                        By signing up you agree to our{" "}
                        <a href="/terms" className="text-primary hover:underline">Terms &amp; Conditions</a>.
                        Your account will be active immediately.
                      </p>
                    )}
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Feature Cards ────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: <DollarSign className="w-8 h-8 text-primary" />,
                title: "High Commissions",
                desc: `Earn a massive ${commissionRate !== null ? `${commissionRate}%` : "…"} on every successful sale made through your link.`,
              },
              {
                icon: <Zap className="w-8 h-8 text-primary" />,
                title: "Fast Payouts",
                desc: "Get your earnings paid out quickly once they are verified.",
              },
              {
                icon: <Users className="w-8 h-8 text-primary" />,
                title: "Dedicated Support",
                desc: "Access to marketing materials and support to help you succeed.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border p-8 rounded-2xl"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="font-heading text-xl font-bold uppercase mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* ── How It Works ─────────────────────────────── */}
          <section className="bg-secondary/30 rounded-3xl p-8 md:p-16 border border-border">
            <h2 className="font-heading text-3xl font-bold uppercase text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { step: "01", title: "Sign Up", desc: "Create your free affiliate account above in under 30 seconds." },
                { step: "02", title: "Share Link", desc: "Get your unique referral link and share it on social media or with teams." },
                {
                  step: "03",
                  title: "Get Paid",
                  desc: `When someone buys using your link, you earn ${commissionRate !== null ? `${commissionRate}%` : "…"} commission automatically.`,
                },
              ].map((item, i) => (
                <div key={i} className="relative z-10 text-center">
                  <div className="text-6xl font-bold text-primary/10 mb-4">{item.step}</div>
                  <h4 className="font-heading text-xl font-bold uppercase mb-3">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => { setMode("signup"); setShowForm(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="bg-primary text-primary-foreground font-heading text-sm tracking-widest uppercase px-10 py-4 rounded-lg glow-orange hover:brightness-110 transition inline-flex items-center gap-2"
              >
                <Zap className="w-4 h-4 fill-current" /> Get Started — It's Free
              </button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AffiliateLanding;
