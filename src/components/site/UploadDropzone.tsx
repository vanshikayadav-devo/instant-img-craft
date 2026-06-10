import { useCallback, useRef, useState } from "react";
import { UploadCloud, ImageIcon } from "lucide-react";

interface Props {
  onFile: (file: File) => void;
  disabled?: boolean;
}

const ACCEPT = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

export function UploadDropzone({ onFile, disabled }: Props) {
  const [hover, setHover] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const pick = useCallback((f?: File | null) => {
    if (!f) return;
    if (!ACCEPT.includes(f.type)) return alert("Unsupported file. Use PNG, JPG or WEBP.");
    if (f.size > 12 * 1024 * 1024) return alert("Max file size is 12MB.");
    onFile(f);
  }, [onFile]);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setHover(true); }}
      onDragLeave={() => setHover(false)}
      onDrop={(e) => { e.preventDefault(); setHover(false); pick(e.dataTransfer.files?.[0]); }}
      onClick={() => !disabled && inputRef.current?.click()}
      className={`group relative cursor-pointer rounded-3xl border-2 border-dashed transition-all p-12 text-center
        ${hover ? "border-primary bg-primary/5" : "border-border bg-card/60 hover:bg-card"}
        ${disabled ? "opacity-60 pointer-events-none" : ""}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT.join(",")}
        className="hidden"
        onChange={(e) => pick(e.target.files?.[0])}
      />
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl gradient-bg shadow-[var(--shadow-glow)] group-hover:scale-105 transition-transform">
        <UploadCloud className="h-7 w-7 text-white" />
      </div>
      <h3 className="mt-5 text-lg font-semibold">Drop your image here</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        or <span className="gradient-text font-medium">browse files</span> from your computer
      </p>
      <div className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
        <ImageIcon className="h-3.5 w-3.5" /> PNG · JPG · WEBP · up to 12MB
      </div>
    </div>
  );
}
