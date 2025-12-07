import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useI18nLanguage } from "../../store/I18nLanguageContext";

const Hero = ({ caseData, loading }) => {
    const { isRtl } = useI18nLanguage();
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    
    // Get first image from media array or use default
    const firstImage = caseData?.media && Array.isArray(caseData.media) && caseData.media.length > 0
      ? caseData.media[0]
      : "https://i.pinimg.com/1200x/68/e2/d5/68e2d57bbb51cf28c66f4b72ea9b8804.jpg";
    
    // Get title and subtitle from caseData or use defaults
    const title = caseData?.title || "";
    const subtitle = caseData?.subtitle || "";

    // Simple fade-in animation
    useEffect(() => {
      const tl = gsap.timeline();
      
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      ).fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );

      return () => tl.kill();
    }, []);
    
  return (
    <div data-nav-color="white" className="relative overflow-hidden min-h-[60vh] w-full md:min-h-screen">
      <img
        className="absolute w-full h-full object-cover blur-sm z-0"
        src={firstImage}
        alt=""
      />
      <div className="absolute z-20 flex flex-col justify-center items-center md:items-start w-full h-full mx-auto md:mx-[80px] container">
        <h1
          ref={titleRef}
          style={{
            color: "#fff",
            textShadow: "2px 2px 10px rgba(0, 0, 0, 0.8)",
            fontFamily: isRtl ? "" : "Antonio",
            opacity: 0,
          }}
          className="tikit-title"
        >
          {title}
        </h1>
        <h3
          ref={subtitleRef}
          style={{
            color: "#fff",
            textShadow: "2px 2px 10px rgba(0, 0, 0, 0.8)",
            fontFamily: isRtl ? "" : "Antonio",
            opacity: 0,
          }}
          className="subtitle font-[700] text-2xl sm:text-3xl md:text-4xl leading-tight text-[var(--foreground)]"
        >
          {subtitle}
        </h3>
      </div>
    </div>
  );
};

export default Hero;
