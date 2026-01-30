import React from "react";
import Hero from "./Hero";
import "./about.css";
import AnimatedText from "./AnimatedText";
import Strategy from "./Strategy";
import Team from "./Team";
import Growth from "./Growth";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";
import ContactUs from "../Home/ContactUs";
import Details from "./Details";

// Organization schema for About page
const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://tikit.ae/#organization",
  "name": "Tikit Agency",
  "url": "https://tikit.ae",
  "logo": {
    "@type": "ImageObject",
    "url": "https://tikit.ae/logo-light.png",
    "width": 200,
    "height": 60
  },
  "description": "Tikit Agency is a Dubai-based influencer marketing and social media management company founded in 2020. With 50+ team members and 300+ clients, we serve brands across UAE, Saudi Arabia, and the GCC region.",
  "foundingDate": "2020",
  "foundingLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dubai",
      "addressCountry": "AE"
    }
  },
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": 50,
    "maxValue": 100
  },
  "areaServed": [
    { "@type": "Country", "name": "United Arab Emirates" },
    { "@type": "Country", "name": "Saudi Arabia" },
    { "@type": "Country", "name": "Turkey" }
  ],
  "knowsAbout": [
    "Influencer Marketing",
    "Social Media Management",
    "Brand Strategy",
    "Content Production",
    "Digital Marketing",
    "Talent Management"
  ],
  "slogan": "ROI Rebels - Fueling Brands with Influence",
  "sameAs": [
    "https://www.instagram.com/tikit.ae/"
  ]
};

const AboutUs = () => {
  return (
    <div
      data-nav-color="black"
      className="about-us-section overflow-hidden w-full min-h-screen font-hero-light"
    >
      <SEOHead
        title="About Tikit Agency | Marketing Agency Dubai - 50+ Experts"
        description="About Tikit Agency Dubai. Founded 2020, 50+ team members, 300+ clients. Leading influencer marketing & social media agency in UAE & Saudi Arabia."
        keywords="about Tikit Agency, Dubai marketing agency, UAE influencer agency team, marketing company Dubai, social media agency history"
        canonicalUrl="/about-us"
        structuredData={aboutSchema}
      />
      <Hero />
      <AnimatedText />
      <Details />
      <Strategy />
      <Growth />
      <Team />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default AboutUs;
