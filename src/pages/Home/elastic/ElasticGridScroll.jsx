import React, { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./elastic.css";

gsap.registerPlugin(ScrollTrigger);

const ElasticGridScroll = () => {
  const gridRef = useRef(null);
  const originalItemsRef = useRef([]);
  const currentColumnCountRef = useRef(0);

  // Sample video URLs for testing
  const videos = useMemo(() => {
    return [
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        label: "Big Buck Bunny",
        type: "video/mp4",
      },
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        label: "Elephants Dream",
        type: "video/mp4",
      },
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        label: "For Bigger Blazes",
        type: "video/mp4",
      },
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        label: "For Bigger Escapes",
        type: "video/mp4",
      },
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        label: "For Bigger Fun",
        type: "video/mp4",
      },
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        label: "For Bigger Joyrides",
        type: "video/mp4",
      },
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        label: "For Bigger Meltdowns",
        type: "video/mp4",
      },
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        label: "Sintel",
        type: "video/mp4",
      },
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
        label: "Subaru Outback",
        type: "video/mp4",
      },
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        label: "Tears of Steel",
        type: "video/mp4",
      },
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
        label: "Volkswagen GTI",
        type: "video/mp4",
      },
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
        label: "What Car Can You Get",
        type: "video/mp4",
      },
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
        label: "We Are Going On Bullrun",
        type: "video/mp4",
      },
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TheLastNapkin.mp4",
        label: "The Last Napkin",
        type: "video/mp4",
      },
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJetblasts.mp4",
        label: "For Bigger Jetblasts",
        type: "video/mp4",
      },
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMobisodes.mp4",
        label: "For Bigger Mobisodes",
        type: "video/mp4",
      },
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerExplosions.mp4",
        label: "For Bigger Explosions",
        type: "video/mp4",
      },
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerStreamers.mp4",
        label: "For Bigger Streamers",
        type: "video/mp4",
      },
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerSurprises.mp4",
        label: "For Bigger Surprises",
        type: "video/mp4",
      },
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerTrips.mp4",
        label: "For Bigger Trips",
        type: "video/mp4",
      },
    ];
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const body = document.body;
    body.classList.add("demo-3", "loading");

    // Setup video autoplay on intersection
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch((err) => {
              console.log("Video autoplay prevented:", err);
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    const observeVideos = () => {
      const videos = grid.querySelectorAll(".grid__item-video");
      videos.forEach((video) => videoObserver.observe(video));
    };

    const originalItems = Array.from(grid.querySelectorAll(".grid__item"));
    originalItemsRef.current = originalItems;

    const clearGrid = () => {
      const existingColumns = Array.from(
        grid.querySelectorAll(".grid__column")
      );
      existingColumns.forEach((col) => col.remove());

      originalItemsRef.current.forEach((item) => {
        if (!grid.contains(item)) {
          grid.appendChild(item);
        }
      });
    };

    const buildGrid = (columns) => {
      const fragment = document.createDocumentFragment();
      const columnMeta = [];

      const baseLag = 0.2;
      const lagScale = 0.3;

      columns.forEach((items, index) => {
        const column = document.createElement("div");
        column.className = "grid__column";

        items.forEach((item) => column.appendChild(item));

        fragment.appendChild(column);

        const lag = baseLag + (index + 1) * lagScale;
        columnMeta.push({ element: column, lag });
      });

      grid.innerHTML = "";
      grid.appendChild(fragment);

      return columnMeta;
    };

    const applyColumnEffects = (columnsMeta) => {
      // Kill previous ScrollTriggers for this grid only
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars && st.vars.trigger && grid.contains(st.vars.trigger)) {
          st.kill();
        }
      });

      // Single scroll range: use the grid's section (parent) so all columns share the same progress
      const section = grid.closest("section");
      const triggerEl = section || grid;

      // Stair-like lag: each column moves vertically with scroll; higher scrub = more lag (trails behind)
      const yOffset = 35; // percent movement — larger value = more distance the cards travel

      columnsMeta.forEach(({ element, lag }) => {
        gsap.fromTo(
          element,
          { yPercent: 10  },
          {
            yPercent: -yOffset * 2,
            ease: "none",
            scrollTrigger: {
              trigger: triggerEl,
              start: "top top",
              end: "bottom top",
              scrub: lag,
            },
          }
        );
      });
    };

    const init = () => {
      clearGrid();

      const styles = window.getComputedStyle(grid);
      const colTemplate = styles.getPropertyValue("grid-template-columns");
      const numColumns = colTemplate
        .split(" ")
        .filter((v) => v.trim().length > 0).length;

      const effectiveColumns = Math.max(numColumns || 1, 1);
      currentColumnCountRef.current = effectiveColumns;

      const columns = Array.from({ length: effectiveColumns }, () => []);
      originalItemsRef.current.forEach((item, index) => {
        const columnIndex = index % effectiveColumns;
        columns[columnIndex].push(item);
      });

      const columnsMeta = buildGrid(columns);
      applyColumnEffects(columnsMeta);
      observeVideos();
    };

    const handleResize = () => {
      if (!grid) return;
      const styles = window.getComputedStyle(grid);
      const colTemplate = styles.getPropertyValue("grid-template-columns");
      const numColumns = colTemplate
        .split(" ")
        .filter((v) => v.trim().length > 0).length;
      const effectiveColumns = Math.max(numColumns || 1, 1);

      if (effectiveColumns !== currentColumnCountRef.current) {
        init();
      }
    };

    // Remove loading class and initialize
    body.classList.remove("loading");
    init();
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    window.addEventListener("resize", handleResize);

    return () => {
      body.classList.remove("demo-3", "loading");
      window.removeEventListener("resize", handleResize);
      videoObserver.disconnect();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars && st.vars.trigger && grid.contains(st.vars.trigger)) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <section className="elastic-grid-section w-full px-4 md:px-8">
      <div id="smooth-content" className="max-w-6xl mx-auto h-full">
        <div className="elastic-grid-section__header flex items-center justify-between mb-2">
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--muted-foreground,#a0a0a0)]">
            Reels
          </p>
        </div>

        <div ref={gridRef} className="grid">
          {videos.map((video, index) => (
            <figure className="grid__item" key={index}>
              <div className="grid__item-img">
                <video
                  className="grid__item-video"
                  src={video.src}
                  type={video.type}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />
              </div>
              <figcaption className="grid__item-caption">
                {video.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ElasticGridScroll;
