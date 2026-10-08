import { NextResponse } from "next/server";
import path from "node:path";
import { getCurrentUser } from "@/lib/auth";
import { connectCatalog, Combo, Product } from "@/lib/catalog";
import { MAX_IMAGE_UPLOAD_BYTES } from "@/lib/read-api-json";
import cloudinaryConfig from "../../../../../../../config/cloudinary.js";
import imageMatching from "../../../../../../../lib/image-matching.js";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_FILES = 20;
const MIME_TYPES = new Map([
  ["image/webp", ".webp"],
  ["image/png", ".png"],
  ["image/jpeg", ".jpg"],
]);
const FOLDERS = { product: "veggiecrush/products", combo: "veggiecrush/combos" };

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Admin login required." }, { status: 401 });
    if (user.role !== "ADMIN") return NextResponse.json({ error: "Only admins can upload images." }, { status: 403 });

    const body = await request.json();
    if (!Array.isArray(body.files) || body.files.length < 1 || body.files.length > MAX_FILES) {
      return NextResponse.json({ error: `Choose between 1 and ${MAX_FILES} images.` }, { status: 400 });
    }

    const seenNames = new Set();
    let totalBytes = 0;
    for (const file of body.files) {
      if (!file || typeof file.name !== "string" || typeof file.type !== "string"
        || !Number.isSafeInteger(file.size) || file.size < 1) {
        return NextResponse.json({ error: "Each upload must include a valid image name, type, and size." }, { status: 400 });
      }
      if (path.basename(file.name.replace(/\\/g, "/")) !== file.name) {
        return NextResponse.json({ error: "Image filenames must not contain directory paths." }, { status: 400 });
      }
      const expectedExtension = MIME_TYPES.get(file.type);
      if (!expectedExtension
        || (!file.name.toLowerCase().endsWith(expectedExtension)
          && !(file.type === "image/jpeg" && file.name.toLowerCase().endsWith(".jpeg")))) {
        return NextResponse.json({ error: `${file.name} must be a WebP, PNG, or JPEG image with a matching extension.` }, { status: 400 });
      }
      if (!imageMatching.publicIdFromName(file.name)) {
        return NextResponse.json({ error: `${file.name} does not contain a valid image name.` }, { status: 400 });
      }
      const normalizedName = file.name.toLowerCase();
      if (seenNames.has(normalizedName)) {
        return NextResponse.json({ error: "Choose files with unique names so each image can be matched correctly." }, { status: 400 });
      }
      seenNames.add(normalizedName);
      totalBytes += file.size;
      if (file.size > MAX_IMAGE_UPLOAD_BYTES || totalBytes > MAX_IMAGE_UPLOAD_BYTES) {
        return NextResponse.json({ error: "The combined image upload must be 50 MB or smaller." }, { status: 413 });
      }
    }

    await connectCatalog();
    const [products, combos] = await Promise.all([
      Product.find({}).select("_id code slug images").lean(),
      Combo.find({}).select("_id code slug images").lean(),
    ]);
    const client = cloudinaryConfig.configureCloudinary();
    const config = client.config();
    const timestamp = Math.floor(Date.now() / 1000);
    const signatures = [];
    const unmatched = [];

    body.files.forEach((file, index) => {
      const target = imageMatching.resolveImageTarget(file.name, products, combos);
      if (!target) {
        unmatched.push(file.name);
        return;
      }

      const folder = FOLDERS[target.kind];
      const publicId = imageMatching.publicIdFromName(file.name);
      const params = {
        folder,
        overwrite: true,
        public_id: publicId,
        timestamp,
        unique_filename: false,
      };
      signatures.push({
        index,
        file: file.name,
        type: target.kind,
        code: target.item.code,
        slug: target.item.slug,
        cloudName: config.cloud_name,
        apiKey: config.api_key,
        timestamp,
        signature: client.utils.api_sign_request(params, config.api_secret),
        folder,
        publicId,
      });
    });

    return NextResponse.json({ signatures, unmatched });
  } catch (error) {
    console.error("Bulk image upload signing failed:", error);
    return NextResponse.json({ error: "Could not authorize the image uploads." }, { status: 500 });
  }
}
