'use client';
import { useEffect, useRef, type ReactNode } from "react";

interface ModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

/** Accessible modal with focus trap + ESC to close */
export default function Modal({ open, title, children, onClose }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const el = ref.current;
    if (!el) return;
    const f = el.querySelectorAll("a,button,input,textarea,[tabindex]:not([tabindex='-1'])");
    const first = f[0] as HTMLElement, last = f[f.length - 1] as HTMLElement;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    first?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} aria-hidden="true"></div>
      <div role="dialog" aria-modal="true" aria-labelledby="modal-title"
           className="absolute inset-0 flex items-center justify-center p-4">
        <div ref={ref} className="w-full max-w-xl bg-orion-panel border border-orion-border rounded-xl shadow-soft p-6">
          <div className="flex items-start justify-between">
            <h3 id="modal-title" className="text-xl font-bold">{title}</h3>
            <button className="px-3 py-1 rounded hover:bg-white/10" onClick={onClose} aria-label="Close">✕</button>
          </div>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
