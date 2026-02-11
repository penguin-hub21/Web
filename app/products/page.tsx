"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { GlowCard } from "@/components/ui/glow-card";
import { SpotlightButton } from "@/components/ui/spotlight-button";
import { Gamepad2, Cpu, Globe, Server, Shield, ArrowRight, Zap, HardDrive } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const products = [
  {
    title: "Minecraft Hosting",
    description: "High-performance Minecraft servers powered by Intel Xeon E5 and AMD EPYC 7B13. NVMe storage, DDoS protection, and instant setup.",
    icon: Gamepad2,
    href: "/plans",
    features: ["Instant Setup", "Modpack Installer", "DDoS Protection", "NVMe SSD"],
    bg: "from-green-500/20 to-transparent",
    accent: "text-green-400",
    startingPrice: "₹60",
  },
  {
    title: "Budget Servers",
    description: "Affordable entry-level servers starting at ₹50/mo. Perfect for small communities and testing.",
    icon: Zap,
    href: "/plans",
    features: ["2-8 GB RAM", "Up to 200% CPU", "50GB NVMe", "Daily Backups"],
    bg: "from-amber-500/20 to-transparent",
    accent: "text-amber-400",
    startingPrice: "₹50",
  },
  {
    title: "VPS Hosting",
    description: "Full root access VPS powered by AMD EPYC 7763 with advanced DDoS protection and 1 Gbps bandwidth.",
    icon: Server,
    href: "/plans",
    features: ["Full Root Access", "1 Gbps Network", "Advanced DDoS", "India Location 🇮🇳"],
    bg: "from-blue-500/20 to-transparent",
    accent: "text-blue-400",
    startingPrice: "₹1,300",
  },
  {
    title: "Dedicated Servers",
    description: "Enterprise-grade dedicated hardware with Intel Xeon and AMD EPYC processors. Unmetered bandwidth.",
    icon: HardDrive,
    href: "/plans",
    features: ["Dedicated Hardware", "Unmetered BW", "Full Control", "Custom Configs"],
    bg: "from-purple-500/20 to-transparent",
    accent: "text-purple-400",
    startingPrice: "₹1,500",
  },
  {
    title: "Anti-DDoS Proxy",
    description: "Protect any server with our enterprise-grade DDoS mitigation proxy. 1GB DDR4, NVMe storage.",
    icon: Shield,
    href: "/plans",
    features: ["Layer 7 Protection", "NVMe SSD", "1 Click Setup", "India POP"],
    bg: "from-cyan-500/20 to-transparent",
    accent: "text-cyan-400",
    startingPrice: "₹99",
  },
  {
    title: "Web Hosting",
    description: "Coming soon — managed web hosting for static sites, WordPress, and Node.js applications.",
    icon: Globe,
    href: "#",
    features: ["Free SSL", "cPanel", "Auto Backups", "99.9% Uptime"],
    bg: "from-pink-500/20 to-transparent",
    accent: "text-pink-400",
    startingPrice: "Coming Soon",
    disabled: true,
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 w-[600px] h-[300px] bg-blue-500/15 blur-[100px] rounded-full -translate-x-1/2 -z-10" />
        <Container className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold font-heading mb-4 text-white tracking-tight"
          >
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Products
            </span>
          </motion.h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Enterprise-grade infrastructure at Indian pricing. Choose the perfect solution for your needs.
          </p>
        </Container>
      </section>

      <section className="pb-32">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <GlowCard className="h-full group relative overflow-hidden">
                  {/* Gradient bg */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-b ${product.bg} opacity-50 pointer-events-none`} />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-white/5 ${product.accent}`}>
                        <product.icon className="h-6 w-6" />
                      </div>
                      <span className={`text-sm font-bold ${product.accent}`}>
                        {product.startingPrice}
                        {!product.disabled && <span className="text-neutral-500 font-normal">/mo</span>}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-heading text-white mb-2">
                      {product.title}
                    </h3>
                    <p className="text-sm text-neutral-400 mb-6 leading-relaxed flex-grow">
                      {product.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {product.features.map((f) => (
                        <div
                          key={f}
                          className="text-xs text-neutral-400 flex items-center gap-1.5"
                        >
                          <div className="h-1 w-1 rounded-full bg-neutral-600" />
                          {f}
                        </div>
                      ))}
                    </div>

                    {product.disabled ? (
                      <button
                        disabled
                        className="w-full py-2.5 rounded-lg border border-white/10 text-neutral-500 text-sm cursor-not-allowed"
                      >
                        Coming Soon
                      </button>
                    ) : (
                      <Link href={product.href}>
                        <SpotlightButton className="w-full justify-center text-sm group/btn">
                          View Plans
                          <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                        </SpotlightButton>
                      </Link>
                    )}
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
