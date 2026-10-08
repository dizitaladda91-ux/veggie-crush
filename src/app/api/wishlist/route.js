import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { connectCatalog, Product } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectCatalog();
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ wishlist: [] });
    }

    const entries = await prisma.wishlist.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
    const products = await Product.find({
      _id: { $in: entries.map((entry) => entry.productId) },
      isActive: true,
    }).lean();
    const productsById = new Map(products.map((product) => [String(product._id), product]));

    return NextResponse.json({
      wishlist: entries.flatMap((entry) => {
        const product = productsById.get(entry.productId);
        return product ? [{
          id: String(product._id),
          slug: product.slug,
          name: product.name,
          images: product.images,
          price: product.price,
          mrp: product.mrp,
          unit: product.size,
        }] : [];
      }),
    });
  } catch (error) {
    console.error("Wishlist GET error:", error);
    return NextResponse.json({ error: "Unable to load wishlist" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectCatalog();
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Please log in to add to wishlist" }, { status: 401 });
    }

    const { productId } = await request.json();
    if (typeof productId !== "string" || !/^[a-f\d]{24}$/i.test(productId)) {
      return NextResponse.json({ error: "Valid product ID required" }, { status: 400 });
    }

    const product = await Product.findOne({ _id: productId, isActive: true }).select("_id");
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const existing = await prisma.wishlist.findUnique({
      where: { userId_productId: { userId: user.id, productId } },
    });

    if (existing) {
      await prisma.wishlist.delete({
        where: { userId_productId: { userId: user.id, productId } },
      });
      return NextResponse.json({ wishlisted: false });
    }

    await prisma.wishlist.create({ data: { userId: user.id, productId } });
    return NextResponse.json({ wishlisted: true });
  } catch (error) {
    console.error("Wishlist POST error:", error);
    return NextResponse.json({ error: "Failed to update wishlist" }, { status: 500 });
  }
}
