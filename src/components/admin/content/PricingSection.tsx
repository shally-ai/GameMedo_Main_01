import React from "react";

interface PricingPackage {
  name: string;
  price: string;
  unit: string;
  subtitle?: string;
  features: string;
}

interface PricingSectionProps {
  packages: PricingPackage[];
  onChange: (index: number, field: string, value: string) => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ packages, onChange }) => {
  return (
    <section className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div>
        <h3 className="font-heading text-lg font-bold uppercase border-b border-border pb-2">Pricing Packages</h3>
        <p className="text-xs text-muted-foreground mt-2">
          Edit package names, prices, and features. Changes save to the live site instantly.
          <br />
          <span className="text-primary/70">Features: separate each item with a comma.</span>
        </p>
      </div>

      {packages?.map((pkg, index) => (
        <div key={index} className="space-y-4 p-4 border border-border rounded-lg bg-secondary/20 relative pt-6">
          <span className="absolute -top-3 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-0.5 rounded-full">
            {pkg.name || `Package ${index + 1}`}
          </span>

          {/* Row 1: Name + Price + Unit */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">Package Name</label>
              <input
                type="text"
                value={pkg.name || ""}
                onChange={(e) => onChange(index, "name", e.target.value)}
                className="w-full bg-secondary border border-border rounded px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                placeholder="e.g. Basic"
              />
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">Price</label>
              <input
                type="text"
                value={pkg.price || ""}
                onChange={(e) => onChange(index, "price", e.target.value)}
                className="w-full bg-secondary border border-border rounded px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                placeholder="e.g. $199 or Custom"
              />
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">Unit / Period</label>
              <input
                type="text"
                value={pkg.unit || ""}
                onChange={(e) => onChange(index, "unit", e.target.value)}
                className="w-full bg-secondary border border-border rounded px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                placeholder="e.g. /mo or /project"
              />
            </div>
          </div>

          {/* Row 2: Subtitle */}
          <div>
            <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">
              Subtitle <span className="normal-case text-muted-foreground/50">(short description shown under name)</span>
            </label>
            <input
              type="text"
              value={pkg.subtitle || ""}
              onChange={(e) => onChange(index, "subtitle", e.target.value)}
              className="w-full bg-secondary border border-border rounded px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
              placeholder="e.g. For small programs ready to ditch the spreadsheets."
            />
          </div>

          {/* Row 3: Features */}
          <div>
            <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-1.5">
              Features <span className="normal-case text-muted-foreground/50">(comma-separated)</span>
            </label>
            <textarea
              value={pkg.features || ""}
              onChange={(e) => onChange(index, "features", e.target.value)}
              rows={3}
              className="w-full bg-secondary border border-border rounded px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none resize-none"
              placeholder="Athletics website, Roster management, Email support"
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default PricingSection;
