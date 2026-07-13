"use client";

import { useState } from "react";
import { Play } from "lucide-react";

/**
 * Click-to-load YouTube embed. The real iframe (and everything it drags
 * in — YouTube's own JS, cookies, fonts, i.ytimg.com preconnects) never
 * loads until the user actually wants to watch, instead of shipping on
 * every page load for a video most visitors never press play on.
 */
export function YouTubeFacade({
  videoId,
  title,
  className,
}: {
  videoId: string;
  title: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        className={className}
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      aria-label={`Play video: ${title}`}
      className={`group relative block h-full w-full cursor-pointer ${className ?? ""}`}
      style={{
        backgroundImage: `url(https://i.ytimg.com/vi/${videoId}/hqdefault.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <span className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/40" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
          <Play className="ml-1 h-7 w-7 fill-brand-navy text-brand-navy sm:h-8 sm:w-8" />
        </span>
      </span>
    </button>
  );
}

export default YouTubeFacade;
