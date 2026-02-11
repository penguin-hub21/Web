// ─── All LumenNodes Plans (Real Data) ───

export interface Plan {
  name: string;
  slug: string;
  category: "discord-bot" | "minecraft-intel" | "minecraft-amd" | "proxy" | "vps" | "dedicated";
  ram: string;
  cpu: string;
  disk: string;
  backups?: number;
  priceINR: number;
  priceUSD?: number;
  processor?: "Intel Xeon E5" | "AMD EPYC 7B13" | "AMD EPYC 7763" | "AMD EPYC 7R13";
  stock?: number; // -1 = unlimited
  location?: string;
  badge?: string;
  popular?: boolean;
  extras?: string[];
}

// ─── Anti-DDoS Proxy ───
export const proxyPlan: Plan = {
  name: "Anti-DDoS Proxy",
  slug: "anti-ddos-proxy",
  category: "proxy",
  ram: "1GB DDR4 @ 3200MHz",
  cpu: "80%",
  disk: "5GB NVMe SSD",
  priceINR: 99,
  priceUSD: 1.19,
  location: "India",
};

// ─── Discord Bot Plans (Lumen/Nebula/Orion/Zenith) ───
export const discordBotPlans: Plan[] = [
  {
    name: "Lumen",
    slug: "lumen",
    category: "discord-bot",
    ram: "2 GB",
    cpu: "50%",
    disk: "50 GB",
    backups: 1,
    priceINR: 50,
    priceUSD: 0.60,
  },
  {
    name: "Nebula",
    slug: "nebula",
    category: "discord-bot",
    ram: "4 GB",
    cpu: "100%",
    disk: "10 GB",
    backups: 1,
    priceINR: 80,
    priceUSD: 0.96,
  },
  {
    name: "Orion",
    slug: "orion",
    category: "discord-bot",
    ram: "6 GB",
    cpu: "150%",
    disk: "15 GB",
    backups: 2,
    priceINR: 140,
    priceUSD: 1.68,
    popular: true,
  },
  {
    name: "Zenith",
    slug: "zenith",
    category: "discord-bot",
    ram: "8 GB",
    cpu: "200%",
    disk: "25 GB",
    backups: 2,
    priceINR: 180,
    priceUSD: 2.16,
  },
];

// ─── Minecraft Server Plans (Intel + AMD variants) ───
export const minecraftPlans: { name: string; slug: string; ram: string; cpu: string; disk: string; intelPrice: number; amdPrice: number; popular?: boolean; badge?: string }[] = [
  { name: "Starter", slug: "starter", ram: "2 GB", cpu: "70%", disk: "6 GB", intelPrice: 60, amdPrice: 160, badge: "🌱" },
  { name: "Basic", slug: "basic", ram: "4 GB", cpu: "100%", disk: "12 GB", intelPrice: 120, amdPrice: 200, badge: "⚡" },
  { name: "Plus", slug: "plus", ram: "8 GB", cpu: "200%", disk: "25 GB", intelPrice: 240, amdPrice: 440, popular: true, badge: "🔥" },
  { name: "Pro", slug: "pro", ram: "12 GB", cpu: "250%", disk: "38 GB", intelPrice: 440, amdPrice: 650, badge: "💥" },
  { name: "Advanced", slug: "advanced", ram: "16 GB", cpu: "300%", disk: "50 GB", intelPrice: 560, amdPrice: 850, badge: "🌌" },
  { name: "Elite", slug: "elite", ram: "22 GB", cpu: "400%", disk: "70 GB", intelPrice: 660, amdPrice: 1210, badge: "⚔️" },
  { name: "Ultra", slug: "ultra", ram: "24 GB", cpu: "490%", disk: "75 GB", intelPrice: 730, amdPrice: 1300, badge: "🌟" },
  { name: "Extreme", slug: "extreme", ram: "32 GB", cpu: "580%", disk: "80 GB", intelPrice: 1280, amdPrice: 1920, badge: "🐉" },
  { name: "Ultimate", slug: "ultimate", ram: "64 GB", cpu: "800%", disk: "150 GB", intelPrice: 2560, amdPrice: 3840, badge: "🌩️" },
];

// ─── VPS Plans ───
export const vpsPlans: Plan[] = [
  {
    name: "AMD EPYC 7763 VPS",
    slug: "vps-epyc-7763",
    category: "vps",
    ram: "32GB",
    cpu: "4 vCores",
    disk: "256GB SSD",
    priceINR: 1300,
    priceUSD: 15.60,
    processor: "AMD EPYC 7763",
    stock: 1,
    location: "India 🇮🇳",
    badge: "🔥 Limited",
    extras: ["3TB Bandwidth (1 Gbps)", "Advanced DDoS Protection"],
  },
];

// ─── Dedicated Servers ───
export const dedicatedPlans: Plan[] = [
  {
    name: "Intel Xeon E5-2690 v4",
    slug: "dedi-xeon-e5",
    category: "dedicated",
    ram: "64 GB ECC",
    cpu: "12 Core",
    disk: "200 GB NVMe SSD",
    priceINR: 1500,
    priceUSD: 18,
    processor: "Intel Xeon E5",
    stock: 0,
    extras: ["Unmetered Bandwidth"],
  },
  {
    name: "AMD EPYC 7R13",
    slug: "dedi-epyc-7r13",
    category: "dedicated",
    ram: "32 GB",
    cpu: "8 Cores (3.7 GHz Boost)",
    disk: "Unmetered",
    priceINR: 2500,
    priceUSD: 30,
    processor: "AMD EPYC 7R13",
    stock: 0,
    extras: ["4Gb Uplink Speed"],
  },
];

// ─── Currency conversion (approx) ───
export const INR_TO_USD = 0.012;

export function formatPrice(amountINR: number, currency: "INR" | "USD" = "INR"): string {
  if (currency === "USD") {
    return `$${(amountINR * INR_TO_USD).toFixed(2)}`;
  }
  return `₹${amountINR.toLocaleString("en-IN")}`;
}
