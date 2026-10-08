import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import cloudinaryConfig from "../../../../config/cloudinary.js";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Only admins can upload product images." }, { status: user ? 403 : 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
    }
    if (!IMAGE_TYPES.has(file.type)) {
      return NextResponse.json({ error: "Upload a JPEG, PNG, WebP, GIF, or AVIF image." }, { status: 400 });
    }
    if (!file.size || file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Image must be between 1 byte and 5 MB." }, { status: 400 });
    }

    const result = await cloudinaryConfig.uploadBuffer(
      Buffer.from(await file.arrayBuffer()),
      { folder: "veggiecrush/products" },
    );

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("Product image upload failed:", error);
    return NextResponse.json(
      { error: "Could not upload product image. Please try again." },
      { status: 500 },
    );
  }
}
