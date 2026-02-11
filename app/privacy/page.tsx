"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { motion } from "framer-motion";
import { Shield, Eye, Database, Lock, Cookie, Globe, RefreshCw, Mail } from "lucide-react";
import Image from "next/image";

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" as const },
  transition: { delay: i * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

const sections = [
  {
    icon: Eye,
    title: "1. Information We Collect",
    content: [
      {
        subtitle: "Personal Information",
        items: ["Full name", "Email address", "Billing information", "Contact details", "Account credentials"],
      },
      {
        subtitle: "Technical Information",
        items: ["IP address", "Device & browser information", "Usage data and activity logs", "Server performance & diagnostic data"],
      },
      {
        subtitle: "Payment Information",
        text: "Payments are processed through third-party providers. LumenNodes does not store sensitive financial data such as full credit/debit card numbers.",
      },
    ],
  },
  {
    icon: Database,
    title: "2. How We Use Your Information",
    items: [
      "Providing and maintaining hosting services",
      "Account authentication and management",
      "Billing and payment processing",
      "Service monitoring, security & fraud prevention",
      "Customer support and communication",
      "Improving performance and user experience",
      "Legal compliance and enforcement of policies",
    ],
  },
  {
    icon: RefreshCw,
    title: "3. Data Retention",
    text: "We retain user information only as long as necessary to provide services, maintain records for legal or financial obligations, and resolve disputes. LumenNodes reserves the right to retain certain data after account termination where required by law or security reasons.",
  },
  {
    icon: Globe,
    title: "4. Data Sharing & Disclosure",
    text: "We do not sell personal information. Information may be shared with trusted service providers, payment processors, to comply with legal obligations, or to protect our rights and infrastructure from abuse.",
  },
  {
    icon: Lock,
    title: "5. Security Measures",
    text: "LumenNodes implements industry-standard security measures including secure authentication, encryption, and access controls. However, no online system is completely secure and absolute security cannot be guaranteed.",
  },
  {
    icon: Shield,
    title: "6. Client Responsibility",
    items: [
      "Maintaining confidentiality of account credentials",
      "Securing hosted content",
      "Ensuring lawful use of services",
    ],
    text: "LumenNodes is not responsible for data loss caused by user misconfiguration, insecure scripts, or third-party software.",
  },
  {
    icon: Cookie,
    title: "7. Cookies & Tracking",
    text: "We may use cookies and similar technologies to improve website functionality, analyze trends, and enhance security. Users may disable cookies through browser settings, but some features may not function properly.",
  },
  {
    icon: Globe,
    title: "8. Third-Party Services",
    text: "Our services may integrate with third-party tools. LumenNodes is not responsible for privacy practices of third-party services.",
  },
  {
    icon: RefreshCw,
    title: "9. Policy Updates",
    text: "We reserve the right to modify this Privacy Policy at any time. Continued use of services after updates indicates acceptance of the revised policy.",
  },
];

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full -translate-x-1/2 -z-10" />
        <Container className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Image
              src="/logo.jpeg"
              alt="LumenNodes"
              width={56}
              height={56}
              className="rounded-xl mx-auto mb-6 ring-1 ring-white/10"
            />
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-white tracking-tight mb-3">
              Privacy{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Policy
              </span>
            </h1>
            <p className="text-neutral-400 text-lg leading-relaxed">
              LumenNodes is committed to protecting the privacy and security of our users.
            </p>
            <p className="text-neutral-600 text-sm mt-3">
              Last updated: February 2026
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Content */}
      <section className="pb-32">
        <Container className="max-w-3xl">
          <motion.p
            {...stagger(0)}
            className="text-neutral-400 leading-relaxed mb-10 text-[15px]"
          >
            This Privacy Policy explains how we collect, use, store, and protect your
            information when you use our services. By accessing or using LumenNodes
            services, you agree to the practices described in this policy.
          </motion.p>

          <div className="space-y-0">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                {...stagger(i + 1)}
                className="border-t border-white/[0.06] py-8"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="mt-0.5 p-2 rounded-lg bg-white/[0.04] text-blue-400/80">
                    <section.icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-lg font-semibold text-white font-heading">
                    {section.title}
                  </h3>
                </div>

                <div className="pl-11 space-y-4">
                  {section.text && (
                    <p className="text-neutral-400 text-[15px] leading-relaxed">
                      {section.text}
                    </p>
                  )}

                  {section.items && (
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item} className="text-neutral-400 text-[15px] flex items-start gap-2.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-400/50 mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {"content" in section &&
                    section.content?.map((sub: any, j: number) => (
                      <div key={j} className="mt-3">
                        {sub.subtitle && (
                          <p className="text-white/80 text-sm font-medium mb-2">{sub.subtitle}</p>
                        )}
                        {sub.text && (
                          <p className="text-neutral-400 text-[15px] leading-relaxed">{sub.text}</p>
                        )}
                        {sub.items && (
                          <ul className="space-y-1.5">
                            {sub.items.map((item: string) => (
                              <li key={item} className="text-neutral-400 text-[15px] flex items-start gap-2.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-400/50 mt-2 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                </div>
              </motion.div>
            ))}

            {/* Contact */}
            <motion.div
              {...stagger(sections.length + 1)}
              className="border-t border-white/[0.06] py-8"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="mt-0.5 p-2 rounded-lg bg-white/[0.04] text-blue-400/80">
                  <Mail className="h-4 w-4" />
                </div>
                <h3 className="text-lg font-semibold text-white font-heading">
                  10. Contact Information
                </h3>
              </div>
              <div className="pl-11">
                <p className="text-neutral-400 text-[15px] leading-relaxed mb-2">
                  For privacy-related questions or concerns:
                </p>
                <div className="bg-white/[0.03] rounded-lg border border-white/[0.06] p-4 inline-block">
                  <p className="text-white font-medium text-sm">LumenNodes Support</p>
                  <p className="text-neutral-400 text-sm">support@lumennodes.in</p>
                  <p className="text-neutral-500 text-sm">www.lumennodes.in</p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
