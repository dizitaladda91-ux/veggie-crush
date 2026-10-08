const MEGABYTE = 1024 * 1024;

export const MAX_IMAGE_UPLOAD_BYTES = 50 * MEGABYTE;
export const MAX_IMAGE_REQUEST_BYTES = 51 * MEGABYTE;
export const MAX_DOCUMENT_REQUEST_BYTES = 4 * MEGABYTE;
export const MAX_DOCUMENT_UPLOAD_BYTES = MAX_DOCUMENT_REQUEST_BYTES - 64 * 1024;

export async function readApiJson(response) {
  const body = await response.text();

  try {
    return JSON.parse(body);
  } catch {
    if (response.status === 413 || /^request entity too large/i.test(body.trim())) {
      throw new Error("The upload is too large for this request. Check the file size and try again.");
    }
    throw new Error(`Server returned an invalid response (HTTP ${response.status}).`);
  }
}

export function isImageFileTooLarge(file) {
  return file.size > MAX_IMAGE_UPLOAD_BYTES;
}

export function isImageBatchTooLarge(files) {
  return files.reduce((total, file) => total + file.size, 0) > MAX_IMAGE_UPLOAD_BYTES;
}
