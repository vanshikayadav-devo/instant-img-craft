// In-memory store for webhook results
// In production, use a database or Redis
const resultStore = new Map<string, { url: string; timestamp: number }>();

// Clean up old results after 1 hour
const RESULT_TTL = 60 * 60 * 1000;

export function storeResult(requestId: string, url: string): void {
  resultStore.set(requestId, { url, timestamp: Date.now() });
  
  // Clean up after TTL
  setTimeout(() => {
    resultStore.delete(requestId);
  }, RESULT_TTL);
}

export function getResult(requestId: string): string | null {
  const result = resultStore.get(requestId);
  if (!result) return null;
  
  // Check if expired
  if (Date.now() - result.timestamp > RESULT_TTL) {
    resultStore.delete(requestId);
    return null;
  }
  
  return result.url;
}

export function deleteResult(requestId: string): void {
  resultStore.delete(requestId);
}
