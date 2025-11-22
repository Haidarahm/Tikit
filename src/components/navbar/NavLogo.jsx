import { useNavigate } from "react-router-dom";
import SVGComponent from "../../assets/logo.jsx";
import { useTheme } from "../../store/ThemeContext.jsx";

export default function NavLogo({ logoRef, language }) {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div
      className={`h-10 md:h-12 flex items-center justify-center ${
        language === "ar" ? "order-4" : ""
      }`}
    >
      <div
        onClick={() => navigate("/home")}
        ref={logoRef}
        className="h-10 md:h-12 transform-gpu"
      >
        <SVGComponent
          color={theme === "dark" ? "#FFFFFF" : "#363737"}
          logoJumpColor="#52C3C5"
          className="p-1 md:p-2 h-full overflow-visible"
        />
      </div>
    </div>
  );
}

