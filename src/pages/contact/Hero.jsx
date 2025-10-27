import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import GradientText from "../../components/GradientText";
import { useTheme } from "../../store/ThemeContext";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext";

const Hero = () => {
  const h1WrapRef = useRef(null);
  const h1Ref = useRef(null);
  const h2WrapRef = useRef(null);
  const h2Ref = useRef(null);
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();

  const gradientColors =
    theme === "light"
      ? ["#52C3C5", "#5269C5", "#52C3C5", "#52A0C5", "#52C3C5"] // Light theme colors
      : ["#07D9F5", "#06AEC4", "#4E7CC6", "#CE88C6", "#FB8DEF"]; // Dark theme colors (original)

  useLayoutEffect(() => {
    if (!h1Ref.current || !h2Ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        h1Ref.current,
        { y: "150%", autoAlpha: 1 },
        { y: 0, duration: 0.9, ease: "power2.out", delay: 0.1 }
      );
      gsap.fromTo(
        h2Ref.current,
        { y: "150%", autoAlpha: 1 },
        { y: 0, duration: 1, ease: "power2.out", delay: 0.3 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      data-scroll-section
      className={`text-[var(--foreground)] snap-start snap-always h-[50vh] md:h-screen w-full flex items-center justify-center ${
        isRtl ? "font-cairo" : "font-hero-light"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="text-center mt-[104px]">
        <div ref={h1WrapRef} className="overflow-hidden">
          <h1
            ref={h1Ref}
            className="text-[32px] md:text-[70px] leading-[40px] md:leading-[110px] capitalize py-2 will-change-transform translate-y-full"
          >
            {t("contact.hero.title")}
          </h1>
        </div>
        <div ref={h2WrapRef} className="overflow-hidden">
          <div ref={h2Ref} className="will-change-transform translate-y-full">
            <GradientText
              colors={gradientColors}
              animationSpeed={5}
              showBorder={false}
              className="text-[32px] mx-auto md:text-[96px] leading-[40px] md:leading-[170px]  mb-8 capitalize font-bold"
            >
              {t("contact.hero.subtitle")}
            </GradientText>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
