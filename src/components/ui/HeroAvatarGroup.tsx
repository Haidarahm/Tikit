"use client";

import * as React from "react";
import {
  AvatarGroup,
  AvatarGroupTooltip,
} from "../animate-ui/components/animate/avatar-group";
import { cn } from "../../lib/utils";
import influencer1 from "../../assets/influencers/influencer-1.webp";
import influencer2 from "../../assets/influencers/influencer-2.webp";
import influencer3 from "../../assets/influencers/influencer-3.webp";
import influencer4 from "../../assets/influencers/influencer-4.webp";
import influencer5 from "../../assets/influencers/influencer-5.webp";
import influencer6 from "../../assets/influencers/influencer-6.webp";

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
  {
    src: influencer1,
    fallback: "AL",
    tooltip: "André Luis",
  },
  {
    src: influencer2,
    fallback: "AO",
    tooltip: "AyMan OuFkiR",
  },
  {
    src: influencer3,
    fallback: "KO",
    tooltip: "Wictor Cardoso",
  },
  {
    src: influencer4,
    fallback: "HM",
    tooltip: "Suzana Aljuneidi",
  },
  {
    src: influencer5,
    fallback: "WC",
    tooltip: "Katren Olva",
  },
  {
    src: influencer6,
    fallback: "SA",
    tooltip: "Hammad Muthana",
  },
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
