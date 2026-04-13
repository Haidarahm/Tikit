import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CreativeBrandImages = ({ images = [], title = "" }) => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || images.length === 0) return;

    const tiles = sectionRef.current.querySelectorAll("[data-brand-tile]");
    if (!tiles.length) return;

    const ctx = gsap.context(() => {
      gsap.from(tiles, {
        autoAlpha: 0,
        y: 36,
        stagger: 0.1,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 88%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [images]);

  if (!Array.isArray(images) || images.length === 0) return null;

  const label = t("work.details.creative.brandImages");

  return (
    <section ref={sectionRef} className="space-y-6" aria-label={label}>
      <div className="space-y-2 text-center max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.5em] text-[var(--foreground)]/60">
          {t("work.details.creative.brandIdentity")}
        </p>
        <h2 className="text-xl font-semibold text-[var(--foreground)] md:text-2xl">
          {label}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, index) => (
          <div
            key={`${src}-${index}`}
            data-brand-tile
            className="group relative overflow-hidden rounded-[28px] border border-[var(--foreground)]/10 bg-[var(--container-bg)]/60 shadow-xl"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={src}
                alt={`${title} — ${label} ${index + 1}`}
                width={800}
                height={600}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--background)]/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CreativeBrandImages;
