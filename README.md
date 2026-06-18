# ITZONE Rwanda — IT Hardware E-Commerce Platform

A modern, production-ready IT hardware e-commerce website for Rwanda, built with Next.js, TypeScript, Tailwind CSS, and PostgreSQL.

## Features

- **168+ Products** from the ITZONE Rwanda hardware catalog
- **Categories**: Laptops, Smartphones, Networking, Servers, Accessories
- **Brands**: HP, Dell, Lenovo, Apple, Samsung, Ubiquiti, MikroTik, TP-Link, Cisco, HPE, and more
- **Rwanda-focused**: RWF pricing, Kigali delivery, local contact details
- **E-Commerce**: Cart, wishlist, comparison, checkout with coupons
- **Admin Dashboard**: Product, order, customer, repair, and inventory management
- **Theme**: Dark navy blue & cream white branding

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- PostgreSQL + Prisma ORM
- NextAuth.js v5

## Getting Started

```bash
npm install
cp .env.example .env
npm run db:push
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Demo Accounts

| Role     | Email             | Password |
|----------|-------------------|----------|
| Admin    | admin@itzone.rw   | admin123 |
| Customer | demo@itzone.rw    | demo123  |

## Coupon Codes

- `WELCOME10` — 10% off first order
- `KIGALI50K` — 50,000 RWF off orders over 500,000 RWF
- `TECH15` — 15% off networking equipment

## License

MIT
