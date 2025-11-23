import React, { useEffect, useRef, useState, memo } from "react";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import img1 from "../../assets/who-we-are/1.webp";
import img2 from "../../assets/who-we-are/2.webp";
import img3 from "../../assets/who-we-are/3.webp";
import img4 from "../../assets/who-we-are/4.webp";
import img5 from "../../assets/who-we-are/5.webp";
import img6 from "../../assets/who-we-are/6.webp";
import img7 from "../../assets/who-we-are/7.webp";
import img8 from "../../assets/who-we-are/8.webp";
import img9 from "../../assets/who-we-are/9.webp";

const whoWeAreImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

const AboutUs = memo(() => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [imagesInView, setImagesInView] = useState(new Set());
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();

  // GSAP animation for text elements on first render
  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !descriptionRef.current)
      return;

    const ctx = gsap.context(() => {
      // Set initial states based on RTL
      const xOffset = isRtl ? -30 : 30;
      gsap.set([titleRef.current, descriptionRef.current], {
        opacity: 0,
        y: 30,
        x: xOffset,
      });

      // Create timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      // Animate title
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 0.6,
        ease: "power3.out",
      })
        // Animate description
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [isRtl]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
          // Don't reset images immediately - let them fade out naturally
          setTimeout(() => {
            setImagesInView(new Set());
          }, 800); // Wait for transition to complete
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -20% 0px",
        threshold: 0.2,
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Individual image intersection observer
  useEffect(() => {
    if (!inView) return;

    const imageContainers =
      gridRef.current?.querySelectorAll(".image-container");
    if (!imageContainers) return;

    const observers = Array.from(imageContainers).map((container, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setImagesInView((prev) => new Set([...prev, index]));
          } else {
            setImagesInView((prev) => {
              const newSet = new Set(prev);
              newSet.delete(index);
              return newSet;
            });
          }
        },
        {
          root: null,
          rootMargin: "0px 0px -10% 0px",
          threshold: 0.3,
        }
      );
      observer.observe(container);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [inView]);

  // Helper for occasional larger spans for a creative layout
  const getSpanClasses = (idx) => {
    // Make every 7th item span 2 columns on lg, and every 5th item taller
    if (idx % 7 === 0) return "lg:col-span-2 lg:row-span-2";
    if (idx % 5 === 0) return "row-span-2";
    return "";
  };

  return (
    <div
      ref={sectionRef}
      className={`section overflow-visible mt-4 md:mt-0 ${
        isRtl ? "font-cairo" : "font-hero-light"
      } flex-col mx-auto z-10 w-[95%] md:w-6/7`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="w-full text-[var(--foreground)] ">
        <h2
          ref={titleRef}
          className="text-[18px] text-center md:text-4xl font-bold mb-2 md:mb-4"
        >
          {t("home.aboutUs.title")}
        </h2>
        <p
          ref={descriptionRef}
          className="text-[16px] md:text-[32px] font-light text-center mb-[40px]"
        >
          {t("home.aboutUs.description")}
        </p>
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {whoWeAreImages.map((src, idx) => (
            <div
              key={idx}
              className={`image-container overflow-hidden rounded-xl transition-all duration-800 ease-out ${
                imagesInView.has(idx)
                  ? "opacity-100 scale-100 translate-y-0 rotate-0"
                  : "opacity-0 scale-90 translate-y-8 rotate-1"
              } ${getSpanClasses(idx)}`}
              style={{
                transitionDelay: `${idx * 50}ms`,
              }}
            >
              <img
                src={src}
                alt={`who-we-are-${idx + 1}`}
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

AboutUs.displayName = "AboutUs";

export default AboutUs;
