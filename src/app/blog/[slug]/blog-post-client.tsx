"use client";

import { Share2, Globe, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlogPostClient({ title, slug }: { title: string; slug: string }) {
  const url = typeof window !== "undefined" ? `${window.location.origin}/blog/${slug}` : "";

  const share = (platform: string) => {
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };
    window.open(urls[platform], "_blank", "width=600,height=400");
  };

  return (
    <div className="mt-8 pt-8 border-t border-border flex items-center gap-3">
      <Share2 className="h-5 w-5 text-muted-foreground" />
      <span className="text-sm font-medium">Share:</span>
      <Button variant="outline" size="sm" onClick={() => share("twitter")}>
        <Share2 className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="sm" onClick={() => share("facebook")}>
        <Globe className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="sm" onClick={() => share("linkedin")}>
        <ExternalLink className="h-4 w-4" />
      </Button>
    </div>
  );
}
