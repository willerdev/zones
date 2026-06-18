"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/account" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block">
        ← Back to Account
      </Link>
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

      <form className="space-y-4 p-6 rounded-2xl bg-card border border-border/50">
        <div>
          <label className="text-sm font-medium mb-1 block">Full Name</label>
          <Input defaultValue={session?.user?.name || ""} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Email</label>
          <Input type="email" defaultValue={session?.user?.email || ""} disabled />
        </div>
        <Button type="button">Save Changes</Button>
      </form>
    </div>
  );
}
