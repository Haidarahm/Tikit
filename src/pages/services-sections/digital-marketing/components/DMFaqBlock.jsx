import FAQ from "../../../../components/FAQ";

/** Thin wrapper so FAQ usage stays consistent across DM pages. */
export default function DMFaqBlock({ items, title }) {
  return <FAQ items={items} title={title} />;
}
