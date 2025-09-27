'use client';
import { useEffect, useState } from "react";
export default function usePrefersReducedMotion() {
  const [reduce, set] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    set(!!mq.matches);
    const on = () => set(!!mq.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return reduce;
}
