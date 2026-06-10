// Client-side credit system for SnapCut AI.
// Rules:
//  - Daily free allowance: 100 credits, resets every calendar day (local time).
//  - Per-image cost: 5 – 25 credits, scaled by file size.
//      <= 1 MB    -> 5
//      <= 3 MB    -> 10
//      <= 6 MB    -> 15
//      <= 9 MB    -> 20
//      >  9 MB    -> 25  (hard cap)
export const DAILY_FREE_CREDITS = 100;
export const MAX_CREDITS_PER_IMAGE = 25;

const STORAGE_KEY = "snapcut.credits.v1";

interface CreditState {
  date: string; // YYYY-MM-DD
  used: number;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function read(): CreditState {
  if (typeof window === "undefined") return { date: today(), used: 0 };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { date: today(), used: 0 };
    const parsed = JSON.parse(raw) as CreditState;
    if (parsed.date !== today()) return { date: today(), used: 0 };
    return parsed;
  } catch {
    return { date: today(), used: 0 };
  }
}

function write(state: CreditState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function estimateCost(fileSizeBytes: number): number {
  const mb = fileSizeBytes / (1024 * 1024);
  if (mb <= 1) return 5;
  if (mb <= 3) return 10;
  if (mb <= 6) return 15;
  if (mb <= 9) return 20;
  return MAX_CREDITS_PER_IMAGE;
}

export function getRemaining(): number {
  const s = read();
  return Math.max(0, DAILY_FREE_CREDITS - s.used);
}

export function getUsed(): number {
  return read().used;
}

export function canAfford(cost: number): boolean {
  return getRemaining() >= cost;
}

export function consume(cost: number): number {
  const s = read();
  const next: CreditState = { date: today(), used: Math.min(DAILY_FREE_CREDITS, s.used + cost) };
  write(next);
  return DAILY_FREE_CREDITS - next.used;
}
