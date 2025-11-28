import React from "react";
import TickWhite from "../../assets/TickWhite";
import TextChanger from "../../components/TextChanger";
import { useTheme } from "../../store/ThemeContext";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext";

const Strategy = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();

  const translatedCards =
    t("about.strategy.cards", { returnObjects: true }) || [];

  const cards = [
    {
      ...translatedCards[0],
      color: "548099", // sky-500
      lightColor: "23D5D0",
    },
    {
      ...translatedCards[1],
      color: "E84B43", // violet-400
      lightColor: "E84B43",
    },
    {
      ...translatedCards[2],
      color: "483CB3", // orange-500
      lightColor: "FFBFA4",
    },
    {
      ...translatedCards[3],
      color: "B46CA7", // green-500
      lightColor: "252525",
    },
  ];
  return (
    <div
      data-scroll-section
      className={`text-[var(--foreground)] ${
        isRtl ? "font-cairo" : "font-hero-light"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div
        className="title text-[28px] sm:text-[40px] md:text-[70px] capitalize text-center my-[40px] md:my-[80px] loco-text-up px-4"
        data-scroll
        data-scroll-class="is-inview"
        data-scroll-repeat
      >
        {t("about.strategy.title")}
        <div className="flex justify-center text-[var(--foreground)] md:h-[75px] items-center">
          <span className="transition">{t("about.strategy.subtitle")}</span>
          <h1 className=" font-bold  overflow-hidden flex items-center ml-4 mr-4">
            <TextChanger
              texts={
                t("about.strategy.rotatingTexts", { returnObjects: true }) || []
              }
              duration={3}
              diagonal={false}
              textClassName="bg-gradient-to-r font-antonio font-bold from-[#07D9F5] to-[#E84B43] bg-clip-text text-transparent"
            />
          </h1>
          {/* <RotatingText
          
            texts={["expert strategy", "creative firepower", "flawless execution"]}
            mainClassName=" bg-gradient-text px-2 sm:px-2 md:px-3 text-white font-bold text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={3000}
          /> */}
        </div>
      </div>
      <div className="container-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 md:mt-10 px-4 md:px-6">
        {cards.map((card, i) => (
          <div
            key={String(i)}
            className={`relative rounded-[14px] overflow-hidden col-span-2 row-span-1 border border-white/10 hover:border-white/20 transition-colors loco-reveal-card`}
            style={{
              background: `radial-gradient(circle at center, #D9D9D966, #${card.lightColor}66)`,
            }}
            data-scroll
            data-scroll-class="is-inview"
            data-scroll-repeat
          >
            {/* Radial gradient background with subtle blur from card color to white */}
            <div className="pointer-events-none absolute inset-0 z-0 blur-[24px] opacity-70" />
            <div className="p-4 md:px-4 md:py-8 relative z-10">
              <div
                className="text-[22px] font-antonio text-[var(--foreground)] sm:text-[28px] md:text-[36px] font-semibold mb-2 loco-text-up"
                data-scroll
                data-scroll-class="is-inview"
                data-scroll-repeat
                style={{ transitionDelay: `${300 + i * 120}ms` }}
              >
                <TickWhite
                  color={theme === "light" ? "#52C3C5" : "#ffffff"}
                  className=" w-[60px] md:w-[60px] inline-block h-[50x] px-4 md:px-2 md:h-[60px]"
                />
                {card.title}
              </div>
              <div
                className=" text-[var(--foreground)] text-[16px] sm:text-[18px] md:text-[24px]  loco-text-up leading-[30px]"
                data-scroll
                data-scroll-class="is-inview"
                data-scroll-repeat
                style={{ transitionDelay: `${450 + i * 120}ms` }}
              >
                {card.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Strategy;
