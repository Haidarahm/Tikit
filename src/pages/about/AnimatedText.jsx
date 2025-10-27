import React from "react";
import Tick from "../../assets/Tick";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext";

const AnimatedText = () => {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();

  return (
    <div
      data-scroll-section
      className={`animated-text-about-us relative w-full p-4 md:p-14 overflow-hidden mb-8 md:mb-16 `}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div
        className={`title  relative whitespace-nowrap text-[var(--foreground)] text-[40px] md:text-[150px] font-medium md:font-bold ${
          isRtl ? "font-cairo" : "font-[PlusJakartaSans]"
        }`}
        data-scroll
        data-scroll-speed="20"
        data-scroll-direction="horizontal"
      >
        {t("about.animatedText.line1.text1")}
        <Tick className="text-[#] w-[100px] md:w-[200px] inline-block h-[50x] px-4 md:px-0 md:h-[100px]" />{" "}
        {t("about.animatedText.line1.text2")}
        <Tick className="text-[#] w-[100px] md:w-[200px] inline-block h-[50x] px-4 md:px-0 md:h-[100px]" />{" "}
        {t("about.animatedText.line1.text3")}
      </div>
      <div
        className={`title  relative whitespace-nowrap text-[var(--foreground)] text-[40px] md:text-[150px] font-medium md:font-bold ${
          isRtl ? "font-cairo" : "font-[PlusJakartaSans]"
        }`}
        data-scroll
        data-scroll-speed="-20"
        data-scroll-direction="horizontal"
      >
        {t("about.animatedText.line2.text1")}
        <Tick className="text-[#] w-[100px] md:w-[200px] inline-block h-[50x] px-4 md:px-0 md:h-[100px]" />{" "}
        {t("about.animatedText.line2.text2")}{" "}
        {t("about.animatedText.line2.text3")}
        <Tick className="text-[#] w-[100px] md:w-[200px] inline-block h-[50x] px-4 md:px-0 md:h-[100px]" />{" "}
        {t("about.animatedText.line2.text4")}
      </div>
    </div>
  );
};

export default AnimatedText;
