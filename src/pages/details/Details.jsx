import React, { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import Hero from "./Hero";
import { useParams } from "react-router-dom";
import "./details.css";
import Content from "./Content";
import ContactUs from "./ContactUs";
import Footer from "../../components/Footer";

const Details = () => {
  const scrollRef = useRef(null);
  const { id } = useParams();

  // ✅ Initialize LocomotiveScroll once
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      lerp: 0.08,
    });

    // ✅ Make it accessible globally
    window.locomotiveScrollInstance = scroll;

    // Cleanup on unmount
    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  // ✅ Update & reset scroll when route ID changes
  useEffect(() => {
    const scroll = window.locomotiveScrollInstance;
    if (scroll) {
      // scroll to top
      scroll.scrollTo(0, { duration: 0, disableLerp: true });
      // refresh to recalc new DOM
      setTimeout(() => scroll.update(), 100);
    }
  }, [id]);

  return (
    <div
      ref={scrollRef}
      data-scroll-container
      className="min-h-screen w-full bg[var(--background)"
    >
      <Hero id={id} />
      <Content id={id} />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Details;
