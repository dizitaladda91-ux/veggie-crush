import { NextResponse } from "next/server";
import { connectCatalog, formatProduct, Product } from "@/lib/catalog";

export const dynamic = "force-dynamic";

const productImages = {
  beetroot: ["/products/beetroot_1.webp", "/products/beetroot_2.webp", "/products/beetroot_3.webp", "/products/beetroot_4.webp"],
  gooseberry: ["/products/goosberry_1.webp", "/products/goosberry_2.webp", "/products/goosberry_3.webp", "/products/goosberry_4.webp"],
  moringa: ["/products/moringa_1.webp", "/products/moringa_2.webp", "/products/moringa_3.webp", "/products/moringa_4.webp"],
  neem: ["/products/neem_1.webp", "/products/neem_2.webp", "/products/neem_3.webp", "/products/neem_4.webp"],
  everfit: ["/products/everfit_1.webp", "/products/everfit_2.webp", "/products/everfit_3.webp", "/products/everfit_4.webp"],
  "giloy-powder": ["/products/giloy_1.webp", "/products/giloy_2.webp", "/products/giloy_3.webp", "/products/giloy_4.webp"],
};

export async function GET() {
  try {
    await connectCatalog();
    const products = await Product.find({ isActive: true, bestseller: true })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      products: products.map((product) => {
        const formatted = formatProduct(product);
        return {
          id: formatted.id,
          name: formatted.name,
          description: formatted.description,
          images: formatted.images.length ? formatted.images : productImages[formatted.slug] || [],
          price: formatted.price,
          mrp: formatted.mrp,
          unit: formatted.unit,
          rating: formatted.rating,
          reviews: formatted.reviewsCount,
          isBestSeller: formatted.isBestSeller,
        };
      }),
    });
  } catch (error) {
    console.error("Unable to load top-selling catalog products:", error);
    return NextResponse.json({ error: "Unable to load products" }, { status: 500 });
  }
}
