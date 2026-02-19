import React, { useEffect } from "react";
import Hero from "./Hero";
import CaseNumbers from "./CaseNumbers";
import Images from "./Images";
import CaseStudy from "./CaseStudy";
import ContactUs from "../Home/ContactUs";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";
import { useParams } from "react-router-dom";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import { useShowcaseStore } from "../../store/showcaseStore";

const CaseDetails = () => {
  const { slug } = useParams();
  const { language } = useI18nLanguage();
  const { caseDetails, loadCaseBySlug, loading } = useShowcaseStore();
  const caseData = caseDetails?.[slug];

  useEffect(() => {
    if (slug) {
      loadCaseBySlug(slug, language);
    }
  }, [slug, language, loadCaseBySlug]);

 

  const displayTitle = caseData?.title || (slug ? slug.replace(/-/g, " ") : "");
  const seoTitle = displayTitle
    ? `Showcase: ${displayTitle} | Tikit Agency`
    : "Case Study Showcase | Tikit Agency";
  const seoDescription = caseData?.description
    ? `Showcase of ${displayTitle}: ${caseData.description}`
    : `Explore our showcase of ${displayTitle || "successful marketing campaigns"}. Case study by Tikit Agency.`;
  const seoKeywords = displayTitle
    ? `showcase of ${displayTitle}, ${displayTitle} showcase, Tikit showcase ${displayTitle}, ${slug || ""} showcase, influencer marketing case study, social media campaign showcase`
    : "showcase, case study, marketing campaigns, Tikit Agency";
  const breadcrumbs = slug
    ? [
        { name: "Tikit Agency", url: "/" },
        { name: "Showcase", url: "/showcase" },
        { name: displayTitle || slug, url: `/showcase/${slug}` },
      ]
    : null;

  const showcaseSchema = displayTitle && slug && {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": `Showcase: ${displayTitle}`,
    "description": seoDescription,
    "url": `https://tikit.ae/showcase/${slug}`,
    "publisher": {
      "@type": "Organization",
      "name": "Tikit Agency",
      "url": "https://tikit.ae"
    }
  };

  return (
    <section data-nav-color="black" className="min-h-screen">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonicalUrl={`/showcase/${slug}`}
        ogImage={caseData?.logo ? (caseData.logo.startsWith("http") ? caseData.logo : `https://tikit.ae${caseData.logo.startsWith("/") ? "" : "/"}${caseData.logo}`) : undefined}
        breadcrumbs={breadcrumbs}
        structuredData={showcaseSchema}
      />
      <Hero caseData={caseData} loading={loading} />
      <CaseNumbers caseData={caseData} loading={loading} />
      <Images images={caseData?.images} />
      <CaseStudy caseData={caseData} videos={caseData?.videos} />
      <ContactUs />
      <Footer />
    </section>
  );
};

export default CaseDetails;
