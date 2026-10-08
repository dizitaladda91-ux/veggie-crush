const assert = require("node:assert/strict");
const test = require("node:test");
const products = require("../seed/productData");
const { generateCombos } = require("../seed/combo-utils");

test("generates all 50 unique product combos with expected order and totals", () => {
  const combos = generateCombos(products);

  assert.equal(combos.length, 50);
  assert.deepEqual(
    combos.reduce((counts, combo) => {
      counts[combo.packSize] += 1;
      return counts;
    }, { 2: 0, 3: 0, 4: 0 }),
    { 2: 15, 3: 20, 4: 15 },
  );
  assert.equal(combos[0].code, "AB");
  assert.equal(combos[0].products.reduce((total, product) => total + product.price, 0), 648);
  assert.equal(combos.at(-1).code, "CDEF");
  assert.equal(combos.at(-1).products.reduce((total, product) => total + product.price, 0), 1716);
  assert.equal(new Set(combos.map((combo) => combo.slug)).size, 50);
});

test("uses unambiguous combo codes for products with multi-character SKUs", () => {
  const skuProducts = [
    { code: "A", shortName: "Alpha", price: 10, mrp: 12 },
    { code: "SKU-001", shortName: "Beta", price: 20, mrp: 24 },
    { code: "SKU-002", shortName: "Gamma", price: 30, mrp: 36 },
    { code: "SKU-003", shortName: "Delta", price: 40, mrp: 48 },
  ];
  const combos = generateCombos(skuProducts);

  assert.equal(combos.length, 11);
  assert.equal(new Set(combos.map((combo) => combo.code)).size, 11);
  assert.equal(combos[0].code, "A~SKU-001");
});
