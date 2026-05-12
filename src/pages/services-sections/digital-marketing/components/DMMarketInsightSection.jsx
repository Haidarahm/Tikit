/**
 * Title + two prose paragraphs (e.g. market / insight copy). Uses `dm-insight-block` styling.
 */
export default function DMMarketInsightSection({
  title,
  paragraph,
  paragraph2,
  fontClass,
}) {
  return (
    <section className="dm-section">
      <div className="dm-container">
        <h2 className={`dm-section-title ${fontClass}`}>{title}</h2>
        <p className="dm-text dm-insight-block">{paragraph}</p>
        <p className="dm-text dm-insight-block">{paragraph2}</p>
      </div>
    </section>
  );
}
