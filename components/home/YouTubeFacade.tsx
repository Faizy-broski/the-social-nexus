"use client";

import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

/**
 * Click-to-load YouTube embed. The real iframe (and everything it drags
 * in — YouTube's own JS, cookies, fonts, i.ytimg.com preconnects) never
 * loads until the user actually wants to watch, instead of shipping on
 * every page load for a video most visitors never press play on.
 *
 * `autoplayOnView` opts a specific instance out of that click-to-load
 * gate: the real iframe loads (muted, so browsers allow autoplay)
 * once the facade scrolls into view, no click required.
 */
export function YouTubeFacade({
  videoId,
  title,
  className,
  autoplayOnView = false,
}: {
  videoId: string;
  title: string;
  className?: string;
  autoplayOnView?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.5 });

  useEffect(() => {
    if (autoplayOnView && inView) setLoaded(true);
  }, [autoplayOnView, inView]);

  return (
    <div ref={ref} className={className}>
      {loaded ? (
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&rel=0&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          aria-label={`Play video: ${title}`}
          className="group relative block h-full w-full cursor-pointer"
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
      )}
    </div>
  );
}

export default YouTubeFacade;
