import { useState } from "react";
import { X, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PayPalCheckoutButton from "./PayPalCheckoutButton";
import { supabase } from "@/integrations/supabase/client";

interface Gig {
  id: string;
  title: string;
  description: string;
  price: number;
  delivery_days: number;
  image_url: string;
  video_url?: string | null;
}

interface GigCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  gig: Gig | null;
}

const GigCheckoutModal = ({ isOpen, onClose, gig }: GigCheckoutModalProps) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [purchaseId, setPurchaseId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    teamName: "",
    requirements: ""
  });

  if (!isOpen || !gig) return null;

  const handleClose = () => {
    // Only allow manual closing if they haven't started requirements step yet,
    // or if they've finished everything.
    // If they paid but haven't submitted requirements, we still let them close,
    // but typically we want them to finish. We'll just reset on close.
    setStep(1);
    setPurchaseId(null);
    setFormData({ name: "", email: "", teamName: "", requirements: "" });
    onClose();
  };

  const handlePaymentSuccess = (id: string) => {
    setPurchaseId(id);
    setStep(2);
  };

  const handleSubmitRequirements = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!purchaseId) {
      setStep(3); // Fallback if no purchase ID for some reason
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("purchases")
        .update({
          team_name: formData.teamName,
          requirements: formData.requirements
        })
        .eq("id", purchaseId);

      if (error) {
        console.error("Failed to save requirements:", error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
      setStep(3);
    }
  };

  const gigPrice = Number(gig.price) || 0;
  // We use the basic title for payment step, and append details later in the DB
  const packageName = gig.title;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-card border border-border shadow-2xl rounded-2xl overflow-hidden z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="bg-secondary/50 px-6 py-4 border-b border-border flex justify-between items-center sticky top-0 z-20">
            <div>
              <h2 className="font-heading font-bold text-xl uppercase tracking-wide">{gig.title}</h2>
              {step === 1 && (
                <p className="text-muted-foreground text-sm font-medium">Total: <span className="text-primary">${gigPrice.toFixed(2)}</span></p>
              )}
            </div>
            <button onClick={handleClose} className="p-2 text-muted-foreground hover:text-foreground bg-background/50 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Progress indicator */}
            <div className="flex items-center justify-center mb-8">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${step === 1 ? 'bg-primary text-primary-foreground' : 'bg-primary/20 text-primary'}`}>
                {step > 1 ? <Check className="w-4 h-4" /> : "1"}
              </div>
              <div className={`w-12 h-1 mx-2 rounded-full ${step > 1 ? 'bg-primary/50' : 'bg-secondary'}`} />
              <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${step === 2 ? 'bg-primary text-primary-foreground' : step > 2 ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                {step > 2 ? <Check className="w-4 h-4" /> : "2"}
              </div>
              <div className={`w-12 h-1 mx-2 rounded-full ${step > 2 ? 'bg-primary/50' : 'bg-secondary'}`} />
              <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${step === 3 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                3
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-6">
                <div className="bg-secondary/30 border border-border rounded-lg p-4 space-y-2">
                  <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-3">Checkout Details</h3>
                  
                  <div className="space-y-4 pt-2">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Your Name</label>
                      <input 
                        required 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                        className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-primary transition-colors" 
                        placeholder="John Doe" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Your Email</label>
                      <input 
                        required 
                        type="email" 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                        className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-primary transition-colors" 
                        placeholder="john@example.com" 
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  {/* We only render PayPal if name/email are filled, to ensure we capture them. Alternatively, we can let PayPal Buttons render but disable clicking until filled. */}
                  {!formData.name || !formData.email ? (
                    <div className="text-center p-4 border border-dashed border-border rounded-lg bg-secondary/20">
                      <p className="text-sm text-muted-foreground">Please enter your name and email above to unlock checkout.</p>
                    </div>
                  ) : (
                    <PayPalCheckoutButton 
                      amount={`$${gigPrice.toFixed(2)}`} 
                      packageName={packageName} 
                      buyerName={formData.name}
                      buyerEmail={formData.email}
                      onSuccess={handlePaymentSuccess}
                    />
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmitRequirements} className="space-y-4">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-xl">Payment Successful!</h3>
                  <p className="text-sm text-muted-foreground">Now, tell us exactly what you need for this project.</p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Team / School Name</label>
                  <input required value={formData.teamName} onChange={e => setFormData({...formData, teamName: e.target.value})} className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-primary transition-colors" placeholder="e.g. Eagles Varsity Football" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Project Details / Instructions</label>
                  <textarea required value={formData.requirements} onChange={e => setFormData({...formData, requirements: e.target.value})} className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors min-h-[120px] resize-none" placeholder="What specific text, colors, or style do you want? Include any links to assets if you have them." />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-lg font-bold uppercase tracking-widest hover:brightness-110 transition-all mt-6 shadow-[0_0_15px_rgba(255,107,0,0.3)] disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Requirements"}
                </button>
              </form>
            )}

            {step === 3 && (
              <div className="text-center py-8 space-y-6">
                <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/50">
                  <Check className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-3xl mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">Your order and project requirements have been received. Our team will review the details and reach out to your email shortly.</p>
                </div>
                <button 
                  onClick={handleClose}
                  className="bg-secondary text-foreground py-3 px-8 rounded-lg font-bold uppercase tracking-widest hover:bg-secondary/80 transition-all inline-block"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default GigCheckoutModal;
