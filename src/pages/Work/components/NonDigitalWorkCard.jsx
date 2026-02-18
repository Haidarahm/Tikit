import React from "react";

const NonDigitalWorkCard = ({isRtl, innerRef, normalized, t, onViewDetails }) => {
  
  return (
    <div
      ref={innerRef}
      
      className="group relative overflow-hidden rounded-lg shadow-lg h-full w-full"
      style={{ minHeight: "10%" }}
    >
      {normalized.image ? (
        <img
          src={normalized.image}
          alt={normalized.title || "work"}
          width={400}
          height={300}
          className="h-full w-full object-center rounded-lg object-cover"
          loading="lazy"
        />
      ) : (
        <div className="h-full w-full bg-[var(--muted)]" />
      )}

      <div className="content-work absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-black/30 opacity-100 transition-opacity duration-300 md:bg-black/60 md:opacity-0 md:group-hover:opacity-100">
        {normalized.title ? (
          <h3  className={`${isRtl ? "font-cairo" : "font-antonio"}  text-center text-[28px] font-bold text-white md:text-[60px]`}>
            {normalized.title}
          </h3>
        ) : null}
        {normalized.objective ? (
          <p className="hidden md:block mb-4 text-center text-[18px] text-gray-200 md:text-[20px]">
            {normalized.objective}
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
};

export default NonDigitalWorkCard;
