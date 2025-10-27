import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../store/ThemeContext";
import SVGComponent from "../assets/logo";

function LogoIntro() {
  const wrapperRef = useRef(null);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const logoColor = theme === "light" ? "#363737" : "#ffffff";
  const logoJumpColor = theme === "light" ? "#52C3C5" : "#ffffff";

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

      gsap.set(".intro-logo", {
        visibility: "visible",
        opacity: 0,
        scale: 0.94,
        transformOrigin: "50% 50%",
      });

      // Set initial styles for all shapes
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

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(".intro-logo", { opacity: 1, scale: 1, duration: 0.6 })
        .to(
          allShapes,
          {
            strokeDashoffset: 0,
            duration: 1.8,
            stagger: 0.02,
            ease: "power2.inOut",
          },
          0.05
        )
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
        .to(allShapes, { strokeOpacity: 0, duration: 0.4 }, "+=0.1")
        .to(".intro-logo", {
          scale: 0,
          opacity: 0,
          duration: 0.8,
          ease: "power4.in",
        });

      tl.eventCallback("onComplete", () => {
        navigate("/home");
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [navigate, theme, logoColor, logoJumpColor]);

  return (
    <div
      ref={wrapperRef}
      className="w-full h-screen flex items-center justify-center bg-transparent"
    >
      <div
        className="intro-logo"
        aria-label="Brand logo"
        style={{ opacity: 0, visibility: "hidden" }}
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
