import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Check, DollarSign, Users, Award, ExternalLink } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Affiliate {
  id: string;
  name: string;
  email: string;
  referral_code: string;
  total_earnings: number;
  status: string;
  created_at: number;
}

interface Referral {
  id: string;
  affiliate_id: string;
  order_id: string;
  amount: number;
  commission: number;
  status: 'pending' | 'verified' | 'paid';
  created_at: number;
}

import AffiliateList from "@/components/admin/affiliates/AffiliateList";
import ReferralList from "@/components/admin/affiliates/ReferralList";

const AdminAffiliates = () => {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [commissionRate, setCommissionRate] = useState(35);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch dynamic commission rate
      try {
        const { data: contentData, error: contentError } = await supabase
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
      
      // Fetch Affiliates
      const { data: affList, error: affError } = await supabase
        .from("affiliates")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (affError) throw affError;
      setAffiliates(affList as Affiliate[]);

      // Fetch Referrals
      const { data: refList, error: refError } = await supabase
        .from("referrals")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (refError) throw refError;
      setReferrals(refList as Referral[]);

    } catch (error) {
      console.error("Error fetching admin affiliate data:", error);
      toast({ title: "Failed to load data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const markAsPaid = async (referralId: string) => {
    setUpdating(referralId);
    try {
      const { error } = await supabase
        .from("referrals")
        .update({ status: 'paid' })
        .eq("id", referralId);
        
      if (error) throw error;
      toast({ title: "Referral marked as paid" });
      fetchData();
    } catch (error) {
      console.error("Error updating referral:", error);
      toast({ title: "Update failed", variant: "destructive" });
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-12">
      <div className="flex flex-col gap-2 bg-background/80 backdrop-blur-md pt-2 pb-4 z-10 border-b border-border">
        <h2 className="font-heading text-xl md:text-2xl font-bold uppercase text-foreground">Affiliate Program</h2>
        <p className="text-xs md:text-sm text-muted-foreground max-w-2xl break-words uppercase tracking-tighter">
          Manage your partner network, track {commissionRate}% commission referrals, and verify payouts.
        </p>
      </div>

      <AffiliateList affiliates={affiliates} />

      <ReferralList 
        referrals={referrals} 
        affiliates={affiliates}
        commissionRate={commissionRate}
        onMarkAsPaid={markAsPaid}
        updating={updating}
      />
    </div>
  );
};

export default AdminAffiliates;
