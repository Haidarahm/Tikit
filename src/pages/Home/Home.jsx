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
        title="Best Social Media Management Company in Emirates & Saudi Arabia | Influencer Marketing & Branding"
        description="Tikit Agency is the best social media management company in Emirates (UAE) and Saudi Arabia. We offer comprehensive influencer marketing, social media management, and branding services. Connect with authentic creators, build engaged communities, and create memorable brand identities across Dubai, Abu Dhabi, Riyadh, Jeddah, and the GCC region."
        keywords="best social media management company Emirates, best social media management company Saudi Arabia, best social media management company UAE, influencer marketing Emirates, influencer marketing Saudi Arabia, branding company Emirates, branding company Saudi Arabia, social media agency Dubai, influencer marketing agency Dubai, branding agency Dubai, influencer marketing or branding, best influencer marketing company Emirates, social media management Dubai, social media management Saudi Arabia"
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
