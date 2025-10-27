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
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();

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
  const { theme } = useTheme();

  const gradientColors =
    theme === "light"
      ? ["#52C3C5", "#5269C5", "#52C3C5", "#52A0C5", "#52C3C5"] // Light theme colors
      : ["#07D9F5", "#06AEC4", "#4E7CC6", "#CE88C6", "#FB8DEF"]; // Dark theme colors (original)

  return (
    <div
      className={`snap-section h-screen text-[var(--foreground)] justify-center items-center flex flex-col ${
        isRtl ? "font-cairo" : "font-hero-light"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="texts mt-22 text-center">
        <div ref={h1WrapRef} className="overflow-hidden">
          <h1
            ref={h1Ref}
            className="text-[32px] md:text-[96px] leading-[40px] md:leading-[100px] md:mb-8 capitalize will-change-transform translate-y-full"
          >
            {t("services.hero.title")} <br />
          </h1>
        </div>
        <div ref={h2WrapRef} className="overflow-hidden">
          <div ref={h2Ref} className="will-change-transform translate-y-full">
            <GradientText
              colors={gradientColors}
              animationSpeed={5}
              showBorder={false}
              className="text-[32px] mx-auto md:text-[96px] leading-[40px] md:leading-[130px] mb-8 capitalize font-bold"
            >
              {t("services.hero.subtitle")}
            </GradientText>
          </div>
        </div>
        <div className="details md:hidden">
          <h1 className="text-[20px]">{t("services.hero.description")}</h1>
          <p className="font-light text-[16px]">
            {t("services.hero.subdescription")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
