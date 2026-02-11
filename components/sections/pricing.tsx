"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { SpotlightButton } from "@/components/ui/spotlight-button";
import { GlowCard } from "@/components/ui/glow-card";
import { Check, Cpu, HardDrive, Zap, ArrowRight, Lightbulb, Rocket, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";


import { FeaturedPlan } from "@/lib/products";

interface PricingProps {
  plans: FeaturedPlan[];
}

const ICONS_MAP: Record<string, any> = {
  "Lumen": Lightbulb,
  "Orion": Rocket,
  "Plus": Flame,
  "Pro": Zap,
};

const COLOR_MAP: Record<string, string> = {
  "Lumen": "from-amber-500/20 to-transparent",
  "Orion": "from-purple-500/20 to-transparent",
  "Plus": "from-orange-500/20 to-transparent",
  "Pro": "from-red-500/20 to-transparent",
};

const BORDER_MAP: Record<string, string> = {
  "Lumen": "hover:border-amber-500/30",
  "Orion": "border-purple-500/40 hover:border-purple-500/60",
  "Plus": "hover:border-orange-500/30",
  "Pro": "hover:border-red-500/30",
};

export function Pricing({ plans }: PricingProps) {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  
  // Fallback if no plans
  if (!plans || plans.length === 0) return null;


  return (
    <section className="py-24 relative" id="plans">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent" />
      <Container className="relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-white">
              Choose Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Power
              </span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-lg mb-8">
              From budget-friendly to enterprise-grade. India & Singapore locations.
            </p>
          </motion.div>

          {/* Currency Toggle */}
          <div className="flex justify-center mb-10">
            <div className="bg-white/5 p-1 rounded-full border border-white/10 flex">
              <button
                onClick={() => setCurrency("INR")}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all",
                  currency === "INR"
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-900/30"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                ₹ INR
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all",
                  currency === "USD"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                $ USD
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => {
            const Icon = ICONS_MAP[plan.name] || Zap;
            const colorClass = COLOR_MAP[plan.name] || "from-blue-500/20 to-transparent";
            const borderClass = BORDER_MAP[plan.name] || "hover:border-blue-500/30";
            
            return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn("h-full", plan.isPopular && "lg:-mt-4")}
            >
              <div
                className={cn(
                  "h-full relative rounded-xl border bg-black/50 backdrop-blur-xl flex flex-col p-6 group transition-all duration-300",
                  plan.isPopular
                    ? "border-purple-500 shadow-2xl shadow-purple-500/10 ring-1 ring-purple-500/20"
                    : "border-white/10",
                  borderClass
                )}
              >
                {/* Gradient bg */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-xl bg-gradient-to-b opacity-50 pointer-events-none",
                    colorClass
                  )}
                />

                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-xs font-bold text-white uppercase tracking-wider shadow-lg z-10">
                    Best Value
                  </div>
                )}

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold font-heading text-white">
                      {plan.name}
                    </h3>
                    <span className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                      <Icon className="h-6 w-6 text-white" />
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl font-bold text-white">
                      {currency === "INR"
                        ? `₹${plan.priceINR}`
                        : `$${plan.priceUSD.toFixed(2)}`}
                    </span>
                    <span className="text-sm text-neutral-500">/mo</span>
                  </div>

                  <div className="space-y-3 mb-8 flex-grow">
                    <div className="flex items-center justify-between text-sm border-b border-white/5 pb-2">
                      <span className="text-neutral-400 flex items-center gap-2">
                        <Cpu className="h-3.5 w-3.5 text-blue-400" /> RAM
                      </span>
                      <span className="font-mono text-white">{plan.ram}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm border-b border-white/5 pb-2">
                      <span className="text-neutral-400 flex items-center gap-2">
                        <Zap className="h-3.5 w-3.5 text-purple-400" /> CPU
                      </span>
                      <span className="font-mono text-white">{plan.cpu}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm border-b border-white/5 pb-2">
                      <span className="text-neutral-400 flex items-center gap-2">
                        <HardDrive className="h-3.5 w-3.5 text-green-400" />{" "}
                        Storage
                      </span>
                      <span className="font-mono text-white">
                        {plan.disk} NVMe
                      </span>
                    </div>
                    {plan.processor && (
                      <div className="flex items-center gap-2 text-xs text-emerald-400 pt-1">
                        <Check className="h-3 w-3" /> {plan.processor}
                      </div>
                    )}
                  </div>

                  <Link href={`/order?plan=${plan.name.toLowerCase()}`}>
                    <SpotlightButton className="w-full justify-center">
                      Deploy Now
                    </SpotlightButton>
                  </Link>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/plans">
            <button className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-neutral-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full transition-all group">
              View All Plans
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
