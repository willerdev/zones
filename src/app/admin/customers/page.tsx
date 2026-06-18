"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CUSTOMERS = [
  { name: "James Mitchell", email: "james@techstart.com", orders: 12, spent: "$15,420", joined: "2024-03-15" },
  { name: "Emily Watson", email: "emily@watson.com", orders: 8, spent: "$4,280", joined: "2024-06-22" },
  { name: "Robert Chen", email: "robert@global.com", orders: 24, spent: "$32,100", joined: "2023-11-08" },
  { name: "Lisa Thompson", email: "lisa@email.com", orders: 3, spent: "$5,897", joined: "2025-01-30" },
];

export default function AdminCustomersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Customer Management</h1>
      <div className="rounded-2xl border border-border/50 overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 text-sm font-medium">Customer</th>
              <th className="text-left p-4 text-sm font-medium hidden sm:table-cell">Orders</th>
              <th className="text-left p-4 text-sm font-medium">Total Spent</th>
              <th className="text-left p-4 text-sm font-medium hidden md:table-cell">Joined</th>
              <th className="text-right p-4 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {CUSTOMERS.map((customer) => (
              <tr key={customer.email} className="border-t border-border">
                <td className="p-4">
                  <p className="font-medium text-sm">{customer.name}</p>
                  <p className="text-xs text-muted-foreground">{customer.email}</p>
                </td>
                <td className="p-4 text-sm hidden sm:table-cell">{customer.orders}</td>
                <td className="p-4 text-sm font-medium">{customer.spent}</td>
                <td className="p-4 text-sm text-muted-foreground hidden md:table-cell">{customer.joined}</td>
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
