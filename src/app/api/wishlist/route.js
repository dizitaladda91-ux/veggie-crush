import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ wishlist: [] });
    }

    const wishlist = await prisma.wishlist.findMany({
      where: { userId: user.id },
      include: {
        product: {
          include: {
            variants: { where: { isActive: true }, take: 1 },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      wishlist: wishlist.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        slug: item.product.slug,
        images: item.product.images,
        price: item.product.variants[0]?.price ? item.product.variants[0].price / 100 : item.product.startingAt / 100,
        mrp: item.product.variants[0]?.mrp ? item.product.variants[0].mrp / 100 : item.product.startingAt / 100,
      })),
    });
  } catch (error) {
    console.error("Wishlist GET error:", error);
    return NextResponse.json({ wishlist: [] });
  }
}

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Please log in to add to wishlist" }, { status: 401 });
    }

    const { productId } = await request.json();
    if (!productId) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    // Toggle wishlist item
    const existing = await prisma.wishlist.findUnique({
      where: {
        userId_productId: { userId: user.id, productId },
      },
    });

    if (existing) {
      await prisma.wishlist.delete({
        where: {
          userId_productId: { userId: user.id, productId },
        },
      });
      return NextResponse.json({ wishlisted: false });
    } else {
      await prisma.wishlist.create({
        data: { userId: user.id, productId },
      });
      return NextResponse.json({ wishlisted: true });
    }
  } catch (error) {
    console.error("Wishlist POST error:", error);
    return NextResponse.json({ error: "Failed to update wishlist" }, { status: 500 });
  }
}
