"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Package, Heart, User, Settings, Shield, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const MENU_ITEMS = [
  { href: "/account/orders", label: "Order History", icon: Package },
  { href: "/wishlist", label: "Wishlist", icon: Heart },
  { href: "/account/profile", label: "Profile Settings", icon: User },
  { href: "/repair", label: "Repair Requests", icon: Settings },
];

export default function AccountPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-[50vh]">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Sign In Required</h1>
        <p className="text-muted-foreground mb-6">Please sign in to access your account</p>
        <Button asChild><Link href="/login">Sign In</Link></Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Account</h1>
          <p className="text-muted-foreground">Welcome back, {session.user?.name || session.user?.email}</p>
        </div>
        {session.user?.role === "ADMIN" && (
          <Button variant="outline" asChild>
            <Link href="/admin"><Shield className="h-4 w-4" /> Admin Dashboard</Link>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MENU_ITEMS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border/50 hover:shadow-md transition-shadow"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <span className="font-semibold">{label}</span>
          </Link>
        ))}
      </div>

      <Button variant="outline" className="mt-8" onClick={() => signOut({ callbackUrl: "/" })}>
        <LogOut className="h-4 w-4" /> Sign Out
      </Button>
    </div>
  );
}
