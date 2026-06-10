// Thin API layer talking to n8n webhooks. All backend logic lives in n8n.
const WEBHOOK = import.meta.env.VITE_N8N_WEBHOOK_URL ?? "";

export interface RemoveBgResponse {
  success: boolean;
  imageUrl: string;
  processingTime?: string;
}

/**
 * Sends image to n8n webhook for background removal.
 * If VITE_N8N_WEBHOOK_URL is not set, falls back to a local preview
 * (returns the original image) so the UI is fully demoable.
 */
export async function removeBackground(file: File): Promise<RemoveBgResponse> {
  if (!WEBHOOK) {
    // Demo fallback: pretend AI ran. Returns object URL of the original.
    await new Promise((r) => setTimeout(r, 1400));
    return {
      success: true,
      imageUrl: URL.createObjectURL(file),
      processingTime: "1.4 sec",
    };
  }

  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${WEBHOOK}/remove-bg`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) throw new Error(`Background removal failed (${res.status})`);
  return (await res.json()) as RemoveBgResponse;
}
