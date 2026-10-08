const BASE_PRODUCT_SLUGS = new Set([
  "beetroot",
  "gooseberry",
  "moringa",
  "neem",
  "everfit",
  "giloy-powder",
]);

const BASE_PRODUCT_LABELS = new Set([
  "beetroot",
  "gooseberry",
  "amla",
  "moringa",
  "neem",
  "everfit",
  "giloy",
]);

function normalizeLabel(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, " ").trim();
}

function isValidComboParts(parts) {
  return parts.length >= 2
    && parts.length <= 4
    && new Set(parts).size === parts.length
    && parts.every((part) => BASE_PRODUCT_LABELS.has(part));
}

export function getProductComboParts(product) {
  const slug = typeof product.slug === "string" ? product.slug.trim().toLowerCase() : "";
  if (BASE_PRODUCT_SLUGS.has(slug)) return null;

  const nameParts = typeof product.name === "string"
    ? product.name.split(/\s*\+\s*/).map(normalizeLabel)
    : [];
  if (isValidComboParts(nameParts)) return nameParts;

  const slugParts = slug.split("-").filter(Boolean);
  return isValidComboParts(slugParts) ? slugParts : null;
}

export function getProductComboPackSize(product) {
  return getProductComboParts(product)?.length || 0;
}
