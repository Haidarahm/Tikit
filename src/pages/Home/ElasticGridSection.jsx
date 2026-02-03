import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { preloadImages } from "../../utils/preloadImages";
import "./elastic/elastic.css";

import img1 from "../../assets/images/goal-image-1.webp";
import img2 from "../../assets/images/goal-image-2.webp";
import img3 from "../../assets/images/goal-image-3.webp";
import img4 from "../../assets/images/goal-image-4.webp";
import work1 from "../../assets/work/hidden.webp";
import work2 from "../../assets/work/porsche.webp";
import work3 from "../../assets/work/the-reve.webp";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  { src: img1, label: "Creator partnerships" },
  { src: img2, label: "Campaign analytics" },
  { src: img3, label: "Content production" },
  { src: img4, label: "Brand strategy" },
  { src: work1, label: "Hidden project" },
  { src: work2, label: "Porsche campaign" },
  { src: work3, label: "The Reve launch" },
  { src: img2, label: "Community growth" },
  { src: img3, label: "Storytelling" },
  { src: img4, label: "Engagement" },
];

const ElasticGridSection = () => {
  const gridRef = useRef(null);
  const originalItemsRef = useRef([]);
  const currentColumnCountRef = useRef(0);

  useEffect(() => {
    const body = document.body;
    body.classList.add("demo-3", "loading");

    const grid = gridRef.current;
    if (!grid) return;

    const originalItems = Array.from(grid.querySelectorAll(".grid__item"));
    originalItemsRef.current = originalItems;

    const clearGrid = () => {
      // Remove existing column wrappers if any
      const existingColumns = Array.from(
        grid.querySelectorAll(".grid__column")
      );
      existingColumns.forEach((col) => col.remove());

      // Re-append original items in initial order
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

        items.forEach((item) => {
          column.appendChild(item);
        });

        fragment.appendChild(column);

        const lag = baseLag + (index + 1) * lagScale;
        columnMeta.push({
          element: column,
          lag,
        });
      });

      grid.innerHTML = "";
      grid.appendChild(fragment);

      return columnMeta;
    };

    const applyColumnEffects = (columnsMeta) => {
      // Clear previous triggers for this grid
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars && st.vars.trigger && grid.contains(st.vars.trigger)) {
          st.kill();
        }
      });

      columnsMeta.forEach((colMeta, index) => {
        const { element, lag } = colMeta;

        gsap.to(element, {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: lag,
          },
        });
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

    preloadImages(".grid__item-img").then(() => {
      body.classList.remove("loading");
      init();
      window.addEventListener("resize", handleResize);
    });

    return () => {
      body.classList.remove("demo-3", "loading");
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars && st.vars.trigger && grid.contains(st.vars.trigger)) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <section className="elastic-grid-section w-full px-4 md:px-8">
      <div id="smooth-content" className="max-w-6xl mx-auto">
        

        <div ref={gridRef} className="grid">
          {IMAGES.map((img, index) => (
            <figure className="grid__item" key={index}>
              <div
                className="grid__item-img"
                style={{
                  backgroundImage: `url(${img.src})`,
                }}
              />
              <figcaption className="grid__item-caption">
                {img.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ElasticGridSection;

