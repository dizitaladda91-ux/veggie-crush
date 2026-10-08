const path = require("node:path");

const IMAGE_EXTENSION = /\.(webp|png|jpe?g)$/i;

function parseName(fileName) {
  const basename = path.basename(fileName);
  const extensionMatch = basename.match(IMAGE_EXTENSION);
  if (!extensionMatch) return null;

  const stem = basename.slice(0, -extensionMatch[0].length);
  const codeOnlyMatch = stem.match(/^([A-Z]{2,4})(?:_(\d+))?$/);
  if (codeOnlyMatch) {
    return {
      basename,
      comboCode: codeOnlyMatch[1],
      comboSlug: null,
      productSlug: null,
      order: Number(codeOnlyMatch[2] || 0),
    };
  }

  const codeAndSlugMatch = stem.match(/^([A-Z]{2,4})_(.+)$/);
  if (codeAndSlugMatch) {
    const comboSlugMatch = codeAndSlugMatch[2].match(/^(.*?)(?:_(\d+))?$/);
    return {
      basename,
      comboCode: codeAndSlugMatch[1],
      comboSlug: comboSlugMatch[1].toLowerCase() || null,
      productSlug: null,
      order: Number(comboSlugMatch[2] || 0),
    };
  }

  const slugMatch = stem.match(/^(.*?)(?:_(\d+))?$/);
  if (!slugMatch || !slugMatch[1]) return null;

  const slug = slugMatch[1].toLowerCase();
  return {
    basename,
    comboCode: null,
    comboSlug: slug,
    productSlug: slug,
    order: Number(slugMatch[2] || 0),
  };
}

function publicIdFromName(fileName) {
  const stem = path.parse(path.basename(fileName)).name;
  const publicId = stem
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return publicId || null;
}

function resolveImageTarget(fileName, products, combos) {
  const parsed = parseName(fileName);
  if (!parsed) return null;

  if (parsed.comboCode) {
    const comboByCode = combos.find(
      (combo) => combo.code.toUpperCase() === parsed.comboCode,
    );
    if (comboByCode) return { kind: "combo", item: comboByCode, parsed };
  }

  if (parsed.productSlug) {
    const product = products.find(
      (entry) => entry.slug.toLowerCase() === parsed.productSlug,
    );
    if (product) return { kind: "product", item: product, parsed };
  }

  if (parsed.comboSlug) {
    const combo = combos.find(
      (entry) => entry.slug.toLowerCase() === parsed.comboSlug,
    );
    if (combo) return { kind: "combo", item: combo, parsed };
  }

  return null;
}

function sortImagesByOrder(images) {
  return [...images].sort((left, right) =>
    left.parsed.order - right.parsed.order
    || left.parsed.basename.localeCompare(right.parsed.basename, undefined, { numeric: true }),
  );
}

async function mapWithConcurrency(items, limit, callback) {
  const results = new Array(items.length);
  let nextIndex = 0;
  const workerCount = Math.min(Math.max(1, limit), items.length);

  await Promise.all(Array.from({ length: workerCount }, async () => {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await callback(items[index], index);
    }
  }));

  return results;
}

module.exports = {
  mapWithConcurrency,
  parseName,
  publicIdFromName,
  resolveImageTarget,
  sortImagesByOrder,
};
