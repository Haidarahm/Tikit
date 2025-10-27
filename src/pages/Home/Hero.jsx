import React, { useEffect, useRef, useState, Suspense } from "react";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../store/ThemeContext.jsx";

const LiquidEther = React.lazy(() =>
  import("../../components/aurora/LiquidEther")
);
import AvatarGroupDemo from "../../components/ui/AvatarGroupDemo";
import VerticalVideoLooper from "../../components/videoLoop/VerticalVideoLooper.jsx";

function Hero() {
  const sampleVideos = [
    {
      id: 1,
      name: "Video 1",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 2,
      name: "Video 2",
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
    },
    {
      id: 3,
      name: "Video 3",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 4,
      name: "Video 4",
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
    },
    {
      id: 5,
      name: "Video 5",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 6,
      name: "Video 6",
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
    },
    {
      id: 7,
      name: "Video 7",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 8,
      name: "Video 8",
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
    },
    {
      id: 9,
      name: "Video 9",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 10,
      name: "Video 10",
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
    },
  ];

  const sectionRef = useRef(null);
  const [showLiquid, setShowLiquid] = useState(false);
  const [showVideoLooper, setShowVideoLooper] = useState(false);
  const { t } = useTranslation();
  const { theme } = useTheme();

  // Delay rendering of VideoLooper by 2 seconds
  useEffect(() => {
    const timerId = setTimeout(() => {
      setShowVideoLooper(true);
    }, 3000);

    return () => clearTimeout(timerId);
  }, []);

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

  // Delay for LiquidEther + initialize AOS after animation ends
  useEffect(() => {
    const timerId = setTimeout(() => {
      setShowLiquid(true);
      // Initialize AOS after intro finishes
      AOS.init({
        duration: 900, // smoother motion
        once: true, // run once only
        easing: "ease-out-quart",
      });
      AOS.refresh();
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
        {showLiquid && (
          <Suspense fallback={null}>
            <LiquidEther
              colors={
                theme === "dark"
                  ? ["#142236", "#5d6fa1", "#769cb6"]
                  : ["#3EB6B7", "#52C3C5", "#A0E7E8"]
              }
              mouseForce={20}
              cursorSize={100}
              isViscous={false}
              viscous={30}
              iterationsViscous={32}
              iterationsPoisson={32}
              resolution={0.5}
              isBounce={false}
              autoDemo={true}
              autoSpeed={0.5}
              autoIntensity={2.2}
              takeoverDuration={0.25}
              autoResumeDelay={1000}
              autoRampDuration={0.6}
            />
          </Suspense>
        )}
        {showVideoLooper && (
          <div className="videos  absolute overflow-hidden z-20 left-0 top-0 w-full h-full">
            <div className="h-full absolute left-8 ">
              <VerticalVideoLooper
                videos={sampleVideos}
                speed={35}
                direction="up"
              />
            </div>
            <div className="h-full absolute right-8 ">
              <VerticalVideoLooper
                videos={sampleVideos}
                speed={35}
                direction="down"
              />
            </div>
          </div>
        )}
      </div>

      {/* Foreground content */}
      <div className="relative mx-auto h-[calc(100%-104px)] mt-[60px] md:mt-[104px] z-10 w-full px-4 sm:px-6 md:w-6/7 flex items-center flex-col justify-center">
        {/* Title */}
        <div
          className="title flex flex-col text-[var(--foreground)]   items-center text-center"
          data-aos="fade-down"
          data-aos-delay="1000"
        >
          <h2
            className=" font-light text-lg sm:text-xl md:text-2xl lg:text-[27px]"
            data-aos="fade-down"
            data-aos-delay="1000"
          >
            {t("home.hero.tagline")}
          </h2>
          <h1
            className=" font-bold text-3xl font-hero-light sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] leading-tight"
            data-aos="fade-down"
            data-aos-delay="1300"
          >
            ROI REBELS
          </h1>
        </div>

        {/* Subtitle */}
        <div
          className="subtitle mt-4 md:mt-6"
          data-aos="fade-down"
          data-aos-delay="1600"
        >
          <h3 className=" font-light text-[var(--foreground)]  text-xl sm:text-2xl md:text-3xl lg:text-[36px] text-center px-4">
            {t("home.hero.subtitle")}
          </h3>
        </div>

        {/* Avatars */}
        <div
          className="avatar mt-8 md:mt-[50px]"
          data-aos="fade-down"
          data-aos-delay="1800"
        >
          <AvatarGroupDemo />
          <div className="text text-center mt-2 md:mt-[10px]">
            <span className="font-bold  text-sm sm:text-base text-[var(--foreground)] ">
              {t("home.hero.clients")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
