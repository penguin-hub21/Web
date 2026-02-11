import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import Image from "next/image";
import { Target, Users, Shield, Zap, Globe, Server } from "lucide-react";

const team = [
  {
    name: "Dream Vision",
    role: "Founder",
    image: "/ecc5f30c65169c1c8fc07ffc8cfa24e8.png",
    bio: "Visionary behind LumenNode, driving innovation in affordable high-performance hosting.",
  },
  {
    name: "Utkarsh Gupta",
    role: "Manager & Lead Engineer",
    image: "/c53df44a468a03e3c7a27beb1e6fceba.png",
    bio: "Oversees operations, engineering, and ensures top-tier infrastructure for every client.",
  },
  {
    name: "Ashu",
    role: "CEO",
    image: "/caea2d6243f6cefa5f0563c7b7efa125.png",
    bio: "Leading the company's strategic direction and growth initiatives.",
  },
  {
    name: "Ayx OG",
    role: "Admin",
    image: "/f915ad289c1de453e4a8a81ece05292a.png",
    bio: "Handles server administration, support, and day-to-day platform operations.",
  },
];

const values = [
  { icon: Zap, title: "Performance First", desc: "AMD EPYC processors and NVMe Gen4 SSDs power every server." },
  { icon: Shield, title: "Unbreakable Security", desc: "Enterprise DDoS protection up to 12Tbps via Path.net." },
  { icon: Globe, title: "Global Reach", desc: "Strategically located data centers across India, Singapore, and Europe." },
  { icon: Server, title: "99.9% Uptime", desc: "Redundant infrastructure ensuring your services stay online 24/7." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black overflow-x-hidden selection:bg-purple-500/30">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[400px] w-[600px] bg-purple-500/15 blur-[120px] rounded-full pointer-events-none" />

          <Container className="relative z-10 text-center">
            <span className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-300 mb-6">
              <span className="h-2 w-2 rounded-full bg-purple-400 mr-2 animate-pulse" />
              Our Story
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-heading text-white mb-6 tracking-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">LumenNode</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              We are a team of passionate engineers and gamers on a mission to make enterprise-grade hosting accessible, affordable, and blazing fast for everyone.
            </p>
          </Container>
        </section>

        {/* Mission & Values */}
        <section className="py-20 border-t border-white/5">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-6">Our Mission</h2>
                <p className="text-neutral-400 leading-relaxed mb-6">
                  To democratize high-performance hosting by making enterprise-grade hardware accessible to everyone. Whether you&apos;re running a small Minecraft server for friends or a large-scale application, you deserve the best performance without breaking the bank.
                </p>
                <p className="text-neutral-400 leading-relaxed">
                  Founded with a vision to bridge the gap between premium infrastructure and affordability, LumenNode delivers AMD EPYC-powered servers with unmetered bandwidth and enterprise DDoS protection — at prices that start from just ₹50/month.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {values.map((v, i) => (
                  <div key={i} className="p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-3">
                      <v.icon className="h-5 w-5 text-purple-400" />
                    </div>
                    <h3 className="text-white font-bold text-sm mb-1">{v.title}</h3>
                    <p className="text-neutral-500 text-xs leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Team */}
        <section className="py-20 border-t border-white/5 relative">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[400px] w-[400px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
          <Container className="relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">
                Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Team</span>
              </h2>
              <p className="text-neutral-400 max-w-xl mx-auto">
                The people behind LumenNode who make it all happen.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {team.map((member, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl border border-white/10 bg-white/5 p-8 text-center hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="relative h-28 w-28 rounded-full mx-auto mb-6 overflow-hidden ring-2 ring-purple-500/40 ring-offset-2 ring-offset-black">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1 font-heading">{member.name}</h3>
                  <p className="text-sm text-purple-400 font-medium mb-3">{member.role}</p>
                  <p className="text-xs text-neutral-500 leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-white/5">
          <Container className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">
              Ready to Experience the Difference?
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto mb-8">
              Join thousands of users who trust LumenNode for their hosting needs.
            </p>
            <a
              href="/plans"
              className="inline-flex items-center justify-center h-14 px-10 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-base hover:opacity-90 transition-opacity"
            >
              View Our Plans
            </a>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
