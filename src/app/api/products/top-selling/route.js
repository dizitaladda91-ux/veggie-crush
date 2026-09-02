import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const productImages = {
  beetroot: ["/products/beetroot_1.webp", "/products/beetroot_2.webp", "/products/beetroot_3.webp", "/products/beetroot_4.webp"],
  gooseberry: ["/products/goosberry_1.webp", "/products/goosberry_2.webp", "/products/goosberry_3.webp", "/products/goosberry_4.webp"],
  moringa: ["/products/moringa_1.webp", "/products/moringa_2.webp", "/products/moringa_3.webp", "/products/moringa_4.webp"],
  neem: ["/products/neem_1.webp", "/products/neem_2.webp", "/products/neem_3.webp", "/products/neem_4.webp"],
  everfit: ["/products/everfit_1.webp", "/products/everfit_2.webp", "/products/everfit_3.webp", "/products/everfit_4.webp"],
  "giloy powder": ["/products/giloy_1.webp", "/products/giloy_2.webp", "/products/giloy_3.webp", "/products/giloy_4.webp"],
};

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        isBestSeller: true,
        name: { not: "Neem Everfit" },
      },
      include: {
        variants: {
          where: { isActive: true, stock: { gt: 0 } },
          orderBy: { price: "asc" },
          take: 1,
        },
        reviews: { select: { rating: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      products: products.map((product) => {
        const variant = product.variants[0];
        const rating = product.reviews.length
          ? product.reviews.reduce((total, review) => total + review.rating, 0) /
            product.reviews.length
          : 0;

        const productName = product.name.toLowerCase();
        const images = product.images && product.images.length
          ? product.images
          : productImages[productName] || [];

        return {
          id: product.id,
          name: product.name,
          description: product.description || "",
          images,
          price: variant?.price ? variant.price / 100 : product.startingAt / 100,
          mrp: variant?.mrp ? variant.mrp / 100 : product.startingAt / 100,
          unit: variant?.label || "",
          rating: Number(rating.toFixed(1)),
          reviews: product.reviews.length,
        };
      }),
    });
  } catch (error) {
    console.error("Unable to load top-selling products", error);
    return NextResponse.json(
      { error: "Unable to load products" },
      { status: 500 },
    );
  }
}