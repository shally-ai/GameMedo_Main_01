import React from "react";
import { CheckCircle } from "lucide-react";

const TrustBar: React.FC = () => {
  const trustItems = [
    "50+ Athletic Programs Served",
    "5-Star Rated Service",
    "FERPA-Compliant",
    "24-48hr Turnaround",
    "U.S.-Based Support"
  ];

  return (
    <div className="w-full bg-secondary/50 border-y border-border py-4 px-4 overflow-x-auto scrollbar-none">
      <div className="container mx-auto max-w-6xl flex flex-nowrap md:flex-wrap items-center justify-between gap-6 md:gap-4 min-w-max md:min-w-0">
        {trustItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-white">
            <CheckCircle className="w-4 h-4 text-primary fill-primary/10 flex-shrink-0" />
            <span className="font-heading text-xs uppercase tracking-wider font-semibold whitespace-nowrap">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBar;
