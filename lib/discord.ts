
import { type Plan } from "./plans-data";

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1471049401068683379/VxwZKQdyue87Jft8vX3Cefl_TY9EnhU_SjfuC_xZ7_OeMOBlUDdfRj3NPR2Bk4WiPKuT";
const ADMIN_ROLE_ID = "1471067575239577837";

export async function sendOrderWebhook(order: any, user: any, plan: any) {
  const embed = {
    title: "🚀 New Order Placed!",
    color: 0x9333ea, // Purple
    timestamp: new Date().toISOString(),
    footer: {
      text: "LumenNodes System",
      icon_url: "https://lumen-web.vercel.app/logo.jpeg" // Assuming this exists or using a placeholder
    },
    thumbnail: {
        url: "https://lumen-web.vercel.app/logo.jpeg"
    },
    fields: [
      {
        name: "👤 Customer",
        value: `${user.name || "Unknown"} (${user.email})`,
        inline: true
      },
      {
        name: "📦 Plan",
        value: plan.name,
        inline: true
      },
      {
        name: "💰 Amount",
        value: `₹${order.amountINR}`,
        inline: true
      },
      {
        name: "🆔 Order ID",
        value: `\`${order.id}\``,
        inline: false
      },
       {
        name: "HARDWARE",
        value: `${plan.ram} / ${plan.cpu} / ${plan.disk}`,
        inline: false
      }
    ]
  };

  const body = {
    content: `<@&${ADMIN_ROLE_ID}> A new order is waiting for approval!`,
    embeds: [embed],
    username: "LumenNodes Bot",
    avatar_url: "https://lumen-web.vercel.app/logo.jpeg"
  };

  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error("Failed to send Discord webhook:", error);
  }
}
