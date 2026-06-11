import { removeBackgroundServer } from "./api/remove-bg.server";

export interface RemoveBgResponse {
  success: boolean;
  imageUrl?: string;
  processingTime?: string;
  requestId?: string;
  polling?: boolean;
}

/**
 * Removes background from an image using Cloudinary.
 * Calls a server-side function to handle the upload and transformation.
 */
export async function removeBackground(file: File): Promise<RemoveBgResponse> {
  // Convert file to base64 for transmission
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);

  const result = await removeBackgroundServer({ 
    data: {
      base64,
      name: file.name,
      type: file.type,
      size: file.size,
    }
  });

  if (!result.success) {
    throw new Error("Failed to remove background");
  }
  return result;
}
