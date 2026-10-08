import mongooseConnection from "../../lib/mongoose.js";
import ProductModel from "../../models/Product.js";
import ComboModel from "../../models/Combo.js";

export const connectCatalog = mongooseConnection.connectMongoose;
export const Product = ProductModel;
export const Combo = ComboModel;

export function productId(product) {
  return String(product._id);
}

export function formatProduct(product) {
  return {
    id: productId(product),
    code: product.code,
    name: product.name,
    shortName: product.shortName,
    slug: product.slug,
    description: product.description || "",
    keyBenefits: product.keyBenefits || [],
    images: product.images || [],
    price: product.price,
    mrp: product.mrp,
    unit: product.size,
    size: product.size,
    rating: product.rating,
    reviews: product.reviewsCount,
    reviewsCount: product.reviewsCount,
    isBestSeller: product.bestseller,
    bestseller: product.bestseller,
    isActive: product.isActive,
    category: "VeggieCrush Wellness",
    variants: [
      {
        id: `${productId(product)}-standard`,
        label: product.size,
        price: Math.round(product.price * 100),
        mrp: Math.round(product.mrp * 100),
        stock: 100,
      },
    ],
  };
}
