import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NAV_LINKS } from "./constants";

export default function DesktopNavLinks({ language }) {
  const { t } = useTranslation();

  return (
    <div
      className={`hidden lg:flex justify-end ${
        language === "ar" ? "order-2" : ""
      }`}
    >
      <div className="flex gap-6 items-center">
        {NAV_LINKS.map(({ to, key }) => (
          <Link
            key={to}
            to={to}
            className="nav-item text-[var(--foreground)] uppercase text-sm opacity-0 relative inline-block"
          >
            <span className="relative inline-block">
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
      </div>
    </div>
  );
}

