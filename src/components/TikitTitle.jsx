import React from "react";

const TikitTitle = ({ title, className, mainWord }) => {
  return (
    <h1 className={`${className}  tikit-title`}>
      {title}
      {mainWord ? (
        <>
          {" "}
          <span className="font-caveat inline-block pr-6 text-[40px] md:text-[96px] w-fit bg-gradient-to-r from-[#6ACBCC] to-[#1C6F6C] bg-clip-text text-transparent">
            {mainWord}
          </span>
        </>
      ) : null}
    </h1>
  );
};

export default TikitTitle;
