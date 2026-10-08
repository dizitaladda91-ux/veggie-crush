import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { connectCatalog, Combo, Product } from "@/lib/catalog";
import cloudinaryConfig from "../../../../../../config/cloudinary.js";
import imageMatching from "../../../../../../lib/image-matching.js";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_FILES = 20;
const FOLDERS = { product: "products", combo: "combos" };

function isValidCloudinaryUrl(value, itemType, publicId, cloudName) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.hostname !== "res.cloudinary.com") return false;

    const parts = url.pathname.split("/").filter(Boolean).map(decodeURIComponent);
    if (parts[0] !== cloudName) return false;
    const uploadIndex = parts.indexOf("upload");
    if (uploadIndex < 0) return false;
    const folderIndex = parts.indexOf("veggiecrush", uploadIndex + 1);
    if (folderIndex < 0 || parts[folderIndex + 1] !== FOLDERS[itemType]) return false;

    const uploadedPublicId = parts.slice(folderIndex + 2).join("/").replace(/\.[^.\/]+$/, "");
    return uploadedPublicId === publicId;
  } catch {
    return false;
  }
}

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Admin login required." }, { status: 401 });
    if (user.role !== "ADMIN") return NextResponse.json({ error: "Only admins can attach images." }, { status: 403 });

    const body = await request.json();
    if (!Array.isArray(body.uploaded) || body.uploaded.length > MAX_FILES
      || !Array.isArray(body.failed) || body.failed.length > MAX_FILES
      || !Array.isArray(body.unmatched) || body.unmatched.length > MAX_FILES) {
      return NextResponse.json({ error: "Invalid bulk image upload results." }, { status: 400 });
    }

    await connectCatalog();
    const [products, combos] = await Promise.all([
      Product.find({}).select("_id code slug images").lean(),
      Combo.find({}).select("_id code slug images").lean(),
    ]);
    const cloudName = cloudinaryConfig.configureCloudinary().config().cloud_name;
    const failed = [];
    const matched = [];
    const unmatched = [...new Set(body.unmatched.filter((name) => typeof name === "string"))];
    const grouped = new Map();
    let successfulUploads = 0;

    for (const upload of body.uploaded) {
      if (!upload || typeof upload.file !== "string" || typeof upload.url !== "string") {
        return NextResponse.json({ error: "Each uploaded image must include its filename and URL." }, { status: 400 });
      }

      const target = imageMatching.resolveImageTarget(upload.file, products, combos);
      if (!target) {
        if (!unmatched.includes(upload.file)) unmatched.push(upload.file);
        continue;
      }

      matched.push({ file: upload.file, type: target.kind, code: target.item.code, slug: target.item.slug });
      const publicId = imageMatching.publicIdFromName(upload.file);
      if (!publicId || !isValidCloudinaryUrl(upload.url, target.kind, publicId, cloudName)) {
        failed.push({
          file: upload.file,
          type: target.kind,
          code: target.item.code,
          error: "Cloudinary returned an image URL that does not match the signed upload.",
        });
        continue;
      }
      successfulUploads += 1;

      const key = `${target.kind}:${target.item._id}`;
      if (!grouped.has(key)) grouped.set(key, { target, images: [] });
      grouped.get(key).images.push({
        url: upload.url,
        parsed: imageMatching.parseName(upload.file),
      });
    }

    for (const uploadFailure of body.failed) {
      if (!uploadFailure || typeof uploadFailure.file !== "string") {
        return NextResponse.json({ error: "Each failed upload must include its filename." }, { status: 400 });
      }
      const target = imageMatching.resolveImageTarget(uploadFailure.file, products, combos);
      if (!target) {
        if (!unmatched.includes(uploadFailure.file)) unmatched.push(uploadFailure.file);
        continue;
      }

      matched.push({ file: uploadFailure.file, type: target.kind, code: target.item.code, slug: target.item.slug });
      failed.push({
        file: uploadFailure.file,
        type: target.kind,
        code: target.item.code,
        error: typeof uploadFailure.error === "string" ? uploadFailure.error : "Cloudinary upload failed.",
      });
    }

    const attached = [];
    let databaseFailures = 0;
    for (const group of grouped.values()) {
      const model = group.target.kind === "product" ? Product : Combo;
      const priorImages = group.target.item.images || [];
      const newImages = imageMatching.sortImagesByOrder(group.images).map((image) => image.url);
      const itemHasUploadFailure = failed.some((item) =>
        item.type === group.target.kind && item.code === group.target.item.code,
      );
      const useAppend = body.append === true || itemHasUploadFailure;
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

    return NextResponse.json({
      matched,
      unmatched,
      failed,
      uploaded: successfulUploads - databaseFailures,
      attached,
    }, { status: failed.length ? 207 : 200 });
  } catch (error) {
    console.error("Admin bulk image attachment failed:", error);
    return NextResponse.json({ error: "Could not attach the uploaded images." }, { status: 500 });
  }
}
