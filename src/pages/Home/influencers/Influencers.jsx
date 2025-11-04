import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Influencers = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      pin: title,
      pinSpacing: false, // keep layout natural
      scrub: true,
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div ref={sectionRef} className="h-[300vh] relative">
      <div
        ref={titleRef}
        className="headline mb-4 px-6 md:px-10 flex w-full justify-between items-center"
      >
       
      </div>
    </div>
  );
};
export default Influencers;