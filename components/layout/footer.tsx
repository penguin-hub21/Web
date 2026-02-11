import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { SpotlightButton } from "@/components/ui/spotlight-button";
import { Input } from "@/components/ui/input";
import { Server, Twitter, Github, Linkedin, Disc, Youtube } from "lucide-react";


export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black pt-20 pb-10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 h-px w-1/2 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
      <div className="absolute -top-20 left-1/2 h-[200px] w-[600px] -translate-x-1/2 bg-purple-500/10 blur-[100px]" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center space-x-3 mb-6 group">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600">
                 <Image 
                   src="/logo.jpeg" 
                   alt="LumenNode Logo" 
                   fill
                   className="object-cover"
                 />
              </div>
              <span className="text-2xl font-bold font-heading text-white">LumenNode</span>
            </Link>
            <p className="max-w-xs text-neutral-400 mb-8 leading-relaxed">
              Forging the future of high-performance hosting. 
              Enterprise-grade hardware, unmetered bandwidth, and 
              DDoS protection for every user.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Github, Linkedin, Disc, Youtube].map((Icon, i) => (
                <Link key={i} href="#" className="h-10 w-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <h3 className="mb-6 text-sm font-bold text-white uppercase tracking-wider">Services</h3>
            <ul className="space-y-4 text-sm text-neutral-400">
              <li><Link href="/minecraft-vps" className="hover:text-purple-400 transition-colors">Minecraft Hosting</Link></li>
              <li><Link href="/vps" className="hover:text-purple-400 transition-colors">VPS Hosting</Link></li>
              <li><Link href="/dedicated" className="hover:text-purple-400 transition-colors">Dedicated Servers</Link></li>
              <li><Link href="/web" className="hover:text-purple-400 transition-colors">Web Hosting</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-6 text-sm font-bold text-white uppercase tracking-wider">Support</h3>
            <ul className="space-y-4 text-sm text-neutral-400">
              <li><Link href="/status" className="hover:text-purple-400 transition-colors">System Status</Link></li>
              <li><Link href="/ticket" className="hover:text-purple-400 transition-colors">Open Ticket</Link></li>
              <li><Link href="/docs" className="hover:text-purple-400 transition-colors">Knowledge Base</Link></li>
              <li><Link href="/discord" className="hover:text-purple-400 transition-colors">Discord Community</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="mb-6 text-sm font-bold text-white uppercase tracking-wider">Stay Updated</h3>
            <p className="text-sm text-neutral-400 mb-4">
              Subscribe to our newsletter for the latest updates, deals, and feature releases.
            </p>
            <div className="flex space-x-2 mb-8">
              <Input 
                placeholder="Enter your email" 
                className="bg-white/5 border-white/10 text-white placeholder:text-neutral-500 focus-visible:ring-purple-500"
              />
              <SpotlightButton className="px-6">Subscribe</SpotlightButton>
            </div>


            
            <p className="text-xs text-neutral-500 mt-4">
              By subscribing you agree to our Privacy Policy.
            </p>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-500">&copy; {new Date().getFullYear()} LumenNode. All rights reserved.</p>
          <div className="flex space-x-6 text-sm text-neutral-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
