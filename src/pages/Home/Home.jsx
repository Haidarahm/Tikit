import React, { useEffect, useRef } from "react";
import Hero from "./Hero";
import Numbers from "./Numbers";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Goals from "./Goals";
import Services from "./Services";
import AboutUs from "./AboutUs";
import WorkSection from "./WorkSection";
import Connections from "./Connections";
import Reviews from "./Reviews";
import ContactUs from "./ContactUs";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";
import Influencers from "./influencers/Influencers";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function Home() {
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);

  useEffect(() => {
    // Safety: ensure no leftover locomotive-scroll styles block scrolling
    const htmlEl = document.documentElement;
    htmlEl.classList.remove("has-scroll-smooth", "has-scroll-init");
    document.body.style.removeProperty("overflow");

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.1,
      lerp: 0.075,
    });

    const handleScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", handleScroll);

    const raf = (time) => {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };
    rafIdRef.current = requestAnimationFrame(raf);
    lenisRef.current = lenis;

    // Force a refresh after Lenis initialises so ScrollTrigger reads full height
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 100);

    // Handle window resize for responsive animations
    const handleResize = () => {
      ScrollTrigger.refresh(true);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      clearTimeout(refreshTimeout);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (lenisRef.current) {
        lenisRef.current.off("scroll", handleScroll);
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      id="home"
      className="sections overflow-hidden relative w-full home-scroll-trigger"
    >
      <SEOHead
        title="Home"
        description="Tikit Agency crafts impactful brand strategy, design systems, websites, and immersive digital experiences. Explore our featured work, services, and case studies."
        keywords="marketing agency, digital marketing, brand strategy, design systems, web development, creative agency, UAE marketing"
        canonicalUrl="/home"
      />
      <Hero />
      <Influencers />
      <Numbers />
      <Goals />
      <Services />
      <Connections />
      <WorkSection />
      <AboutUs />
      <Reviews />
      <ContactUs />
      <Footer />
    </div>
  );
}

export default Home;
