"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { GlowCard } from "@/components/ui/glow-card";
import { SpotlightButton } from "@/components/ui/spotlight-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Server,
  Clock,
  FileText,
  Power,
  ExternalLink,
  Loader2,
  LogOut,
  Package,
  Receipt,
  ShieldCheck,
  AlertCircle,
  Download,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { generateInvoicePDF } from "@/lib/invoice";

type View = "dashboard" | "orders" | "invoices";

export default function ClientArea() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [view, setView] = useState<View>("dashboard");

  // Auth state
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownloadInvoice = async (order: any) => {
    if (!order || !order.invoice) return;
    
    await generateInvoicePDF({
      id: order.invoice.id,
      type: "VPS", // Default type
      ram: parseInt(order.product?.ram) || 4,
      disk: parseInt(order.product?.disk) || 50,
      cpuModel: "EPYC 7763",
      cpuCores: order.product?.cpu || "2",
      pricing: order.invoice.amount,
      currency: "INR",
      paymentDate: order.invoice.paidAt || new Date().toISOString(),
      createdAt: order.invoice.createdAt,
      backups: "Daily",
      allocation: "Standard",
      status: order.invoice.status,
      customerName: user?.name || "Customer",
      customerEmail: user?.email || "",
      location: "India (Central)",
      support: "24/7 Priority",
    });
  };

  const fetchData = useCallback(async () => {
    try {
      const meRes = await fetch("/api/auth/me");
      const meData = await meRes.json();
      if (meData.user) {
        setUser(meData.user);
        setIsAuth(true);

        const ordersRes = await fetch("/api/orders");
        const ordersData = await ordersRes.json();
        if (ordersData.orders) setOrders(ordersData.orders);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
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
      if (!res.ok) throw new Error(data.error);

      setUser(data.user);
      setIsAuth(true);
      fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setIsAuth(false);
    setOrders([]);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-purple-400 animate-spin" />
      </main>
    );
  }

  // ─── AUTH SCREEN ───
  if (!isAuth) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-32 pb-20">
          <Container className="max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white font-heading mb-2">
                  Client Area
                </h1>
                <p className="text-neutral-400">
                  {isRegistering ? "Create your account" : "Sign in to manage your servers"}
                </p>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4 text-sm text-red-400 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" /> {error}
                </div>
              )}

              <GlowCard className="bg-black/60">
                <form onSubmit={handleAuth} className="p-6 space-y-4">
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
                    disabled={authLoading}
                    className="w-full justify-center"
                  >
                    {authLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : isRegistering ? (
                      "Create Account"
                    ) : (
                      "Sign In"
                    )}
                  </SpotlightButton>
                </form>
              </GlowCard>

              <button
                onClick={() => setIsRegistering(!isRegistering)}
                className="w-full text-center text-sm text-neutral-400 hover:text-white mt-4 transition-colors"
              >
                {isRegistering
                  ? "Already have an account? Sign In"
                  : "No account? Register"}
              </button>
            </motion.div>
          </Container>
        </section>
        <Footer />
      </main>
    );
  }

  // ─── DASHBOARD ───
  const activeServers = orders.filter(
    (o) => o.status === "COMPLETED" && o.server
  );
  const pendingOrders = orders.filter(
    (o) =>
      o.status === "PENDING_PAYMENT" || o.status === "AWAITING_VERIFICATION"
  );
  const invoices = orders.filter((o) => o.invoice);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-20">
        <Container>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white font-heading">
                Welcome, {user?.name || user?.email?.split("@")[0]}
              </h1>
              <p className="text-neutral-400 text-sm">{user?.email}</p>
            </div>
            <div className="flex items-center gap-3">
              {user?.role === "ADMIN" && (
                <Link href="/admin">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                  >
                    <ShieldCheck className="h-3.5 w-3.5 mr-1" /> Admin Panel
                  </Button>
                </Link>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-white/10 text-neutral-400"
              >
                <LogOut className="h-3.5 w-3.5 mr-1" /> Logout
              </Button>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="flex gap-2 mb-8">
            {([
              { key: "dashboard", label: "Servers", icon: Server },
              { key: "orders", label: "Orders", icon: Package },
              { key: "invoices", label: "Invoices", icon: Receipt },
            ] as const).map((t) => (
              <button
                key={t.key}
                onClick={() => setView(t.key)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                  view === t.key
                    ? "bg-white/10 text-white border border-white/20"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                )}
              >
                <t.icon className="h-4 w-4" /> {t.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* ─── SERVERS ─── */}
            {view === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {activeServers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeServers.map((order: any) => (
                      <GlowCard key={order.id} className="group">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                              <Server className="h-4 w-4 text-green-400" />
                              {order.product?.name}
                            </h3>
                            <p className="text-xs text-neutral-500 font-mono">
                              {order.server?.identifier || "—"}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs text-green-400 font-medium">
                              {order.server?.status || "ONLINE"}
                            </span>
                          </div>
                        </div>

                        {order.server?.ip && (
                          <div className="bg-white/5 rounded-lg p-3 mb-4 text-sm font-mono">
                            <span className="text-neutral-400">IP: </span>
                            <span className="text-white">
                              {order.server.ip}:{order.server.port}
                            </span>
                          </div>
                        )}

                        <a
                          href={`${process.env.NEXT_PUBLIC_PTERO_URL || "https://control.lumennodes.in"}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            className="w-full bg-purple-600/80 hover:bg-purple-600 text-white"
                            size="sm"
                          >
                            <ExternalLink className="h-3.5 w-3.5 mr-2" />
                            Open Control Panel
                          </Button>
                        </a>
                      </GlowCard>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <Server className="h-16 w-16 mx-auto mb-4 text-neutral-700" />
                    <h3 className="text-xl font-bold text-white mb-2">No Active Servers</h3>
                    <p className="text-neutral-400 mb-6">
                      Deploy your first server to get started.
                    </p>
                    <Link href="/plans">
                      <SpotlightButton>Browse Plans</SpotlightButton>
                    </Link>
                  </div>
                )}

                {pendingOrders.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-sm font-medium text-neutral-400 mb-3 uppercase tracking-wider">
                      Pending Orders
                    </h3>
                    {pendingOrders.map((order: any) => (
                      <div
                        key={order.id}
                        className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-yellow-400" />
                          <div>
                            <p className="text-white font-medium text-sm">
                              {order.product?.name}
                            </p>
                            <p className="text-xs text-neutral-500">
                              {order.status.replace(/_/g, " ")}
                            </p>
                          </div>
                        </div>
                        <span className="text-white font-mono font-bold">
                          ₹{order.amountINR}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* ─── ORDERS ─── */}
            {view === "orders" && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {orders.length > 0 ? (
                  <div className="space-y-3">
                    {orders.map((order: any) => (
                      <div
                        key={order.id}
                        className="bg-black/40 rounded-xl border border-white/10 p-4 flex items-center justify-between"
                      >
                        <div>
                          <h3 className="text-white font-medium">
                            {order.product?.name}
                          </h3>
                          <p className="text-xs text-neutral-500">
                            {new Date(order.createdAt).toLocaleString()} •{" "}
                            {order.id.slice(0, 10)}...
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border",
                              order.status === "COMPLETED"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : order.status === "DENIED"
                                ? "bg-red-500/20 text-red-400 border-red-500/30"
                                : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                            )}
                          >
                            {order.status.replace(/_/g, " ")}
                          </span>
                          <span className="text-white font-mono font-bold">
                            ₹{order.amountINR}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 text-neutral-500">
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    No orders yet
                  </div>
                )}
              </motion.div>
            )}

            {/* ─── INVOICES ─── */}
            {view === "invoices" && (
              <motion.div
                key="invoices"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {invoices.length > 0 ? (
                  <div className="bg-black/40 rounded-xl border border-white/10 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10 text-neutral-500 text-xs uppercase">
                          <th className="py-3 px-4 text-left">Invoice ID</th>
                          <th className="py-3 px-4 text-left">Plan</th>
                          <th className="py-3 px-4 text-center">Status</th>
                          <th className="py-3 px-4 text-right">Amount</th>
                          <th className="py-3 px-4 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoices.map((order: any) => (
                          <tr
                            key={order.invoice.id}
                            className="border-b border-white/5"
                          >
                            <td className="py-3 px-4 text-white font-mono text-xs">
                              {order.invoice.id.slice(0, 12)}
                            </td>
                            <td className="py-3 px-4 text-neutral-300">
                              {order.product?.name}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-green-500/20 text-green-400 border border-green-500/30">
                                {order.invoice.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right text-white font-mono">
                              ₹{order.invoice.amount}
                            </td>
                            <td className="py-3 px-4 text-right text-neutral-500">
                              {order.invoice.paidAt
                                ? new Date(order.invoice.paidAt).toLocaleDateString()
                                : "—"}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDownloadInvoice(order)}
                                className="h-8 w-8 p-0 hover:bg-white/10 text-neutral-400 hover:text-white"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-20 text-neutral-500">
                    <Receipt className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    No invoices yet
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
