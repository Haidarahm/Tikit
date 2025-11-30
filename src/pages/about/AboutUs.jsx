import React, { useEffect, useState, useRef } from "react";
import Hero from "./Hero";
import "./about.css";
import AnimatedText from "./AnimatedText";
import Images from "./images";
import Strategy from "./Strategy";
import Team from "./Team";
import Growth from "./Growth";
import Footer from "../../components/Footer";
// import ContactUs from "./ContactUs";
import SEOHead from "../../components/SEOHead";
import ContactUs from "../Home/ContactUs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const [isReady, setIsReady] = useState(false);
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  // Initialize Lenis after component is ready
  useEffect(() => {
    const htmlEl = document.documentElement;
    htmlEl.classList.remove("has-scroll-smooth", "has-scroll-init");
    document.body.style.removeProperty("overflow");

    let refreshHandler = null;

    const setupLenis = async () => {
      try {
        const { default: Lenis } = await import("lenis");
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          smoothTouch: false,
          lerp: 0.1,
          wheelMultiplier: 1,
        });

        lenisRef.current = lenis;

        lenis.on("scroll", ScrollTrigger.update);

        refreshHandler = () => {
          lenis?.resize();
        };
        ScrollTrigger.addEventListener("refresh", refreshHandler);

        const raf = (time) => {
          lenis?.raf(time);
          rafRef.current = requestAnimationFrame(raf);
        };
        rafRef.current = requestAnimationFrame(raf);

        // Mark as ready and refresh after initialization
        setTimeout(() => {
          lenis?.scrollTo(0, { immediate: true });
          lenis?.resize();
          ScrollTrigger.refresh();
          setIsReady(true);
        }, 100);
      } catch (error) {
        console.error("Failed to load Lenis", error);
        setIsReady(true); // Still render even if Lenis fails
      }
    };

    // Start after full page load
    if (document.readyState === "complete") {
      setupLenis();
    } else {
      window.addEventListener("load", setupLenis, { once: true });
    }

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      if (refreshHandler) {
        ScrollTrigger.removeEventListener("refresh", refreshHandler);
      }
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };
  }, []);

  return (
    <div
      data-nav-color="black"
      className="about-us-section w-full min-h-screen font-hero-light"
    >
      <SEOHead
        title="About Us"
        description="Learn about Tikit Agency - a full-service marketing agency driven by insight and creativity. Discover our team, values, and approach to delivering exceptional results."
        keywords="about Tikit Agency, marketing team, creative agency, brand strategy, digital marketing agency UAE"
        canonicalUrl="/about"
      />
      <Hero />
      <AnimatedText />
      <Images />
      <Strategy />
      <Growth />
      <Team />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default AboutUs;
