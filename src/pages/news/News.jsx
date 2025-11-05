import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import NewsHero from "./NewsHero";
import "./news.css";
import SEOHead from "../../components/SEOHead";
import Content from "./Content";
import { useTheme } from "../../store/ThemeContext.jsx";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const News = () => {
  const { theme } = useTheme();
  const lenisRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // Check if theme is ready before rendering
  useEffect(() => {
    if (theme) {
      setIsReady(true);
    }
  }, [theme]);

  useEffect(() => {
    if (!isReady) return;

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
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isReady]);

  // Don't render until theme is loaded
  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--background)]">
        <div className="text-[var(--foreground)] text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <main
      className={`news-page ${theme === "dark" ? "dark-mode" : "light-mode"}`}
    >
      <SEOHead
        title="News & Insights"
        description="Stay updated with the latest news, insights, and updates from Tikit Agency. Discover industry trends, marketing tips, and our latest achievements."
        keywords="marketing news, digital marketing insights, agency updates, marketing trends, industry news, Tikit Agency news"
        canonicalUrl="/news"
      />
      <NewsHero />
      <Content />
    </main>
  );
};

export default News;
