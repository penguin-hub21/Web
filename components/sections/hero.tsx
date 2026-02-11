"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SpotlightButton } from "@/components/ui/spotlight-button";
import { Container } from "@/components/layout/container";
import { motion, useScroll, useTransform } from "framer-motion";
import { Typewriter } from "@/components/ui/typewriter"; // We'll create this next
import { ArrowRight, Terminal } from "lucide-react";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 bg-background">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-500 opacity-20 blur-[100px]"></div>
        <div className="absolute right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]"></div>
      </div>

      <Container className="relative z-10 flex flex-col items-center text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="mb-8 inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-200 backdrop-blur-sm"
        >
          <span className="flex h-2 w-2 rounded-full bg-purple-400 mr-2 animate-pulse"></span>
          Now Available: Dubai & Singapore Locations
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl text-5xl font-extrabold tracking-tight font-heading sm:text-6xl md:text-7xl lg:text-8xl mb-6 text-white"
        >
          Forged for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Performance</span>. <br />
          Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Speed</span>.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl text-lg text-neutral-400 mb-10 md:text-xl leading-relaxed"
        >
          Experience the next generation of server hosting. 
          Unmatched Ryzen 9 performance, 10Gbps uplink, and 
          path.net DDoS protection. Starting at just <span className="text-white font-semibold">₹50/mo</span>.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Link href="/plans">
            <SpotlightButton className="h-14 px-8 text-base">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </SpotlightButton>
          </Link>
          <Link href="/#pricing">
            <Button size="lg" variant="outline" className="h-14 px-8 text-base border-white/10 bg-white/5 hover:bg-white/10 text-white">
              View Pricing
            </Button>
          </Link>
        </motion.div>

        {/* Control Panel Preview */}
        <motion.div
           style={{ y, opacity }}
           className="mt-20 w-full max-w-5xl rounded-xl border border-white/10 bg-black/50 backdrop-blur-xl shadow-2xl shadow-purple-500/10 overflow-hidden"
        >
          <Image 
            src="/control_panel.png" 
            alt="LumenNode Control Panel" 
            width={1200} 
            height={675} 
            className="w-full h-auto"
            priority
          />
        </motion.div>
      </Container>
    </section>
  );
}
