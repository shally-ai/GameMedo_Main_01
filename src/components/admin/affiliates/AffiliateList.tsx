import React from "react";
import { Users } from "lucide-react";

interface Affiliate {
  id: string;
  name: string;
  email: string;
  referral_code: string;
  total_earnings: number;
  status: string;
  created_at: number;
}

interface AffiliateListProps {
  affiliates: Affiliate[];
}

const AffiliateList: React.FC<AffiliateListProps> = ({ affiliates }) => {
  return (
    <section className="bg-card border border-border rounded-lg overflow-hidden shrink-0">
      <div className="p-4 md:p-6 border-b border-border flex items-center justify-between bg-primary/5">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="font-heading font-bold uppercase text-sm md:text-base">Affiliate Partners</h3>
        </div>
        <span className="text-[10px] md:text-xs font-bold bg-secondary text-secondary-foreground px-2 py-1 rounded">
          {affiliates.length} REGISTERED
        </span>
      </div>
      
      {/* Table View (Desktop) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-secondary/30 text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="px-6 py-4">Name / Email</th>
              <th className="px-6 py-4">Ref Code</th>
              <th className="px-6 py-4">Total Earnings</th>
              <th className="px-6 py-4">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {affiliates.map((aff) => (
              <tr key={aff.id} className="hover:bg-secondary/10 transition">
                <td className="px-6 py-4">
                  <div className="font-bold text-sm text-foreground">{aff.name}</div>
                  <div className="text-xs text-muted-foreground">{aff.email}</div>
                </td>
                <td className="px-6 py-4">
                  <code className="text-[10px] bg-secondary px-2 py-1 rounded border border-border">{aff.referral_code}</code>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-primary">${(aff.total_earnings || 0).toFixed(2)}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs text-muted-foreground">{new Date(aff.created_at).toLocaleDateString()}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card View (Mobile) */}
      <div className="md:hidden divide-y divide-border/50">
        {affiliates.map((aff) => (
          <div key={aff.id} className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-sm text-foreground">{aff.name}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{aff.email}</div>
              </div>
              <div className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                ${(aff.total_earnings || 0).toFixed(2)}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <code className="text-[9px] bg-secondary/80 px-2 py-0.5 rounded border border-border/50">{aff.referral_code}</code>
              <span className="text-[10px] text-muted-foreground font-medium">Joined {new Date(aff.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
        {affiliates.length === 0 && (
          <div className="p-8 text-center text-muted-foreground text-xs italic">No affiliates yet.</div>
        )}
      </div>
    </section>
  );
};

export default AffiliateList;
