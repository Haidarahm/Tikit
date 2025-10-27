// src/app/(whatever)/Home.tsx
import React, { useEffect, useRef } from "react";
import Hero from "./Hero";
import Numbers from "./Numbers";
import element1Dark from "../../assets/elements/6.png";
import element2Dark from "../../assets/elements/5.png";
import element2 from "../../assets/elements/2-light.png";
import element1 from "../../assets/elements/1-light.png";
import { useTheme } from "../../store/ThemeContext.jsx";
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

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function Home() {
  const { theme } = useTheme();
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

    // Function to get responsive values
    const getResponsiveValues = () => {
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth < 1024;
      return { isMobile, isTablet };
    };

    // Initial setup
    const { isMobile, isTablet } = getResponsiveValues();

    gsap.to(".element1", {
      top: "800px",
      left: isMobile ? "200px" : isTablet ? "500px" : "1000px",
      filter: "blur(5px)",
      duration: 1.5,
      ease: "power1.inOut",
      scrollTrigger: {
        start: "top 0%",
        end: "bottom 0%",
        scrub: 1.5,
      },
    });

    // Animate Element 2 - Responsive
    gsap.to(".element2", {
      top: "100vh",
      right: isMobile ? "40%" : isTablet ? "55%" : "70%",
      filter: "blur(5px)",
      rotation: 100,
      duration: 1.5,
      ease: "power1.inOut",
      scrollTrigger: {
        start: "top 0%",
        end: "bottom 0%",
        scrub: 1.5,
      },
    });

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
      className="sections   overflow-hidden relative w-full home-scroll-trigger"
    >
      {/* <img
        src={theme === "dark" ? element1Dark : element1}
        alt="Decorative element 1"
        className="hidden md:block rotate-50 element1 fade-in-delay-1s pointer-events-none absolute top-30 left-12 z-10 w-auto h-auto max-w-[250px] max-h-[250px] "
      />
      <img
        src={theme === "dark" ? element2Dark : element2}
        alt="Decorative element 2"
        className="element2 hidden md:block fade-in-delay-1s pointer-events-none absolute top-[50vh] right-6 rotate-90 z-10 w-auto h-auto max-w-[220px] max-h-[220px]"
      /> */}
      <Hero />
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
