"use client";

import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Minecraft Server Owner",
    content: "The performance is unreal. We have 100+ players on our SMP and zero lag. Support is also super fast.",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: "DevOps Engineer",
    content: "Finally a host that delivers what they promise. The NVMe speeds are noticeable and the dashboard is sleek.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Game Studio Lead",
    content: "LumenNode's DDoS protection saved our launch. We were hit with 50Gbps and didn't even drop a packet.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Freelance Developer",
    content: "Best price to performance ratio I've found. The Ryzen 9s destroy the Xeons I used to use.",
    rating: 5,
  },
   {
    name: "Emily Davis",
    role: "Startup Founder",
    content: "Reliable, fast, and affordable. LumenNode has been the perfect partner for our growing infrastructure.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 overflow-hidden relative border-t border-white/5 bg-black/50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-white">
            Trusted by <span className="text-purple-400">Creators</span>
          </h2>
        </div>
      </Container>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row w-full max-w-7xl">
          <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row min-w-full group-hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((testimonial, i) => (
               <div
                key={i}
                className={cn(
                  "relative w-80 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors",
                )}
              >
                <div className="flex flex-row items-center gap-2 mb-4">
                  <div className="flex flex-col">
                    <figcaption className="text-sm font-medium text-white">
                      {testimonial.name}
                    </figcaption>
                    <p className="text-xs font-medium text-neutral-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <blockquote className="text-sm text-neutral-300 mb-4 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                <div className="flex gap-1">
                   {[...Array(5)].map((_, i) => (
                     <Star key={i} className={cn("h-4 w-4", i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-neutral-600")} />
                   ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black via-black/50 to-transparent"></div>
      </div>
    </section>
  );
}
