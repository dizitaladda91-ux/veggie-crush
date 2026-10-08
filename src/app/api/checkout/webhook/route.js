import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyRazorpayWebhookSignature } from "@/lib/payment-utils";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-razorpay-signature");
    let validSignature;

    try {
      validSignature = verifyRazorpayWebhookSignature({ body, signature });
    } catch (error) {
      console.error("Razorpay webhook configuration error:", error);
      return NextResponse.json({ error: "Payment notifications are not configured." }, { status: 503 });
    }
    if (!validSignature) {
      return NextResponse.json({ error: "Invalid payment notification signature." }, { status: 401 });
    }

    let event;
    try {
      event = JSON.parse(body);
    } catch {
      return NextResponse.json({ error: "Invalid payment notification body." }, { status: 400 });
    }
    if (!event || typeof event !== "object" || Array.isArray(event)) {
      return NextResponse.json({ error: "Invalid payment notification body." }, { status: 400 });
    }

    if (event.event !== "payment.captured") {
      return NextResponse.json({ received: true });
    }

    const payment = event.payload?.payment?.entity;
    if (!payment
      || typeof payment.id !== "string"
      || typeof payment.order_id !== "string"
      || payment.status !== "captured"
      || !Number.isSafeInteger(payment.amount)
      || payment.currency !== "INR") {
      return NextResponse.json({ error: "Captured payment details are incomplete." }, { status: 400 });
    }

    const order = await prisma.order.findFirst({
      where: { razorpayOrderId: payment.order_id },
    });
    if (!order) {
      console.warn("Captured Razorpay payment has no matching VeggieCrush order:", payment.order_id);
      return NextResponse.json({ error: "Order for this payment was not found." }, { status: 404 });
    }
    if (payment.amount !== order.total) {
      console.error("Captured Razorpay payment amount does not match its order:", order.id);
      return NextResponse.json({ error: "Captured payment amount does not match the order." }, { status: 400 });
    }
    if (order.paymentStatus === "PAID" && order.razorpayPaymentId === payment.id) {
      return NextResponse.json({ received: true, alreadyProcessed: true });
    }
    if (order.paymentStatus === "PAID") {
      console.error("A different captured payment was reported for an already paid order:", order.id);
      return NextResponse.json({ error: "Order is already paid with a different payment." }, { status: 409 });
    }

    const updated = await prisma.order.updateMany({
      where: {
        id: order.id,
        status: "PENDING",
        paymentStatus: "PENDING",
        razorpayOrderId: payment.order_id,
      },
      data: {
        status: "CONFIRMED",
        paymentStatus: "PAID",
        razorpayPaymentId: payment.id,
      },
    });

    if (updated.count !== 1) {
      const latestOrder = await prisma.order.findUnique({ where: { id: order.id } });
      if (latestOrder?.paymentStatus === "PAID" && latestOrder.razorpayPaymentId === payment.id) {
        return NextResponse.json({ received: true, alreadyProcessed: true });
      }
      console.error("Could not reconcile captured Razorpay payment to a pending order:", order.id);
      return NextResponse.json({ error: "Could not reconcile the captured payment." }, { status: 409 });
    }

    return NextResponse.json({ received: true, orderId: order.id });
  } catch (error) {
    console.error("Error processing Razorpay payment notification:", error);
    return NextResponse.json({ error: "Payment notification could not be processed." }, { status: 500 });
  }
}
