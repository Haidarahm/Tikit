import React, { useEffect } from "react";
import Hero from "./Hero";
import CaseNumbers from "./CaseNumbers";
import Images from "./Images";
import CaseStudy from "./CaseStudy";
import ContactUs from "../Home/ContactUs";
import Footer from "../../components/Footer";
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
    {console.log(caseData)}
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
