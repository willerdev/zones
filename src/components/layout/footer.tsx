import Link from "next/link";
import { Globe, Share2, ExternalLink, Mail, Phone, MapPin } from "lucide-react";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/data";

const MOBILE_LINKS = NAV_LINKS.slice(0, 5);
const MOBILE_HELP = [
  { href: "/account/orders", label: "Orders" },
  { href: "/repair", label: "Repair" },
  { href: "/contact", label: "FAQ" },
  { href: "/products?bulk=true", label: "Bulk" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 py-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:py-12">
          {/* Brand — full width on mobile */}
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-3">
              <span className="text-lg font-bold uppercase tracking-tight">{SITE_CONFIG.name}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed hidden lg:block">
              {SITE_CONFIG.description}
            </p>
            <p className="text-xs text-muted-foreground lg:hidden">
              Premium IT hardware &amp; services in Rwanda
            </p>
            <div className="mt-3 flex gap-2">
              {[
                { icon: Globe, href: SITE_CONFIG.social.facebook, label: "Facebook" },
                { icon: Share2, href: SITE_CONFIG.social.twitter, label: "Twitter" },
                { icon: ExternalLink, href: SITE_CONFIG.social.instagram, label: "Instagram" },
              ].map(({ icon: Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Shop</h3>
            <ul className="space-y-2">
              {MOBILE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help — mobile; Customer Service — desktop */}
          <div>
            <h3 className="font-semibold text-sm mb-3 lg:hidden">Help</h3>
            <h3 className="font-semibold mb-4 hidden lg:block">Customer Service</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {MOBILE_HELP.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="hidden lg:block">
                <Link href="/products" className="hover:text-foreground transition-colors">Returns & Warranty</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-sm mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-foreground transition-colors">
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-foreground transition-colors">
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex items-start gap-2 hidden lg:flex">
                <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                <span>{SITE_CONFIG.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border py-4 lg:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs lg:text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
