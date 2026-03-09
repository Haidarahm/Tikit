import { Link } from "react-router-dom";
import { FiArrowRight, FiPhone } from "react-icons/fi";
import HeroWithBadge from "../../../components/HeroWithBadge";
import SEOHead from "../../../components/SEOHead";
import productionImage from "../../../assets/services/production.webp";
import "./WebDevelopment.css";

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Services", url: "/services" },
  { name: "Web Development Dubai", url: "/web-development-dubai" },
];

const WebDevelopment = () => {
  return (
    <>
      <SEOHead
        title="Web Development Dubai | Custom Websites & Apps | Tikit Agency"
        description="Tikit Agency builds fast, modern websites and web applications in Dubai. From responsive sites to e-commerce and custom web apps — we deliver solutions that convert."
        serviceType="Web Development Dubai"
        breadcrumbs={breadcrumbs}
      />

      {/* Hero */}
      <section className="wd-hero">
        <div className="wd-hero__image-wrapper">
          <img
            src={productionImage}
            alt="Web Development Dubai"
            className="wd-hero__image"
          />
          <div className="wd-hero__overlay" />
        </div>
        <div className="wd-hero__inner">
          <HeroWithBadge
            badge="✦ Web & Digital Products"
            badgeVariant="pulse"
            title="Web Development in"
            mainWord="Dubai"
            description="We build websites and web applications that are fast, scalable, and built for your business. From brand sites to e-commerce and custom web apps — we deliver in the UAE and GCC."
          />
        </div>
      </section>

      {/* Intro */}
      <section className="wd-section">
        <div className="wd-container">
          <span className="wd-label">What We Do</span>
          <h2 className="wd-title">Websites That Work for Your Business</h2>
          <p className="wd-desc max-w-3xl mx-auto">
            Whether you need a new website, a refresh of your current one, or a custom web application — we combine clean design with solid development. Responsive, accessible, and optimised for performance and SEO.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="wd-section wd-section--alt">
        <div className="wd-cta__inner">
          <p className="wd-label text-center mb-4 block">Get Started</p>
          <h2 className="wd-cta__title">
            Ready for a Website That Converts?
          </h2>
          <p className="wd-cta__desc">
            Tell us about your project. We'll scope it clearly and get back to you within 48 hours.
          </p>
          <div className="wd-cta__buttons">
            <Link to="/contact" className="wd-btn-primary">
              <FiArrowRight />
              Discuss Your Project
            </Link>
            <a href="tel:+97145774042" className="wd-btn-secondary">
              <FiPhone />
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default WebDevelopment;
