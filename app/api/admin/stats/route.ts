import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    await requireAdmin();

    const [
      totalUsers,
      totalOrders,
      pendingOrders,
      completedOrders,
      totalRevenue,
      totalServers,
      recentOrders,
    ] = await Promise.all([
      db.user.count(),
      db.order.count(),
      db.order.count({ where: { status: "AWAITING_VERIFICATION" } }),
      db.order.count({ where: { status: "COMPLETED" } }),
      db.order.aggregate({
        where: { status: "COMPLETED" },
        _sum: { amountINR: true },
      }),
      db.server.count(),
      db.order.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { email: true, name: true } },
          product: { select: { name: true } },
        },
      }),
    ]);

    return NextResponse.json({
      stats: {
        totalUsers,
        totalOrders,
        pendingOrders,
        completedOrders,
        totalRevenue: totalRevenue._sum.amountINR || 0,
        totalServers,
      },
      recentOrders,
    });
  } catch (error: any) {
    if (error.message === "Unauthorized" || error.message === "Forbidden") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
