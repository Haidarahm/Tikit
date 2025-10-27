import * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SVGComponent = ({
  color = "#FFFFFF",
  logoJumpColor = "#35d3cf",
  ...props
}) => {
  const svgRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!svgRef.current) return;

    const svg = svgRef.current;
    const shapes = Array.from(
      svg.querySelectorAll(
        "path, rect, circle, ellipse, line, polyline, polygon"
      )
    );

    // Prepare all shapes
    shapes.forEach((el) => {
      let length = 0;
      try {
        if (typeof el.getTotalLength === "function") {
          length = el.getTotalLength();
        }
      } catch {
        length = 300;
      }
      if (!Number.isFinite(length) || length <= 0) length = 300;

      // Save original fill color
      const originalFill = window.getComputedStyle(el).fill;

      gsap.set(el, {
        stroke: el.classList.contains("logo-jump-1") ? logoJumpColor : color,
        strokeWidth: 2,
        fill: originalFill,
        fillOpacity: 0, // start invisible
        strokeDasharray: length,
        strokeDashoffset: length,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      });
    });

    // Timeline like LogoIntro
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: svgRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse", // play on enter, reverse on leave
      },
    });

    tl.to(shapes, {
      strokeDashoffset: 0,
      duration: 1.8,
      stagger: 0.02,
      ease: "power2.inOut",
    })
      .to(
        shapes,
        {
          fillOpacity: 1,
          duration: 0.6,
          stagger: 0.015,
        },
        "-=0.6"
      )
      .to(shapes, { strokeOpacity: 0, duration: 0.4 }, "+=0.1");

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 572.13 176.11"
      {...props}
    >
      <defs>
        <style>
          {`.cls-2{fill:${color};}
            .logo-jump-1{fill:${logoJumpColor};}`}
        </style>
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            className="cls-2"
            d="M144.22,29.29V63.06a5.61,5.61,0,0,1-5.61,5.61h-44V170.49A5.62,5.62,0,0,1,89,176.11H55.22a5.62,5.62,0,0,1-5.61-5.62V68.67h-44A5.61,5.61,0,0,1,0,63.06V29.29a5.62,5.62,0,0,1,5.61-5.62h133A5.62,5.62,0,0,1,144.22,29.29Z"
          />
          <rect
            className="cls-2"
            x={104.39}
            y={77.39}
            width={152.44}
            height={45}
            rx={5.61}
            transform="translate(280.51 -80.72) rotate(90)"
          />
          <path
            className="cls-2 "
            d="M352.62,123.73H329.31a7.82,7.82,0,0,0-4.13,1.17L283,150.9a7.53,7.53,0,0,1-9.34-1.15l-23.42-24a6.52,6.52,0,0,0-4.67-2H226.06a5.61,5.61,0,0,0-5.61,5.61v39.12a5.61,5.61,0,0,0,5.61,5.61H352.62a5.62,5.62,0,0,0,5.62-5.61V129.34A5.62,5.62,0,0,0,352.62,123.73Z"
          />
          <path
            className="cls-2 logo-jump-1"
            d="M413,3.48V52.73a10.43,10.43,0,0,1-2.55,6.85,10.06,10.06,0,0,1-2.23,1.93l-80.6,51.08L284.43,140a6.5,6.5,0,0,1-8.26-1.05L221.27,81A15.76,15.76,0,0,1,217,70.17V21.89a3.63,3.63,0,0,1,6.21-2.66L279.3,76.28a5.69,5.69,0,0,0,7.13.84L407.85.52A3.38,3.38,0,0,1,413,3.48Z"
          />
          <path
            className="cls-2"
            d="M373.28,176.11h37.34a3.39,3.39,0,0,0,3.39-3.39V84.14a5.26,5.26,0,0,0-7.89-4.55l-30,17.32a13.51,13.51,0,0,0-6.76,11.71v63.6A3.89,3.89,0,0,0,373.28,176.11Z"
          />
          <path
            className="cls-2"
            d="M572.13,29.29V63.06a5.61,5.61,0,0,1-5.61,5.61h-44V170.49a5.62,5.62,0,0,1-5.61,5.62H483.13a5.62,5.62,0,0,1-5.61-5.62V68.67h-44a5.61,5.61,0,0,1-5.61-5.61V29.29a5.62,5.62,0,0,1,5.61-5.62h133A5.62,5.62,0,0,1,572.13,29.29Z"
          />
        </g>
      </g>
    </svg>
  );
};

export default SVGComponent;
