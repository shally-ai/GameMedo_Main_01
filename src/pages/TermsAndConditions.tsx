import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const TermsAndConditions = () => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data: docSnap } = await supabase.from("content").select("terms_conditions").eq("id", "main").maybeSingle();
        if (docSnap) {
          setContent(docSnap.terms_conditions || "");
        }
      } catch (error) {
        console.error("Error fetching terms and conditions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground whitespace-normal">
      <SEO 
        title="Terms & Conditions | GameMedo"
        description="Terms and Conditions for GameMedo services and website."
        url="https://gamemedo.com/terms"
        canonical="https://gamemedo.com/terms"
      />
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8 text-foreground">
              Terms & <span className="text-primary">Conditions</span>
            </h1>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : content ? (
              <div className="prose prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
                {content}
              </div>
            ) : (
              <div className="prose prose-sm md:prose-base prose-invert max-w-none space-y-8 text-muted-foreground">
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
                  <p>
                    By accessing and using this Website, you accept and agree to be bound by the terms and provision of this agreement. 
                    In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services. 
                    Any participation in this service will constitute acceptance of this agreement.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">2. Use of Service</h2>
                  <p>
                    You agree to use our services only for lawful purposes. 
                    You are prohibited from:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Harassing, threatening, or defrauding any individual or entity.</li>
                    <li>Using the service for any purpose that is prohibited by these Terms or by applicable law.</li>
                    <li>Interfering with or disrupting the service or servers or networks connected to the service.</li>
                    <li>Reproducing, copying, selling, or distributing any part of the service for commercial purposes without written consent.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">3. Intellectual Property</h2>
                  <p>
                    The Website and its original content, features, and functionality are owned by GameMedo and are protected by international copyright, 
                    trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                    Any use of our branding, logos, or designs without prior written permission is strictly prohibited.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">4. Limitation of Liability</h2>
                  <p>
                    In no event shall GameMedo, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, 
                    incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
                    or other intangible losses, resulting from:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Your access to or use of or inability to access or use the service.</li>
                    <li>Any conduct or content of any third party on the service.</li>
                    <li>Any content obtained from the service.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">5. Termination</h2>
                  <p>
                    We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, 
                    under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">6. Changes to Terms</h2>
                  <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                    If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. 
                    What constitutes a material change will be determined at our sole discretion.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">7. Governing Law</h2>
                  <p>
                    These Terms shall be governed and construed in accordance with the laws of our jurisdiction, 
                    without regard to its conflict of law provisions.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">8. Contact Us</h2>
                  <p>
                    If you have any questions about these Terms, please contact us at: 
                    <a href="mailto:support@gamemedo.com" className="text-primary hover:underline ml-1">support@gamemedo.com</a>.
                  </p>
                </section>

                <p className="text-sm italic mt-12">
                  Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
