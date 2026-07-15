'use client'

import { useEffect, useRef } from "react";
import { useInView } from "@/hooks/use-in-view";

type Point = { x: number; y: number; vx: number; vy: number; radius: number };

export default function NetworkLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controlsRef = useRef<{ start: () => void; stop: () => void } | null>(null);
  const { ref: inViewRef, inView } = useInView<HTMLCanvasElement>({
    threshold: 0,
    rootMargin: "200px 0px",
  });

  const setRefs = (node: HTMLCanvasElement | null) => {
    canvasRef.current = node;
    inViewRef.current = node;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let rafId: number | null = null;
    let running = false;
    let points: Point[] = [];
    let width = 0;
    let height = 0;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;

      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      // More nodes
      const count = Math.max(
        65,
        Math.min(140, Math.floor((width * height) / 12000)),
      );

      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,

        // Faster motion
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,

        radius: Math.random() * 1.35 + 0.75,
      }));
    };

    const renderFrame = () => {
      context.clearRect(0, 0, width, height);

      for (const point of points) {
        if (!reducedMotion) {
          point.x += point.vx;
          point.y += point.vy;

          if (point.x < -20) point.x = width + 20;
          if (point.x > width + 20) point.x = -20;

          if (point.y < -20) point.y = height + 20;
          if (point.y > height + 20) point.y = -20;
        }
      }

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const distance = Math.hypot(
            points[i].x - points[j].x,
            points[i].y - points[j].y,
          );

          // More visible connections
          const maxDistance = width < 700 ? 145 : 210;

          if (distance < maxDistance) {
            context.beginPath();
            context.moveTo(points[i].x, points[i].y);
            context.lineTo(points[j].x, points[j].y);

            // brand-teal-light tint instead of neutral gray
            context.strokeStyle = `rgba(111,208,220,${
              0.22 * (1 - distance / maxDistance)
            })`;

            context.lineWidth = 1;
            context.stroke();
          }
        }

        // ~80% of nodes teal, ~20% gold — same ratio as the rest of the brand system
        const isGold = i % 5 === 0;
        context.beginPath();
        context.arc(points[i].x, points[i].y, points[i].radius, 0, Math.PI * 2);
        context.fillStyle = isGold
          ? "rgba(248,195,0,.6)" // brand-gold
          : "rgba(111,208,220,.65)"; // brand-teal-light
        context.fill();
      }
    };

    const loop = () => {
      renderFrame();
      if (running && !reducedMotion) {
        rafId = requestAnimationFrame(loop);
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      loop();
    };

    const stop = () => {
      running = false;
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
    };

    controlsRef.current = { start, stop };

    resize();
    renderFrame();

    // Debounced — a drag-resize fires many times a second, and each resize()
    // call re-reads layout and rebuilds the whole points array, so running
    // it on every event (instead of once the resize settles) is wasted work.
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const debouncedResize = () => {
      if (resizeTimer !== null) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };
    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      if (resizeTimer !== null) clearTimeout(resizeTimer);
      stop();
      controlsRef.current = null;
    };
  }, []);

  // This canvas backs the ambient "Nexus" glow on ~8 sections sitewide
  // (Services, Portfolio, FAQ, loading screen, about/contact/services/
  // portfolio pages). Each instance runs an O(n^2) point-distance pass
  // every frame, so only animate while it's actually scrolled into view
  // and the tab is in the foreground — otherwise it burns CPU/battery
  // for a canvas nobody can see.
  useEffect(() => {
    const updateRunning = () => {
      const controls = controlsRef.current;
      if (!controls) return;
      if (inView && document.visibilityState === "visible") {
        controls.start();
      } else {
        controls.stop();
      }
    };

    updateRunning();
    document.addEventListener("visibilitychange", updateRunning);
    return () => document.removeEventListener("visibilitychange", updateRunning);
  }, [inView]);

  return (
    <canvas
      ref={setRefs}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
