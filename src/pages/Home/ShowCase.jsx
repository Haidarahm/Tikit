import React from "react";
import img1 from "../../assets/test/hidden.webp";
import img2 from "../../assets/test/porsche.webp";
import img3 from "../../assets/test/the-reve.webp";
const ShowCase = () => {
  return (
    <div className="relative  flex flex-col w-[98vw] mt-[30px] sm:w-[96vw] md:w-[95vw] gap-8 h-[1400px] mx-auto">
      <div className="title text-[var(--foreground)] flex flex-col w-full justify-center items-center h-[200px]">
        <h1 className="font-antonio font-[600] text-[64px]">
          Fueling brands with influence{" "}
        </h1>
        <p className="text-center text-[24px]">
          Tikit is an award-winning global influencer marketing agency. Whether
          you want to shift perceptions, achieve cultural relevance, or simply
          create some scroll-stopping content, we do it all and we do it better
          than anyone.
        </p>
      </div>
      <div className=" h-[1200px] w-full   grid grid-cols-2 gap-4 grid-rows-2">
        <div className="col-span-1 relative rounded-[10px] overflow-hidden md:rounded-[15px] row-span-1 bg-red-500">
          <img
            className="h-full w-full absolute inset-0 object-cover"
            src={img1}
            alt="hidden"
          />
          <div className="absolute py-[13px] bg-white/10 rounded-[10px] backdrop-blur-md flex justify-center w-[60%] bottom-[35px] z-10 left-1/2 translate-x-[-50%] action">
            <div className="action-content items-center justify-center text-white flex gap-[25px] flex-col">
              <div className="title-subtitle flex flex-col items-center ">
                <h2 className="text-[40px] font-[700] font-antonio">Hidden</h2>
                <h3 className="text-[20px] font-[200]">Marketing</h3>
              </div>

              <button className="bg-transparent px-[10px] py-[5px] border border-white rounded-[10px]">
                View Project
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-1 relative rounded-[10px] overflow-hidden md:rounded-[15px] row-span-1 bg-green-500">
          <img
            className="h-full w-full object-cover"
            src={img2}
            alt="porsche"
          />
          <div className="absolute py-[13px] bg-white/10 rounded-[10px] backdrop-blur-md flex justify-center w-[60%] bottom-[35px] z-10 left-1/2 translate-x-[-50%] action">
            <div className="action-content items-center justify-center text-white flex gap-[25px] flex-col">
              <div className="title-subtitle flex flex-col items-center ">
                <h2 className="text-[40px] font-[700] font-antonio">Hidden</h2>
                <h3 className="text-[20px] font-[200]">Marketing</h3>
              </div>

              <button className="bg-transparent px-[10px] py-[5px] border border-white rounded-[10px]">
                View Project
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-2 relative rounded-[10px] overflow-hidden md:rounded-[15px] row-span-1 bg-blue-500">
          <img
            className="h-full w-full object-cover"
            src={img3}
            alt="the-reve"
          />
          <div className="absolute py-[13px] bg-white/10 rounded-[10px] backdrop-blur-md flex justify-center w-[60%] bottom-[35px] z-10 left-1/2 translate-x-[-50%] action">
            <div className="action-content items-center justify-center text-white flex gap-[25px] flex-col">
              <div className="title-subtitle flex flex-col items-center ">
                <h2 className="text-[40px] font-[700] font-antonio">Hidden</h2>
                <h3 className="text-[20px] font-[200]">Marketing</h3>
              </div>

              <button className="bg-transparent px-[10px] py-[5px] border border-white rounded-[10px]">
                View Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCase;
