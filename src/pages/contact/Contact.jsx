import React from "react";
import Hero from "./Hero";
import AnimatedLines from "./AnimatedLines";
import Action from "./Action";
import "./contact.css";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";

const Contact = () => {
  return (
    <div data-nav-color="black" className="contact-section snap-mandatory snap-y w-full    font-hero-light">
      <SEOHead
        title="Contact Us"
        description="Get in touch with Tikit Agency. Contact us to discuss your marketing needs, request a quote, or learn more about how we can help your brand succeed."
        keywords="contact Tikit Agency, marketing consultation, get in touch, request quote, marketing agency contact, UAE marketing agency"
        canonicalUrl="/contact-us"
      />
      <Hero />
      {/* <AnimatedLines /> */}
      <Action />
      <Footer className="snap-start snap-always" />
    </div>
  );
};

export default Contact;
