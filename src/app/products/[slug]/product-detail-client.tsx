"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  FileText, Heart, GitCompareArrows, Shield, Star,
  ChevronLeft, ChevronRight, Minus, Plus, Building2,
} from "lucide-react";
import type { Product } from "@/lib/product-types";
import { getProductBySlug, PRODUCTS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { ProductCard } from "@/components/products/product-card";
import { SpecsTable } from "@/components/products/specs-table";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useCompare } from "@/context/compare-context";
import { cn } from "@/lib/utils";

export default function ProductDetailClient({ slug }: { slug: string }) {
  const router = useRouter();
  const product = getProductBySlug(slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const { isInCompare, toggleItem: toggleCompare } = useCompare();

  if (!product) notFound();

  const p = product as Product;
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

  const handleAddToQuoteList = () => {
    addItem(product, quantity);
  };

  const handleGetQuotation = () => {
    addItem(product, quantity);
    router.push("/checkout");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 pb-28 md:pb-8">
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
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setSelectedImage((prev) => (prev + 1) % product.images.length)}
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

          <div className="flex items-center gap-3 mt-4">
            <Badge variant={availability.variant}>{availability.text}</Badge>
            <Badge variant="outline">{product.condition}</Badge>
          </div>

          <p className="mt-4 text-sm font-medium text-primary">Contact us for pricing</p>

          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Shield className="h-4 w-4" /> {product.warranty}</span>
          </div>

          <div className="hidden md:flex items-center gap-3 mt-8">
            <div className="flex items-center border border-border rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-muted transition-colors">
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-muted transition-colors">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button size="lg" variant="outline" className="flex-1" onClick={handleAddToQuoteList} disabled={product.availability === "OUT_OF_STOCK"}>
              <FileText className="h-5 w-5" /> Add to Quote List
            </Button>
          </div>

          <div className="hidden md:block mt-4">
            <Button size="lg" className="w-full" onClick={handleGetQuotation} disabled={product.availability === "OUT_OF_STOCK"}>
              Get Quotation
            </Button>
          </div>

          <div className="hidden md:flex gap-3 mt-3">
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
              <Link href="/cart">View Quote List</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-10 lg:mt-16">
        <h2 className="text-xl font-bold mb-4">Product Details</h2>
        <SpecsTable specs={product.specs} description={product.description} />
      </div>

      <div className="mt-16 hidden md:block">
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

      {/* Mobile sticky quotation bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-border bg-background p-3 flex items-center gap-3">
        <button
          onClick={() => toggleItem(product)}
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border",
            isInWishlist(product.id) && "text-red-500"
          )}
          aria-label="Add to wishlist"
        >
          <Heart className={cn("h-5 w-5", isInWishlist(product.id) && "fill-current")} />
        </button>
        <div className="flex flex-1 gap-2">
          <Button variant="outline" className="flex-1" onClick={handleAddToQuoteList} disabled={product.availability === "OUT_OF_STOCK"}>
            Add to List
          </Button>
          <Button className="flex-1" onClick={handleGetQuotation}>
            Get Quotation
          </Button>
        </div>
      </div>
    </div>
  );
}
