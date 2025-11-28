import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

function FlowingMenu({ items = [] }) {
  return (
    <div className="w-full h-full overflow-hidden">
      <nav className="flex flex-col h-full m-0 p-0">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ link, text, image }) {
  const itemRef = useRef(null);
  const marqueeWrapperRef = useRef(null); // GSAP controls Y here
  const marqueeContentRef = useRef(null); // CSS marquee controls X here

  const animationDefaults = { duration: 0.6, ease: "expo" };

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = (mouseX - width / 2) ** 2 + mouseY ** 2;
    const bottomEdgeDist = (mouseX - width / 2) ** 2 + (mouseY - height) ** 2;
    return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
  };

  const handleMouseEnter = (ev) => {
    if (!itemRef.current || !marqueeWrapperRef.current) return;

    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeWrapperRef.current, {
        y: edge === "top" ? "-101%" : "101%",
      })
      .to(marqueeWrapperRef.current, { y: "0%" });
  };

  const handleMouseLeave = (ev) => {
    if (!itemRef.current || !marqueeWrapperRef.current) return;

    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeWrapperRef.current, {
        y: edge === "top" ? "-101%" : "101%",
      });
  };

  // CSS marquee only controls X animation
  const repeatedContent = Array.from({ length: 4 }).map((_, idx) => (
    <React.Fragment key={idx}>
      <span className="text-[var(--background)] uppercase font-normal text-[4vh] leading-[1.2] px-[1vw]">
        {text}
      </span>
      <div
        className="w-[200px] h-[7vh] mx-[2vw] rounded-[50px] bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
    </React.Fragment>
  ));

  return (
    <div
      ref={itemRef}
      className="flex-1 relative overflow-hidden text-center shadow-[0_-1px_0_0_var(--secondary)] py-6"
    >
      <a
        href={link}
        className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-semibold text-[var(--secondary)] text-[20px] md:text-[4vh] hover:text-[var(--background)]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </a>

      {/* Y animation (GSAP) */}
      <div
        ref={marqueeWrapperRef}
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-[var(--secondary)] translate-y-[101%] will-change-transform"
      >
        {/* X animation (CSS marquee) */}
        <div
          ref={marqueeContentRef}
          className="flex items-center h-full w-[200%] animate-[marquee_15s_linear_infinite] will-change-transform"
        >
          {repeatedContent}
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu;
