import { useNavigate } from "react-router-dom";
import SVGComponent from "../../assets/logo.jsx";
import { useTheme } from "../../store/ThemeContext.jsx";
import { useNavColor } from "./hooks/useNavColor";

export default function NavLogo({ logoRef }) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const navColor = useNavColor();

  const logoColor =
    navColor === "white" ? "#FFFFFF" : theme === "dark" ? "#FFFFFF" : "#363737";

  return (
    <div className={`h-10 md:h-12 flex items-center justify-center `}>
      <div
        onClick={() => navigate("/home")}
        ref={logoRef}
        className="h-10 md:h-12 transform-gpu cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label="Go to Tikit homepage"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            navigate("/home");
          }
        }}
      >
        <SVGComponent
          color={logoColor}
          logoJumpColor="#52C3C5"
          className="p-1 md:p-2 h-full overflow-visible"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
