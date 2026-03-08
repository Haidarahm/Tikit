import React from "react";
import Hero from "../../../components/showcase/Hero";
import CaseNumbers from "../../../components/showcase/CaseNumbers";
import Images from "../../../components/showcase/Images";
import CaseStudySection from "../../../components/showcase/CaseStudy";

/**
 * Map API work item (influence/social/creative etc.) to caseData for CaseStudy.
 * API shape: { title, subtitle, logo, media, reels, reach, views, engagement_rate, objective, brief, strategy, approach? }
 */
export const workItemToCaseData = (item) => {
  if (!item) return null;
  return {
    title: item.title ?? "",
    subtitle: item.subtitle ?? "",
    logo: item.logo ?? null,
    images: Array.isArray(item.media) ? item.media : [],
    videos: Array.isArray(item.reels) ? item.reels : [],
    reach: item.reach,
    views: item.views,
    engagement_rate: item.engagement_rate,
    objective: item.objective ?? "",
    brief: item.brief ?? "",
    strategy: item.strategy ?? "",
    approach: item.approach ?? item.strategy ?? "",
  };
};

/**
 * Work case study block: composes showcase Hero, CaseNumbers, Images, and CaseStudy.
 * Pass caseData (and optional loading) from Work detail pages or parent.
 */
const CaseStudy = ({ caseData, loading = false }) => {
  return (
    <section data-nav-color="black" className="min-h-screen">
      <Hero caseData={caseData} loading={loading} />
      <CaseNumbers caseData={caseData} loading={loading} />
      <Images images={caseData?.images} />
      <CaseStudySection caseData={caseData} videos={caseData?.videos} />
    </section>
  );
};

export default CaseStudy;
