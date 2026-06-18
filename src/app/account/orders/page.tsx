"use client";

import Link from "next/link";
import { Package, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const DEMO_ORDERS = [
  { id: "ZT-M3K2X1-A4B2", date: "2026-06-10", status: "DELIVERED", total: 3299, items: 1 },
  { id: "ZT-L2J1W0-C3D1", date: "2026-05-28", status: "SHIPPED", total: 199, items: 2 },
  { id: "ZT-K1I0V9-D2E0", date: "2026-05-15", status: "PROCESSING", total: 1199, items: 1 },
];

const statusColors: Record<string, string> = {
  DELIVERED: "success",
  SHIPPED: "default",
  PROCESSING: "secondary",
  PENDING: "outline",
};

export default function OrdersPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/account" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block">
        ← Back to Account
      </Link>
      <h1 className="text-3xl font-bold mb-8">Order History</h1>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by order number..." className="pl-10" />
        </div>
      </div>

      <div className="space-y-4">
        {DEMO_ORDERS.map((order) => (
          <div key={order.id} className="p-6 rounded-2xl bg-card border border-border/50">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-mono font-semibold">{order.id}</p>
                <p className="text-sm text-muted-foreground">{order.date} · {order.items} item(s)</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant={statusColors[order.status] as "default" | "secondary" | "outline" | "success"}>
                  {order.status}
                </Badge>
                <span className="font-bold">${order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {DEMO_ORDERS.length === 0 && (
        <div className="text-center py-20">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium">No orders yet</p>
          <Button className="mt-4" asChild><Link href="/products">Start Shopping</Link></Button>
        </div>
      )}
    </div>
  );
}
