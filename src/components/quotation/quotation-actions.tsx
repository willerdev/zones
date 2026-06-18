"use client";

import { Mail, MessageCircle } from "lucide-react";
import type { CartItem } from "@/context/cart-context";
import {
  type QuotationContact,
  getEmailQuotationUrl,
  getWhatsAppQuotationUrl,
  isQuotationContactValid,
} from "@/lib/quotation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuotationActionsProps {
  items: CartItem[];
  contact: QuotationContact;
  className?: string;
  size?: "default" | "lg";
  layout?: "row" | "column";
}

export function QuotationActions({
  items,
  contact,
  className,
  size = "default",
  layout = "column",
}: QuotationActionsProps) {
  if (items.length === 0) return null;

  const isValid = isQuotationContactValid(contact);
  const emailUrl = isValid ? getEmailQuotationUrl(items, contact) : undefined;
  const whatsappUrl = isValid ? getWhatsAppQuotationUrl(items, contact) : undefined;

  return (
    <div
      className={cn(
        "flex gap-3",
        layout === "column" ? "flex-col" : "flex-col sm:flex-row",
        className
      )}
    >
      <Button size={size} className="w-full" disabled={!isValid} asChild={isValid}>
        {isValid ? (
          <a href={emailUrl}>
            <Mail className="h-4 w-4" />
            Get Quotation via Email
          </a>
        ) : (
          <span>
            <Mail className="h-4 w-4" />
            Get Quotation via Email
          </span>
        )}
      </Button>
      <Button
        size={size}
        variant="outline"
        className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white disabled:opacity-50"
        disabled={!isValid}
        asChild={isValid}
      >
        {isValid ? (
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4" />
            Get Quotation via WhatsApp
          </a>
        ) : (
          <span>
            <MessageCircle className="h-4 w-4" />
            Get Quotation via WhatsApp
          </span>
        )}
      </Button>
    </div>
  );
}
