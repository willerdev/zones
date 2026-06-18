"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileText, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { QuotationActions } from "@/components/quotation/quotation-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { QuotationContact } from "@/lib/quotation";

const EMPTY_CONTACT: QuotationContact = {
  name: "",
  company: "",
  location: "",
};

export default function CheckoutPage() {
  const { items, itemCount } = useCart();
  const router = useRouter();
  const [contact, setContact] = useState<QuotationContact>(EMPTY_CONTACT);

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items.length, router]);

  if (items.length === 0) {
    return null;
  }

  const updateContact = (field: keyof QuotationContact, value: string) => {
    setContact((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" size="sm" className="mb-6 -ml-2" asChild>
        <Link href="/cart">
          <ArrowLeft className="h-4 w-4" /> Back to Quote List
        </Link>
      </Button>

      <div className="flex items-center gap-3 mb-2">
        <FileText className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Get Quotation</h1>
      </div>
      <p className="text-muted-foreground mb-8">
        Fill in your details, then send your product list to ITZONE via email or WhatsApp.
      </p>

      <div className="rounded-2xl border border-border/50 bg-card overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-border/50 bg-muted/30">
          <h2 className="font-semibold">Your Products ({itemCount})</h2>
        </div>
        <ul className="divide-y divide-border/50">
          {items.map(({ product, quantity }) => (
            <li key={product.id} className="flex items-center gap-4 px-6 py-4">
              <div className="relative h-14 w-14 rounded-lg overflow-hidden shrink-0 bg-muted">
                <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium line-clamp-1">{product.name}</p>
                <p className="text-sm text-muted-foreground">{product.brand} · Qty: {quantity}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6 rounded-2xl border border-border/50 bg-card mb-8">
        <h2 className="font-semibold mb-2">Your Details</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Please provide your contact information before submitting your quotation request.
        </p>
        <div className="space-y-4">
          <div>
            <label htmlFor="quote-name" className="text-sm font-medium mb-1.5 block">
              Full Name <span className="text-destructive">*</span>
            </label>
            <Input
              id="quote-name"
              placeholder="e.g. Jean Baptiste Nkurunziza"
              value={contact.name}
              onChange={(e) => updateContact("name", e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="quote-company" className="text-sm font-medium mb-1.5 block">
              Company <span className="text-destructive">*</span>
            </label>
            <Input
              id="quote-company"
              placeholder="e.g. Kigali Tech Solutions Ltd"
              value={contact.company}
              onChange={(e) => updateContact("company", e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="quote-location" className="text-sm font-medium mb-1.5 block">
              Company Location <span className="text-destructive">*</span>
            </label>
            <Input
              id="quote-location"
              placeholder="e.g. Kigali, Rwanda"
              value={contact.location}
              onChange={(e) => updateContact("location", e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-border/50 bg-card">
        <h2 className="font-semibold mb-2">Send your request</h2>
        <p className="text-sm text-muted-foreground mb-6">
          A pre-filled message with your details and product list will open in your email app or WhatsApp.
        </p>
        <QuotationActions items={items} contact={contact} size="lg" />
      </div>
    </div>
  );
}
