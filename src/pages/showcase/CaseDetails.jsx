import React, { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
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
  const scrollRef = useRef(null);
  const { id } = useParams();
  const { language } = useI18nLanguage();
  const { caseDetails, loadCaseById, loading } = useShowcaseStore();
  const caseData = caseDetails?.[id];

  useEffect(() => {
    if (id) {
      loadCaseById(id, language);
    }
  }, [id, language, loadCaseById]);

  useEffect(() => {
    if (!scrollRef.current) return;

    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      lerp: 0.08,
    });

    // Make accessible if other components need it
    window.locomotiveScrollInstance = scroll;

    return () => {
      if (scroll) {
        scroll.destroy();
      }
      if (window.locomotiveScrollInstance === scroll) {
        window.locomotiveScrollInstance = null;
      }
    };
  }, []);

  return (
    <section
      ref={scrollRef}
      data-scroll-container
      data-nav-color="black"
      className="min-h-screen"
    >
      <div data-scroll-section>
        <Hero caseData={caseData} loading={loading} />
        <CaseNumbers caseData={caseData} loading={loading} />
        <Images images={caseData?.media} />
        <CaseStudy caseData={caseData} loading={loading} />
        <ContactUs/>
        <Footer/>
      </div>
    </section>
  );
};

export default CaseDetails;
