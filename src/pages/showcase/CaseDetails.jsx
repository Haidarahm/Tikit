import React, { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import Hero from "./Hero";
import CaseNumbers from "./CaseNumbers";
import Images from "./Images";
import CaseStudy from "./CaseStudy";

const CaseDetails = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      lerp: 0.08,
    });

    // Make accessible if other components need it
    window.locomotiveScrollInstance = scroll;

    return () => {
      if (scroll) {
        scroll.destroy();
      }
      if (window.locomotiveScrollInstance === scroll) {
        window.locomotiveScrollInstance = null;
      }
    };
  }, []);

  return (
    <section
      ref={scrollRef}
      data-scroll-container
      data-nav-color="black"
      className="min-h-screen"
    >
      <div data-scroll-section>
        <Hero />
        <CaseNumbers />
        <Images />
        <CaseStudy />
      </div>
    </section>
  );
};

export default CaseDetails;
