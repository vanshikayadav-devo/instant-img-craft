const IMAGE_URL_KEYS = [
  "url",
  "imageUrl",
  "image_url",
  "image",
  "imageURL",
  "outputUrl",
  "output_url",
  "output",
  "resultUrl",
  "result_url",
  "result",
  "secure_url",
  "downloadUrl",
  "download_url",
  "webContentLink",
  "webViewLink",
];

export function extractImageUrl(value: unknown): string | null {
  if (typeof value === "string") {
    const trimmed = value.trim();

    if (
      (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
      (trimmed.startsWith("[") && trimmed.endsWith("]"))
    ) {
      try {
        const result = extractImageUrl(JSON.parse(trimmed));
        if (result) return result;
      } catch {
        // Treat invalid JSON-looking text as plain text below.
      }
    }

    if (isRenderableImageUrl(trimmed)) {
      return trimmed;
    }

    const match = trimmed.match(/https?:\/\/[^\s"'<>]+/i);
    return match?.[0] ?? null;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const result = extractImageUrl(item);
      if (result) return result;
    }
    return null;
  }

  if (!value || typeof value !== "object") {
    return null;
  }

  const record = value as Record<string, unknown>;

  for (const key of IMAGE_URL_KEYS) {
    const result = extractImageUrl(record[key]);
    if (result) return result;
  }

  for (const item of Object.values(record)) {
    const result = extractImageUrl(item);
    if (result) return result;
  }

  return null;
}

export function isRenderableImageUrl(value: string): boolean {
  if (value.startsWith("data:image/")) {
    return true;
  }

  try {
    const url = new URL(value);
    return /^https?:$/.test(url.protocol);
  } catch {
    return false;
  }
}
