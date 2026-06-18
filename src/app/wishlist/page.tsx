"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useWishlist } from "@/context/wishlist-context";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h1>
        <p className="text-muted-foreground mb-6">Save products you love for later</p>
        <Button asChild><Link href="/products">Browse Products</Link></Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Wishlist ({items.length})</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((product) => (
          <div key={product.id} className="rounded-2xl border border-border/50 bg-card overflow-hidden">
            <div className="relative h-48">
              <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
            </div>
            <div className="p-4">
              <Link href={`/products/${product.slug}`} className="font-semibold hover:text-primary transition-colors">
                {product.name}
              </Link>
              <p className="font-bold mt-2">{formatPrice(product.discountPrice ?? product.price)}</p>
              <div className="flex gap-2 mt-4">
                <Button size="sm" className="flex-1" onClick={() => addItem(product)}>
                  <ShoppingCart className="h-4 w-4" /> Add to Cart
                </Button>
                <Button size="sm" variant="outline" onClick={() => removeItem(product.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
