import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function toAscii(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[^\x20-\x7E]/g, "")
    .trim();
}

function wrapText(value, maxLength = 86) {
  const words = toAscii(value).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const word of words) {
    if (line && `${line} ${word}`.length > maxLength) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

function escapePdfText(value) {
  return value.replace(/[\\()]/g, "\\$&");
}

function createPdf(lines) {
  const pages = [];
  for (let index = 0; index < lines.length; index += 44) {
    pages.push(lines.slice(index, index + 44));
  }

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    `<< /Type /Pages /Kids [${pages.map((_, index) => `${4 + index * 2} 0 R`).join(" ")}] /Count ${pages.length} >>`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];

  for (let pageIndex = 0; pageIndex < pages.length; pageIndex += 1) {
    const pageObjectId = 4 + pageIndex * 2;
    const contentObjectId = pageObjectId + 1;
    const pageLines = pages[pageIndex];
    const commands = pageLines.map((line, lineIndex) => {
      const fontSize = pageIndex === 0 && lineIndex === 0 ? 19 : 10;
      const y = pageIndex === 0 && lineIndex === 0 ? 752 : 724 - (lineIndex - (pageIndex === 0 ? 1 : 0)) * 15;
      return `BT /F1 ${fontSize} Tf 48 ${y} Td (${escapePdfText(line)}) Tj ET`;
    }).join("\n");

    objects.push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 3 0 R >> >> /Contents ${contentObjectId} 0 R >>`,
      `<< /Length ${Buffer.byteLength(commands, "ascii")} >>\nstream\n${commands}\nendstream`,
    );
  }

  let document = "%PDF-1.4\n";
  const offsets = [0];
  for (let index = 0; index < objects.length; index += 1) {
    offsets.push(Buffer.byteLength(document, "ascii"));
    document += `${index + 1} 0 obj\n${objects[index]}\nendobj\n`;
  }

  const xrefOffset = Buffer.byteLength(document, "ascii");
  document += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  document += offsets.slice(1).map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`).join("");
  document += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return Buffer.from(document, "ascii");
}

export async function GET(_request, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Sign in to download your receipt." }, { status: 401 });
    }

    const { id } = await params;
    if (!/^[a-f\d]{24}$/i.test(id)) {
      return NextResponse.json({ error: "Receipt not found." }, { status: 404 });
    }
    const order = await prisma.order.findFirst({
      where: { id, userId: user.id, status: "CONFIRMED", paymentStatus: "PAID" },
      include: { items: true, address: true },
    });
    if (!order) {
      return NextResponse.json({ error: "A paid order receipt could not be found." }, { status: 404 });
    }

    const itemSubtotal = order.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
    const deliveryFee = Math.max(0, order.total - itemSubtotal);
    const address = order.address;
    const lines = [
      "VeggieCrush | PAYMENT RECEIPT",
      "Farm-fresh goodness, delivered with care",
      "",
      `Order reference: VC-${order.id.slice(-8).toUpperCase()}`,
      `Order ID: ${order.id}`,
      `Date: ${new Date(order.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`,
      `Payment status: PAID`,
      `Payment ID: ${order.razorpayPaymentId || "Verified by Razorpay"}`,
      "",
      "BILL TO",
      address?.fullName || "Customer",
      address?.phone ? `Phone: ${address.phone}` : "",
      address?.line1 || "",
      address?.line2 || "",
      [address?.city, address?.state, address?.pincode].filter(Boolean).join(", "),
      "",
      "ORDER DETAILS",
      "Item                                      Qty       Unit price       Amount",
      ...order.items.flatMap((item) => {
        const nameLines = wrapText(item.name, 38);
        return nameLines.map((name, index) => index === 0
          ? `${name.padEnd(40)} ${String(item.quantity).padStart(3)}  ${`Rs. ${(item.unitPrice / 100).toFixed(2)}`.padStart(13)}  ${`Rs. ${(item.unitPrice * item.quantity / 100).toFixed(2)}`.padStart(13)}`
          : name);
      }),
      "",
      `Items subtotal: Rs. ${(itemSubtotal / 100).toFixed(2)}`,
      `Delivery: ${deliveryFee ? `Rs. ${(deliveryFee / 100).toFixed(2)}` : "Free"}`,
      `TOTAL PAID: Rs. ${(order.total / 100).toFixed(2)}`,
      "",
      "Thank you for shopping with VeggieCrush.",
      "This is a computer-generated payment receipt.",
    ].flatMap((line) => wrapText(line));

    const pdf = createPdf(lines);
    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="veggiecrush-receipt-${order.id.slice(-8)}.pdf"`,
        "Content-Length": String(pdf.byteLength),
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("Error generating order receipt:", error);
    return NextResponse.json({ error: "Unable to generate the order receipt." }, { status: 500 });
  }
}
