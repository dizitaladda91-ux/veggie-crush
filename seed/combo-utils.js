const COMBO_DISCOUNTS = { 2: 15, 3: 20, 4: 15 };

const COMBO_DESCRIPTORS = {
  A: "Beetroot powder (nitrates, antioxidants)",
  B: "Amla powder (natural Vitamin C)",
  C: "Moringa powder (plant protein, essential minerals)",
  D: "Everfit capsules (daily vitality)",
  E: "Giloy extract powder (immune support)",
  F: "Neem powder (traditional cleansing)",
};

function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function combinations(products, size, start = 0, selected = [], result = []) {
  if (selected.length === size) {
    result.push([...selected]);
    return result;
  }

  for (let index = start; index <= products.length - (size - selected.length); index += 1) {
    selected.push(products[index]);
    combinations(products, size, index + 1, selected, result);
    selected.pop();
  }

  return result;
}

function generateCombos(products) {
  const sortedProducts = [...products].sort((left, right) => left.code.localeCompare(right.code));
  const combos = [];

  for (const packSize of [2, 3, 4]) {
    for (const comboProducts of combinations(sortedProducts, packSize)) {
      const orderedProducts = [...comboProducts].sort((left, right) =>
        left.code.localeCompare(right.code),
      );
      const code = orderedProducts.map((product) => product.code).join("");
      const shortNames = orderedProducts.map((product) => product.shortName);
      const descriptors = orderedProducts.map((product) =>
        product.comboDescriptor || COMBO_DESCRIPTORS[product.code] || product.description,
      );
      const keyBenefits = [...new Set(orderedProducts.flatMap((product) => product.keyBenefits || []))];

      combos.push({
        code,
        name: shortNames.join(" + "),
        slug: slugify(shortNames.join("-")),
        packSize,
        products: orderedProducts,
        description: descriptors.join(" + "),
        keyBenefits,
        bundleDiscountPercent: COMBO_DISCOUNTS[packSize],
      });
    }
  }

  return combos;
}

module.exports = { COMBO_DISCOUNTS, generateCombos };
