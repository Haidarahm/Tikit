import * as React from "react";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const TickLoader = (props) => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);

  useGSAP(
    () => {
      const path = pathRef.current;
      if (!path) return;

      const length = path.getTotalLength();

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        fillOpacity: 0,
      });

      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "power2.inOut" },
      });

      // Draw
      tl.to(path, { strokeDashoffset: 0, duration: 1.2 });
      // Staggered-feel pause before fill
      tl.to(path, { duration: 0.15 });
      // Fill in
      tl.to(path, { fillOpacity: 1, duration: 0.6 }, ">-0.05");
      // Hold a beat
      tl.to(path, { duration: 0.25 });
      // Unfill
      tl.to(path, { fillOpacity: 0, duration: 0.5 });
      // Erase draw
      tl.to(path, { strokeDashoffset: length, duration: 1.0 });
    },
    { scope: svgRef }
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#000",
      }}
    >
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 201.36 140.98"
        width={props.width || 160}
        height={props.height || 112}
        {...props}
      >
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <path
              ref={pathRef}
              d="M71.34,77.13,196.06.52a3.48,3.48,0,0,1,5.3,3V52.73a10.35,10.35,0,0,1-4.9,8.79L69.29,140a6.84,6.84,0,0,1-8.49-1L4.41,81A15.56,15.56,0,0,1,0,70.17V21.89a3.75,3.75,0,0,1,6.38-2.66L64,76.28A6,6,0,0,0,71.34,77.13Z"
              fill="#ffffff"
              stroke="#ffffff"
              strokeWidth={8}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default TickLoader;
