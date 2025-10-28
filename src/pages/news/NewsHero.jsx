import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LightRays from "../../components/LightRays";
import Threads from "../../components/Threads";

const NewsHero = () => {
  const { t } = useTranslation();
  const [isDark, setIsDark] = useState(false);

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

  const textColor = isDark ? "text-white" : "text-gray-900";

  

  return (
    <section
      className={`relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br`}
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

 
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
        {/* Kicker */}
        <span className="inline-block px-4 py-2 mb-8 rounded-full bg-cyan-500/15 text-cyan-400 text-sm font-bold tracking-wider uppercase border border-cyan-400/40">
          {t("news.hero.kicker", "Latest Insights")}
        </span>

        {/* Title */}
        <h1
          className={`text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6 ${textColor}`}
        >
          {t("news.hero.title", "News and Blogs")}
        </h1>

        {/* Description */}
        <p
          className={`text-xl md:text-2xl leading-relaxed opacity-85 max-w-3xl mx-auto ${textColor}`}
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
