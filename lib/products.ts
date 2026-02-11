import { db } from "@/lib/db";
import { Category, Processor, Prisma } from "@prisma/client";

export type FeaturedPlan = {
  id: string;
  name: string;
  priceINR: number;
  priceUSD: number;
  ram: string;
  cpu: string;
  disk: string;
  backups: number;
  processor?: string;
  isPopular?: boolean;
};

// Initial data to seed if DB is empty, matching the homepage featured ones
const SEED_PLANS = [
  {
    name: "Lumen",
    slug: "lumen",
    category: Category.MINECRAFT_BUDGET,
    ram: "2 GB",
    cpu: "50%",
    disk: "50 GB",
    backups: 1,
    priceINR: 50,
    priceUSD: 0.60,
    isFeatured: true,
    sortOrder: 1,
  },
  {
    name: "Orion",
    slug: "orion",
    category: Category.MINECRAFT_BUDGET,
    ram: "6 GB",
    cpu: "150%",
    disk: "15 GB",
    backups: 2,
    priceINR: 140,
    priceUSD: 1.68,
    isFeatured: true,
    sortOrder: 2,
  },
  {
    name: "Plus",
    slug: "plus-intel",
    category: Category.MINECRAFT_INTEL,
    ram: "8 GB",
    cpu: "200%",
    disk: "25 GB",
    backups: 2,
    priceINR: 240,
    priceUSD: 2.88,
    processor: Processor.INTEL,
    isFeatured: true,
    sortOrder: 3,
  },
  {
    name: "Pro",
    slug: "pro-amd",
    category: Category.MINECRAFT_AMD,
    ram: "12 GB",
    cpu: "250%",
    disk: "38 GB",
    backups: 3,
    priceINR: 650,
    priceUSD: 7.80,
    processor: Processor.AMD,
    isFeatured: true,
    sortOrder: 4,
  },
];

export async function getFeaturedPlans(): Promise<FeaturedPlan[]> {
  try {
    const count = await db.product.count();

    if (count === 0) {
      console.log("Seeding default products...");
      for (const plan of SEED_PLANS) {
        await db.product.create({
          data: {
             ...plan,
             description: `${plan.name} Plan`,
             stock: -1,
             isActive: true,
             location: "India"
          }
        });
      }
    }

    const products = await db.product.findMany({
      where: {
        isFeatured: true,
        isActive: true,
      },
      orderBy: {
        sortOrder: "asc",
      },
    });

    return products.map(p => ({
      id: p.id,
      name: p.name,
      priceINR: p.priceINR,
      priceUSD: p.priceUSD || 0,
      ram: p.ram,
      cpu: p.cpu,
      disk: p.disk,
      backups: p.backups,
      processor: p.processor === "INTEL" ? "Intel Xeon E5" : p.processor === "AMD" ? "AMD EPYC 7B13" : undefined,
      isPopular: p.name === "Orion" || p.name === "Pro" // Logic can be improved
    }));
  } catch (error) {
    console.error("Error fetching featured plans:", error);
    return [];
  }
}
