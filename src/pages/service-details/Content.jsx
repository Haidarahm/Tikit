import React, { useEffect } from "react";
import { useServicesStore } from "../../store/servicesStore";

const Content = ({ id }) => {
  const { serviceCases, loadServiceCases, lang } = useServicesStore();
  const numericId = id ? Number(id) : 1;

  // ✅ Load data when ID or language changes
  useEffect(() => {
    if (numericId) {
      loadServiceCases(numericId, lang);
    }
    // prevent re-trigger if loadServiceCases isn't memoized
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numericId, lang]);

  // ✅ Map and sanitize data safely
  const items =
    Array.isArray(serviceCases) && serviceCases.length > 0
      ? serviceCases.map((it) => ({
          media: it.media || "/placeholder.jpg",
          title: it.title || "Untitled Service",
          subtitle: it.subtitle || "",
          description: it.description || "",
        }))
      : [];

  // ✅ Debug log (optional)
  console.log("Loaded service cases:", serviceCases);
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
      {items.length === 0 ? (
        <p className="text-center text-[var(--foreground)] text-lg">
          No service cases found.
        </p>
      ) : (
        items.map((item, idx) => {
          const isVideo =
            typeof item.media === "string" &&
            /\.(mp4|webm|ogg)(\?.*)?$/i.test(item.media);

          if (isVideo) {
            return (
              <div key={idx} className="flex flex-col gap-6">
                {/* Text above video */}
                <div
                  className="reveal-text flex flex-col gap-2"
                  data-scroll
                  data-scroll-class="is-inview"
                  data-scroll-repeat
                >
                  <h2 className="text-3xl md:text-5xl font-bold">
                    {item.title}
                  </h2>
                  {item.subtitle && (
                    <h3 className="text-xl md:text-2xl font-semibold text-[var(--secondary)]">
                      {item.subtitle}
                    </h3>
                  )}
                  {item.description && (
                    <p className="text-base md:text-lg text-[var(--foreground)]">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Full-width responsive video */}
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

          return (
            <div
              key={idx}
              className={`flex flex-col-reverse md:flex-row items-center gap-8 ${
                idx % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image reveal animation */}
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
                {item.subtitle && (
                  <h3 className="text-xl md:text-2xl font-semibold text-[var(--secondary)]">
                    {item.subtitle}
                  </h3>
                )}
                {item.description && (
                  <p className="text-base md:text-lg text-[var(--foreground)]/80 max-w-[600px]">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Content;
