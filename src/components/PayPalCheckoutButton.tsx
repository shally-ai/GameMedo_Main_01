import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface PayPalCheckoutButtonProps {
  amount: string;
  packageName: string;
  buyerName?: string;
  buyerEmail?: string;
  onSuccess?: (purchaseId: string) => void;
}

const PayPalCheckoutButton = ({ amount, packageName, buyerName, buyerEmail, onSuccess }: PayPalCheckoutButtonProps) => {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isValidating, setIsValidating] = useState(false);
  const [appliedCode, setAppliedCode] = useState("");

  const originalAmount = parseFloat(amount.replace("$", ""));
  const finalAmount = (originalAmount * (1 - discount / 100)).toFixed(2);

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setIsValidating(true);
    try {
      const { data, error } = await supabase
        .from("content")
        .select("coupon")
        .eq("id", "main")
        .maybeSingle();
        
      if (error) throw error;
      
      if (data) {
        if (data.coupon && data.coupon.enabled && data.coupon.code.toUpperCase() === couponCode.toUpperCase()) {
          setDiscount(data.coupon.discount);
          setAppliedCode(couponCode.toUpperCase());
          toast.success(`Coupon applied! ${data.coupon.discount}% discount added.`);
        } else {
          toast.error("Invalid or expired coupon code.");
          setDiscount(0);
          setAppliedCode("");
        }
      }
    } catch (error) {
      console.error("Error validating coupon:", error);
      toast.error("Error validating coupon.");
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="w-full mt-2 relative z-10 paypal-button-container space-y-4 min-w-0">
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="flex-1 min-w-[120px] bg-secondary/50 border border-border rounded px-3 py-2 text-sm focus:border-primary focus:outline-none uppercase font-mono"
        />
        <button
          onClick={handleApplyCoupon}
          disabled={isValidating || !couponCode}
          className="bg-secondary hover:bg-secondary/80 text-foreground px-4 py-2 rounded text-xs uppercase tracking-widest font-heading transition disabled:opacity-50 shrink-0"
        >
          {isValidating ? "..." : "Apply"}
        </button>
      </div>

      {discount > 0 && (
        <div className="flex flex-wrap justify-between items-center text-sm mb-4 px-1 gap-x-4 gap-y-1">
          <span className="text-muted-foreground break-all">Discount ({appliedCode})</span>
          <span className="text-primary font-bold whitespace-nowrap">-{discount}% (-${(originalAmount * (discount / 100)).toFixed(2)})</span>
        </div>
      )}

      {discount > 0 && (
        <div className="flex justify-between items-center text-lg font-bold mb-4 px-1 border-t border-border pt-2">
          <span>Total</span>
          <span>${finalAmount}</span>
        </div>
      )}

      <PayPalButtons
        forceReRender={[finalAmount, appliedCode]}
        style={{ layout: "vertical", tagline: false, color: "gold", shape: "rect", label: "checkout" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
               {
                 description: `GameMedo ${packageName} Package ${appliedCode ? `(Coupon: ${appliedCode})` : ""}`,
                 amount: {
                    currency_code: "USD",
                    value: finalAmount,
                 },
               },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          if (!actions.order) return;
          try {
            const details = await actions.order.capture();
            let savedPurchaseId = "";
            
            // Save purchase to Supabase
            try {
              const { data: purchaseData, error: dbErr } = await supabase
                .from("purchases")
                .insert([{
                  package_name: packageName,
                  amount: finalAmount,
                  original_amount: amount,
                  coupon_code: appliedCode,
                  discount,
                  buyer_name: buyerName || (details.payer?.name?.given_name + " " + (details.payer?.name?.surname || "")),
                  buyer_email: buyerEmail || details.payer?.email_address,
                  paypal_order_id: details.id,
                  status: details.status,
                  created_at: new Date().toISOString(),
                }])
                .select()
                .single();

              if (dbErr) throw dbErr;
              if (purchaseData) {
                savedPurchaseId = purchaseData.id;
              }

              // --- Affiliate Referral Tracking ---
              const refCode = localStorage.getItem('gamemedo_ref');
              if (refCode) {
                try {
                  const { data: affData } = await supabase
                    .from("affiliates")
                    .select("*")
                    .eq("referral_code", refCode.toLowerCase())
                    .maybeSingle();
                  
                  if (affData) {
                    const affiliateId = affData.id;
                    const purchaseAmount = parseFloat(finalAmount);
                    
                    // Fetch dynamic commission rate from Supabase
                    let commissionRate = 35; // default fallback
                    const { data: contentData } = await supabase
                      .from("content")
                      .select("affiliate")
                      .eq("id", "main")
                      .maybeSingle();

                    if (contentData?.affiliate?.commissionRate) {
                      commissionRate = contentData.affiliate.commissionRate;
                    }

                    const commission = purchaseAmount * (commissionRate / 100);

                    // 1. Create referral record
                    await supabase
                      .from("referrals")
                      .insert([{
                        affiliate_id: affiliateId,
                        order_id: details.id,
                        amount: purchaseAmount,
                        commission: commission,
                        status: 'pending',
                        created_at: Date.now()
                      }]);

                    // 2. Update affiliate total earnings
                    await supabase
                      .from("affiliates")
                      .update({
                        total_earnings: (affData.total_earnings || 0) + commission
                      })
                      .eq("id", affiliateId);

                    console.log(`Referral recorded for ${refCode}: $${commission} commission`);
                  }
                } catch (refErr) {
                  console.error("Error processing affiliate referral:", refErr);
                }
              }
              // ------------------------------------

            } catch (dbErr) {
              console.error("Error saving purchase to DB:", dbErr);
            }

            toast.success(`Payment successful! Thank you ${buyerName || details.payer?.name?.given_name}.`, {
              description: `You have purchased the ${packageName} package.`,
            });
            
            if (onSuccess && savedPurchaseId) {
              onSuccess(savedPurchaseId);
            }
          } catch (error) {
            console.error("PayPal Capture Error:", error);
            toast.error("Payment failed to process.", {
              description: "Please try again later.",
            });
          }
        }}
        onError={(err) => {
          console.error("PayPal Checkout Error:", err);
          toast.error("An error occurred with PayPal checkout.", {
            description: "Please refresh the page and try again.",
          });
        }}
        onCancel={() => {
          toast.info("Payment cancelled.");
        }}
      />
    </div>
  );
};

export default PayPalCheckoutButton;
