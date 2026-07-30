import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const PrivacyPolicy = () => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data: docSnap } = await supabase.from("content").select("privacy_policy").eq("id", "main").maybeSingle();
        if (docSnap) {
          setContent(docSnap.privacy_policy || "");
        }
      } catch (error) {
        console.error("Error fetching privacy policy:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground whitespace-normal">
      <SEO 
        title="Privacy Policy"
        description="Privacy Policy for GameMedo services and website."
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
              Privacy <span className="text-primary">Policy</span>
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
                  <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                  <p>
                    At GameMedo, we respect your privacy and are committed to protecting it through our compliance with this policy. 
                    This policy describes the types of information we may collect from you or that you may provide when you visit the website 
                    GameMedo.com (our "Website") and our practices for collecting, using, maintaining, protecting, and disclosing that information.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
                  <p>
                    We collect several types of information from and about users of our Website, including information:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>By which you may be personally identified, such as name, postal address, e-mail address, telephone number, or any other identifier by which you may be contacted online or offline ("personal information").</li>
                    <li>That is about you but individually does not identify you, such as your school or team affiliation.</li>
                    <li>About your internet connection, the equipment you use to access our Website, and usage details.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
                  <p>
                    We use information that we collect about you or that you provide to us, including any personal information:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>To present our Website and its contents to you.</li>
                    <li>To provide you with information, products, or services that you request from us.</li>
                    <li>To fulfill any other purpose for which you provide it.</li>
                    <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection.</li>
                    <li>To notify you about changes to our Website or any products or services we offer or provide though it.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Security</h2>
                  <p>
                    We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. 
                    All information you provide to us is stored on our secure servers behind firewalls.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">5. Contact Information</h2>
                  <p>
                    To ask questions or comment about this privacy policy and our privacy practices, contact us at: 
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

export default PrivacyPolicy;
