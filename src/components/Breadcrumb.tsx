import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://gamemedo.com"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": item.href 
          ? `https://gamemedo.com${item.href}` 
          : undefined
      }))
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify(schemaData) 
        }}
      />
      <nav 
        aria-label="Breadcrumb" 
        className="flex items-center gap-1.5 text-sm 
          text-muted-foreground py-3 px-4 
          max-w-6xl mx-auto"
      >
        <Link 
          to="/" 
          className="flex items-center gap-1 
            hover:text-primary transition-colors"
        >
          <Home size={14} />
          <span>Home</span>
        </Link>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <ChevronRight size={14} 
              className="text-muted-foreground/50" />
            {item.href ? (
              <Link
                to={item.href}
                className="hover:text-primary 
                  transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium">
                {item.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </>
  );
};

export default Breadcrumb;
