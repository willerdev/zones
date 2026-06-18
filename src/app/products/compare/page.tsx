"use client";

import Image from "next/image";
import Link from "next/link";
import { X, ShoppingCart } from "lucide-react";
import { useCompare } from "@/context/compare-context";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui/star-rating";

export default function ComparePage() {
  const { items, removeItem, clearAll } = useCompare();
  const { addItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">Product Comparison</h1>
        <p className="text-muted-foreground mb-6">No products selected for comparison</p>
        <Button asChild><Link href="/products">Browse Products</Link></Button>
      </div>
    );
  }

  const allSpecs = [...new Set(items.flatMap((p) => p.specs.map((s) => s.label)))];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Compare Products</h1>
        <Button variant="outline" onClick={clearAll}>Clear All</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr>
              <th className="text-left p-4 w-40" />
              {items.map((product) => (
                <th key={product.id} className="p-4 text-center align-top">
                  <div className="relative inline-block">
                    <button onClick={() => removeItem(product.id)} className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center">
                      <X className="h-3 w-3" />
                    </button>
                    <div className="relative h-32 w-32 mx-auto rounded-xl overflow-hidden bg-muted">
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                    </div>
                  </div>
                  <Link href={`/products/${product.slug}`} className="block mt-3 font-semibold hover:text-primary text-sm">
                    {product.name}
                  </Link>
                  <StarRating rating={product.rating} className="justify-center mt-2" />
                  <p className="text-lg font-bold mt-2">{formatPrice(product.discountPrice ?? product.price)}</p>
                  <Button size="sm" className="mt-3" onClick={() => addItem(product)}>
                    <ShoppingCart className="h-4 w-4" /> Add to Cart
                  </Button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="p-4 font-medium text-sm">Brand</td>
              {items.map((p) => <td key={p.id} className="p-4 text-center text-sm">{p.brand}</td>)}
            </tr>
            <tr className="border-t border-border bg-muted/30">
              <td className="p-4 font-medium text-sm">Category</td>
              {items.map((p) => <td key={p.id} className="p-4 text-center text-sm">{p.category}</td>)}
            </tr>
            <tr className="border-t border-border">
              <td className="p-4 font-medium text-sm">Condition</td>
              {items.map((p) => <td key={p.id} className="p-4 text-center text-sm">{p.condition}</td>)}
            </tr>
            <tr className="border-t border-border bg-muted/30">
              <td className="p-4 font-medium text-sm">Availability</td>
              {items.map((p) => <td key={p.id} className="p-4 text-center text-sm">{p.availability.replace("_", " ")}</td>)}
            </tr>
            <tr className="border-t border-border">
              <td className="p-4 font-medium text-sm">Warranty</td>
              {items.map((p) => <td key={p.id} className="p-4 text-center text-sm">{p.warranty}</td>)}
            </tr>
            {allSpecs.map((specLabel, i) => (
              <tr key={specLabel} className={`border-t border-border ${i % 2 === 0 ? "bg-muted/30" : ""}`}>
                <td className="p-4 font-medium text-sm">{specLabel}</td>
                {items.map((p) => (
                  <td key={p.id} className="p-4 text-center text-sm">
                    {p.specs.find((s) => s.label === specLabel)?.value || "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
