import { NextResponse } from "next/server";

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1471049401068683379/VxwZKQdyue87Jft8vX3Cefl_TY9EnhU_SjfuC_xZ7_OeMOBlUDdfRj3NPR2Bk4WiPKuT";

export async function POST(req: Request) {
  try {
    const event = req.headers.get("x-github-event");
    const payload = await req.json();

    let messageContent = `Received GitHub event: ${event}`;
    let embedColor = 0x7289da; // Blurple

    // Custom formatting for common events
    if (event === "push") {
      const pusher = payload.pusher.name;
      const ref = payload.ref.replace("refs/heads/", "");
      const compareUrl = payload.compare;
      
      messageContent = ""; // Clear content to use embed
      
      const embed = {
        title: `[${payload.repository.name}:${ref}] ${payload.commits.length} new commit(s)`,
        url: compareUrl,
        description: payload.commits.map((c: any) => `[\`${c.id.substring(0, 7)}\`](${c.url}) ${c.message} - ${c.author.name}`).join("\n"),
        color: embedColor,
        author: {
          name: pusher,
          icon_url: payload.sender.avatar_url
        },
        footer: {
            text: "LumenNode GitHub Integration"
        },
        timestamp: new Date().toISOString()
      };

      await sendDiscordWebhook({ embeds: [embed] });
    } else {
        // Fallback for other events
       await sendDiscordWebhook({ content: `**GitHub Event:** \`${event}\`\n\`\`\`json\n${JSON.stringify(payload, null, 2).substring(0, 1000)}\n\`\`\`` });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

async function sendDiscordWebhook(data: any) {
    if (!DISCORD_WEBHOOK_URL) return;
    
    await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
}
