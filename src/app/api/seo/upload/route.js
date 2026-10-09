import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import cloudinaryConfig from "../../../../../config/cloudinary.js";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const BLOG_IMAGE_FOLDER = "veggiecrush/blog";
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_IMAGE_SIZE = 50 * 1024 * 1024;

export async function POST(request) {
  const cookieStore = await cookies();
  if (cookieStore.get("seo_portal_auth")?.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid image upload request." }, { status: 400 });
  }

  if (!ALLOWED_IMAGE_TYPES.has(body?.type) || !Number.isSafeInteger(body?.size) || body.size < 1 || body.size > MAX_IMAGE_SIZE) {
    return NextResponse.json({ error: "Choose a JPEG, PNG, or WebP image up to 50 MB." }, { status: 400 });
  }

  try {
    const client = cloudinaryConfig.configureCloudinary();
    const config = client.config();
    const timestamp = Math.floor(Date.now() / 1000);
    const params = {
      folder: BLOG_IMAGE_FOLDER,
      overwrite: true,
      public_id: randomUUID(),
      timestamp,
      unique_filename: false,
    };

    return NextResponse.json({
      cloudName: config.cloud_name,
      apiKey: config.api_key,
      timestamp,
      signature: client.utils.api_sign_request(params, config.api_secret),
      folder: params.folder,
      publicId: params.public_id,
    });
  } catch (error) {
    console.error("SEO blog image upload signing failed:", error);
    return NextResponse.json({ error: "Could not authorize the image upload." }, { status: 500 });
  }
}
