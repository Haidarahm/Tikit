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

    // Rotating squares animation
    const squares = gsap.utils.toArray('.section-title__square');
    squares.forEach((sq) => {
      gsap.from(sq, {
        rotation: 720,
        scrollTrigger: {
          trigger: sq,
          start: 'top bottom',
          scrub: 1.9,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={wrapperRef} className="details-wrapper w-full overflow-hidden">
      <DetailsHeader />
      <DetailsAbout />
      <DetailsBenefits />
      <DetailsWork />
      <DetailsServices />
    </div>
  );
};

export default Details;
