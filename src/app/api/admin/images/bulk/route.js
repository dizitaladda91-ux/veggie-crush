import { NextResponse } from "next/server";
import path from "node:path";
import { getCurrentUser } from "@/lib/auth";
import { connectCatalog, Combo, Product } from "@/lib/catalog";
import { MAX_IMAGE_REQUEST_BYTES, MAX_IMAGE_UPLOAD_BYTES } from "@/lib/read-api-json";
import cloudinaryConfig from "../../../../../../config/cloudinary.js";
import imageMatching from "../../../../../../lib/image-matching.js";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_FILES = 20;
const MAX_ATTEMPTS = 3;
const MIME_TYPES = new Map([
  ["image/webp", ".webp"],
  ["image/png", ".png"],
  ["image/jpeg", ".jpg"],
]);
const FOLDERS = { product: "veggiecrush/products", combo: "veggiecrush/combos" };

async function retryUpload(buffer, options) {
  let lastError;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      return await cloudinaryConfig.uploadBuffer(buffer, options);
    } catch (error) {
      lastError = error;
      if (attempt < MAX_ATTEMPTS) {
        console.warn(`Retry ${attempt}/${MAX_ATTEMPTS - 1} for ${options.public_id}: ${error.message}`);
      }
    }
  }
  throw lastError;
}

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Admin login required." }, { status: 401 });
    if (user.role !== "ADMIN") return NextResponse.json({ error: "Only admins can upload images." }, { status: 403 });

    const contentLength = Number(request.headers.get("content-length"));
    if (contentLength > MAX_IMAGE_REQUEST_BYTES) {
      return NextResponse.json({ error: "The image upload request must be under 51 MB." }, { status: 413 });
    }

    const formData = await request.formData();
    const files = formData.getAll("files");
    if (!files.length || files.length > MAX_FILES) {
      return NextResponse.json({ error: `Choose between 1 and ${MAX_FILES} images.` }, { status: 400 });
    }
    if (files.some((file) => typeof file !== "string" && file.size > MAX_IMAGE_UPLOAD_BYTES)
      || files.reduce((total, file) => total + (typeof file === "string" ? 0 : file.size), 0) > MAX_IMAGE_UPLOAD_BYTES) {
      return NextResponse.json({ error: "The total image upload must be 50 MB or smaller." }, { status: 413 });
    }

    const invalid = [];
    for (const file of files) {
      if (typeof file === "string" || !file.name) {
        invalid.push({ file: "unknown", error: "Each upload must be an image file." });
        continue;
      }
      if (file.size < 1 || file.size > MAX_IMAGE_UPLOAD_BYTES) {
        invalid.push({ file: file.name, error: "Image size must be 50 MB or smaller." });
      } else if (!MIME_TYPES.has(file.type)) {
        invalid.push({ file: file.name, error: "Only WebP, PNG, and JPEG images are supported." });
      } else if (!file.name.toLowerCase().endsWith(MIME_TYPES.get(file.type))
        && !(file.type === "image/jpeg" && file.name.toLowerCase().endsWith(".jpeg"))) {
        invalid.push({ file: file.name, error: "File extension must match its image type." });
      } else if (path.basename(file.name.replace(/\\/g, "/")) !== file.name) {
        invalid.push({ file: file.name, error: "Image filename must not contain a directory path." });
      }
    }
    if (invalid.length) {
      return NextResponse.json({ error: "One or more files failed validation.", failed: invalid }, { status: 400 });
    }

    await connectCatalog();
    const [products, combos] = await Promise.all([
      Product.find({}).select("_id code slug images").lean(),
      Combo.find({}).select("_id code slug images").lean(),
    ]);
    const matched = [];
    const unmatched = [];
    const tasks = [];

    for (const file of files) {
      const target = imageMatching.resolveImageTarget(file.name, products, combos);
      if (!target) {
        unmatched.push(file.name);
        continue;
      }
      matched.push({ file: file.name, type: target.kind, code: target.item.code, slug: target.item.slug });
      tasks.push({ file, target });
    }

    const outcomes = await imageMatching.mapWithConcurrency(tasks, 5, async ({ file, target }) => {
      try {
        const result = await retryUpload(Buffer.from(await file.arrayBuffer()), {
          folder: FOLDERS[target.kind],
          public_id: path.parse(file.name).name,
          overwrite: true,
          unique_filename: false,
          resource_type: "image",
        });
        return { file: file.name, target, url: result.secure_url };
      } catch (error) {
        return { file: file.name, target, error: error.message };
      }
    });

    const failed = outcomes
      .filter((outcome) => outcome.error)
      .map(({ file, target, error }) => ({ file, type: target.kind, code: target.item.code, error }));
    const uploaded = outcomes.filter((outcome) => !outcome.error);
    const grouped = new Map();
    for (const result of uploaded) {
      const key = `${result.target.kind}:${result.target.item._id}`;
      if (!grouped.has(key)) grouped.set(key, { target: result.target, images: [] });
      grouped.get(key).images.push({
        url: result.url,
        parsed: imageMatching.parseName(result.file),
      });
    }

    let databaseFailures = 0;
    const attached = [];
    for (const group of grouped.values()) {
      const model = group.target.kind === "product" ? Product : Combo;
      const priorImages = group.target.item.images || [];
      const newImages = imageMatching.sortImagesByOrder(group.images).map((image) => image.url);
      const itemHasUploadFailure = failed.some((item) =>
        item.type === group.target.kind && item.code === group.target.item.code,
      );
      const useAppend = formData.get("append") === "true" || itemHasUploadFailure;
      const images = useAppend
        ? [...priorImages, ...newImages.filter((url) => !priorImages.includes(url))]
        : newImages;
      try {
        const update = await model.updateOne({ _id: group.target.item._id }, { $set: { images } });
        if (!update.matchedCount) throw new Error("The catalog item no longer exists.");
        attached.push({
          id: String(group.target.item._id),
          type: group.target.kind,
          code: group.target.item.code,
          images,
        });
      } catch (error) {
        databaseFailures += group.images.length;
        for (const image of group.images) {
          failed.push({
            file: image.parsed.basename,
            type: group.target.kind,
            code: group.target.item.code,
            error: `Cloudinary upload succeeded but database update failed: ${error.message}`,
          });
        }
      }
    }

    return NextResponse.json(
      { matched, unmatched, failed, uploaded: uploaded.length - databaseFailures, attached },
      { status: failed.length ? 207 : 200 },
    );
  } catch (error) {
    console.error("Admin bulk image upload failed:", error);
    return NextResponse.json({ error: "Could not complete the bulk image upload." }, { status: 500 });
  }
}
