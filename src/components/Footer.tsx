import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";
import { Instagram, Youtube, Facebook } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.78 1.54V6.84a4.84 4.84 0 0 1-1.02-.15Z"/>
  </svg>
);

type SocialIconComponent = React.FC<{ className?: string }>;

const socialLinks = [
  { platform: "Instagram", href: "https://instagram.com/gamemedo" },
  { platform: "Facebook", href: "https://facebook.com/gamemedo" },
  { platform: "YouTube", href: "https://youtube.com/@gamemedo" },
];

const iconMap: Record<string, SocialIconComponent> = {
  "Instagram": Instagram,
  "TikTok": TikTokIcon,
  "YouTube": Youtube,
  "Facebook": Facebook,
};

const Footer = () => {
  const [linksData, setLinksData] = useState(socialLinks);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data: docSnap } = await supabase.from("content").select("social_links").eq("id", "main").maybeSingle();
        if (docSnap?.social_links) {
          setLinksData(docSnap.social_links);
        }
      } catch (error) {
        console.error("Error fetching social link content:", error);
      }
    };
    fetchContent();
  }, []);

  return (
    <footer className="bg-background border-t border-border py-10 px-4">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="GameMedo" className="h-8 w-8 rounded-full" />
          <span className="font-heading text-lg font-bold tracking-wider text-foreground">
            GAME<span className="text-primary">MEDO</span>
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-4 md:mt-0 max-w-2xl">
          {[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Highlight Videos", href: "/services/sports-highlight-videos" },
            { label: "Website Design", href: "/services/athletic-website-design" },
            { label: "VA Services", href: "/services/virtual-assistant-athletic-directors" },
            { label: "Blog", href: "/blog" },
            { label: "Who We Serve", href: "/who-we-serve" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
            { label: "Affiliate", href: "/affiliate" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms & Conditions", href: "/terms" },
          ].map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-muted-foreground text-xs md:text-sm hover:text-primary transition-colors whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {linksData.map(({ platform, href }) => {
            const Icon = iconMap[platform] || Instagram; // Fallback to Instagram icon if unknown
            return (
              <a
                key={platform}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={platform}
                className="text-muted-foreground hover:text-primary transition-colors"
                title={platform}
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>

        <p className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} GameMedo. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
