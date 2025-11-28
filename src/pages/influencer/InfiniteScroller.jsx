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

    // Calculate total width of one set
    const totalWidth = (imageWidth + gap) * items.length;

    // Create GSAP animation
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
        {/* Render three sets for seamless looping */}
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
                className="scroller-item bg-gradient-to-r from-[#6ACBCC] to-[#1C6F6C]"
                style={{
                  width: `${imageWidth}px`,
                  height: `${imageHeight}px`,
                  flexShrink: 0,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "3px solid var(--foreground, #000)",
                //   backgroundColor: "var(--background, #fff)",
                }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScroller;