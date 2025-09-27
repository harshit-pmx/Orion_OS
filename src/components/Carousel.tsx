'use client';
import { useEffect, useRef, type ReactNode } from "react";

interface CarouselProps<T> {
  title: string;
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
}

/** Horizontal carousel with keyboard support (←/→ when focused) */
export default function Carousel<T>({ title, items, renderItem }: CarouselProps<T>) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollBy = (dx: number) => ref.current?.scrollBy({ left: dx, behavior: "smooth" });

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (document.activeElement !== el) return;
      if (e.key === "ArrowRight") scrollBy(320);
      if (e.key === "ArrowLeft") scrollBy(-320);
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="my-6">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
          <div className="flex gap-2">
            <button onClick={() => scrollBy(-340)} className="btn btn-ghost" aria-label="Scroll left">◀</button>
            <button onClick={() => scrollBy(340)} className="btn btn-ghost" aria-label="Scroll right">▶</button>
          </div>
        </div>
        <div
          ref={ref}
          tabIndex={0}
          role="region"
          aria-label={title}
          className="scrollbar overflow-x-auto flex gap-4 snap-x px-1 focus:outline-none"
        >
          {items.map((it, i) => (<div key={i} className="snap-start">{renderItem(it, i)}</div>))}
        </div>
      </div>
    </section>
  );
}
