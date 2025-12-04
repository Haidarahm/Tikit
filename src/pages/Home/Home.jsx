import React, { useEffect, useRef } from "react";
import Hero from "./Hero";
import Numbers from "./Numbers";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Goals from "./Goals";
import Services from "./Services";
import AboutUs from "./AboutUs";
import WorkSection from "./WorkSection";
import Connections from "./Connections";
import Reviews from "./Reviews";
import ContactUs from "./ContactUs";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";
import Influencers from "./influencers/Influencers";
import ShowCase from "./ShowCase";
import Map from "./map/Map";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    // Remove locomotive-scroll leftovers
    document.documentElement.classList.remove(
      "has-scroll-smooth",
      "has-scroll-init"
    );
    document.body.style.removeProperty("overflow");

    const startLenis = () => {
      const lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        smoothTouch: false,
        lerp: 0.08,
      });
      lenisRef.current = lenis;

      // Attach to ScrollTrigger
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          return arguments.length
            ? lenis.scrollTo(value, { immediate: true })
            : lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: "transform",
      });

      // RAF loop
      const raf = (time) => {
        lenis.raf(time);
        ScrollTrigger.update();
        rafRef.current = requestAnimationFrame(raf);
      };
      rafRef.current = requestAnimationFrame(raf);

      // Refresh once after Lenis activates
      setTimeout(() => ScrollTrigger.refresh(), 200);
    };

    // Start only after full load (images, fonts, videos)
    if (document.readyState === "complete") {
      startLenis();
    } else {
      window.addEventListener("load", startLenis, { once: true });
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (lenisRef.current) lenisRef.current.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      id="home"
      className="sections overflow-hidden relative w-full home-scroll-trigger"
    >
      <SEOHead
        title="Social Media Marketing Agency | Tikit"
        description="Partner with Tikit Agency for full-service social media marketing, influencer campaigns, celebrity management, and creative production tailored for growth."
        keywords="social media marketing, influencer marketing agency, celebrity management, social media agency UAE, content marketing, paid social campaigns"
        canonicalUrl="/home"
      />
      <Hero />
      <ShowCase />
      <Numbers />
      <Goals />
      <Influencers />
      <Services />
      <Connections />
      <WorkSection />
      <Map />
      <Reviews />
      <ContactUs />
      <Footer />
    </div>
  );
}

export default Home;
