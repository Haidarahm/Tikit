import React from "react";

const CreativeNoMedia = ({ message = "No media available" }) => (
  <div className="rounded-3xl bg-[var(--container-bg)]/70 p-10 text-center text-sm text-[var(--foreground)]/60 shadow-inner">
    {message}
  </div>
);

export default CreativeNoMedia;
