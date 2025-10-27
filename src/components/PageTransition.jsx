import React from "react";
import SVGComponent from "../assets/logo";

const PageTransition = () => {
    const router = usePa
  return (
    <>
      <div className="transition-overlay"></div>
      <div className="logo-overlay">
        <div className="logo-container">
            <SVGComponent/>
        </div>
      </div>
      {children}
    </>
  );
};

export default PageTransition;
