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
