interface ToastProps {
  show: boolean;
  text: string;
}

export default function Toast({ show, text }: ToastProps) {
  return (
    <div aria-live="polite" className="fixed top-4 right-4 z-50">
      <div className={`transition-all duration-300 ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"} bg-black/80 text-white px-4 py-3 rounded-lg shadow-soft border border-white/10`}>
        {text}
      </div>
    </div>
  );
}
