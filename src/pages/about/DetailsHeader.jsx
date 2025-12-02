import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext";
import image1 from "../../assets/aboutus/about-1.webp";

gsap.registerPlugin(ScrollTrigger);

const DetailsHeader = () => {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const lineRef = useRef(null);
  const imgRef = useRef(null);
  const marqRef = useRef(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(titleRef.current, { opacity: 0, y: 50 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
      gsap.set(lineRef.current, { scaleX: 0 });
      gsap.set(imgRef.current, { opacity: 0 });
      gsap.set(marqRef.current, { opacity: 0, y: 20 });

      // Create timeline for entrance animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Animate in sequence
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          lineRef.current,
          {
            scaleX: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .to(
          imgRef.current,
          {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .to(
          marqRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        );

      // Parallax on scroll
      gsap.to(titleRef.current, {
        y: -80,
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(imgRef.current?.querySelector("img"), {
        scale: 1.15,
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      dir={isRtl ? "rtl" : "ltr"}
      className="details-header relative flex items-center justify-center w-full h-screen px-4 md:px-[70px] overflow-hidden"
    >
      {/* Main Title */}
      <div className="relative z-10 text-center">
        <h1
          ref={titleRef}
          className={`text-5xl md:text-7xl lg:text-[100px] font-bold text-[var(--foreground)] uppercase leading-none ${
            isRtl ? "font-cairo" : "font-antonio"
          }`}
        >
          {t("about.details.header.title")}
        </h1>
        <p
          ref={subtitleRef}
          className={`text-xl md:text-2xl text-[var(--foreground)] dark:text-[var(--foreground)]/70 mt-4 font-light ${
            isRtl ? "font-cairo" : "font-hero-light"
          }`}
        >
          {t("about.details.header.subtitle")}
        </p>
        <div
          ref={lineRef}
          className="w-20 h-1 bg-gradient-to-r from-[#6ACBCC] to-[#1C6F6C] rounded-full mx-auto mt-6 origin-center"
        />
      </div>

      {/* Header Image */}
      <div
        ref={imgRef}
        className="absolute inset-0 w-full h-full overflow-hidden -z-[1]"
      >
        <img
          src={image1}
          alt="Vision"
          className="block w-full h-full object-cover opacity-30 dark:opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-[var(--background)]/50 to-[var(--background)]" />
      </div>

      {/* Bottom Marquee */}
      <div
        ref={marqRef}
        className="absolute bottom-8 left-0 w-full overflow-hidden"
      >
        <div className={`flex items-center justify-center gap-6 md:gap-8 text-[var(--foreground)] dark:text-[var(--foreground)]/50 text-sm md:text-base uppercase tracking-widest ${isRtl ? "font-cairo" : "font-hero-light"}`}>
          <span>{t("about.details.header.marquee.strategy")}</span>
          <span className="w-2 h-2 rounded-full bg-[#6ACBCC]" />
          <span>{t("about.details.header.marquee.creativity")}</span>
          <span className="w-2 h-2 rounded-full bg-[#6ACBCC]" />
          <span>{t("about.details.header.marquee.innovation")}</span>
          <span className="w-2 h-2 rounded-full bg-[#6ACBCC]" />
          <span>{t("about.details.header.marquee.growth")}</span>
        </div>
      </div>
    </header>
  );
};

export default DetailsHeader;
