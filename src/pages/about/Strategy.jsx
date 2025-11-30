import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TickWhite from "../../assets/TickWhite";
import TextChanger from "../../components/TextChanger";
import { useTheme } from "../../store/ThemeContext";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext";

gsap.registerPlugin(ScrollTrigger);

const Strategy = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

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

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.set(titleRef.current, {
          opacity: 0,
          y: 18,
        });

        ScrollTrigger.create({
          trigger: titleRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(titleRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            });
          },
        });
      }

      // Card reveal animations
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        const titleEl = card.querySelector(".card-title");
        const descEl = card.querySelector(".card-desc");

        // Card scale animation
        gsap.set(card, {
          scaleX: 0,
          transformOrigin: "left center",
        });

        ScrollTrigger.create({
          trigger: card,
          start: "top 80%",
          onEnter: () => {
            gsap.to(card, {
              scaleX: 1,
              duration: 0.8,
              ease: "power2.inOut",
            });
          },
        });

        // Title animation
        if (titleEl) {
          gsap.set(titleEl, {
            opacity: 0,
            y: 18,
          });

          ScrollTrigger.create({
            trigger: card,
            start: "top 80%",
            onEnter: () => {
              gsap.to(titleEl, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: 0.3 + i * 0.12,
                ease: "power2.out",
              });
            },
          });
        }

        // Description animation
        if (descEl) {
          gsap.set(descEl, {
            opacity: 0,
            y: 18,
          });

          ScrollTrigger.create({
            trigger: card,
            start: "top 80%",
            onEnter: () => {
              gsap.to(descEl, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: 0.45 + i * 0.12,
                ease: "power2.out",
              });
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`text-[var(--foreground)] ${
        isRtl ? "font-cairo" : "font-hero-light"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div
        ref={titleRef}
        className="title text-[28px] sm:text-[40px] md:text-[70px] capitalize text-center my-[40px] md:my-[80px] loco-text-up px-4"
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
              textClassName={`bg-gradient-to-r ${isRtl ? "font-cairo" : "font-antonio"} font-bold from-[#07D9F5] to-[#E84B43] bg-clip-text text-transparent`}
            />
          </h1>
        </div>
      </div>
      <div className="container-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 md:mt-10 px-4 md:px-6">
        {cards.map((card, i) => (
          <div
            key={String(i)}
            ref={(el) => (cardsRef.current[i] = el)}
            className={`relative rounded-[14px] overflow-hidden col-span-2 row-span-1 border border-white/10 hover:border-white/20 transition-colors loco-reveal-card`}
            style={{
              background: `radial-gradient(circle at center, #D9D9D966, #${card.lightColor}66)`,
            }}
          >
            {/* Radial gradient background with subtle blur from card color to white */}
            <div className="pointer-events-none absolute inset-0 z-0 blur-[24px] opacity-70" />
            <div className="p-4 md:px-4 md:py-8 relative z-10">
              <div className="card-title text-[22px] font-antonio text-[var(--foreground)] sm:text-[28px] md:text-[36px] font-semibold mb-2 loco-text-up">
                <TickWhite
                  color={theme === "light" ? "#ffffff" : "#ffffff"}
                  className=" w-[60px] md:w-[60px] inline-block h-[50x] px-4 md:px-2 md:h-[60px]"
                />
                {card.title}
              </div>
              <div className="card-desc text-[var(--foreground)] text-[16px] sm:text-[18px] md:text-[24px]  loco-text-up leading-[30px]">
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
