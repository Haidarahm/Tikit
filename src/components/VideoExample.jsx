import React, { useState } from "react";
import Video from "./Video";

/**
 * Example usage of the Video component with upload simulation
 */
const VideoExample = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Simulate video upload with progress
  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  const handleLoadStart = () => {
    console.log("Upload started!");
  };

  const handleUploadComplete = () => {
    console.log("Upload completed!");
  };

  const handleError = (error) => {
    console.error("Error loading video:", error);
  };

  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold mb-6">Video Component Examples</h2>

      {/* Example 1: Basic Video */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">1. Basic Video</h3>
        <Video
          src="/path/to/your-video.mp4"
          className="w-full max-w-2xl mx-auto rounded-lg"
          onLoadStart={handleLoadStart}
          onUploadComplete={handleUploadComplete}
          onError={handleError}
        />
      </div>

      {/* Example 2: Video with Upload Progress Simulation */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">
          2. Video with upload progress (click to simulate upload)
        </h3>
        <button
          onClick={simulateUpload}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Start Upload Simulation
        </button>
        <Video
          src="/path/to/your-video.mp4"
          uploadProgress={uploadProgress}
          className="w-full max-w-2xl mx-auto rounded-lg"
          onLoadStart={handleLoadStart}
          onUploadComplete={handleUploadComplete}
          onError={handleError}
        />
      </div>

      {/* Example 3: Auto-playing Video */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">
          3. Auto-playing video with poster
        </h3>
        <Video
          src="/path/to/your-video.mp4"
          uploadProgress={100}
          poster="/path/to/poster-image.jpg"
          autoplay={true}
          muted={true}
          loop={true}
          className="w-full max-w-2xl mx-auto rounded-lg"
        />
      </div>

      {/* Example 4: Video without controls */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">
          4. Video without controls (for background video)
        </h3>
        <Video
          src="/path/to/your-video.mp4"
          uploadProgress={100}
          controls={false}
          autoplay={true}
          loop={true}
          muted={true}
          className="w-full max-w-2xl mx-auto rounded-lg"
        />
      </div>
    </div>
  );
};

export default VideoExample;
