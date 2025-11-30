import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext";

gsap.registerPlugin(ScrollTrigger);

const Growth = () => {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const circle1Ref = useRef(null);
  const circle2Ref = useRef(null);

  const data = t("about.growth.stats", { returnObjects: true }) || [];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.set(titleRef.current, {
          opacity: 0,
          y: 20,
        });

        ScrollTrigger.create({
          trigger: titleRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(titleRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
            });
          },
        });
      }

      // Description animation
      if (descriptionRef.current) {
        gsap.set(descriptionRef.current, {
          opacity: 0,
          y: 20,
        });

        ScrollTrigger.create({
          trigger: descriptionRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(descriptionRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
            });
          },
        });
      }

      // Circle animations
      const circles = [circle1Ref.current, circle2Ref.current];
      circles.forEach((circle, i) => {
        if (!circle) return;

        gsap.set(circle, {
          opacity: 0,
          scale: 0.8,
        });

        ScrollTrigger.create({
          trigger: circle,
          start: "top 80%",
          onEnter: () => {
            gsap.to(circle, {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              delay: i * 0.1,
              ease: "power2.out",
            });
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`px-4 items-center md:px-[60px] flex flex-col min-h-[350px] md:flex-row my-[60px] md:my-[120px] gap-8 md:gap-0 ${
        isRtl ? "font-cairo" : "font-hero-light"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="left-section md:w-2/3 ">
        <h1
          ref={titleRef}
          className="dark:text-white font-[600] font-antonio text-[var(--foreground)] title text-[22px] sm:text-[28px] md:text-[36px] capitalize loco-growth-text"
        >
          {t("about.growth.title")}
        </h1>
        <p
          ref={descriptionRef}
          className="text-[var(--foreground)] description text-[16px] sm:text-[20px] md:text-[26px] font-light loco-growth-text mt-3 md:mt-4 "
        >
          {t("about.growth.description")}
        </p>
      </div>
      <div className="right-section md:w-1/3 flex-1 relative min-h-[280px] md:min-h-0">
        <div
          ref={circle1Ref}
          key={data[0].id}
          className="flex  items-center md:right-1/2 md:top-0 top-0 left-0 shadow-lg shadow-black/15 md:left-auto justify-center text-center flex-col w-[160px] h-[160px] md:w-[170px] md:h-[170px] rounded-full absolute bg-[#252525]/3 dark:bg-[#f2f2f2]/30 loco-growth-circle"
        >
          <h1 className="text-[28px] md:text-[36px] font-bold text-[var(--foreground)]">
            {data[0].amount}+
          </h1>
          <p className="text-[14px] md:text-[16px] font-light text-[var(--foreground)]">
            {data[0].title}
          </p>
        </div>
        <div
          ref={circle2Ref}
          key={data[1].id}
          className="flex px-4  bottom-0 md:bottom-0 md:left-1/2 left-auto right-0 items-center justify-center text-center flex-col w-[160px] h-[160px] md:w-[170px] md:h-[170px] rounded-full shadow-lg shadow-black/15  absolute bg-[#252525]/3 dark:bg-[#f2f2f2]/30 loco-growth-circle"
        >
          <h1 className=" text-[var(--foreground)] text-[28px] md:text-[36px] font-bold">
            {data[1].amount}+
          </h1>
          <p className="text-[14px] md:text-[16px] font-light text-[var(--foreground)]">
            {data[1].title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Growth;
