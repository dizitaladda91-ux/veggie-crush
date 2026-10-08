export const MAX_UPLOAD_REQUEST_BYTES = 4 * 1024 * 1024;
export const MAX_UPLOAD_FILE_BYTES = MAX_UPLOAD_REQUEST_BYTES - 64 * 1024;

export async function readApiJson(response) {
  const body = await response.text();

  try {
    return JSON.parse(body);
  } catch {
    if (response.status === 413 || /^request entity too large/i.test(body.trim())) {
      throw new Error("Request is too large. Keep uploads under 4 MB and try again.");
    }
    throw new Error(`Server returned an invalid response (HTTP ${response.status}).`);
  }
}

export function isUploadFileTooLarge(file) {
  return file.size > MAX_UPLOAD_FILE_BYTES;
}

export function isUploadBatchTooLarge(files) {
  return files.reduce((total, file) => total + file.size, 0) > MAX_UPLOAD_FILE_BYTES;
}
