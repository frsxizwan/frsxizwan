"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotionPreference } from "@/lib/motion-preference";

/**
 * Lazy-loads Three.js after first paint so the headline is never blocked by the 3D bundle.
 * If WebGL is unavailable the CSS gradient underneath remains as the hero backdrop.
 */
export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotionPreference();
  const [state, setState] = useState<"loading" | "ready" | "failed">("loading");

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let cancelled = false;
    let dispose: (() => void) | undefined;

    import("./hero-scene")
      .then(({ createHeroScene }) => {
        if (cancelled) return;
        dispose = createHeroScene(canvas, reduced);
        setState("ready");
      })
      .catch(() => {
        if (!cancelled) setState("failed");
      });

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, [reduced]);

  return (
    <div aria-hidden="true" className="hero-fallback pointer-events-none absolute inset-0" data-hero-scene={state}>
      <canvas
        ref={ref}
        className={`h-full w-full transition-opacity duration-[1600ms] ${state === "ready" ? "opacity-60 md:opacity-100" : "opacity-0"}`}
      />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-ink" />
    </div>
  );
}
