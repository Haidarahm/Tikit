import React, { useEffect, useMemo, useRef } from "react";
import background from "../../assets/backgrounds/Team.png";
import { useTheme } from "../../store/ThemeContext";
import goalImage1 from "../../assets/images/goal-image-1.png";
import goalImage2 from "../../assets/images/goal-image-2.png";
import goalImage3 from "../../assets/images/goal-image-3.png";
import goalImage4 from "../../assets/images/goal-image-4.png";
import cardImage1 from "../../assets/images/card-1.jpg";
import cardImage2 from "../../assets/images/card-2.jpg";
import cardImage3 from "../../assets/images/card-3.jpg";
const Team = () => {
  const { theme } = useTheme();

  const imageUrls = useMemo(() => {
    return [
      goalImage1,
      goalImage2,
      goalImage3,
      goalImage4,
      cardImage1,
      cardImage2,
      cardImage3,
    ];
  }, []);

  const containerRef = useRef(null);
  const rightRef = useRef(null);
  const trackRef = useRef(null);
  const sectionHeightRef = useRef(0);
  const horizontalDistanceRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const right = rightRef.current;
    const track = trackRef.current;
    if (!container || !right || !track) return;

    const isMobile = window.innerWidth < 768;

    // On mobile, we stack items vertically and make the left section sticky via CSS only
    if (isMobile) {
      // Ensure minimal heights are not forced on mobile
      container.style.minHeight = "";
      return () => {};
    }

    const compute = () => {
      const rightWidth = right.clientWidth;
      const trackWidth = track.scrollWidth;
      const paddingLeftPx = parseFloat(
        window.getComputedStyle(right).paddingLeft || "0"
      );
      const effectiveViewport = Math.max(1, rightWidth - paddingLeftPx);
      const horizontalDistance = Math.max(0, trackWidth - effectiveViewport);
      horizontalDistanceRef.current = horizontalDistance;
      const viewportH = window.innerHeight;
      sectionHeightRef.current = Math.ceil(viewportH + horizontalDistance + 16);
      container.style.minHeight = `${sectionHeightRef.current}px`;
      window.dispatchEvent(new Event("resize"));
    };

    let rafId = 0;
    let lastTranslate = 0;

    const loop = () => {
      const rect = container.getBoundingClientRect();
      const totalScroll = Math.max(
        1,
        sectionHeightRef.current - window.innerHeight
      );
      const raw = (0 - rect.top) / totalScroll;
      const progress = Math.min(1, Math.max(0, raw));
      let clamped;
      if (progress <= 0) {
        clamped = 0;
        lastTranslate = 0;
      } else if (progress >= 0.999) {
        clamped = -horizontalDistanceRef.current;
        lastTranslate = clamped;
      } else {
        const targetTranslate = -progress * horizontalDistanceRef.current;
        const eased = lastTranslate + (targetTranslate - lastTranslate) * 0.2;
        lastTranslate = eased;
        clamped = Math.max(-horizontalDistanceRef.current, Math.min(0, eased));
      }
      track.style.transform = `translate3d(${clamped}px, 0, 0)`;
      rafId = requestAnimationFrame(loop);
    };

    const preloadImages = () =>
      Promise.all(
        Array.from(track.querySelectorAll("img")).map(
          (img) =>
            new Promise((resolve) => {
              if (img.complete) return resolve();
              img.addEventListener("load", resolve, { once: true });
              img.addEventListener("error", resolve, { once: true });
            })
        )
      );

    preloadImages()
      .then(() => {
        compute();
      })
      .finally(() => {
        if (!rafId) rafId = requestAnimationFrame(loop);
      });

    window.addEventListener("resize", compute, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-scroll-section
      id="team-section"
      className="relative overflow-visible md:overflow-hidden mt-[50px] text-white font-hero-light"
    >
      <div
        className="hidden md:flex flex-col md:flex-row relative md:h-[100vh]"
        data-scroll
        data-scroll-sticky
        data-scroll-target="#team-section"
      >
        <div
          className={`${
            theme === "light" ? "light" : "dark"
          } left-section  rounded-[10px] z-20 md:z-50 md:absolute md:left-0 md:top-0 w-full md:w-[30%] md:h-full sticky top-0 flex items-center px-6 md:px-[50px] py-6 md:py-0 text-[28px] sm:text-[40px] md:text-[64px] bg-cover bg-center bg-no-repeat"`}
          style={{
            backgroundImage: ` url(${theme === "light" ? "" : background})`,
            backgroundColor: "#fff",
          }}
        >
          <h1 className="text-[var(--foreground)] leading-[1.1]">
            Our <br /> creative team
          </h1>
        </div>

        <div
          ref={rightRef}
          className="relative z-0 flex flex-col md:flex-row flex-1 overflow-visible md:overflow-hidden h-auto md:h-screen md:pl-[30%] gap-4 md:gap-0"
        >
          <div
            ref={trackRef}
            className="flex flex-col md:flex-row items-center inset-shadow-amber-100 shadow-amber-100 gap-4 md:gap-8 will-change-transform py-0 w-full"
          >
            {imageUrls.map((src, index) => (
              <div
                key={String(index)}
                className="relative w-full md:w-[450px] h-[220px] sm:h-[320px] md:h-[650px] rounded-[10px] shrink-0 overflow-hidden bg-[#111]"
              >
                <img
                  src={src}
                  alt={`team-${index + 1}`}
                  className="h-full w-full object-cover select-none"
                  draggable={false}
                />
                <div className="details flex flex-col justify-center items-center absolute bottom-12 left-1/2 -translate-1/2 bg-black/40 rounded-[10px] w-3/4 h-[120px]">
                  <div className="name text-[24px]">Haidar Ahmad</div>
                  <div className="jop text-[16px]"> Gamer</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile View Cards */}
      <div className="block md:hidden mt-8">
        {/* Mobile Headline */}
        <div className="text-center mb-8 px-4">
          <h2 className="text-[var(--foreground)] text-[28px] font-bold leading-[1.2]">
            Our Creative Team
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 px-4">
          {imageUrls.map((src, index) => (
            <div
              key={`mobile-${index}`}
              className="relative w-full h-[280px] rounded-[15px] overflow-hidden bg-[#111] shadow-lg loco-reveal-card"
              data-scroll
              data-scroll-class="is-inview"
              data-scroll-repeat
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <img
                src={src}
                alt={`team-${index + 1}`}
                className="h-full w-full object-cover select-none"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="details flex flex-col justify-end items-center absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-white/10 backdrop-blur-md rounded-[12px] w-full p-4 text-center">
                  <div className="name text-white text-[20px] font-semibold mb-1">
                    Haidar Ahmad
                  </div>
                  <div className="job text-white/80 text-[14px] font-light">
                    Gamer
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
