"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  SlidersHorizontal, Grid3X3, List, GitCompareArrows, Building2, X,
} from "lucide-react";
import { PRODUCTS, BRANDS, CATEGORIES } from "@/lib/data";
import { useLocale } from "@/context/locale-context";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCompare } from "@/context/compare-context";
import { cn } from "@/lib/utils";

function ProductsContent() {
  const searchParams = useSearchParams();
  const { formatPrice } = useLocale();
  const { items: compareItems } = useCompare();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000000]);
  const [condition, setCondition] = useState("");
  const [availability, setAvailability] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const showBulk = searchParams.get("bulk") === "true";

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setSearch(q);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    if (selectedCategory) {
      result = result.filter((p) => p.categorySlug === selectedCategory);
    }
    if (selectedBrands.length) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }
    result = result.filter(
      (p) => (p.discountPrice ?? p.price) >= priceRange[0] && (p.discountPrice ?? p.price) <= priceRange[1]
    );
    if (condition) result = result.filter((p) => p.condition === condition);
    if (availability) result = result.filter((p) => p.availability === availability);

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price));
        break;
      case "price-desc":
        result.sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result.sort((a, b) => b.popularity - a.popularity);
    }

    return result;
  }, [search, selectedBrands, selectedCategory, priceRange, condition, availability, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedBrands([]);
    setSelectedCategory("");
    setPriceRange([0, 20000000]);
    setCondition("");
    setAvailability("");
    setSortBy("popularity");
  };

  const activeFilterCount = [
    selectedBrands.length > 0,
    selectedCategory !== "",
    condition !== "",
    availability !== "",
    priceRange[0] > 0 || priceRange[1] < 20000000,
  ].filter(Boolean).length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="text-muted-foreground mt-1">
          {filteredProducts.length} products available
        </p>
      </div>

      {showBulk && (
        <div className="mb-8 p-6 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Building2 className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-semibold">Business & Bulk Purchasing</h3>
              <p className="text-sm text-muted-foreground">
                Get corporate pricing, bulk discounts, and dedicated account management.
              </p>
            </div>
          </div>
          <Button asChild>
            <Link href="/contact?subject=quotation">Request Quotation</Link>
          </Button>
        </div>
      )}

      {compareItems.length > 0 && (
        <div className="mb-6 flex items-center justify-between p-4 rounded-xl bg-muted border border-border">
          <div className="flex items-center gap-2">
            <GitCompareArrows className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">{compareItems.length} products selected for comparison</span>
          </div>
          <Button size="sm" asChild>
            <Link href="/products/compare">Compare Now</Link>
          </Button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className={cn(
          "lg:w-64 shrink-0",
          showFilters ? "block" : "hidden lg:block"
        )}>
          <div className="sticky top-24 space-y-6 p-6 rounded-2xl bg-card border border-border/50">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </h3>
              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="text-xs text-primary hover:underline">
                  Clear all
                </button>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Brand</label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {BRANDS.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="rounded border-border"
                    />
                    {brand}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="text-sm"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm"
              >
                <option value="">All Conditions</option>
                <option value="NEW">New</option>
                <option value="REFURBISHED">Refurbished</option>
                <option value="USED">Used</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Availability</label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm"
              >
                <option value="">All</option>
                <option value="IN_STOCK">In Stock</option>
                <option value="LOW_STOCK">Low Stock</option>
                <option value="OUT_OF_STOCK">Out of Stock</option>
                <option value="PRE_ORDER">Pre-Order</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
              {activeFilterCount > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedCategory && (
                    <Badge variant="secondary" className="gap-1">
                      {CATEGORIES.find((c) => c.slug === selectedCategory)?.name}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("")} />
                    </Badge>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-9 rounded-lg border border-border bg-background px-3 text-sm"
              >
                <option value="popularity">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name A-Z</option>
              </select>
              <div className="hidden sm:flex border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn("p-2", viewMode === "grid" && "bg-muted")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn("p-2", viewMode === "list" && "bg-muted")}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg font-medium">No products found</p>
              <p className="text-muted-foreground mt-1">Try adjusting your filters</p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className={cn(
              viewMode === "grid"
                ? "grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6"
                : "flex flex-col gap-4"
            )}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh]">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
