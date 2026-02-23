import React, { useEffect, useRef, useMemo } from "react";

const PinnedSection = () => {
  const sectionRef = useRef(null);
  const stickyContainerRef = useRef(null);
  const trackRef = useRef(null);
  const videoObserverRef = useRef(null);

  const videos = useMemo(() => {
    return [
      { src: "/reels/reel-1.mp4", label: "Creative Campaign",    type: "video/mp4" },
      { src: "/reels/reel-2.mp4", label: "Brand Storytelling",   type: "video/mp4" },
      { src: "/reels/reel-3.mp4", label: "Social Impact",        type: "video/mp4" },
      { src: "/reels/reel-4.mp4", label: "Digital Innovation",   type: "video/mp4" },
      { src: "/reels/reel-5.mp4", label: "Community Building",   type: "video/mp4" },
      { src: "/reels/reel-6.mp4", label: "Growth Strategy",      type: "video/mp4" },
      { src: "/reels/reel-7.mp4", label: "Content Creation",     type: "video/mp4" },
      { src: "/reels/reel-8.mp4", label: "Influencer Marketing", type: "video/mp4" },
    ];
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current || !stickyContainerRef.current) return;
    if (window.innerWidth < 768) return;

    const section         = sectionRef.current;
    const track           = trackRef.current;
    const stickyContainer = stickyContainerRef.current;

    let scrollDistance = 0;
    let maxTranslate   = 0;
    let sectionTop     = 0;
    let sectionHeight  = 0;
    let resizeTimer;
    let recalcTimeout1;
    let recalcTimeout2;
    let lastBodyHeight = 0;
    let bodyHeightCheckInterval;

    let cachedViewportHeight = window.innerHeight;
    let rafId = 0;

    const calculate = () => {
      // READ phase — batch all layout reads
      const trackWidth     = track.scrollWidth;
      const viewportWidth  = window.innerWidth;
      cachedViewportHeight = window.innerHeight;
      const rect           = section.getBoundingClientRect();
      const currentScrollY = window.scrollY;

      // COMPUTE
      scrollDistance = Math.max(0, trackWidth - viewportWidth);
      maxTranslate  = scrollDistance;
      sectionHeight = cachedViewportHeight + scrollDistance;
      sectionTop    = rect.top + currentScrollY;

      // WRITE phase — single DOM write
      section.style.height = `${sectionHeight}px`;
    };

    const onScroll = () => {
      // READ phase — only two reads (scrollY is cheap)
      const scrollY      = window.scrollY;
      const sectionStart = sectionTop;
      const sectionEnd   = sectionTop + sectionHeight - cachedViewportHeight;

      // WRITE phase — one branch of writes only
      if (scrollDistance <= 0 || scrollY < sectionStart) {
        stickyContainer.style.position = "relative";
        stickyContainer.style.top      = "";
        stickyContainer.style.left     = "";
        stickyContainer.style.width    = "";
        track.style.transform          = "translate3d(0, 0, 0)";
        return;
      }

      if (scrollY > sectionEnd) {
        stickyContainer.style.position = "absolute";
        stickyContainer.style.top      = `${sectionHeight - cachedViewportHeight}px`;
        stickyContainer.style.left     = "0";
        stickyContainer.style.width    = "100%";
        track.style.transform          = `translate3d(-${maxTranslate}px, 0, 0)`;
        return;
      }

      stickyContainer.style.position = "fixed";
      stickyContainer.style.top      = "0";
      stickyContainer.style.left     = "0";
      stickyContainer.style.width    = "100%";

      const progress = sectionEnd === sectionStart
        ? 0
        : (scrollY - sectionStart) / (sectionEnd - sectionStart);

      track.style.transform = `translate3d(${-(progress * maxTranslate)}px, 0, 0)`;
    };

    const onScrollThrottled = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        onScroll();
      });
    };

    const init = () => {
      requestAnimationFrame(() => {
        calculate();
        onScroll();

        // Delayed recalculations — sections above load API data and change page height
        recalcTimeout1 = setTimeout(() => {
          calculate();
          onScroll();
        }, 100);

        recalcTimeout2 = setTimeout(() => {
          calculate();
          onScroll();
        }, 500);

        // Poll for body height changes (other sections loading/expanding)
        lastBodyHeight = document.body.scrollHeight;
        bodyHeightCheckInterval = setInterval(() => {
          const currentHeight = document.body.scrollHeight;
          if (currentHeight !== lastBodyHeight) {
            lastBodyHeight = currentHeight;
            calculate();
            onScroll();
          }
        }, 300);

        window.addEventListener("scroll", onScrollThrottled, { passive: true });
      });
    };

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth < 768) {
          section.style.height           = "";
          stickyContainer.style.position = "";
          stickyContainer.style.top      = "";
          stickyContainer.style.left     = "";
          stickyContainer.style.width    = "";
          track.style.transform          = "";
          window.removeEventListener("scroll", onScrollThrottled);
          return;
        }
        calculate();
        onScroll();
      }, 200);
    };

    init();
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(resizeTimer);
      clearTimeout(recalcTimeout1);
      clearTimeout(recalcTimeout2);
      clearInterval(bodyHeightCheckInterval);
      window.removeEventListener("scroll", onScrollThrottled);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      if (section) section.style.height = "";
      if (stickyContainer) {
        stickyContainer.style.position = "";
        stickyContainer.style.top      = "";
        stickyContainer.style.left     = "";
        stickyContainer.style.width    = "";
      }
      if (track) track.style.transform = "";
    };
  }, []);

  // Play/pause videos based on visibility
  useEffect(() => {
    if (!trackRef.current) return;

    videoObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (!video || !video.isConnected) return;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    trackRef.current.querySelectorAll("video").forEach((video) => {
      videoObserverRef.current.observe(video);
    });

    return () => {
      if (videoObserverRef.current) {
        videoObserverRef.current.disconnect();
        videoObserverRef.current = null;
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      dir="ltr"
      className="relative w-full overflow-hidden hidden md:block z-20"
    >
      <div
        ref={stickyContainerRef}
        className="flex flex-row h-screen overflow-hidden bg-[var(--background)]"
      >
        <div className="relative z-0 flex flex-row h-screen w-full">
          <div
            ref={trackRef}
            className="flex flex-row items-center gap-4 md:gap-6 px-4 md:px-8 pr-[10vw]"
            style={{ willChange: "transform" }}
          >
            {videos.map((video, index) => (
              <div
                key={index}
                className="relative flex-shrink-0 bg-gray-900 rounded-lg overflow-hidden"
                style={{
                  width:     "clamp(280px, 30vw, 440px)",
                  height:    "clamp(420px, 45vw, 650px)",
                  minWidth:  "280px",
                  minHeight: "420px",
                }}
              >
                <video
                  className="w-full h-full object-cover"
                  src={video.src}
                  loop
                  muted
                  preload="none"
                  playsInline
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white font-medium text-sm md:text-base">
                    {video.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PinnedSection;
