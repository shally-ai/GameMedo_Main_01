import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { BookingModal } from "@/components/BookingModal";
import { trackConversion } from "@/lib/trackConversion";

// Page Sections
import { HeroAD } from "@/components/ad-landing/HeroAD";
import { ServicesAD } from "@/components/ad-landing/ServicesAD";
import { OnePlaceAD } from "@/components/ad-landing/OnePlaceAD";
import { ComparisonAD } from "@/components/ad-landing/ComparisonAD";
import { PortfolioAD } from "@/components/ad-landing/PortfolioAD";
import { TestimonialsAD } from "@/components/ad-landing/TestimonialsAD";
import { PricingAD } from "@/components/ad-landing/PricingAD";
import { QuoteFormAD } from "@/components/ad-landing/QuoteFormAD";
import { WorkWithUsAD } from "@/components/ad-landing/WorkWithUsAD";

const ADLandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    trackConversion("ad_lp_cta_click");
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <div className="grain-overlay" />
      <SEO
        title="GameMedo | Creative & Admin Support for Athletic Directors"
        description="GameMedo helps Athletic Directors save time by handling sports highlight videos, graphic design, athletic websites, social media content, and virtual assistant admin tasks. Serving high school and college athletic departments across the US."
        keywords="athletic director services, sports highlight video, high school athletic website, sports graphic design, athletic department virtual assistant, roster intro video, sports social media"
      />

      <Navbar />

      <main>
        {/* 1. Hero — Hook + Dual CTA */}
        <HeroAD openModal={openModal} />

        {/* 2. Services — What we do */}
        <ServicesAD />

        {/* 3. One Place — Value consolidation pitch */}
        <OnePlaceAD />

        {/* 4. Comparison — Overcome objections */}
        <ComparisonAD />

        {/* 5. Portfolio — Show proof of work */}
        <PortfolioAD />

        {/* 6. Testimonials — Social proof from ADs */}
        <TestimonialsAD />

        {/* 7. Pricing — Set expectations, reduce friction */}
        <PricingAD openModal={openModal} />

        {/* 8. Quote Form — Low-commitment CTA */}
        <QuoteFormAD />

        {/* 9. Final CTA / Hire Us */}
        <WorkWithUsAD openModal={openModal} />
      </main>

      <Footer />

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ADLandingPage;
