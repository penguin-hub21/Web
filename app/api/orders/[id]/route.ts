import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

// Mark order as payment submitted (user submits UPI txn id)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { upiTxnId } = await req.json();

    const order = await db.order.findUnique({ where: { id } });
    if (!order || order.userId !== session.userId) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.status !== "PENDING_PAYMENT") {
      return NextResponse.json({ error: "Order is not pending payment" }, { status: 400 });
    }

    const updated = await db.order.update({
      where: { id },
      data: {
        upiTxnId,
        status: "AWAITING_VERIFICATION",
      },
    });

    return NextResponse.json({ order: updated });
  } catch (error) {
    console.error("Update order error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
