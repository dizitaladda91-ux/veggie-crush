import { NextResponse } from "next/server";
import { connectCatalog, formatProduct, Product } from "@/lib/catalog";
import { createProductCode, isValidProductCode } from "@/lib/product-code";

export const dynamic = "force-dynamic";

function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function GET(request) {
  try {
    await connectCatalog();
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number.parseInt(searchParams.get("page") || "1", 10) || 1);
    const limit = Math.max(1, Math.min(50, Number.parseInt(searchParams.get("limit") || "12", 10) || 12));
    const search = searchParams.get("search")?.trim();
    const filter = { isActive: true };

    if (search) {
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const searchRegex = new RegExp(escapedSearch, "i");
      filter.$or = [
        { name: searchRegex },
        { shortName: searchRegex },
        { description: searchRegex },
        { slug: searchRegex },
      ];
    }

    const sortBy = searchParams.get("sort");
    const sort = sortBy === "price_asc"
      ? { price: 1 }
      : sortBy === "price_desc"
        ? { price: -1 }
        : sortBy === "popular"
          ? { bestseller: -1, createdAt: -1 }
          : { createdAt: -1 };
    const [total, products] = await Promise.all([
      Product.countDocuments(filter),
      Product.find(filter)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
    ]);

    return NextResponse.json({
      products: products.map(formatProduct),
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Error fetching catalog products:", error);
    return NextResponse.json({ error: "Unable to load products" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectCatalog();
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const description = typeof body.description === "string" ? body.description.trim() : "";
    const price = Number(body.price);
    const mrp = body.mrp === undefined || body.mrp === "" ? price : Number(body.mrp);

    if (!name || !description || !Number.isFinite(price) || !Number.isFinite(mrp) || price < 0 || mrp < price) {
      return NextResponse.json(
        { error: "Product name, description, a valid price, and an MRP at least equal to the price are required." },
        { status: 400 },
      );
    }

    const slug = typeof body.slug === "string" && body.slug.trim()
      ? slugify(body.slug)
      : slugify(name);
    const requestedCode = typeof body.code === "string" ? body.code.trim().toUpperCase() : "";
    if (requestedCode && !isValidProductCode(requestedCode)) {
      return NextResponse.json(
        { error: "Product code must use up to 64 letters, numbers, hyphens, or underscores." },
        { status: 400 },
      );
    }
    const code = requestedCode || createProductCode(slug, new Set(await Product.distinct("code")));

    const product = new Product({
      code,
      name,
      shortName: typeof body.shortName === "string" && body.shortName.trim()
        ? body.shortName.trim()
        : name,
      slug,
      description,
      keyBenefits: Array.isArray(body.keyBenefits) ? body.keyBenefits : [],
      price,
      mrp,
      size: typeof body.size === "string" && body.size.trim()
        ? body.size.trim()
        : typeof body.unit === "string" && body.unit.trim()
          ? body.unit.trim()
          : "Standard",
      rating: Number.isFinite(Number(body.rating)) ? Number(body.rating) : 0,
      reviewsCount: Number.isFinite(Number(body.reviewsCount)) ? Number(body.reviewsCount) : 0,
      bestseller: Boolean(body.bestseller ?? body.isBestSeller),
      images: Array.isArray(body.images) ? body.images : [],
      isActive: body.isActive !== false,
    });
    await product.save();

    return NextResponse.json({ success: true, product: formatProduct(product) }, { status: 201 });
  } catch (error) {
    console.error("Error creating catalog product:", error);
    if (error.code === 11000) {
      return NextResponse.json({ error: "Product code or slug is already in use." }, { status: 409 });
    }
    if (error.name === "ValidationError") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create product." }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectCatalog();
    const id = new URL(request.url).searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    const product = await Product.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Product deactivated" });
  } catch (error) {
    console.error("Product deactivation failed:", error);
    return NextResponse.json({ error: "Unable to deactivate product" }, { status: 500 });
  }
}
