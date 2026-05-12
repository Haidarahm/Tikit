import React from "react";
import Hero from "./Hero";
import Action from "./Action";
import "./contact.css";
import SEOHead from "../../components/SEOHead";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <div data-nav-color="black" className="contact-section snap-mandatory snap-y w-full    font-hero-light">
      <SEOHead
        title={t("seo.pages.contact.title")}
        description={t("seo.pages.contact.description")}
        keywords={t("seo.pages.contact.keywords")}
        canonicalUrl="/contact-us"
        structuredData={contactPageSchema}
        serviceType={t("seo.pages.contact.serviceType", {
          defaultValue: "Influencer Marketing & Digital Marketing Agency",
        })}
        breadcrumbs={[
          { name: t("nav.home"), url: "/" },
          { name: t("nav.contact"), url: "/contact-us" },
        ]}
      />
      <Hero />
      {/* <AnimatedLines /> */}
      <Action />
    </div>
  );
};

export default Contact;
