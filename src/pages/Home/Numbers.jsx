import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import CountUp from "../../components/CountUp";
import TikitTitle from "../../components/TikitTitle.jsx";

const Numbers = memo(() => {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();

  const data = [
    {
      count: 300,
      text1: t("home.numbers.items.happyClients.text1"),
      text2: t("home.numbers.items.happyClients.text2"),
      plus: true,
      color: "bg-[#52C3C5]",
      lightColor: "bg-[#E84B43]/15",
    },
    {
      count: 8,
      text1: t("home.numbers.items.years.text1"),
      text2: t("home.numbers.items.years.text2"),
      bottom: true,
      color: "bg-[#9D74E5]",
      lightColor: "bg-[#252525]/13",
    },
    {
      count: 500,
      text1: t("home.numbers.items.projects.text1"),
      text2: t("home.numbers.items.projects.text2"),
      plus: true,
      color: "bg-[#5653B7]",
      lightColor: "bg-[#35D5D0]/15",
    },
    {
      count: 98,
      text1: t("home.numbers.items.awards.text1"),
      text2: t("home.numbers.items.awards.text2"),
      bottom: true,
      color: "bg-[#B46CA7]",
      lightColor: "bg-[#252525]/13",
    },
  ];

  return (
    <div
      data-nav-color="black"
      className={`section ${
        isRtl ? "font-cairo" : "font-hero-light"
      } my-10 md:my-0 flex flex-col mx-auto md:h-screen z-10 w-[98%] sm:w-[95%] md:w-6/7 justify-center px-4 md:px-0`}
    >
      <div className="texts text-center ">
        <div data-aos="fade-up" data-aos-delay="50">
          <TikitTitle
            title={t("home.numbers.headline")}
            mainWord={t("home.numbers.mainWord")}
          />
        </div>
        <h3
          className="text-sm sm:text-base md:text-lg lg:text-[25px] font-light px-4 md:px-0 max-w-4xl mx-auto text-[var(--foreground)]"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {t("home.numbers.subheadline")}
        </h3>

        <div className="numbers relative mt-6 md:mt-8">
          {/* Mobile Layout - 2x2 Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:hidden">
            {data.map(
              (
                { count, text1, text2, bottom, plus, color, lightColor },
                idx
              ) => (
                <div
                  key={idx}
                  className={`circle w-full  aspect-square max-w-[140px]  sm:max-w-[160px] mx-auto rounded-full text-center flex flex-col items-center justify-center backdrop-blur-lg  ${lightColor}  dark:bg-[#e9e7e518] dark:border-[#ffffff10] `}
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  <span className="font-light  text-center flex items-center text-2xl sm:text-3xl text-[var(--foreground)] ">
                    <CountUp
                      from={0}
                      to={count}
                      separator=","
                      direction="up"
                      duration={1}
                      className="count-up-text"
                    />
                    {plus ? "+" : ""}
                  </span>
                  <h2 className="text-xs sm:text-sm leading-tight mt-1 text-[var(--foreground)]">
                    {text1} <br /> {text2}
                  </h2>
                </div>
              )
            )}
          </div>

          {/* Desktop Layout - Flex with alternating heights */}
          <div className="hidden md:flex justify-center items-stretch h-[45vh] gap-4 lg:gap-6">
            {data.map(
              (
                {
                  count,
                  text1,
                  text2,
                  bottom,
                  plus,
                  color,
                  lightColor,
                  borderColor,
                },
                idx
              ) => (
                <div
                  key={idx}
                  className={`circle shadow-2xl w-[160px] h-[160px] lg:w-[180px] lg:h-[180px] xl:w-[200px] xl:h-[200px] rounded-full text-center flex flex-col items-center justify-center backdrop-blur-lg  ${lightColor} ${borderColor}  ${
                    bottom ? "self-end" : "self-start"
                  }`}
                  data-aos="fade-up"
                  data-aos-delay={idx * 200}
                >
                  <span className="font-light text-center h-[50px] lg:h-[60px] xl:h-[65px] flex items-center text-3xl lg:text-4xl xl:text-[46px] text-[var(--foreground)]">
                    <CountUp
                      from={0}
                      to={count}
                      separator=","
                      direction="up"
                      duration={1}
                      className="count-up-text"
                    />
                    {plus ? "+" : ""}
                  </span>
                  <h2 className="text-sm lg:text-base xl:text-[16px] leading-tight text-[var(--foreground)]">
                    {text1} <br /> {text2}
                  </h2>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

Numbers.displayName = "Numbers";

export default Numbers;
