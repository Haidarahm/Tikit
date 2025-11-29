import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * InfiniteScroller Component
 * A smooth, seamless infinite horizontal scroller using GSAP
 * 
 * @param {Array} items - Array of objects with {src, alt} properties
 * @param {number} speed - Animation duration in seconds (lower = faster)
 * @param {number} imageWidth - Width of each image in pixels
 * @param {number} imageHeight - Height of each image in pixels
 * @param {number} gap - Gap between images in pixels
 */
const InfiniteScroller = ({
  items = [],
  speed = 30,
  imageWidth = 100,
  imageHeight = 100,
  gap = 16,
  className = "",
}) => {
  const scrollerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!scrollerRef.current || items.length === 0) return;

    const scroller = scrollerRef.current;
    const firstSet = scroller.querySelector(".scroller-set");
    
    if (!firstSet) return;

    const totalWidth = (imageWidth + gap) * items.length;

    animationRef.current = gsap.to(".scroller-set", {
      x: -totalWidth,
      duration: speed,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [items, speed, imageWidth, gap]);

  if (items.length === 0) return null;

  return (
    <div
      ref={scrollerRef}
      className={`infinite-scroller-container ${className}`}
      style={{
        width: "100%",
        height: `${imageHeight}px`,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        className="infinite-scroller-track"
        style={{
          display: "flex",
          position: "absolute",
          left: 0,
          gap: `${gap}px`,
        }}
      >
        {[0, 1, 2].map((setIndex) => (
          <div
            key={setIndex}
            className="scroller-set"
            style={{
              display: "flex",
              gap: `${gap}px`,
              flexShrink: 0,
            }}
          >
            {items.map((item, index) => (
              <div
                key={`${setIndex}-${index}`}
                className="scroller-item relative group w-20 md:w-24"
                style={{
                  flexShrink: 0,
                }}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg ring-2 ring-white/20 transition-all duration-300 group-hover:ring-4 group-hover:ring-[#6ACBCC]/50 group-hover:shadow-xl group-hover:shadow-[#6ACBCC]/30">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6ACBCC] via-[#4BA9AA] to-[#1C6F6C] opacity-20"></div>
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="relative w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScroller;