import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MetricTile from "./MetricTile";

gsap.registerPlugin(ScrollTrigger);

const DigitalWorkCard = ({
  data,
  availableMetrics,
  t,
  onViewDetails,
  formatMetricValue,
}) => {
  const workId = data?.work_id ?? data?.id ?? null;
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative rounded-3xl border border-[var(--foreground)] bg-[var(--card-background)] p-6 md:p-8 shadow-lg transition-shadow hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.35)]"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
          {data?.logo ? (
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-[var(--foreground)]/70 bg-[var(--surface)] p-2">
              <img
                src={data.logo}
                alt={data.title ?? "logo"}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
          ) : null}
          <div>
            <h3 className="text-[22px]  md:text-[26px] font-semibold text-[var(--foreground)]">
              {data?.title ?? t("work.viewWork")}
            </h3>
          </div>
        </div>
        <button
          className="whitespace-nowrap rounded-full border border-[var(--foreground)] bg-transparent px-4 py-2 text-[var(--foreground)] transition hover:bg-[var(--foreground)] hover:text-[var(--background)]"
          onClick={() => onViewDetails(workId)}
        >
          {t("work.viewWork")}
        </button>
      </div>

      {availableMetrics.length ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {availableMetrics.map((metric) => (
            <MetricTile
              key={metric.key}
              Icon={metric.icon}
              label={metric.label}
              value={formatMetricValue(metric.key, data[metric.key])}
              isObjective={metric.key === "objective"}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default DigitalWorkCard;
