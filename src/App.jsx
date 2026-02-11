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

// Lazy load components
const NewsletterPopup = lazy(() => import("./components/NewsletterPopup"));
const CaseDetails = lazy(() => import("./pages/showcase/CaseDetails.jsx"));
const Work = lazy(() => import("./pages/Work/Work"));
const AboutUs = lazy(() => import("./pages/about/AboutUs"));
const Services = lazy(() => import("./pages/services/Services.jsx"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const News = lazy(() => import("./pages/news/News"));
const NewsDetails = lazy(() => import("./pages/newsDetails/NewsDetails.jsx"));
const Influencer = lazy(() =>
  import("./pages/influencer/Influencer.jsx").then((module) => ({
    default: module.Influencer,
  }))
);
const InfluencersRegister = lazy(() =>
  import("./pages/influencers-register/InfluencersRegister")
);

// Service Sections
const InfluencerMarketing = lazy(() =>
  import("./pages/services-sections/InfluencerMarketing")
);
const SocialMediaManagement = lazy(() =>
  import("./pages/services-sections/SocialMediaManagement")
);
const Production = lazy(() =>
  import("./pages/services-sections/Production")
);
const Branding = lazy(() =>
  import("./pages/services-sections/Branding")
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
const CreativeDetails = lazy(() =>
  import("./pages/workDetails/creative/CreativeDetails.jsx").then((module) => ({
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
const Careers = lazy(() => import("./pages/career/Careers.jsx"));
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
  </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ClientProvider>
        <ToastContainer />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/work/:workId?" element={<Work />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blogs" element={<News />} />
              <Route path="/blogs/:id" element={<NewsDetails />} />
            <Route path="/contact-us/:contact?" element={<Contact />} />
              <Route path="/influencer" element={<Influencer />} />
              <Route
                path="/influencer-register"
                element={<InfluencersRegister />}
              />
              <Route path="/showcase/:id" element={<CaseDetails />} />
              <Route
                path="/work/influence/:id"
                element={<InfluenceDetails />}
              />
              <Route path="/work/social/:id" element={<SocialDetails />} />
              <Route path="/work/creative/:id" element={<CreativeDetails />} />
              <Route path="/work/event/:id" element={<EventDetails />} />
              {/* Service Sections */}
              <Route path="/services/influencer-marketing" element={<InfluencerMarketing />} />
              <Route path="/services/social-media-management" element={<SocialMediaManagement />} />
              <Route path="/services/production" element={<Production />} />
              <Route path="/services/branding" element={<Branding />} />
              {/* AI-Targeted Landing Pages */}
              <Route path="/influencer-marketing-dubai" element={<InfluencerMarketingDubai />} />
              <Route path="/influencer-marketing-saudi-arabia" element={<InfluencerMarketingSaudiArabia />} />
              {/* Legal Pages */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/unsubscribe/:token" element={<Unsubscribe />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/careers" element={<Careers />} />
              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
        <Suspense fallback={null}>
          <NewsletterPopup />
        </Suspense>
      </ClientProvider>
    </ThemeProvider>
  );
}

export default App;
