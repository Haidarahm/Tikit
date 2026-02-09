import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTranslation } from "react-i18next";
import AvatarGroupDemo from "../../components/ui/AvatarGroupDemo";

const Hero = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const { t } = useTranslation();

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  // Background scale-in animation
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    gsap.set(element, {
      scale: 0,
      transformOrigin: "center center",
    });

    requestAnimationFrame(() => {
      gsap.to(element, {
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.2)",
      });
    });
  }, []);

  // Content stagger animation
  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray("[data-hero-animate]");
      if (!items.length) return;

      gsap.set(items, { autoAlpha: 0, y: 40 });
      gsap.to(items, {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2,
        delay: 0.5,
      });
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      data-nav-color="white"
      className="section relative h-[80vh] mb-[10vh] md:h-[97vh] md:mb-[3vh] rounded-[15px] md:rounded-[25px] overflow-hidden mx-auto w-[98vw] sm:w-[96vw] md:w-[95vw]"
    >
      {/* Background */}
      <div className="pointer-events-none h-full mt-[8px] md:mt-[16px] w-full mx-auto overflow-hidden bg-[var(--container-bg)] rounded-[15px] md:rounded-[25px] absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          fetchPriority="high"
          poster="/showcase-cover.webp"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src={isMobile ? "/main-hero-mobile.mp4" : "/showcase-video.mp4"}
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-black/50 z-10" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative mx-auto h-[calc(100%-104px)] mt-[60px] md:mt-[104px] z-10 w-full px-4 sm:px-6 md:w-6/7 flex items-center flex-col justify-center"
      >
        {/* Title */}
        <div className="flex flex-col items-center text-center text-white">
          <h2
            data-hero-animate
            className="font-[100] text-lg sm:text-xl md:text-2xl lg:text-[27px]"
            style={{
              textShadow:
                "0 2px 8px rgba(0, 0, 0, 0.8), 0 4px 16px rgba(0, 0, 0, 0.6)",
            }}
          >
            {t("home.hero.tagline")}
          </h2>

          <h2
            data-hero-animate
            className="font-[700] font-antonio text-[50px] lg:text-6xl xl:text-[96px] leading-tight"
            style={{
              textShadow:
                "0 4px 12px rgba(0, 0, 0, 0.9), 0 8px 24px rgba(0, 0, 0, 0.7), 0 12px 32px rgba(0, 0, 0, 0.5)",
            }}
          >
            ROI REBELS
          </h2>
        </div>

        {/* Subtitle */}
        <div data-hero-animate className="mt-4 md:mt-6">
          <h3
            className="font-[400] tracking-widest text-white text-xl sm:text-2xl md:text-3xl lg:text-[36px] text-center px-4"
            style={{
              textShadow:
                "0 2px 8px rgba(0, 0, 0, 0.8), 0 4px 16px rgba(0, 0, 0, 0.6)",
            }}
          >
            {t("home.hero.subtitle")}
          </h3>
        </div>

        {/* Avatars */}
        <div data-hero-animate className="mt-8 md:mt-[50px]">
          <AvatarGroupDemo />
          <div className="text-center mt-2 md:mt-[10px]">
            <span
              className="font-bold text-sm sm:text-base text-white"
              style={{
                textShadow:
                  "0 2px 6px rgba(0, 0, 0, 0.8), 0 4px 12px rgba(0, 0, 0, 0.6)",
              }}
            >
              {t("home.hero.clients")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
