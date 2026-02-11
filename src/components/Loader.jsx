import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTheme } from "../store/ThemeContext";
import SVGComponent from "../assets/logo";

function Loader() {
  const loaderRef = useRef(null);
  const { theme } = useTheme();

  const logoColor = theme === "light" ? "#363737" : "#ffffff";
  const logoJumpColor = "#52C3C5";

  useEffect(() => {
    if (!loaderRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial state - completely invisible
      gsap.set(".loader-logo", {
        opacity: 0,
        scale: 0.95,
      });

      // Animate in
      gsap.to(".loader-logo", {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.1,
      });

      // Create infinite fade loop
      gsap.to(".loader-logo", {
        opacity: 0.4,
        duration: 0.8,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.7,
      });
    }, loaderRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={loaderRef}
      className="h-screen w-full flex justify-center items-center"
    >
      <div className="loader-logo">
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

export default Loader;