import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext";

gsap.registerPlugin(ScrollTrigger);

const serviceKeys = [
  "brandStrategy",
  "digitalMarketing",
  "socialMedia",
  "creativeDesign",
  "contentCreation",
  "influencerMarketing",
];

const DetailsServices = () => {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const listRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Service items stagger
      const items = listRef.current?.querySelectorAll(".serv-item");
      if (items?.length) {
        gsap.fromTo(
          items,
          { opacity: 0, x: isRtl ? 30 : -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // CTA section
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isRtl]);

  return (
    <section ref={sectionRef} dir={isRtl ? "rtl" : "ltr"} className="details-services py-16 md:py-18  px-4 md:px-[60px] lg:px-[70px]">
      {/* Section Title */}
      <div ref={titleRef} className="text-center mb-10 md:mb-16">
        <h2 className={`relative inline-block text-3xl md:text-4xl lg:text-6xl text-[var(--foreground)] uppercase font-bold ${isRtl ? "font-cairo" : "font-antonio"}`}>
          {t("about.details.services.title")}{" "}
          <span className="bg-gradient-to-r from-[#6ACBCC] to-[#1C6F6C] bg-clip-text text-transparent">
            {t("about.details.services.titleHighlight")}
          </span>
          <svg
            className="section-title__square absolute w-[100px] h-[60px] md:w-[140px] md:h-[80px] lg:w-[180px] lg:h-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-[1] opacity-15"
            viewBox="0 0 196 140"
            fill="none"
          >
            <path
              d="M196,3.48V52.73a10.43,10.43,0,0,1-2.55,6.85,10.06,10.06,0,0,1-2.23,1.93l-80.6,51.08L67.43,140a6.5,6.5,0,0,1-8.26-1.05L4.27,81A15.76,15.76,0,0,1,0,70.17V21.89a3.63,3.63,0,0,1,6.21-2.66L62.3,76.28a5.69,5.69,0,0,0,7.13.84L190.85.52A3.38,3.38,0,0,1,196,3.48Z"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </h2>
      </div>

      {/* Services Grid */}
      <div ref={listRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 max-w-6xl mx-auto">
        {serviceKeys.map((key, index) => (
          <div
            key={index}
            className="serv-item group relative p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/[0.02] hover:border-[#6ACBCC]/50 hover:bg-[#6ACBCC]/5 transition-all duration-300 cursor-default overflow-hidden"
          >
            {/* Number background */}
            <span className={`absolute -top-2 md:-top-4 text-[60px] md:text-[80px] font-bold text-[var(--foreground)]/[0.03] group-hover:text-[#6ACBCC]/10 transition-colors duration-300 select-none ${isRtl ? "-left-2 font-cairo" : "-right-2 font-antonio"}`}>
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Arrow icon */}
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-[#6ACBCC]/30 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-[#6ACBCC] group-hover:border-[#6ACBCC] transition-all duration-300">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className={`w-4 h-4 md:w-5 md:h-5 group-hover:rotate-0 transition-transform duration-300 ${isRtl ? "rotate-[135deg]" : "rotate-[-45deg]"}`}
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#6ACBCC] group-hover:text-white"
                />
              </svg>
            </div>

            {/* Content */}
            <h3 className={`text-base md:text-lg lg:text-xl font-bold text-[var(--foreground)] mb-1 md:mb-2 group-hover:text-[#6ACBCC] transition-colors duration-300 ${isRtl ? "font-cairo" : "font-antonio"}`}>
              {t(`about.details.services.items.${key}.name`)}
            </h3>
            <p className={`text-xs md:text-sm text-[var(--foreground)]/80 dark:text-[var(--foreground)]/50 group-hover:text-[var(--foreground)] dark:group-hover:text-[var(--foreground)]/70 transition-colors duration-300 ${isRtl ? "font-cairo" : "font-hero-light"}`}>
              {t(`about.details.services.items.${key}.desc`)}
            </p>

            {/* Hover line */}
            <div className={`absolute bottom-0 w-0 h-1 bg-gradient-to-r from-[#6ACBCC] to-[#1C6F6C] group-hover:w-full transition-all duration-500 ${isRtl ? "right-0" : "left-0"}`} />
          </div>
        ))}
      </div>

      {/* Bottom CTA Section */}
      <div ref={ctaRef} className="mt-12 md:mt-16 lg:mt-20 text-center">
        <p className={`text-sm md:text-base lg:text-lg text-[var(--foreground)] dark:text-[var(--foreground)]/60 mb-6 md:mb-8 max-w-2xl mx-auto ${isRtl ? "font-cairo" : "font-hero-light"}`}>
          {t("about.details.services.cta")}
        </p>
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {["dataDriven", "creative", "authentic", "innovative"].map(
            (key, index) => (
              <span
                key={index}
                className={`px-3 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium border border-[#52c3c5]/30 bg-[#52c3c5]/5 text-[var(--foreground)]/80 hover:bg-[#52c3c5]/15 hover:border-[#52c3c5]/50 transition-all duration-300 cursor-default ${isRtl ? "font-cairo" : "font-hero-light"}`}
              >
                {t(`about.details.services.tags.${key}`)}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default DetailsServices;
