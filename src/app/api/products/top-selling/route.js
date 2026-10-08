import { NextResponse } from "next/server";
import { connectCatalog, formatProduct, Product } from "@/lib/catalog";

export const dynamic = "force-dynamic";

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
          images: formatted.images,
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
