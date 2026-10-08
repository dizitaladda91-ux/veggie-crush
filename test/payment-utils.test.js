const test = require("node:test");
const assert = require("node:assert/strict");
const { createHmac } = require("node:crypto");

test("verifies signed Razorpay webhook bodies", async () => {
  const originalSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  process.env.RAZORPAY_WEBHOOK_SECRET = "local-test-webhook-secret";

  try {
    const { verifyRazorpayWebhookSignature } = await import("../src/lib/payment-utils.js");
    const body = JSON.stringify({ event: "payment.captured", payload: { id: "pay_test" } });
    const signature = createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(body)
      .digest("hex");

    assert.equal(verifyRazorpayWebhookSignature({ body, signature }), true);
    assert.equal(verifyRazorpayWebhookSignature({ body: `${body} `, signature }), false);
    assert.equal(verifyRazorpayWebhookSignature({ body, signature: "invalid" }), false);
  } finally {
    if (originalSecret === undefined) delete process.env.RAZORPAY_WEBHOOK_SECRET;
    else process.env.RAZORPAY_WEBHOOK_SECRET = originalSecret;
  }
});

test("fails explicitly when the webhook signing secret is missing", async () => {
  const originalSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  delete process.env.RAZORPAY_WEBHOOK_SECRET;

  try {
    const { verifyRazorpayWebhookSignature } = await import("../src/lib/payment-utils.js");
    assert.throws(
      () => verifyRazorpayWebhookSignature({ body: "{}", signature: "invalid" }),
      /RAZORPAY_WEBHOOK_SECRET is not configured/,
    );
  } finally {
    if (originalSecret !== undefined) process.env.RAZORPAY_WEBHOOK_SECRET = originalSecret;
  }
});
