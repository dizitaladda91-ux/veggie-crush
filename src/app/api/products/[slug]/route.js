import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  try {
    const { slug } = await params;

    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        conditions: {
          include: {
            condition: true,
          },
        },
        variants: {
          where: { isActive: true },
          orderBy: { price: "asc" },
        },
        reviews: {
          include: {
            user: { select: { name: true } },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const rating = product.reviews.length
      ? product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length
      : 0;

    return NextResponse.json({
      product: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        images: product.images,
        startingAt: product.startingAt / 100,
        category: product.category,
        conditions: product.conditions.map((c) => c.condition),
        variants: product.variants.map((v) => ({
          id: v.id,
          label: v.label,
          price: v.price / 100,
          mrp: v.mrp / 100,
          stock: v.stock,
        })),
        reviews: product.reviews.map((r) => ({
          id: r.id,
          userName: r.user?.name || "Customer",
          rating: r.rating,
          comment: r.comment,
          createdAt: r.createdAt,
        })),
        avgRating: Number(rating.toFixed(1)),
        totalReviews: product.reviews.length,
      },
    });
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return NextResponse.json(
      { error: "Unable to load product details" },
      { status: 500 }
    );
  }
}
