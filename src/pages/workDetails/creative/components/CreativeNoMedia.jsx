import React from "react";
import PropTypes from "prop-types";

const CreativeNoMedia = ({ message }) => (
  <div className="rounded-3xl bg-[var(--container-bg)]/70 p-10 text-center text-sm text-[var(--foreground)]/60 shadow-inner">
    {message}
  </div>
);

CreativeNoMedia.propTypes = {
  message: PropTypes.string.isRequired,
};

export default CreativeNoMedia;
