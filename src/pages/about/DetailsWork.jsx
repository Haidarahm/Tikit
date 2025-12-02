import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext";
import image1 from "../../assets/aboutus/about-1.webp";
import image2 from "../../assets/aboutus/about-2.webp";
import image3 from "../../assets/aboutus/about-3.webp";

gsap.registerPlugin(ScrollTrigger);

const DetailsWork = () => {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  const works = [
    { num: "01", titleKey: "strategy", img: image1 },
    { num: "02", titleKey: "creation", img: image2 },
    { num: "03", titleKey: "growth", img: image3 },
  ];

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

      // Work items stagger reveal
      const items = gridRef.current?.querySelectorAll(".work-item");
      if (items?.length) {
        items.forEach((item, index) => {
          const img = item.querySelector("img");
          const content = item.querySelector(".work-content");

          // Image reveal
          gsap.fromTo(
            item,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                once: true,
              },
            }
          );

          // Content fade in
          gsap.fromTo(
            content,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: index * 0.15 + 0.3,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                once: true,
              },
            }
          );

          // Image scale on scroll
          if (img) {
            gsap.to(img, {
              scale: 1.1,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} dir={isRtl ? "rtl" : "ltr"} className="details-work py-16 md:py-24 lg:py-32 px-4 md:px-[60px] lg:px-[70px]">
      {/* Section Title */}
      <div ref={titleRef} className="text-center mb-10 md:mb-16">
        <h2 className={`relative inline-block text-3xl md:text-4xl lg:text-6xl text-[var(--foreground)] uppercase font-bold ${isRtl ? "font-cairo" : "font-antonio"}`}>
          {t("about.details.work.title")}{" "}
          <span className="bg-gradient-to-r from-[#6ACBCC] to-[#1C6F6C] bg-clip-text text-transparent">
            {t("about.details.work.titleHighlight")}
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
        <p className={`text-[var(--foreground)] dark:text-[var(--foreground)]/60 mt-4 max-w-2xl mx-auto text-sm md:text-base ${isRtl ? "font-cairo" : "font-hero-light"}`}>
          {t("about.details.work.subtitle")}
        </p>
      </div>

      {/* Work Items Grid */}
      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {works.map((work, index) => (
          <div key={index} className="work-item group">
            <div className="relative h-[250px] md:h-[300px] lg:h-[400px] overflow-hidden rounded-xl md:rounded-2xl mb-3 md:mb-4">
              <img
                src={work.img}
                alt={t(`about.details.work.items.${work.titleKey}`)}
                className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className={`absolute bottom-4 text-white text-4xl md:text-5xl lg:text-6xl font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 ${isRtl ? "right-4 font-cairo" : "left-4 font-antonio"}`}>
                {work.num}
              </span>
            </div>
            <div className="work-content">
              <h3 className={`text-lg md:text-xl lg:text-2xl font-bold text-[var(--foreground)] group-hover:text-[#6ACBCC] transition-colors duration-300 ${isRtl ? "font-cairo text-right" : "font-antonio text-left"}`}>
                {t(`about.details.work.items.${work.titleKey}`)}
              </h3>
              <div className={`w-0 h-0.5 bg-[#6ACBCC] group-hover:w-10 md:group-hover:w-12 transition-all duration-300 mt-2 ${isRtl ? "mr-auto" : "ml-0"}`} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DetailsWork;
