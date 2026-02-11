"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { motion } from "framer-motion";
import { AlertTriangle, XCircle, HelpCircle, Mail, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" as const },
  transition: { delay: i * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

export default function RefundPolicy() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 w-[600px] h-[300px] bg-purple-500/10 blur-[120px] rounded-full -translate-x-1/2 -z-10" />
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
              Refund{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Policy
              </span>
            </h1>
            <p className="text-neutral-400 text-lg leading-relaxed">
              At LumenNodes, we prioritize transparency. Please review our refund policy below.
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
            LumenNodes provides digital infrastructure services including hosting,
            virtual servers, and related online services. By purchasing any service,
            you acknowledge and agree to the following refund policy.
          </motion.p>

          {/* No Refund Card */}
          <motion.div
            {...stagger(1)}
            className="bg-red-500/[0.05] border border-red-500/20 rounded-xl p-6 mb-8"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-red-500/10 text-red-400">
                <XCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-300 font-heading mb-1">
                  1. No Refund Policy
                </h3>
                <p className="text-red-300/70 text-[15px] leading-relaxed">
                  All payments made to LumenNodes are <strong className="text-red-300">final and non-refundable</strong>.
                  Due to the nature of digital services and immediate resource allocation upon
                  purchase, refunds will not be issued under any circumstances.
                </p>
              </div>
            </div>

            <div className="pl-12 mt-4">
              <p className="text-red-300/60 text-sm mb-3">This includes but is not limited to:</p>
              <ul className="space-y-2">
                {[
                  "Change of mind after purchase",
                  "Failure to use the service",
                  "Service termination due to violation of Terms of Service",
                ].map((item) => (
                  <li key={item} className="text-red-300/60 text-[15px] flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400/50 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Review Warning */}
          <motion.div
            {...stagger(2)}
            className="border-t border-white/[0.06] py-8"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="mt-0.5 p-2 rounded-lg bg-yellow-500/10 text-yellow-400/80">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-semibold text-white font-heading">
                2. Review Before Purchase
              </h3>
            </div>
            <p className="pl-11 text-neutral-400 text-[15px] leading-relaxed">
              We advise all customers to review their order carefully before completing
              the transaction. Plan specifications, pricing, and terms are clearly stated
              on the website prior to purchase.
            </p>
          </motion.div>

          {/* Exceptions */}
          <motion.div
            {...stagger(3)}
            className="border-t border-white/[0.06] py-8"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="mt-0.5 p-2 rounded-lg bg-white/[0.04] text-purple-400/80">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-semibold text-white font-heading">
                3. Exceptions
              </h3>
            </div>
            <p className="pl-11 text-neutral-400 text-[15px] leading-relaxed">
              In rare cases where LumenNodes fails to deliver the purchased service
              due to internal errors (not caused by user actions), a credit or
              replacement may be offered at our sole discretion. This does not
              constitute a guarantee of refund.
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            {...stagger(4)}
            className="border-t border-white/[0.06] py-8"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="mt-0.5 p-2 rounded-lg bg-white/[0.04] text-purple-400/80">
                <HelpCircle className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-semibold text-white font-heading">
                4. Questions?
              </h3>
            </div>
            <div className="pl-11">
              <p className="text-neutral-400 text-[15px] leading-relaxed mb-3">
                If you have questions about this policy, please contact our support team before purchasing.
              </p>
              <div className="bg-white/[0.03] rounded-lg border border-white/[0.06] p-4 inline-block">
                <p className="text-white font-medium text-sm">LumenNodes Support</p>
                <p className="text-neutral-400 text-sm">support@lumennodes.in</p>
                <p className="text-neutral-500 text-sm">www.lumennodes.in</p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            {...stagger(5)}
            className="mt-8 text-center"
          >
            <p className="text-neutral-500 text-sm mb-4">
              By proceeding with a purchase, you acknowledge that you have read and agree to this Refund Policy.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/terms"
                className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-4"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-4"
              >
                Privacy Policy
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
