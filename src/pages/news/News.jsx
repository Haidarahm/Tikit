import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NewsHero from "./NewsHero";
import "./news.css";
import SEOHead from "../../components/SEOHead";
import Content from "./Content";
import { useTheme } from "../../store/ThemeContext.jsx";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const News = () => {
  const { theme } = useTheme();
  const [isReady, setIsReady] = useState(false);

  // Check if theme is ready before rendering
  useEffect(() => {
    if (theme) {
      setIsReady(true);
    }
  }, [theme]);

  useEffect(() => {
    if (!isReady) return;

    const htmlEl = document.documentElement;
    htmlEl.classList.remove("has-scroll-smooth", "has-scroll-init");
    document.body.style.removeProperty("overflow");

    let lenisInstance = null;
    let rafId = null;
    let refreshHandler = null;

    const setupLenis = async () => {
      try {
        const { default: Lenis } = await import("lenis");
        lenisInstance = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          touchMultiplier: 2,
          infinite: false,
          wheelMultiplier: 1,
          lerp: 0.1,
          syncTouch: true,
          syncTouchLerp: 0.075,
        });

        lenisInstance.on("scroll", ScrollTrigger.update);

        refreshHandler = () => {
          lenisInstance?.resize();
        };
        ScrollTrigger.addEventListener("refresh", refreshHandler);

        const raf = (time) => {
          lenisInstance?.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        setTimeout(() => {
          lenisInstance?.resize();
          ScrollTrigger.refresh();
        }, 100);
      } catch (error) {
        console.error("Failed to load Lenis", error);
      }
    };

    setupLenis();

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisInstance) {
        lenisInstance.destroy();
      }
      if (refreshHandler) {
        ScrollTrigger.removeEventListener("refresh", refreshHandler);
      }
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
