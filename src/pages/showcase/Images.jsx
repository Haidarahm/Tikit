import React, { memo } from "react";
import work1 from "../../assets/work/hidden.webp";
import work2 from "../../assets/work/porsche.webp";
import work3 from "../../assets/work/the-reve.webp";
import work4 from "../../assets/work/range-rover.webp";
import work5 from "../../assets/work/krave.webp";

// Optional: can accept props later if you want to pass custom images/columns
const Images = memo(({ images, columns = 3 }) => {
  const defaultImages = [work1, work2, work3];
  const items =
    Array.isArray(images) && images.length > 0 ? images : defaultImages;

  // Map allowed column counts to Tailwind classes (keeps it "dynamic" but safe)
  const columnClasses = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  const colsClass = columnClasses[columns] || columnClasses[3];

  return (
    <section className="py-10 md:py-16 h-screen">
      <div className="container h-full w-full mx-auto px-4">
        <div
          className={`grid ${colsClass} gap-4 md:gap-6 h-full w-full`}
        >
          {items.map((src, idx) => (
            <div
              key={idx}
              className="overflow-hidden  rounded-[18px] bg-[var(--card-background)] h-full"
            >
              <img
                src={src}
                alt={`case-image-${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Images.displayName = "ShowcaseImages";

export default Images;
