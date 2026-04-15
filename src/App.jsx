import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "./store/ThemeContext.jsx";
import { ClientProvider } from "./store/ClientContext.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";
import { useScrollToTopOnRouteChange } from "./hooks/useScrollToTopOnRouteChange";
import AOSRefresher from "./components/AOSRefresher";
import ScrollToHash from "./components/ScrollToHash";
import Loader from "./components/Loader.jsx";
import Home from "./pages/Home/Home";
import { ToastContainer } from "./components/ui/Toast";
import AIAssistButton from "./components/AIAssistButton";
import { IntroProvider } from "./store/IntroContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import CreativeDetails from "./pages/workDetails/creative/CreativeDetails.jsx";

// Lazy load components
const NewsletterPopup = lazy(() => import("./components/NewsletterPopup"));
const CaseDetails = lazy(() => import("./pages/showcase/CaseDetails.jsx"));
const Work = lazy(() => import("./pages/Work/Work"));
const AboutUs = lazy(() => import("./pages/about/AboutUs"));
const Services = lazy(() => import("./pages/services/Services.jsx"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const Blogs = lazy(() => import("./pages/news/Blogs"));
const NewsDetails = lazy(() => import("./pages/newsDetails/NewsDetails.jsx"));
const Top10InfluencerMarketingAgenciesinDubai2026G = lazy(() =>
  import("./pages/newsDetails/Top10InfluencerMarketingAgenciesinDubai_2026G.jsx")
);
const Influencer = lazy(() =>
  import("./pages/influencer/Influencer.jsx").then((module) => ({
    default: module.Influencer,
  }))
);
const InfluencersRegister = lazy(() =>
  import("./pages/influencers-register/InfluencersRegister")
);

// Service Sections - Influencer Marketing Hub & Sub-pages
const InfluencerMarketing = lazy(() =>
  import("./pages/services-sections/influencers-marketing/InfluencerMarketing")
);
const CampaignManagement = lazy(() =>
  import("./pages/services-sections/influencers-marketing/CampaignManagement")
);
const LuxuryInfluencerMarketing = lazy(() =>
  import("./pages/services-sections/influencers-marketing/LuxuryInfluencerMarketing")
);
const MicroInfluencerMarketing = lazy(() =>
  import("./pages/services-sections/influencers-marketing/MicroInfluencerMarketing")
);
const ROIAnalytics = lazy(() =>
  import("./pages/services-sections/influencers-marketing/ROIAnalytics")
);
const InstagramInfluencerMarketing = lazy(() =>
  import("./pages/services-sections/influencers-marketing/InstagramInfluencerMarketing")
);
const TiktokInfluencerMarketing = lazy(() =>
  import("./pages/services-sections/influencers-marketing/TiktokInfluencerMarketing")
);
const InfluencerMarketingCost = lazy(() =>
  import("./pages/services-sections/influencers-marketing/InfluencerMarketingCost")
);
const SocialMediaManagement = lazy(() =>
  import("./pages/services-sections/SocialMediaManagement")
);
const Production = lazy(() =>
  import("./pages/services-sections/Production")
);
const Branding = lazy(() =>
  import("./pages/services-sections/branding/Branding")
);
const WebDevelopment = lazy(() =>
  import("./pages/services-sections/webDevelopment/WebDevelopment")
);

// Service Sections - Digital Marketing Hub & Sub-pages
const DigitalMarketing = lazy(() =>
  import("./pages/services-sections/digital-marketing/DigitalMarketing")
);
const SEOServices = lazy(() =>
  import("./pages/services-sections/digital-marketing/SEOServices")
);
const PaidAdsManagement = lazy(() =>
  import("./pages/services-sections/digital-marketing/PaidAdsManagement")
);
const ConversionOptimization = lazy(() =>
  import("./pages/services-sections/digital-marketing/ConversionOptimization")
);

const InfluenceDetails = lazy(() =>
  import("./pages/workDetails/influenceDetails.jsx").then((module) => ({
    default: module.default,
  }))
);
const SocialDetails = lazy(() =>
  import("./pages/workDetails/SocialDetails.jsx").then((module) => ({
    default: module.default,
  }))
);
const EventDetails = lazy(() =>
  import("./pages/workDetails/EventDetails.jsx").then((module) => ({
    default: module.default,
  }))
);

// AI-Targeted Landing Pages
const InfluencerMarketingDubai = lazy(() =>
  import("./pages/landing/InfluencerMarketingDubai.jsx")
);
const InfluencerMarketingSaudiArabia = lazy(() =>
  import("./pages/landing/InfluencerMarketingSaudiArabia.jsx")
);

// Legal Pages
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.jsx"));
const TermsOfService = lazy(() => import("./pages/TermsOfService.jsx"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe.jsx"));
const FAQ = lazy(() => import("./pages/faq/FAQ.jsx"));
// 404 Page
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
// Loading component
const LoadingSpinner = () => <Loader />;

const Layout = () => {
  useScrollToTopOnRouteChange();
  return (
    <>
      <ScrollToHash />
    <AOSRefresher />
    <div className="relative w-full min-h-full">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
    <Footer />
  </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ClientProvider>
        <IntroProvider>
        <ToastContainer />
        <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/work/:workSlug?" element={<Work />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:slug" element={<NewsDetails />} />
              <Route
                path="/blogs/top-10-influencer-marketing-agencies-in-dubai-2026-guide"
                element={<Top10InfluencerMarketingAgenciesinDubai2026G />}
              />
            <Route path="/contact-us/:contact?" element={<Contact />} />
              <Route path="/influencer" element={<Influencer />} />
              <Route
                path="/influencer-register"
                element={<InfluencersRegister />}
              />
              <Route path="/showcase/:slug" element={<CaseDetails />} />
              <Route
                path="/work/influence/:slug"
                element={<InfluenceDetails />}
              />
              <Route path="/work/social/:slug" element={<SocialDetails />} />
              <Route path="/work/creative/:slug" element={<CreativeDetails />} />
              <Route path="/work/event/:slug" element={<EventDetails />} />
              {/* Service Sections - Influencer Marketing Hub & Sub-pages */}
              <Route path="/influencer-marketing-agency-dubai" element={<InfluencerMarketing />} />
              <Route path="/influencer-marketing-agency-dubai/campaign-management-dubai" element={<CampaignManagement />} />
              <Route path="/influencer-marketing-agency-dubai/micro-influencer-marketing-dubai" element={<MicroInfluencerMarketing />} />
              <Route path="/influencer-marketing-agency-dubai/luxury-influencer-marketing" element={<LuxuryInfluencerMarketing />} />
              <Route path="/influencer-marketing-agency-dubai/roi-analytics" element={<ROIAnalytics />} />
              <Route path="/influencer-marketing-agency-dubai/instagram-influencer-marketing" element={<InstagramInfluencerMarketing />} />
              <Route path="/influencer-marketing-agency-dubai/tiktok-influencer-marketing" element={<TiktokInfluencerMarketing />} />
              <Route path="/influencer-marketing-agency-dubai/influencer-marketing-cost-uae" element={<InfluencerMarketingCost />} />
              <Route path="/social-media-management" element={<SocialMediaManagement />} />
              <Route path="/production" element={<Production />} />
              <Route path="/branding-agency-dubai" element={<Branding />} />
              <Route path="/web-development-dubai" element={<WebDevelopment />} />
              {/* Service Sections - Digital Marketing Hub & Sub-pages */}
              <Route path="/digital-marketing-agency-dubai" element={<DigitalMarketing />} />
              <Route path="/digital-marketing-agency-dubai/seo-services" element={<SEOServices />} />
              <Route path="/digital-marketing-agency-dubai/paid-ads-management" element={<PaidAdsManagement />} />
              <Route path="/digital-marketing-agency-dubai/conversion-optimization" element={<ConversionOptimization />} />
              {/* AI-Targeted Landing Pages */}
              <Route path="/influencer-marketing-dubai" element={<InfluencerMarketingDubai />} />
              <Route path="/influencer-marketing-saudi-arabia" element={<InfluencerMarketingSaudiArabia />} />
              {/* Legal Pages */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/unsubscribe/:token" element={<Unsubscribe />} />
              <Route path="/faq" element={<FAQ />} />
              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
        </ErrorBoundary>
        <Suspense fallback={null}>
          <NewsletterPopup />
        </Suspense>
        <AIAssistButton />
        </IntroProvider>
      </ClientProvider>
    </ThemeProvider>
  );
}

export default App;
