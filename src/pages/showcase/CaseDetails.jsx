import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
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
  const lenisRef = useRef(null);

  useEffect(() => {
    if (id) {
      loadCaseById(id, language);
    }
  }, [id, language, loadCaseById]);

  // Initialize Lenis smooth scroll (local to this page)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Scroll to top on mount
    lenis.scrollTo(0, { immediate: true });

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <section data-nav-color="black" className="min-h-screen">
      <Hero caseData={caseData} loading={loading} />
      <CaseNumbers caseData={caseData} loading={loading} />
      <Images images={caseData?.images} />
      <CaseStudy caseData={caseData} videos={caseData?.videos} lenis={lenisRef} />
      <ContactUs />
      <Footer />
    </section>
  );
};

export default CaseDetails;
