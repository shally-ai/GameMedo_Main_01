import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Save, Wand2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const defaultContent = {
  hero: {
    titleStart: "You Own The Game, ",
    titleHighlight: "Medo Elevates Your Fame",
    subtitle: "Premium sports graphic design and video editing for high school & varsity teams — fast, affordable, and game-day ready.",
    ctaText: "Book Demo",
    ctaUrl: "https://calendar.app.google/f6jg8ZqxVD2iVZtD8"
  },
  services: [
    {
      title: "Game Day Graphics",
      description: "Eye-catching matchday posters, social media graphics, and schedule releases that hype up your fans."
    },
    {
      title: "Highlight Tapes",
      description: "Professional video editing that turns raw footage into jaw-dropping highlight reels for recruits and social media."
    },
    {
      title: "Team Branding",
      description: "From logo modernization to complete brand identity packages, we make your team look like the pros."
    },
    {
      title: "Player Spotlights",
      description: "Individual player graphics and senior night designs that celebrate your athletes' achievements."
    }
  ],
  pricing: [
    {
      name: "Basic",
      price: "$199",
      unit: "/mo",
      subtitle: "For small programs ready to ditch the spreadsheets.",
      features: "Athletics website, Roster & schedule management, Basic QR ticketing, Email support"
    },
    {
      name: "Standard",
      price: "$399",
      unit: "/mo",
      subtitle: "Most popular for high schools running 10+ teams.",
      features: "Everything in Basic, Live scores & streaming, Auto social graphics, Advanced ticketing analytics, Priority support"
    },
    {
      name: "Premium",
      price: "Custom",
      unit: "",
      subtitle: "For colleges and large districts that demand everything.",
      features: "Everything in Standard, Cinematic intro videos, Dedicated success manager, Custom integrations & SSO, On-site onboarding"
    }
  ],
  testimonials: [
    {
      quote: "Our players were hyped! The graphics GameMedo created set the tone for every home game. Best investment we made all season.",
      name: "Coach Martinez",
      school: "Lincoln High School"
    },
    {
      quote: "The highlight videos and player spotlights were absolutely professional. Parents and fans loved it.",
      name: "AD Johnson",
      school: "Westfield Academy"
    },
    {
      quote: "GameMedo transformed our team's brand. We've already ordered for next season. Incredible quality and turnaround.",
      name: "Coach Davis",
      school: "Riverside High"
    }
  ],
  socialLinks: [
    { platform: "Instagram", href: "https://instagram.com/gamemedo" },
    { platform: "Facebook", href: "https://facebook.com/gamemedo" },
    { platform: "YouTube", href: "https://youtube.com/@gamemedo" }
  ],
  affiliate: {
    commissionRate: 35
  },
  coupon: {
    enabled: false,
    code: "SAVE10",
    discount: 10,
    title: "Special Offer!",
    description: "Use this code at checkout to get a 10% discount on any package."
  },
  privacyPolicy: "",
  termsConditions: "",
  about: {
    title: "Elevating Athletic Legacies",
    subtitle: "We believe every athlete and every team deserves to look like the pros. GameMedo was founded to bridge the gap between amateur sports and elite-level digital branding.",
    mission: "Our mission is simple: To empower high school and varsity programs with professional-grade visual assets that drive engagement, attract recruiters, and build team pride.",
    videoUrl: "",
    stats: [
      { label: "Teams Trusted", value: "50+" },
      { label: "Designs Created", value: "1,200+" },
      { label: "Turnaround", value: "24-48h" },
      { label: "Satisfaction", value: "99+" },
    ]
  }
};

interface ContentData {
  hero: {
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    ctaText: string;
    ctaUrl: string;
  };
  services: {
    title: string;
    description: string;
  }[];
  pricing: {
    name: string;
    price: string;
    unit: string;
    subtitle?: string;
    features: string;
  }[];
  testimonials: {
    quote: string;
    name: string;
    school: string;
  }[];
  socialLinks: {
    platform: string;
    href: string;
  }[];
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
  privacyPolicy: string;
  termsConditions: string;
  about: {
    title: string;
    subtitle: string;
    mission: string;
    videoUrl?: string;
    stats: { label: string; value: string }[];
  };
}

import HeroSection from "@/components/admin/content/HeroSection";
import ServicesSection from "@/components/admin/content/ServicesSection";
import PricingSection from "@/components/admin/content/PricingSection";
import TestimonialsSection from "@/components/admin/content/TestimonialsSection";
import AffiliateCouponSection from "@/components/admin/content/AffiliateCouponSection";
import AboutSection from "@/components/admin/content/AboutSection";

const AdminContent = () => {
  const [content, setContent] = useState<ContentData>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [existingColumns, setExistingColumns] = useState<string[]>([]);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from("content")
        .select("*")
        .eq("id", "main")
        .maybeSingle();
        
      if (error) {
        console.error("Supabase fetchContent Error:", error);
        throw error;
      }
      
      if (data) {
        // Dynamically detect which columns exist in the DB
        setExistingColumns(Object.keys(data));
        
        setContent({
          ...defaultContent,
          hero: { ...defaultContent.hero, ...(data.hero || {}) },
          services: data.services || defaultContent.services,
          pricing: data.pricing || defaultContent.pricing,
          testimonials: data.testimonials || defaultContent.testimonials,
          socialLinks: data.social_links || defaultContent.socialLinks,
          affiliate: data.affiliate || defaultContent.affiliate,
          coupon: data.coupon || defaultContent.coupon,
          privacyPolicy: data.privacy_policy || defaultContent.privacyPolicy,
          termsConditions: data.terms_conditions || defaultContent.termsConditions,
          // Only use DB about content if the column exists
          about: data.about || defaultContent.about,
        });
      } else {
        // Initialize with default
        const { error: insertError } = await supabase
          .from("content")
          .insert([{ 
            id: "main", 
            hero: defaultContent.hero,
            services: defaultContent.services,
            pricing: defaultContent.pricing,
            testimonials: defaultContent.testimonials,
            social_links: defaultContent.socialLinks,
            affiliate: defaultContent.affiliate,
            coupon: defaultContent.coupon,
            privacy_policy: defaultContent.privacyPolicy,
            terms_conditions: defaultContent.termsConditions,
            about: defaultContent.about
          }]);
          
        if (insertError) {
          console.error("Supabase insertContent Error:", insertError);
          // If insert fails due to missing column, retry without about
          if (insertError.message.includes("column \"about\"")) {
             await supabase.from("content").insert([{ 
              id: "main", 
              hero: defaultContent.hero,
              services: defaultContent.services,
              pricing: defaultContent.pricing,
              testimonials: defaultContent.testimonials,
              social_links: defaultContent.socialLinks,
              affiliate: defaultContent.affiliate,
              coupon: defaultContent.coupon,
              privacy_policy: defaultContent.privacyPolicy,
              terms_conditions: defaultContent.termsConditions,
            }]);
          }
        }
        setContent(defaultContent);
      }
    } catch (error) {
      console.error("Caught error in fetchContent:", error);
      toast({ title: "Failed to load content", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Map frontend state to DB columns
      const fullPayload: any = {
        hero: content.hero,
        services: content.services,
        pricing: content.pricing,
        testimonials: content.testimonials,
        social_links: content.socialLinks,
        affiliate: content.affiliate,
        coupon: content.coupon,
        privacy_policy: content.privacyPolicy,
        terms_conditions: content.termsConditions,
        about: content.about
      };

      // Filter payload to only include columns that actually exist in the DB
      // If existingColumns is empty (e.g. initial load failed), we use a safe subset
      const safePayload: any = {};
      const columnsToSync = existingColumns.length > 0 
        ? existingColumns 
        : ['hero', 'services', 'pricing', 'testimonials', 'social_links', 'affiliate', 'coupon', 'privacy_policy', 'terms_conditions', 'about'];

      Object.keys(fullPayload).forEach(key => {
        if (columnsToSync.includes(key)) {
          safePayload[key] = fullPayload[key];
        }
      });

      const { error } = await supabase
        .from("content")
        .update(safePayload)
        .eq("id", "main");
        
      if (error) {
        console.error("Supabase handleSave Error Details:", error);
        throw error;
      }
      
      toast({ title: "Content saved successfully!", description: "Changes are now live on the website." });
    } catch (error: any) {
      console.error("Caught error in handleSave:", error);
      toast({ 
        title: "Failed to save content", 
        description: error.message || "An unexpected error occurred",
        variant: "destructive" 
      });
    } finally {
      setSaving(false);
    }
  };

  const handleHeroChange = (field: string, value: string) => {
    setContent((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }));
  };

  const handleServiceChange = (index: number, field: string, value: string) => {
    const newServices = [...content.services];
    newServices[index] = { ...newServices[index], [field]: value };
    setContent({ ...content, services: newServices });
  };

  const handlePricingChange = (index: number, field: string, value: string) => {
    const newPricing = [...content.pricing];
    newPricing[index] = { ...newPricing[index], [field]: value };
    setContent({ ...content, pricing: newPricing });
  };

  const handleTestimonialChange = (index: number, field: string, value: string) => {
    const newTestimonials = [...(content.testimonials || [])];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    setContent({ ...content, testimonials: newTestimonials });
  };

  const handleSocialLinkChange = (index: number, field: string, value: string) => {
    const newSocialLinks = [...(content.socialLinks || [])];
    newSocialLinks[index] = { ...newSocialLinks[index], [field]: value };
    setContent({ ...content, socialLinks: newSocialLinks });
  };

  const handleAffiliateChange = (field: string, value: string | number) => {
    setContent((prev) => ({
      ...prev,
      affiliate: { ...prev.affiliate, [field]: value }
    }));
  };

  const handleCouponChange = (field: string, value: string | number | boolean) => {
    setContent((prev) => ({
      ...prev,
      coupon: { ...prev.coupon, [field]: value }
    }));
  };

  const handleLegalChange = (field: 'privacyPolicy' | 'termsConditions', value: string) => {
    setContent((prev) => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleAboutChange = (field: string, value: any) => {
    setContent((prev) => ({
      ...prev,
      about: { ...prev.about, [field]: value }
    }));
  };

  const handleAboutStatChange = (index: number, field: string, value: string) => {
    const newStats = [...content.about.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setContent({ ...content, about: { ...content.about, stats: newStats } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 pb-12">
      <div className="flex justify-between items-center sticky top-0 bg-background/80 backdrop-blur-md pt-2 pb-4 z-10 border-b border-border">
        <h2 className="font-heading text-2xl font-bold uppercase text-foreground">Manage Content</h2>
        <button
          type="submit"
          disabled={saving}
          className="bg-primary text-primary-foreground font-heading text-sm tracking-widest uppercase px-6 py-2 rounded glow-orange hover:brightness-110 transition disabled:opacity-50 flex items-center gap-2"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <HeroSection data={content.hero} onChange={handleHeroChange} />
      
      <ServicesSection services={content.services} onChange={handleServiceChange} />
      
      <PricingSection packages={content.pricing} onChange={handlePricingChange} />
      
      <TestimonialsSection testimonials={content.testimonials} onChange={handleTestimonialChange} />
      
      <AboutSection 
        data={content.about} 
        onChange={handleAboutChange} 
        onStatChange={handleAboutStatChange} 
      />

      {/* Social Links Section */}
      <section className="bg-card border border-border rounded-lg p-6 space-y-6">
        <h3 className="font-heading text-lg font-bold uppercase border-b border-border pb-2">Footer Social Links</h3>
        
        {content.socialLinks?.map((link: { platform: string; href: string }, index: number) => (
          <div key={index} className="space-y-4 p-4 border border-border rounded bg-secondary/20 relative">
            <span className="absolute -top-3 left-4 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded">{link.platform || `Link ${index + 1}`}</span>
            <div className="mt-2">
              <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">URL</label>
              <input
                type="text"
                value={link.href || ""}
                onChange={(e) => handleSocialLinkChange(index, 'href', e.target.value)}
                className="w-full bg-secondary border border-border rounded px-4 py-2 text-foreground focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        ))}
      </section>

      <AffiliateCouponSection 
        affiliate={content.affiliate} 
        coupon={content.coupon}
        onAffiliateChange={handleAffiliateChange}
        onCouponChange={handleCouponChange}
      />

      {/* Legal Pages Section */}
      <section className="bg-card border border-border rounded-lg p-6 space-y-6">
        <h3 className="font-heading text-lg font-bold uppercase border-b border-border pb-2">Legal Pages</h3>
        
        <div className="space-y-6">
          <div>
            <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Privacy Policy</label>
            <textarea
              value={content.privacyPolicy || ""}
              onChange={(e) => handleLegalChange('privacyPolicy', e.target.value)}
              rows={10}
              className="w-full bg-secondary border border-border rounded px-4 py-2 text-foreground focus:border-primary focus:outline-none"
              placeholder="Enter Privacy Policy text here..."
            />
          </div>
          
          <div>
            <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Terms & Conditions</label>
            <textarea
              value={content.termsConditions || ""}
              onChange={(e) => handleLegalChange('termsConditions', e.target.value)}
              rows={10}
              className="w-full bg-secondary border border-border rounded px-4 py-2 text-foreground focus:border-primary focus:outline-none"
              placeholder="Enter Terms and Conditions text here..."
            />
          </div>
        </div>
      </section>
    </form>
  );
};

export default AdminContent;
