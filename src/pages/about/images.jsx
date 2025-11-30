import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import image1 from "../../assets/aboutus/about-1.webp";
import image2 from "../../assets/aboutus/about-2.webp";
import image3 from "../../assets/aboutus/about-3.webp";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext";

gsap.registerPlugin(ScrollTrigger);

const Images = () => {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();
  const containerRef = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Image reveal animations
      const revealImgs = [img1Ref.current, img2Ref.current, img3Ref.current];
      revealImgs.forEach((img) => {
        if (!img) return;
        const imgElement = img.querySelector("img");
        if (!imgElement) return;

        gsap.set(imgElement, {
          clipPath: "inset(100% 0 0 0)",
        });

        ScrollTrigger.create({
          trigger: img,
          start: "top 80%",
          onEnter: () => {
            gsap.to(imgElement, {
              clipPath: "inset(0 0 0 0)",
              duration: 1.2,
              ease: "power2.inOut",
            });
          },
        });
      });

      // Text reveal animations
      const revealTexts = [text1Ref.current, text2Ref.current];
      revealTexts.forEach((text) => {
        if (!text) return;
        gsap.set(text, {
          opacity: 0,
          y: 40,
        });

        ScrollTrigger.create({
          trigger: text,
          start: "top 80%",
          onEnter: () => {
            gsap.to(text, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            });
          },
        });
      });

      // Parallax scroll speed for text 1
      if (text1Ref.current) {
        gsap.to(text1Ref.current, {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: text1Ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Parallax scroll speed for text 2 (opposite direction)
      if (text2Ref.current) {
        gsap.to(text2Ref.current, {
          y: 50,
          ease: "none",
          scrollTrigger: {
            trigger: text2Ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`text-[var(--foreground)] px-4 md:px-[60px] grid gap-[10px] md:gap-[15px] grid-cols-1 md:grid-cols-7 auto-rows-[200px] md:grid-rows-4 ${
        isRtl ? "font-cairo" : "font-hero-light"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Image 1 */}
      <div ref={img1Ref} className="reveal-img md:col-span-3 md:row-span-2">
        <img
          src={image1}
          alt="image-1"
          className="rounded-[15px] w-full h-full object-cover"
        />
      </div>

      {/* Text 1 with scroll speed */}
      <div
        ref={text1Ref}
        className="text reveal-text md:col-span-2 md:row-span-2 capitalize bg-[#52c3c522] dark:bg-[#00000019]   rounded-[15px] font-light text-[22px] sm:text-[28px] md:text-[42px] flex justify-center items-center px-4 md:px-[60px]"
      >
        <h1>{t("about.images.clients")}</h1>
      </div>

      {/* Image 2 */}
      <div
        ref={img2Ref}
        className="reveal-img md:col-span-2 md:row-span-2 relative z-20"
      >
        <img
          src={image2}
          alt="image-2"
          className="rounded-[15px] w-full h-full object-cover"
        />
      </div>

      {/* Text 2 with slower speed */}
      <div
        ref={text2Ref}
        className="text relative reveal-text md:col-span-2 md:row-span-2 bg-[#B387FF]/15 dark:bg-[#00000019] capitalize rounded-[15px] font-light text-[22px] sm:text-[28px] md:text-[42px] flex justify-center items-center px-4 md:px-[60px]"
      >
        <h1>{t("about.images.funding")}</h1>
      </div>

      {/* Image 3 */}
      <div ref={img3Ref} className="reveal-img md:col-span-5 md:row-span-2">
        <img
          src={image3}
          alt="image-3"
          className="rounded-[15px] w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Images;
