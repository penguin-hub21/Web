import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { createPteroUser, createPteroServer, getPteroUserByEmail } from "@/lib/pterodactyl";

// List all orders for admin
export async function GET() {
  try {
    await requireAdmin();

    const orders = await db.order.findMany({
      include: {
        user: { select: { id: true, email: true, name: true } },
        product: true,
        server: true,
        invoice: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ orders });
  } catch (error: any) {
    if (error.message === "Unauthorized" || error.message === "Forbidden") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    console.error("Admin orders error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Approve or Deny an order
export async function PATCH(req: NextRequest) {
  try {
    await requireAdmin();

    const { orderId, action, adminNote } = await req.json();

    if (!orderId || !action) {
      return NextResponse.json({ error: "orderId and action required" }, { status: 400 });
    }

    const order = await db.order.findUnique({
      where: { id: orderId },
      include: { user: true, product: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (action === "deny") {
      const updated = await db.order.update({
        where: { id: orderId },
        data: { status: "DENIED", adminNote },
      });
      return NextResponse.json({ order: updated });
    }

    if (action === "approve") {
      // 1. Create / get Pterodactyl user
      let pteroUserId = order.user.pteroId;
      if (!pteroUserId) {
        try {
          const existingPteroUser = await getPteroUserByEmail(order.user.email);
          if (existingPteroUser) {
            pteroUserId = existingPteroUser.attributes?.id || existingPteroUser.id;
          } else {
            const pteroUser: any = await createPteroUser(
              order.user.email,
              order.user.name || "User"
            );
            pteroUserId = pteroUser.attributes?.id || pteroUser.id;
          }

          // Save pteroId to user
          await db.user.update({
            where: { id: order.user.id },
            data: { pteroId: pteroUserId },
          });
        } catch (pteroErr) {
          console.error("Pterodactyl user creation error:", pteroErr);
          return NextResponse.json(
            { error: "Failed to create Pterodactyl user. Check panel connectivity." },
            { status: 500 }
          );
        }
      }

      // 2. Create server on Pterodactyl
      let pteroServer: any = null;
      // Default to Nest 1 (Minecraft) and Egg 2 (Paper) if not specified
      const nestId = order.product.nestId || 1;
      const eggId = order.product.eggId || 2;
      
      if (pteroUserId) {
        try {
          const ramMB = parseInt(order.product.ram) * 1024 || 2048;
          const cpuPercent = parseInt(order.product.cpu) || 100;
          const diskMB = parseInt(order.product.disk) * 1024 || 10240;

          pteroServer = await createPteroServer({
            name: `${order.product.name} - ${order.user.email}`,
            userId: pteroUserId,
            nestId: nestId,
            eggId: eggId,
            ram: ramMB,
            cpu: cpuPercent,
            disk: diskMB,
          });
        } catch (serverErr) {
          console.error("Pterodactyl server creation error:", serverErr);
          // Don't fail the order, just log
        }
      }

      // 3. Create server record in DB
      const serverAttrs = pteroServer?.attributes || pteroServer;
      const server = await db.server.create({
        data: {
          name: order.product.name,
          pteroId: serverAttrs?.id || null,
          identifier: serverAttrs?.identifier || null,
          ip: serverAttrs?.allocation?.ip || null,
          port: serverAttrs?.allocation?.port || null,
          status: pteroServer ? "ONLINE" : "PROVISIONING",
          userId: order.user.id,
        },
      });

      // 4. Create invoice
      const invoice = await db.invoice.create({
        data: {
          orderId,
          amount: order.amountINR,
          status: "PAID",
          dueDate: new Date(),
          paidAt: new Date(),
          userId: order.user.id,
        },
      });

      // 5. Update order
      const updated = await db.order.update({
        where: { id: orderId },
        data: {
          status: "COMPLETED",
          serverId: server.id,
          adminNote,
        },
        include: { server: true, invoice: true, product: true },
      });

      return NextResponse.json({ order: updated });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    if (error.message === "Unauthorized" || error.message === "Forbidden") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    console.error("Admin order action error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
