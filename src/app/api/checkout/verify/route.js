import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyRazorpaySignature } from "@/lib/payment-utils";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    const secretConfigured = !!process.env.RAZORPAY_KEY_SECRET;

    if (secretConfigured && razorpay_signature) {
      const isValid = verifyRazorpaySignature({
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
      });

      if (!isValid) {
        // Mark payment as failed
        await prisma.order.update({
          where: { id: orderId },
          data: { paymentStatus: "FAILED" },
        });

        return NextResponse.json(
          { error: "Payment verification failed. Invalid signature." },
          { status: 400 }
        );
      }
    }

    // Payment is verified (or accepted in mock dev mode if secret not configured)
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "CONFIRMED",
        paymentStatus: "PAID",
      },
      include: {
        items: true,
        address: true,
      },
    });

    return NextResponse.json({
      success: true,
      order: updatedOrder,
      message: "Payment successfully verified and order confirmed.",
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Payment verification could not be processed" },
      { status: 500 }
    );
  }
}
