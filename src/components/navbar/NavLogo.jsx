import { useNavigate, useLocation } from "react-router-dom";
import SVGComponent from "../../assets/logo.jsx";
import { useTheme } from "../../store/ThemeContext.jsx";
import { useHeroScrollColor } from "./hooks/useHeroScrollColor";

export default function NavLogo({ logoRef, language }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const scrollColor = useHeroScrollColor();

  const shouldUseScrollColor =
    location.pathname === "/home" || location.pathname.startsWith("/services");
  const isHeroSection = shouldUseScrollColor && scrollColor === "text-white";

  const logoColor = isHeroSection
    ? "#FFFFFF"
    : theme === "dark"
    ? "#FFFFFF"
    : "#363737";

  return (
    <div className={`h-10 md:h-12 flex items-center justify-center `}>
      <div
        onClick={() => navigate("/home")}
        ref={logoRef}
        className="h-10 md:h-12 transform-gpu"
      >
        <SVGComponent
          color={logoColor}
          logoJumpColor="#52C3C5"
          className="p-1 md:p-2 h-full overflow-visible"
        />
      </div>
    </div>
  );
}
