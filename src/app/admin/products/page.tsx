"use client";

import Image from "next/image";
import { Plus, Edit, Trash2 } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminProductsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <Button><Plus className="h-4 w-4" /> Add Product</Button>
      </div>

      <div className="rounded-2xl border border-border/50 overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 text-sm font-medium">Product</th>
              <th className="text-left p-4 text-sm font-medium hidden md:table-cell">Category</th>
              <th className="text-left p-4 text-sm font-medium">Price</th>
              <th className="text-left p-4 text-sm font-medium hidden sm:table-cell">Stock</th>
              <th className="text-left p-4 text-sm font-medium hidden sm:table-cell">Status</th>
              <th className="text-right p-4 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((product) => (
              <tr key={product.id} className="border-t border-border">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-lg overflow-hidden shrink-0">
                      <Image src={product.images[0]} alt="" fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm line-clamp-1">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.brand}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm hidden md:table-cell">{product.category}</td>
                <td className="p-4 text-sm font-medium">{formatPrice(product.discountPrice ?? product.price)}</td>
                <td className="p-4 text-sm hidden sm:table-cell">{product.stock}</td>
                <td className="p-4 hidden sm:table-cell">
                  <Badge variant={product.availability === "IN_STOCK" ? "success" : "outline"}>
                    {product.availability.replace("_", " ")}
                  </Badge>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
