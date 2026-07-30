import React from "react";

interface Testimonial {
  quote: string;
  name: string;
  school: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  onChange: (index: number, field: string, value: string) => void;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials, onChange }) => {
  return (
    <section className="bg-card border border-border rounded-lg p-6 space-y-6">
      <h3 className="font-heading text-lg font-bold uppercase border-b border-border pb-2">Testimonials</h3>
      
      {testimonials?.map((testimonial, index) => (
        <div key={index} className="space-y-4 p-4 border border-border rounded bg-secondary/20 relative">
          <span className="absolute -top-3 left-4 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded">Review {index + 1}</span>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Name</label>
              <input
                type="text"
                value={testimonial.name || ""}
                onChange={(e) => onChange(index, 'name', e.target.value)}
                className="w-full bg-secondary border border-border rounded px-4 py-2 text-foreground focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">School / Title</label>
              <input
                type="text"
                value={testimonial.school || ""}
                onChange={(e) => onChange(index, 'school', e.target.value)}
                className="w-full bg-secondary border border-border rounded px-4 py-2 text-foreground focus:border-primary focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Quote</label>
            <textarea
              value={testimonial.quote || ""}
              onChange={(e) => onChange(index, 'quote', e.target.value)}
              rows={3}
              className="w-full bg-secondary border border-border rounded px-4 py-2 text-foreground focus:border-primary focus:outline-none resize-none"
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default TestimonialsSection;
