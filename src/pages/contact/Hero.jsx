import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTheme } from "../../store/ThemeContext";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext";
import { useFontClass } from "../../hooks/useFontClass";

const Hero = () => {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();
  const { fontBody } = useFontClass();

  const gradientColors =
    theme === "light"
      ? ["#52C3C5", "#5269C5", "#52C3C5", "#52A0C5", "#52C3C5"] // Light theme colors
      : ["#07D9F5", "#06AEC4", "#4E7CC6", "#CE88C6", "#FB8DEF"]; // Dark theme colors (original)

  useLayoutEffect(() => {
    if (!line1Ref.current || !line2Ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line1Ref.current,
        { y: "150%", autoAlpha: 1 },
        { y: 0, duration: 0.9, ease: "power2.out", delay: 0.1 }
      );
      gsap.fromTo(
        line2Ref.current,
        { y: "150%", autoAlpha: 1 },
        { y: 0, duration: 1, ease: "power2.out", delay: 0.3 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      data-scroll-section
      className={`text-[var(--foreground)] snap-start snap-always h-[50vh] md:h-screen w-full flex items-center justify-center ${fontBody}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="text-center mt-[104px]">
        <h1 className="flex flex-col items-center">
          <div className="overflow-hidden w-full">
            <span
              ref={line1Ref}
              style={{ fontFamily: isRtl ? "" : "Antonio" }}
              className="block text-[32px] leading-tight md:text-[50px] xl:text-[70px] 2xl:text-[80px] capitalize will-change-transform"
            >
              {t("contact.hero.title")}
            </span>
          </div>
          <div className="overflow-hidden w-full">
            <span
              ref={line2Ref}
              style={{ fontFamily: isRtl ? "" : "Caveat" }}
              className="block will-change-transform translate-y-full text-[32px] leading-tight font-[700] mx-auto md:text-[50px] xl:text-[80px] 2xl:text-[90px] mb-8 capitalize tikit-gradient"
            >
              {t("contact.hero.subtitle")}
            </span>
          </div>
        </h1>
      </div>
    </section>
  );
};

export default Hero;
