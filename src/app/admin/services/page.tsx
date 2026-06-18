"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const BOOKINGS = [
  { id: "SB-001", customer: "TechStart Inc.", service: "IT Infrastructure Planning", status: "CONFIRMED", date: "2026-06-20" },
  { id: "SB-002", customer: "Watson Design", service: "Laptop Repair", status: "PENDING", date: "2026-06-22" },
  { id: "SB-003", customer: "Global Logistics", service: "Cybersecurity Assessment", status: "IN_PROGRESS", date: "2026-06-19" },
];

export default function AdminServicesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Service Bookings</h1>
      <div className="rounded-2xl border border-border/50 overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 text-sm font-medium">ID</th>
              <th className="text-left p-4 text-sm font-medium">Customer</th>
              <th className="text-left p-4 text-sm font-medium">Service</th>
              <th className="text-left p-4 text-sm font-medium">Status</th>
              <th className="text-right p-4 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {BOOKINGS.map((booking) => (
              <tr key={booking.id} className="border-t border-border">
                <td className="p-4 font-mono text-sm">{booking.id}</td>
                <td className="p-4 text-sm font-medium">{booking.customer}</td>
                <td className="p-4 text-sm">{booking.service}</td>
                <td className="p-4">
                  <Badge variant={booking.status === "CONFIRMED" ? "success" : "outline"}>
                    {booking.status}
                  </Badge>
                </td>
                <td className="p-4 text-right">
                  <Button variant="outline" size="sm">Manage</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
