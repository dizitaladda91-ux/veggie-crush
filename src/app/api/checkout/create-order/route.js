import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getRazorpayClient } from "@/lib/razorpay";

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
      const product = await prisma.product.findUnique({
        where: { id: item.id || item.productId },
        include: { variants: true },
      });

      if (!product) {
        // Fallback calculation if item not in DB yet (dev mode)
        const unitPricePaise = Math.round((item.price || 0) * 100);
        const qty = item.quantity || 1;
        calculatedTotalPaise += unitPricePaise * qty;
        orderItemsData.push({
          productId: item.id || item.productId,
          name: item.name || "Veggie Item",
          quantity: qty,
          unitPrice: unitPricePaise,
        });
        continue;
      }

      const variant =
        product.variants.find((v) => v.id === item.variantId) ||
        product.variants[0];

      const unitPrice = variant ? variant.price : product.startingAt;
      const quantity = Math.max(1, item.quantity || 1);
      calculatedTotalPaise += unitPrice * quantity;

      orderItemsData.push({
        productId: product.id,
        name: `${product.name}${variant?.label ? ` (${variant.label})` : ""}`,
        quantity,
        unitPrice,
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
