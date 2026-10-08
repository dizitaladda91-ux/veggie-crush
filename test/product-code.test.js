const assert = require("node:assert/strict");
const test = require("node:test");

test("accepts product SKUs while preserving legacy single-letter codes", async () => {
  const { isValidProductCode } = await import("../src/lib/product-code.js");

  assert.equal(isValidProductCode("A"), true);
  assert.equal(isValidProductCode("SKU-001"), true);
  assert.equal(isValidProductCode("SKU_001"), true);
  assert.equal(isValidProductCode("SKU 001"), false);
  assert.equal(isValidProductCode("A".repeat(65)), false);
});

test("generates a unique SKU from the product slug", async () => {
  const { createProductCode } = await import("../src/lib/product-code.js");
  const usedCodes = new Set(["ORGANIC-SPINACH", "ORGANIC-SPINACH-2"]);

  assert.equal(createProductCode("organic-spinach", usedCodes), "ORGANIC-SPINACH-3");
  assert.equal(createProductCode("fresh kale", usedCodes), "FRESH-KALE");
});
