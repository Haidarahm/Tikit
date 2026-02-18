import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useI18nLanguage } from "../store/I18nLanguageContext";

const TikitTitle = ({ title, className, mainWord, disableAnimation }) => {
  const { isRtl } = useI18nLanguage();
  const titleRef = useRef(null);

  useEffect(() => {
    if (disableAnimation || !titleRef.current) return;

    const el = titleRef.current;
    gsap.set(el, { opacity: 0, y: 60 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
            });
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -15% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [disableAnimation]);

  return (
    <h1
      ref={titleRef}
      dir={isRtl ? "rtl" : "ltr"}
      className={`${className} ${
        isRtl ? " font-cairo " : "font-antonio"
      } tikit-title`}
    >
      {title}
      {mainWord ? (
        <>
          {" "}
          <span
            className={`${
              isRtl ? "font-cairo py-4 " : "font-caveat pr-6"
            } inline-block  text-4xl sm:text-6xl md:text-7xl lg:text-[80px] w-fit bg-gradient-to-r from-[#6ACBCC] to-[#1C6F6C] bg-clip-text text-transparent`}
          >
            {mainWord}
          </span>
        </>
      ) : null}
    </h1>
  );
};

export default TikitTitle;
