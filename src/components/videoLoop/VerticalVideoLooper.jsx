import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import "./VerticalVideoLooper.css";

const VerticalVideoLooper = memo(
  ({ videos = [], speed = 10, direction = "up" }) => {
    const [instances, setInstances] = useState(2);
    const outerRef = useRef(null);
    const innerRef = useRef(null);

    const resetAnimation = () => {
      if (innerRef.current) {
        innerRef.current.setAttribute("data-animate", "false");
        setTimeout(() => {
          if (innerRef.current)
            innerRef.current.setAttribute("data-animate", "true");
        }, 10);
      }
    };

    const setupInstances = useCallback(() => {
      if (
        !innerRef.current ||
        !outerRef.current ||
        innerRef.current.children.length === 0
      )
        return;

      // Get the height of a single instance
      const singleInstance = innerRef.current.children[0];
      const singleInstanceHeight =
        singleInstance.getBoundingClientRect().height;
      const { height: parentHeight } = outerRef.current.getBoundingClientRect();

      // Calculate instances needed:
      // - Always need at least 2 for seamless loop
      // - If container is taller than instance height, add enough to fill it
      // - Add 1 extra to ensure smooth transition
      let neededInstances = 2; // Minimum for seamless looping

      if (singleInstanceHeight < parentHeight) {
        const instancesToFill = Math.ceil(parentHeight / singleInstanceHeight);
        neededInstances = instancesToFill + 1; // +1 for smooth transition
      }

      setInstances(neededInstances);
      resetAnimation();
    }, []);

    useEffect(() => setupInstances(), [setupInstances]);

    // Debounce resize handler for better performance
    useEffect(() => {
      let timeoutId;
      const debouncedSetup = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => setupInstances(), 150);
      };

      window.addEventListener("resize", debouncedSetup);
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener("resize", debouncedSetup);
      };
    }, [setupInstances]);

    return (
      <div className="v-looper" ref={outerRef}>
        <div className="v-looper__innerList" ref={innerRef} data-animate="true">
          {[...Array(instances)].map((_, index) => (
            <div
              key={index}
              className="v-looper__listInstance"
              style={{
                animationDuration: `${speed}s`,
                animationDirection: direction === "down" ? "reverse" : "normal",
              }}
            >
              {videos.map((vid) => (
                <div key={vid.id} className="v-item">
                  <video
                    src={vid.videoUrl}
                    muted
                    loop
                    autoPlay
                    playsInline
                    poster={'/cover-image.png'}
                    webkit-playsinline="true"
                    preload="metadata"
                    decoding="async"
                    className="v-video border-4 border-white"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

VerticalVideoLooper.displayName = "VerticalVideoLooper";

export default VerticalVideoLooper;
