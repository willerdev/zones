"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight, ShieldCheck, Truck, Headphones, Wrench, Building2,
} from "lucide-react";
import {
  SITE_CONFIG, CATEGORIES, getFeaturedProducts, WHY_CHOOSE_US, TESTIMONIALS,
} from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import { TestimonialsCarousel } from "@/components/home/testimonials-carousel";
import { NewsletterSection } from "@/components/home/newsletter-section";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck, Truck, Headphones, Wrench, Building2,
};

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      {/* Hero — hidden on phone */}
      <section className="relative min-h-[90vh] hidden md:flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=1080&fit=crop"
            alt="Technology background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40 dark:from-background dark:via-background/95 dark:to-background/60" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              ITZONE Rwanda — IT Hardware Supply
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Rwanda&apos;s Trusted{" "}
              <span className="gradient-text">IT Hardware & Electronics</span>{" "}
              Partner
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
              Laptops, smartphones, networking, servers & accessories — genuine products
              from HP, Dell, Lenovo, Apple, Ubiquiti, MikroTik and more. Delivered across Kigali and Rwanda.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/products">
                  Shop Now <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services">Request Service</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="pt-3 pb-8 md:py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4 md:mb-12">
            <h2 className="text-lg md:text-3xl font-bold">Shop by Category</h2>
            <p className="mt-1 text-xs md:text-base text-muted-foreground hidden sm:block">Explore our wide range of technology products</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.25 }}
              >
                <Link
                  href={`/products?category=${cat.slug}`}
                  className="group relative block overflow-hidden rounded-xl md:rounded-2xl aspect-[5/4] md:aspect-[4/3] border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4">
                    <h3 className="text-white font-semibold text-xs md:text-base leading-tight">{cat.name}</h3>
                    <p className="text-white/70 text-[10px] md:text-xs mt-0.5">{cat.productCount} products</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-10 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <p className="mt-2 text-muted-foreground">Hand-picked top deals for you</p>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex">
              <Link href="/products">View All <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild>
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us — desktop only */}
      <section className="hidden md:block py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Choose {SITE_CONFIG.name}?</h2>
            <p className="mt-2 text-muted-foreground">The trusted choice for technology solutions</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {WHY_CHOOSE_US.map((item, i) => {
              const Icon = iconMap[item.icon] || ShieldCheck;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">What Our Customers Say</h2>
            <p className="mt-2 text-muted-foreground">Trusted by thousands of businesses and individuals</p>
          </div>
          <TestimonialsCarousel testimonials={TESTIMONIALS} />
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <NewsletterSection />
        </div>
      </section>
    </>
  );
}
