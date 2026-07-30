import React from "react";
import { Award, DollarSign, Loader2, Check } from "lucide-react";

interface Referral {
  id: string;
  affiliate_id: string;
  order_id: string;
  amount: number;
  commission: number;
  status: 'pending' | 'verified' | 'paid';
  created_at: number;
}

interface Affiliate {
  id: string;
  name: string;
}

interface ReferralListProps {
  referrals: Referral[];
  affiliates: Affiliate[];
  commissionRate: number;
  onMarkAsPaid: (id: string) => void;
  updating: string | null;
}

const ReferralList: React.FC<ReferralListProps> = ({ 
  referrals, 
  affiliates, 
  commissionRate, 
  onMarkAsPaid, 
  updating 
}) => {
  return (
    <section className="bg-card border border-border rounded-lg overflow-hidden shrink-0">
      <div className="p-4 md:p-6 border-b border-border flex items-center justify-between bg-green-500/5">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-green-500" />
          <h3 className="font-heading font-bold uppercase text-sm md:text-base">Referral Commissions ({commissionRate}%)</h3>
        </div>
      </div>
      
      {/* Table View (Desktop) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-secondary/30 text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="px-6 py-4">Affiliate</th>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Sale Amount</th>
              <th className="px-6 py-4 text-primary">Commission</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {referrals.map((ref) => {
              const affiliate = affiliates.find(a => a.id === ref.affiliate_id);
              return (
                <tr key={ref.id} className="hover:bg-secondary/10 transition">
                  <td className="px-6 py-4">
                    <div className="text-xs font-bold text-foreground">{affiliate?.name || 'Unknown'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[10px] text-muted-foreground font-mono">{ref.order_id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-medium">${ref.amount.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-bold text-primary">${ref.commission.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      ref.status === 'paid' ? 'bg-green-500/10 text-green-500' : 
                      ref.status === 'verified' ? 'bg-blue-500/10 text-blue-500' : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {ref.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {ref.status !== 'paid' ? (
                      <button
                        onClick={() => onMarkAsPaid(ref.id)}
                        disabled={updating === ref.id}
                        className="flex items-center gap-1.5 text-[9px] bg-primary text-primary-foreground px-3 py-1.5 rounded-lg uppercase font-heading font-bold tracking-widest hover:brightness-110 active:scale-[0.98] transition shadow-sm shadow-primary/20 disabled:opacity-50"
                      >
                        {updating === ref.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <DollarSign className="w-3 h-3" />}
                        Settle Payout
                      </button>
                    ) : (
                      <div className="text-green-500 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider">
                        <Check className="w-3.5 h-3.5" /> Settled
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Card View (Mobile) */}
      <div className="md:hidden divide-y divide-border/50">
        {referrals.map((ref) => {
          const affiliate = affiliates.find(a => a.id === ref.affiliate_id);
          return (
            <div key={ref.id} className="p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-bold bg-secondary/50 px-2 py-0.5 rounded-full inline-block border border-border/50 mb-2">Order #{ref.order_id?.slice(-6)}</div>
                  <div className="font-bold text-sm">{affiliate?.name || 'Unknown Partner'}</div>
                </div>
                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  ref.status === 'paid' ? 'bg-green-500/10 text-green-500' : 
                  ref.status === 'verified' ? 'bg-blue-500/10 text-blue-500' : 'bg-yellow-500/10 text-yellow-500'
                }`}>
                  {ref.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-secondary/20 p-2 rounded-lg border border-border/30">
                  <div className="text-[9px] uppercase font-bold text-muted-foreground mb-1">Sale Vol.</div>
                  <div className="text-xs font-bold">${ref.amount.toFixed(2)}</div>
                </div>
                <div className="bg-primary/5 p-2 rounded-lg border border-primary/10">
                  <div className="text-[9px] uppercase font-bold text-primary mb-1">Commission</div>
                  <div className="text-xs font-bold text-primary">${ref.commission.toFixed(2)}</div>
                </div>
              </div>

              {ref.status !== 'paid' ? (
                <button
                  onClick={() => onMarkAsPaid(ref.id)}
                  disabled={updating === ref.id}
                  className="w-full flex items-center justify-center gap-2 text-[10px] bg-primary text-primary-foreground py-3 rounded-xl uppercase font-heading font-bold tracking-[0.1em] hover:brightness-110 active:scale-[0.98] transition disabled:opacity-50"
                >
                  {updating === ref.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <DollarSign className="w-3.5 h-3.5" />}
                  Confirm & Mark Paid
                </button>
              ) : (
                <div className="w-full bg-green-500/5 text-green-500 flex items-center justify-center gap-1.5 text-xs font-bold uppercase py-2 rounded-lg border border-green-500/20">
                  <Check className="w-4 h-4" /> Payment Settled
                </div>
              )}
            </div>
          );
        })}
        {referrals.length === 0 && (
          <div className="p-12 text-center text-muted-foreground text-xs italic">No referrals yet.</div>
        )}
      </div>
    </section>
  );
};

export default ReferralList;
