import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import LightRays from "../../components/LightRays";
import Threads from "../../components/Threads";
import { useI18nLanguage } from "../../store/I18nLanguageContext";

const NewsHero = () => {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();
  const [isDark, setIsDark] = useState(null); // null = not checked yet
  const [isThemeReady, setIsThemeReady] = useState(false);
  const kickerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Check if dark mode is enabled immediately on mount
    const checkDarkMode = () => {
      const isDarkMode = document.documentElement.classList.contains("dark");
      setIsDark(isDarkMode);
      setIsThemeReady(true);
    };

    // Check immediately
    checkDarkMode();

    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  // GSAP 3D Text Animations - only run when theme is ready
  useEffect(() => {
    if (!isThemeReady) return;

    const tl = gsap.timeline();

    // Set initial state - ensure all elements start from opacity 0
    gsap.set([kickerRef.current, titleRef.current, descriptionRef.current], {
      opacity: 0,
      y: 100,
      rotateX: -90,
      rotateY: 0,
      perspective: 1000,
      visibility: "visible",
    });

    // Animate kicker
    tl.fromTo(
      kickerRef.current,
      {
        opacity: 0,
        y: 100,
        rotateX: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      0
    );

    // Animate title with 3D effect
    tl.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 100,
        rotateX: -90,
        rotateY: -20,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.9,
        ease: "power3.out",
      },
      0.15
    );

    // Animate description with 3D effect
    tl.fromTo(
      descriptionRef.current,
      {
        opacity: 0,
        y: 100,
        rotateX: -90,
        rotateY: 20,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.9,
        ease: "power3.out",
      },
      0.3
    );
  }, [isThemeReady]);

  const textColor = isDark ? "text-white" : "text-gray-900";

  // Don't render until theme is checked
  if (!isThemeReady || isDark === null) {
    return (
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[var(--background)]">
        <div className="text-[var(--foreground)] opacity-0"></div>
      </section>
    );
  }

  return (
    <section
      ref={contentRef}
      className={`relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br`}
      data-scroll
    >
      {/* Conditional Background - Only renders after theme is determined */}
      <div className="absolute w-full h-full -translate-x-1/2 left-1/2 top-0">
        {isDark ? (
          <LightRays
            raysOrigin="top-center"
            raysColor="#52C3C5"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            className="custom-rays"
          />
        ) : (
          <></>
        )}
      </div>

      {/* Content */}
      <div
        className="relative z-20 max-w-4xl mx-auto px-6 text-center"
        style={{ perspective: "1000px" }}
      >
        {/* Kicker */}
        <span
          ref={kickerRef}
          className="inline-block px-4 py-2 mb-8 rounded-full bg-cyan-500/15 text-cyan-400 text-sm font-bold tracking-wider uppercase border border-cyan-400/40"
          style={{ transformStyle: "preserve-3d", opacity: 0 }}
        >
          {t("news.hero.kicker", "Latest Insights")}
        </span>

        {/* Title */}
        <h1
          ref={titleRef}
          className={`text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6 ${textColor} ${isRtl ? "font-cairo" : "font-antonio"}`}
          style={{ transformStyle: "preserve-3d", opacity: 0 }}
        >
          {t("news.hero.title")}
        </h1>

        {/* Description */}
        <p
          ref={descriptionRef}
          className={`text-xl md:text-2xl leading-relaxed opacity-85 max-w-3xl mx-auto ${textColor}`}
          style={{ transformStyle: "preserve-3d", opacity: 0 }}
        >
          {t(
            "news.hero.description",
            "Discover strategies, insights, and breakthroughs from our team of marketing experts."
          )}
        </p>
      </div>
    </section>
  );
};

export default NewsHero;
