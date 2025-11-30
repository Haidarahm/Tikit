import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tick from "../../assets/Tick";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext";

gsap.registerPlugin(ScrollTrigger);

const AnimatedText = () => {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();
  const containerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !line1Ref.current || !line2Ref.current) return;

    const ctx = gsap.context(() => {
      // Horizontal scroll parallax effect for line 1
      // Start with text shifted so first word is visible, end with last word visible
      gsap.fromTo(
        line1Ref.current,
        { x: isRtl ? 1000 : -1000 },
        {
          x: isRtl ? -1000 : 1000,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Horizontal scroll parallax effect for line 2 (opposite direction)
      gsap.fromTo(
        line2Ref.current,
        { x: isRtl ? -1000 : 1000 },
        {
          x: isRtl ? 1000 : -1000,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isRtl]);

  return (
    <div
      ref={containerRef}
      className={`animated-text-about-us relative w-full p-4 md:p-14 overflow-hidden mb-8 md:mb-16 `}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div
        ref={line1Ref}
        className={`title  relative whitespace-nowrap text-[var(--foreground)] text-[40px] md:text-[150px] font-medium md:font-bold ${
          isRtl ? "font-cairo" : ""
        }`}
      >
        {t("about.animatedText.line1.text1")}
        <Tick className="text-[#] w-[100px] md:w-[200px] inline-block h-[50x] px-4 md:px-0 md:h-[100px]" />{" "}
        {t("about.animatedText.line1.text2")}
        <Tick className="text-[#] w-[100px] md:w-[200px] inline-block h-[50x] px-4 md:px-0 md:h-[100px]" />{" "}
        {t("about.animatedText.line1.text3")}
      </div>
      <div
        ref={line2Ref}
        className={`title  relative whitespace-nowrap text-[var(--foreground)] text-[40px] md:text-[150px] font-medium md:font-bold ${
          isRtl ? "font-cairo" : ""
        }`}
      >
        {t("about.animatedText.line2.text1")}
        <Tick className="text-[#] w-[100px] md:w-[200px] inline-block h-[50x] px-4 md:px-0 md:h-[100px]" />{" "}
        {t("about.animatedText.line2.text2")}{" "}
        <Tick className="text-[#] w-[100px] md:w-[200px] inline-block h-[50x] px-4 md:px-0 md:h-[100px]" />{" "}
        {t("about.animatedText.line2.text4")}
      </div>
    </div>
  );
};

export default AnimatedText;
