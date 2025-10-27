import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function TikitButton({ text ,onClick}) {
  return (
    <button
      onMouseDown={(e) => {
        e.currentTarget.blur();
      }}
       onClick={onClick}
      className="group cursor-pointer relative inline-flex items-center gap-2  text-sm bg-[var(--secondary)] text-[var(--background)] px-4 py-2 rounded-full transition-[transform,background-color] duration-300 focus:outline-none hover:scale-[1.03] active:scale-[0.98]"
    >
      <span className="whitespace-nowrap transition-transform duration-300 group-hover:translate-x-1">
        {text}
      </span>
      {/* Arrow container expands to the right on hover/focus */}
      <span
        className="overflow-hidden inline-flex items-center justify-center w-0 opacity-0 -translate-x-1 transition-all duration-300 group-hover:w-4 group-hover:opacity-100 group-hover:translate-x-0 group-active:w-0 group-active:opacity-0 group-active:-translate-x-1"
        aria-hidden
      >
        <FaArrowRight className="size-4 -rotate-45" />
      </span>
    </button>
  );
}

export default TikitButton;
