import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import StickyBookingBar from "@/components/StickyBookingBar";

import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <div className="grain-overlay" />
      <SEO 
        title="GameMedo — Athletic Website Design, Sports Highlight Videos & VA Services"
        description="GameMedo helps high school athletic departments with highlight videos, athletic website design, website management, social media, and Virtual Assistant services for Athletic Directors."
      />
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
      <StickyBookingBar />
    </div>
  );
};

export default Index;
