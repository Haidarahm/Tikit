import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SVGComponent from "./logo";
import { useTheme } from "../../store/ThemeContext";

const AnimatedLines = () => {
  // We'll target multiple lines via class selectors instead of single refs
  const containerRef = useRef(null);
  const { theme } = useTheme();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    // Set initial positions for groups
    gsap.set(containerRef.current.querySelectorAll(".line-from-left"), {
      left: "-90%",
    });
    gsap.set(containerRef.current.querySelectorAll(".line-from-right"), {
      right: "-70%",
    });

    // Create scroll trigger animation
    gsap.to(containerRef.current.querySelectorAll(".line-from-left"), {
      left: "70%",
      ease: "none",
      stagger: 0.15,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.1,
      },
    });
    gsap.to(containerRef.current.querySelectorAll(".line-from-right"), {
      right: "80%",
      ease: "none",
      stagger: 0.15,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="contact-section hidden snap-start snap-always h-screen w-full md:flex flex-col">
      <div className="text-[var(--foreground)] shadow-md shadow-black relative z-20  flex flex-col md:flex-row gap-4 md:gap-0 justify-between w-full px-4 md:px-12 mx-auto">
        <h1 className="title uppercase font-bold text-[20px] md:text-[24px] w-full text-center md:text-start  md:w-1/7">
          We've been waiting for you!
        </h1>
        <p className="description font-light text-[16px] text-center md:text-start md:ml-12 flex-1 md:text-[22px]">
          Add the best talent on the market, an agile skilled management &
          seamless involvement
        </p>
      </div>
      <div
        ref={containerRef}
        className="main-content  flex-1 flex relative  overflow-hidden"
      >
        <div className="section-1 relative w-1/3 ">
          <div className="line-container absolute  top-0 -left-24  w-[1000px] -rotate-[18deg] h-[100px]">
            <div className="shadow-md shadow-black line-from-left w-full pr-[100px]  h-[100px] absolute justify-end text-[100px] text-end flex items-center  text-black font-bold bg-white">
              contact us now
            </div>
          </div>
          <div className="line-container absolute z-20 -bottom-[22%] left-[75%] w-[1000px] rotate-[18deg] h-[100px]">
            <div className="shadow-md shadow-black line-from-left  w-full pr-[100px]  h-[100px] absolute justify-end text-[100px] text-end flex items-center  text-black font-bold bg-white">
              contact us now
            </div>
          </div>
        </div>
        <div className="section-2 flex items-center w-1/3">
          <div className="logo mx-auto  w-[500px]">
            <SVGComponent color={`#${theme === "light" ? "363737" : "fff"}`} />
          </div>
        </div>
        <div className="section-3  relative w-1/3 ">
          <div className="line-container absolute  top-12 -right-[50%]  w-[1000px] rotate-[18deg] h-[100px]">
            <div className="shadow-md shadow-black line-from-right w-full pr-[100px]  h-[100px] absolute justify-end text-[100px] text-end flex items-center  text-black font-bold bg-white">
              contact us now
            </div>
          </div>
          <div className="line-container absolute -bottom-[20%] z-10 right-[50%] w-[1000px] -rotate-[18deg] h-[100px]">
            <div className="shadow-md shadow-black line-from-right w-full pr-[100px]  h-[100px] absolute justify-start text-[100px] text-end flex items-center  text-black font-bold bg-white">
              contact us now
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedLines;
