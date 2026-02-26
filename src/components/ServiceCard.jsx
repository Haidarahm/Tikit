import React from "react";

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  className = "",
  iconWrapperClassName = "",
  iconClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  children,
}) => {
  return (
    <div
      className={`service-card group p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300 ${className}`}
    >
      {Icon && (
        <div className={iconWrapperClassName}>
          <Icon className={iconClassName} />
        </div>
      )}
      {title && (
        <h3
          className={
            titleClassName ||
            "text-2xl font-bold text-[var(--foreground)] mb-3"
          }
        >
          {title}
        </h3>
      )}
      {description && (
        <p
          className={
            descriptionClassName ||
            "text-[var(--foreground)]/70 leading-relaxed"
          }
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
};

export default ServiceCard;

