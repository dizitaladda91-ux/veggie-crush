import { MAX_IMAGE_UPLOAD_BYTES, readApiJson } from "@/lib/read-api-json";

const CLOUDINARY_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);
const CLOUDINARY_CHUNK_BYTES = 5 * 1024 * 1024;

function createUploadBody(file, signature) {
  const body = new FormData();
  body.set("file", file, file.name);
  body.set("api_key", signature.apiKey);
  body.set("timestamp", String(signature.timestamp));
  body.set("signature", signature.signature);
  body.set("folder", signature.folder);
  body.set("public_id", signature.publicId);
  body.set("overwrite", "true");
  body.set("unique_filename", "false");
  return body;
}

async function uploadToCloudinary(file, signature, chunk) {
  const headers = {};
  if (chunk) {
    headers["Content-Range"] = `bytes ${chunk.start}-${chunk.end - 1}/${file.size}`;
    headers["X-Unique-Upload-Id"] = chunk.uploadId;
  }

  let response;
  try {
    response = await fetch(
      `https://api.cloudinary.com/v1_1/${encodeURIComponent(signature.cloudName)}/image/upload`,
      {
        method: "POST",
        headers,
        body: createUploadBody(
          chunk ? file.slice(chunk.start, chunk.end, file.type) : file,
          signature,
        ),
      },
    );
  } catch {
    throw new Error(`Network error while uploading ${file.name} to Cloudinary.`);
  }

  let result;
  try {
    result = await readApiJson(response);
  } catch (error) {
    if (response.status === 413) {
      throw new Error(
        `Cloudinary rejected ${file.name} with HTTP 413. Try a smaller image; if it is below 50 MB, check the Cloudinary account's upload-size limit.`,
      );
    }
    throw error;
  }
  if (!response.ok) {
    throw new Error(result.error?.message || `Cloudinary could not upload ${file.name}.`);
  }
  return result;
}

export async function uploadSignedImage(file, signature) {
  if (!CLOUDINARY_IMAGE_TYPES.has(file.type)) {
    throw new Error("Upload a JPEG, PNG, WebP, GIF, or AVIF image.");
  }
  if (!file.size || file.size > MAX_IMAGE_UPLOAD_BYTES) {
    throw new Error("Image must be 50 MB or smaller.");
  }

  if (file.size <= CLOUDINARY_CHUNK_BYTES) {
    const result = await uploadToCloudinary(file, signature);
    if (!result.secure_url) {
      throw new Error(`Cloudinary could not upload ${file.name}.`);
    }
    return result.secure_url;
  }

  const uploadId = crypto.randomUUID();
  let result;
  for (let start = 0; start < file.size; start += CLOUDINARY_CHUNK_BYTES) {
    const end = Math.min(start + CLOUDINARY_CHUNK_BYTES, file.size);
    result = await uploadToCloudinary(file, signature, { start, end, uploadId });
  }
  if (!result?.secure_url) {
    throw new Error(`Cloudinary did not finish uploading ${file.name}.`);
  }
  return result.secure_url;
}

export async function uploadProductImage(file) {
  const response = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folder: "veggiecrush/products" }),
  });
  const signature = await readApiJson(response);
  if (!response.ok) {
    throw new Error(signature.error || "Could not authorize the image upload.");
  }
  return uploadSignedImage(file, signature);
}
