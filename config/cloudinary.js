const cloudinary = require("cloudinary").v2;
const { createReadStream } = require("node:fs");

function configureCloudinary() {
  const cloudinaryUrl = process.env.CLOUDINARY_URL?.trim();

  if (cloudinaryUrl) {
    cloudinary.config({ ...cloudinary.config(true), secure: true });
  } else {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
    const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
    const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();

    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error("Set CLOUDINARY_URL or all three CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET variables.");
    }

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });
  }

  const config = cloudinary.config();
  if (!config.cloud_name || !config.api_key || !config.api_secret) {
    throw new Error("Cloudinary configuration is incomplete.");
  }
  return cloudinary;
}

function uploadBuffer(buffer, options) {
  const client = configureCloudinary();
  return new Promise((resolve, reject) => {
    const upload = client.uploader.upload_stream(
      { resource_type: "image", overwrite: true, ...options },
      (error, result) => {
        if (error) reject(error);
        else if (!result?.secure_url || !result?.public_id) {
          reject(new Error("Cloudinary returned an incomplete image result."));
        } else resolve(result);
      },
    );
    upload.end(buffer);
  });
}

function uploadFile(filePath, options) {
  const client = configureCloudinary();
  return client.uploader.upload(filePath, {
    resource_type: "image",
    overwrite: true,
    ...options,
  });
}

function deleteImage(publicId) {
  const client = configureCloudinary();
  return client.uploader.destroy(publicId, {
    resource_type: "image",
    invalidate: true,
  });
}

module.exports = {
  configureCloudinary,
  deleteImage,
  uploadBuffer,
  uploadFile,
};
