export const PRODUCT_CODE_PATTERN = /^[A-Z0-9]+(?:[-_][A-Z0-9]+)*$/;

export function isValidProductCode(code) {
  return typeof code === "string" && code.length <= 64 && PRODUCT_CODE_PATTERN.test(code);
}

export function createProductCode(slug, usedCodes) {
  const base = slug.toUpperCase().replace(/[^A-Z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 48);
  const normalizedBase = base.replace(/-+$/g, "") || "PRODUCT";
  let code = normalizedBase;
  let suffix = 2;

  while (usedCodes.has(code)) {
    code = `${normalizedBase}-${suffix}`;
    suffix += 1;
  }

  return code;
}
