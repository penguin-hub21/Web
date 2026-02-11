"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Server } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { SpotlightButton } from "@/components/ui/spotlight-button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Plans", href: "/plans" },
  { name: "Minecraft VPS", href: "/minecraft-vps" },
  { name: "About", href: "/about" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled 
          ? "top-4 mx-4 md:mx-auto max-w-7xl rounded-full border border-white/10 bg-black/50 backdrop-blur-xl shadow-lg shadow-purple-500/10"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container className={cn("px-4", scrolled ? "md:px-8" : "")}>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 transition-transform group-hover:scale-110">
               <Image 
                 src="/logo.jpeg" 
                 alt="LumenNode Logo" 
                 fill
                 className="object-cover"
               />
              <div className="absolute inset-0 rounded-xl bg-white/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-bold font-heading tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all">
              LumenNode
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors hover:text-white",
                  pathname === item.href
                    ? "text-white"
                    : "text-neutral-400"
                )}
              >
                {pathname === item.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href="/client-area">
               <Button variant="ghost" className="text-neutral-300 hover:text-white">Log In</Button>
            </Link>
            <Link href="/plans">
               <SpotlightButton className="h-10 px-6 rounded-full border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-200">
                 Get Started
               </SpotlightButton>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-white/10"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-black/90 backdrop-blur-xl"
          >
            <Container className="py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-lg font-medium transition-colors rounded-xl",
                    pathname === item.href
                      ? "bg-purple-500/20 text-purple-200"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {item.name}
                </Link>
              ))}
               <div className="pt-6 flex flex-col gap-3">
                <Link href="/client-area" onClick={() => setIsOpen(false)}>
                   <Button variant="outline" className="w-full border-white/10 bg-transparent text-white hover:bg-white/5">Log In</Button>
                </Link>
                <Link href="/plans" onClick={() => setIsOpen(false)}>
                   <SpotlightButton className="w-full justify-center text-center">Get Started</SpotlightButton>
                </Link>
               </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
