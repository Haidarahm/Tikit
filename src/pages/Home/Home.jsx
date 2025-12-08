import React from "react";
import Hero from "./Hero";
import Numbers from "./Numbers";
import Goals from "./Goals";
import Services from "./Services";
import AboutUs from "./AboutUs";
import WorkSection from "./WorkSection";
import Connections from "./Connections";
import Reviews from "./Reviews";
import ContactUs from "./ContactUs";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";
import Influencers from "./influencers/Influencers";
import ShowCase from "./ShowCase";
import Map from "./map/Map";

function Home() {
  return (
    <div
      id="home"
      className="sections overflow-hidden relative w-full home-scroll-trigger"
    >
      <SEOHead
        title="Social Media Marketing Agency | Tikit"
        description="Partner with Tikit Agency for full-service social media marketing, influencer campaigns, celebrity management, and creative production tailored for growth."
        keywords="social media marketing, influencer marketing agency, celebrity management, social media agency UAE, content marketing, paid social campaigns"
        canonicalUrl="/home"
      />

      <Hero />
      <ShowCase />
      <Numbers />
      <Goals />
      <Influencers />
      <Services />
      <Connections />
      <WorkSection />
      <Map />
      <Reviews />
      <ContactUs />
      <Footer />
    </div>
  );
}

export default Home;
