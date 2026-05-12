import { HiCheckCircle } from "react-icons/hi";

/**
 * Two-column checklist section (included / scope items).
 */
export default function DMIncludedSection({
  title,
  subtitle,
  items,
  fontClass,
  sectionClassName = "dm-section",
}) {
  const lines = Array.isArray(items) ? items : [];

  return (
    <section className={sectionClassName}>
      <div className="dm-container">
        <h2 className={`dm-section-title ${fontClass}`}>{title}</h2>
        <p className="dm-section-subtitle">{subtitle}</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          {lines.map((item, idx) => (
            <li key={idx} className="dm-check-item">
              <HiCheckCircle className="dm-check-icon" />
              <span className="dm-text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
