import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { verifyRazorpaySignature } from "@/lib/payment-utils";
import { getRazorpayClient } from "@/lib/razorpay";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Sign in to verify your payment." }, { status: 401 });
    }

    const body = await request.json();
    const {
      orderId,
      razorpay_order_id: razorpayOrderId,
      razorpay_payment_id: razorpayPaymentId,
      razorpay_signature: razorpaySignature,
    } = body;
    if (![orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature].every(
      (value) => typeof value === "string" && value.length > 0,
    )) {
      return NextResponse.json({ error: "Complete Razorpay payment details are required." }, { status: 400 });
    }

    const order = await prisma.order.findFirst({
      where: { id: orderId, userId: user.id },
    });
    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }
    if (order.paymentStatus === "PAID" && order.razorpayPaymentId === razorpayPaymentId) {
      const confirmedOrder = await prisma.order.findUnique({
        where: { id: order.id },
        include: { items: true, address: true },
      });
      return NextResponse.json({ success: true, order: confirmedOrder });
    }
    if (order.status !== "PENDING" || order.paymentStatus !== "PENDING" ||
      order.razorpayOrderId !== razorpayOrderId) {
      return NextResponse.json({ error: "This payment does not match an active order." }, { status: 400 });
    }

    const razorpay = getRazorpayClient();
    if (!razorpay || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: "Payment verification is temporarily unavailable." }, { status: 503 });
    }
    if (!verifyRazorpaySignature({
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      signature: razorpaySignature,
    })) {
      return NextResponse.json({ error: "Payment signature could not be verified." }, { status: 400 });
    }

    let payment = await razorpay.payments.fetch(razorpayPaymentId);
    if (payment.order_id !== razorpayOrderId ||
      payment.amount !== order.total ||
      payment.currency !== "INR" ||
      !["authorized", "captured"].includes(payment.status)) {
      return NextResponse.json({ error: "The payment details do not match this order." }, { status: 400 });
    }
    if (payment.status === "authorized") {
      payment = await razorpay.payments.capture(razorpayPaymentId, order.total, "INR");
    }
    if (payment.status !== "captured") {
      return NextResponse.json({ error: "Payment has not been captured. Please contact support if money was deducted." }, { status: 400 });
    }

    const updated = await prisma.order.updateMany({
      where: {
        id: order.id,
        userId: user.id,
        status: "PENDING",
        paymentStatus: "PENDING",
        razorpayOrderId,
      },
      data: {
        status: "CONFIRMED",
        paymentStatus: "PAID",
        razorpayPaymentId,
      },
    });
    if (updated.count !== 1) {
      return NextResponse.json({ error: "This order has already been updated. Refresh your order history." }, { status: 409 });
    }

    const confirmedOrder = await prisma.order.findUnique({
      where: { id: order.id },
      include: { items: true, address: true },
    });
    return NextResponse.json({
      success: true,
      order: confirmedOrder,
      message: "Payment verified and order confirmed.",
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json({ error: "Payment verification could not be processed." }, { status: 500 });
  }
}
