import React from "react";
import { Wand2 } from "lucide-react";

interface HeroSectionProps {
  data: {
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    ctaText: string;
    ctaUrl: string;
  };
  onChange: (field: string, value: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ data, onChange }) => {
  return (
    <section className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-2 mb-4 border-b border-border pb-2">
        <Wand2 className="w-5 h-5 text-primary" />
        <h3 className="font-heading text-lg font-bold uppercase">Hero Section</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Title (Start)</label>
          <input
            type="text"
            value={data.titleStart || ""}
            onChange={(e) => onChange('titleStart', e.target.value)}
            className="w-full bg-secondary border border-border rounded px-4 py-2 text-foreground focus:border-primary focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Title (Highlight)</label>
          <input
            type="text"
            value={data.titleHighlight || ""}
            onChange={(e) => onChange('titleHighlight', e.target.value)}
            className="w-full bg-secondary border border-border rounded px-4 py-2 text-foreground focus:border-primary focus:outline-none"
          />
        </div>
      </div>
      
      <div>
        <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Subtitle</label>
        <textarea
          value={data.subtitle || ""}
          onChange={(e) => onChange('subtitle', e.target.value)}
          rows={2}
          className="w-full bg-secondary border border-border rounded px-4 py-2 text-foreground focus:border-primary focus:outline-none resize-none"
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">CTA Button Text</label>
          <input
            type="text"
            value={data.ctaText || ""}
            onChange={(e) => onChange('ctaText', e.target.value)}
            className="w-full bg-secondary border border-border rounded px-4 py-2 text-foreground focus:border-primary focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">CTA Button URL</label>
          <input
            type="text"
            value={data.ctaUrl || ""}
            onChange={(e) => onChange('ctaUrl', e.target.value)}
            className="w-full bg-secondary border border-border rounded px-4 py-2 text-foreground focus:border-primary focus:outline-none"
            placeholder="e.g. #pricing or https://..."
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
