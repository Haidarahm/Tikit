import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTheme } from "../store/ThemeContext";
import SVGComponent from "../assets/logo";

function Loader() {
  const { theme } = useTheme();

  const logoColor = theme === "light" ? "#363737" : "#ffffff";
  const logoJumpColor =  "#52C3C5" ;

  return (
    <div className="animate-fade-loop h-screen w-full flex justify-center items-center">
      <SVGComponent
        width={260}
        height={80}
        color={logoColor}
        logoJumpColor={logoJumpColor}
      />
    </div>
  );
}

export default Loader;
