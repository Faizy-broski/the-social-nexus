"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  Share2,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

type LightboxProps = {
  images: string[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  titles?: string[];
};

/**
 * Full-screen gallery viewer used by the portfolio "Mockup View", Logo
 * Design grid, and Social Media Design grid — swaps the previous
 * "open image in a new tab" behavior for an in-page lightbox with
 * prev/next, zoom, fullscreen and share controls.
 */
export function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
  titles,
}: LightboxProps) {
  const [zoomed, setZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const total = images.length;
  const src = images[index];
  const title = titles?.[index];

  // Reset zoom when the active image changes — compared and reset during
  // render (React's documented alternative to a setState-in-effect) rather
  // than via a useEffect keyed on `index`.
  const [prevIndex, setPrevIndex] = useState(index);
  if (index !== prevIndex) {
    setPrevIndex(index);
    setZoomed(false);
  }

  const goTo = useCallback(
    (next: number) => onNavigate(((next % total) + total) % total),
    [onNavigate, total],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goTo(index - 1);
      if (e.key === "ArrowRight") goTo(index + 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, index, onClose]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  useEffect(() => {
    const onFsChange = () =>
      setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      rootRef.current?.requestFullscreen().catch(() => {});
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}${src}`;
    if (navigator.share) {
      try {
        await navigator.share({ url, title: title ?? "The Social Nexus" });
      } catch {
        // user dismissed the native share sheet — nothing to do
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard permission denied — silently no-op
    }
  };

  if (total === 0) return null;

  return createPortal(
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="animate-fade-in fixed inset-0 z-100 flex items-center justify-center bg-black/55 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-full w-full flex-col items-center justify-center p-4 sm:p-8"
      >
        {total > 1 && (
          <span className="absolute left-4 top-4 text-sm font-medium tracking-wide text-white/60 sm:left-6 sm:top-6">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
        )}

        {/* toolbar */}
        <div className="absolute right-4 top-4 flex items-center gap-2 sm:right-6 sm:top-6">
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            className="press-scale flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            {isFullscreen ? (
              <Minimize className="h-4.5 w-4.5" />
            ) : (
              <Maximize className="h-4.5 w-4.5" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setZoomed((z) => !z)}
            aria-label={zoomed ? "Zoom out" : "Zoom in"}
            className="press-scale flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            {zoomed ? (
              <ZoomOut className="h-4.5 w-4.5" />
            ) : (
              <ZoomIn className="h-4.5 w-4.5" />
            )}
          </button>
          <button
            type="button"
            onClick={handleShare}
            aria-label="Share"
            className="press-scale relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <Share2 className="h-4.5 w-4.5" />
            {copied && (
              <span className="absolute -bottom-8 right-0 whitespace-nowrap rounded bg-white/10 px-2 py-1 text-[11px] text-white">
                Link copied
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="press-scale flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-teal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* prev / next */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous image"
              className="press-scale absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-teal sm:left-6"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next image"
              className="press-scale absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-teal sm:right-6"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* image */}
        <div className="relative h-[75vh] w-full max-w-5xl overflow-hidden">
          <Image
            key={src}
            src={src}
            alt={title ?? ""}
            fill
            sizes="90vw"
            onClick={() => setZoomed((z) => !z)}
            className={cn(
              "animate-fade-in object-contain transition-transform duration-300 ease-out",
              zoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in",
            )}
          />
        </div>

        {title && (
          <p className="mt-4 max-w-lg text-center text-sm font-medium text-white/70">
            {title}
          </p>
        )}
      </div>
    </div>,
    document.body,
  );
}

export default Lightbox;
