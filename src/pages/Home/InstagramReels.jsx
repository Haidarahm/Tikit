import React, { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Example YouTube embed URLs to use as reel content
const YOUTUBE_URLS = [
  "https://www.youtube.com/embed/ScMzIvxBSi4",
  "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "https://www.youtube.com/embed/tgbNymZ7vqY",
  "https://www.youtube.com/embed/oHg5SJYRHA0",
  "https://www.youtube.com/embed/L_jWHffIx5E",
  "https://www.youtube.com/embed/9bZkp7q19f0",
];

const REEL_COUNT = 6;

const InstagramReels = () => {
  const containerRef = useRef(null);

  // Stable random layout for this mount (desktop)
  const reels = useMemo(() => {
    return Array.from({ length: REEL_COUNT }).map((_, index) => {
      // Tighter clustering so reels are closer together
      const top = 25 + Math.random() * 30; // 25–55%
      const left = 20 + Math.random() * 60; // 20–80%
      const direction = Math.random() > 0.5 ? 1 : -1;
      const amplitude = 16 + Math.random() * 24; // px
      const speedFactor = 0.6 + Math.random() * 1.2; // scrub strength

      return {
        id: index,
        top,
        left,
        direction,
        amplitude,
        speedFactor,
        youtubeUrl: YOUTUBE_URLS[index % YOUTUBE_URLS.length],
      };
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".ig-reel-card");

      cards.forEach((card) => {
        const el = card;
        const speed = Number(el.dataset.speed) || 1;
        const direction = Number(el.dataset.direction) || 1;
        const amplitude = Number(el.dataset.amplitude) || 32;

        gsap.fromTo(
          el,
          { y: direction * -amplitude },
          {
            y: direction * amplitude,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: speed,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-16 md:py-24 px-4 md:px-8 overflow-hidden"
      aria-label="Featured Instagram Reels"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-semibold text-[var(--foreground)] mb-6 md:mb-10">
          Featured Instagram Reels
        </h2>

        {/* Desktop / large screens: floating layout with landscape cards */}
        <div className="hidden md:block relative h-[420px] lg:h-[520px]">
          {reels.map((reel, index) => (
            <div
              key={reel.id}
              className="ig-reel-card absolute w-60 lg:w-72 aspect-video rounded-lg shadow-lg bg-gray-200/70 dark:bg-gray-800/70 hover:scale-105 transition-transform duration-500 overflow-hidden"
              style={{
                top: `${reel.top}%`,
                left: `${reel.left}%`,
                transform: "translate(-50%, -50%)",
              }}
              data-speed={reel.speedFactor}
              data-direction={reel.direction}
              data-amplitude={reel.amplitude}
            >
              {/* Placeholder background while iframe loads */}
              <div className="w-full h-full bg-gray-200 dark:bg-gray-800">
                <iframe
                  src={reel.youtubeUrl}
                  title={`Featured Reel ${index + 1}`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: stacked layout */}
        <div className="block md:hidden space-y-3">
          {reels.slice(0, 4).map((reel, index) => (
            <div
              key={reel.id}
              className="ig-reel-card w-full aspect-video rounded-lg shadow-lg bg-gray-200/70 dark:bg-gray-800/70 hover:scale-105 transition-transform duration-500 overflow-hidden"
              data-speed={reel.speedFactor}
              data-direction={reel.direction}
              data-amplitude={reel.amplitude}
            >
              <div className="w-full h-full bg-gray-200 dark:bg-gray-800">
                <iframe
                  src={reel.youtubeUrl}
                  title={`Featured Reel ${index + 1}`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramReels;

