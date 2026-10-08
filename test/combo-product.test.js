import assert from "node:assert/strict";
import test from "node:test";
import { getProductComboPackSize, getProductComboParts } from "../src/lib/combo-product.js";

test("keeps base product records out of inferred combos", () => {
  assert.equal(getProductComboPackSize({ name: "Moringa", slug: "moringa" }), 0);
  assert.equal(getProductComboPackSize({ name: "Giloy Powder", slug: "giloy-powder" }), 0);
});

test("infers bundle size from generated combo names and slugs", () => {
  assert.equal(getProductComboPackSize({ name: "Beetroot + Amla", slug: "beetroot-amla" }), 2);
  assert.equal(getProductComboPackSize({ name: "Moringa + Everfit + Giloy", slug: "moringa-everfit-giloy" }), 3);
  assert.equal(getProductComboPackSize({ name: "Beetroot + Amla + Neem + Everfit", slug: "beetroot-amla-neem-everfit" }), 4);
});

test("classifies every generated base-product bundle by its correct size", () => {
  const names = ["Beetroot", "Amla", "Moringa", "Everfit", "Giloy", "Neem"];
  const counts = new Map([[2, 0], [3, 0], [4, 0]]);

  for (const packSize of counts.keys()) {
    const visit = (start, selected) => {
      if (selected.length === packSize) {
        const name = selected.join(" + ");
        const slug = name.toLowerCase().replace(/\s*\+\s*/g, "-");
        const inferredPackSize = getProductComboPackSize({ name, slug });
        assert.equal(inferredPackSize, packSize);
        counts.set(packSize, counts.get(packSize) + 1);
        return;
      }

      for (let index = start; index <= names.length - (packSize - selected.length); index += 1) {
        visit(index + 1, [...selected, names[index]]);
      }
    };

    visit(0, []);
  }

  assert.deepEqual([...counts.values()], [15, 20, 15]);
});

test("rejects unknown labels and duplicate items as inferred combos", () => {
  assert.equal(getProductComboPackSize({ name: "Beetroot + Mystery", slug: "beetroot-mystery" }), 0);
  assert.equal(getProductComboPackSize({ name: "Moringa + Moringa", slug: "moringa-moringa" }), 0);
  assert.deepEqual(getProductComboParts({ name: "Beetroot + Amla", slug: "beetroot-amla" }), ["beetroot", "amla"]);
});
