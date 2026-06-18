import type { CartItem } from "@/context/cart-context";
import { SITE_CONFIG } from "@/lib/data";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://zones-briv.onrender.com";

export interface QuotationContact {
  name: string;
  company: string;
  location: string;
}

export function isQuotationContactValid(contact: QuotationContact): boolean {
  return (
    contact.name.trim().length > 0 &&
    contact.company.trim().length > 0 &&
    contact.location.trim().length > 0
  );
}

export function buildQuotationMessage(
  items: CartItem[],
  contact: QuotationContact
): string {
  const productLines = items.flatMap(({ product, quantity }) => [
    `• ${product.name}`,
    `  Brand: ${product.brand}`,
    `  Quantity: ${quantity}`,
    `  Link: ${SITE_URL}/products/${product.slug}`,
    "",
  ]);

  return [
    "Hello ITZONE,",
    "",
    "I would like a quotation for the following products:",
    "",
    ...productLines,
    "My details:",
    `Name: ${contact.name.trim()}`,
    `Company: ${contact.company.trim()}`,
    `Company Location: ${contact.location.trim()}`,
    "",
    "Please send me pricing and availability.",
    "",
    "Thank you.",
  ].join("\n");
}

export function getWhatsAppQuotationUrl(
  items: CartItem[],
  contact: QuotationContact
): string {
  const phone = SITE_CONFIG.whatsapp.replace(/[^0-9]/g, "");
  const text = encodeURIComponent(buildQuotationMessage(items, contact));
  return `https://wa.me/${phone}?text=${text}`;
}

export function getEmailQuotationUrl(
  items: CartItem[],
  contact: QuotationContact
): string {
  const subject = encodeURIComponent(
    `Quotation Request from ${contact.name.trim()} - ${contact.company.trim()}`
  );
  const body = encodeURIComponent(buildQuotationMessage(items, contact));
  return `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`;
}
