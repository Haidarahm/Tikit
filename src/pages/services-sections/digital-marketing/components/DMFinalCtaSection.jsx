/**
 * Centered closing CTA: title, description, primary button.
 */
export default function DMFinalCtaSection({
  title,
  description,
  buttonText,
  buttonHref = "/contact-us",
  fontClass,
}) {
  return (
    <section className="dm-section dm-section-alt">
      <div className="dm-container text-center">
        <h2 className={`dm-section-title ${fontClass} max-w-3xl mx-auto`}>{title}</h2>
        <p className="dm-text max-w-2xl mx-auto mt-4">{description}</p>
        <div className="mt-8 flex justify-center">
          <a href={buttonHref} className="dm-cta-btn">
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}
