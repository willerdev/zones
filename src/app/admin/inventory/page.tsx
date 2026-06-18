"use client";

import { PRODUCTS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export default function AdminInventoryPage() {
  const totalStock = PRODUCTS.reduce((sum, p) => sum + p.stock, 0);
  const lowStock = PRODUCTS.filter((p) => p.stock <= 10);
  const outOfStock = PRODUCTS.filter((p) => p.availability === "OUT_OF_STOCK");

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Inventory Tracking</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="p-6 rounded-2xl bg-card border border-border/50">
          <p className="text-2xl font-bold">{totalStock}</p>
          <p className="text-sm text-muted-foreground">Total Units in Stock</p>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-border/50">
          <p className="text-2xl font-bold text-amber-500">{lowStock.length}</p>
          <p className="text-sm text-muted-foreground">Low Stock Items</p>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-border/50">
          <p className="text-2xl font-bold text-red-500">{outOfStock.length}</p>
          <p className="text-sm text-muted-foreground">Out of Stock</p>
        </div>
      </div>

      <div className="rounded-2xl border border-border/50 overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 text-sm font-medium">Product</th>
              <th className="text-left p-4 text-sm font-medium">SKU</th>
              <th className="text-left p-4 text-sm font-medium">Stock</th>
              <th className="text-left p-4 text-sm font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((product) => (
              <tr key={product.id} className="border-t border-border">
                <td className="p-4 text-sm font-medium">{product.name}</td>
                <td className="p-4 font-mono text-sm text-muted-foreground">SKU-{product.id.padStart(4, "0")}</td>
                <td className="p-4 text-sm">{product.stock}</td>
                <td className="p-4">
                  <Badge variant={
                    product.stock <= 5 ? "destructive" :
                    product.stock <= 10 ? "outline" : "success"
                  }>
                    {product.stock <= 5 ? "Critical" : product.stock <= 10 ? "Low" : "Healthy"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
