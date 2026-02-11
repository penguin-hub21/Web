"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const GlowCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-white/10 bg-gray-900/50 p-1 backdrop-blur-3xl overflow-hidden group",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" 
           style={{ backgroundSize: '200% 100%' }}
      />
      <div className="relative h-full w-full rounded-lg bg-gray-950/90 p-4">
        {children}
      </div>
    </div>
  );
};
