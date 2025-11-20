import React from "react";

const MetricTile = ({ Icon, label, value, isObjective }) => {
  return (
    <div
      className={`rounded-2xl border border-[var(--border)]/60 bg-[var(--surface)] px-4 py-3 text-[var(--foreground)] shadow-inner ${
        isObjective ? "sm:col-span-2 lg:col-span-3" : ""
      }`}
    >
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--foreground)]/60">
        {Icon ? <Icon className="text-[var(--accent)] text-sm" /> : null}
        <span>{label}</span>
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
};

export default MetricTile;
