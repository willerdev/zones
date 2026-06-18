"use client";

import Image from "next/image";
import { Plus, Edit } from "lucide-react";
import { BLOG_POSTS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminBlogPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Blog Management</h1>
        <Button><Plus className="h-4 w-4" /> New Post</Button>
      </div>
      <div className="space-y-4">
        {BLOG_POSTS.map((post) => (
          <div key={post.id} className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50">
            <div className="relative h-16 w-24 rounded-lg overflow-hidden shrink-0">
              <Image src={post.image} alt="" fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm line-clamp-1">{post.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">{post.category}</Badge>
                <span className="text-xs text-muted-foreground">{post.author} · {post.date}</span>
              </div>
            </div>
            <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
          </div>
        ))}
      </div>
    </div>
  );
}
