"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { GlowCard } from "@/components/ui/glow-card";
import { SpotlightButton } from "@/components/ui/spotlight-button";
import { Button } from "@/components/ui/button";
import {
  Check,
  Cpu,
  HardDrive,
  Server,
  Shield,
  Network,
  Zap,
  Globe,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { vpsPlans, dedicatedPlans, formatPrice } from "@/lib/plans-data";

export default function MinecraftVPSPage() {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 w-[800px] h-[400px] bg-green-500/10 blur-[120px] rounded-full -translate-x-1/2 -z-10" />
        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1 text-sm text-green-200"
          >
            <span className="h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse" />
            India & Singapore Locations
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold font-heading mb-4 text-white"
          >
            Minecraft{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
              VPS
            </span>{" "}
            Hosting
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-neutral-400 max-w-2xl mx-auto mb-8"
          >
            Enterprise VPS and dedicated servers with NVMe SSD, full root access,
            and advanced DDoS protection. Powered by AMD EPYC processors.
          </motion.p>

          <div className="flex justify-center mb-8">
            <div className="bg-white/5 p-1 rounded-full border border-white/10 flex">
              <button
                onClick={() => setCurrency("INR")}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all",
                  currency === "INR" ? "bg-green-600 text-white shadow-lg" : "text-neutral-400"
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
        </Container>
      </section>

      {/* Features */}
      <section className="py-16 border-y border-white/5">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: HardDrive, label: "NVMe SSD", desc: "Ultra-fast storage" },
              { icon: Shield, label: "DDoS Protection", desc: "Enterprise-grade" },
              { icon: Cpu, label: "AMD EPYC", desc: "Latest processors" },
              { icon: Network, label: "1 Gbps", desc: "Network uplink" },
            ].map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center mx-auto mb-3 text-green-400">
                  <f.icon className="h-6 w-6" />
                </div>
                <p className="text-white font-bold">{f.label}</p>
                <p className="text-xs text-neutral-500">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* VPS Plans */}
      <section className="py-24">
        <Container>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-center mb-4 text-white">
            Compare Specifications
          </h2>
          <p className="text-neutral-400 text-center mb-12 max-w-xl mx-auto">
            High-performance VPS with full root access and dedicated resources.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* VPS Plans */}
            {vpsPlans.map((plan) => (
              <GlowCard key={plan.slug} className="p-0 overflow-hidden border-green-500/30">
                <div className="p-8 bg-gradient-to-br from-green-500/10 to-transparent">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold font-heading text-white">
                        {plan.name}
                      </h3>
                      <p className="text-neutral-400 text-sm mt-1">{plan.processor}</p>
                    </div>
                    {plan.stock !== undefined && (
                      <div
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-bold border",
                          plan.stock > 0
                            ? "bg-green-500/20 text-green-400 border-green-500/30 animate-pulse"
                            : "bg-red-500/20 text-red-400 border-red-500/30"
                        )}
                      >
                        {plan.stock > 0 ? `${plan.stock} Available` : "OUT OF STOCK"}
                      </div>
                    )}
                  </div>

                  {plan.location && (
                    <p className="text-green-400 font-medium text-sm mb-4">{plan.location}</p>
                  )}

                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-bold text-white">
                      {formatPrice(plan.priceINR, currency)}
                    </span>
                    <span className="text-neutral-400">/mo</span>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-neutral-300">
                      <Cpu className="h-5 w-5 text-neutral-500" />
                      {plan.cpu}
                    </div>
                    <div className="flex items-center gap-3 text-neutral-300">
                      <Server className="h-5 w-5 text-neutral-500" />
                      {plan.ram} RAM
                    </div>
                    <div className="flex items-center gap-3 text-neutral-300">
                      <HardDrive className="h-5 w-5 text-neutral-500" />
                      {plan.disk}
                    </div>
                    {plan.extras?.map((e, j) => (
                      <div key={j} className="flex items-center gap-3 text-neutral-300">
                        <Check className="h-5 w-5 text-green-500" />
                        {e}
                      </div>
                    ))}
                  </div>

                  {plan.stock === 0 ? (
                    <Button disabled className="w-full">Out of Stock</Button>
                  ) : (
                    <Link href={`/order?plan=${plan.slug}`}>
                      <SpotlightButton className="w-full justify-center">
                        Deploy Now
                      </SpotlightButton>
                    </Link>
                  )}
                </div>
              </GlowCard>
            ))}

            {/* Dedicated Plans */}
            {dedicatedPlans.map((plan) => (
              <GlowCard key={plan.slug} className="p-0 overflow-hidden">
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold font-heading text-white">
                        {plan.name}
                      </h3>
                      <p className="text-neutral-400 text-sm mt-1">{plan.processor}</p>
                    </div>
                    <div
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold border",
                        plan.stock === 0
                          ? "bg-red-500/20 text-red-400 border-red-500/30"
                          : "bg-green-500/20 text-green-400 border-green-500/30"
                      )}
                    >
                      {plan.stock === 0 ? "OUT OF STOCK" : `${plan.stock} Available`}
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-bold text-white">
                      {formatPrice(plan.priceINR, currency)}
                    </span>
                    <span className="text-neutral-400">/mo</span>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-neutral-300">
                      <Cpu className="h-5 w-5 text-neutral-500" />
                      {plan.cpu}
                    </div>
                    <div className="flex items-center gap-3 text-neutral-300">
                      <Server className="h-5 w-5 text-neutral-500" />
                      {plan.ram}
                    </div>
                    <div className="flex items-center gap-3 text-neutral-300">
                      <HardDrive className="h-5 w-5 text-neutral-500" />
                      {plan.disk}
                    </div>
                    {plan.extras?.map((e, j) => (
                      <div key={j} className="flex items-center gap-3 text-neutral-300">
                        <Check className="h-5 w-5 text-neutral-500" />
                        {e}
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

          {/* CTA */}
          <div className="text-center mt-16">
            <Link href="/plans">
              <SpotlightButton className="h-14 px-8 text-base">
                View All Plans <ArrowRight className="ml-2 h-4 w-4" />
              </SpotlightButton>
            </Link>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
