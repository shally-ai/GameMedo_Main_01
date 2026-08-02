import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  canonical?: string;
  type?: string;
  noIndex?: boolean; // For landing pages we don't want indexed
  jsonLd?: object | null;
}

export const SEO: React.FC<SEOProps> = ({
  title = "High School & Varsity Sports Graphic Design & Video Editing",
  description = "GameMedo provides sports highlight videos, athletic website design, social media management, website management, and virtual assistant services for middle school, high school, and varsity athletic departments across the United States.",
  keywords = "high school sports graphics, varsity highlights, sports design services, game day posters, recruit highlight reels, athletic branding, sports social media design, GameMedo",
  image = "https://gamemedo.com/assets/hero-bg.jpg",
  url,
  canonical,
  type = "website",
  noIndex = false,
  jsonLd = null,
}) => {
  const siteTitle = "GameMedo";
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;
  const canonicalUrl = canonical || url || (typeof window !== 'undefined' ? window.location.href : 'https://gamemedo.com');

  // JSON-LD structured data — helps Google understand what the business offers
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://gamemedo.com/#business",
        "name": "GameMedo",
        "url": "https://gamemedo.com",
        "logo": "https://gamemedo.com/assets/logo.jpg",
        "image": image,
        "description": description,
        "telephone": "+1-800-GAMEMEDO",
        "email": "support@gamemedo.com",
        "priceRange": "$199 - $399/mo",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "US"
        },
        "sameAs": [
          "https://instagram.com/gamemedo",
          "https://facebook.com/gamemedo",
          "https://youtube.com/@gamemedo"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "reviewCount": "50"
        }
      },
      {
        "@type": "Service",
        "@id": "https://gamemedo.com/#service-videos",
        "name": "Sports Intro Videos",
        "provider": { "@id": "https://gamemedo.com/#business" },
        "description": "Cinematic, high-energy intro videos for jumbotrons, team reveals, and social media. Pro-level editing and custom sound design.",
        "serviceType": "Sports Video Production",
        "offers": {
          "@type": "Offer",
          "price": "199",
          "priceCurrency": "USD",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "199",
            "priceCurrency": "USD",
            "unitText": "monthly"
          }
        }
      },
      {
        "@type": "Service",
        "@id": "https://gamemedo.com/#service-graphics",
        "name": "Social Media Graphics",
        "provider": { "@id": "https://gamemedo.com/#business" },
        "description": "Full-scale graphic support for your entire season. Game-day posters, commitment reveals, and consistent high-impact social designs.",
        "serviceType": "Sports Graphic Design"
      },
      {
        "@type": "Service",
        "@id": "https://gamemedo.com/#service-websites",
        "name": "Athletic Websites",
        "provider": { "@id": "https://gamemedo.com/#business" },
        "description": "Next-generation web platforms built for elite programs with dynamic rosters, real-time schedules, and recruitment-ready interfaces.",
        "serviceType": "Athletic Website Design"
      },
      {
        "@type": "Service",
        "@id": "https://gamemedo.com/#service-highlights",
        "name": "Recruiting Highlight Reels",
        "provider": { "@id": "https://gamemedo.com/#business" },
        "description": "Specialized highlight reels for athletes looking to play at the next level. Professional presentation to get noticed by college coaches.",
        "serviceType": "Sports Recruiting Video"
      },
      {
        "@type": "Service",
        "@id": "https://gamemedo.com/#service-va",
        "name": "Virtual Assistant for Athletic Directors",
        "provider": { "@id": "https://gamemedo.com/#business" },
        "description": "Dedicated virtual assistant services for high school Athletic Directors. Includes scheduling, booster club management, FERPA-compliant document handling, and administrative support.",
        "serviceType": "Virtual Assistant Services",
        "offers": {
          "@type": "Offer",
          "price": "299",
          "priceCurrency": "USD",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "299",
            "priceCurrency": "USD",
            "unitText": "monthly"
          }
        }
      },
      {
        "@type": "Service",
        "@id": "https://gamemedo.com/#service-social",
        "name": "Social Media Management for Athletic Departments",
        "provider": { "@id": "https://gamemedo.com/#business" },
        "description": "Full social media management for high school athletic departments including content creation, posting schedules, Instagram and Facebook management, and fan engagement.",
        "serviceType": "Social Media Management"
      }
    ]
  };

  return (
    <Helmet>
      {/* Standard metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      {!noIndex && <meta name="robots" content="index, follow" />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      {!noIndex && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd || orgJsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
