import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Validates Razorpay payment signature
 * generated on checkout modal completion.
 */
export function verifyRazorpaySignature({ orderId, paymentId, signature }) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    throw new Error("RAZORPAY_KEY_SECRET is not configured");
  }

  const generatedSignature = createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  if (typeof signature !== "string" || !/^[a-f\d]{64}$/i.test(signature)) {
    return false;
  }

  return timingSafeEqual(Buffer.from(generatedSignature, "hex"), Buffer.from(signature, "hex"));
}
