import { useRef, useState, useCallback, useEffect } from "react";

interface Props {
  beforeSrc: string;
  afterSrc: string;
  className?: string;
}

export function BeforeAfterSlider({ beforeSrc, afterSrc, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  useEffect(() => {
    const up = () => (dragging.current = false);
    const mv = (e: MouseEvent) => dragging.current && move(e.clientX);
    const tm = (e: TouchEvent) => dragging.current && move(e.touches[0].clientX);
    window.addEventListener("mouseup", up);
    window.addEventListener("mousemove", mv);
    window.addEventListener("touchmove", tm);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("touchmove", tm);
      window.removeEventListener("touchend", up);
    };
  }, [move]);

  return (
    <div
      ref={ref}
      className={`relative select-none overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] ${className}`}
      onMouseDown={(e) => { dragging.current = true; move(e.clientX); }}
      onTouchStart={(e) => { dragging.current = true; move(e.touches[0].clientX); }}
    >
      <img src={beforeSrc} alt="Original" className="block w-full h-auto" draggable={false} />
      <div
        className="absolute inset-0 checker-bg overflow-hidden"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      >
        <img src={afterSrc} alt="Background removed" className="block w-full h-full object-cover" draggable={false} />
      </div>
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)]"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center text-xs font-semibold gradient-text">
          ⇆
        </div>
      </div>
      <div className="pointer-events-none absolute top-3 left-3 text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-black/50 text-white">Before</div>
      <div className="pointer-events-none absolute top-3 right-3 text-[10px] uppercase tracking-wider px-2 py-1 rounded gradient-bg text-white">After</div>
    </div>
  );
}
