import React, { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { preloadImages } from "../../../utils/preloadImages";
import "./elastic.css";

gsap.registerPlugin(ScrollTrigger);

const ElasticGridScroll = () => {
  const gridRef = useRef(null);
  const originalItemsRef = useRef([]);
  const currentColumnCountRef = useRef(0);

  // Load all images from assets/elastic (1.webp, 2.webp, ...)
  const images = useMemo(() => {
    const modules = import.meta.glob("../../../assets/elastic/*.webp", {
      eager: true,
    });

    return Object.keys(modules)
      .sort((a, b) => {
        const numA = parseInt(a.replace(/\D/g, ""), 10) || 0;
        const numB = parseInt(b.replace(/\D/g, ""), 10) || 0;
        return numA - numB;
      })
      .map((key) => {
        const fileName = key.split("/").pop() || "";
        const base = fileName.replace(".webp", "");
        return {
          src: modules[key].default,
          label: `Elastic ${base}`,
        };
      });
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const body = document.body;
    body.classList.add("demo-3", "loading");

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
          { yPercent: yOffset },
          {
            yPercent: -yOffset,
            ease: "none",
            scrollTrigger: {
              trigger: triggerEl,
              start: "top bottom",
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
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
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
    <section className="elastic-grid-section w-full py-16 md:py-24 px-4 md:px-8">
      <div id="smooth-content" className="max-w-6xl mx-auto">
        

        <div ref={gridRef} className="grid">
          {images.map((img, index) => (
            <figure className="grid__item" key={index}>
              <div
                className="grid__item-img"
                style={{ backgroundImage: `url(${img.src})` }}
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

export default ElasticGridScroll;
