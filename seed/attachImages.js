require("dotenv").config();

const fs = require("node:fs/promises");
const path = require("node:path");
const mongoose = require("mongoose");
const Combo = require("../models/Combo");
const Product = require("../models/Product");
const { connectMongoose } = require("../lib/mongoose");
const { uploadFile } = require("../config/cloudinary");
const {
  mapWithConcurrency,
  resolveImageTarget,
  sortImagesByOrder,
} = require("../lib/image-matching");

const UPLOADS_DIR = path.resolve(process.cwd(), "uploads");
const CLOUDINARY_FOLDER = { product: "veggiecrush/products", combo: "veggiecrush/combos" };
const isDryRun = process.argv.includes("--dry");
const appendImages = process.argv.includes("--append");
const MAX_ATTEMPTS = 3;

async function uploadWithRetry(filePath, options) {
  let lastError;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      return await uploadFile(filePath, options);
    } catch (error) {
      lastError = error;
      if (attempt < MAX_ATTEMPTS) {
        console.warn(`Retry ${attempt}/${MAX_ATTEMPTS - 1} for ${path.basename(filePath)}: ${error.message}`);
      }
    }
  }
  throw lastError;
}

async function attachImages() {
  await connectMongoose();

  const entries = await fs.readdir(UPLOADS_DIR, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile() && /\.(webp|png|jpe?g)$/i.test(entry.name))
    .map((entry) => ({ name: entry.name, path: path.join(UPLOADS_DIR, entry.name) }));
  const products = await Product.find({}).select("_id code slug images").lean();
  const combos = await Combo.find({}).select("_id code slug images").lean();

  const unmatched = [];
  const failed = [];
  const groups = new Map();
  for (const file of files) {
    const target = resolveImageTarget(file.name, products, combos);
    if (!target) {
      unmatched.push(file.name);
      continue;
    }

    const groupKey = `${target.kind}:${target.item._id}`;
    if (!groups.has(groupKey)) groups.set(groupKey, { ...target, files: [] });
    groups.get(groupKey).files.push(file);
  }

  const groupResults = await mapWithConcurrency([...groups.values()], 5, async (group) => {
    const sortedFiles = sortImagesByOrder(group.files.map((file) => ({
      ...file,
      parsed: resolveImageTarget(file.name, products, combos).parsed,
    })));

    if (isDryRun) {
      console.log(`[DRY] ${group.kind} ${group.item.code} (${group.item.slug}): ${sortedFiles.map((file) => file.name).join(", ")}`);
      return { group, uploaded: [] };
    }

    const results = await Promise.all(sortedFiles.map(async (file) => {
      const publicId = path.parse(file.name).name;
      try {
        const result = await uploadWithRetry(file.path, {
          folder: CLOUDINARY_FOLDER[group.kind],
          public_id: publicId,
          overwrite: true,
          unique_filename: false,
        });
        return { file, result };
      } catch (error) {
        failed.push({ file: file.name, error: error.message });
        return null;
      }
    }));

    return { group, uploaded: results.filter(Boolean) };
  });

  let uploadedCount = 0;
  if (!isDryRun) {
    for (const { group, uploaded } of groupResults) {
      if (!uploaded.length) continue;
      const newImages = sortImagesByOrder(uploaded.map(({ file, result }) => ({
        url: result.secure_url,
        parsed: resolveImageTarget(file.name, products, combos).parsed,
      }))).map((image) => image.url);
      const incompleteGroup = uploaded.length !== group.files.length;
      const item = group.item;
      const existingImages = item.images || [];
      const images = appendImages || incompleteGroup
        ? [...existingImages, ...newImages.filter((url) => !existingImages.includes(url))]
        : newImages;

      try {
        const update = await (group.kind === "product" ? Product : Combo).updateOne(
          { _id: item._id },
          { $set: { images } },
        );
        if (!update.matchedCount) throw new Error("The catalog item no longer exists.");
        uploadedCount += uploaded.length;
      } catch (error) {
        for (const { file } of uploaded) {
          failed.push({ file: file.name, error: `Cloudinary upload succeeded but database update failed: ${error.message}` });
        }
      }
    }
  }

  const matchedKeys = new Set(groups.keys());
  const missing = [
    ...products.filter((product) => !matchedKeys.has(`product:${product._id}`)).map((item) => `product ${item.code} (${item.slug})`),
    ...combos.filter((combo) => !matchedKeys.has(`combo:${combo._id}`)).map((item) => `combo ${item.code} (${item.slug})`),
  ];

  console.log("\nBulk image attach report");
  console.log(`Images found: ${files.length}`);
  console.log(`Matched images: ${files.length - unmatched.length}`);
  console.log(`${isDryRun ? "Images that would upload" : "Images uploaded and attached"}: ${isDryRun ? files.length - unmatched.length : uploadedCount}`);
  console.log(`Unmatched files (${unmatched.length}): ${unmatched.length ? unmatched.join(", ") : "none"}`);
  console.log(`Products/combos without matching image files (${missing.length}): ${missing.length ? missing.join(", ") : "none"}`);
  console.log(`Failed uploads/updates (${failed.length}): ${failed.length ? JSON.stringify(failed, null, 2) : "none"}`);
  if (isDryRun) console.log("Dry run complete: Cloudinary and the database were not changed.");
}

attachImages()
  .catch((error) => {
    console.error("Bulk image attachment failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    try {
      await mongoose.disconnect();
    } catch (error) {
      console.error("Could not disconnect from MongoDB:", error);
      process.exitCode = 1;
    }
  });
