"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { TiltCard } from "@/components/motion/TiltCard";

type ServiceThumbnailProps = {
  src: string;
  alt: string;
  className?: string;
};

/**
 * Small client leaf so the hover-reveal thumbnail can get pointer-tracked
 * tilt without forcing the surrounding service list (Services.tsx /
 * app/services/page.tsx) to become a Client Component — those stay server
 * components on purpose, per their own comments, since nothing else in the
 * row needs client JS.
 *
 * TiltCard needs a real, positioned box (not just an `Image fill` reaching
 * past it) so its own pointer math has a correct bounding rect to measure.
 */
export function ServiceThumbnail({ src, alt, className }: ServiceThumbnailProps) {
  return (
    <TiltCard className={cn("relative h-full w-full", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 224px, 0px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      {/* thin brand-accent border wash on top of the thumbnail */}
      <div className="absolute inset-0 gradient-accent opacity-10" />
    </TiltCard>
  );
}

export default ServiceThumbnail;
