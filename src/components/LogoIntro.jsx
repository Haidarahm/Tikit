import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTheme } from "../store/ThemeContext";
import SVGComponent from "../assets/logo";

function LogoIntro({ onComplete }) {
  const wrapperRef = useRef(null);
  const { theme } = useTheme();

  const logoColor = theme === "light" ? "#363737" : "#ffffff";
  const logoJumpColor = "#52C3C5";

  useEffect(() => {
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      const svg = document.querySelector(".intro-logo svg");
      const allShapes = svg
        ? Array.from(
            svg.querySelectorAll(
              "path, rect, circle, ellipse, line, polyline, polygon"
            )
          )
        : [];

      const jumpShape = svg?.querySelector(".logo-jump");
      const regularShapes = allShapes.filter((el) => el !== jumpShape);

      // Set initial wrapper state
      gsap.set(".intro-logo", {
        visibility: "visible",
        opacity: 1,
        scale: 1,
        transformOrigin: "50% 50%",
      });

      // Set initial styles for all shapes IMMEDIATELY to prevent flash
      allShapes.forEach((el) => {
        let length = 0;
        try {
          if (typeof el.getTotalLength === "function") {
            length = el.getTotalLength();
          }
        } catch {
          length = 300;
        }
        if (!Number.isFinite(length) || length <= 0) length = 300;

        gsap.set(el, {
          stroke: el === jumpShape ? logoJumpColor : logoColor,
          strokeWidth: 2,
          fill: "none",
          fillOpacity: 0,
          strokeDasharray: length,
          strokeDashoffset: length,
          strokeLinecap: "round",
          strokeLinejoin: "round",
        });
      });

      const tl = gsap.timeline({ 
        defaults: { ease: "power3.out" },
        delay: 0.2 // Small delay to ensure styles are applied
      });

      // Start drawing the strokes
      tl.to(
          allShapes,
          {
            strokeDashoffset: 0,
            duration: 1.8,
            stagger: 0.02,
            ease: "power2.inOut",
          }
        )
        // Fill the shapes
        .to(
          regularShapes,
          {
            fill: logoColor,
            fillOpacity: 1,
            duration: 0.6,
            stagger: 0.015,
          },
          "-=0.6"
        )
        .to(
          jumpShape,
          {
            fill: logoJumpColor,
            fillOpacity: 1,
            duration: 0.6,
          },
          "-=0.6"
        )
        // Remove strokes
        .to(allShapes, { strokeOpacity: 0, duration: 0.4 }, "+=0.1")
        // Fade out
        .to(".intro-logo", {
          opacity: 0,
          duration: 0.6,
          ease: "power2.in",
        });

      tl.eventCallback("onComplete", () => {
        if (typeof window !== "undefined") {
          try {
            sessionStorage.setItem("logoIntroSeen", "true");
          } catch (_) {
            // ignore storage failures
          }
        }
        if (typeof onComplete === "function") {
          onComplete();
        }
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [theme, logoColor, logoJumpColor, onComplete]);

  return (
    <div
      ref={wrapperRef}
      className="w-full h-screen flex items-center justify-center bg-transparent"
    >
      <div
        className="intro-logo"
        style={{ visibility: "hidden" }}
      >
        <SVGComponent
          width={260}
          height={80}
          color={logoColor}
          logoJumpColor={logoJumpColor}
        />
      </div>
    </div>
  );
}

export default LogoIntro;