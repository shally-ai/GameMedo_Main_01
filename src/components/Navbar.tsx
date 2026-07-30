import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";
import { BookingModal } from "./BookingModal";

const servicesDropdownLinks = [
  { label: "Sports Highlight Videos", href: "/services/sports-highlight-videos", aria: "View sports highlight and hype video services" },
  { label: "Athletic Website Design", href: "/services/athletic-website-design", aria: "View athletic website design services" },
  { label: "Website Management", href: "/services/athletic-website-management", aria: "View athletic website management services" },
  { label: "Social Media Management", href: "/services/social-media-management", aria: "View social media management services" },
  { label: "Virtual Assistant for ADs", href: "/services/virtual-assistant-athletic-directors", aria: "View virtual assistant services for athletic directors" },
  { label: "View All Services", href: "/services", aria: "View all GameMedo services" },
];

const topNavLinks = [
  { label: "Home", href: "/", aria: "Go to home page" },
  { label: "Who We Serve", href: "/who-we-serve", aria: "Learn about the programs and schools we serve" },
  { label: "Portfolio", href: "/samples", aria: "View our portfolio of sports designs and videos" },
  { label: "Blog", href: "/blog", aria: "Read our sports marketing blog" },
  { label: "About", href: "/about", aria: "Learn more about the GameMedo team" },
  { label: "Contact", href: "/contact", aria: "Get in touch with us" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileAccordionOpen, setMobileAccordionOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      >
        <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4 max-w-6xl">
          <Link to="/" className="flex items-center gap-3" aria-label="Go to home page">
            <img src={logo} alt="GameMedo" className="h-10 w-10 rounded-full" />
            <span className="font-heading text-2xl font-bold tracking-wider text-foreground">
              GAME<span className="text-primary">MEDO</span>
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="font-heading text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors" 
              aria-label="Go to home page"
            >
              Home
            </Link>
            
            {/* Services Dropdown */}
            <div 
              className="relative group py-2"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1.5 font-heading text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                aria-label="View GameMedo services"
              >
                Services <ChevronDown size={14} className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180 text-primary' : ''}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 w-64 bg-card border border-border/80 rounded-xl shadow-2xl p-2 z-50"
                  >
                    {servicesDropdownLinks.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={`block px-4 py-2.5 rounded-lg text-xs font-heading uppercase tracking-wider text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 ${
                          item.label === "View All Services" ? "text-primary border-t border-border/30 mt-1.5 pt-3 font-bold" : ""
                        }`}
                        aria-label={item.aria}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {topNavLinks.filter(link => link.label !== "Home").map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="font-heading text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
                aria-label={link.aria}
              >
                {link.label}
              </Link>
            ))}
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="relative bg-primary text-primary-foreground font-heading text-sm tracking-widest uppercase px-6 py-2.5 rounded hover:brightness-110 transition group overflow-hidden"
              aria-label="Book a call or get started with GameMedo"
            >
              <span className="relative z-10">Get Started</span>
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0, 0.3]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-white"
              />
            </button>
          </div>

          {/* Mobile toggle */}
          <button 
            className="md:hidden text-foreground" 
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close mobile menu" : "Open mobile menu"}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-background border-b border-border px-4 pb-6 max-h-[85vh] overflow-y-auto"
          >
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="block py-3 font-heading text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
              aria-label="Go to home page"
            >
              Home
            </Link>

            {/* Mobile Services Accordion */}
            <div className="border-b border-white/5 py-2">
              <button
                onClick={() => setMobileAccordionOpen(!mobileAccordionOpen)}
                className="w-full flex items-center justify-between py-2 font-heading text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
                aria-expanded={mobileAccordionOpen}
                aria-label="Toggle services menu"
              >
                <span>Services</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${mobileAccordionOpen ? 'rotate-180 text-primary' : ''}`} />
              </button>
              
              <AnimatePresence>
                {mobileAccordionOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-primary/5 rounded-lg mt-1 px-2"
                  >
                    {servicesDropdownLinks.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setOpen(false)}
                        className="block py-2.5 px-3 text-xs font-heading uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
                        aria-label={item.aria}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {topNavLinks.filter(link => link.label !== "Home").map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-heading text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
                aria-label={link.aria}
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={() => {
                setOpen(false);
                setIsModalOpen(true);
              }}
              className="w-full mt-4 bg-primary text-primary-foreground font-heading text-sm tracking-widest uppercase px-6 py-2.5 rounded text-center"
              aria-label="Book a call or get started with GameMedo"
            >
              Get Started
            </button>
          </motion.div>
        )}
      </motion.nav>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;
