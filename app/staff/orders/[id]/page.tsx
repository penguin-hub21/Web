import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Container } from "@/components/layout/container";
import { GlowCard } from "@/components/ui/glow-card";
import { Server, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

async function getOrder(id: string) {
  const order = await db.order.findUnique({
    where: { id },
    include: {
      user: true,
      product: true,
      server: true,
      invoice: true,
    },
  });
  return order;
}

export default async function StaffOrderDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getCurrentUser();
  
  if (!user || !["STAFF", "ADMIN"].includes(user.role)) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-2xl font-bold text-red-400">Unauthorized</h1>
      </Container>
    );
  }

  const order = await getOrder(id);

  if (!order) {
    notFound();
  }

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
          "px-3 py-1 rounded-full text-xs font-bold uppercase border",
          styles[status] || "bg-white/10 text-neutral-400 border-white/10"
        )}
      >
        {status.replace(/_/g, " ")}
      </span>
    );
  };

  return (
    <main className="min-h-screen bg-background pt-24 pb-12">
      <Container>
        <Link 
          href="/staff/tickets" 
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
             <h1 className="text-3xl font-bold text-white mb-2">Order Details</h1>
             <p className="text-neutral-400">Order ID: <span className="font-mono text-neutral-300">{order.id}</span></p>
          </div>
          {getStatusBadge(order.status)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <GlowCard>
              <h2 className="text-xl font-bold text-white mb-6">Product Information</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-neutral-500 uppercase font-bold">Plan Name</label>
                  <p className="text-white text-lg font-medium">{order.product?.name || "Unknown"}</p>
                </div>
                <div>
                  <label className="text-xs text-neutral-500 uppercase font-bold">Price</label>
                  <p className="text-white text-lg font-medium">₹{order.amountINR}</p>
                </div>
                 <div>
                  <label className="text-xs text-neutral-500 uppercase font-bold">Resources</label>
                  <p className="text-neutral-300">
                    {order.product?.ram} RAM / {order.product?.cpu} CPU / {order.product?.disk} Disk
                  </p>
                </div>
                <div>
                  <label className="text-xs text-neutral-500 uppercase font-bold">Created At</label>
                  <p className="text-neutral-300">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </GlowCard>

            <GlowCard>
               <h2 className="text-xl font-bold text-white mb-6">User Information</h2>
               <div className="flex items-center gap-4 mb-6">
                 <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-xl">
                    {order.user.name?.[0] || order.user.email[0].toUpperCase()}
                 </div>
                 <div>
                    <p className="text-white font-bold">{order.user.name || "No Name"}</p>
                    <p className="text-neutral-400 text-sm">{order.user.email}</p>
                 </div>
               </div>
               <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs text-neutral-500 uppercase font-bold">User Role</label>
                    <p className="text-neutral-300 capitalize">{order.user.role.toLowerCase()}</p>
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500 uppercase font-bold">Pterodactyl ID</label>
                    <p className="font-mono text-neutral-300">{order.user.pteroId || "Not Linked"}</p>
                  </div>
               </div>
            </GlowCard>
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-6">
            <GlowCard className="border-l-4 border-l-purple-500">
               <h3 className="text-lg font-bold text-white mb-4">Payment Details</h3>
               <div className="space-y-4">
                 <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-neutral-400">Method</span>
                    <span className="text-white">UPI</span>
                 </div>
                 <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-neutral-400">Transaction ID</span>
                    <span className="text-white font-mono text-sm">{order.upiTxnId || "N/A"}</span>
                 </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-neutral-400">Invoice</span>
                    <span className={cn("text-sm", order.invoice ? "text-green-400" : "text-yellow-400")}>
                        {order.invoice ? "Generated" : "Pending"}
                    </span>
                 </div>
               </div>
            </GlowCard>

            {order.server && (
              <GlowCard className="border-l-4 border-l-cyan-500">
                <h3 className="text-lg font-bold text-white mb-4">Server Details</h3>
                <div className="space-y-2 text-sm">
                   <div className="flex items-center gap-2 text-white">
                      <Server className="h-4 w-4 text-cyan-400" />
                      <span className="font-mono">{order.server.identifier}</span>
                   </div>
                   <p className="text-neutral-400">
                      IP: <span className="text-white font-mono">{order.server.ip || "Allocating..."}:{order.server.port || "..."}</span>
                   </p>
                   <p className="text-neutral-400">
                      Status: <span className="text-green-400 font-bold">{order.server.status}</span>
                   </p>
                </div>
              </GlowCard>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
}
