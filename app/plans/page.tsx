"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { SpotlightButton } from "@/components/ui/spotlight-button";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/glow-card";
import { Check, Cpu, HardDrive, Zap, Shield, Server, Network, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  budgetPlans,
  minecraftPlans,
  vpsPlans,
  dedicatedPlans,
  proxyPlan,
  formatPrice,
} from "@/lib/plans-data";

type Tab = "minecraft" | "budget" | "vps" | "dedicated";

export default function PlansPage() {
  const [activeTab, setActiveTab] = useState<Tab>("minecraft");
  const [processor, setProcessor] = useState<"intel" | "amd">("intel");
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 w-[800px] h-[400px] bg-purple-500/15 blur-[120px] rounded-full -translate-x-1/2 -z-10" />
        <Container className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold font-heading mb-4 text-white tracking-tight"
          >
            Server{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Plans
            </span>
          </motion.h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto mb-8">
            From ₹50/mo budget servers to enterprise AMD EPYC dedicated machines. India & Singapore.
          </p>

          {/* Currency Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/5 p-1 rounded-full border border-white/10 flex">
              <button
                onClick={() => setCurrency("INR")}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all",
                  currency === "INR" ? "bg-purple-600 text-white shadow-lg" : "text-neutral-400"
                )}
              >
                ₹ INR
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all",
                  currency === "USD" ? "bg-blue-600 text-white shadow-lg" : "text-neutral-400"
                )}
              >
                $ USD
              </button>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center flex-wrap gap-2">
            {([
              { key: "minecraft", label: "⚔️ Minecraft", count: minecraftPlans.length },
              { key: "budget", label: "💡 Budget", count: budgetPlans.length },
              { key: "vps", label: "🖥️ VPS", count: vpsPlans.length },
              { key: "dedicated", label: "⚡ Dedicated", count: dedicatedPlans.length },
            ] as const).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "px-5 py-2.5 rounded-lg text-sm font-medium transition-all border",
                  activeTab === tab.key
                    ? "bg-white/10 border-white/20 text-white shadow-lg"
                    : "border-transparent text-neutral-400 hover:text-white hover:bg-white/5"
                )}
              >
                {tab.label}{" "}
                <span className="ml-1 text-xs opacity-50">({tab.count})</span>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Plans Grid */}
      <section className="pb-24">
        <Container>
          <AnimatePresence mode="wait">
            {/* ─── MINECRAFT PLANS ─── */}
            {activeTab === "minecraft" && (
              <motion.div
                key="minecraft"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Processor Toggle */}
                <div className="flex justify-center gap-3 mb-10">
                  <div className="bg-black/40 p-1 rounded-lg border border-white/10 flex gap-2">
                    <button
                      onClick={() => setProcessor("intel")}
                      className={cn(
                        "px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all border",
                        processor === "intel"
                          ? "bg-blue-900/30 border-blue-500/50 text-blue-200"
                          : "border-transparent text-neutral-400 hover:text-white"
                      )}
                    >
                      <Cpu className="h-4 w-4" /> Intel Xeon E5
                    </button>
                    <button
                      onClick={() => setProcessor("amd")}
                      className={cn(
                        "px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all border",
                        processor === "amd"
                          ? "bg-red-900/30 border-red-500/50 text-red-200"
                          : "border-transparent text-neutral-400 hover:text-white"
                      )}
                    >
                      <Zap className="h-4 w-4" /> AMD EPYC 7B13
                    </button>
                  </div>
                </div>

                {/* Anti-DDoS Proxy Card */}
                <div className="mb-8">
                  <GlowCard className="p-0 overflow-hidden border-cyan-500/30 max-w-lg mx-auto">
                    <div className="p-6 bg-gradient-to-r from-cyan-500/10 to-transparent flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Shield className="h-5 w-5 text-cyan-400" />
                          <h3 className="text-lg font-bold text-white">Anti-DDoS Proxy</h3>
                        </div>
                        <p className="text-xs text-neutral-400">
                          {proxyPlan.ram} • {proxyPlan.cpu} CPU • {proxyPlan.disk}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-white">
                          {formatPrice(proxyPlan.priceINR, currency)}
                        </span>
                        <span className="text-neutral-400 text-sm">/mo</span>
                      </div>
                    </div>
                  </GlowCard>
                </div>

                {/* Plan Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {minecraftPlans.map((plan, i) => {
                    const price = processor === "intel" ? plan.intelPrice : plan.amdPrice;
                    return (
                      <motion.div
                        key={plan.slug}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.04 }}
                        className={cn("h-full", plan.popular && "lg:-mt-3")}
                      >
                        <div
                          className={cn(
                            "h-full rounded-xl border bg-black/50 backdrop-blur-xl flex flex-col p-5 group transition-all duration-300 relative overflow-hidden",
                            plan.popular
                              ? "border-purple-500/60 shadow-xl shadow-purple-500/10 ring-1 ring-purple-500/20"
                              : "border-white/10 hover:border-white/20"
                          )}
                        >
                          {plan.popular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-[10px] font-bold text-white uppercase tracking-wider shadow-lg z-10">
                              Most Popular
                            </div>
                          )}

                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
                              <span className="text-lg">{plan.badge}</span> {plan.name}
                            </h3>
                          </div>

                          <div className="flex items-baseline gap-1 mb-5">
                            <span
                              className={cn(
                                "text-2xl font-bold transition-colors",
                                processor === "intel" ? "text-blue-400" : "text-red-400"
                              )}
                            >
                              {formatPrice(price, currency)}
                            </span>
                            <span className="text-xs text-neutral-500">/mo</span>
                          </div>

                          <div className="space-y-2.5 mb-6 flex-grow text-sm">
                            <div className="flex items-center justify-between pb-2 border-b border-white/5">
                              <span className="text-neutral-400">RAM</span>
                              <span className="font-mono text-white">{plan.ram}</span>
                            </div>
                            <div className="flex items-center justify-between pb-2 border-b border-white/5">
                              <span className="text-neutral-400">CPU</span>
                              <span className="font-mono text-white">{plan.cpu}</span>
                            </div>
                            <div className="flex items-center justify-between pb-2 border-b border-white/5">
                              <span className="text-neutral-400">Storage</span>
                              <span className="font-mono text-white">{plan.disk} NVMe</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-emerald-400 pt-1">
                              <Check className="h-3 w-3" />
                              {processor === "intel" ? "Intel Xeon E5" : "AMD EPYC 7B13"}
                            </div>
                          </div>

                          <Link href={`/order?plan=${plan.slug}&processor=${processor}`}>
                            <Button
                              className={cn(
                                "w-full transition-all",
                                plan.popular
                                  ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-900/20"
                                  : "bg-white/10 hover:bg-white/20 text-white"
                              )}
                            >
                              Deploy Server
                            </Button>
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ─── BUDGET PLANS ─── */}
            {activeTab === "budget" && (
              <motion.div
                key="budget"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {budgetPlans.map((plan, i) => (
                    <motion.div
                      key={plan.slug}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <GlowCard className="h-full flex flex-col relative overflow-hidden group">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold font-heading text-white">{plan.name}</h3>
                          <div className="flex items-baseline gap-1 mt-2">
                            <span className="text-3xl font-bold text-white">
                              {formatPrice(plan.priceINR, currency)}
                            </span>
                            <span className="text-sm text-neutral-500">/mo</span>
                          </div>
                        </div>
                        <div className="space-y-3 mb-8 flex-grow">
                          <div className="flex items-center gap-3 text-sm text-neutral-300">
                            <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-400">
                              <Cpu className="h-4 w-4" />
                            </div>
                            {plan.ram} RAM
                          </div>
                          <div className="flex items-center gap-3 text-sm text-neutral-300">
                            <div className="p-1.5 rounded-md bg-purple-500/10 text-purple-400">
                              <Zap className="h-4 w-4" />
                            </div>
                            {plan.cpu} CPU
                          </div>
                          <div className="flex items-center gap-3 text-sm text-neutral-300">
                            <div className="p-1.5 rounded-md bg-green-500/10 text-green-400">
                              <HardDrive className="h-4 w-4" />
                            </div>
                            {plan.disk} NVMe
                          </div>
                          <div className="flex items-center gap-2 text-xs text-neutral-400">
                            <Check className="h-3 w-3 text-emerald-400" />
                            {plan.backups} Backup{plan.backups! > 1 ? "s" : ""}
                          </div>
                        </div>
                        <Link href={`/order?plan=${plan.slug}`}>
                          <SpotlightButton className="w-full justify-center">
                            Deploy Now
                          </SpotlightButton>
                        </Link>
                      </GlowCard>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ─── VPS PLANS ─── */}
            {activeTab === "vps" && (
              <motion.div
                key="vps"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {vpsPlans.map((plan) => (
                    <GlowCard
                      key={plan.slug}
                      className="p-0 overflow-hidden border-green-500/30"
                    >
                      <div className="p-8 bg-gradient-to-br from-green-500/10 to-transparent">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-bold font-heading text-white">
                              {plan.name}
                            </h3>
                            <p className="text-green-400 font-medium text-sm">
                              {plan.location}
                            </p>
                          </div>
                          {plan.stock !== undefined && plan.stock > 0 && (
                            <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold border border-green-500/30 animate-pulse">
                              STOCK: {plan.stock}/2
                            </div>
                          )}
                          {plan.stock === 0 && (
                            <div className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/30">
                              OUT OF STOCK
                            </div>
                          )}
                        </div>

                        <div className="flex items-baseline gap-2 mb-6">
                          <span className="text-4xl font-bold text-white">
                            {formatPrice(plan.priceINR, currency)}
                          </span>
                          <span className="text-neutral-400">/mo</span>
                        </div>

                        <div className="space-y-3 mb-8">
                          <div className="flex items-center gap-3 text-sm text-neutral-300">
                            <Cpu className="h-5 w-5 text-neutral-500" />
                            <span>{plan.cpu}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-neutral-300">
                            <Server className="h-5 w-5 text-neutral-500" />
                            <span>{plan.ram} RAM</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-neutral-300">
                            <HardDrive className="h-5 w-5 text-neutral-500" />
                            <span>{plan.disk}</span>
                          </div>
                          {plan.extras?.map((extra, j) => (
                            <div
                              key={j}
                              className="flex items-center gap-3 text-sm text-neutral-300"
                            >
                              <Check className="h-5 w-5 text-green-500" />
                              <span>{extra}</span>
                            </div>
                          ))}
                        </div>

                        {plan.stock === 0 ? (
                          <Button
                            variant="outline"
                            disabled
                            className="w-full border-white/10 text-neutral-500"
                          >
                            Out of Stock
                          </Button>
                        ) : (
                          <Link href={`/order?plan=${plan.slug}`}>
                            <SpotlightButton className="w-full justify-center">
                              Deploy Server
                            </SpotlightButton>
                          </Link>
                        )}
                      </div>
                    </GlowCard>
                  ))}

                  {/* Dedicated VPS Offer */}
                  {dedicatedPlans.map((plan) => (
                    <GlowCard key={plan.slug} className="p-0 overflow-hidden">
                      <div className="p-8">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-bold font-heading text-white">
                              {plan.name}
                            </h3>
                            <p className="text-neutral-400 text-sm">{plan.processor}</p>
                          </div>
                          <div
                            className={cn(
                              "px-3 py-1 rounded-full text-xs font-bold border",
                              plan.stock === 0
                                ? "bg-red-500/20 text-red-400 border-red-500/30"
                                : "bg-green-500/20 text-green-400 border-green-500/30 animate-pulse"
                            )}
                          >
                            {plan.stock === 0
                              ? "OUT OF STOCK"
                              : `STOCK: ${plan.stock}`}
                          </div>
                        </div>

                        <div className="flex items-baseline gap-2 mb-6">
                          <span className="text-4xl font-bold text-white">
                            {formatPrice(plan.priceINR, currency)}
                          </span>
                          <span className="text-neutral-400">/mo</span>
                        </div>

                        <div className="space-y-3 mb-8">
                          <div className="flex items-center gap-3 text-sm text-neutral-300">
                            <Cpu className="h-5 w-5 text-neutral-500" />
                            <span>{plan.cpu}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-neutral-300">
                            <Server className="h-5 w-5 text-neutral-500" />
                            <span>{plan.ram} RAM</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-neutral-300">
                            <HardDrive className="h-5 w-5 text-neutral-500" />
                            <span>{plan.disk}</span>
                          </div>
                          {plan.extras?.map((extra, j) => (
                            <div
                              key={j}
                              className="flex items-center gap-3 text-sm text-neutral-300"
                            >
                              <Check className="h-5 w-5 text-neutral-500" />
                              <span>{extra}</span>
                            </div>
                          ))}
                        </div>

                        {plan.stock === 0 ? (
                          <Button
                            variant="outline"
                            disabled
                            className="w-full border-white/10 text-neutral-500"
                          >
                            Out of Stock
                          </Button>
                        ) : (
                          <Link href={`/order?plan=${plan.slug}`}>
                            <SpotlightButton className="w-full justify-center">
                              Deploy Server
                            </SpotlightButton>
                          </Link>
                        )}
                      </div>
                    </GlowCard>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ─── DEDICATED PLANS ─── */}
            {activeTab === "dedicated" && (
              <motion.div
                key="dedicated"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {dedicatedPlans.map((plan) => (
                    <GlowCard key={plan.slug} className="p-0 overflow-hidden">
                      <div className="p-8">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-bold font-heading text-white">
                              {plan.name}
                            </h3>
                            <p className="text-neutral-400 text-sm">{plan.processor}</p>
                          </div>
                          <div
                            className={cn(
                              "px-3 py-1 rounded-full text-xs font-bold border",
                              plan.stock === 0
                                ? "bg-red-500/20 text-red-400 border-red-500/30"
                                : "bg-green-500/20 text-green-400 border-green-500/30"
                            )}
                          >
                            {plan.stock === 0 ? "OUT OF STOCK" : `STOCK: ${plan.stock}`}
                          </div>
                        </div>

                        <div className="flex items-baseline gap-2 mb-6">
                          <span className="text-4xl font-bold text-white">
                            {formatPrice(plan.priceINR, currency)}
                          </span>
                          <span className="text-neutral-400">/mo</span>
                        </div>

                        <div className="space-y-3 mb-8">
                          <div className="flex items-center gap-3 text-sm text-neutral-300">
                            <Cpu className="h-5 w-5 text-neutral-500" />
                            <span>{plan.cpu}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-neutral-300">
                            <Server className="h-5 w-5 text-neutral-500" />
                            <span>{plan.ram}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-neutral-300">
                            <HardDrive className="h-5 w-5 text-neutral-500" />
                            <span>{plan.disk}</span>
                          </div>
                          {plan.extras?.map((extra, j) => (
                            <div
                              key={j}
                              className="flex items-center gap-3 text-sm text-neutral-300"
                            >
                              <Check className="h-5 w-5 text-neutral-500" />
                              <span>{extra}</span>
                            </div>
                          ))}
                        </div>

                        <Button
                          variant="outline"
                          disabled={plan.stock === 0}
                          className="w-full border-white/10 text-neutral-400"
                        >
                          {plan.stock === 0 ? "Out of Stock" : "Contact via Ticket"}
                        </Button>
                      </div>
                    </GlowCard>
                  ))}
                </div>

                <p className="text-center text-neutral-500 text-sm mt-8">
                  💬 Contact us via ticket to secure dedicated hardware.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
