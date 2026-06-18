"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const REPAIRS = [
  { id: "REP-001", customer: "John Doe", device: "MacBook Pro 16", issue: "Screen cracked", status: "IN_PROGRESS", date: "2026-06-17" },
  { id: "REP-002", customer: "Jane Smith", device: "iPhone 15 Pro", issue: "Battery draining fast", status: "DIAGNOSING", date: "2026-06-18" },
  { id: "REP-003", customer: "Mike Johnson", device: "Dell XPS 15", issue: "Won't boot", status: "SUBMITTED", date: "2026-06-18" },
  { id: "REP-004", customer: "Sarah Lee", device: "Samsung S24", issue: "Water damage", status: "AWAITING_PARTS", date: "2026-06-15" },
];

export default function AdminRepairsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Repair Requests</h1>
      <div className="rounded-2xl border border-border/50 overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 text-sm font-medium">ID</th>
              <th className="text-left p-4 text-sm font-medium">Customer</th>
              <th className="text-left p-4 text-sm font-medium hidden md:table-cell">Device</th>
              <th className="text-left p-4 text-sm font-medium">Status</th>
              <th className="text-right p-4 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {REPAIRS.map((repair) => (
              <tr key={repair.id} className="border-t border-border">
                <td className="p-4 font-mono text-sm">{repair.id}</td>
                <td className="p-4">
                  <p className="text-sm font-medium">{repair.customer}</p>
                  <p className="text-xs text-muted-foreground">{repair.issue}</p>
                </td>
                <td className="p-4 text-sm hidden md:table-cell">{repair.device}</td>
                <td className="p-4">
                  <Badge variant={repair.status === "IN_PROGRESS" ? "default" : "outline"}>
                    {repair.status.replace("_", " ")}
                  </Badge>
                </td>
                <td className="p-4 text-right">
                  <Button variant="outline" size="sm">Update</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
