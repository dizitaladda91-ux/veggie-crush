import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getRazorpayClient } from "@/lib/razorpay";
import { connectCatalog, Combo, Product } from "@/lib/catalog";

export const dynamic = "force-dynamic";

const FREE_DELIVERY_THRESHOLD_PAISE = 59900;
const DELIVERY_FEE_PAISE = 4900;

export async function POST(request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Create an account or sign in before placing your order." }, { status: 401 });
    }
    if (currentUser.role !== "CUSTOMER" || !/^[a-f\d]{24}$/i.test(currentUser.id)) {
      return NextResponse.json({ error: "A customer account is required to place an order." }, { status: 403 });
    }

    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Checkout details must be provided." }, { status: 400 });
    }
    const { items, shippingAddress } = body;
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Your cart is empty. Add products before checking out." }, { status: 400 });
    }

    const requiredAddressFields = ["fullName", "phone", "line1", "city", "state", "pincode"];
    if (!shippingAddress || requiredAddressFields.some((field) =>
      typeof shippingAddress[field] !== "string" || !shippingAddress[field].trim())) {
      return NextResponse.json({ error: "Please provide a complete delivery address." }, { status: 400 });
    }
    if (!/^\d{6}$/.test(shippingAddress.pincode.trim())) {
      return NextResponse.json({ error: "Enter a valid 6-digit PIN code." }, { status: 400 });
    }
    if (!/^[0-9+\s()-]{7,20}$/.test(shippingAddress.phone.trim())) {
      return NextResponse.json({ error: "Enter a valid contact number." }, { status: 400 });
    }
    if (shippingAddress.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingAddress.email.trim())) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const razorpay = getRazorpayClient();
    const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (!razorpay || !key) {
      return NextResponse.json({ error: "Online payments are temporarily unavailable. Please try again later." }, { status: 503 });
    }

    await connectCatalog();

    let subtotalPaise = 0;
    const orderItemsData = [];

    for (const item of items) {
      const quantity = Number(item.quantity);
      if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > 99) {
        return NextResponse.json({ error: "Each product quantity must be between 1 and 99." }, { status: 400 });
      }

      if (item.comboId || item.kind === "combo" || item.type === "combo") {
        const combo = await Combo.findById(item.comboId || item.id);
        if (!combo || combo.isActive === false) {
          return NextResponse.json({ error: "A selected combo is no longer available." }, { status: 400 });
        }

        const unitPrice = Math.round(combo.bundlePrice * 100);
        subtotalPaise += unitPrice * quantity;
        orderItemsData.push({ productId: null, name: combo.name, quantity, unitPrice });
        continue;
      }

      const requestedId = item.id || item.productId;
      let product = null;
      if (typeof requestedId === "string" && /^[a-f\d]{24}$/i.test(requestedId)) {
        product = await Product.findOne({ _id: requestedId, isActive: true });
      }
      if (!product && typeof item.slug === "string") {
        product = await Product.findOne({ slug: item.slug, isActive: true });
      }
      if (!product) {
        return NextResponse.json({ error: "A selected product is no longer available." }, { status: 400 });
      }

      const unitPrice = Math.round(product.price * 100);
      subtotalPaise += unitPrice * quantity;
      orderItemsData.push({
        productId: String(product._id),
        name: `${product.name} (${product.size})`,
        quantity,
        unitPrice,
      });
    }

    const deliveryFeePaise = subtotalPaise >= FREE_DELIVERY_THRESHOLD_PAISE ? 0 : DELIVERY_FEE_PAISE;
    const totalPaise = subtotalPaise + deliveryFeePaise;
    const address = await prisma.address.create({
      data: {
        userId: currentUser.id,
        fullName: shippingAddress.fullName.trim(),
        phone: shippingAddress.phone.trim(),
        line1: shippingAddress.line1.trim(),
        line2: shippingAddress.line2?.trim() || null,
        city: shippingAddress.city.trim(),
        state: shippingAddress.state.trim(),
        pincode: shippingAddress.pincode.trim(),
        label: shippingAddress.label?.trim() || "Home",
      },
    });
    const order = await prisma.order.create({
      data: {
        userId: currentUser.id,
        addressId: address.id,
        total: totalPaise,
        status: "PENDING",
        paymentStatus: "PENDING",
        items: { create: orderItemsData },
      },
    });

    try {
      const razorpayOrder = await razorpay.orders.create({
        amount: totalPaise,
        currency: "INR",
        receipt: order.id,
        notes: { orderId: order.id, userId: currentUser.id },
      });
      await prisma.order.update({
        where: { id: order.id },
        data: { razorpayOrderId: razorpayOrder.id },
      });

      return NextResponse.json({
        success: true,
        orderId: order.id,
        razorpayOrderId: razorpayOrder.id,
        amount: totalPaise,
        currency: "INR",
        key,
      });
    } catch (error) {
      console.error("Razorpay order creation failed:", error);
      await prisma.order.update({
        where: { id: order.id },
        data: { status: "CANCELLED", paymentStatus: "FAILED" },
      });
      return NextResponse.json({ error: "We could not start the secure payment. Please try again." }, { status: 502 });
    }
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Unable to process your order. Please try again." }, { status: 500 });
  }
}
