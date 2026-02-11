"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { motion } from "framer-motion";
import { FileText, CreditCard, ShieldAlert, Ban, Server, AlertTriangle, Scale, Gavel, Mail } from "lucide-react";
import Image from "next/image";

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" as const },
  transition: { delay: i * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

const sections = [
  {
    icon: FileText,
    title: "1. Acceptance of Terms",
    text: "By using LumenNodes services, you confirm that you have read and understood these Terms, agree to comply with all policies including Refund Policy, Privacy Policy, and Acceptable Use rules, and are legally capable of entering a binding agreement. If you do not agree, you must not use our services.",
  },
  {
    icon: Server,
    title: "2. Services Provided",
    text: "LumenNodes provides digital hosting and infrastructure services, including game server hosting, virtual servers, web hosting, and related digital services. Service specifications are defined at the time of purchase.",
  },
  {
    icon: CreditCard,
    title: "3. Payments & Billing",
    items: [
      "All payments must be made in advance",
      "Services will not be activated or renewed without successful payment",
      "Prices may change at any time without prior notice",
      "Failure to pay renewal invoices may result in service suspension or termination",
    ],
  },
  {
    icon: Ban,
    title: "4. Strict No-Refund Policy",
    text: "All purchases are final. LumenNodes operates under a strict no-refund policy. Digital resources are allocated immediately upon purchase, making refunds impractical.",
    highlight: true,
  },
  {
    icon: ShieldAlert,
    title: "5. Acceptable Use",
    text: "Users must not use LumenNodes services for:",
    items: [
      "Illegal activities",
      "DDoS attacks or malicious network behavior",
      "Unauthorized access or hacking",
      "Distribution of malware",
      "Spam or abusive activities",
      "Hosting prohibited content under applicable law",
    ],
    note: "Violation may result in immediate suspension or termination without notice or refund.",
  },
  {
    icon: Server,
    title: "6. Service Availability",
    text: "While we strive for high uptime, LumenNodes does not guarantee uninterrupted or error-free service unless stated in a formal SLA. Maintenance, hardware failures, network issues, or third-party disruptions may occur.",
  },
  {
    icon: AlertTriangle,
    title: "7. Suspension & Termination",
    text: "We reserve the right to suspend or terminate any service or account if terms are violated, payment issues occur, abuse or security risks are detected, or legal requests require action. Termination may occur without prior warning.",
  },
  {
    icon: FileText,
    title: "8. Client Responsibility",
    items: [
      "Managing server configurations",
      "Maintaining backups of data",
      "Securing login credentials",
      "Ensuring software legality",
    ],
    note: "LumenNodes is not responsible for data loss caused by user actions, third-party software, or external factors.",
  },
  {
    icon: Scale,
    title: "9. Limitation of Liability",
    items: [
      "LumenNodes shall not be liable for any indirect, incidental, or consequential damages",
      "We are not responsible for loss of profits, revenue, or data",
      "Total liability shall not exceed the amount paid for the affected service",
    ],
  },
  {
    icon: CreditCard,
    title: "10. Chargebacks & Disputes",
    text: "Unauthorized chargebacks or payment disputes may result in immediate account suspension, service termination, and additional administrative or recovery fees. Clients must contact support before initiating disputes.",
  },
  {
    icon: Gavel,
    title: "11. Modifications & Governing Law",
    text: "LumenNodes reserves the right to modify these Terms at any time. Continued use of services indicates acceptance. These Terms shall be governed by the applicable laws of India.",
  },
];

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 w-[600px] h-[300px] bg-indigo-500/10 blur-[120px] rounded-full -translate-x-1/2 -z-10" />
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
              Terms &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Conditions
              </span>
            </h1>
            <p className="text-neutral-400 text-lg leading-relaxed">
              Please read these terms carefully before using our services.
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
            These Terms and Conditions govern the use of services provided by LumenNodes.
            By purchasing, accessing, or using any LumenNodes service, you agree to be
            legally bound by the terms stated below.
          </motion.p>

          <div className="space-y-0">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                {...stagger(i + 1)}
                className={`border-t py-8 ${
                  section.highlight
                    ? "border-red-500/20 bg-red-500/[0.02] -mx-4 px-4 rounded-lg"
                    : "border-white/[0.06]"
                }`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className={`mt-0.5 p-2 rounded-lg ${
                      section.highlight
                        ? "bg-red-500/10 text-red-400/80"
                        : "bg-white/[0.04] text-indigo-400/80"
                    }`}
                  >
                    <section.icon className="h-4 w-4" />
                  </div>
                  <h3
                    className={`text-lg font-semibold font-heading ${
                      section.highlight ? "text-red-300" : "text-white"
                    }`}
                  >
                    {section.title}
                  </h3>
                </div>

                <div className="pl-11 space-y-3">
                  {section.text && (
                    <p
                      className={`text-[15px] leading-relaxed ${
                        section.highlight ? "text-red-300/70" : "text-neutral-400"
                      }`}
                    >
                      {section.text}
                    </p>
                  )}

                  {section.items && (
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item} className="text-neutral-400 text-[15px] flex items-start gap-2.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400/50 mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {"note" in section && section.note && (
                    <p className="text-neutral-500 text-sm italic mt-2">{section.note}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Contact */}
            <motion.div
              {...stagger(sections.length + 1)}
              className="border-t border-white/[0.06] py-8"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="mt-0.5 p-2 rounded-lg bg-white/[0.04] text-indigo-400/80">
                  <Mail className="h-4 w-4" />
                </div>
                <h3 className="text-lg font-semibold text-white font-heading">
                  12. Contact Information
                </h3>
              </div>
              <div className="pl-11">
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
