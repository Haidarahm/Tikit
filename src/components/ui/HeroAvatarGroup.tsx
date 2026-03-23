"use client";

import * as React from "react";
import {
  AvatarGroup,
  AvatarGroupTooltip,
} from "../animate-ui/components/animate/avatar-group";
import { cn } from "../../lib/utils";

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
    src: "https://i.pinimg.com/webp/1200x/65/7c/e1/657ce19e18e65061190c7927400947cf.webp",
    fallback: "AL",
    tooltip: "André Luis",
  },
  {
    src: "https://i.pinimg.com/webp/1200x/72/2c/91/722c912d31ec627c640127d08314eb7b.webp",
    fallback: "AO",
    tooltip: "AyMan OuFkiR",
  },
  {
    src: "https://i.pinimg.com/736x/1a/99/b0/1a99b04a99f6700ea4da232597cf1e9f.jpg",
    fallback: "KO",
    tooltip: "Katren Olva",
  },
  {
    src: "https://i.pinimg.com/1200x/aa/bf/53/aabf5323efc5ece75fdb5d2af2880b5c.jpg",
    fallback: "HM",
    tooltip: "Hammad Muthana",
  },
  {
    src: "https://i.pinimg.com/webp/1200x/2d/cf/d1/2dcfd18ccda2c9a6987d8160911ffbe7.webp",
    fallback: "WC",
    tooltip: "Wictor Cardoso",
  },
  {
    src: "https://i.pinimg.com/1200x/f6/0b/a1/f60ba14a969de9023559e3355b7c6390.jpg",
    fallback: "SA",
    tooltip: "Suzana Aljuneidi",
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
