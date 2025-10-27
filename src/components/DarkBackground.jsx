import React from "react";

function DarkBackground({ children }) {
  // full bg-gradient-to-b from-[#121212] to-[#0A1C1B]
  return (
    <div className="w-full min-h-screen relative bg-[#000000]">
      {/* Content goes here */}
      <div className="relative z-0 w-full">{children}</div>
    </div>
  );
}

export default DarkBackground;
