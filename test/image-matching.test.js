const test = require("node:test");
const assert = require("node:assert/strict");
const {
  parseName,
  publicIdFromName,
  resolveImageTarget,
  sortImagesByOrder,
} = require("../lib/image-matching");

test("parses supported product and combo image names", () => {
  assert.equal(parseName("beetroot.webp").productSlug, "beetroot");
  assert.equal(parseName("gooseberry_2.webp").order, 2);
  assert.equal(parseName("giloy-powder.png").productSlug, "giloy-powder");
  assert.equal(
    parseName("ABCD_beetroot-amla-moringa-everfit.webp").comboSlug,
    "beetroot-amla-moringa-everfit",
  );
  assert.equal(parseName("AB.webp").comboCode, "AB");
  assert.equal(parseName("CDEF_1.jpg").order, 1);
  assert.equal(parseName("unknown.gif"), null);
});

test("sorts numbered images numerically after the unnumbered image", () => {
  const names = ["beetroot_10.webp", "beetroot_2.webp", "beetroot.webp"];
  const sorted = sortImagesByOrder(names.map((basename) => ({
    basename,
    parsed: parseName(basename),
  })));
  assert.deepEqual(sorted.map((image) => image.parsed.order), [0, 2, 10]);
});

test("creates safe Cloudinary public IDs from image filenames", () => {
  assert.equal(publicIdFromName("AB_beetroot-amla_2.webp"), "ab_beetroot-amla_2");
  assert.equal(publicIdFromName("fresh leaves!.jpg"), "fresh-leaves");
  assert.equal(publicIdFromName("../!!!.webp"), null);
});

test("resolves code before product slug before combo slug", () => {
  const product = { slug: "beetroot", code: "A" };
  const comboByCode = { code: "ABCD", slug: "other-combo" };
  const comboBySlug = { code: "EFGH", slug: "beetroot-amla" };

  assert.equal(
    resolveImageTarget("ABCD_beetroot-amla.webp", [product], [comboByCode, comboBySlug]).item,
    comboByCode,
  );
  assert.equal(
    resolveImageTarget("beetroot.webp", [product], [comboBySlug]).item,
    product,
  );
  assert.equal(
    resolveImageTarget("beetroot-amla.webp", [], [comboBySlug]).item,
    comboBySlug,
  );
});

test("adds Cloudinary automatic format, quality, and width transformations", async () => {
  const { getCloudinaryImageUrl } = await import("../src/lib/cloudinary-url.js");
  assert.equal(
    getCloudinaryImageUrl("https://res.cloudinary.com/demo/image/upload/v123/veggiecrush/products/beetroot.webp", 600),
    "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_600/v123/veggiecrush/products/beetroot.webp",
  );
  assert.equal(getCloudinaryImageUrl("/products/beetroot.webp", 600), "/products/beetroot.webp");
});
