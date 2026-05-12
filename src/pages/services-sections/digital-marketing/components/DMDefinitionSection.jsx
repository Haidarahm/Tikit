import { HiCheckCircle } from "react-icons/hi";

/**
 * Long-form “what is …” block: heading, two paragraphs, label + checklist.
 */
export default function DMDefinitionSection({
  title,
  paragraph,
  paragraph2,
  benefitsLabel,
  benefitsList,
  fontClass,
}) {
  const lines = Array.isArray(benefitsList) ? benefitsList : [];

  return (
    <section className="dm-section">
      <div className="dm-container">
        <h2 className={`dm-heading ${fontClass}`}>{title}</h2>
        <p className="dm-text">{paragraph}</p>
        <p className="dm-text">{paragraph2}</p>
        <p className="dm-benefits-label font-semibold mb-3 mt-6">{benefitsLabel}</p>
        <ul className="space-y-3">
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
