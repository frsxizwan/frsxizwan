"use client";

import { setReducedMotion, useReducedMotionPreference } from "@/lib/motion-preference";

export function MotionToggle({ className = "" }: { className?: string }) {
  const reduced = useReducedMotionPreference();
  return (
    <button
      type="button"
      aria-pressed={reduced}
      onClick={() => setReducedMotion(!reduced)}
      className={`inline-flex items-center gap-2.5 rounded-full border border-line px-3.5 py-2 text-[13px] text-muted transition-colors hover:border-line-strong hover:text-fg ${className}`}
    >
      <span
        aria-hidden="true"
        className={`relative h-3.5 w-6 rounded-full transition-colors ${reduced ? "bg-accent-deep" : "bg-white/15"}`}
      >
        <span
          className={`absolute top-0.5 h-2.5 w-2.5 rounded-full bg-white transition-[left] ${reduced ? "left-3" : "left-0.5"}`}
        />
      </span>
      Reduce motion
    </button>
  );
}
