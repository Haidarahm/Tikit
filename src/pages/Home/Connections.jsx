import React, { useEffect, useRef, memo } from "react";
import ScrollFloat from "../../components/ScrollFloat";
import element1Dark from "../../assets/elements/6.webp";
import element2Dark from "../../assets/elements/5.webp";
import element2 from "../../assets/elements/2-light.webp";
import element1 from "../../assets/elements/1-light.webp";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../../store/ThemeContext.jsx";
import { useClient } from "../../store/ClientContext.jsx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import TikitTitle from "../../components/TikitTitle.jsx";

gsap.registerPlugin(ScrollTrigger);

const Connections = memo(() => {
  const navigate = useNavigate();
  const sectionContainerRef = useRef(null);
  const { theme } = useTheme();
  const { setClientType } = useClient();
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();

  // Define gradient colors based on theme
  const gradientColors =
    theme === "light"
      ? ["#52C3C5", "#5269C5", "#52C3C5", "#52A0C5", "#52C3C5"] // Light theme colors
      : ["#07D9F5", "#06AEC4", "#4E7CC6", "#CE88C6", "#FB8DEF"]; // Dark theme colors (original)

  // GSAP animations scoped to section container
  useEffect(() => {
    const scrollerEl = sectionContainerRef.current;
    if (!scrollerEl) return;

    const element1Tween = gsap.to(".element1-c", {
      top: "400px",
      left: "1000px",
      rotation: 100,
      duration: 1.5,
      filter: "blur(5px)",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: scrollerEl,
        start: "top 0%",
        end: "bottom 0%",
        scrub: 1.5,
      },
    });

    const element2Tween = gsap.to(".element2-c", {
      top: "50vh",
      right: "70%",
      rotation: 100,
      duration: 1.5,
      filter: "blur(5px)",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: scrollerEl,
        start: "top 0%",
        end: "bottom 0%",
        scrub: 1.5,
      },
    });

    ScrollTrigger.refresh();

    return () => {
      element1Tween?.scrollTrigger?.kill();
      element2Tween?.scrollTrigger?.kill();
    };
  }, []);

  return (
    <div
      ref={sectionContainerRef}
      className={`relative text-[var(--foreground)] dark:text-white md:h-[60vh] flex flex-col w-full justify-center ${
        isRtl ? "font-cairo" : "font-hero-light"
      } section-container-scroll md:mt-[20px]`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <img
        src={theme === "light" ? element2 : element2Dark}
        alt="Decorative element 1"
        width={300}
        height={300}
        className="element1-c hidden md:block absolute top-4 left-8 z-0  dark:grayscale-75 w-auto h-auto max-w-[300px] max-h-[300px] object-contain"
        loading="lazy"
      />
      {/* Element 2 */}
      <img
        src={theme === "light" ? element1 : element1Dark}
        alt="Decorative element 2"
        width={300}
        height={300}
        className="element2-c absolute hidden md:block top-[40vh] right-12  dark:grayscale-75 rotate-90 z-0 w-auto h-auto max-w-[300px] max-h-[300px] object-contain"
        loading="lazy"
      />
      <div className="flex items-center flex-col justify-center relative z-10 w-[90vw] md:w-[80vw] mx-auto text-center">
        {isRtl ? (
          <h1 className="text-[24px] md:h-[55px] md:text-[35px] pointer-events-none max-w-[600px] text-[var(--foreground)] dark:text-white">
            {t("home.connections.question")}
          </h1>
        ) : (
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            textClassName="text-[24px] md:h-[55px] md:text-[35px] pointer-events-none max-w-[600px] text-[var(--foreground)] dark:text-white"
            scrollStart="center bottom+=20%"
            scrollEnd="bottom bottom-=50%"
            stagger={0.06}
          >
            {t("home.connections.question")}
          </ScrollFloat>
        )}
        <div 
          data-aos={isRtl ? "fade-right" : "fade-left"}
          data-aos-duration="900"
          data-aos-easing="ease-out-cubic"
          data-aos-once="false"
          data-aos-offset="120"
        >
          <TikitTitle title={t("home.connections.headline")} mainWord={t("home.connections.mainWord")} />
          
        </div>

        <p
          className="description pointer-events-none text-[16px] md:text-[32px] font-light leading-[35px] md:mt-[20px] text-[var(--foreground)] dark:text-white"
          data-aos="fade-right"
          data-aos-duration="900"
          data-aos-easing="ease-out-cubic"
          data-aos-once="false"
          data-aos-offset="120"
        >
          {t("home.connections.description")}
        </p>
        <button
          onClick={() => {
            setClientType("influencer");
            // Set flag to scroll to action section
            sessionStorage.setItem("shouldScrollToAction", "true");
            navigate("/contact-us");
          }}
          className="bg-transparent mt-8 hover:text-[var(--background)] shadow-lg shadow-[#52C3C5]/30 font-bold dark:shadow-[#000]/30 hover:bg-[var(--secondary)] border-[var(--secondary)] text-[var(--secondary)] transition duration-75 ease-in border px-6 h-8 md:h-10 text-[14px] rounded-full uppercase"

        >
          {t("home.connections.joinNow")}
        </button>
      </div>
    </div>
  );
});

Connections.displayName = "Connections";

export default Connections;
