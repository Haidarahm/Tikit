import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../store/ThemeContext.jsx";
import "./work.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../../components/Footer";
import ContactUs from "../Home/ContactUs";
import GradientText from "../../components/GradientText";
import { useWorkStore } from "../../store/workStore";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { works, loadWorks, loading } = useWorkStore();
  const { language, isRtl } = useI18nLanguage();
  const { t } = useTranslation();
  const imagesRef = useRef([]);
  const paragraphContainerRef = useRef(null);
  const paragraphRef = useRef(null);
  const titleContainerRef = useRef(null);
  const titleRef = useRef(null);
  const descTitleWrapRef = useRef(null);
  const descTitleRef = useRef(null);
  const descParaWrapRef = useRef(null);
  const descParaRef = useRef(null);

  const gradientColors =
    theme === "light"
      ? ["#52C3C5", "#5269C5", "#52C3C5", "#52A0C5", "#52C3C5"] // Light theme colors
      : ["#07D9F5", "#06AEC4", "#4E7CC6", "#CE88C6", "#FB8DEF"]; // Dark theme colors (original)

  useEffect(() => {
    loadWorks({ lang: language, page: 1, per_page: 10 });
  }, [loadWorks, language]);

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const start = isMobile ? "top 80%" : "top 90%";
    const end = isMobile ? "top 60%" : "top 20%";

    imagesRef.current.forEach((el) => {
      gsap.fromTo(
        el,
        { height: "10%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: 0.5,
          },
        }
      );
    });
  }, [works]);

  useLayoutEffect(() => {
    if (!titleContainerRef.current || !titleRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: "150%", autoAlpha: 1 },
        { y: 0, duration: 0.9, ease: "power2.out", delay: 0.1 }
      );
    }, titleContainerRef);
    return () => ctx.revert();
  }, []);

  // Animate description (title then paragraph) after main title
  useLayoutEffect(() => {
    if (!descTitleRef.current || !descParaRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        descTitleRef.current,
        { y: "150%", autoAlpha: 1 },
        { y: 0, duration: 0.8, ease: "power2.out", delay: 0.4 }
      );
      gsap.fromTo(
        descParaRef.current,
        { y: "150%", autoAlpha: 1 },
        { y: 0, duration: 0.9, ease: "power2.out", delay: 0.55 }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!paragraphContainerRef.current || !paragraphRef.current) return;
    gsap.set(paragraphRef.current, { yPercent: 100, opacity: 1 });
    gsap.to(paragraphRef.current, {
      yPercent: 0,
      duration: 0.9,
      ease: "power2.out",
      delay: 0.5,
    });
  }, []);

  return (
    <div
      className={`work-section flex flex-col h-[calc(100%+10vh)] ${
        isRtl ? "font-cairo" : "font-hero-light"
      }`}
    >
      <div className="h-[50vh] md:h-[70vh] flex flex-col justify-around items-center w-full description  mt-[104px]">
        <div className="w-full"></div>
        <div ref={titleContainerRef} className="overflow-hidden">
          <div
            ref={titleRef}
            className="title will-change-transform translate-y-full"
          >
            <GradientText
              colors={gradientColors}
              animationSpeed={5}
              showBorder={false}
              className="text-[42px] md:text-[96px] leading-[40px] md:leading-[150px] mb-8 capitalize font-bold"
            >
              {t("work.title")}
            </GradientText>
          </div>
        </div>
        <div
          className={`description w-full relative z-30 flex md:flex-row flex-col text-[var(--foreground)] px-[20px] md:px-[30px] gap-4 md:gap-12 justify-center items-center ${
            isRtl
              ? "text-center md:text-end md:flex-row-reverse"
              : " text-center md:text-start"
          }`}
        >
          <div ref={descTitleWrapRef} className="overflow-hidden  md:w-[20%]">
            <div
              ref={descTitleRef}
              className="title font-bold mt-4 md:mt-0 text-[20px] md:text-[24px] will-change-transform translate-y-full"
            >
              {t("work.specialTitle")}
            </div>
          </div>
          <div ref={descParaWrapRef} className="overflow-hidden">
            <div
              ref={descParaRef}
              className="paragraph text-[16px] md:text-[22px] will-change-transform translate-y-full"
            >
              {t("work.specialDescription")}
            </div>
          </div>
        </div>
        {/* <div ref={paragraphContainerRef} className="overflow-hidden">
          <p
            ref={paragraphRef}
            className="paragraph font-light text-[16px] md:text-[32px] md:w-[900px] text-center leading-[40px]"
          >
            We take a similar approach to design commercial we do impactfully
            approache, over the flowchart of user friendly wireframe.
          </p>
        </div> */}
      </div>

      {/* Image Grid (fetched) */}
      <div className="images grid grid-cols-1 md:grid-cols-2 grid-rows-4 gap-4 md:h-[300vh] p-4">
        {(works || []).map((w, i) => (
          <div
            key={w.id ?? i}
            ref={(el) => (imagesRef.current[i] = el)}
            className="group relative shadow-lg  rounded-lg overflow-hidden"
            style={{ height: "10%" }}
          >
            {w.media ? (
              <img
                src={w.media}
                alt={w.title ?? "work"}
                className="w-full h-full object-cover  rounded-lg"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-[var(--muted)]" />
            )}

            {/* Overlay: only title & subtitle */}
            <div className=" content-work absolute  inset-0 flex flex-col items-center overflow-hidden justify-center bg-black/30 md:bg-black/60 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
              {w.title ? (
                <h3 className="text-white text-[30px] font-bold text-center ">{w.title}</h3>
              ) : null}
              {w.subtitle ? (
                <p className="text-gray-200 text-[20px] mb-4">{w.subtitle}</p>
              ) : null}
              <button
                className="px-4 py-2 rounded-full border border-white bg-transparent text-white hover:bg-white hover:text-black transition"
                onClick={() => {
                  const id = w.id;
                  if (id != null)
                    navigate(`/details/${encodeURIComponent(id)}`);
                }}
              >
                {t("work.viewWork")}
              </button>
            </div>
          </div>
        ))}
        {(!works || works.length === 0) && !loading ? (
          <div className="col-span-full text-center text-sm opacity-70">
            {t("work.noWorks")}
          </div>
        ) : null}
      </div>
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Work;

/* work.css */
