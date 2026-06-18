import Link from "next/link";
import { Globe, Share2, ExternalLink, Mail, Phone, MapPin } from "lucide-react";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-sm">
                IT
              </div>
              <span className="text-xl font-bold">{SITE_CONFIG.name}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {SITE_CONFIG.description}
            </p>
            <div className="mt-4 flex gap-3">
              {[
                { icon: Globe, href: SITE_CONFIG.social.facebook, label: "Facebook" },
                { icon: Share2, href: SITE_CONFIG.social.twitter, label: "Twitter" },
                { icon: ExternalLink, href: SITE_CONFIG.social.instagram, label: "Instagram" },
                { icon: Globe, href: SITE_CONFIG.social.linkedin, label: "LinkedIn" },
                { icon: ExternalLink, href: SITE_CONFIG.social.youtube, label: "YouTube" },
              ].map(({ icon: Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
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

          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/account/orders" className="hover:text-foreground transition-colors">Order Tracking</Link></li>
              <li><Link href="/repair" className="hover:text-foreground transition-colors">Repair Status</Link></li>
              <li><Link href="/products" className="hover:text-foreground transition-colors">Returns & Warranty</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link href="/products?bulk=true" className="hover:text-foreground transition-colors">Bulk Orders</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{SITE_CONFIG.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-foreground transition-colors">
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-foreground transition-colors">
                  {SITE_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
