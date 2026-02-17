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
import DigitalWorkCard from "./DigitalWorkCard";
import NonDigitalWorkCard from "./NonDigitalWorkCard";
import { useI18nLanguage } from "../../../store/I18nLanguageContext";

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
        objective: data?.objective ?? "",
        image:
          getFirstMediaUrl(item?.media) ??
          extractMediaUrl(data?.logo) ??
          fallbackImage ??
          "",
        detailId: item?.slug ?? data?.slug ?? null,
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
        detailId: item?.slug ?? data?.slug ?? null,
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
        detailId: item?.slug ?? data?.slug ?? null,
      };
    }
    case "event":
    case "events": {
      const data = item || {};
      return {
        title: data?.title ?? "",
        subtitle:  "",
        image:
          getFirstMediaUrl(item?.media) ??
          extractMediaUrl(data?.logo) ??
          fallbackImage ??
          "",
        detailId: item?.slug ?? data?.slug ?? null,
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
    const end = isMobile ? "top 60%" : "top 10%";

    const ctx = gsap.context(() => {
      imagesRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { minHeight: "10%", height: "10%" },
          {
            minHeight: "100%",
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
    5: "md:grid-rows-5",
    6: "md:grid-rows-6",
  };
  const { isRtl } = useI18nLanguage();
  const rowClass = rowClassMap[computedRows] ?? "md:grid-rows-4";
  const dynamicHeight = computedRows * 85;

  const containerClass = isDigital
    ? "images grid grid-cols-1 gap-6 md:gap-8 p-4 md:px-6"
    : `images grid grid-cols-1 md:grid-cols-2 ${rowClass} gap-4 p-4 `;

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
      data-nav-color="white"
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
              <DigitalWorkCard
                key={`digital-${data?.id ?? index}`}
                data={data}
                availableMetrics={available}
                t={t}
                onViewDetails={onViewDetails}
                formatMetricValue={formatMetricValue}
              />
            ))
          : items.map((item, index) => {
              const normalized = normalizeItem(
                item,
                activeKey,
                selectedSection?.media
              );

              return (
                <NonDigitalWorkCard
                  key={normalized.detailId ?? `${activeKey}-${index}`}
                  isRtl={isRtl}
                  innerRef={(el) => {
                    imagesRef.current[index] = el;
                  }}
                  normalized={normalized}
                  t={t}
                  onViewDetails={onViewDetails}
                />
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
