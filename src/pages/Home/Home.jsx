import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Hero from "./Hero";
import SEOHead from "../../components/SEOHead";
import LogoIntro from "../../components/LogoIntro";
import { useIntro } from "../../store/IntroContext";
import LazySection from "../../components/LazySection";
import WhyTikitSection from "./WhyTikitSection";
import ShowCase from "./ShowCase";
import Numbers from "./Numbers";
import Goals from "./Goals";
import Influencers from "./influencers/Influencers";
import Services from "./Services";
import Connections from "./Connections";
import WorkSection from "./WorkSection";
import Map from "./map/Map";
import PinnedSection from "./PinnedSection";
import Blogs from "./Blogs";
import ContactUs from "./ContactUs";
import { HomeGsapScopeProvider } from "./HomeGsapScope";



// Homepage LocalBusiness schema with complete business information
const homepageSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://tikit.ae/#organization",
  "name": "Tikit Agency",
  "alternateName": ["Tikit", "Tikit Marketing Agency", "Tikit Influencer Agency"],
  "url": "https://tikit.ae",
  "logo": {
    "@type": "ImageObject",
    "url": "https://tikit.ae/logo-light.png",
    "width": 200,
    "height": 60
  },
  "image": "https://tikit.ae/showcase-cover.webp",
  "description": "We help brands in Dubai grow through smart strategy, creative content, and performance-focused campaigns. Work with a team that focuses on real results.",
  "telephone": "+971 4 577 4042",
  "email": "Holla@tikit.ae",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "The Burlington Tower, Marasi Drive, Office 309",
    "addressLocality": "Dubai",
    "addressRegion": "Dubai",
    "addressCountry": "AE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 25.1884,
    "longitude": 55.2657
  },
  "areaServed": [
    { "@type": "Country", "name": "United Arab Emirates" },
    { "@type": "Country", "name": "Saudi Arabia" },
    { "@type": "City", "name": "Dubai" },
    { "@type": "City", "name": "Abu Dhabi" },
    { "@type": "City", "name": "Riyadh" },
    { "@type": "City", "name": "Jeddah" }
  ],
  "priceRange": "$$$",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "sameAs": [
    "https://www.instagram.com/tikit.ae/",
    "https://www.linkedin.com/company/tikitmarketingmanagement"
  ],
  "foundingDate": "2020",
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": 50,
    "maxValue": 100
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "300",
    "bestRating": "5"
  }
};

function Home() {
  const homeGsapScopeRef = useRef(null);
  const { introDone, setIntroDone } = useIntro();
  const [isMobileView, setIsMobileView] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 767px)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateIsMobile = (event) => {
      setIsMobileView(event.matches);
    };

    setIsMobileView(mediaQuery.matches);
    mediaQuery.addEventListener("change", updateIsMobile);

    return () => {
      mediaQuery.removeEventListener("change", updateIsMobile);
    };
  }, []);

  useEffect(() => {
    if (!isMobileView || introDone) return;

    setIntroDone(true);
    try {
      sessionStorage.setItem("logoIntroSeen", "true");
    } catch (_) {
      // ignore storage failures
    }
  }, [introDone, isMobileView, setIntroDone]);

  useEffect(() => {
    if (!homeGsapScopeRef.current) return undefined;
    const homeCtx = gsap.context(() => {}, homeGsapScopeRef);
    return () => homeCtx.revert();
  }, []);

  return (
    <>
      <SEOHead
        title="Dubai Influencer Marketing Agency | Tikit – Creative Campaigns That Convert"
        skipTitleSuffix
        description="We help brands in Dubai grow through smart strategy, creative content, and performance-focused campaigns. Work with a team that focuses on real results."
        keywords="marketing agency Dubai"
        canonicalUrl="/"
        structuredData={homepageSchema}
      />

      {!introDone && !isMobileView && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--background)]">
          <LogoIntro onComplete={() => setIntroDone(true)} />
        </div>
      )}

      <HomeGsapScopeProvider value={homeGsapScopeRef}>
      <div
        ref={homeGsapScopeRef}
        id="home"
        className="sections overflow-hidden relative w-full home-scroll-trigger"
      >
        <Hero introDone={introDone} />

        <LazySection minHeight="400px">
          <ShowCase />
        </LazySection>

        <LazySection minHeight="560px">
          <WhyTikitSection />
        </LazySection>

        <LazySection minHeight="300px">
          <Numbers />
        </LazySection>

        <LazySection minHeight="400px">
          <Goals />
        </LazySection>

        <LazySection minHeight="500px">
          <Influencers />
        </LazySection>

    

        <LazySection minHeight="300px">
          <Connections />
        </LazySection>

        <LazySection minHeight="400px">
          <WorkSection />
        </LazySection>

        <LazySection minHeight="500px" rootMargin="400px">
          <Map />
        </LazySection>

        {/* PinnedSection is desktop-only; keep wrapper hidden on mobile to avoid blank space */}
        <LazySection className="hidden md:block" minHeight="100vh" rootMargin="800px">
          <PinnedSection />
        </LazySection>

        <LazySection minHeight="300px">
          <Blogs />
        </LazySection>
        <LazySection minHeight="400px">
          <Services />
        </LazySection>
        <LazySection minHeight="400px">
          <ContactUs />
        </LazySection>
        
      </div>
      </HomeGsapScopeProvider>
    </>
  );
}

export default Home;
