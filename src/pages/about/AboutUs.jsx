import React from "react";
import Hero from "./Hero";
import "./about.css";
import AnimatedText from "./AnimatedText";
import Strategy from "./Strategy";
import Team from "./Team";
import Growth from "./Growth";
import SEOHead from "../../components/SEOHead";
import ContactUs from "../Home/ContactUs";
import Details from "./Details";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <div
      data-nav-color="black"
      className="about-us-section overflow-hidden w-full min-h-screen font-hero-light"
    >
      <SEOHead
        title={t("seo.pages.about.title")}
        description={t("seo.pages.about.description")}
        keywords={t("seo.pages.about.keywords")}
        canonicalUrl="/about-us"
        structuredData={aboutSchema}
        serviceType={t("seo.pages.about.serviceType", {
          defaultValue: "Influencer Marketing Agency Dubai",
        })}
        breadcrumbs={[
          { name: t("nav.home"), url: "/" },
          { name: t("nav.about"), url: "/about-us" },
        ]}
      />
      <Hero />
      <AnimatedText />
      <Details />
      <Strategy />
      <Growth />
      {/* <Team /> */}
      <ContactUs />
      
    </div>
  );
};

export default AboutUs;
