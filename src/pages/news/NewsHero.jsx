import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import LightRays from "../../components/LightRays";
import Threads from "../../components/Threads";

const NewsHero = () => {
  const { t } = useTranslation();
  const [isDark, setIsDark] = useState(false);
  const kickerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Check if dark mode is enabled
    const checkDarkMode = () => {
      const isDarkMode = document.documentElement.classList.contains("dark");
      setIsDark(isDarkMode);
    };

    checkDarkMode();

    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  // GSAP 3D Text Animations
  useEffect(() => {
    const tl = gsap.timeline();

    // Set initial state
    gsap.set([kickerRef.current, titleRef.current, descriptionRef.current], {
      opacity: 0,
      y: 100,
      rotateX: -90,
      rotateY: 0,
      perspective: 1000,
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
  }, []);

  const textColor = isDark ? "text-white" : "text-gray-900";

  return (
    <section
      ref={contentRef}
      className={`relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br`}
      data-scroll
    >
      {/* Conditional Background */}
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
          <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
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
          style={{ transformStyle: "preserve-3d" }}
        >
          {t("news.hero.kicker", "Latest Insights")}
        </span>

        {/* Title */}
        <h1
          ref={titleRef}
          className={`text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6 ${textColor}`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {t("news.hero.title", "News and Blogs")}
        </h1>

        {/* Description */}
        <p
          ref={descriptionRef}
          className={`text-xl md:text-2xl leading-relaxed opacity-85 max-w-3xl mx-auto ${textColor}`}
          style={{ transformStyle: "preserve-3d" }}
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
