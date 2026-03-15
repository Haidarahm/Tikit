import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// Optional: can accept props later if you want to pass custom images/columns
const Images = memo(({ images = [], columns = 3 }) => {
  const items = useMemo(
    () => (Array.isArray(images) ? images.filter(Boolean) : []),
    [images]
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const loadedCountRef = useRef(0);
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  // Map allowed column counts with mobile-first responsiveness
  const columnClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  const colsClass = columnClasses[columns] || columnClasses[3];
  const shouldEnableSwipe = items.length > 3;
  const imageGroups = useMemo(() => {
    if (!shouldEnableSwipe) return [items];
    const groups = [];
    for (let i = 0; i < items.length; i += 3) {
      groups.push(items.slice(i, i + 3));
    }
    return groups;
  }, [items, shouldEnableSwipe]);
  cardRefs.current = [];

  useEffect(() => {
    loadedCountRef.current = 0;
    setIsLoaded(false);

    if (items.length === 0) return;

    let cancelled = false;
    const handleDone = () => {
      if (cancelled) return;
      loadedCountRef.current += 1;
      if (loadedCountRef.current >= items.length) {
        setIsLoaded(true);
      }
    };

    const loaders = items.map((src) => {
      const img = new Image();
      img.onload = handleDone;
      img.onerror = handleDone;
      img.src = src;
      return img;
    });

    return () => {
      cancelled = true;
      loaders.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [items]);

  useEffect(() => {
    if (
      !isLoaded ||
      !containerRef.current ||
      cardRefs.current.length === 0 ||
      items.length === 0
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const tl = gsap.timeline({
            defaults: { duration: 0.8, ease: "power2.out" },
          });

          cardRefs.current.forEach((el, idx) => {
            if (!el) return;
            tl.fromTo(
              el,
              { autoAlpha: 0, y: 24 },
              { autoAlpha: 1, y: 0 },
              idx * 0.12
            );
          });

          observer.disconnect();
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isLoaded, items]);

  const skeletonCount = items.length > 0 ? items.length : 6;

  return (
    <section data-nav-color="white" className="py-4  h-[180vh] md:h-screen">
      <div className=" h-full w-full mx-auto px-4 md:px-12">
        <div ref={containerRef} className="h-full w-full">
          {isLoaded ? (
            shouldEnableSwipe ? (
              <Swiper
                slidesPerView="auto"
                spaceBetween={16}
                className="h-full w-full"
              >
                {imageGroups.map((group, groupIndex) => (
                  <SwiperSlide
                    key={`group-${groupIndex}`}
                    className="h-full !w-[calc(100%-40px)]"
                  >
                    <div className={`grid ${colsClass} gap-4 md:gap-6 h-full w-full`}>
                      {group.map((src, idx) => {
                        const globalIndex = groupIndex * 3 + idx;
                        return (
                          <div
                            key={globalIndex}
                            ref={(el) => {
                              cardRefs.current[globalIndex] = el;
                            }}
                            className="overflow-hidden rounded-[18px] bg-[var(--card-background)] h-full opacity-0"
                          >
                            <img
                              src={src}
                              alt={`case-image-${globalIndex + 1}`}
                              width={600}
                              height={400}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className={`grid ${colsClass} gap-4 md:gap-6 h-full w-full`}>
                {items.map((src, idx) => (
                  <div
                    key={idx}
                    ref={(el) => {
                      cardRefs.current[idx] = el;
                    }}
                    className="overflow-hidden rounded-[18px] bg-[var(--card-background)] h-full opacity-0"
                  >
                    <img
                      src={src}
                      alt={`case-image-${idx + 1}`}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className={`grid ${colsClass} gap-4 md:gap-6 h-full w-full`}>
              {Array.from({ length: skeletonCount }).map((_, idx) => (
                <div
                  key={`skeleton-${idx}`}
                  className="overflow-hidden rounded-[18px] bg-[var(--card-background)] h-full animate-pulse"
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-800/40 via-gray-700/30 to-gray-800/40" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

Images.displayName = "ShowcaseImages";

export default Images;
