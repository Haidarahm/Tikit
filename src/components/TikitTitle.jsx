import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18nLanguage } from "../store/I18nLanguageContext";

gsap.registerPlugin(ScrollTrigger);

const TikitTitle = ({ title, className, mainWord, disableAnimation }) => {
  const { isRtl } = useI18nLanguage();
  const titleRef = useRef(null);

  useEffect(() => {
    if (disableAnimation || !titleRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
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
              isRtl ? "font-cairo" : "font-caveat pr-6"
            } inline-block  text-3xl sm:text-4xl md:text-5xl lg:text-[80px] py-4 w-fit bg-gradient-to-r from-[#6ACBCC] to-[#1C6F6C] bg-clip-text text-transparent`}
          >
            {mainWord}
          </span>
        </>
      ) : null}
    </h1>
  );
};

export default TikitTitle;
