import React, { useEffect } from "react";
import { useWorkStore } from "../../store/workStore";

const Content = ({ id }) => {
  const { cases, loadCases, lang, loading } = useWorkStore();
  const numericId = id ? Number(id) : undefined;

  useEffect(() => {
    if (numericId) {
      loadCases(numericId, lang);
    }
  }, [numericId, lang, loadCases]);

  const items = numericId ? cases?.[numericId] ?? [] : [];

  // Ensure LocomotiveScroll recalculates when items change
  useEffect(() => {
    const scroll = window.locomotiveScrollInstance;
    if (scroll) {
      // small delay lets DOM paint first
      const t = setTimeout(() => scroll.update(), 50);
      return () => clearTimeout(t);
    }
  }, [items?.length]);
  return (
    <div
      data-scroll-section
      className="min-h-screen flex flex-col gap-20 text-[var(--foreground)] relative font-hero-light py-20 px-4 md:px-16"
    >
      {loading && items.length === 0 ? (
        <div className="w-full h-[40vh] bg-white/10 animate-pulse rounded-[15px]" />
      ) : (
        items.map((item, idx) => {
          // For videos: place text above and make video full width
          if (item.media_type === "video") {
            return (
              <div key={idx} className="flex flex-col gap-6">
                {/* Text reveal animation */}
                <div
                  className="reveal-text flex flex-col gap-2"
                  data-scroll
                  data-scroll-class="is-inview"
                  data-scroll-repeat
                >
                  <h2 className="text-3xl md:text-5xl font-bold">
                    {item.title}
                  </h2>
                  <h3 className="text-xl md:text-2xl font-semibold text-[var(--secondary)]">
                    {item.subtitle}
                  </h3>
                  <p className="text-base md:text-lg text-[var(--foreground)]">
                    {item.description}
                  </p>
                </div>

                {/* Video reveal animation */}
                <div
                  className="reveal-img w-full"
                  data-scroll
                  data-scroll-class="is-inview"
                  data-scroll-repeat
                >
                  <div className="w-full h-[40vh] md:h-[60vh] rounded-[15px] overflow-hidden bg-black flex items-center justify-center">
                    <video
                      src={item.media}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain"
                      onLoadedData={() => {
                        const scroll = window.locomotiveScrollInstance;
                        if (scroll) scroll.update();
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          }

          // Default (images): keep existing side-by-side layout
          return (
            <div
              key={idx}
              className={`flex flex-col flex-col-reverse md:flex-row items-center gap-8 ${
                idx % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Media reveal animation */}
              <div
                className="reveal-img w-full md:w-1/3"
                data-scroll
                data-scroll-class="is-inview"
                data-scroll-repeat
              >
                <img
                  src={item.media}
                  alt={item.title}
                  className="rounded-[15px] w-full h-full object-cover"
                  onLoad={() => {
                    const scroll = window.locomotiveScrollInstance;
                    if (scroll) scroll.update();
                  }}
                />
              </div>

              {/* Text reveal animation */}
              <div
                className="reveal-text flex-1 flex flex-col gap-2"
                data-scroll
                data-scroll-class="is-inview"
                data-scroll-repeat
                data-scroll-speed={idx % 2 === 0 ? "1" : "-1"}
              >
                <h2 className="text-3xl md:text-5xl font-bold">{item.title}</h2>
                <h3 className="text-xl md:text-2xl font-semibold text-[var(--secondary)]">
                  {item.subtitle}
                </h3>
                <p className="text-base md:text-lg text-[var(--foreground)] max-w-[600px]">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Content;
