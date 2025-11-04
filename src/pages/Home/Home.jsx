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
import Influencers from "./Influencers";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function Home() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Safety: ensure no leftover locomotive-scroll styles block scrolling
    const htmlEl = document.documentElement;
    htmlEl.classList.remove("has-scroll-smooth", "has-scroll-init");
    document.body.style.removeProperty("overflow");

    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
      wrapper: window,
      content: document.documentElement,
    });

    // Connect Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Add a small delay to ensure all components are mounted before ScrollTrigger refresh
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // RAF loop for Lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenisRef.current = lenis;

    // Handle window resize for responsive animations
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    // Refresh ScrollTrigger after Lenis is initialized
    ScrollTrigger.refresh();

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("resize", handleResize);
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
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
