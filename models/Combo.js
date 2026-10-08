const mongoose = require("mongoose");
const Product = require("./Product");

const comboSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    packSize: { type: Number, required: true, enum: [2, 3, 4] },
    products: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
      required: true,
      validate: {
        validator(products) {
          return products.length === this.packSize;
        },
        message: "Combo products length must match packSize.",
      },
    },
    description: { type: String, required: true, trim: true },
    keyBenefits: { type: [String], default: [] },
    totalPrice: { type: Number, required: true, min: 0 },
    totalMrp: { type: Number, required: true, min: 0 },
    bundleDiscountPercent: { type: Number, default: 0, min: 0, max: 100 },
    bundlePrice: { type: Number, required: true, min: 0 },
    images: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    collection: "Combo",
  },
);

comboSchema.pre("validate", async function calculateBundlePrices() {
  const productIds = this.products || [];
  const uniqueIds = new Set(productIds.map((productId) => productId.toString()));

  if (uniqueIds.size !== productIds.length) {
    this.invalidate("products", "A combo cannot contain the same product twice.");
    return;
  }

  if (productIds.length !== this.packSize) {
    return;
  }

  const products = await Product.find({ _id: { $in: productIds } })
    .select("price mrp")
    .lean();

  if (products.length !== productIds.length) {
    this.invalidate("products", "Every combo product must exist.");
    return;
  }

  this.totalPrice = products.reduce((sum, product) => sum + product.price, 0);
  this.totalMrp = products.reduce((sum, product) => sum + product.mrp, 0);
  this.bundlePrice = Math.round(
    this.totalPrice * (1 - this.bundleDiscountPercent / 100),
  );
});

comboSchema.index({ packSize: 1, isActive: 1 });

module.exports =
  mongoose.models.Combo || mongoose.model("Combo", comboSchema);
