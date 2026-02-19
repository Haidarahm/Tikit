"use client";

import * as React from "react";
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

type AvatarStatus = "idle" | "loading" | "loaded" | "error";

const AvatarContext = React.createContext<{
  status: AvatarStatus;
  setStatus: (status: AvatarStatus) => void;
}>({ status: "idle", setStatus: () => {} });

function Avatar({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [status, setStatus] = React.useState<AvatarStatus>("loading");
  return (
    <AvatarContext.Provider value={{ status, setStatus }}>
      <div
        data-slot="avatar"
        className={cn(
          "relative flex size-8 shrink-0 overflow-hidden rounded-full",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </AvatarContext.Provider>
  );
}

function AvatarImage({
  className,
  src,
  alt,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { setStatus } = React.useContext(AvatarContext);
  return (
    <img
      data-slot="avatar-image"
      src={src}
      alt={alt ?? ""}
      className={cn("aspect-square size-full object-cover", className)}
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      width={48}
      height={48}
      onLoad={() => setStatus("loaded")}
      onError={() => setStatus("error")}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  const { status } = React.useContext(AvatarContext);
  if (status === "loaded") return null;
  return (
    <span
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full absolute inset-0",
        className
      )}
      {...props}
    >
      {children}
    </span>
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
