"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { GlowCard } from "@/components/ui/glow-card";
import { SpotlightButton } from "@/components/ui/spotlight-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Clock, Copy, ArrowLeft } from "lucide-react";
import {
  budgetPlans,
  minecraftPlans,
  vpsPlans,
  dedicatedPlans,
  proxyPlan,
  discordBotPlans, // Added discordBotPlans import
  formatPrice,
  type Plan,
} from "@/lib/plans-data";
import Link from "next/link";

// New allPlans array construction
const allPlans = [
  proxyPlan,
  ...discordBotPlans,
  ...minecraftPlans,
  ...vpsPlans,
  ...dedicatedPlans,
];

type OrderStep = "login" | "confirm" | "payment" | "waiting" | "complete";

function OrderPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planSlug = searchParams.get("plan");
  const processorParam = searchParams.get("processor") || "intel";

  const [step, setStep] = useState<OrderStep>("login");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [qrData, setQrData] = useState<any>(null);
  const [upiTxnId, setUpiTxnId] = useState("");
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Resolve plan from slug
  const resolvedPlan = (() => {
    if (!planSlug) return null;
    // Check discord-bot plans
    const budget = discordBotPlans.find((p) => p.slug === planSlug);
    if (budget) return { ...budget, finalPrice: budget.priceINR };

    // Check MC plans
    const mc = minecraftPlans.find((p) => p.slug === planSlug);
    if (mc) {
      const price = processorParam === "amd" ? mc.amdPrice : mc.intelPrice;
      return {
        name: mc.name,
        slug: mc.slug,
        ram: mc.ram,
        cpu: mc.cpu,
        disk: mc.disk,
        finalPrice: price,
        processor: processorParam === "amd" ? "AMD EPYC 7B13" : "Intel Xeon E5",
        category: processorParam === "amd" ? "minecraft-amd" : "minecraft-intel",
      };
    }

    // Check VPS
    const vps = vpsPlans.find((p) => p.slug === planSlug);
    if (vps) return { ...vps, finalPrice: vps.priceINR };

    // Check dedicated
    const dedi = dedicatedPlans.find((p) => p.slug === planSlug);
    if (dedi) return { ...dedi, finalPrice: dedi.priceINR };

    // Proxy
    if (planSlug === "anti-ddos-proxy") return { ...proxyPlan, finalPrice: proxyPlan.priceINR };

    return null;
  })();

  // Check session on mount
  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          setStep("confirm");
        }
      })
      .catch(() => {});
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isRegistering ? "/api/auth/register" : "/api/auth/login";
      const body = isRegistering ? { email, password, name } : { email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Auth failed");

      setUser(data.user);
      setStep("confirm");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrder = async () => {
    if (!resolvedPlan) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planSlug: resolvedPlan.slug,
          planName: resolvedPlan.name,
          amountINR: resolvedPlan.finalPrice,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order failed");

      setOrderId(data.order.id);

      // Generate QR
      const qrRes = await fetch("/api/payment/generate-qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: resolvedPlan.finalPrice,
          orderId: data.order.id,
        }),
      });

      const qrResult = await qrRes.json();
      setQrData(qrResult);
      setStep("payment");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentDone = async () => {
    if (!orderId) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ upiTxnId: upiTxnId || "manual-payment" }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");

      setStep("waiting");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!planSlug || !resolvedPlan) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-32 pb-20">
          <Container className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">No Plan Selected</h1>
            <p className="text-neutral-400 mb-8">
              Please choose a plan from our plans page first.
            </p>
            <Link href="/plans">
              <SpotlightButton>Browse Plans</SpotlightButton>
            </Link>
          </Container>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-20">
        <Container className="max-w-2xl">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {(["login", "confirm", "payment", "waiting"] as OrderStep[]).map(
              (s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
                      step === s || (["login", "confirm", "payment", "waiting"].indexOf(step) > i)
                        ? "bg-purple-600 border-purple-500 text-white"
                        : "border-white/20 text-neutral-500"
                    }`}
                  >
                    {["login", "confirm", "payment", "waiting"].indexOf(step) > i ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      i + 1
                    )}
                  </div>
                  {i < 3 && (
                    <div
                      className={`w-8 h-0.5 ${
                        ["login", "confirm", "payment", "waiting"].indexOf(step) > i
                          ? "bg-purple-500"
                          : "bg-white/10"
                      }`}
                    />
                  )}
                </div>
              )
            )}
          </div>

          {/* Plan Summary */}
          <GlowCard className="mb-8 border-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{resolvedPlan.name}</h3>
                <p className="text-sm text-neutral-400">
                  {resolvedPlan.ram} • {resolvedPlan.cpu} CPU • {resolvedPlan.disk}
                  {"processor" in resolvedPlan && resolvedPlan.processor
                    ? ` • ${resolvedPlan.processor}`
                    : ""}
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-white">
                  ₹{resolvedPlan.finalPrice}
                </span>
                <span className="text-neutral-400 text-sm">/mo</span>
              </div>
            </div>
          </GlowCard>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6 text-sm text-red-400">
              {error}
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* ─── STEP 1: LOGIN / REGISTER ─── */}
            {step === "login" && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <GlowCard className="bg-black/60 backdrop-blur-xl">
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-6">
                      {isRegistering ? "Create Account" : "Sign In"}
                    </h2>
                    <form onSubmit={handleAuth} className="space-y-4">
                      {isRegistering && (
                        <div className="space-y-2">
                          <Label className="text-neutral-300">Name</Label>
                          <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            className="bg-white/5 border-white/10 text-white"
                          />
                        </div>
                      )}
                      <div className="space-y-2">
                        <Label className="text-neutral-300">Email</Label>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="you@example.com"
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-neutral-300">Password</Label>
                        <Input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          placeholder="••••••••"
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>
                      <SpotlightButton
                        type="submit"
                        disabled={loading}
                        className="w-full justify-center"
                      >
                        {loading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : isRegistering ? (
                          "Create Account"
                        ) : (
                          "Sign In"
                        )}
                      </SpotlightButton>
                    </form>
                    <button
                      onClick={() => setIsRegistering(!isRegistering)}
                      className="w-full text-center text-sm text-neutral-400 hover:text-white mt-4 transition-colors"
                    >
                      {isRegistering
                        ? "Already have an account? Sign In"
                        : "No account? Register"}
                    </button>
                  </div>
                </GlowCard>
              </motion.div>
            )}

            {/* ─── STEP 2: CONFIRM ORDER ─── */}
            {step === "confirm" && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <GlowCard className="bg-black/60">
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-2">
                      Confirm Your Order
                    </h2>
                    <p className="text-neutral-400 text-sm mb-6">
                      Logged in as{" "}
                      <span className="text-white font-mono">
                        {user?.email}
                      </span>
                    </p>

                    <div className="space-y-3 border-t border-white/10 pt-4 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">Plan</span>
                        <span className="text-white font-medium">
                          {resolvedPlan.name}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">Resources</span>
                        <span className="text-white">
                          {resolvedPlan.ram} / {resolvedPlan.cpu} / {resolvedPlan.disk}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm border-t border-white/10 pt-3">
                        <span className="text-neutral-300 font-medium">
                          Total (Monthly)
                        </span>
                        <span className="text-xl font-bold text-white">
                          ₹{resolvedPlan.finalPrice}
                        </span>
                      </div>
                    </div>

                    {/* Terms Acceptance */}
                    <label className="flex items-start gap-3 cursor-pointer group mb-6 py-3 px-3 rounded-lg border border-white/[0.06] hover:border-white/10 transition-colors">
                      <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500/30 accent-purple-500 cursor-pointer"
                      />
                      <span className="text-sm text-neutral-400 leading-relaxed">
                        I have read and agree to the{" "}
                        <a href="/terms" target="_blank" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">
                          Terms & Conditions
                        </a>
                        ,{" "}
                        <a href="/privacy" target="_blank" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
                          Privacy Policy
                        </a>
                        , and{" "}
                        <a href="/refund-policy" target="_blank" className="text-purple-400 hover:text-purple-300 underline underline-offset-2">
                          Refund Policy
                        </a>
                        . I understand that all purchases are{" "}
                        <strong className="text-white/80">final and non-refundable</strong>.
                      </span>
                    </label>

                    <SpotlightButton
                      onClick={handleCreateOrder}
                      disabled={loading || !termsAccepted}
                      className={`w-full justify-center transition-all ${
                        !termsAccepted ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Proceed to Payment"
                      )}
                    </SpotlightButton>
                  </div>
                </GlowCard>
              </motion.div>
            )}

            {/* ─── STEP 3: UPI PAYMENT ─── */}
            {step === "payment" && qrData && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <GlowCard className="bg-black/60">
                  <div className="p-6 text-center">
                    <h2 className="text-xl font-bold text-white mb-2">
                      Scan & Pay via UPI
                    </h2>
                    <p className="text-neutral-400 text-sm mb-6">
                      Pay ₹{resolvedPlan.finalPrice} to complete your order
                    </p>

                    {/* QR Code */}
                    <div className="bg-white rounded-xl p-4 inline-block mb-6">
                      <img
                        src={qrData.qrCode}
                        alt="UPI QR Code"
                        className="w-[250px] h-[250px]"
                      />
                    </div>

                    {/* UPI ID */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-6 flex items-center justify-between">
                      <div className="text-left">
                        <p className="text-xs text-neutral-500">UPI ID</p>
                        <p className="text-white font-mono text-sm">
                          {qrData.upiId}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(qrData.upiId)
                        }
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <Copy className="h-4 w-4 text-neutral-400" />
                      </button>
                    </div>

                    {/* Transaction ID */}
                    <div className="space-y-2 mb-6 text-left">
                      <Label className="text-neutral-300 text-sm">
                        UPI Transaction ID (optional)
                      </Label>
                      <Input
                        value={upiTxnId}
                        onChange={(e) => setUpiTxnId(e.target.value)}
                        placeholder="Enter UPI Ref/UTR Number"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>

                    <SpotlightButton
                      onClick={handlePaymentDone}
                      disabled={loading}
                      className="w-full justify-center"
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "I Have Paid"
                      )}
                    </SpotlightButton>
                  </div>
                </GlowCard>
              </motion.div>
            )}

            {/* ─── STEP 4: WAITING ─── */}
            {step === "waiting" && (
              <motion.div
                key="waiting"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <GlowCard className="bg-black/60 border-yellow-500/30">
                  <div className="p-8 text-center">
                    <div className="h-16 w-16 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-6">
                      <Clock className="h-8 w-8 text-yellow-400 animate-pulse" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Payment Under Review
                    </h2>
                    <p className="text-neutral-400 mb-6 max-w-md mx-auto">
                      Thank you for your payment! Our admin team has been notified 
                      and will verify your payment shortly. Your server will be 
                      provisioned automatically upon approval.
                    </p>
                    <div className="bg-white/5 rounded-lg p-4 mb-6 text-sm">
                      <div className="flex justify-between mb-2">
                        <span className="text-neutral-400">Order ID</span>
                        <span className="text-white font-mono text-xs">
                          {orderId?.slice(0, 12)}...
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Status</span>
                        <span className="text-yellow-400 font-medium">
                          Awaiting Verification
                        </span>
                      </div>
                    </div>
                    <Link href="/client-area">
                      <Button
                        variant="outline"
                        className="border-white/10 text-white hover:bg-white/5"
                      >
                        Go to Dashboard
                      </Button>
                    </Link>
                  </div>
                </GlowCard>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </section>

      <Footer />
    </main>
  );
}

export default function OrderPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-purple-400 animate-spin" />
        </main>
      }
    >
      <OrderPageContent />
    </Suspense>
  );
}
