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
        title="GameMedo | High School & Varsity Sports Graphic Design & Video Editing"
        description="GameMedo helps middle schools, high schools, and varsity athletic departments across the U.S. with sports highlight videos, athletic website design, social media management, and virtual assistant services for Athletic Directors."
        keywords="high school sports graphics, varsity highlight videos, athletic website design, sports video production, athletic department services, GameMedo"
        url="https://gamemedo.com/"
        canonical="https://gamemedo.com/"
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
