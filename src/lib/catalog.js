import mongooseConnection from "../../lib/mongoose.js";
import ProductModel from "../../models/Product.js";
import ComboModel from "../../models/Combo.js";

const PUBLIC_PRODUCT_IMAGES = {
  beetroot: ["/products/beetroot_1.webp", "/products/beetroot_2.webp", "/products/beetroot_3.webp", "/products/beetroot_4.webp"],
  gooseberry: ["/products/goosberry_1.webp", "/products/goosberry_2.webp", "/products/goosberry_3.webp", "/products/goosberry_4.webp"],
  moringa: ["/products/moringa_1.webp", "/products/moringa_2.webp", "/products/moringa_3.webp", "/products/moringa_4.webp"],
  everfit: ["/products/everfit_1.webp", "/products/everfit_2.webp", "/products/everfit_3.webp", "/products/everfit_4.webp"],
  "giloy-powder": ["/products/giloy_1.webp", "/products/giloy_2.webp", "/products/giloy_3.webp", "/products/giloy_4.webp"],
  neem: ["/products/neem_1.webp", "/products/neem_2.webp", "/products/neem_3.webp", "/products/neem_4.webp"],
};

export const connectCatalog = mongooseConnection.connectMongoose;
export const Product = ProductModel;
export const Combo = ComboModel;

export function productId(product) {
  return String(product._id);
}

export function getProductImages(product) {
  const images = Array.isArray(product.images)
    ? product.images.filter((image) => typeof image === "string" && image)
    : [];
  return images.length
    ? images
    : PUBLIC_PRODUCT_IMAGES[product.slug?.trim().toLowerCase()] || [];
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
    images: getProductImages(product),
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
