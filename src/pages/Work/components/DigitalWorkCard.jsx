import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MetricTile from "./MetricTile";

gsap.registerPlugin(ScrollTrigger);

const DigitalWorkCard = ({ data, availableMetrics, t, formatMetricValue }) => {
  const workId = data?.work_id ?? data?.id ?? null;
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const objective =
    data?.objective ??
    data?.objective_text ??
    data?.objective_en ??
    data?.objective_ar ??
    "";
  const filteredMetrics = availableMetrics.filter(
    (metric) => metric.key !== "objective"
  );

  useLayoutEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      const metricTiles =
        cardRef.current.querySelectorAll("[data-metric-tile]") ?? [];

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      timeline.fromTo(
        cardRef.current,
        { autoAlpha: 0, y: 80, rotateX: 8, scale: 0.94, filter: "blur(6px)" },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power4.out",
        }
      );

      if (glowRef.current) {
        timeline.fromTo(
          glowRef.current,
          { opacity: 0, clipPath: "inset(0 100% 0 0)" },
          {
            opacity: 0.35,
            clipPath: "inset(0 0% 0 0)",
            duration: 0.9,
            ease: "power2.out",
          },
          "-=0.7"
        );
        timeline.to(
          glowRef.current,
          { opacity: 0, duration: 0.6, ease: "power1.out" },
          "-=0.3"
        );
      }

      if (metricTiles.length) {
        timeline.from(
          metricTiles,
          {
            autoAlpha: 0,
            y: 24,
            filter: "blur(8px)",
            stagger: 0.08,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.4"
        );
      }
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-3xl border border-[var(--foreground)] bg-[var(--card-background)] p-6 md:p-8 shadow-lg transition-shadow hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.35)]"
    >
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--accent)]/30 via-transparent to-[var(--accent-foreground)]/30 blur-3xl opacity-0"
      />
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
          {data?.logo ? (
            <div className="flex h-16 w-20 items-center bg-white justify-center overflow-hidden rounded-full border border-[var(--foreground)]/70 p-2">
              <img
                src={data.logo}
                alt={data.title ?? "logo"}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
          ) : null}
          <div className="space-y-2">
            <h3 className="text-[22px]  md:text-[26px] font-semibold text-[var(--foreground)]">
              {data?.title ?? t("work.viewWork")}
            </h3>
            {objective ? (
              <p className="text-sm leading-relaxed text-[var(--foreground)]/80 whitespace-pre-line">
                {objective}
              </p>
            ) : null}
          </div>
        </div>
        <button
          className="whitespace-nowrap rounded-full border border-[var(--foreground)] bg-transparent px-4 py-2 text-[var(--foreground)] transition hover:bg-[var(--foreground)] hover:text-[var(--background)]"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded
            ? t("work.hideDetails", "Hide details")
            : t("work.viewDetails", "View details")}
        </button>
      </div>

      {filteredMetrics.length ? (
        <div
          className={`mt-6 overflow-hidden transition-all duration-500 ease-out ${
            isExpanded ? "max-h-[1600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 pb-4 px-4">
            {filteredMetrics.map((metric) => {
              const rawValue = data[metric.key];
              // Skip rendering any metric tile when its raw value is empty/null/undefined/zero
              if (
                rawValue === null ||
                rawValue === undefined ||
                rawValue === "" ||
                rawValue === "0" ||
                rawValue === 0 ||
                rawValue === "0.00" ||
                (typeof rawValue === "string" && parseFloat(rawValue) === 0)
              ) {
                return null;
              }

              const value = formatMetricValue(metric.key, rawValue);
              return (
                <MetricTile
                  key={metric.key}
                  Icon={metric.icon}
                  label={metric.label}
                  value={value}
                  isObjective={metric.key === "objective"}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DigitalWorkCard;
