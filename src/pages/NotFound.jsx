import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import Logo from "../assets/logo.jsx";
import { useTheme } from "../store/ThemeContext";
import { useI18nLanguage } from "../store/I18nLanguageContext";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { theme } = useTheme();
  const { isRtl } = useI18nLanguage();
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const numberRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);

  const isDark = theme === "dark";

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(logoRef.current, { opacity: 0, scale: 0.8, rotation: -10 });
      gsap.set(numberRef.current, { opacity: 0, y: 100, scale: 0.5 });
      gsap.set(titleRef.current, { opacity: 0, y: 50 });
      gsap.set(descRef.current, { opacity: 0, y: 30 });
      gsap.set(buttonRef.current, { opacity: 0, y: 20 });

      // Animate in sequence
      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      })
        .to(
          numberRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.4"
        )
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .to(
          descRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .to(
          buttonRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        );

      // Floating animation for logo
      gsap.to(logoRef.current, {
        y: -15,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Subtle pulse on 404 number
      gsap.to(numberRef.current, {
        scale: 1.02,
        duration: 1.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1,
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-nav-color="black"
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen md:mt-[90px] w-full  flex flex-col items-center justify-center px-4  overflow-hidden relative"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-[#6ACBCC]/10 to-[#1C6F6C]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-[#1C6F6C]/10 to-[#6ACBCC]/10 rounded-full blur-3xl" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Logo */}
      <div ref={logoRef} className="mb-8 md:mb-12">
        <Logo
          color={isDark ? "#ffffff" : "#363737"}
          logoJumpColor="#6ACBCC"
          className="w-32 h-auto md:w-40"
        />
      </div>

      {/* 404 Number */}
      <div
        ref={numberRef}
        className={`relative mb-4  ${isRtl ? "font-cairo" : "font-antonio"}`}
      >
        <span className="text-[120px] md:text-[200px] lg:text-[220px] font-bold leading-none bg-gradient-to-r from-[#6ACBCC] to-[#1C6F6C] bg-clip-text text-transparent">
          404
        </span>
        {/* Shadow effect */}
        <span className="absolute inset-0 text-[120px] md:text-[200px] lg:text-[220px] font-bold leading-none text-[var(--foreground)]/5 blur-sm -z-10 translate-y-2">
          404
        </span>
      </div>

      {/* Title */}
      <h1
        ref={titleRef}
        className={`text-2xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-4 text-center ${
          isRtl ? "font-cairo" : "font-antonio"
        }`}
      >
        {t("notFound.title", "Oops! Page Not Found")}
      </h1>

      {/* Description */}
      <p
        ref={descRef}
        className={`text-base md:text-lg lg:text-xl text-[var(--foreground)]/60 mb-8  text-center max-w-md ${
          isRtl ? "font-cairo" : "font-hero-light"
        }`}
      >
        {t("notFound.description", "The page you're looking for doesn't exist or has been moved.")}
      </p>

      {/* Back to Home Button */}
      <div ref={buttonRef}>
        <Link
          to="/"
          className={`group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#6ACBCC] to-[#1C6F6C] text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#6ACBCC]/30 hover:scale-105 ${
            isRtl ? "font-cairo flex-row-reverse" : "font-hero-light"
          }`}
        >
          {/* Button shine effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          
          {/* Arrow icon */}
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${
              isRtl ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          
          <span className="relative z-10">
            {t("notFound.backHome", "Back to Home")}
          </span>
        </Link>
      </div>

      {/* Decorative floating elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-[#6ACBCC] rounded-full opacity-60 animate-pulse" />
      <div className="absolute top-40 right-20 w-2 h-2 bg-[#1C6F6C] rounded-full opacity-40 animate-pulse delay-300" />
      <div className="absolute bottom-32 left-20 w-4 h-4 bg-[#6ACBCC]/50 rounded-full animate-pulse delay-500" />
      <div className="absolute bottom-20 right-10 w-2.5 h-2.5 bg-[#1C6F6C]/60 rounded-full animate-pulse delay-700" />
    </div>
  );
};

export default NotFound;

