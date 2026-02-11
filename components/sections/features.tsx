"use client";

import { Container } from "@/components/layout/container";
import { GlowCard } from "@/components/ui/glow-card";
import { Zap, Shield, Globe, Cpu, Server, Clock } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Zap,
    title: "Blazing Fast Speed",
    desc: "Powered by AMD EPYC processors and NVMe Gen 4 SSDs for instant load times and zero lag.",
    colSpan: "md:col-span-2",
    bg: "bg-gradient-to-br from-purple-500/10 to-blue-500/10"
  },
  {
    icon: Shield,
    title: "DDoS Protection",
    desc: "Enterprise-grade Path.net mitigation up to 12Tbps keeps your services online during attacks.",
    colSpan: "md:col-span-1",
    bg: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10"
  },
  {
    icon: Globe,
    title: "Global Low Latency",
    desc: "Strategically located data centers in India, Singapore, and Europe for optimal connectivity.",
    colSpan: "md:col-span-1",
    bg: "bg-gradient-to-br from-green-500/10 to-emerald-500/10"
  },
  {
    icon: Clock,
    title: "99.9% Uptime",
    desc: "Redundant power and network infrastructure ensures your server stays online 24/7/365.",
    colSpan: "md:col-span-2",
    bg: "bg-gradient-to-br from-orange-500/10 to-red-500/10"
  }
];

export function Features() {
  return (
    <section className="py-24 relative">
       <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
       
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-white">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">LumenNode</span>?
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
            We don't cut corners. Our infrastructure is built for performance, reliability, and scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className={feature.colSpan}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <GlowCard className="h-full">
                 <div className={`h-full flex flex-col items-start justify-center p-2`}>
                    <div className={`h-12 w-12 rounded-lg ${feature.bg} flex items-center justify-center mb-6`}>
                       <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white mb-3">{feature.title}</h3>
                    <p className="text-neutral-400 leading-relaxed">
                       {feature.desc}
                    </p>
                 </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
