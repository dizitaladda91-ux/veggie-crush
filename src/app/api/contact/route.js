import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, message, email } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Name, phone number, and message are required." },
        { status: 400 }
      );
    }

    console.log("[Pure VeggieCrush Contact Submission]", {
      name,
      phone,
      email: email || "N/A",
      message,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out to Pure VeggieCrush! Our team will contact you within 24 hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
