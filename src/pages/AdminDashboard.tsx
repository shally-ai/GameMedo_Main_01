import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Loader2, LogOut, LayoutDashboard, Calendar as CalendarIcon, ShoppingCart, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

// Tabs
import AdminBookings from "./Tabs/AdminBookings";
import AdminPurchases from "./Tabs/AdminPurchases";
import AdminContent from "./Tabs/AdminContent";
import AdminSamples from "./Tabs/AdminSamples";
import AdminHeroMedia from "./Tabs/AdminHeroMedia";
import AdminAffiliates from "./Tabs/AdminAffiliates";
import AdminGigs from "./Tabs/AdminGigs";
import { Image as ImageIcon, MonitorPlay, LogIn, Users, Briefcase } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("bookings");

  const handleLogout = async () => {
    await logout();
  };

  const playNotificationSound = () => {
    console.log("Audio notification played!");
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.frequency.setValueAtTime(1318.51, ctx.currentTime);
      osc.type = "sine";
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);

      const osc2 = ctx.createOscillator();
      const gainNode2 = ctx.createGain();
      osc2.connect(gainNode2);
      gainNode2.connect(ctx.destination);
      osc2.frequency.setValueAtTime(1760, ctx.currentTime + 0.15);
      osc2.type = "sine";
      gainNode2.gain.setValueAtTime(0, ctx.currentTime);
      gainNode2.gain.setValueAtTime(0.1, ctx.currentTime + 0.15);
      gainNode2.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.65);
      osc2.start(ctx.currentTime + 0.15);
      osc2.stop(ctx.currentTime + 0.65);
    } catch (e) {
      console.warn("Audio blocked or not supported", e);
    }
  };

  useEffect(() => {
    const channel = supabase.channel('admin-alerts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'bookings' }, payload => {
        playNotificationSound();
        toast({
          title: "New Booking Received!",
          description: `You have a new scheduled call from ${payload.new.name || 'a client'}.`,
        });
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'purchases' }, payload => {
        playNotificationSound();
        toast({
          title: "New Purchase Made!",
          description: `A package was purchased by ${payload.new.buyer_name || 'a client'} for $${payload.new.amount}.`,
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "bookings":
        return <AdminBookings />;
      case "purchases":
        return <AdminPurchases />;
      case "samples":
        return <AdminSamples />;
      case "hero":
        return <AdminHeroMedia />;
      case "affiliates":
        return <AdminAffiliates />;
      case "gigs":
        return <AdminGigs />;
      case "content":
        return <AdminContent />;
      default:
        return <AdminBookings />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card shrink-0">
        <h2 className="font-heading text-lg font-bold uppercase text-primary flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5" /> Admin
        </h2>
        <button
          onClick={handleLogout}
          className="p-2 text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-card border-r border-border shrink-0 flex-col">
        <div className="p-6 border-b border-border">
          <h2 className="font-heading text-xl font-bold uppercase text-primary flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5" /> Admin
          </h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button
            onClick={() => setActiveTab("bookings")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors font-heading text-sm tracking-wider uppercase",
              activeTab === "bookings" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <CalendarIcon className="w-4 h-4" /> Bookings
          </button>
          
          <button
            onClick={() => setActiveTab("purchases")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors font-heading text-sm tracking-wider uppercase",
              activeTab === "purchases" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <ShoppingCart className="w-4 h-4" /> Purchases
          </button>
          
          <button
            onClick={() => setActiveTab("samples")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors font-heading text-sm tracking-wider uppercase",
              activeTab === "samples" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <ImageIcon className="w-4 h-4" /> Samples
          </button>

          <button
            onClick={() => setActiveTab("hero")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors font-heading text-sm tracking-wider uppercase",
              activeTab === "hero" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <MonitorPlay className="w-4 h-4" /> Hero Media
          </button>

          <button
            onClick={() => setActiveTab("affiliates")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors font-heading text-sm tracking-wider uppercase",
              activeTab === "affiliates" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <Users className="w-4 h-4" /> Affiliates
          </button>

          <button
            onClick={() => setActiveTab("gigs")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors font-heading text-sm tracking-wider uppercase",
              activeTab === "gigs" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <Briefcase className="w-4 h-4" /> Gigs
          </button>

          <button
            onClick={() => setActiveTab("content")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors font-heading text-sm tracking-wider uppercase",
              activeTab === "content" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <FileText className="w-4 h-4" /> Content
          </button>
        </nav>

        <div className="p-4 border-t border-border mt-auto shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-500 hover:bg-red-500/10 rounded-md transition-colors font-heading text-sm tracking-wider uppercase"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-4 md:p-8 pb-24 md:pb-8 transition-all duration-300">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="max-w-7xl mx-auto"
        >
          {renderContent()}
        </motion.div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-border flex items-center justify-around p-1 pb-safe z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
        <button onClick={() => setActiveTab("bookings")} className={cn("flex flex-col items-center p-2 rounded-xl transition-all", activeTab === "bookings" ? "text-primary bg-primary/10" : "text-muted-foreground")}>
          <CalendarIcon className="w-5 h-5" />
          <span className="text-[8px] font-heading font-bold uppercase tracking-wider mt-1">Book</span>
        </button>
        <button onClick={() => setActiveTab("purchases")} className={cn("flex flex-col items-center p-2 rounded-xl transition-all", activeTab === "purchases" ? "text-primary bg-primary/10" : "text-muted-foreground")}>
          <ShoppingCart className="w-5 h-5" />
          <span className="text-[8px] font-heading font-bold uppercase tracking-wider mt-1">Orders</span>
        </button>
        <button onClick={() => setActiveTab("samples")} className={cn("flex flex-col items-center p-2 rounded-xl transition-all", activeTab === "samples" ? "text-primary bg-primary/10" : "text-muted-foreground")}>
          <ImageIcon className="w-5 h-5" />
          <span className="text-[8px] font-heading font-bold uppercase tracking-wider mt-1">Samples</span>
        </button>
        <button onClick={() => setActiveTab("hero")} className={cn("flex flex-col items-center p-2 rounded-xl transition-all", activeTab === "hero" ? "text-primary bg-primary/10" : "text-muted-foreground")}>
          <MonitorPlay className="w-5 h-5" />
          <span className="text-[8px] font-heading font-bold uppercase tracking-wider mt-1">Hero</span>
        </button>
        <button onClick={() => setActiveTab("content")} className={cn("flex flex-col items-center p-2 rounded-xl transition-all", activeTab === "content" ? "text-primary bg-primary/10" : "text-muted-foreground")}>
          <FileText className="w-5 h-5" />
          <span className="text-[8px] font-heading font-bold uppercase tracking-wider mt-1">Content</span>
        </button>
        <button onClick={() => setActiveTab("affiliates")} className={cn("flex flex-col items-center p-2 rounded-xl transition-all", activeTab === "affiliates" ? "text-primary bg-primary/10" : "text-muted-foreground")}>
          <Users className="w-5 h-5" />
          <span className="text-[8px] font-heading font-bold uppercase tracking-wider mt-1">Affil.</span>
        </button>
        <button onClick={() => setActiveTab("gigs")} className={cn("flex flex-col items-center p-2 rounded-xl transition-all", activeTab === "gigs" ? "text-primary bg-primary/10" : "text-muted-foreground")}>
          <Briefcase className="w-5 h-5" />
          <span className="text-[8px] font-heading font-bold uppercase tracking-wider mt-1">Gigs</span>
        </button>
      </nav>
    </div>
  );
};

export default AdminDashboard;
