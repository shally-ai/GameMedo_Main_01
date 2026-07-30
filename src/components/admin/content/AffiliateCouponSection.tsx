import React from "react";

interface AffiliateCouponSectionProps {
  affiliate: {
    commissionRate: number;
  };
  coupon: {
    enabled: boolean;
    code: string;
    discount: number;
    title: string;
    description: string;
  };
  onAffiliateChange: (field: string, value: string | number) => void;
  onCouponChange: (field: string, value: string | number | boolean) => void;
}

const AffiliateCouponSection: React.FC<AffiliateCouponSectionProps> = ({ 
  affiliate, 
  coupon, 
  onAffiliateChange, 
  onCouponChange 
}) => {
  return (
    <div className="space-y-8">
      {/* Affiliate Settings Section */}
      <section className="bg-card border border-border rounded-lg p-6 space-y-6">
        <h3 className="font-heading text-lg font-bold uppercase border-b border-border pb-2">Affiliate Program Settings</h3>
        
        <div className="p-4 border border-border rounded bg-secondary/20">
          <div>
            <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Commission Rate (%)</label>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <input
                type="number"
                value={affiliate?.commissionRate || 35}
                onChange={(e) => onAffiliateChange('commissionRate', parseInt(e.target.value) || 0)}
                className="w-32 bg-secondary border border-border rounded px-4 py-2 text-foreground focus:border-primary focus:outline-none"
              />
              <span className="text-xs md:text-sm font-bold text-primary break-words">
                % Commission on every successful referral sale
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Coupon Settings Section */}
      <section className="bg-card border border-border rounded-lg p-6 space-y-6">
        <h3 className="font-heading text-lg font-bold uppercase border-b border-border pb-2">Discount Coupon Settings</h3>
        
        <div className="p-6 border border-border rounded bg-secondary/20 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-heading font-bold text-sm uppercase">Enable Popup Coupon</h4>
              <p className="text-xs text-muted-foreground">Show a discount popup when users first visit the site.</p>
            </div>
            <button
              type="button"
              onClick={() => onCouponChange('enabled', !coupon?.enabled)}
              className={`w-12 h-6 rounded-full transition-colors relative ${coupon?.enabled ? 'bg-primary' : 'bg-muted'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${coupon?.enabled ? 'left-7' : 'left-1'}`} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Coupon Code</label>
              <input
                type="text"
                value={coupon?.code || ""}
                onChange={(e) => onCouponChange('code', e.target.value.toUpperCase())}
                className="w-full bg-secondary border border-border rounded px-4 py-2 text-foreground focus:border-primary focus:outline-none font-mono uppercase"
                placeholder="E.G. SAVE10"
              />
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Discount Percentage (%)</label>
              <input
                type="number"
                value={coupon?.discount || 0}
                onChange={(e) => onCouponChange('discount', parseInt(e.target.value) || 0)}
                className="w-full bg-secondary border border-border rounded px-4 py-2 text-foreground focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Popup Title</label>
            <input
              type="text"
              value={coupon?.title || ""}
              onChange={(e) => onCouponChange('title', e.target.value)}
              className="w-full bg-secondary border border-border rounded px-4 py-2 text-foreground focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Popup Description</label>
            <textarea
              value={coupon?.description || ""}
              onChange={(e) => onCouponChange('description', e.target.value)}
              rows={2}
              className="w-full bg-secondary border border-border rounded px-4 py-2 text-foreground focus:border-primary focus:outline-none resize-none"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AffiliateCouponSection;
