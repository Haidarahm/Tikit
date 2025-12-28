import React from "react";
import {
  AvatarGroup,
  AvatarGroupTooltip,
} from "../animate-ui/components/animate/avatar-group";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./avatar";

// Helper function to get optimized avatar URL (use smaller size for better performance)
const getOptimizedAvatarUrl = (url) => {
  // Twitter profile images: replace _400x400 with _normal (48x48) for smaller file size
  // _normal is perfect for 48px display and much smaller than 400x400
  if (url.includes('_400x400')) {
    return url.replace('_400x400', '_normal');
  }
  return url;
};

const AVATARS = [
  {
    src: getOptimizedAvatarUrl("https://pbs.twimg.com/profile_images/1948770261848756224/oPwqXMD6_400x400.jpg"),
    fallback: "SK",
    tooltip: "Skyleen",
  },
  {
    src: getOptimizedAvatarUrl("https://pbs.twimg.com/profile_images/1593304942210478080/TUYae5z7_400x400.jpg"),
    fallback: "CN",
    tooltip: "Shadcn",
  },
  {
    src: getOptimizedAvatarUrl("https://pbs.twimg.com/profile_images/1677042510839857154/Kq4tpySA_400x400.jpg"),
    fallback: "AW",
    tooltip: "Adam Wathan",
  },
  {
    src: getOptimizedAvatarUrl("https://pbs.twimg.com/profile_images/1783856060249595904/8TfcCN0r_400x400.jpg"),
    fallback: "GR",
    tooltip: "Guillermo Rauch",
  },
  {
    src: getOptimizedAvatarUrl("https://pbs.twimg.com/profile_images/1534700564810018816/anAuSfkp_400x400.jpg"),
    fallback: "JH",
    tooltip: "Jhey",
  },
  {
    src: getOptimizedAvatarUrl("https://pbs.twimg.com/profile_images/1927474594102784000/Al0g-I6o_400x400.jpg"),
    fallback: "DH",
    tooltip: "David Haz",
  },
];

const AvatarGroupDemo = () => {
  return (
    <AvatarGroup>
      {AVATARS.map((avatar, index) => (
        <Avatar key={index} className="size-12 border-3 border-primary">
          <AvatarImage 
            src={avatar.src} 
            alt={avatar.tooltip}
          />
          <AvatarFallback>{avatar.fallback}</AvatarFallback>
          <AvatarGroupTooltip>{avatar.tooltip}</AvatarGroupTooltip>
        </Avatar>
      ))}
    </AvatarGroup>
  );
};

export default AvatarGroupDemo;
