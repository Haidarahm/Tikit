import React from "react";
import { Skeleton } from "antd";

const CreativeLoading = () => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 px-4 md:px-6 pt-28 pb-10">
    {[0, 1, 2, 3].map((index) => (
      <div
        key={`creative-skeleton-${index}`}
        className="h-[260px] rounded-3xl bg-[var(--container-bg)]/80 p-6"
      >
        <Skeleton.Node active className="w-full h-full" />
      </div>
    ))}
  </div>
);

export default CreativeLoading;
