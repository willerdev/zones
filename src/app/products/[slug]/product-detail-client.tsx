"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ShoppingCart, Heart, GitCompareArrows, Truck, Shield, Star,
  ChevronLeft, ChevronRight, Minus, Plus, Building2,
} from "lucide-react";
import type { Product } from "@/lib/product-types";
import { getProductBySlug, PRODUCTS } from "@/lib/data";
import { calculateDiscount } from "@/lib/utils";
import { useLocale } from "@/context/locale-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { ProductCard } from "@/components/products/product-card";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useCompare } from "@/context/compare-context";
import { cn } from "@/lib/utils";

export default function ProductDetailClient({ slug }: { slug: string }) {
  const { formatPrice } = useLocale();
  const product = getProductBySlug(slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const { isInCompare, toggleItem: toggleCompare } = useCompare();

  if (!product) notFound();

  const p = product as Product;
  const discount = calculateDiscount(p.price, p.discountPrice);
  const relatedProducts = PRODUCTS.filter(
    (item) => item.categorySlug === p.categorySlug && item.id !== p.id
  ).slice(0, 4);

  const availabilityLabel = {
    IN_STOCK: { text: "In Stock", variant: "success" as const },
    LOW_STOCK: { text: "Low Stock", variant: "outline" as const },
    OUT_OF_STOCK: { text: "Out of Stock", variant: "destructive" as const },
    PRE_ORDER: { text: "Pre-Order", variant: "secondary" as const },
  };
  const availability = availabilityLabel[p.availability];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-muted-foreground mb-6">
        <Link href="/products" className="hover:text-foreground">Products</Link>
        <span className="mx-2">/</span>
        <Link href={`/products?category=${product.categorySlug}`} className="hover:text-foreground">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{p.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted border border-border/50">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {discount > 0 && (
              <Badge className="absolute left-4 top-4 bg-red-500 text-white border-0 text-sm">
                -{discount}% OFF
              </Badge>
            )}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImage((p) => (p - 1 + product.images.length) % product.images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setSelectedImage((p) => (p + 1) % product.images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {product.images.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "relative h-20 w-20 rounded-xl overflow-hidden border-2 transition-colors",
                    i === selectedImage ? "border-primary" : "border-transparent"
                  )}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-medium text-primary uppercase tracking-wider">{product.brand}</p>
          <h1 className="text-3xl font-bold mt-1">{product.name}</h1>
          <StarRating rating={product.rating} showValue reviewCount={product.reviewCount} size="md" className="mt-3" />

          <div className="flex items-baseline gap-3 mt-4">
            {product.discountPrice ? (
              <>
                <span className="text-3xl font-bold">{formatPrice(product.discountPrice)}</span>
                <span className="text-lg text-muted-foreground line-through">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            )}
          </div>

          <div className="flex items-center gap-3 mt-4">
            <Badge variant={availability.variant}>
              {availability.text}
            </Badge>
            <Badge variant="outline">{product.condition}</Badge>
          </div>

          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Shield className="h-4 w-4" /> {product.warranty}</span>
            <span className="flex items-center gap-1"><Truck className="h-4 w-4" /> Free delivery in Kigali over 200,000 RWF</span>
          </div>

          <div className="flex items-center gap-3 mt-8">
            <div className="flex items-center border border-border rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-muted transition-colors">
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-muted transition-colors">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button size="lg" className="flex-1" onClick={() => addItem(product, quantity)} disabled={product.availability === "OUT_OF_STOCK"}>
              <ShoppingCart className="h-5 w-5" /> Add to Cart
            </Button>
          </div>

          <div className="flex gap-3 mt-3">
            <Button variant="outline" className="flex-1" onClick={() => toggleItem(product)}>
              <Heart className={cn("h-4 w-4", isInWishlist(product.id) && "fill-red-500 text-red-500")} />
              {isInWishlist(product.id) ? "In Wishlist" : "Add to Wishlist"}
            </Button>
            <Button variant="outline" onClick={() => toggleCompare(product)}>
              <GitCompareArrows className={cn("h-4 w-4", isInCompare(product.id) && "text-primary")} />
              Compare
            </Button>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border/50 flex items-center gap-3">
            <Building2 className="h-8 w-8 text-primary shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">Need bulk pricing?</p>
              <p className="text-xs text-muted-foreground">Contact us for corporate discounts on 10+ units</p>
            </div>
            <Button size="sm" variant="outline" asChild>
              <Link href="/contact?subject=quotation">Get Quote</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Specifications</h2>
        <div className="rounded-2xl border border-border/50 overflow-hidden">
          <table className="w-full">
            <tbody>
              {product.specs.map((spec, i) => (
                <tr key={spec.label} className={i % 2 === 0 ? "bg-muted/30" : ""}>
                  <td className="px-6 py-4 text-sm font-medium w-1/3">{spec.label}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="p-8 rounded-2xl bg-card border border-border/50 text-center">
          <Star className="h-10 w-10 text-amber-400 mx-auto mb-3" />
          <p className="text-lg font-medium">{product.rating} out of 5</p>
          <p className="text-muted-foreground">Based on {product.reviewCount} reviews</p>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {relatedProducts.map((related) => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
