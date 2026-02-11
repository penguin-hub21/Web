"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/layout/container";
import { GlowCard } from "@/components/ui/glow-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users,
  ShoppingCart,
  Server,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  LogOut,
  RefreshCw,
  ChevronDown,
  AlertCircle,
  Trash2,
  Shield,
  UserCog,
  Settings,
  Globe,
  Database,
  Mail,
  Lock,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Tab = "overview" | "orders" | "users" | "settings";

interface Stats {
  totalUsers: number;
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalRevenue: number;
  totalServers: number;
}

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Check auth
      const meRes = await fetch("/api/auth/me");
      const meData = await meRes.json();
      if (!meData.user || meData.user.role !== "ADMIN") {
        router.push("/client-area");
        return;
      }
      setUser(meData.user);

      // Fetch stats
      const statsRes = await fetch("/api/admin/stats");
      const statsData = await statsRes.json();
      if (statsData.stats) setStats(statsData.stats);
      if (statsData.recentOrders) setRecentOrders(statsData.recentOrders);

      // Fetch all orders
      const ordersRes = await fetch("/api/admin/orders");
      const ordersData = await ordersRes.json();
      if (ordersData.orders) setAllOrders(ordersData.orders);

      // Fetch users
      const usersRes = await fetch("/api/admin/users");
      const usersData = await usersRes.json();
      if (usersData.users) setAllUsers(usersData.users);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOrderAction = async (orderId: string, action: "approve" | "deny") => {
    setActionLoading(orderId);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, action }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Action failed");
      } else {
        fetchData();
      }
    } catch (err) {
      alert("Action failed");
    } finally {
      setActionLoading(null);
    }
  };

  const handleUpdateRole = async (userId: string, currentRole: string) => {
    const newRole = prompt("Enter new role (USER, STAFF, ADMIN):", currentRole);
    if (!newRole || newRole === currentRole) return;

    if (!["USER", "STAFF", "ADMIN"].includes(newRole)) {
      alert("Invalid role. Must be USER, STAFF, or ADMIN.");
      return;
    }

    setActionLoading(userId);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (!res.ok) throw new Error();
      fetchData();
    } catch {
      alert("Failed to update role");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This cannot be undone.")) return;
    setActionLoading(userId);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      fetchData();
    } catch {
      alert("Failed to delete user");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    setActionLoading(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      fetchData();
    } catch {
      alert("Failed to delete order");
    } finally {
      setActionLoading(null);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <RefreshCw className="h-8 w-8 text-purple-400 animate-spin" />
      </main>
    );
  }

  const statCards = stats
    ? [
        { label: "Total Users", value: stats.totalUsers, icon: Users, color: "text-blue-400" },
        { label: "Total Orders", value: stats.totalOrders, icon: ShoppingCart, color: "text-purple-400" },
        { label: "Pending", value: stats.pendingOrders, icon: Clock, color: "text-yellow-400" },
        { label: "Revenue", value: `₹${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-green-400" },
        { label: "Completed", value: stats.completedOrders, icon: CheckCircle2, color: "text-emerald-400" },
        { label: "Servers", value: stats.totalServers, icon: Server, color: "text-cyan-400" },
      ]
    : [];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      PENDING_PAYMENT: "bg-gray-500/20 text-gray-400 border-gray-500/30",
      AWAITING_VERIFICATION: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      APPROVED: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      COMPLETED: "bg-green-500/20 text-green-400 border-green-500/30",
      DENIED: "bg-red-500/20 text-red-400 border-red-500/30",
      CANCELLED: "bg-red-500/20 text-red-400 border-red-500/30",
      PROVISIONING: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    };
    return (
      <span
        className={cn(
          "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border",
          styles[status] || "bg-white/10 text-neutral-400 border-white/10"
        )}
      >
        {status.replace(/_/g, " ")}
      </span>
    );
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <Container className="flex items-center justify-between py-3">
          <div className="flex items-center gap-6">
            <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-gradient-to-tr from-purple-600 to-blue-600 mr-3">
               <Image 
                 src="/logo.jpeg" 
                 alt="Logo" 
                 fill
                 className="object-cover"
               />
            </div>
            <h1 className="text-lg font-bold text-white font-heading">
              LumenNodes Admin
            </h1>
            <nav className="flex gap-1">
              {(["overview", "orders", "users", "settings"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "px-4 py-1.5 rounded-md text-sm font-medium transition-all capitalize",
                    tab === t
                      ? "bg-white/10 text-white"
                      : "text-neutral-400 hover:text-white"
                  )}
                >
                  {t}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={fetchData}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <RefreshCw className="h-4 w-4 text-neutral-400" />
            </button>
            <span className="text-sm text-neutral-400">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4 text-neutral-400" />
            </button>
          </div>
        </Container>
      </div>

      <Container className="py-8">
        <AnimatePresence mode="wait">
          {/* ─── OVERVIEW ─── */}
          {tab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {statCards.map((card) => (
                  <GlowCard key={card.label} className="p-4">
                    <div className={cn("mb-2", card.color)}>
                      <card.icon className="h-5 w-5" />
                    </div>
                    <p className="text-2xl font-bold text-white">{card.value}</p>
                    <p className="text-xs text-neutral-500 mt-1">{card.label}</p>
                  </GlowCard>
                ))}
              </div>

              <h2 className="text-lg font-bold text-white mb-4">Recent Orders</h2>
              <div className="bg-black/40 rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-neutral-500 text-xs uppercase">
                      <th className="py-3 px-4 text-left">User</th>
                      <th className="py-3 px-4 text-left">Plan</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-right">Amount</th>
                      <th className="py-3 px-4 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order: any) => (
                      <tr
                        key={order.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="py-3 px-4 text-neutral-300">
                          {order.user?.email || "—"}
                        </td>
                        <td className="py-3 px-4 text-white font-medium">
                          {order.product?.name || "—"}
                        </td>
                        <td className="py-3 px-4">{getStatusBadge(order.status)}</td>
                        <td className="py-3 px-4 text-right text-white font-mono">
                          ₹{order.amountINR}
                        </td>
                        <td className="py-3 px-4 text-right text-neutral-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                    {recentOrders.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="py-8 text-center text-neutral-500"
                        >
                          No orders yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ─── ORDERS ─── */}
          {tab === "orders" && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white">
                  All Orders ({allOrders.length})
                </h2>
              </div>

              <div className="space-y-3">
                {allOrders.map((order: any) => (
                  <div
                    key={order.id}
                    className="bg-black/40 rounded-xl border border-white/10 p-5 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-white font-bold">
                            {order.product?.name || "Unknown Plan"}
                          </h3>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-xs text-neutral-500">
                          Order ID: {order.id} •{" "}
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xl font-bold text-white font-mono">
                          ₹{order.amountINR}
                        </span>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDeleteOrder(order.id)}
                          disabled={actionLoading === order.id}
                          className="h-8 w-8 text-neutral-500 hover:text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-4">
                      <div>
                        <p className="text-neutral-500 text-xs">Email</p>
                        <p className="text-neutral-300 font-mono text-xs">
                          {order.user?.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-neutral-500 text-xs">UPI Txn ID</p>
                        <p className="text-neutral-300 font-mono text-xs">
                          {order.upiTxnId || "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-neutral-500 text-xs">Server</p>
                        <p className="text-neutral-300 font-mono text-xs">
                          {order.server?.identifier || "Not created"}
                        </p>
                      </div>
                      <div>
                        <p className="text-neutral-500 text-xs">Invoice</p>
                        <p className="text-neutral-300 text-xs">
                          {order.invoice ? "✓ Generated" : "—"}
                        </p>
                      </div>
                    </div>

                    {order.status === "AWAITING_VERIFICATION" && (
                      <div className="flex gap-3 pt-3 border-t border-white/10">
                        <Button
                          onClick={() => handleOrderAction(order.id, "approve")}
                          disabled={actionLoading === order.id}
                          className="bg-green-600 hover:bg-green-700 text-white"
                          size="sm"
                        >
                          {actionLoading === order.id ? (
                            <RefreshCw className="h-3 w-3 animate-spin mr-1" />
                          ) : (
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                          )}
                          Approve & Provision
                        </Button>
                        <Button
                          onClick={() => handleOrderAction(order.id, "deny")}
                          disabled={actionLoading === order.id}
                          variant="outline"
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                          size="sm"
                        >
                          <XCircle className="h-3 w-3 mr-1" /> Deny
                        </Button>
                      </div>
                    )}
                  </div>
                ))}

                {allOrders.length === 0 && (
                  <div className="text-center py-16 text-neutral-500">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <p>No orders yet</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ─── USERS ─── */}
          {tab === "users" && (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-lg font-bold text-white mb-6">
                Users ({allUsers.length})
              </h2>

              <div className="bg-black/40 rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-neutral-500 text-xs uppercase">
                      <th className="py-3 px-4 text-left">Email</th>
                      <th className="py-3 px-4 text-left">Name</th>
                      <th className="py-3 px-4 text-left">Role</th>
                      <th className="py-3 px-4 text-center">Orders</th>
                      <th className="py-3 px-4 text-center">Servers</th>
                      <th className="py-3 px-4 text-center">Ptero ID</th>
                      <th className="py-3 px-4 text-right">Joined</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map((u: any) => (
                      <tr
                        key={u.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="py-3 px-4 text-white font-mono text-xs">
                          {u.email}
                        </td>
                        <td className="py-3 px-4 text-neutral-300">
                          {u.name || "—"}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border",
                              u.role === "ADMIN"
                                ? "bg-red-500/20 text-red-400 border-red-500/30"
                                : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                            )}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center text-neutral-300">
                          {u._count?.orders || 0}
                        </td>
                        <td className="py-3 px-4 text-center text-neutral-300">
                          {u._count?.servers || 0}
                        </td>
                        <td className="py-3 px-4 text-center text-neutral-500 font-mono text-xs">
                          {u.pteroId || "—"}
                        </td>
                        <td className="py-3 px-4 text-right text-neutral-500">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                             <Button 
                               size="sm" 
                               variant="outline" 
                               className="h-8 border-white/10 text-neutral-400 hover:text-white"
                               onClick={() => handleUpdateRole(u.id, u.role)}
                               disabled={actionLoading === u.id}
                             >
                               <UserCog className="h-3 w-3 mr-1" /> Role
                             </Button>
                             <Button 
                               size="sm" 
                               variant="destructive" 
                               className="h-8 bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                               onClick={() => handleDeleteUser(u.id)}
                               disabled={actionLoading === u.id}
                             >
                               <Trash2 className="h-3 w-3" />
                             </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ─── SETTINGS ─── */}
          {tab === "settings" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-lg font-bold text-white mb-6">Admin Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {/* Pterodactyl Settings */}
                 <GlowCard className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                       <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                          <Server className="h-5 w-5" />
                       </div>
                       <h3 className="text-lg font-bold text-white">Pterodactyl</h3>
                    </div>
                    <p className="text-sm text-neutral-400 mb-6">
                       Configure API keys, URL, and server allocation settings.
                    </p>
                    <div className="space-y-3">
                       <Button variant="outline" className="w-full justify-start border-white/10 text-neutral-300 hover:text-white hover:bg-white/5">
                          <Database className="h-4 w-4 mr-2" /> Manage Nodes
                       </Button>
                       <Button variant="outline" className="w-full justify-start border-white/10 text-neutral-300 hover:text-white hover:bg-white/5">
                          <Lock className="h-4 w-4 mr-2" /> API Keys
                       </Button>
                    </div>
                 </GlowCard>

                 {/* Website Settings */}
                 <GlowCard className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                       <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                          <Globe className="h-5 w-5" />
                       </div>
                       <h3 className="text-lg font-bold text-white">Website</h3>
                    </div>
                    <p className="text-sm text-neutral-400 mb-6">
                       Manage global site settings, maintenance mode, and SEO.
                    </p>
                    <div className="space-y-3">
                       <Button variant="outline" className="w-full justify-start border-white/10 text-neutral-300 hover:text-white hover:bg-white/5">
                          <Settings className="h-4 w-4 mr-2" /> General Config
                       </Button>
                       <Button variant="outline" className="w-full justify-start border-white/10 text-neutral-300 hover:text-white hover:bg-white/5">
                          <Mail className="h-4 w-4 mr-2" /> Email Templates
                       </Button>
                    </div>
                 </GlowCard>

                 {/* System Status */}
                 <GlowCard className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                       <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                          <Shield className="h-5 w-5" />
                       </div>
                       <h3 className="text-lg font-bold text-white">System</h3>
                    </div>
                    <p className="text-sm text-neutral-400 mb-6">
                       View system health, logs, and security audits.
                    </p>
                    <div className="space-y-3">
                       <Button variant="outline" className="w-full justify-start border-white/10 text-neutral-300 hover:text-white hover:bg-white/5">
                          <AlertCircle className="h-4 w-4 mr-2" /> View Logs
                       </Button>
                       <Button variant="outline" className="w-full justify-start border-white/10 text-neutral-300 hover:text-white hover:bg-white/5">
                          <UserCog className="h-4 w-4 mr-2" /> Access Control
                       </Button>
                    </div>
                 </GlowCard>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </main>
  );
}
