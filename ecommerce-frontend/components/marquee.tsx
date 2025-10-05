"use client";

import { useAppData } from "@/hooks/use-app-data";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export default function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

export function MarqueeDemo() {
  const { settings } = useAppData();

  const announcements = settings?.marqueeConfig ?? [];

  return (
    <div className="fixed top-0 left-0 right-0 bg-black text-white py-2 text-sm z-50">
      <Marquee pauseOnHover className="[--duration:30s]">
        {announcements.map((announcement, idx) => (
          <span key={idx} className="mx-8 whitespace-nowrap">
            {announcement}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
