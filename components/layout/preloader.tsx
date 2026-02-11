"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LumenLoader from "@/components/ui/loaders/lumen-loader";
import { AnimatePresence, motion } from "framer-motion";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500); // 3.5s duration to show off the animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
            key="preloader"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 z-[9999] bg-black"
        >
          <LumenLoader />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
