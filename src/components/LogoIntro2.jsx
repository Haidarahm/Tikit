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

      // Set initial state for logo
      gsap.set(".intro-logo", {
        opacity: 0,
        scale: 75,
        transformOrigin: "50% 50%",
      });

      // Set initial state for background - start white
      gsap.set(".background-overlay", {
        opacity: 1,
        backgroundColor: "#ffffff",
      });

      // Set initial colors for shapes
      shapes.forEach((el) => {
        gsap.set(el, {
          fill: "#ffffff",
          fillOpacity: 1,
          stroke: "none",
          strokeOpacity: 0,
        });
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Step 1: Fade in logo while still at scale 75
      tl.to(".intro-logo", {
        opacity: 1,
        duration: 0.1,
      })
        // Step 2: Scale logo from 75 to 1 and fade out background simultaneously
        .to(
          ".intro-logo",
          {
            scale: 1,
            duration: 1,
            delay: 0.8,
            ease: "back.out(0.4)",
          },
          0
        ) // Start at same time as background fade
        .to(
          ".background-overlay",
          {
            opacity: 0,
            duration: 0.2, // Same duration as logo scale animation
            delay: 1,
            ease: "power3.out",
          },
          0
        )

        // Step 3: Remove fill color
        .to(shapes, {
          fillOpacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        })

        // Step 4: Prepare and draw strokes
        .call(() => {
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
              strokeDasharray: length,
              strokeDashoffset: length,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeOpacity: 1,
            });
          });
        })

        // Step 5: Animate strokes drawing
        .to(
          shapes,
          {
            strokeDashoffset: 0,
            duration: 1.4,
            stagger: 0.02,
            ease: "power2.inOut",
          },
          "+=0.1"
        )

        // Step 6: Fill the shapes again
        .to(
          shapes,
          {
            fill: "#ffffff",
            fillOpacity: 1,
            duration: 0.6,
            stagger: 0.015,
            ease: "power2.out",
          },
          "-=0.4"
        )

        // Step 7: Remove strokes
        .to(
          shapes,
          {
            strokeOpacity: 0,
            duration: 0.3,
            ease: "power1.inOut",
          },
          "+=0.1"
        )

        // Step 8: Scale to 0 smoothly
        .to(".intro-logo", {
          scale: 0,
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
        });

      // Navigate to home after animation completes
      tl.eventCallback("onComplete", () => {
        navigate("/home");
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [navigate]);

  return (
    <div
      ref={wrapperRef}
      className="w-full overflow-hidden h-screen flex items-center justify-center bg-transparent relative"
    >
      {/* White background overlay that fades out */}
      <div
        className="background-overlay absolute inset-0"
        style={{
          backgroundColor: "#ffffff",
          opacity: 1,
        }}
      />

      {/* Logo */}
      <div
        className="intro-logo relative z-10"
        aria-label="Brand logo"
        style={{
          opacity: 0,
          transform: "scale(75)",
          transformOrigin: "50% 50%",
        }}
      >
        <Logo width={260} height={80} />
      </div>
    </div>
  );
}

export default LogoIntro;
