import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NAV_LINKS } from "./constants";
import { useNavColor } from "./hooks/useNavColor";
import NavDropdown from "./NavDropdown";

export default function DesktopNavLinks({ language }) {
  const { t } = useTranslation();
  const navColor = useNavColor();
  const textColor =
    navColor === "white" ? "text-white" : "text-[var(--foreground)]";

  const regularLinks = NAV_LINKS.filter((link) => link.to !== "/influencer" && link.to !=="/services");

  return (
    <div
      className={`hidden lg:flex justify-end ${
        language === "ar" ? "order-2" : ""
      }`}
    >
      <div className="flex gap-6 items-center">
        {regularLinks.map(({ to, key }) => (
          <Link
            key={to}
            to={to}
            className={`nav-item ${textColor} uppercase text-sm relative inline-block whitespace-nowrap transition-colors duration-300 ease-in-out`}
          >
            <span className="relative inline-block whitespace-nowrap">
              {t(key)}
              <span
                className="nav-underline"
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: -2,
                  height: 1,
                  backgroundColor: "currentColor",
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  display: "block",
                }}
              />
            </span>
          </Link>
        ))}
   <NavDropdown
          label={t("nav.services")}
          items={[
            { label: t("nav.servicesSections.0.influencerMarketing"), to: "/services/influencer-marketing-agency-dubai" },
            { label: t("nav.servicesSections.1.branding"), to: "/services/branding-agency-dubai" },
          ]}
        />
        <NavDropdown
          label={t("nav.influencers")}
          items={[
            { label: t("nav.ourInfluencers"),       to: "/influencer" },
            { label: t("nav.registerAsInfluencer"), to: "/influencer-register" },
          ]}
        />
      </div>
    </div>
  );
}