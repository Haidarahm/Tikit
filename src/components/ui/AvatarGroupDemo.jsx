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

// Local influencer avatars from assets/influencers
import naemaAlshehiImg from "../../assets/influencers/Naema-Alshehi.webp";
import hazzaAlSheryaniImg from "../../assets/influencers/hazza-al-sheryani.webp";
import ahmedBenChaibahImg from "../../assets/influencers/ahmed-ben-chaibah.webp";
import salamahAlmuheriImg from "../../assets/influencers/Salamah-Almuheri.webp";
import helalAljaberiImg from "../../assets/influencers/Helal-Aljaberi.webp";
import thaerAlTurkmaniImg from "../../assets/influencers/thaer-al-turkmani.webp";

const AVATARS = [
  {
    src: naemaAlshehiImg,
    fallback: "NA",
    tooltip: "Naema Alshehi",
  },
  {
    src: hazzaAlSheryaniImg,
    fallback: "HS",
    tooltip: "Hazza Al Sheryani",
  },
  {
    src: ahmedBenChaibahImg,
    fallback: "AC",
    tooltip: "Ahmed Ben Chaibah",
  },
  {
    src: salamahAlmuheriImg,
    fallback: "SA",
    tooltip: "Salamah Almuheri",
  },
  {
    src: helalAljaberiImg,
    fallback: "HA",
    tooltip: "Helal Aljaberi",
  },
  {
    src: thaerAlTurkmaniImg,
    fallback: "TT",
    tooltip: "Thaer Al Turkmani",
  },
];

const AvatarGroupDemo = () => {
  return (
    <AvatarGroup>
      {AVATARS.map((avatar, index) => (
        <Avatar key={index} className="size-12 bg-[#6ACBCC]/90 border-3 border-primary">
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
