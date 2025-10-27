import React, { useEffect, useRef } from "react";
import ScrollFloat from "../../components/ScrollFloat";
import AOS from "aos";
import "aos/dist/aos.css";
import element1Dark from "../../assets/elements/6.png";
import element2Dark from "../../assets/elements/5.png";
import element2 from "../../assets/elements/2-light.png";
import element1 from "../../assets/elements/1-light.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GradientText from "../../components/GradientText";
import { useTheme } from "../../store/ThemeContext.jsx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
gsap.registerPlugin(ScrollTrigger);

// Helper function to split text into words
const splitText = (text) => {
  return text.split(" ");
};

const Connections = () => {
  const navigate = useNavigate();
  const sectionContainerRef = useRef(null);
  const { theme } = useTheme();
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
      top: "900px",
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
      top: "90vh",
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

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
      easing: "ease-out-cubic",
      mirror: true,
    });
  }, []);

  return (
    <div
      ref={sectionContainerRef}
      className={`relative text-[var(--foreground)] dark:text-white md:h-[100vh] flex flex-col w-full justify-center ${
        isRtl ? "font-cairo" : "font-hero-light"
      } section-container-scroll md:mt-[20px]`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <img
        src={theme === "light" ? element2 : element2Dark}
        alt="Decorative element 1"
        className="element1-c hidden md:block absolute top-4 left-8 z-0  dark:grayscale-75 w-auto h-auto max-w-[300px] max-h-[300px]"
      />
      {/* Element 2 */}
      <img
        src={theme === "light" ? element1 : element1Dark}
        alt="Decorative element 2"
        className="element2-c absolute hidden md:block top-[55vh] right-12  dark:grayscale-75 rotate-90 z-0 w-auto h-auto max-w-[300px] max-h-[300px]"
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
          <GradientText
            colors={gradientColors}
            animationSpeed={5}
            showBorder={false}
            className="gradient-text pointer-events-none text-[32px] md:text-[64px] capitalize font-bold max-w-[600px]"
          >
            {t("home.connections.headline")}
          </GradientText>
        </div>

        <p
          className="description pointer-events-none text-[16px] md:text-[32px] font-light leading-[35px] mt-[20px] text-[var(--foreground)] dark:text-white"
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
            navigate("/contact");
          }}
          className="uppercase mt-[40px]
         text-[11px] md:text-[16px] hover:text-[var(--foreground)]
          dark:hover:text-white hover:bg-transparent border
           border-[var(--foreground)] dark:border-white transition
            cursor-pointer py-1 bg-[var(--foreground)] dark:bg-white
             rounded-full px-4 text-[var(--background)]
             dark:hover:bg-transparent
              dark:text-black w-fit"
        >
          {t("home.connections.cta")}
        </button>
      </div>
    </div>
  );
};

export default Connections;
