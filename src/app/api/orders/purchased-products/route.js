import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { connectCatalog, getProductImages, Product } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Sign in to see products you have purchased." }, { status: 401 });
    }
    if (user.role !== "CUSTOMER" || !/^[a-f\d]{24}$/i.test(user.id)) {
      return NextResponse.json({ error: "A customer account is required." }, { status: 403 });
    }

    const orders = await prisma.order.findMany({
      where: { userId: user.id, status: "CONFIRMED", paymentStatus: "PAID" },
      select: {
        id: true,
        createdAt: true,
        items: {
          where: { productId: { isSet: true } },
          select: { productId: true, name: true, quantity: true, unitPrice: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    const boughtProductIds = [...new Set(orders.flatMap((order) =>
      order.items.map((item) => item.productId).filter(Boolean),
    ))];
    if (boughtProductIds.length === 0) {
      return NextResponse.json({ products: [] });
    }

    await connectCatalog();
    const products = await Product.find({
      _id: { $in: boughtProductIds },
      isActive: true,
    }).lean();
    const purchaseById = new Map();
    for (const order of orders) {
      for (const item of order.items) {
        if (!item.productId) continue;
        const purchase = purchaseById.get(item.productId);
        if (purchase) {
          purchase.quantity += item.quantity;
          if (order.createdAt > purchase.lastPurchasedAt) purchase.lastPurchasedAt = order.createdAt;
        } else {
          purchaseById.set(item.productId, {
            quantity: item.quantity,
            lastPurchasedAt: order.createdAt,
            lastUnitPrice: item.unitPrice,
          });
        }
      }
    }

    return NextResponse.json({
      products: products.map((product) => {
        const purchase = purchaseById.get(String(product._id));
        return {
          id: String(product._id),
          slug: product.slug,
          name: product.name,
          description: product.description || "",
          images: getProductImages(product),
          price: product.price,
          mrp: product.mrp,
          unit: product.size,
          lastPurchasedAt: purchase.lastPurchasedAt,
          totalPurchased: purchase.quantity,
          lastUnitPrice: purchase.lastUnitPrice,
        };
      }).sort((left, right) => new Date(right.lastPurchasedAt) - new Date(left.lastPurchasedAt)),
    });
  } catch (error) {
    console.error("Purchased products error:", error);
    return NextResponse.json({ error: "Unable to load your purchased products." }, { status: 500 });
  }
}
