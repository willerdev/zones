"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search, X, TrendingUp } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "@/lib/data";

const TRENDING = ["MacBook Pro", "iPhone 16", "HP EliteBook", "Samsung Galaxy S24", "Ubiquiti"];

export function MobileSearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [query]);

  const showPanel = focused;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (term?: string) => {
    const q = (term ?? query).trim();
    if (!q) return;
    setFocused(false);
    setQuery("");
    router.push(`/products?q=${encodeURIComponent(q)}`);
  };

  return (
    <div ref={containerRef} className="relative lg:hidden border-b border-border/50 bg-primary px-3 py-1.5">
      <div className="relative flex">
        <div className="relative flex-1 flex items-center bg-background rounded-l-lg overflow-hidden">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search ITZONE"
            className="w-full h-10 pl-9 pr-3 text-sm bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            autoComplete="off"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2 p-1 text-muted-foreground"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <button
          onClick={() => handleSearch()}
          className="h-10 px-4 bg-[#c9a227] hover:bg-[#b8922a] text-[#0c1a2e] font-semibold text-sm rounded-r-lg transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Search className="h-4 w-4" />
          <span className="hidden xs:inline">Go</span>
        </button>
      </div>

      {showPanel && (
        <>
          <div
            className="fixed inset-0 top-[7rem] z-40 bg-black/30"
            onClick={() => setFocused(false)}
          />
          <div className="fixed left-0 right-0 top-[7rem] z-50 bg-background border-b border-border shadow-xl max-h-[70vh] overflow-y-auto">
          <div className="px-3 py-3">
            {!query && (
              <>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> Trending
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {TRENDING.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSearch(term)}
                      className="px-3 py-1.5 text-xs rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Categories</p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/products?category=${cat.slug}`}
                      onClick={() => setFocused(false)}
                      className="px-3 py-1.5 text-xs rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </>
            )}

            {query && suggestions.length > 0 && (
              <ul className="divide-y divide-border">
                {suggestions.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={() => { setFocused(false); setQuery(""); }}
                      className="flex items-center gap-3 py-2.5 hover:bg-muted/50 rounded-lg px-1 transition-colors"
                    >
                      <div className="relative h-10 w-10 rounded-lg overflow-hidden shrink-0 bg-muted">
                        <Image src={product.images[0]} alt="" fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.brand} · Get Quotation</p>
                      </div>
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => handleSearch()}
                    className="w-full text-left py-2.5 px-1 text-sm text-primary font-medium hover:bg-muted/50 rounded-lg"
                  >
                    See all results for &ldquo;{query}&rdquo;
                  </button>
                </li>
              </ul>
            )}

            {query && suggestions.length === 0 && (
              <p className="text-sm text-muted-foreground py-4 text-center">No products found for &ldquo;{query}&rdquo;</p>
            )}
          </div>
        </div>
        </>
      )}
    </div>
  );
}
