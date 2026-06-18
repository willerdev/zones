"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ORDERS = [
  { id: "ZT-M3K2X1-A4B2", customer: "James Mitchell", email: "james@techstart.com", total: 3299, status: "PROCESSING", date: "2026-06-18", items: 1 },
  { id: "ZT-L2J1W0-C3D1", customer: "Emily Watson", email: "emily@watson.com", total: 199, status: "SHIPPED", date: "2026-06-17", items: 2 },
  { id: "ZT-K1I0V9-D2E0", customer: "Robert Chen", email: "robert@global.com", total: 1199, status: "DELIVERED", date: "2026-06-15", items: 1 },
  { id: "ZT-J0H9U8-E1F9", customer: "Lisa Thompson", email: "lisa@email.com", total: 3499, status: "PENDING", date: "2026-06-18", items: 1 },
];

export default function AdminOrdersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Order Management</h1>
      <div className="rounded-2xl border border-border/50 overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 text-sm font-medium">Order</th>
              <th className="text-left p-4 text-sm font-medium hidden md:table-cell">Customer</th>
              <th className="text-left p-4 text-sm font-medium">Total</th>
              <th className="text-left p-4 text-sm font-medium">Status</th>
              <th className="text-left p-4 text-sm font-medium hidden sm:table-cell">Date</th>
              <th className="text-right p-4 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ORDERS.map((order) => (
              <tr key={order.id} className="border-t border-border">
                <td className="p-4">
                  <p className="font-mono text-sm font-medium">{order.id}</p>
                  <p className="text-xs text-muted-foreground">{order.items} item(s)</p>
                </td>
                <td className="p-4 hidden md:table-cell">
                  <p className="text-sm font-medium">{order.customer}</p>
                  <p className="text-xs text-muted-foreground">{order.email}</p>
                </td>
                <td className="p-4 text-sm font-medium">${order.total.toLocaleString()}</td>
                <td className="p-4">
                  <Badge variant={order.status === "DELIVERED" ? "success" : order.status === "PENDING" ? "outline" : "default"}>
                    {order.status}
                  </Badge>
                </td>
                <td className="p-4 text-sm text-muted-foreground hidden sm:table-cell">{order.date}</td>
                <td className="p-4 text-right">
                  <Button variant="outline" size="sm">View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
