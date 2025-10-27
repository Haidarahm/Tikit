import React, {
  useEffect,
  useRef,
  useState,
  Suspense,
  useCallback,
} from "react";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../store/ThemeContext.jsx";
import Video from "../../components/Video";
import test1 from "../../assets/videos/test1.mp4";
import test2 from "../../assets/videos/test2.mp4";

const LiquidEther = React.lazy(() =>
  import("../../components/aurora/LiquidEther")
);
import AvatarGroupDemo from "../../components/ui/AvatarGroupDemo";

function Hero() {
  const sectionRef = useRef(null);
  const [showLiquid, setShowLiquid] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const { t } = useTranslation();
  const { theme } = useTheme();

  // Memoize callbacks to prevent Video component re-initialization
  const handleLoadStart = useCallback(() => {
    console.log("Video upload started");
  }, []);

  const handleUploadComplete = useCallback(() => {
    console.log("Video upload completed");
  }, []);

  // Delay rendering of Video component by 2 seconds
  useEffect(() => {
    const timerId = setTimeout(() => {
      setShowVideo(true);
    }, 2000);

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
        <div className="videos  absolute overflow-hidden z-20 left-0 top-0 w-full h-full">
          <div className="rectangle absolute z-20 w-40 left-12 top-12  h-[300px]">
            {showVideo && (
              <div className="video mt-8 md:mt-[50px] h-full w-full">
                <Video
                  src={test2}
                  controls={true}
                  autoplay={true}
                  loop={true}
                  muted={true}
                  className="w-full rounded-lg shadow-lg"
                  onLoadStart={handleLoadStart}
                  onUploadComplete={handleUploadComplete}
                />
              </div>
            )}
          </div>
          <div className="rectangle absolute z-20 w-40 right-12 bottom-20  h-[300px]">
            {showVideo && (
              <div className="video mt-8 md:mt-[50px] h-full w-full">
                <Video
                  src={test1}
                  controls={true}
                  autoplay={true}
                  loop={true}
                  muted={true}
                  className="w-full rounded-lg shadow-lg"
                  onLoadStart={handleLoadStart}
                  onUploadComplete={handleUploadComplete}
                />
              </div>
            )}
          </div>
          {/*  */}
        </div>
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

        {/* Video */}

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
