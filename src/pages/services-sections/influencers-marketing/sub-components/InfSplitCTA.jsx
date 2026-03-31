import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { useFontClass } from "../../../../hooks/useFontClass";

const InfSplitCTA = forwardRef(
  (
    {
      label,
      title,
      description,
      primaryText,
      primaryHref = "/contact-us",
      secondaryText = "Call Us Now",
      secondaryHref = "tel:+97145774042",
      highlights = [],
    },
    ref
  ) => {
    const { fontHeading } = useFontClass();

    return (
      <section ref={ref} className="inf-section">
        <div className="inf-container">
          <div
            className="inf-reveal rounded-3xl border p-6 md:p-10"
            style={{
              borderColor: "color-mix(in srgb, var(--secondary) 26%, transparent)",
              background:
                "radial-gradient(120% 120% at 0% 0%, color-mix(in srgb, var(--secondary) 20%, transparent), var(--background) 65%)",
            }}
          >
            <div className="grid gap-6 md:grid-cols-[1.25fr_0.75fr] md:items-center">
              <div>
                {label ? <span className="inf-label mb-3">{label}</span> : null}
                {title ? <h3 className={`inf-heading text-2xl md:text-4xl mb-3 ${fontHeading}`}>{title}</h3> : null}
                {description ? <p className="inf-desc max-w-2xl">{description}</p> : null}
              </div>

              <div
                className="rounded-2xl border p-5 md:p-6"
                style={{
                  borderColor: "color-mix(in srgb, var(--secondary) 20%, transparent)",
                  background:
                    "linear-gradient(165deg, color-mix(in srgb, var(--secondary) 10%, white) 0%, color-mix(in srgb, var(--secondary) 4%, var(--background) 96%) 100%)",
                  boxShadow:
                    "0 18px 48px -28px color-mix(in srgb, var(--secondary) 45%, transparent), inset 0 1px 0 color-mix(in srgb, white 65%, transparent)",
                }}
              >
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-[0.18em] opacity-70">Start your campaign</p>
                </div>

                <div className="flex flex-col gap-2.5">
                  <Link
                    to={primaryHref}
                    className="im-cta-btn inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm md:text-base"
                  >
                    {primaryText}
                    <FiArrowRight />
                  </Link>
                  <Link
                    to={secondaryHref}
                    className="inline-flex items-center justify-center rounded-xl border px-4 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:opacity-90"
                    style={{
                      borderColor: "color-mix(in srgb, var(--secondary) 42%, transparent)",
                      color: "var(--foreground)",
                      background: "color-mix(in srgb, var(--background) 88%, white)",
                    }}
                  >
                    {secondaryText}
                  </Link>
                </div>

                {highlights.length ? (
                  <ul
                    className="mt-5 space-y-2.5 border-t pt-4"
                    style={{ borderColor: "color-mix(in srgb, var(--secondary) 18%, transparent)" }}
                  >
                    {highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed">
                        <FiCheckCircle
                          className="mt-0.5 shrink-0"
                          style={{ color: "color-mix(in srgb, var(--secondary) 72%, white)" }}
                        />
                        <span className="opacity-90">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

InfSplitCTA.displayName = "InfSplitCTA";

export default InfSplitCTA;
