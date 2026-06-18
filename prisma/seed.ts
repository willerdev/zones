import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";
import {
  PRODUCTS, CATEGORIES, BLOG_POSTS, COUPONS,
} from "../src/lib/data";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required for seeding");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  const adminPassword = await bcrypt.hash("admin123", 12);
  const demoPassword = await bcrypt.hash("demo123", 12);

  await prisma.user.upsert({
    where: { email: "admin@itzone.rw" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@itzone.rw",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { email: "demo@itzone.rw" },
    update: {},
    create: {
      name: "Demo User",
      email: "demo@itzone.rw",
      password: demoPassword,
      role: "CUSTOMER",
    },
  });

  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        image: cat.image,
      },
    });
  }

  const brandNames = [...new Set(PRODUCTS.map((p) => p.brand))];
  for (const brandName of brandNames) {
    const slug = brandName.toLowerCase().replace(/\s+/g, "-");
    await prisma.brand.upsert({
      where: { slug },
      update: {},
      create: { name: brandName, slug },
    });
  }

  const categories = await prisma.category.findMany();
  const brands = await prisma.brand.findMany();

  for (const product of PRODUCTS) {
    const category = categories.find((c) => c.slug === product.categorySlug);
    const brand = brands.find((b) => b.slug === product.brandSlug);
    if (!category || !brand) continue;

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        discountPrice: product.discountPrice,
        images: product.images,
        specs: product.specs,
        condition: product.condition,
        availability: product.availability,
        stock: product.stock,
        warranty: product.warranty,
        rating: product.rating,
        reviewCount: product.reviewCount,
        popularity: product.popularity,
        featured: product.featured,
        categoryId: category.id,
        brandId: brand.id,
      },
    });
  }

  for (const post of BLOG_POSTS) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        image: post.image,
        category: post.category,
        author: post.author,
      },
    });
  }

  for (const coupon of COUPONS) {
    await prisma.coupon.upsert({
      where: { code: coupon.code },
      update: {},
      create: {
        code: coupon.code,
        description: coupon.description,
        discountType: coupon.type,
        discountValue: coupon.discount,
      },
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
