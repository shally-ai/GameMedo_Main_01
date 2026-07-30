import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, DollarSign, Package, Calendar as CalendarIcon, User } from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

interface Purchase {
  id: string;
  package_name: string;
  amount: string;
  buyer_name: string;
  created_at: string | null;
}

const AdminPurchases = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const { data, error } = await supabase
        .from("purchases")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (error) {
        console.error("Supabase fetchPurchases Error:", error);
        throw error;
      }
      setPurchases(data as Purchase[]);
    } catch (error) {
      console.error("Error fetching purchases:", error);
      toast({ title: "Failed to load purchases", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const totalRevenue = purchases.reduce((acc, curr) => acc + parseFloat(curr.amount || "0"), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="font-heading text-2xl font-bold uppercase text-foreground">Purchases</h2>
        <div className="flex flex-wrap gap-2 md:gap-4">
          <span className="bg-primary/20 text-primary px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-bold flex items-center gap-2">
            <Package className="w-4 h-4" /> {purchases.length} Sales
          </span>
          <span className="bg-green-500/20 text-green-500 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-bold flex items-center gap-2">
            <DollarSign className="w-4 h-4" /> Revenue: ${totalRevenue.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {/* Table View (Desktop) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary text-muted-foreground border-b border-border">
                <th className="p-4 font-heading text-xs tracking-wider uppercase">Buyer</th>
                <th className="p-4 font-heading text-xs tracking-wider uppercase">Package / Amount</th>
                <th className="p-4 font-heading text-xs tracking-wider uppercase">Date</th>
              </tr>
            </thead>
            <tbody>
              {purchases.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-muted-foreground italic font-medium">
                    No purchases found yet.
                  </td>
                </tr>
              ) : (
                purchases.map((purchase) => (
                  <tr key={purchase.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-foreground flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" /> {purchase.buyer_name || "Unknown Buyer"}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-foreground font-medium">
                        <Package className="w-4 h-4 text-primary" />
                        {purchase.package_name}
                      </div>
                      <div className="text-sm font-bold text-green-500 mt-1 ml-6">
                        ${purchase.amount}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-primary opacity-70" />
                        {purchase.created_at ? format(new Date(purchase.created_at), "PPP 'at' p") : "N/A"}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Card View (Mobile) */}
        <div className="md:hidden divide-y divide-border">
          {purchases.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground italic font-medium">
              No purchases found yet.
            </div>
          ) : (
            purchases.map((purchase) => (
              <div key={purchase.id} className="p-4 space-y-4 hover:bg-secondary/30 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="font-bold text-foreground flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" /> {purchase.buyer_name || "Unknown Buyer"}
                  </div>
                  <div className="text-green-500 font-bold text-sm bg-green-500/10 px-2 py-0.5 rounded">
                    ${purchase.amount}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                    <Package className="w-3.5 h-3.5 text-primary" />
                    {purchase.package_name}
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <CalendarIcon className="w-3.5 h-3.5" />
                    {purchase.created_at ? format(new Date(purchase.created_at), "MMM d") : "N/A"}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPurchases;
