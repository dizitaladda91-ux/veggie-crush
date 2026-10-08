import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { connectCatalog, Product } from "@/lib/catalog";
import {
  parseProductDocument,
  slugifyProductName,
  validateImportedProducts,
} from "@/lib/product-document";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Admin login required." }, { status: 401 });
  }
  if (user.role !== "ADMIN") {
    return NextResponse.json({ error: "Only admins can import products." }, { status: 403 });
  }
  return null;
}

function normalizeReviewedProduct(product, index) {
  const name = typeof product.name === "string" ? product.name.trim() : "";
  const price = Number(product.price);
  const mrp = Number(product.mrp);
  const keyBenefits = Array.isArray(product.keyBenefits)
    ? product.keyBenefits.map((benefit) => String(benefit).trim()).filter(Boolean)
    : typeof product.keyBenefits === "string"
      ? product.keyBenefits.split(/[|;,\n]/).map((benefit) => benefit.trim()).filter(Boolean)
      : [];

  return {
    rowNumber: Number.isInteger(product.rowNumber) ? product.rowNumber : index + 2,
    errors: [],
    product: {
      code: typeof product.code === "string" ? product.code.trim().toUpperCase() : "",
      name,
      shortName: typeof product.shortName === "string" && product.shortName.trim()
        ? product.shortName.trim()
        : name,
      slug: slugifyProductName(typeof product.slug === "string" && product.slug.trim() ? product.slug : name),
      description: typeof product.description === "string" ? product.description.trim() : "",
      keyBenefits,
      price,
      mrp,
      size: typeof product.size === "string" ? product.size.trim() : "",
      rating: product.rating === "" || product.rating === undefined ? 0 : Number(product.rating),
      reviewsCount: product.reviewsCount === "" || product.reviewsCount === undefined
        ? 0
        : Number(product.reviewsCount),
      bestseller: product.bestseller === true || product.bestseller === "true",
      images: [],
      isActive: true,
    },
  };
}

function validateRows(rows) {
  for (const { product, errors } of rows) {
    if (!product.name) errors.push("Product name is required.");
    if (!Number.isFinite(product.price) || product.price < 0) errors.push("Price must be a valid non-negative number.");
    if (!Number.isFinite(product.mrp) || product.mrp < product.price) errors.push("MRP must be at least the price.");
    if (!product.size) errors.push("Size is required.");
    if (!product.description) errors.push("Description is required.");
    if (!Number.isFinite(product.rating) || product.rating < 0 || product.rating > 5) {
      errors.push("Rating must be between 0 and 5.");
    }
    if (!Number.isInteger(product.reviewsCount) || product.reviewsCount < 0) {
      errors.push("Reviews count must be a non-negative whole number.");
    }
    if (!product.slug) errors.push("A valid slug could not be generated.");
  }
  return validateImportedProducts(rows);
}

async function assignProductCodes(rows) {
  const existingProducts = await Product.find({})
    .select("code slug images")
    .lean();
  const productsBySlug = new Map(existingProducts.map((product) => [product.slug, product]));
  const rowsBeingUpdated = new Set(rows.map(({ product }) => product.slug));
  const codesInUse = new Set(
    existingProducts
      .filter((product) => !rowsBeingUpdated.has(product.slug))
      .map((product) => product.code),
  );
  const allCodes = new Set(existingProducts.map((product) => product.code));

  for (const { product, errors, rowNumber } of rows) {
    const existing = productsBySlug.get(product.slug);
    product.images = existing?.images || [];

    if (!product.code && existing?.code) {
      product.code = existing.code;
    }

    if (product.code && allCodes.has(product.code) && productsBySlug.get(product.slug)?.code !== product.code) {
      errors.push(`Code ${product.code} already belongs to another product.`);
      continue;
    }

    if (!product.code) {
      const availableCode = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].find((code) => !codesInUse.has(code));
      if (!availableCode) {
        errors.push("No unused product code remains. Include a valid existing code or free an A-Z code.");
        continue;
      }
      product.code = availableCode;
    }

    if (codesInUse.has(product.code) && existing?.code !== product.code) {
      errors.push(`Code ${product.code} is assigned more than once.`);
    }
    codesInUse.add(product.code);
  }

  return rows.flatMap(({ product, errors, rowNumber }) =>
    errors.map((error) => `Row ${rowNumber}: ${error}`),
  );
}

export async function POST(request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    await connectCatalog();

    if (request.headers.get("content-type")?.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file");

      if (!file || typeof file === "string") {
        return NextResponse.json({ error: "Choose a Word .docx document." }, { status: 400 });
      }
      if (!file.name.toLowerCase().endsWith(".docx")) {
        return NextResponse.json({ error: "Only Word .docx documents are supported." }, { status: 400 });
      }
      if (file.size === 0 || file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: "The .docx file must be between 1 byte and 5 MB." }, { status: 400 });
      }

      const rows = await parseProductDocument(Buffer.from(await file.arrayBuffer()));
      const errors = validateRows(rows);
      errors.push(...await assignProductCodes(rows));
      return NextResponse.json({ products: rows, errors });
    }

    const body = await request.json();
    if (!Array.isArray(body.products) || body.products.length === 0 || body.products.length > 100) {
      return NextResponse.json({ error: "Provide between 1 and 100 reviewed products." }, { status: 400 });
    }
    if (body.products.some((product) => !product || typeof product !== "object" || Array.isArray(product))) {
      return NextResponse.json({ error: "Each reviewed product must be an object." }, { status: 400 });
    }

    const rows = body.products.map(normalizeReviewedProduct);
    const errors = validateRows(rows);
    errors.push(...await assignProductCodes(rows));
    if (errors.length) {
      return NextResponse.json({ error: "Fix the product errors before importing.", details: errors }, { status: 400 });
    }

    const documents = await Promise.all(rows.map(async ({ product }) => {
      const document = await Product.findOne({ slug: product.slug }) || new Product();
      document.set({
        ...product,
        images: document.images || [],
        isActive: true,
      });
      await document.validate();
      return document;
    }));

    const savedProducts = [];
    for (const document of documents) {
      await document.save();
      savedProducts.push({
        id: String(document._id),
        code: document.code,
        name: document.name,
        slug: document.slug,
      });
    }

    return NextResponse.json({ success: true, count: savedProducts.length, products: savedProducts });
  } catch (error) {
    console.error("Product document import failed:", error);
    if (error.name === "ValidationError") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    if (error.code === 11000) {
      return NextResponse.json({ error: "A product code or slug already exists. Refresh and review the document again." }, { status: 409 });
    }
    return NextResponse.json({ error: error.message || "Could not read or import the product document." }, { status: 500 });
  }
}
