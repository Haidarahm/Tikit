import React from "react";
import img1 from "../../assets/test/hidden.webp";
import img2 from "../../assets/test/porsche.webp";
import img3 from "../../assets/test/the-reve.webp";

const showcaseData = [
  {
    id: 1,
    img: img1,
    title: "Hidden",
    subtitle: "Marketing",
    size: "small", // small = 1 col, large = 2 col
  },
  {
    id: 2,
    img: img2,
    title: "Porsche",
    subtitle: "Branding",
    size: "small",
  },
  {
    id: 3,
    img: img3,
    title: "The Reve",
    subtitle: "Creative",
    size: "large",
  },
];

const ShowCase = () => {
  return (
    <div className="relative flex flex-col w-[98vw] mt-[30px] sm:w-[96vw] md:w-[95vw] gap-8 h-[1400px] mx-auto">

      {/* TITLE */}
      <div className="title text-[var(--foreground)] flex flex-col w-full justify-center items-center h-[200px]">
        <h1 className="font-antonio font-[600] text-[64px]">
          Fueling brands with influence
        </h1>
        <p className="text-center text-[24px]">
          Tikit is an award-winning global influencer marketing agency. Whether
          you want to shift perceptions or create scroll-stopping content, we do
          it better than anyone.
        </p>
      </div>

      {/* GRID */}
      <div className="h-[1200px] w-full grid grid-cols-2 gap-4 grid-rows-2">

        {showcaseData.map((item) => (
          <div
            key={item.id}
            className={`
              relative showcase-card rounded-[10px] overflow-hidden md:rounded-[15px]
              ${item.size === "large" ? "col-span-2" : "col-span-1"}
            `}
          >
            <img
              className="h-full w-full absolute inset-0 object-cover"
              src={item.img}
              alt={item.title}
            />

            {/* CONTENT */}
            <div className="absolute py-[13px] bg-white/10 rounded-[10px] backdrop-blur-md flex justify-center w-[60%] bottom-[35px] z-10 left-1/2 translate-x-[-50%]">
              <div className="action-content items-center justify-center text-white flex gap-[25px] flex-col">
                <div className="title-subtitle flex flex-col items-center">
                  <h2 className="text-[40px] font-[700] font-antonio">
                    {item.title}
                  </h2>
                  <h3 className="text-[20px] font-[200]">
                    {item.subtitle}
                  </h3>
                </div>

                <button className="bg-transparent px-[10px] py-[5px] border border-white rounded-[10px]">
                  View Project
                </button>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ShowCase;
