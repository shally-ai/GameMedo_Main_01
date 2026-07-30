import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.jpg";
import { BookingModal } from "./BookingModal";

const navLinks = ["Home", "Order Gigs", "Samples", "About", "Contact"];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      >
        <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
          <a href="/" className="flex items-center gap-3">
            <img src={logo} alt="GameMedo" className="h-10 w-10 rounded-full" />
            <span className="font-heading text-2xl font-bold tracking-wider text-foreground">
              GAME<span className="text-primary">MEDO</span>
            </span>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={link === "Home" ? "/" : link === "Order Gigs" ? "/order" : link === "Samples" ? "/samples" : link === "About" ? "/about" : link === "Contact" ? "/contact" : `/#${link.toLowerCase()}`}
                className="font-heading text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
              >
                {link}
              </a>
            ))}
            <button
              onClick={() => setIsModalOpen(true)}
              className="relative bg-primary text-primary-foreground font-heading text-sm tracking-widest uppercase px-6 py-2.5 rounded hover:brightness-110 transition group overflow-hidden"
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
          <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-background border-b border-border px-4 pb-6"
          >
            {navLinks.map((link) => (
              <a
                key={link}
                href={link === "Home" ? "/" : link === "Order Gigs" ? "/order" : link === "Samples" ? "/samples" : link === "About" ? "/about" : link === "Contact" ? "/contact" : `/#${link.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="block py-3 font-heading text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
              >
                {link}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                setIsModalOpen(true);
              }}
              className="w-full mt-2 bg-primary text-primary-foreground font-heading text-sm tracking-widest uppercase px-6 py-2.5 rounded text-center"
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
