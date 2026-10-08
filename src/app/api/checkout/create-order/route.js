import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getRazorpayClient } from "@/lib/razorpay";
import { connectCatalog, Combo, Product } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();
    const { items, addressId, shippingAddress } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty. Please add items before checking out." },
        { status: 400 }
      );
    }

    await connectCatalog();

    // Identify user (authenticated or guest fallback)
    const currentUser = await getCurrentUser();
    let userId = currentUser?.id;

    if (!userId) {
      // Guest checkout: find or create a guest user account in Prisma
      const guestEmail = shippingAddress?.email || `guest_${Date.now()}@veggiecrush.local`;
      const guestUser = await prisma.user.upsert({
        where: { email: guestEmail },
        update: {},
        create: {
          id: `guest_${Date.now()}`,
          email: guestEmail,
          name: shippingAddress?.fullName || "Guest Customer",
          phone: shippingAddress?.phone || null,
        },
      });
      userId = guestUser.id;
    }

    // Resolve delivery address
    let resolvedAddressId = addressId;
    if (!resolvedAddressId && shippingAddress) {
      const newAddress = await prisma.address.create({
        data: {
          userId,
          fullName: shippingAddress.fullName,
          phone: shippingAddress.phone,
          line1: shippingAddress.line1,
          line2: shippingAddress.line2 || null,
          city: shippingAddress.city,
          state: shippingAddress.state,
          pincode: shippingAddress.pincode,
          label: shippingAddress.label || "Home",
        },
      });
      resolvedAddressId = newAddress.id;
    }

    // Calculate total on server using database values (secure from price tampering)
    let calculatedTotalPaise = 0;
    const orderItemsData = [];

    for (const item of items) {
      const quantity = Number(item.quantity);
      if (!Number.isSafeInteger(quantity) || quantity < 1) {
        return NextResponse.json({ error: "Cart item quantity must be a positive integer." }, { status: 400 });
      }

      if (item.comboId || item.kind === "combo" || item.type === "combo") {
        const combo = await Combo.findById(item.comboId || item.id);
        if (!combo || !combo.isActive) {
          return NextResponse.json({ error: "A selected combo is no longer available." }, { status: 400 });
        }

        const unitPricePaise = Math.round(combo.bundlePrice * 100);
        calculatedTotalPaise += unitPricePaise * quantity;
        orderItemsData.push({
          productId: null,
          name: combo.name,
          quantity,
          unitPrice: unitPricePaise,
        });
        continue;
      }

      const productId = item.id || item.productId;
      let product = null;
      if (typeof productId === "string" && /^[a-f\d]{24}$/i.test(productId)) {
        product = await Product.findOne({ _id: productId, isActive: true });
      }
      if (!product && typeof item.slug === "string") {
        product = await Product.findOne({ slug: item.slug, isActive: true });
      }
      if (!product) {
        return NextResponse.json({ error: "A selected product is no longer available." }, { status: 400 });
      }

      const unitPricePaise = Math.round(product.price * 100);
      calculatedTotalPaise += unitPricePaise * quantity;

      orderItemsData.push({
        productId: String(product._id),
        name: `${product.name} (${product.size})`,
        quantity,
        unitPrice: unitPricePaise,
      });
    }

    // Create Order in DB
    const order = await prisma.order.create({
      data: {
        userId,
        addressId: resolvedAddressId || null,
        total: calculatedTotalPaise,
        status: "PENDING",
        paymentStatus: "PENDING",
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: true,
      },
    });

    // Create Razorpay Order
    let razorpayOrderId = null;
    const razorpay = getRazorpayClient();

    if (razorpay) {
      try {
        const rzpOrder = await razorpay.orders.create({
          amount: calculatedTotalPaise,
          currency: "INR",
          receipt: order.id,
          notes: {
            orderId: order.id,
            userId,
          },
        });
        razorpayOrderId = rzpOrder.id;
      } catch (rzpErr) {
        console.error("Razorpay order creation failed:", rzpErr);
        // Dev fallback
        razorpayOrderId = `order_mock_${Date.now()}`;
      }
    } else {
      // Mock order ID if keys are not configured in .env yet
      razorpayOrderId = `order_mock_${Date.now()}`;
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      razorpayOrderId,
      amount: calculatedTotalPaise,
      currency: "INR",
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_mock",
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Unable to process order. Please try again." },
      { status: 500 }
    );
  }
}
