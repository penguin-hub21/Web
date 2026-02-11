import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendOrderWebhook } from "@/lib/discord";

// Create an order
export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId, planSlug, planName, amountINR } = await req.json();

    if (!amountINR || !planName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create a product record on-the-fly if not using DB products
    let resolvedProductId = productId;
    let product = null;

    if (!resolvedProductId && planSlug) {
      product = await db.product.findUnique({ where: { slug: planSlug } });
      if (!product) {
        product = await db.product.create({
          data: {
            name: planName,
            slug: planSlug,
            category: "MINECRAFT_BUDGET",
            ram: "N/A",
            cpu: "N/A",
            disk: "N/A",
            priceINR: amountINR,
          },
        });
      }
      resolvedProductId = product.id;
    } else if (resolvedProductId) {
       product = await db.product.findUnique({ where: { id: resolvedProductId } });
    }

    const order = await db.order.create({
      data: {
        userId: session.userId,
        productId: resolvedProductId,
        amountINR,
        status: "PENDING_PAYMENT",
      },
      include: { product: true },
    });

    // Send Discord Webhook
    // Resolve plan details for the webhook
    const allPlans = [...minecraftPlans, ...vpsPlans, ...dedicatedPlans, proxyPlan, ...discordBotPlans];
    const planDetails = allPlans.find(p => p.slug === planSlug) || { 
      name: planName, 
      ram: product.ram + "MB", 
      cpu: product.cpu + "%", 
      disk: product.disk + "MB" 
    };

    try {
        await sendOrderWebhook(order, session, planDetails);
    } catch (err) {
        console.error("Webhook error:", err);
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// List user's orders
export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await db.order.findMany({
      where: { userId: session.userId },
      include: { product: true, server: true, invoice: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("List orders error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
