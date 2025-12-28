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

  /* =====================
     LOAD DATA - Deferred until component is near viewport
  ====================== */
  useEffect(() => {
    if (!sectionRef.current) return;

    // Use IntersectionObserver to load data when component is about to be visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadCases(language);
            observer.disconnect(); // Only load once
          }
        });
      },
      {
        rootMargin: '200px', // Start loading 200px before component is visible
        threshold: 0.01,
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [language, loadCases]);

  /* =====================
     MAP DATA
  ====================== */
  const showcaseData = useMemo(() => {
    if (!Array.isArray(cases) || cases.length === 0) return [];

    return cases.map((item) => ({
      id: item.id,
      img:
        (Array.isArray(item.media) && item.media.length > 0
          ? item.media[0]
          : item.logo) || "",
      title: item.title,
      subtitle: item.subtitle,
      size: "small",
    }));
  }, [cases]);

  /* =====================
     GSAP ANIMATIONS
  ====================== */
  useEffect(() => {
    if (!sectionRef.current || loading || showcaseData.length === 0) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".showcase-card");
      if (!cards.length) return;

      const clipVariants = [
        "inset(0% 100% 0% 0% round 160px)",
        "inset(0% 0% 0% 100% round 160px)",
        "inset(100% 0% 0% 0% round 140px)",
      ];

      cards.forEach((card, index) => {
        const media = card.querySelector(".showcase-card_media");
        const content = card.querySelector(".action-content");

        gsap.set(card, {
          clipPath: clipVariants[index] || clipVariants[2],
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

        gsap
          .timeline({
            scrollTrigger: {
              trigger: card,
              start: isMobile ? "top 95%" : "top 85%",
              end: isMobile ? "top 55%" : "top 5%",
              scrub: 2.6,
            },
          })
          .to(card, {
            clipPath: "inset(0% 0% 0% 0% round 18px)",
            opacity: 1,
            duration: 6,
            ease: "power4.out",
          })
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

  /* =====================
     RENDER
  ====================== */
  return (
    <div
      ref={sectionRef}
      className="
        relative flex flex-col
        w-[98vw] mt-[30px]
        sm:w-[96vw] md:w-[95vw]
        gap-4 md:gap-8
        overflow-hidden
        h-auto
        md:h-[1400px]
        mx-auto
      "
    >
      {/* TITLE */}
      <div
        data-nav-color="black"
        className="flex flex-col w-full items-center min-h-[200px] px-4 text-center gap-4"
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
        className="
          w-full grid
          grid-cols-1
          md:grid-cols-2
          gap-4
          h-auto
          md:h-[1200px]
          items-stretch
        "
      >
        {loading || showcaseData.length === 0
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="relative showcase-card h-[420px] sm:h-[480px] md:h-auto rounded-[10px] overflow-hidden md:rounded-[15px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-300/70 via-slate-200/60 to-slate-100/40 animate-pulse" />
              </div>
            ))
          : showcaseData.map((item) => (
              <div
                key={item.id}
                className={`
                  relative showcase-card
                  rounded-[10px] overflow-hidden
                  md:rounded-[15px]
                  h-[420px] sm:h-[480px] md:h-full
                  w-full
                  ${item.size === "large" ? "md:col-span-2" : "col-span-1"}
                `}
              >
                <div
                  className="showcase-card_media absolute inset-0 rounded-[10px] md:rounded-[15px]"
                  style={{ 
                    backgroundImage: `url(${item.img})`,
                    width: '100%',
                    height: '100%',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                />

                {/* Black gradient overlay for enhanced visual depth */}
                <div className="absolute inset-0 rounded-[10px] md:rounded-[15px] bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none z-[1]" />

                <div
                  className="
                    absolute
                    py-[10px] md:py-[13px]
                    flex justify-center
                    w-[90%] md:w-[60%]
                    bottom-[20px] md:bottom-[35px]
                    z-10 left-1/2 -translate-x-1/2
                  "
                >
                  <div className="action-content text-white flex flex-col items-center gap-[18px] md:gap-[25px]">
                    <div className="text-center">
                      <h2 className="text-[22px] sm:text-[26px] md:text-[40px] font-[700] font-antonio">
                        {item.title}
                      </h2>
                      <h3 className="text-[13px] sm:text-[15px] md:text-[20px] font-[200]">
                        {item.subtitle}
                      </h3>
                    </div>

                    <button
                      onClick={() => navigate(`/showcase/${item.id}`)}
                      className="
                        text-[14px] sm:text-[15px] md:text-[20px]
                        px-[10px] py-[5px]
                        border border-white rounded-[10px]
                        transition-all duration-300
                        hover:bg-white hover:text-black
                      "
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
