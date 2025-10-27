import React from "react";
import image1 from "../../assets/aboutus/about-1.webp";
import image2 from "../../assets/aboutus/about-2.webp";
import image3 from "../../assets/aboutus/about-3.webp";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext";

const Images = () => {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();

  return (
    <div
      data-scroll-section
      className={`text-[var(--foreground)] px-4 md:px-[60px] grid gap-[10px] md:gap-[15px] grid-cols-1 md:grid-cols-7 auto-rows-[200px] md:grid-rows-4 ${
        isRtl ? "font-cairo" : "font-hero-light"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Image 1 */}
      <div
        className="reveal-img md:col-span-3 md:row-span-2"
        data-scroll
        data-scroll-class="is-inview"
        data-scroll-repeat
      >
        <img
          src={image1}
          alt="image-1"
          className="rounded-[15px] w-full h-full object-cover"
        />
      </div>

      {/* Text 1 with scroll speed */}
      <div
        className="text reveal-text md:col-span-2 md:row-span-2 capitalize bg-[#52c3c522] dark:bg-[#00000019]   rounded-[15px] font-light text-[22px] sm:text-[28px] md:text-[42px] flex justify-center items-center px-4 md:px-[60px]"
        data-scroll
        data-scroll-class="is-inview"
        data-scroll-repeat
        data-scroll-speed="2"
      >
        <h1>{t("about.images.clients")}</h1>
      </div>

      {/* Image 2 */}
      <div
        className="reveal-img md:col-span-2 md:row-span-2 relative z-20"
        data-scroll
        data-scroll-class="is-inview"
        data-scroll-repeat
      >
        <img
          src={image2}
          alt="image-2"
          className="rounded-[15px] w-full h-full object-cover"
        />
      </div>

      {/* Text 2 with slower speed */}
      <div
        className="text relative reveal-text md:col-span-2 md:row-span-2 bg-[#52c3c522] dark:bg-[#00000019] capitalize rounded-[15px] font-light text-[22px] sm:text-[28px] md:text-[42px] flex justify-center items-center px-4 md:px-[60px]"
        data-scroll
        data-scroll-class="is-inview"
        data-scroll-repeat
        data-scroll-speed="-1"
      >
        <h1>{t("about.images.funding")}</h1>
      </div>

      {/* Image 3 */}
      <div
        className="reveal-img md:col-span-5 md:row-span-2"
        data-scroll
        data-scroll-class="is-inview"
        data-scroll-repeat
      >
        <img
          src={image3}
          alt="image-3"
          className="rounded-[15px] w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Images;
