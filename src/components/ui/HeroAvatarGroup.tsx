"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import {
  AvatarGroup,
  AvatarGroupTooltip,
} from "../animate-ui/components/animate/avatar-group";
import { cn } from "../../lib/utils";

import naemaAlshehiImg from "../../assets/influencers/Naema-Alshehi.webp";
import hazzaAlSheryaniImg from "../../assets/influencers/hazza-al-sheryani.webp";
import ahmedBenChaibahImg from "../../assets/influencers/ahmed-ben-chaibah.webp";
import salamahAlmuheriImg from "../../assets/influencers/Salamah-Almuheri.webp";
import helalAljaberiImg from "../../assets/influencers/Helal-Aljaberi.webp";
import thaerAlTurkmaniImg from "../../assets/influencers/thaer-al-turkmani.webp";

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      width={48}
      height={48}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  );
}

const AVATARS = [
  { src: naemaAlshehiImg, fallback: "NA", tooltip: "Naema Alshehi" },
  { src: hazzaAlSheryaniImg, fallback: "HS", tooltip: "Hazza Al Sheryani" },
  { src: ahmedBenChaibahImg, fallback: "AC", tooltip: "Ahmed Ben Chaibah" },
  { src: salamahAlmuheriImg, fallback: "SA", tooltip: "Salamah Almuheri" },
  { src: helalAljaberiImg, fallback: "HA", tooltip: "Helal Aljaberi" },
  { src: thaerAlTurkmaniImg, fallback: "TT", tooltip: "Thaer Al Turkmani" },
];

export default function HeroAvatarGroup() {
  return (
    <AvatarGroup>
      {AVATARS.map((avatar, index) => (
        <Avatar
          key={index}
          className="size-12 bg-[#6ACBCC]/90 border-3 border-primary"
        >
          <AvatarImage src={avatar.src} alt={avatar.tooltip} />
          <AvatarFallback>{avatar.fallback}</AvatarFallback>
          <AvatarGroupTooltip>{avatar.tooltip}</AvatarGroupTooltip>
        </Avatar>
      ))}
    </AvatarGroup>
  );
}
