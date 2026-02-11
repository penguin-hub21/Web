import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(req: Request) {
  try {
    const { amount, orderId, payeeName } = await req.json();

    const upiId = process.env.UPI_ID || "utkarsh011@fam";
    const name = payeeName || process.env.UPI_PAYEE_NAME || "Dream Vision";

    // UPI deep link format
    const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=LumenNodes-Order-${orderId}`;

    // Generate QR code as data URL
    const qrDataUrl = await QRCode.toDataURL(upiLink, {
      width: 300,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    });

    return NextResponse.json({
      qrCode: qrDataUrl,
      upiLink,
      upiId,
      amount,
      orderId,
    });
  } catch (error) {
    console.error("QR generation error:", error);
    return NextResponse.json({ error: "Failed to generate QR" }, { status: 500 });
  }
}
