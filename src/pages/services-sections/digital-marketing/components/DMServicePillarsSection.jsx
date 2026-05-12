import ServiceCard from "../../../../components/ServiceCard";

/**
 * Grid of `ServiceCard` pillars (DM feature grid).
 *
 * @param {Array<{ key: string, title: string, description: string, icon: import('react').ComponentType<{ className?: string }> }>} pillars
 */
export default function DMServicePillarsSection({ title, subtitle, pillars, fontClass }) {
  const list = Array.isArray(pillars) ? pillars : [];

  return (
    <section className="dm-section dm-section-alt">
      <div className="dm-container-wide">
        <h2 className={`dm-section-title ${fontClass}`}>{title}</h2>
        <p className="dm-section-subtitle">{subtitle}</p>
        <div className="dm-feature-grid">
          {list.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.key}>
                <ServiceCard
                  icon={Icon}
                  title={pillar.title}
                  description={pillar.description}
                  iconWrapperClassName="dm-card-icon"
                  iconClassName="w-8 h-8 text-white"
                  titleClassName="dm-card-title"
                  descriptionClassName="dm-card-desc"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
