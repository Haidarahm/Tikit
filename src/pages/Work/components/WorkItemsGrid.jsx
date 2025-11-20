import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiActivity,
  FiDollarSign,
  FiEye,
  FiPercent,
  FiPieChart,
  FiRepeat,
  FiSearch,
  FiShoppingBag,
  FiShoppingCart,
  FiTag,
  FiTarget,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const extractMediaUrl = (value) => {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    return (
      value.media ?? value.url ?? value.src ?? value.path ?? value.image ?? null
    );
  }
  return null;
};

const getFirstMediaUrl = (media) => {
  if (!Array.isArray(media) || media.length === 0) return null;
  return extractMediaUrl(media[0]);
};

const normalizeItem = (item, type, fallbackImage) => {
  switch (type) {
    case "influence": {
      const data = item ?? {};
      return {
        title: data?.title ?? "",
        image:
          getFirstMediaUrl(item?.media) ??
          extractMediaUrl(data?.logo) ??
          fallbackImage ??
          "",
        detailId: item?.id ?? data?.id ?? data?.work_id ?? null,
      };
    }
    case "social": {
      const data = item ?? {};
      return {
        title: data?.title ?? "",

        image:
          getFirstMediaUrl(item?.media) ??
          extractMediaUrl(data?.logo) ??
          fallbackImage ??
          "",
        detailId: item?.id ?? data?.id ?? data?.work_id ?? null,
      };
    }
    case "creative": {
      const data = item;
      return {
        title: data?.title ?? "",
        subtitle: "",
        image:
          extractMediaUrl(data?.main_image) ??
          getFirstMediaUrl(data?.images) ??
          extractMediaUrl(data?.logo) ??
          fallbackImage ??
          "",
        detailId: item?.id ?? data?.id ?? data?.work_id ?? null,
      };
    }
    case "event":
    case "events": {
      const data = item?.event ?? {};
      return {
        title: data?.title ?? "",
        subtitle: data?.objective ?? "",
        image:
          getFirstMediaUrl(item?.media) ??
          extractMediaUrl(data?.logo) ??
          fallbackImage ??
          "",
        detailId: item?.id ?? data?.id ?? data?.work_id ?? null,
      };
    }
    default:
      return {
        title: "",
        subtitle: "",
        image: fallbackImage ?? "",
        detailId: null,
      };
  }
};

const metricsConfig = [
  { key: "objective", label: "Objective", icon: FiTarget },
  { key: "cpo", label: "CPO", icon: FiTag },
  { key: "orders", label: "Orders", icon: FiShoppingBag },
  { key: "roas", label: "ROAS", icon: FiTrendingUp },
  { key: "top_search", label: "Top Search", icon: FiSearch },
  { key: "conversions", label: "Conversions", icon: FiRepeat },
  { key: "reach", label: "Reach", icon: FiEye },
  { key: "traffic", label: "Traffic", icon: FiActivity },
  { key: "ctr", label: "CTR", icon: FiPercent },
  { key: "cpp", label: "CPP", icon: FiDollarSign },
  { key: "avg_cart", label: "Cart", icon: FiShoppingCart },
  { key: "cltv", label: "CLTV", icon: FiPieChart },
  { key: "ftus", label: "FTUs", icon: FiUsers },
];

const plannedMetrics = new Set([
  "cpo",
  "orders",
  "roas",
  "conversions",
  "reach",
  "traffic",
  "ftus",
]);

const percentMetrics = new Set(["ctr", "top_search"]);
const dollarMetrics = new Set(["cpp"]);
const kwdMetrics = new Set(["avg_cart", "cltv"]);

const abbreviateNumber = (value) => {
  const absValue = Math.abs(value);
  const format = (num) => {
    const str = num.toFixed(num % 1 === 0 ? 0 : 1);
    return str.replace(/\.0$/, "");
  };

  if (absValue >= 1_000_000) {
    return `${format(value / 1_000_000)}M`;
  }

  if (absValue >= 1_000) {
    return `${format(value / 1_000)}K`;
  }

  return format(value);
};

const parseValueToNumber = (value) => {
  if (typeof value === "number" && !Number.isNaN(value)) {
    return value;
  }

  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  let multiplier = 1;
  let normalized = trimmed.toUpperCase();

  if (normalized.endsWith("K")) {
    multiplier = 1_000;
    normalized = normalized.slice(0, -1);
  } else if (normalized.endsWith("M")) {
    multiplier = 1_000_000;
    normalized = normalized.slice(0, -1);
  }

  normalized = normalized
    .replace(/[%,$د.كKWD]/gi, "")
    .replace(/Planned/gi, "")
    .trim();

  const parsed = Number.parseFloat(normalized);
  if (Number.isNaN(parsed)) {
    return null;
  }

  return parsed * multiplier;
};

const formatMetricValue = (key, rawValue) => {
  if (rawValue === null || rawValue === undefined || rawValue === "") {
    return "-";
  }

  if (key === "objective") {
    return rawValue;
  }

  const numericValue = parseValueToNumber(rawValue);
  if (numericValue === null) {
    return rawValue;
  }

  let formatted = abbreviateNumber(numericValue);

  if (percentMetrics.has(key)) {
    formatted = `${formatted}%`;
  }

  if (dollarMetrics.has(key)) {
    formatted = `${formatted}$`;
  }

  if (kwdMetrics.has(key)) {
    return `${formatted} KWD د.ك`;
  }

  if (
    plannedMetrics.has(key) ||
    percentMetrics.has(key) ||
    dollarMetrics.has(key)
  ) {
    return `${formatted} Planned`;
  }

  return formatted;
};

const WorkItemsGrid = ({
  items,
  isDigital,
  activeKey,
  selectedSection,
  loading,
  error,
  showEmptyState,
  onViewDetails,
  t,
  containerKey,
}) => {
  const imagesRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    imagesRef.current = [];
  }, [containerKey, isDigital]);

  useLayoutEffect(() => {
    if (isDigital) return;
    if (!containerRef.current) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const start = isMobile ? "top 80%" : "top 90%";
    const end = isMobile ? "top 60%" : "top 20%";

    const ctx = gsap.context(() => {
      imagesRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { height: "10%" },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start,
              end,
              scrub: 0.5,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [items, isDigital]);

  const nonDigitalCount = Array.isArray(items) ? items.length : 0;
  const computedRows = Math.max(1, Math.ceil(nonDigitalCount / 2));
  const rowClassMap = {
    1: "md:grid-rows-1",
    2: "md:grid-rows-2",
    3: "md:grid-rows-3",
    4: "md:grid-rows-4",
  };
  const rowClass = rowClassMap[computedRows] ?? "md:grid-rows-4";
  const dynamicHeight = computedRows * 75;

  const containerClass = isDigital
    ? "images grid grid-cols-1 gap-6 md:gap-8 p-4 md:px-6"
    : `images grid grid-cols-1 md:grid-cols-2 ${rowClass} gap-4 p-4`;

  const digitalMetrics = useMemo(
    () =>
      items.map((item) => {
        const data = item || {};
        const available = metricsConfig.filter((metric) => {
          const value = data?.[metric.key];
          return value !== undefined && value !== null && value !== "";
        });
        return { data, available };
      }),
    [items]
  );

  return (
    <div
      ref={containerRef}
      className={`${containerClass} relative`}
      style={
        !isDigital && nonDigitalCount
          ? { height: `${dynamicHeight}vh` }
          : undefined
      }
    >
      {error ? (
        <div className="col-span-full text-center text-sm text-red-400">
          {error}
        </div>
      ) : null}

      {!loading && !error
        ? isDigital
          ? digitalMetrics.map(({ data, available }, index) => (
              <div
                key={`digital-${data?.id ?? index}`}
                className="group relative rounded-3xl border border-[var(--border)] bg-[var(--card-background)] p-6 md:p-8 shadow-lg transition-shadow hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.35)]"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
                    {data?.logo ? (
                      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-[var(--border)]/70 bg-[var(--surface)] p-2">
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
                    className="whitespace-nowrap rounded-full border border-[var(--border)] bg-transparent px-4 py-2 text-[var(--foreground)] transition hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                    onClick={() =>
                      onViewDetails(data?.work_id ?? data?.id ?? null)
                    }
                  >
                    {t("work.viewWork")}
                  </button>
                </div>

                {available.length ? (
                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {available.map((metric) => {
                      const Icon = metric.icon;
                      const isObjective = metric.key === "objective";
                      const value = formatMetricValue(
                        metric.key,
                        data[metric.key]
                      );
                      return (
                        <div
                          key={metric.key}
                          className={`rounded-2xl border border-[var(--border)]/60 bg-[var(--surface)] px-4 py-3 text-[var(--foreground)] shadow-inner ${
                            isObjective ? "sm:col-span-2 lg:col-span-3" : ""
                          }`}
                        >
                          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--foreground)]/60">
                            {Icon ? (
                              <Icon className="text-[var(--accent)] text-sm" />
                            ) : null}
                            <span>{metric.label}</span>
                          </div>
                          <div
                            className={`mt-1 font-semibold text-[var(--foreground)] ${
                              isObjective
                                ? "text-base leading-relaxed whitespace-pre-wrap break-words max-h-40 overflow-y-auto pr-1"
                                : "text-lg"
                            }`}
                          >
                            {value}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            ))
          : items.map((item, index) => {
              const normalized = normalizeItem(
                item,
                activeKey,
                selectedSection?.media
              );

              return (
                <div
                  key={normalized.detailId ?? `${activeKey}-${index}`}
                  ref={(el) => {
                    imagesRef.current[index] = el;
                  }}
                  className="group relative overflow-hidden rounded-lg shadow-lg"
                  style={{ height: "10%" }}
                >
                  {normalized.image ? (
                    <img
                      src={normalized.image}
                      alt={normalized.title || "work"}
                      className="h-full w-full rounded-lg object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-full w-full bg-[var(--muted)]" />
                  )}

                  <div className="content-work absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-black/30 opacity-100 transition-opacity duration-300 md:bg-black/60 md:opacity-0 md:group-hover:opacity-100">
                    {normalized.title ? (
                      <h3 className="text-center text-[26px] font-bold text-white md:text-[30px]">
                        {normalized.title}
                      </h3>
                    ) : null}
                    {normalized.subtitle ? (
                      <p className="mb-4 text-center text-[18px] text-gray-200 md:text-[20px]">
                        {normalized.subtitle}
                      </p>
                    ) : null}
                    <button
                      className="rounded-full border mt-4 border-white bg-transparent px-4 py-2 text-white transition hover:bg-white hover:text-black"
                      onClick={() => onViewDetails(normalized.detailId)}
                    >
                      {t("work.viewWork")}
                    </button>
                  </div>
                </div>
              );
            })
        : null}

      {showEmptyState ? (
        <div className="col-span-full text-center text-sm opacity-70">
          {t("work.noWorks")}
        </div>
      ) : null}
    </div>
  );
};

export default WorkItemsGrid;
