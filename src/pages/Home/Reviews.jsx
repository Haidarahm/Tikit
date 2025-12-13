import React, { useEffect, useRef, useState, memo } from "react";
import {
  ThreeDScrollTriggerContainer,
  ThreeDScrollTriggerRow,
} from "../../components/ui/ThreeDScrollTriggerRow";
import { useTheme } from "../../store/ThemeContext.jsx";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import { useBannersStore } from "../../store/bannersStore";

// Video Reel Card Component
const VideoReelCard = memo(({ video, index, theme }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const safePlay = (video) => {
    if (!video) return;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  };
  
  const handleMouseEnter = () => {
    const video = videoRef.current;
    if (!video) return;
    
    safePlay(video);
    setIsPlaying(true);
  };
  
  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (!video) return;
  
    if (!video.paused) {
      video.pause();
    }
    video.currentTime = 0;
    setIsPlaying(false);
  };
  

  useEffect(() => {
    const video = videoRef.current;
    return () => {
      if (video && !video.paused) {
        video.pause();
      }
    };
  }, []);

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      className="relative flex-shrink-0 mx-3 group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
      
        className="relative overflow-hidden rounded-2xl border border-white/15 dark:bg-white/5 backdrop-blur-md shadow-xl transition-transform duration-300 ease-out "
        style={{
          width: "200px",
          height: "350px",
        }}
      >
        {/* Video */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={video.videoUrl}
          muted={isMuted}
           loading="lazy"
          loop
          playsInline
          preload="metadata"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Play indicator */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            isPlaying ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Mute button */}
        <button
          onClick={toggleMute}
          className={`absolute bottom-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${
            isPlaying ? "opacity-100" : "opacity-0"
          }`}
        >
          {isMuted ? (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>

        {/* Video number badge */}
        <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-[#52C3C5]/80 backdrop-blur-sm">
          <span className="text-white text-xs font-medium">#{index + 1}</span>
        </div>
      </div>
    </div>
  );
});

VideoReelCard.displayName = "VideoReelCard";

const Reviews = memo(() => {
  const { theme } = useTheme();
  const { isRtl } = useI18nLanguage();
  const { videos, loadVideos, loading } = useBannersStore();

  useEffect(() => {
    loadVideos({ per_page: 20 });
  }, [loadVideos]);

  if (loading && videos.length === 0) {
    return (
      <div className="reviews relative w-full py-10 md:py-20 flex items-center justify-center">
        <div className="animate-pulse text-[var(--foreground)]/60">Loading reels...</div>
      </div>
    );
  }

  if (videos.length === 0) {
    return null;
  }

  return (
    <div
      className={`reviews relative w-full py-10 md:py-20 ${
        isRtl ? "font-cairo" : "font-hero-light"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <h2 className="text-[18px] font-antonio text-[var(--foreground)] text-center md:text-4xl font-bold mb-6 md:mb-10">
        Featured Reels
      </h2>
      
      <ThreeDScrollTriggerContainer dir="ltr">
        <ThreeDScrollTriggerRow baseVelocity={2} direction={1}>
          {videos.map((video, index) => (
            <VideoReelCard
              key={`${video.id}`}
              video={video}
              index={index}
              theme={theme}
            />
          ))}
        </ThreeDScrollTriggerRow>
      </ThreeDScrollTriggerContainer>
    </div>
  );
});

Reviews.displayName = "Reviews";

export default Reviews;
