import React from "react";

interface Service {
  title: string;
  description: string;
}

interface ServicesSectionProps {
  services: Service[];
  onChange: (index: number, field: string, value: string) => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services, onChange }) => {
  return (
    <section className="bg-card border border-border rounded-lg p-6 space-y-6">
      <h3 className="font-heading text-lg font-bold uppercase border-b border-border pb-2">Services / Features</h3>
      
      {services?.map((service, index) => (
        <div key={index} className="space-y-4 p-4 border border-border rounded bg-secondary/20 relative">
          <span className="absolute -top-3 left-4 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded">Service {index + 1}</span>
          <div>
            <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2 mt-2">Title</label>
            <input
              type="text"
              value={service.title || ""}
              onChange={(e) => onChange(index, 'title', e.target.value)}
              className="w-full bg-secondary border border-border rounded px-4 py-2 text-foreground focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Description</label>
            <textarea
              value={service.description || ""}
              onChange={(e) => onChange(index, 'description', e.target.value)}
              rows={2}
              className="w-full bg-secondary border border-border rounded px-4 py-2 text-foreground focus:border-primary focus:outline-none resize-none"
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default ServicesSection;
