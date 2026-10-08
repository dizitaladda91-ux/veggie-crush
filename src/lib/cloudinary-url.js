export function getCloudinaryImageUrl(url, width = 600) {
  if (typeof url !== "string" || !url.startsWith("https://")) return url;

  const normalizedWidth = Math.round(Number(width));
  if (!Number.isFinite(normalizedWidth) || normalizedWidth < 1) {
    throw new Error("Cloudinary image width must be a positive number.");
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch {
    return url;
  }
  const isCloudinaryHost = parsedUrl.hostname === "res.cloudinary.com"
    || parsedUrl.hostname.endsWith(".res.cloudinary.com");
  const uploadSegment = "/image/upload/";
  const uploadIndex = parsedUrl.pathname.indexOf(uploadSegment);
  if (!isCloudinaryHost || uploadIndex === -1) return url;

  const insertionIndex = uploadIndex + uploadSegment.length;
  const transformations = `f_auto,q_auto,w_${normalizedWidth}/`;
  parsedUrl.pathname = `${parsedUrl.pathname.slice(0, insertionIndex)}${transformations}${parsedUrl.pathname.slice(insertionIndex)}`;
  return parsedUrl.toString();
}
