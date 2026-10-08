const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      uppercase: true,
      maxlength: 64,
      match: /^[A-Z0-9]+(?:[-_][A-Z0-9]+)*$/,
      unique: true,
      sparse: true,
      trim: true,
    },
    name: { type: String, required: true, trim: true },
    shortName: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    description: { type: String, required: true, trim: true },
    keyBenefits: { type: [String], default: [] },
    price: { type: Number, required: true, min: 0 },
    mrp: { type: Number, required: true, min: 0 },
    discountPercent: { type: Number, default: 0, min: 0, max: 100 },
    size: { type: String, required: true, trim: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewsCount: { type: Number, default: 0, min: 0 },
    bestseller: { type: Boolean, default: false },
    images: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    collection: "Product",
  },
);

productSchema.pre("validate", function validatePricing() {
  if (this.price > this.mrp) {
    this.invalidate("price", "Price cannot be greater than MRP.");
    return;
  }

  this.discountPercent = this.mrp > 0
    ? Math.round(((this.mrp - this.price) / this.mrp) * 100)
    : 0;
});

productSchema.index({ isActive: 1, bestseller: -1 });

module.exports =
  mongoose.models.Product || mongoose.model("Product", productSchema);
