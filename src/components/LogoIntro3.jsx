import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo";

function LogoIntro() {
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      const svg = document.querySelector(".intro-logo svg");
      const shapes = svg
        ? Array.from(
            svg.querySelectorAll(
              "path, rect, circle, ellipse, line, polyline, polygon"
            )
          )
        : [];

      // Hide everything instantly before animating
      gsap.set(".intro-logo", {
        opacity: 0,
        scale: 0.94,
        transformOrigin: "50% 50%",
      });

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

        gsap.set(el, {
          stroke: "#ffffff",
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
          shapes,
          {
            strokeDashoffset: 0,
            duration: 1.8,
            stagger: 0.02,
            ease: "power2.inOut",
          },
          0.05
        )
        .to(
          shapes,
          {
            fill: "#ffffff",
            fillOpacity: 1,
            duration: 0.6,
            stagger: 0.015,
          },
          "-=0.6"
        )
        .to(shapes, { strokeOpacity: 0, duration: 0.4 }, "+=0.1")
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
  }, [navigate]);

  return (
    <div
      ref={wrapperRef}
      className="w-full h-screen flex items-center justify-center bg-transparent"
    >
      <div className="intro-logo" aria-label="Brand logo">
        <Logo width={260} height={80} />
      </div>
    </div>
  );
}

export default LogoIntro;
