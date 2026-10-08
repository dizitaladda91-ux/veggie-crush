require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("../models/Product");
const { connectMongoose } = require("../lib/mongoose");
const products = require("./productData");

async function seedProducts() {
  await connectMongoose();

  for (const productData of products) {
    let product = await Product.findOne({ slug: productData.slug });
    const shouldStartWithoutImages = !product || !product.code;
    if (!product) product = new Product();

    product.set(productData);
    if (shouldStartWithoutImages) product.images = [];
    await product.save();
    console.log(`Seeded product ${product.code}: ${product.name}`);
  }
}

seedProducts()
  .catch(async (error) => {
    console.error("Product seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    try {
      await mongoose.disconnect();
    } catch (error) {
      console.error("Could not disconnect after product seed:", error);
      process.exitCode = 1;
    }
  });
