import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, User, ArrowLeft } from "lucide-react";
import { BLOG_POSTS, getBlogPostBySlug, getRelatedPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import BlogPostClient from "./blog-post-client";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(slug, post.category);

  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Blog
      </Link>

      <Badge className="mb-4">{post.category}</Badge>
      <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{post.title}</h1>

      <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1"><User className="h-4 w-4" /> {post.author}</span>
        <span>{formatDate(post.date)}</span>
        <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {post.readTime} read</span>
      </div>

      <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden mt-8">
        <Image src={post.image} alt={post.title} fill className="object-cover" priority />
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none mt-8">
        <p className="text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>
        <p className="mt-4 leading-relaxed">{post.content}</p>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            At ITZONE Rwanda, we stay at the forefront of technology to bring you the best products and advice.
            Whether you&apos;re upgrading your office in Kigali or deploying a nationwide network, our team is here to help.
            Visit our store or contact us for personalized recommendations tailored to your needs.
          </p>
      </div>

      <BlogPostClient title={post.title} slug={post.slug} />

      {relatedPosts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedPosts.map((related) => (
              <Link
                key={related.id}
                href={`/blog/${related.slug}`}
                className="group rounded-xl border border-border/50 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-32">
                  <Image src={related.image} alt={related.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
