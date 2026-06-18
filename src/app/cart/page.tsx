"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, FileText, ArrowRight } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { items, updateQuantity, removeItem, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your Quote List is Empty</h1>
        <p className="text-muted-foreground mb-6">Add products to request a quotation</p>
        <Button asChild><Link href="/products">Browse Products</Link></Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-2">Quote List</h1>
      <p className="text-muted-foreground mb-8">{itemCount} product{itemCount === 1 ? "" : "s"} selected for quotation</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 p-4 rounded-2xl bg-card border border-border/50">
              <div className="relative h-24 w-24 rounded-xl overflow-hidden shrink-0">
                <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/products/${product.slug}`} className="font-semibold hover:text-primary transition-colors line-clamp-1">
                  {product.name}
                </Link>
                <p className="text-sm text-muted-foreground">{product.brand}</p>
                <p className="text-xs text-primary mt-1 font-medium">Quotation on request</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button onClick={() => removeItem(product.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="flex items-center border border-border rounded-lg">
                  <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-2 hover:bg-muted">
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="px-3 text-sm font-medium">{quantity}</span>
                  <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-2 hover:bg-muted">
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border/50 h-fit sticky top-24">
          <h2 className="text-lg font-bold mb-2">Request Quotation</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Review your selected products, then choose how you&apos;d like to receive your quotation.
          </p>
          <Button size="lg" className="w-full" asChild>
            <Link href="/checkout">
              Get Quotation <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" className="w-full mt-2" asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
