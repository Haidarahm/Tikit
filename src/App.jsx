import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "./store/ThemeContext.jsx";
import { ClientProvider } from "./store/ClientContext.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import AOSRefresher from "./components/AOSRefresher";
import ScrollToHash from "./components/ScrollToHash";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import LogoIntro from "./components/LogoIntro";
import Loader from "./components/Loader.jsx";
import { Influencer } from "./pages/influencer/Influencer.jsx";
import NewsletterPopup from "./components/NewsletterPopup";

import { ToastContainer } from "./components/ui/Toast";

// Lazy load components
const Home = lazy(() => import("./pages/Home/Home"));
const ServiceDetails = lazy(() =>
  import("./pages/service-details/ServiceDetails")
);
const Work = lazy(() => import("./pages/Work/Work"));
const AboutUs = lazy(() => import("./pages/about/AboutUs"));
const Services = lazy(() => import("./pages/services/Services"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const News = lazy(() => import("./pages/news/News"));

const InfluenceDetails = lazy(() =>
  import("./pages/workDetails/influenceDetails.jsx").then((module) => ({
    default: module.default,
  }))
);
const SocialDetails = lazy(() =>
  import("./pages/workDetails/socialDetails.jsx").then((module) => ({
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
// Loading component
const LoadingSpinner = () => <Loader />;

const Layout = () => (
  <>
    <ScrollToTop />
    <ScrollToHash />
    <AOSRefresher />
    <div className="relative w-full min-h-full">
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  </>
);

function App() {
  useEffect(() => {
    // Initialize AOS only once globally
    if (!window.aosInitialized && window.AOS) {
      AOS.init({
        duration: 800,
        easing: "ease-out-quart",
        once: false, // Allow animations to replay on scroll
        offset: 100,
        delay: 0,
      });
      window.aosInitialized = true;
    }
  }, []);
  return (
    <ThemeProvider>
      <ClientProvider>
        <ToastContainer />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<LogoIntro />} />
            <Route element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/work/:workId?" element={<Work />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/services" element={<Services />} />
              <Route path="/news" element={<News />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/influencer" element={<Influencer />} />
              <Route path="/service-details/:id" element={<ServiceDetails />} />
              <Route
                path="/work/influence/:id"
                element={<InfluenceDetails />}
              />
              <Route path="/work/social/:id" element={<SocialDetails />} />
              <Route path="/work/creative/:id" element={<CreativeDetails />} />
              <Route path="/work/event/:id" element={<EventDetails />} />
            </Route>
          </Routes>
        </Suspense>
        <NewsletterPopup />
      </ClientProvider>
    </ThemeProvider>
  );
}

export default App;
