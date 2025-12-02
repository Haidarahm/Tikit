import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext";
import { FiBarChart2, FiPenTool, FiStar, FiZap } from "react-icons/fi";
import image3 from "../../assets/aboutus/about-3.webp";

gsap.registerPlugin(ScrollTrigger);

const DetailsBenefits = () => {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);
  const listRef = useRef(null);

  const benefits = [
    { num: "01", titleKey: "dataDriven", icon: FiBarChart2 },
    { num: "02", titleKey: "creative", icon: FiPenTool },
    { num: "03", titleKey: "authentic", icon: FiStar },
    { num: "04", titleKey: "innovative", icon: FiZap },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation - smooth fade in
      gsap.fromTo(
        titleRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Text animation
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Image reveal
      gsap.fromTo(
        imgRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: imgRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Image parallax on scroll
      gsap.to(imgRef.current?.querySelector("img"), {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Benefits list stagger
      const items = listRef.current?.querySelectorAll(".benefit-item");
      if (items?.length) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isRtl]);

  return (
    <section ref={sectionRef} dir={isRtl ? "rtl" : "ltr"} className="details-benefits py-16 md:py-18">
      <div className="flex flex-col lg:flex-row-reverse justify-between gap-8 md:gap-10 lg:gap-16 px-4 md:px-[60px] lg:px-[70px]">
        {/* Image */}
        <div
          ref={imgRef}
          className="w-full lg:w-1/2 h-[300px] md:h-[400px] lg:h-[600px] overflow-hidden rounded-xl md:rounded-2xl"
        >
          <img
            src={image3}
            alt="Our Mission"
            className="block w-full h-[120%] object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          {/* Section Title */}
          <h2
            ref={titleRef}
            className={`relative mb-6 md:mb-8 text-3xl md:text-4xl lg:text-6xl text-[var(--foreground)] uppercase font-bold ${
              isRtl ? "font-cairo text-right" : "font-antonio text-left"
            }`}
          >
            {t("about.details.mission.title")}{" "}
            <span className="bg-gradient-to-r from-[#1C6F6C] to-[#6ACBCC] bg-clip-text text-transparent">
              {t("about.details.mission.titleHighlight")}
            </span>
            <svg
              className={`section-title__square absolute w-[100px] h-[60px] md:w-[120px] md:h-[70px] lg:w-[160px] lg:h-[90px] -top-2 md:-top-4 lg:-top-6 -z-[1] opacity-20 ${
                isRtl ? "-left-2 md:-left-4 lg:-left-6" : "-right-2 md:-right-4 lg:-right-6"
              }`}
              viewBox="0 0 196 140"
              fill="none"
            >
              <path
                d="M196,3.48V52.73a10.43,10.43,0,0,1-2.55,6.85,10.06,10.06,0,0,1-2.23,1.93l-80.6,51.08L67.43,140a6.5,6.5,0,0,1-8.26-1.05L4.27,81A15.76,15.76,0,0,1,0,70.17V21.89a3.63,3.63,0,0,1,6.21-2.66L62.3,76.28a5.69,5.69,0,0,0,7.13.84L190.85.52A3.38,3.38,0,0,1,196,3.48Z"
                stroke="#1C6F6C"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </h2>

          <div ref={textRef} className={`space-y-4 md:space-y-5 mb-6 md:mb-8 ${isRtl ? "font-cairo" : "font-hero-light"}`}>
            <p className="text-sm md:text-base lg:text-lg leading-relaxed text-[var(--foreground)] dark:text-[var(--foreground)]/70">
              {t("about.details.mission.paragraph1")}
            </p>
            <p className="text-sm md:text-base lg:text-lg leading-relaxed text-[var(--foreground)] dark:text-[var(--foreground)]/70">
              {t("about.details.mission.paragraph2")}
            </p>
          </div>

          {/* Benefits Grid */}
          <div ref={listRef} className="grid grid-cols-2 gap-3 md:gap-4">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="benefit-item p-3 md:p-4 rounded-lg md:rounded-xl border border-[#6ACBCC]/20 bg-[#6ACBCC]/5 hover:bg-[#6ACBCC]/10 hover:border-[#6ACBCC]/40 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#6ACBCC]/10 flex items-center justify-center mb-2 md:mb-3 group-hover:bg-[#6ACBCC]/20 transition-colors duration-300">
                    <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-[#6ACBCC]" />
                  </div>
                  <span className="text-xs text-[#6ACBCC] font-medium">
                    {benefit.num}
                  </span>
                  <h3 className={`text-sm md:text-base lg:text-lg font-bold text-[var(--foreground)] ${isRtl ? "font-cairo" : "font-hero-light"}`}>
                    {t(`about.details.mission.benefits.${benefit.titleKey}`)}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsBenefits;
