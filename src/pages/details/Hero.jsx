import React, { useEffect, useState } from "react";
import image from "../../assets/who-we-are/1.webp";
import { useWorkStore } from "../../store/workStore";

const Hero = ({ id }) => {
  const [show, setShow] = useState(false);
  const { loadWorkDetails, workDetails, lang, loading } = useWorkStore();

  const numericId = id ? Number(id) : undefined;

  useEffect(() => {
    if (numericId) {
      loadWorkDetails(numericId, lang);
    }
  }, [numericId, lang, loadWorkDetails]);

  const details = numericId ? workDetails?.[numericId] : undefined;
  const heroImage = details?.media || image;
  const title = details?.title || "";
  const subtitle = details?.subtitle || "";

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      data-scroll-section
      className=" min-h-[60vh] md:min-h-screen w-full flex justify-center items-center text-[var(--foreground)] relative font-hero-light"
    >
      <div
        data-scroll
        className="overlay absolute z-10 bg-white/50 dark:bg-black/30 transition w-full h-full"
      ></div>
      {loading || !details ? (
        <div
          className={`z-0 absolute w-full h-full bg-white/10 animate-pulse ${
            show ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : (
        <img
          src={heroImage}
          alt=""
          className={`z-0 absolute w-full h-full object-cover transition-all duration-1000 ease-out ${
            show ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        />
      )}
      <div
        data-scroll
        data-scroll-speed="5"
        data-scroll-delay="0.2"
        className="texts flex flex-col relative z-20"
      >
        <h1
          className={`title text-[62px] md:text-[92px] font-bold transition-all text-center duration-1000 ease-out ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {title}
        </h1>
        <h3
          className={`title text-[40px] font-light text-center transition-all duration-1000 ease-out delay-200 ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {subtitle}
        </h3>
      </div>
    </div>
  );
};

export default Hero;
