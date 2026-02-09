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
  const { id } = useParams();
  const { language } = useI18nLanguage();
  const { caseDetails, loadCaseById, loading } = useShowcaseStore();
  const caseData = caseDetails?.[id];

  useEffect(() => {
    if (id) {
      loadCaseById(id, language);
    }
  }, [id, language, loadCaseById]);

 

return (
    <section data-nav-color="black" className="min-h-screen">
      <SEOHead
        title={caseData?.title ? `${caseData.title} | Tikit Agency` : "Case Study | Tikit Agency"}
        description={caseData?.description || "Explore our successful marketing campaigns and case studies."}
        canonicalUrl={`/showcase/${id}`}
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
