"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard, Package, ShoppingCart, Users, Wrench, Calendar,
  FileText, Boxes, ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/repairs", label: "Repair Requests", icon: Wrench },
  { href: "/admin/services", label: "Service Bookings", icon: Calendar },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/inventory", label: "Inventory", icon: Boxes },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!session || session.user?.role !== "ADMIN") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-4">Admin access required</p>
          <Button asChild><Link href="/login">Sign In as Admin</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 shrink-0 border-r border-border bg-card hidden lg:block">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Store
          </Link>
          <h2 className="text-lg font-bold mt-4">Admin Panel</h2>
        </div>
        <nav className="px-4 space-y-1">
          {ADMIN_NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6 lg:p-8 overflow-auto">{children}</main>
    </div>
  );
}

