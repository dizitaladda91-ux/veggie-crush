require("dotenv").config();

const mongoose = require("mongoose");
const Combo = require("../models/Combo");
const Product = require("../models/Product");
const { connectMongoose } = require("../lib/mongoose");
const { generateCombos } = require("./combo-utils");
const productData = require("./productData");

async function seedCombos() {
  await connectMongoose();

  const productCodes = productData.map((product) => product.code);
  const products = await Product.find({ code: { $in: productCodes }, isActive: true })
    .sort({ code: 1 });

  if (products.length < 6) {
    throw new Error(
      `Found ${products.length} seeded products; expected 6. Run "node seed/seedProducts.js" first.`,
    );
  }

  const combos = generateCombos(products);

  for (const comboData of combos) {
    let combo = await Combo.findOne({ code: comboData.code });
    if (!combo) {
      combo = new Combo({ bundleDiscountPercent: comboData.bundleDiscountPercent });
    }

    combo.set({
      code: comboData.code,
      name: comboData.name,
      slug: comboData.slug,
      packSize: comboData.packSize,
      products: comboData.products.map((product) => product._id),
      description: comboData.description,
      keyBenefits: comboData.keyBenefits,
      images: combo.images || [],
      isActive: true,
    });
    await combo.save();
  }

  for (const packSize of [2, 3, 4]) {
    const count = await Combo.countDocuments({ packSize });
    console.log(`${packSize} ka = ${count}`);
  }
}

seedCombos()
  .catch(async (error) => {
    console.error("Combo seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    try {
      await mongoose.disconnect();
    } catch (error) {
      console.error("Could not disconnect after combo seed:", error);
      process.exitCode = 1;
    }
  });
