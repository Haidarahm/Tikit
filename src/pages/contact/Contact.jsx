import React from "react";
import Hero from "./Hero";
import AnimatedLines from "./AnimatedLines";
import Action from "./Action";
import "./contact.css";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";

// ContactPage schema for rich results
const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Tikit Agency",
  "description": "Contact Tikit Agency for influencer marketing, social media management, and branding services in Dubai and UAE.",
  "url": "https://tikit.ae/contact-us",
  "mainEntity": {
    "@type": "Organization",
    "name": "Tikit Agency",
    "url": "https://tikit.ae",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+971 4 577 4042",
        "contactType": "customer service",
        "email": "Holla@tikit.ae",
        "availableLanguage": ["English", "Arabic", "French", "Turkish"],
        "areaServed": ["AE", "SA", "TR"],
        "contactOption": "TollFree"
      },
      {
        "@type": "ContactPoint",
        "telephone": "+971 4 577 4042",
        "contactType": "sales",
        "email": "Holla@tikit.ae",
        "availableLanguage": ["English", "Arabic"]
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "The Burlington Tower, Marasi Drive, Office 309",
      "addressLocality": "Dubai",
      "addressRegion": "Dubai",
      "addressCountry": "AE"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ]
  }
};

const Contact = () => {
  return (
    <div data-nav-color="black" className="contact-section snap-mandatory snap-y w-full    font-hero-light">
      <SEOHead
        title="Contact Us | Tikit Agency Dubai - Call +971 4 577 4042"
        description="Contact Tikit Agency Dubai. Call +971 4 577 4042 or email Holla@tikit.ae. Office: Burlington Tower, Marasi Drive. Free marketing consultation."
        keywords="contact Tikit Agency, marketing agency Dubai contact, influencer agency phone, UAE agency consultation, Dubai marketing office"
        canonicalUrl="/contact-us"
        structuredData={contactPageSchema}
      />
      <Hero />
      {/* <AnimatedLines /> */}
      <Action />
      <Footer className="snap-start snap-always" />
    </div>
  );
};

export default Contact;
