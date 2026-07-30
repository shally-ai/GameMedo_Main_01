import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// Lazy load pages for performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Samples = lazy(() => import("./pages/Samples"));
const AffiliateLanding = lazy(() => import("./pages/AffiliateLanding"));
const AffiliateDashboard = lazy(() => import("./pages/AffiliateDashboard"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const OrderGigs = lazy(() => import("./pages/OrderGigs"));
const ADLandingPage = lazy(() => import("./pages/ADLandingPage"));
const SportsHighlightVideos = lazy(() => import("./pages/SportsHighlightVideos"));
const AthleticWebsiteDesign = lazy(() => import("./pages/AthleticWebsiteDesign"));
const AthleticWebsiteManagement = lazy(() => import("./pages/AthleticWebsiteManagement"));
const SocialMediaManagement = lazy(() => import("./pages/SocialMediaManagement"));
const VirtualAssistantAD = lazy(() => import("./pages/VirtualAssistantAD"));
const WhoWeServe = lazy(() => import("./pages/WhoWeServe"));

import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import GoogleAnalytics from "./components/GoogleAnalytics";

const AdminLogin = lazy(() => import("./pages/AdminLogin"));

const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

const queryClient = new QueryClient();

const paypalOptions = {
  clientId: "test", // Replace with your actual PayPal client ID
  currency: "USD",
  intent: "capture"
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PayPalScriptProvider options={paypalOptions}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <GoogleAnalytics />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/samples" element={<Samples />} />
                <Route path="/affiliate" element={<AffiliateLanding />} />
                <Route path="/affiliate/dashboard" element={<AffiliateDashboard />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/lp" element={<LandingPage />} />
                <Route path="/hire-us" element={<ADLandingPage />} />
                <Route path="/services/sports-highlight-videos" element={<SportsHighlightVideos />} />
                <Route path="/services/athletic-website-design" element={<AthleticWebsiteDesign />} />
                <Route path="/services/athletic-website-management" element={<AthleticWebsiteManagement />} />
                <Route path="/services/social-media-management" element={<SocialMediaManagement />} />
                <Route path="/services/virtual-assistant-athletic-directors" element={<VirtualAssistantAD />} />
                <Route path="/who-we-serve" element={<WhoWeServe />} />
                <Route path="/order" element={<OrderGigs />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </PayPalScriptProvider>
  </QueryClientProvider>
);

export default App;
