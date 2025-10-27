import React from "react";
import Hero from "./Hero";
import AnimatedLines from "./AnimatedLines";
import Action from "./Action";
import "./contact.css";
import Footer from "../../components/Footer";
const Contact = () => {
  return (
    <div className="contact-section snap-mandatory snap-y w-full    font-hero-light">
      <Hero />
      {/* <AnimatedLines /> */}
      <Action />
      <Footer className="snap-start snap-always" />
    </div>
  );
};

export default Contact;
