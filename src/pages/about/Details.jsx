import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DetailsHeader from "./DetailsHeader";
import DetailsAbout from "./DetailsAbout";
import DetailsBenefits from "./DetailsBenefits";
import DetailsWork from "./DetailsWork";
import DetailsServices from "./DetailsServices";

gsap.registerPlugin(ScrollTrigger);

const Details = () => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Logo shape rotation animation on scroll
      const shapes = gsap.utils.toArray(".section-title__square");
      shapes.forEach((shape) => {
        gsap.to(shape, {
          rotation: 360,
          ease: "none",
          scrollTrigger: {
            trigger: shape,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="details-wrapper w-full overflow-hidden bg-[var(--background)]"
    >
      <DetailsHeader />
      <DetailsAbout />
      <DetailsBenefits />
      <DetailsWork />
      <DetailsServices />
    </div>
  );
};

export default Details;
