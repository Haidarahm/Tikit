import React, { useEffect } from "react";
import Hero from "./Hero";
import "./about.css";
import AnimatedText from "./AnimatedText";
import Images from "./images";
import Strategy from "./Strategy";
import Team from "./Team";
import Growth from "./Growth";
import Footer from "../../components/Footer";
// import ContactUs from "./ContactUs";
import SEOHead from "../../components/SEOHead";
import ContactUs from "../Home/ContactUs";
const AboutUs = () => {

  return (
    <div
      data-nav-color="black"
      className="about-us-section w-full min-h-screen font-hero-light"
    >
      <SEOHead
        title="About Us"
        description="Learn about Tikit Agency - a full-service marketing agency driven by insight and creativity. Discover our team, values, and approach to delivering exceptional results."
        keywords="about Tikit Agency, marketing team, creative agency, brand strategy, digital marketing agency UAE"
        canonicalUrl="/about"
      />
      <Hero />
      <AnimatedText />
      <Images />
      <Strategy />
      <Growth />
      <Team />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default AboutUs;
