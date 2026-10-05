import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    const reviews = await prisma.review.findMany({
      where: { productId },
      include: {
        user: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      reviews: reviews.map((r) => ({
        id: r.id,
        userName: r.user?.name || "Customer",
        rating: r.rating,
        comment: r.comment,
        createdAt: r.createdAt,
      })),
    });
  } catch (error) {
    console.error("Reviews GET error:", error);
    return NextResponse.json({ reviews: [] });
  }
}

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Please log in to submit a review" }, { status: 401 });
    }

    const { productId, rating, comment } = await request.json();

    if (!productId || typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Valid product ID and rating (between 1 and 5) required" },
        { status: 400 }
      );
    }

    const review = await prisma.review.upsert({
      where: {
        userId_productId: { userId: user.id, productId },
      },
      update: {
        rating,
        comment: comment || null,
      },
      create: {
        userId: user.id,
        productId,
        rating,
        comment: comment || null,
      },
    });

    return NextResponse.json({ success: true, review });
  } catch (error) {
    console.error("Reviews POST error:", error);
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}
