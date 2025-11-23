import React, { useEffect, useRef, useState, Suspense, memo } from "react";
import gsap from "gsap";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../store/ThemeContext.jsx";
import { useBannersStore } from "../../store/bannersStore";

// const LiquidEther = React.lazy(() =>
//   import("../../components/aurora/LiquidEther")
// );

const VerticalVideoLooper = React.lazy(() =>
  import("../../components/videoLoop/VerticalVideoLooper.jsx")
);

import AvatarGroupDemo from "../../components/ui/AvatarGroupDemo";

const Hero = memo(() => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const [showLiquid, setShowLiquid] = useState(false);
  const [showVideoLooper, setShowVideoLooper] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { videos, loadVideos, loading } = useBannersStore();

  // Load videos from API once
  useEffect(() => {
    loadVideos({ page: 1, per_page: 10 });
  }, [loadVideos]);

  // Check if device is mobile - memoized
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint in Tailwind
    };

    checkMobile();

    // Throttle resize listener
    let resizeTimer;
    const throttledCheckMobile = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkMobile, 150);
    };

    window.addEventListener("resize", throttledCheckMobile);

    return () => {
      window.removeEventListener("resize", throttledCheckMobile);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Delay rendering of VideoLooper by 2 seconds, only on desktop
  useEffect(() => {
    if (isMobile) return;

    const timerId = setTimeout(() => {
      setShowVideoLooper(true);
    }, 3500);

    return () => clearTimeout(timerId);
  }, [isMobile]);

  // GSAP background intro animation
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    gsap.set(element, { scaleX: 0.001, transformOrigin: "center center" });
    gsap.to(element, {
      scaleX: 1,
      duration: 2,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray("[data-hero-animate]");
      if (!items.length) return;

      gsap.set(items, { autoAlpha: 0, y: 32 });
      gsap.to(items, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.15,
        delay: 0.6,
      });
    }, contentRef);

    return () => ctx.revert();
  }, []);

  // Delay for LiquidEther after animation ends
  useEffect(() => {
    const timerId = setTimeout(() => {
      setShowLiquid(true);
    }, 1000);

    return () => clearTimeout(timerId);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="section relative h-[80vh] md:h-[97vh]  rounded-[15px] md:rounded-[25px]  overflow-hidden mx-auto gpu-transform w-[98vw] sm:w-[96vw] md:w-[95vw]"
    >
      {/* Background layer */}
      <div className="pointer-events-none h-full mt-[8px] md:mt-[16px] w-full mx-auto overflow-hidden  bg-[var(--container-bg)]  rounded-[15px] md:rounded-[25px] absolute inset-0 z-0">
        {/* Video Background */}
        <video
          key={isMobile ? "mobile" : "desktop"}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src={isMobile ? "/main-hero-mobile.mp4" : "/showcase-video.mp4"}
            type="video/mp4"
          />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* {showLiquid && (
          <Suspense fallback={null}>
            <LiquidEther
              colors={
                theme === "dark"
                  ? ["#142236", "#5d6fa1", "#769cb6"]
                  : ["#3EB6B7", "#52C3C5", "#A0E7E8"]
              }
              mouseForce={20}
              cursorSize={80}
              isViscous={false}
              viscous={30}
              iterationsViscous={32}
              iterationsPoisson={32}
              resolution={0.4}
              isBounce={false}
              autoDemo={true}
              autoSpeed={0.5}
              autoIntensity={2.2}
              takeoverDuration={0.25}
              autoResumeDelay={1000}
              autoRampDuration={0.6}
            />
          </Suspense>
        )} */}
        {showVideoLooper && !isMobile && videos?.length > 0 && !loading && (
          <div className="videos absolute overflow-hidden z-20 left-0 top-0 w-full h-full">
            <Suspense fallback={null}>
              <div className="h-full absolute left-8 ">
                <VerticalVideoLooper
                  videos={videos}
                  speed={60}
                  direction="up"
                />
              </div>
              <div className="h-full absolute right-8 ">
                <VerticalVideoLooper
                  videos={videos}
                  speed={60}
                  direction="down"
                />
              </div>
            </Suspense>
          </div>
        )}
      </div>

      {/* Foreground content */}
      <div
        ref={contentRef}
        className="relative mx-auto h-[calc(100%-104px)] mt-[60px] md:mt-[104px] z-10 w-full px-4 sm:px-6 md:w-6/7 flex items-center flex-col justify-center"
      >
        {/* Title */}
        <div className="title flex flex-col text-white   items-center text-center">
          <h2
            className=" font-light text-lg sm:text-xl md:text-2xl lg:text-[27px]"
            data-hero-animate
          >
            {t("home.hero.tagline")}
          </h2>
          <h1
            className=" font-bold text-3xl font-hero-light sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] leading-tight"
            data-hero-animate
          >
            ROI REBELS
          </h1>
        </div>

        {/* Subtitle */}
        <div className="subtitle mt-4 md:mt-6" data-hero-animate>
          <h3 className=" font-light text-white  text-xl sm:text-2xl md:text-3xl lg:text-[36px] text-center px-4">
            {t("home.hero.subtitle")}
          </h3>
        </div>

        {/* Avatars */}
        <div className="avatar mt-8 md:mt-[50px]" data-hero-animate>
          <AvatarGroupDemo />
          <div className="text text-center mt-2 md:mt-[10px]">
            <span className="font-bold  text-sm sm:text-base text-white ">
              {t("home.hero.clients")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

Hero.displayName = "Hero";

export default Hero;
