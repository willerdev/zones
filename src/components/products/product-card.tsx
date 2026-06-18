"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Eye, GitCompareArrows } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/data";
import { calculateDiscount } from "@/lib/utils";
import { useLocale } from "@/context/locale-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useCompare } from "@/context/compare-context";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { formatPrice } = useLocale();
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const { isInCompare, toggleItem: toggleCompare } = useCompare();
  const discount = calculateDiscount(product.price, product.discountPrice);
  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 sm:hover:-translate-y-1",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>

        {discount > 0 && (
          <Badge className="absolute left-2 top-2 sm:left-3 sm:top-3 bg-red-500 text-white border-0 text-[10px] sm:text-xs px-1.5 sm:px-2.5">
            -{discount}%
          </Badge>
        )}

        {product.availability === "LOW_STOCK" && (
          <Badge variant="outline" className="absolute right-2 top-2 sm:right-3 sm:top-3 bg-background/80 backdrop-blur-sm text-[10px] sm:text-xs hidden sm:inline-flex">
            Low Stock
          </Badge>
        )}

        <div className="absolute inset-x-0 bottom-0 hidden sm:flex translate-y-full gap-2 p-3 transition-transform duration-300 group-hover:translate-y-0">
          <Button
            size="sm"
            className="flex-1"
            onClick={() => addItem(product)}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
          <Button size="sm" variant="secondary" asChild>
            <Link href={`/products/${product.slug}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="absolute right-2 top-2 sm:right-3 sm:top-3 flex flex-col gap-1.5 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
          <button
            onClick={() => toggleItem(product)}
            className={cn(
              "flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background",
              inWishlist && "text-red-500"
            )}
            aria-label="Add to wishlist"
          >
            <Heart className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4", inWishlist && "fill-current")} />
          </button>
          <button
            onClick={() => toggleCompare(product)}
            className={cn(
              "hidden sm:flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background",
              inCompare && "text-primary"
            )}
            aria-label="Add to compare"
          >
            <GitCompareArrows className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-2.5 sm:p-4">
        <p className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider truncate">
          {product.brand}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-0.5 sm:mt-1 text-xs sm:text-base font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} className="mt-1 sm:mt-2 hidden sm:flex" />
        <div className="mt-auto flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2 pt-2 sm:pt-3">
          {product.discountPrice ? (
            <>
              <span className="text-sm sm:text-lg font-bold text-foreground">
                {formatPrice(product.discountPrice)}
              </span>
              <span className="text-[10px] sm:text-sm text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-sm sm:text-lg font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        <Button
          size="sm"
          className="mt-2 w-full sm:hidden h-8 text-xs"
          onClick={() => addItem(product)}
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          Add
        </Button>
      </div>
    </motion.div>
  );
}
