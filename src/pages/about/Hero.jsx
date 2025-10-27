import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import InfiniteScroll from "../../components/InfiniteScroll";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext";

const Hero = () => {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();

  useEffect(() => {
    AOS.init({
      duration: 3000,
      once: true,
      offset: 100,
    });
  }, []);

  const items = [
    { content: "Text Item 1" },
    { content: <p>Paragraph Item 2</p> },
    { content: "Text Item 3" },
    { content: <p>Paragraph Item 4</p> },
    { content: "Text Item 5" },
    { content: <p>Paragraph Item 6</p> },
    { content: "Text Item 7" },
    { content: <p>Paragraph Item 8</p> },
    { content: "Text Item 9" },
    { content: <p>Paragraph Item 10</p> },
    { content: "Text Item 11" },
    { content: <p>Paragraph Item 12</p> },
    { content: "Text Item 13" },
    { content: <p>Paragraph Item 14</p> },
  ];
  return (
    <div
      data-scroll-section
      className={`flex flex-col ${isRtl ? "font-cairo" : "font-hero-light"}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div style={{ height: "500px", position: "relative" }}>
        <div className="overlay absolute h-full w-full bg-[var(--background)] opacity-50 z-20 "></div>

        <div
          className={`title z-30 px-2 md:px-0 w-full md:w-3/4 text-[var(--foreground)] text-center md:text-start absolute text-[32px] md:text-[64px] capitalize flex items-center font-bold leading-[60px] h-full ${
            isRtl ? "md:pr-[60px]" : "md:pl-[60px]"
          }`}
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          {t("about.hero.title")}
        </div>
        <InfiniteScroll
          items={items}
          isTilted={true}
          tiltDirection="right"
          autoplay={true}
          autoplaySpeed={0.5}
          autoplayDirection="down"
          pauseOnHover={true}
        />
      </div>
      <div
        className={`description relative z-30 text-center md:text-start flex-1 flex md:flex-row flex-col text-[var(--foreground)] gap-4 md:gap-14 justify-center items-center px-[20px] ${
          isRtl ? "md:pr-[60px]" : "md:pl-[60px]"
        }`}
      >
        <div className="title uppercase font-bold mt-4 md:mt-0 text-[20px] md:text-[34px] w-2/7">
          {t("about.hero.sectionTitle")}
        </div>
        <div className="paragraph text-[16px] md:text-[28px]">
          {t("about.hero.description")}
        </div>
      </div>
    </div>
  );
};

export default Hero;
