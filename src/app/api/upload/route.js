import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { MAX_IMAGE_REQUEST_BYTES, MAX_IMAGE_UPLOAD_BYTES } from "@/lib/read-api-json";
import cloudinaryConfig from "../../../../config/cloudinary.js";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

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

    const contentLength = Number(request.headers.get("content-length"));
    if (contentLength > MAX_IMAGE_REQUEST_BYTES) {
      return NextResponse.json({ error: "The image upload request must be under 51 MB." }, { status: 413 });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
    }
    if (!IMAGE_TYPES.has(file.type)) {
      return NextResponse.json({ error: "Upload a JPEG, PNG, WebP, GIF, or AVIF image." }, { status: 400 });
    }
    if (!file.size || file.size > MAX_IMAGE_UPLOAD_BYTES) {
      return NextResponse.json({ error: "Image must be 50 MB or smaller." }, { status: 400 });
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
