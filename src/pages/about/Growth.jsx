import React from "react";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext";

const Growth = () => {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();

  const data = t("about.growth.stats", { returnObjects: true }) || [];
  return (
    <div
      data-scroll-section
      className={`px-4 md:px-[60px] flex flex-col md:flex-row my-[60px] md:my-[120px] gap-8 md:gap-0 ${
        isRtl ? "font-cairo" : "font-hero-light"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="left-section md:w-2/3 ">
        <h1
          className="text-[var(--foreground)] title text-[22px] sm:text-[28px] md:text-[36px] capitalize loco-growth-text"
          data-scroll
          data-scroll-class="is-inview"
          data-scroll-repeat
        >
          {t("about.growth.title")}
        </h1>
        <p
          className="text-[var(--foreground)] description text-[16px] sm:text-[20px] md:text-[26px] font-light loco-growth-text mt-3 md:mt-4 "
          data-scroll
          data-scroll-class="is-inview"
          data-scroll-repeat
        >
          {t("about.growth.description")}
        </p>
      </div>
      <div className="right-section md:w-1/3 flex-1 relative min-h-[280px] md:min-h-0">
        <div
          key={data[0].id}
          className="flex  items-center md:right-1/2 md:top-0 top-0 left-0 md:left-auto justify-center text-center flex-col w-[160px] h-[160px] md:w-[170px] md:h-[170px] rounded-full absolute bg-[#f2f2f2]/30 loco-growth-circle"
          data-scroll
          data-scroll-class="is-inview"
          data-scroll-repeat
        >
          <h1 className="text-[28px] md:text-[36px] font-bold text-[var(--secondary)]">
            {data[0].amount}+
          </h1>
          <p className="text-[14px] md:text-[16px] font-light text-[var(--secondary)]">
            {data[0].title}
          </p>
        </div>
        <div
          key={data[1].id}
          className="flex px-4  bottom-0 md:bottom-0 md:left-1/2 left-auto right-0 items-center justify-center text-center flex-col w-[160px] h-[160px] md:w-[170px] md:h-[170px] rounded-full absolute bg-[#f2f2f2]/30 loco-growth-circle"
          data-scroll
          data-scroll-class="is-inview"
          data-scroll-repeat
        >
          <h1 className=" text-[var(--secondary)] text-[28px] md:text-[36px] font-bold">
            {data[1].amount}+
          </h1>
          <p className="text-[14px] md:text-[16px] font-light text-[var(--secondary)]">
            {data[1].title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Growth;
