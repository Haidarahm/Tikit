import React, { useEffect, useState } from "react";
import FloatingInput from "../../components/ui/FloatingInput";
import Hyperspeed from "../../components/Hyperspeed";
import LogoLoop from "../../components/LogoLoop";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import b1 from "../../assets/brands/1.svg";
import b2 from "../../assets/brands/2.svg";
import b3 from "../../assets/brands/3.svg";
import b4 from "../../assets/brands/4.svg";
import b5 from "../../assets/brands/5.svg";
import b1Light from "../../assets/brands/1-light.svg";
import b2Light from "../../assets/brands/2-light.svg";
import b3Light from "../../assets/brands/3-light.svg";
import b4Light from "../../assets/brands/4-light.svg";
import b5Light from "../../assets/brands/5-light.svg";
import GradientText from "../../components/GradientText";
import { useTheme } from "../../store/ThemeContext";

const ContactUs = ({ className = "" }) => {
  const [isSecondSlide, setIsSecondSlide] = useState(false);

  const handleSlideClick = (slideNumber) => {
    setIsSecondSlide(slideNumber === 2);
  };
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();

  const gradientColors =
    theme === "light"
      ? ["#52C3C5", "#5269C5", "#52C3C5", "#52A0C5", "#52C3C5"] // Light theme colors
      : ["#07D9F5", "#06AEC4", "#4E7CC6", "#CE88C6", "#FB8DEF"]; // Dark theme colors (original)

  useEffect(() => {
    AOS.init({ duration: 750, once: true });
  }, []);
  // const techLogos = [
  //   { node: <SiReact />, title: "React", href: "https://react.dev" },
  //   { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  //   {
  //     node: <SiTypescript />,
  //     title: "TypeScript",
  //     href: "https://www.typescriptlang.org",
  //   },
  //   {
  //     node: <SiTailwindcss />,
  //     title: "Tailwind CSS",
  //     href: "https://tailwindcss.com",
  //   },
  // ];

  // Alternative with image sources
  const imageLogos =
    theme === "light"
      ? [
          { src: b1Light, alt: "Brand 1" },
          { src: b2Light, alt: "Brand 2" },
          { src: b3Light, alt: "Brand 3" },
          { src: b4Light, alt: "Brand 4" },
          { src: b5Light, alt: "Brand 5" },
        ]
      : [
          { src: b1, alt: "Brand 1" },
          { src: b2, alt: "Brand 2" },
          { src: b3, alt: "Brand 3" },
          { src: b4, alt: "Brand 4" },
          { src: b5, alt: "Brand 5" },
        ];
  // "bg-[#F5F7FB] text-[var(--foreground)] border border-black/5"
  return (
    <div
      data-scroll-section
      className={`relative my-5 md:my-10 gap-3.5  overflow-hidden text-[var(--foreground)] ${
        isRtl ? "font-cairo" : "font-hero-light"
      } rounded-[25px] flex flex-col mx-auto py-[40px] md:py-[60px] px-[40px] md:px-[50px]  w-[95vw] bg-[#F5F7FB]  dark:bg-black ${className}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="email  w-full flex flex-col md:flex-row h-2/3 justify-between items-center md:items-stretch relative z-10 ">
        <div className="texts flex justify-between flex-col relative   ">
          <h3
            className="subtitle text-center md:text-start text-[16px] md:text-[50px]"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            {t("home.contactUs.subtitle")}
          </h3>
          <GradientText
            // colors={["#07D9F5", "#06AEC4", "#4E7CC6", "#CE88C6", "#FB8DEF"]}
            colors={gradientColors}
            animationSpeed={5}
            showBorder={false}
            className="title text-[32px] text-center md:text-start md:text-[70px] font-bold "
          >
            {t("home.contactUs.title")}{" "}
          </GradientText>

          <p
            className="description  hidden md:block text-[16px] md:text-[24px] font-light w-full"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {t("home.contactUs.description")} <br className="hidden md:block" />{" "}
            {t("home.contactUs.description2")}
          </p>
        </div>
        <div
          className="action w-full md:w-[45%] gap-[20px] md:gap-0 flex-col flex justify-between"
          data-aos="fade-left"
          data-aos-delay="0"
        >
          <div className="title text-center font-light md:font-medium md:text-start text-[20px] md:text-[24px]">
            {t("home.contactUs.helpText")}
          </div>
          <div
            className={`swiper-wrapper w-full border flex ${
              isRtl ? "flex-row-reverse" : ""
            } relative border-[var(--secondary)]  h-[50px] rounded-full`}
          >
            <div
              className={`move-item absolute  w-1/2 h-full bg-[var(--secondary)] rounded-full transition-all duration-300 ease-in-out ${
                isSecondSlide
                  ? isRtl
                    ? "right-0"
                    : "left-1/2"
                  : isRtl
                  ? "right-1/2"
                  : "left-0"
              }`}
            />
            <div
              className={`swiper-slide w-1/2 flex justify-center items-center relative z-10 cursor-pointer ${
                !isSecondSlide
                  ? "text-[var(--background)]"
                  : "text-[var(--foreground)] "
              }`}
              onClick={() => handleSlideClick(1)}
            >
              {t("home.contactUs.client")}
            </div>
            <div
              className={`swiper-slide w-1/2 flex justify-center items-center relative z-10 cursor-pointer ${
                isSecondSlide
                  ? "text-[var(--background)]"
                  : "text-[var(--foreground)] "
              }`}
              onClick={() => handleSlideClick(2)}
            >
              {t("home.contactUs.influencer")}
            </div>
          </div>
          <div className="inputs flex justify-between gap-[20px]">
            <FloatingInput
              id="name"
              label={t("home.contactUs.name")}
              containerClassName="mt-8 flex-1 hidden md:block"
            />
            <FloatingInput
              id="email"
              label={t("home.contactUs.email")}
              containerClassName="mt-8 flex-1"
            />
          </div>
          <button className="px-5 h-12 md:h-14 cursor-pointer relative col-span-1 sm:col-span-2 rounded-full group  font-medium bg-transparent text-[var(--secondary)] border border-[var(--secondary)] flex items-center justify-center transition-all hover:scale-105 overflow-hidden">
            <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out rounded-full transform translate-y-0 bg-[var(--secondary)]  group-hover:h-full opacity-90"></span>
            <span className="relative uppercase group-hover:text-[var(--background)]  text-sm md:text-base font-semibold">
              {t("home.contactUs.button")}
            </span>
          </button>
        </div>
      </div>
      <div className="brands flex-1 w-full relative z-10">
        <div className="flex w-full justify-between items-center gap-4 mb-4">
          <div className="h-[1px] w-[42%] bg-gray-400"></div>

          <div className="title font-light text-[14px] text-center">
            {t("home.contactUs.brandsTrust")}
          </div>

          <div className="h-[1px] w-[42%] bg-gray-400"></div>
        </div>
        <div
          style={{
            height: "120px",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
          }}
        >
          <LogoLoop
            logos={imageLogos}
            speed={50}
            direction={isRtl ? "right" : "left"}
            logoHeight={70}
            gap={150}
            pauseOnHover
            scaleOnHover
            className={isRtl ? "flex-row-reverse" : ""}
            fadeOut
            fadeOutColor={theme === "light" ? "#F5F7FB" : "#000"}
            ariaLabel="Brand partners"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
