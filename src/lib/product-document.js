import mammoth from "mammoth";
import { isValidProductCode } from "@/lib/product-code";

const HEADER_ALIASES = {
  code: ["code", "product code", "sku", "sku code"],
  name: ["name", "product", "product name"],
  shortName: ["short name", "shortname", "display name"],
  slug: ["slug", "url slug"],
  description: ["description", "product description"],
  keyBenefits: ["key benefits", "benefits", "highlights"],
  price: ["price", "selling price", "sale price"],
  mrp: ["mrp", "list price", "original price"],
  size: ["size", "unit", "quantity", "pack size"],
  rating: ["rating", "average rating"],
  reviewsCount: ["reviews", "review count", "reviews count"],
  bestseller: ["bestseller", "best seller", "featured"],
};

function decodeHtml(value) {
  return value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/(?:p|div|li)>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_match, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_match, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeHeader(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function parseTables(html) {
  return [...html.matchAll(/<table\b[^>]*>([\s\S]*?)<\/table>/gi)].map((tableMatch) => {
    const rows = [...tableMatch[1].matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)];
    return rows.map((rowMatch) =>
      [...rowMatch[1].matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)]
        .map((cellMatch) => decodeHtml(cellMatch[1])),
    );
  });
}

function parseBenefits(value) {
  return value.split(/[|;\n]/).flatMap((benefit) => benefit.split(/,(?![^()]*\))/))
    .map((benefit) => benefit.trim())
    .filter(Boolean);
}

function parseBoolean(value) {
  const normalized = value.trim().toLowerCase();
  if (["yes", "true", "1", "y"].includes(normalized)) return true;
  if (["no", "false", "0", "n"].includes(normalized)) return false;
  return null;
}

function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function parseProductRow(row, headerIndexes, rowNumber) {
  const valueFor = (field) => {
    const index = headerIndexes[field];
    return index === undefined ? "" : row[index] || "";
  };
  const name = valueFor("name");
  const priceText = valueFor("price").replace(/[₹,\s]/g, "");
  const mrpText = valueFor("mrp").replace(/[₹,\s]/g, "");
  const price = priceText ? Number(priceText) : Number.NaN;
  const mrp = mrpText ? Number(mrpText) : Number.NaN;
  const ratingText = valueFor("rating");
  const reviewsText = valueFor("reviewsCount");
  const bestsellerText = valueFor("bestseller");
  const product = {
    code: valueFor("code").toUpperCase(),
    name,
    shortName: valueFor("shortName") || name,
    slug: slugify(valueFor("slug") || name),
    description: valueFor("description"),
    keyBenefits: parseBenefits(valueFor("keyBenefits")),
    price,
    mrp,
    size: valueFor("size"),
    rating: ratingText ? Number(ratingText) : 0,
    reviewsCount: reviewsText ? Number(reviewsText) : 0,
    bestseller: bestsellerText ? parseBoolean(bestsellerText) : false,
    images: [],
    isActive: true,
  };
  const errors = [];

  if (!product.name) errors.push("Product name is required.");
  if (!Number.isFinite(product.price) || product.price < 0) errors.push("Price must be a valid non-negative number.");
  if (!Number.isFinite(product.mrp) || product.mrp < product.price) errors.push("MRP must be a valid number equal to or greater than price.");
  if (!product.size) errors.push("Size is required.");
  if (!product.description) errors.push("Description is required.");
  if (ratingText && (!Number.isFinite(product.rating) || product.rating < 0 || product.rating > 5)) {
    errors.push("Rating must be between 0 and 5.");
  }
  if (reviewsText && (!Number.isInteger(product.reviewsCount) || product.reviewsCount < 0)) {
    errors.push("Reviews count must be a non-negative whole number.");
  }
  if (bestsellerText && product.bestseller === null) errors.push("Bestseller must be Yes or No.");
  if (!product.slug) errors.push("A valid slug could not be generated.");

  return { rowNumber, product, errors };
}

export async function parseProductDocument(buffer) {
  const { value: html, messages } = await mammoth.convertToHtml({ buffer });
  const tables = parseTables(html);
  const products = [];

  for (const table of tables) {
    if (table.length < 2) continue;

    const headerMap = new Map(
      table[0].map((header, index) => [normalizeHeader(header), index]),
    );
    const headerIndexes = Object.fromEntries(
      Object.entries(HEADER_ALIASES).flatMap(([field, aliases]) => {
        const index = aliases.map(normalizeHeader).map((header) => headerMap.get(header))
          .find((candidate) => candidate !== undefined);
        return index === undefined ? [] : [[field, index]];
      }),
    );

    if (headerIndexes.name === undefined || headerIndexes.price === undefined) continue;

    table.slice(1).forEach((row, index) => {
      if (row.every((cell) => !cell.trim())) return;
      products.push(parseProductRow(row, headerIndexes, index + 2));
    });
  }

  if (messages.some((message) => message.type === "error")) {
    throw new Error("Word document could not be read. Please open it in Word and save it as .docx again.");
  }
  if (products.length === 0) {
    throw new Error(
      "No product table found. Add a Word table with columns: Name, Price, MRP, Size, Description; optional columns: Code, Short Name, Slug, Key Benefits, Rating, Reviews, Bestseller.",
    );
  }

  return products;
}

export function slugifyProductName(value) {
  return slugify(value);
}

export function validateImportedProducts(rows) {
  const errors = [];
  const seenSlugs = new Set();
  const seenCodes = new Set();

  rows.forEach(({ product, rowNumber, errors: rowErrors }) => {
    if (product.slug) {
      if (seenSlugs.has(product.slug)) rowErrors.push("Duplicate slug in this document.");
      seenSlugs.add(product.slug);
    }

    if (product.code) {
      if (!isValidProductCode(product.code)) {
        rowErrors.push("Code must use up to 64 uppercase letters, numbers, hyphens, or underscores.");
      }
      if (seenCodes.has(product.code)) rowErrors.push("Duplicate product code in this document.");
      seenCodes.add(product.code);
    }

    for (const message of rowErrors) {
      errors.push(`Row ${rowNumber}: ${message}`);
    }
  });

  return errors;
}
