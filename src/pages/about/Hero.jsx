import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InfiniteScroll from "../../components/InfiniteScroll";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext";
import { useAboutBannersStore } from "../../store/aboutBannersStore";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();
  const videos = useAboutBannersStore((state) => state.videos);
  const loadVideos = useAboutBannersStore((state) => state.loadVideos);
  const loading = useAboutBannersStore((state) => state.loading);
  const error = useAboutBannersStore((state) => state.error);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const sectionTitleRef = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
    loadVideos();
  }, [loadVideos]);

  // GSAP animation for text elements on first render
  useEffect(() => {
    if (!containerRef.current || !titleRef.current || !descriptionRef.current)
      return;

    const ctx = gsap.context(() => {
      // Set initial states for all text elements
      gsap.set(
        [titleRef.current, sectionTitleRef.current, paragraphRef.current],
        {
          opacity: 0,
          y: 50,
        }
      );

      // Create timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      // Animate title first
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      })
        // Animate description section
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.5"
        )
        // Animate section title and paragraph together
        .to(
          [sectionTitleRef.current, paragraphRef.current],
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.05,
          },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const items =
    videos && videos.length > 0
      ? videos.map((banner) => ({
          content: (
            <div className="flex flex-col gap-2 w-full h-full">
              <video
                src={banner.media}
                muted
                loop
                autoPlay
                playsInline
                className="w-full h-full rounded-[12px] object-cover"
              />
            </div>
          ),
        }))
      : [
          {
            content: (
              <div className="text-sm opacity-80 text-center">
                {loading
                  ? "Loading banners..."
                  : error
                  ? "Failed to load banners."
                  : "No banners available."}
              </div>
            ),
          },
        ];
  return (
    <div
      ref={containerRef}
      className={`flex flex-col ${isRtl ? "font-cairo" : "font-hero-light"}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div style={{ height: "500px", position: "relative" }}>
        <div className="overlay absolute h-full w-full bg-[var(--background)] opacity-50 z-20 "></div>

        <div
          ref={titleRef}
          className={`title font-antonio z-30 px-2 md:px-0 w-full md:w-3/4 text-[var(--foreground)] text-center md:text-start absolute text-[32px] md:text-[64px] capitalize flex items-center font-bold  h-full ${
            isRtl ? "md:pr-[60px]" : "md:pl-[60px]"
          }`}
        >
          {t("about.hero.title")}
        </div>
        <InfiniteScroll
          items={items}
          isTilted={true}
          tiltDirection="right"
          autoplay={true}
          autoplaySpeed={0.5}
          autoplayDirection="down"
          pauseOnHover={true}
        />
      </div>
      <div
        ref={descriptionRef}
        className={`description  relative z-30 text-center md:text-start flex-1 flex md:flex-row flex-col text-[var(--foreground)] gap-4 md:gap-14 justify-center  px-[20px] ${
          isRtl ? "md:pr-[60px]" : "md:pl-[60px]"
        }`}
      >
        <div
          ref={sectionTitleRef}
          className="title  text-center md:text-start flex-nowrap text-nowrap font-antonio font-bold mt-4 md:mt-0 text-[20px] md:text-[40px] will-change-transform translate-y-full"
        >
          {t("about.hero.sectionTitle")}
        </div>
        <div
          ref={paragraphRef}
          className="paragraph text-[16px] md:text-[28px]"
        >
          {t("about.hero.description")}
        </div>
      </div>
    </div>
  );
};

export default Hero;
