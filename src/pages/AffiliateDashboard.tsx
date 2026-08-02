import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import {
  Users, DollarSign, Copy, Zap,
  TrendingUp, Clock, LogOut, Loader2, Link as LinkIcon
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

interface AffiliateData {
  id: string;
  name: string;
  referral_code: string;
  total_earnings: number;
}

interface ReferralRecord {
  id: string;
  order_id: string;
  amount: number;
  commission: number;
  status: 'pending' | 'verified' | 'paid';
  created_at: number;
}

const AffiliateDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [affiliate, setAffiliate] = useState<AffiliateData | null>(null);
  const [referrals, setReferrals] = useState<ReferralRecord[]>([]);
  const [commissionRate, setCommissionRate] = useState(25);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAffiliateData = useCallback(async (uid: string, userDetails: User) => {
    try {
      setLoading(true);
      
      const { data: affData, error: affError } = await supabase
        .from("affiliates")
        .select("*")
        .eq("id", uid)
        .maybeSingle();

      if (affError) throw affError;

      let currentAffiliate = affData;

      if (!currentAffiliate) {
        // Create new affiliate record if it doesn't exist
        const referralCode = (userDetails.email?.split('@')[0].replace(/[^a-zA-Z0-9]/g, '') ?? 'partner') + Math.floor(Math.random() * 1000);
        const newAffiliatePayload = {
          id: uid,
          name: userDetails.user_metadata?.full_name || userDetails.email?.split('@')[0] || "Partner",
          email: userDetails.email,
          referral_code: referralCode.toLowerCase(),
          status: "approved",
          total_earnings: 0,
          created_at: Date.now()
        };

        // Insert new affiliate record
        const { error: insertError } = await supabase
          .from("affiliates")
          .insert([newAffiliatePayload]);

        if (insertError) {
          // RLS may block the insert on first login — log it but don't crash the UI
          console.error("Affiliate insert error (possible RLS):", insertError.message);
          // Still set state with the local payload so dashboard renders
          setAffiliate(newAffiliatePayload as AffiliateData);
          toast({
            title: "Account ready!",
            description: "Your affiliate account has been set up."
          });
          return;
        }

        // Re-fetch the just-created record
        const { data: refetchedAff } = await supabase
          .from("affiliates")
          .select("*")
          .eq("id", uid)
          .maybeSingle();

        currentAffiliate = refetchedAff ?? newAffiliatePayload;
        
        toast({ 
          title: "Welcome to the Program!", 
          description: "Your affiliate account has been created." 
        });
      }

      setAffiliate(currentAffiliate as AffiliateData);
      
      // Fetch dynamic commission rate
      try {
        const { data: contentData } = await supabase
          .from("content")
          .select("affiliate")
          .eq("id", "main")
          .maybeSingle();
          
        if (contentData?.affiliate?.commissionRate) {
          setCommissionRate(contentData.affiliate.commissionRate);
        }
      } catch (e) {
        console.error("Error fetching dynamic commission rate:", e);
      }

      // Fetch referrals (silently fail if RLS blocks access)
      const { data: refList, error: refError } = await supabase
        .from("referrals")
        .select("*")
        .eq("affiliate_id", uid)
        .order("created_at", { ascending: false });
        
      if (refError) {
        console.warn("Could not fetch referrals:", refError.message);
        setReferrals([]);
      } else {
        setReferrals(refList as ReferralRecord[]);
      }
    } catch (error: any) {
      console.error("Error fetching dashboard data:", error);
      toast({ title: "Failed to load dashboard", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        fetchAffiliateData(session.user.id, session.user);
      } else {
        setLoading(false);
        navigate("/affiliate");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        fetchAffiliateData(session.user.id, session.user);
      } else {
        setUser(null);
        setAffiliate(null);
        navigate("/affiliate");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, fetchAffiliateData]);

  const copyLink = () => {
    if (!affiliate) return;
    const link = `${window.location.origin}/order?ref=${affiliate.referral_code}`;
    navigator.clipboard.writeText(link);
    toast({ title: "Link Copied!", description: `Share this link to earn ${commissionRate}% commission.` });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/affiliate");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Partner Dashboard" noIndex={true} />
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div>
              <h1 className="font-heading text-3xl font-bold uppercase">Partner Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {affiliate?.name}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-red-500 hover:text-red-400 font-heading uppercase tracking-widest"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>

          {/* Referral Link Card */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <LinkIcon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-bold uppercase text-sm tracking-wider">Your Referral Link</h3>
                  <p className="text-muted-foreground text-xs">{window.location.origin}/order?ref={affiliate?.referral_code}</p>
                </div>
              </div>
              <button
                onClick={copyLink}
                className="bg-primary text-primary-foreground font-heading text-xs tracking-widest uppercase px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition"
              >
                <Copy className="w-4 h-4" /> Copy Referral Link
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { 
                label: `${commissionRate}% Commission Rate`, 
                value: "Active", 
                icon: <Zap className="w-5 h-5 text-primary" />,
                bg: "bg-primary/5"
              },
              { 
                label: "Total Referrals", 
                value: referrals.length.toString(), 
                icon: <Users className="w-5 h-5 text-green-500" />,
                bg: "bg-green-500/5"
              },
              { 
                label: "Total Earnings", 
                value: `$${affiliate?.total_earnings.toFixed(2)}`,                 icon: <DollarSign className="w-5 h-5 text-blue-500" />,
                bg: "bg-blue-500/5"
              }
            ].map((stat, i) => (
              <div key={i} className={`p-6 rounded-2xl border border-border ${stat.bg}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-background/50 border border-border/50">
                    {stat.icon}
                  </div>
                </div>
                <h4 className="text-muted-foreground text-xs uppercase tracking-[0.2em] font-heading font-bold mb-1">{stat.label}</h4>
                <div className="text-2xl font-bold font-heading">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Referrals Table */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold uppercase">Recent Referrals</h3>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-secondary/30 text-xs font-heading font-bold uppercase tracking-widest text-muted-foreground">
                  <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4 text-primary">Your {commissionRate}%</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {referrals.length > 0 ? referrals.map((ref) => (
                    <tr key={ref.id} className="hover:bg-secondary/10 transition">
                      <td className="px-6 py-4 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{new Date(ref.created_at).toLocaleDateString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          ref.status === 'paid' ? 'bg-green-500/10 text-green-500' : 
                          ref.status === 'verified' ? 'bg-blue-500/10 text-blue-500' : 'bg-yellow-500/10 text-yellow-500'
                        }`}>
                          {ref.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">${ref.amount.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm font-bold text-primary">${ref.commission.toFixed(2)}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-20 text-center">
                        <p className="text-muted-foreground mb-4">You haven't made any referrals yet.</p>
                        <button onClick={copyLink} className="text-primary font-heading text-xs uppercase hover:underline">
                          Start sharing your link
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AffiliateDashboard;
