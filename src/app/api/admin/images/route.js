import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getCurrentUser } from "@/lib/auth";
import { connectCatalog, Combo, Product } from "@/lib/catalog";
import cloudinaryConfig from "../../../../../config/cloudinary.js";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function getPublicId(imageUrl, itemType) {
  const cloudName = cloudinaryConfig.configureCloudinary().config().cloud_name;
  let parsedUrl;
  try {
    parsedUrl = new URL(imageUrl);
  } catch {
    return null;
  }
  if (parsedUrl.hostname !== "res.cloudinary.com"
    && parsedUrl.hostname !== `${cloudName}-res.cloudinary.com`) {
    return null;
  }

  const pathAfterUpload = parsedUrl.pathname.split("/image/upload/")[1];
  if (!pathAfterUpload) return null;
  if (parsedUrl.hostname === "res.cloudinary.com"
    && !parsedUrl.pathname.startsWith(`/${cloudName}/image/upload/`)) return null;
  const segments = pathAfterUpload.split("/");
  const assetStart = segments.findIndex((segment) => segment === "veggiecrush");
  if (assetStart < 0) return null;

  const publicIdSegments = segments.slice(assetStart);
  const expectedFolder = itemType === "product" ? "products" : "combos";
  if (publicIdSegments[1] !== expectedFolder || publicIdSegments.length < 3) return null;
  const lastSegment = publicIdSegments.at(-1);
  if (!/\.(webp|png|jpe?g)$/i.test(lastSegment)) return null;
  publicIdSegments[publicIdSegments.length - 1] = lastSegment.replace(/\.(webp|png|jpe?g)$/i, "");
  return publicIdSegments.join("/");
}

export async function DELETE(request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Admin login required." }, { status: 401 });
    if (user.role !== "ADMIN") return NextResponse.json({ error: "Only admins can delete images." }, { status: 403 });

    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Provide image deletion details." }, { status: 400 });
    }
    const { itemType, itemId, imageIndex } = body;
    if (!["product", "combo"].includes(itemType)
      || typeof itemId !== "string"
      || !mongoose.isValidObjectId(itemId)
      || !Number.isInteger(imageIndex)
      || imageIndex < 0) {
      return NextResponse.json({ error: "Provide a valid item type, item ID, and image index." }, { status: 400 });
    }

    await connectCatalog();
    const Model = itemType === "product" ? Product : Combo;
    const item = await Model.findById(itemId);
    if (!item) return NextResponse.json({ error: `${itemType} was not found.` }, { status: 404 });
    const imageUrl = item.images[imageIndex];
    if (!imageUrl) return NextResponse.json({ error: "Image was not found on this item." }, { status: 404 });

    const publicId = getPublicId(imageUrl, itemType);
    if (!publicId) {
      return NextResponse.json({ error: "This image URL is not a managed VeggieCrush Cloudinary image." }, { status: 400 });
    }

    const deleteResult = await cloudinaryConfig.deleteImage(publicId);
    if (!["ok", "not found"].includes(deleteResult.result)) {
      return NextResponse.json({ error: "Cloudinary did not confirm image deletion." }, { status: 502 });
    }

    item.images.splice(imageIndex, 1);
    await item.save();
    return NextResponse.json({ success: true, removed: imageUrl, images: item.images });
  } catch (error) {
    console.error("Admin image deletion failed:", error);
    return NextResponse.json({ error: "Could not delete the product image." }, { status: 500 });
  }
}
