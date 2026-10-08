import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { connectCatalog, getProductImages, productId, Product } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  try {
    await connectCatalog();
    const { slug } = await params;
    const product = await Product.findOne({ slug, isActive: true }).lean();

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const reviews = await prisma.review.findMany({
      where: { productId: productId(product) },
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });
    const rating = reviews.length
      ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length
      : product.rating;

    return NextResponse.json({
      product: {
        id: productId(product),
        code: product.code,
        name: product.name,
        shortName: product.shortName,
        slug: product.slug,
        description: product.description,
        keyBenefits: product.keyBenefits,
        images: getProductImages(product),
        startingAt: product.price,
        price: product.price,
        mrp: product.mrp,
        size: product.size,
        rating: Number(rating.toFixed(1)),
        reviewsCount: reviews.length || product.reviewsCount,
        category: { name: "VeggieCrush Wellness", slug: "veggiecrush-wellness" },
        conditions: [],
        variants: [{
          id: `${productId(product)}-standard`,
          label: product.size,
          price: Math.round(product.price * 100),
          mrp: Math.round(product.mrp * 100),
          stock: 100,
        }],
        reviews: reviews.map((review) => ({
          id: review.id,
          userName: review.user?.name || "Customer",
          rating: review.rating,
          comment: review.comment,
          createdAt: review.createdAt,
        })),
        avgRating: Number(rating.toFixed(1)),
        totalReviews: reviews.length || product.reviewsCount,
      },
    });
  } catch (error) {
    console.error("Error fetching catalog product by slug:", error);
    return NextResponse.json(
      { error: "Unable to load product details" },
      { status: 500 },
    );
  }
}
