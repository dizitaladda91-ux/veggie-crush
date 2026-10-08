import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { getCurrentUser } from "@/lib/auth";
import { getAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const BUCKET_NAME = "product-images";
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const IMAGE_TYPES = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
  ["image/avif", "avif"],
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

    const extension = IMAGE_TYPES.get(file.type);
    if (!extension) {
      return NextResponse.json({ error: "Upload a JPEG, PNG, WebP, GIF, or AVIF image." }, { status: 400 });
    }
    if (!file.size || file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Image must be between 1 byte and 5 MB." }, { status: 400 });
    }

    const storage = getAdminClient()?.storage;
    if (!storage) {
      return NextResponse.json(
        { error: "Image storage is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." },
        { status: 503 },
      );
    }

    const { data: bucket, error: bucketError } = await storage.getBucket(BUCKET_NAME);
    if (bucketError && String(bucketError.statusCode) !== "404") {
      throw bucketError;
    }
    if (!bucket) {
      const { error: createBucketError } = await storage.createBucket(BUCKET_NAME, {
        public: true,
        fileSizeLimit: MAX_FILE_SIZE,
        allowedMimeTypes: [...IMAGE_TYPES.keys()],
      });
      if (createBucketError && !/already exists|duplicate/i.test(createBucketError.message)) {
        throw createBucketError;
      }
    }

    const filePath = `products/${randomUUID()}.${extension}`;
    const { error: uploadError } = await storage.from(BUCKET_NAME).upload(
      filePath,
      Buffer.from(await file.arrayBuffer()),
      { contentType: file.type, upsert: false },
    );
    if (uploadError) {
      throw uploadError;
    }

    const { data } = storage.from(BUCKET_NAME).getPublicUrl(filePath);
    return NextResponse.json({ success: true, url: data.publicUrl });
  } catch (error) {
    console.error("Product image upload failed:", error);
    return NextResponse.json(
      { error: error.message || "Could not upload product image." },
      { status: 500 },
    );
  }
}
