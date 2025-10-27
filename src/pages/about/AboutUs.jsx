import React, { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import Hero from "./Hero";
import "./about.css";
import AnimatedText from "./AnimatedText";
import Images from "./images";
import Strategy from "./Strategy";
import Team from "./Team";
import Growth from "./Growth";
import Footer from "../../components/Footer";
import ContactUs from "./ContactUs";
const AboutUs = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Temporarily disable global scroll-snap which breaks Locomotive
    const htmlEl = document.documentElement;
    const bodyEl = document.body;
    const prevHtmlSnap = htmlEl.style.scrollSnapType;
    const prevBodySnap = bodyEl.style.scrollSnapType;
    htmlEl.style.scrollSnapType = "none";
    bodyEl.style.scrollSnapType = "none";

    const scroll = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
      smartphone: { smooth: true },
      tablet: { smooth: true },
    });

    return () => {
      try {
        scroll.destroy();
        // eslint-disable-next-line no-unused-vars, no-empty
      } catch (_) {}
      htmlEl.classList.remove("has-scroll-smooth", "has-scroll-init");
      document.body.style.removeProperty("overflow");
      // Restore scroll-snap
      htmlEl.style.scrollSnapType = prevHtmlSnap;
      bodyEl.style.scrollSnapType = prevBodySnap;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-scroll-container
      className="about-us-section w-full min-h-screen font-hero-light"
    >
      <Hero />
      <AnimatedText />
      <Images />
      <Strategy />
      <Growth />
      <Team />
      <ContactUs/>
      <Footer />
    </div>
  );
};

export default AboutUs;
