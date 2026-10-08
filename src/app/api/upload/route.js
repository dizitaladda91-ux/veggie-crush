import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import cloudinaryConfig from "../../../../config/cloudinary.js";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const PRODUCT_IMAGE_FOLDER = "veggiecrush/products";

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Only admins can upload product images." }, { status: user ? 403 : 401 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid upload signature request." }, { status: 400 });
    }

    if (body?.folder !== PRODUCT_IMAGE_FOLDER) {
      return NextResponse.json({ error: "Invalid product image folder." }, { status: 400 });
    }

    const client = cloudinaryConfig.configureCloudinary();
    const config = client.config();
    const timestamp = Math.floor(Date.now() / 1000);
    const params = {
      folder: PRODUCT_IMAGE_FOLDER,
      overwrite: true,
      public_id: randomUUID(),
      timestamp,
      unique_filename: false,
    };
    const signature = client.utils.api_sign_request(params, config.api_secret);

    return NextResponse.json({
      cloudName: config.cloud_name,
      apiKey: config.api_key,
      timestamp,
      signature,
      folder: params.folder,
      publicId: params.public_id,
    });
  } catch (error) {
    console.error("Product image upload signing failed:", error);
    return NextResponse.json({ error: "Could not authorize the product image upload." }, { status: 500 });
  }
}
