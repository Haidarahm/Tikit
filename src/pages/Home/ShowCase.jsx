import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import { useShowcaseStore } from "../../store/showcaseStore";
import { useNavigate } from "react-router-dom";
import TikitTitle from "../../components/TikitTitle";

gsap.registerPlugin(ScrollTrigger);

const ShowCase = () => {
  const sectionRef = useRef(null);
  const { t } = useTranslation();
  const { language } = useI18nLanguage();
  const { cases, loadCases, loading } = useShowcaseStore();
  const navigate = useNavigate();

  // Load showcase cases from API when language changes
  useEffect(() => {
    loadCases(language);
  }, [language, loadCases]);

  // Map API response into the structure used by the layout
  const showcaseData = useMemo(() => {
    if (!Array.isArray(cases) || cases.length === 0) {
      return [];
    }

    return cases.map((item) => ({
      id: item.id,
      img:
        (Array.isArray(item.media) && item.media.length > 0
          ? item.media[0]
          : item.logo) || "",
      title: item.title,
      subtitle: item.subtitle,
      size: "small", // keep existing layout
    }));
  }, [cases]);

  useEffect(() => {
    if (!sectionRef.current) return;
    // Don't attach GSAP effects while we're still loading or have no data
    if (loading || showcaseData.length === 0) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".showcase-card");
      if (!cards.length) return;

      const clipVariants = [
        "inset(0% 100% 0% 0% round 160px)", // first: left -> right
        "inset(0% 0% 0% 100% round 160px)", // second: right -> left
        "inset(100% 0% 0% 0% round 140px)", // third: bottom -> top
      ];

      cards.forEach((card, index) => {
        const media = card.querySelector(".showcase-card_media");
        const content = card.querySelector(".action-content");
        const seed =
          clipVariants[index] || clipVariants[clipVariants.length - 1];

        gsap.set(card, {
          clipPath: seed,
          opacity: 0.35,
        });
        if (media) {
          gsap.set(media, {
            scale: 1.22,
            rotate: index % 2 === 0 ? -3 : 3,
          });
        }
        if (content) {
          gsap.set(content, { autoAlpha: 0, y: 45 });
        }

        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        const startValue = isMobile ? "top 95%" : "top 85%";
        const endValue = isMobile ? "top 55%" : "top 5%";

        gsap
          .timeline({
            scrollTrigger: {
              trigger: card,
              start: startValue,
              end: endValue,
              scrub: 2.6,
              onRefresh: () => ScrollTrigger.update(),
            },
          })
          .to(
            card,
            {
              clipPath: "inset(0% 0% 0% 0% round 18px)",
              opacity: 1,
              duration: 6,
              ease: "power4.out",
            },
            0
          )
          .to(
            media,
            {
              scale: 1,
              rotate: 0,
              duration: 6,
              ease: "power3.out",
            },
            0
          )
          .to(
            content,
            {
              autoAlpha: 1,
              y: 0,
              duration: 4.2,
              ease: "power2.out",
            },
            "-=1.2"
          );
      });

      gsap.to(".showcase-card_media", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
        yPercent: 12,
        ease: "none",
      });

      ScrollTrigger.refresh(true);
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, showcaseData.length]);

  return (
    <div
      ref={sectionRef}
      className="relative flex flex-col w-[98vw] mt-[30px] sm:w-[96vw] md:w-[95vw] gap-4 md:gap-8 overflow-hidden md:h-[1400px] h-[1000px] mx-auto"
    >
      {/* TITLE */}
      <div
        data-nav-color="black"
        className="title text-[var(--foreground)] flex flex-col w-full justify-center items-center min-h-[200px] px-4 text-center gap-4"
      >
        <TikitTitle
          title={t("home.showcase.title")}

          mainWord={t("home.showcase.mainWord")}
        />
        <p className="text-base sm:text-lg md:text-xl lg:text-[24px] max-w-4xl">
          {t("home.showcase.description")}
        </p>
      </div>

      {/* GRID */}
      <div
        data-nav-color="white"
        className="md:h-[1200px] h-[800px] w-full grid grid-cols-2 gap-4 grid-rows-2"
      >
        {/* Show skeleton loader while loading or when no data */}
        {loading || showcaseData.length === 0
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="relative showcase-card rounded-[10px] overflow-hidden md:rounded-[15px] col-span-1"
              >
                {/* Skeleton media area */}
                <div className="showcase-card_media h-full w-full absolute rounded-[10px] inset-0 bg-gradient-to-br from-slate-300/70 via-slate-200/60 to-slate-100/40 dark:from-slate-800/70 dark:via-slate-700/60 dark:to-slate-600/40 animate-pulse" />

                {/* Skeleton content overlay */}
                <div className="absolute py-[13px] bg-white/10 rounded-[10px] backdrop-blur-md flex justify-center w-[80%] md:w-[60%] bottom-[35px] z-10 left-1/2 translate-x-[-50%]">
                  <div className="action-content items-center justify-center text-white flex gap-[18px] flex-col">
                    <div className="title-subtitle flex flex-col items-center w-full gap-2">
                      <div className="h-[26px] md:h-[34px] w-2/3 rounded-md bg-white/40 dark:bg-white/30 animate-pulse" />
                      <div className="h-[14px] md:h-[18px] w-1/2 rounded-md bg-white/30 dark:bg-white/20 animate-pulse" />
                    </div>

                    <div className="h-[30px] md:h-[40px] w-[140px] md:w-[170px] rounded-[10px] bg-white/30 dark:bg-white/20 animate-pulse" />
                  </div>
                </div>
              </div>
            ))
          : showcaseData.map((item) => (
              <div
                key={item.id}
                className={`
              relative showcase-card rounded-[10px] overflow-hidden md:rounded-[15px]
              ${item.size === "large" ? "col-span-2" : "col-span-1"}
            `}
              >
                <div
                  className="showcase-card_media  h-full w-full absolute rounded-[10px] inset-0 bg-center bg-cover"
                  style={{ backgroundImage: `url(${item.img})` }}
                  role="img"
                  aria-label={item.title}
                />

                {/* CONTENT */}
                <div className="absolute py-[13px] bg-white/10 rounded-[10px] backdrop-blur-md flex justify-center w-[80%] md:w-[60%] bottom-[35px] z-10 left-1/2 translate-x-[-50%]">
                  <div className="action-content items-center justify-center text-white flex gap-[25px] flex-col">
                    <div className="title-subtitle flex flex-col items-center">
                      <h2 className="text-[30px] text-center md:text-[40px] font-[700] font-antonio">
                        {item.title}
                      </h2>
                      <h3 className="text-[15px] md:text-[20px] font-[200]">
                        {item.subtitle}
                      </h3>
                    </div>

                    <button
                      onClick={() => navigate(`/showcase/${item.id}`)}
                      className="text-[15px] md:text-[20px] bg-transparent px-[10px] py-[5px] border border-white rounded-[10px] transition-all duration-300 ease-out hover:bg-white hover:text-black hover:-translate-y-[3px] hover:shadow-[0_15px_35px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                    >
                      View Project
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ShowCase;
