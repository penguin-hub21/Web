import { db } from "@/lib/db";
import { Container } from "@/components/layout/container";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, X } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StaffOrdersPage() {
  const orders = await db.order.findMany({
    where: {
        status: {
            in: ["PENDING_PAYMENT", "AWAITING_VERIFICATION", "PROVISIONING"]
        }
    },
    include: {
      user: true,
      product: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-bold font-heading text-white">Order Queue</h1>
           <p className="text-neutral-400">Manage pending orders and verifications.</p>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
        <table className="w-full text-left text-sm text-neutral-400">
          <thead className="bg-white/5 text-xs uppercase font-medium text-white">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-mono text-white">{order.id.slice(0, 8)}</td>
                <td className="px-6 py-4">
                  <div className="font-medium text-white">{order.user.name || "User"}</div>
                  <div className="text-xs">{order.user.email}</div>
                </td>
                <td className="px-6 py-4">{order.product.name}</td>
                <td className="px-6 py-4">{formatCurrency(order.amountINR / 100)}</td>
                <td className="px-6 py-4">
                  <Badge variant={
                    order.status === "APPROVED" ? "default" : 
                    order.status === "DENIED" ? "destructive" : 
                    order.status === "AWAITING_VERIFICATION" ? "warning" : "secondary"
                  } className={
                     order.status === "AWAITING_VERIFICATION" ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20" : ""
                  }>
                    {order.status.replace("_", " ")}
                  </Badge>
                </td>
                <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/staff/orders/${order.id}`}>
                    <Button size="sm" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10">
                      View Details
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-neutral-500">
                  No pending orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
