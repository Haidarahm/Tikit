import React, { useMemo, useRef, useState } from "react";
import { motion as Motion, useInView } from "framer-motion";
import {
  digitalWorkCardGlowHidden,
  digitalWorkCardGlowTransition,
  digitalWorkCardGlowVisibleKeyframes,
  digitalWorkCardInViewOptions,
  digitalWorkCardMetricHidden,
  digitalWorkCardMetricTransition,
  digitalWorkCardMetricVisible,
  digitalWorkCardOuterHidden,
  digitalWorkCardOuterTransition,
  digitalWorkCardOuterVisible,
  EASE_SMOOTH,
} from "@/helpers/framerMotion";
import MetricTile from "./MetricTile";

const DigitalWorkCard = ({ data, availableMetrics, t, formatMetricValue }) => {
  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, digitalWorkCardInViewOptions);
  const [isExpanded, setIsExpanded] = useState(false);
  const objective =
    data?.objective ??
    data?.objective_text ??
    data?.objective_en ??
    data?.objective_ar ??
    "";
  const filteredMetrics = availableMetrics.filter(
    (metric) => metric.key !== "objective",
  );

  const tilesToRender = useMemo(() => {
    return filteredMetrics.flatMap((metric) => {
      const rawValue = data[metric.key];
      if (
        rawValue === null ||
        rawValue === undefined ||
        rawValue === "" ||
        rawValue === "0" ||
        rawValue === 0 ||
        rawValue === "0.00" ||
        (typeof rawValue === "string" && parseFloat(rawValue) === 0)
      ) {
        return [];
      }
      return [{ metric, rawValue }];
    });
  }, [filteredMetrics, data]);

  return (
    <div className="relative" style={{ perspective: 1200 }}>
      <Motion.div
        ref={cardRef}
        className="group relative overflow-hidden rounded-3xl border border-[var(--foreground)] bg-[var(--card-background)] p-6 md:p-8 shadow-lg transition-shadow hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.35)]"
        style={{ transformStyle: "preserve-3d" }}
        initial={digitalWorkCardOuterHidden}
        animate={isCardInView ? digitalWorkCardOuterVisible : digitalWorkCardOuterHidden}
        transition={digitalWorkCardOuterTransition}
      >
        <Motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--accent)]/30 via-transparent to-[var(--accent-foreground)]/30 blur-3xl"
          initial={digitalWorkCardGlowHidden}
          animate={
            isCardInView
              ? digitalWorkCardGlowVisibleKeyframes
              : digitalWorkCardGlowHidden
          }
          transition={isCardInView ? digitalWorkCardGlowTransition : { duration: 0 }}
        />
        <Motion.div
          className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
          initial={{ opacity: 0, y: 16 }}
          animate={isCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{
            duration: 0.55,
            ease: EASE_SMOOTH,
            delay: isCardInView ? 0.12 : 0,
          }}
        >
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
            type="button"
            className="whitespace-nowrap rounded-full border border-[var(--foreground)] bg-transparent px-4 py-2 text-[var(--foreground)] transition hover:bg-[var(--foreground)] hover:text-[var(--background)]"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded
              ? t("work.hideDetails", "Hide details")
              : t("work.viewDetails", "View details")}
          </button>
        </Motion.div>

        {filteredMetrics.length ? (
          <div
            className={`mt-6 overflow-hidden transition-all duration-500 ease-out ${
              isExpanded ? "max-h-[1600px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 pb-4 px-4">
              {tilesToRender.map(({ metric, rawValue }, idx) => {
                const value = formatMetricValue(metric.key, rawValue);
                return (
                  <Motion.div
                    key={metric.key}
                    initial={digitalWorkCardMetricHidden}
                    animate={
                      isCardInView
                        ? digitalWorkCardMetricVisible
                        : digitalWorkCardMetricHidden
                    }
                    transition={digitalWorkCardMetricTransition(idx)}
                  >
                    <MetricTile
                      Icon={metric.icon}
                      label={metric.label}
                      value={value}
                      isObjective={metric.key === "objective"}
                    />
                  </Motion.div>
                );
              })}
            </div>
          </div>
        ) : null}
      </Motion.div>
    </div>
  );
};

export default DigitalWorkCard;
