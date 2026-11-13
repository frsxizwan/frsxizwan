"use client";

import { useSyncExternalStore } from "react";

/**
 * Reduced-motion preference.
 * Order of precedence: explicit user choice (localStorage) → OS setting.
 * The value is mirrored to <html data-motion> so CSS can react without JS re-renders.
 */
const KEY = "faris-studio:motion";
const listeners = new Set<() => void>();

function read(): boolean {
  try {
    const stored = window.localStorage.getItem(KEY);
    if (stored === "reduced") return true;
    if (stored === "full") return false;
  } catch {
    /* storage unavailable — fall through to the OS setting */
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function apply(reduced: boolean) {
  document.documentElement.dataset.motion = reduced ? "reduced" : "full";
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const onChange = () => {
    apply(read());
    cb();
  };
  mq.addEventListener("change", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(cb);
    mq.removeEventListener("change", onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function setReducedMotion(reduced: boolean) {
  try {
    window.localStorage.setItem(KEY, reduced ? "reduced" : "full");
  } catch {
    /* ignore */
  }
  apply(reduced);
  listeners.forEach((l) => l());
}

export function useReducedMotionPreference(): boolean {
  return useSyncExternalStore(subscribe, read, () => false);
}

/** Inline script run before first paint so there is no flash of animation. */
export const motionBootScript = `(function(){try{var s=localStorage.getItem(${JSON.stringify(
  KEY,
)});var r=s==="reduced"||(s!=="full"&&matchMedia("(prefers-reduced-motion: reduce)").matches);document.documentElement.dataset.motion=r?"reduced":"full"}catch(e){}})()`;
