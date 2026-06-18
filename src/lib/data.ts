import { CATALOG_PRODUCTS, CATALOG_BRANDS } from "./catalog";
import type { Product } from "./product-types";

export type { Product, ProductSpec } from "./product-types";

export interface Category {
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  pricing: string;
  features: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export const SITE_CONFIG = {
  name: "ITZONE",
  tagline: "Rwanda's Trusted IT Hardware & Electronics Partner",
  description:
    "Rwanda's leading IT hardware supplier — laptops, smartphones, networking, servers, and accessories. Genuine products with expert support across Kigali and nationwide.",
  phone: "+250 788 123 456",
  email: "hello@itzone.rw",
  supportEmail: "support@itzone.rw",
  address: "KG 7 Ave, Kigali City Tower, Kigali, Rwanda",
  whatsapp: "+250788123456",
  country: "Rwanda",
  currency: "RWF",
  hours: {
    weekdays: "Mon - Fri: 8:00 AM - 6:00 PM",
    saturday: "Saturday: 9:00 AM - 4:00 PM",
    sunday: "Sunday: Closed",
  },
  social: {
    facebook: "https://facebook.com/itzone.rw",
    twitter: "https://twitter.com/itzone_rw",
    instagram: "https://instagram.com/itzone.rw",
    linkedin: "https://linkedin.com/company/itzone-rwanda",
    youtube: "https://youtube.com/itzone_rw",
  },
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/repair", label: "Repair" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const CATEGORIES: Category[] = [
  {
    name: "Laptops",
    slug: "laptops",
    description: "HP, Dell, Lenovo & MacBook — new and refurbished",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop",
    productCount: 57,
  },
  {
    name: "Smartphones",
    slug: "smartphones",
    description: "iPhone & Samsung Galaxy — latest to legacy models",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop",
    productCount: 46,
  },
  {
    name: "Networking Equipment",
    slug: "networking",
    description: "Ubiquiti, MikroTik, TP-Link, D-Link & Cisco",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    productCount: 28,
  },
  {
    name: "Servers",
    slug: "servers",
    description: "HPE ProLiant & Dell PowerEdge enterprise servers",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    productCount: 9,
  },
  {
    name: "Accessories",
    slug: "accessories",
    description: "Docks, monitors, storage, printers & phone accessories",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=400&fit=crop",
    productCount: 28,
  },
];

export const BRANDS = CATALOG_BRANDS;

export const PRODUCTS: Product[] = CATALOG_PRODUCTS;

export const SERVICES: Service[] = [
  {
    id: "s1",
    name: "Laptop Repair",
    category: "Hardware Repair & Maintenance",
    description: "Expert laptop repair services for all major brands. Screen replacement, keyboard repair, motherboard diagnostics, and more.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop",
    pricing: "From 45,000 RWF",
    features: ["Same-day diagnostics", "Genuine parts", "90-day warranty", "Free pickup & delivery"],
  },
  {
    id: "s2",
    name: "Desktop Repair",
    category: "Hardware Repair & Maintenance",
    description: "Complete desktop computer repair and maintenance. Power supply, motherboard, RAM upgrades, and custom builds.",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&h=400&fit=crop",
    pricing: "From 35,000 RWF",
    features: ["On-site service available", "Performance optimization", "Data preservation", "Hardware upgrades"],
  },
  {
    id: "s3",
    name: "Phone Repair",
    category: "Hardware Repair & Maintenance",
    description: "Fast phone repair for cracked screens, battery issues, charging port problems, and water damage recovery.",
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&h=400&fit=crop",
    pricing: "From 30,000 RWF",
    features: ["30-minute screen repair", "All brands supported", "Quality parts", "Water damage recovery"],
  },
  {
    id: "s4",
    name: "Motherboard Repair",
    category: "Hardware Repair & Maintenance",
    description: "Advanced motherboard-level repair including component-level soldering, chip replacement, and circuit repair.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
    pricing: "From 95,000 RWF",
    features: ["Micro-soldering expertise", "Component-level repair", "Diagnostic reports", "Success rate 85%+"],
  },
  {
    id: "s5",
    name: "Hardware Upgrades",
    category: "Hardware Repair & Maintenance",
    description: "Boost your device performance with RAM upgrades, SSD installation, GPU upgrades, and storage expansion.",
    image: "https://images.unsplash.com/photo-1555617981-dac3880aab38?w=600&h=400&fit=crop",
    pricing: "From 55,000 RWF",
    features: ["Performance benchmarking", "Compatibility check", "Data migration", "Optimization included"],
  },
  {
    id: "s6",
    name: "Data Recovery",
    category: "Hardware Repair & Maintenance",
    description: "Professional data recovery from failed drives, corrupted systems, and accidental deletions. High success rates.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    pricing: "From 145,000 RWF",
    features: ["No data, no fee policy", "Clean room facility", "Encrypted handling", "Emergency service"],
  },
  {
    id: "s7",
    name: "Technology Consulting",
    category: "IT Consulting & Strategy",
    description: "Strategic technology consulting to align your IT investments with business goals and drive digital innovation.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    pricing: "From 150,000 RWF/hr",
    features: ["Business alignment", "ROI analysis", "Technology roadmap", "Vendor evaluation"],
  },
  {
    id: "s8",
    name: "IT Infrastructure Planning",
    category: "IT Consulting & Strategy",
    description: "Design scalable, secure IT infrastructure for your growing business. Server rooms, networking, and cloud architecture.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    pricing: "Custom Quote",
    features: ["Scalability planning", "Redundancy design", "Cost optimization", "Future-proofing"],
  },
  {
    id: "s9",
    name: "Procurement Advice",
    category: "IT Consulting & Strategy",
    description: "Expert guidance on technology procurement. Get the right equipment at the best prices with our vendor relationships.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    pricing: "Free Consultation",
    features: ["Vendor negotiations", "Bulk pricing", "Compatibility review", "Lifecycle planning"],
  },
  {
    id: "s10",
    name: "Digital Transformation",
    category: "IT Consulting & Strategy",
    description: "Guide your organization through digital transformation with modern workflows, cloud migration, and automation.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
    pricing: "Custom Quote",
    features: ["Process automation", "Cloud migration", "Change management", "Training programs"],
  },
  {
    id: "s11",
    name: "Cybersecurity Assessments",
    category: "IT Consulting & Strategy",
    description: "Comprehensive security audits, vulnerability assessments, and penetration testing to protect your business.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop",
    pricing: "From 500,000 RWF",
    features: ["Vulnerability scanning", "Penetration testing", "Compliance review", "Remediation plan"],
  },
  {
    id: "s12",
    name: "Network Planning",
    category: "IT Consulting & Strategy",
    description: "Design and implement robust network infrastructure for offices, warehouses, and multi-site organizations.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    pricing: "Custom Quote",
    features: ["Site surveys", "WiFi optimization", "VPN setup", "Network monitoring"],
  },
  {
    id: "s13",
    name: "System Monitoring",
    category: "Managed IT Services",
    description: "24/7 proactive monitoring of your servers, networks, and endpoints. Catch issues before they impact your business.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    pricing: "From 99,000 RWF/mo",
    features: ["24/7 monitoring", "Alert management", "Performance reports", "Predictive maintenance"],
  },
  {
    id: "s14",
    name: "Backup Solutions",
    category: "Managed IT Services",
    description: "Automated backup solutions with local and cloud redundancy. Protect your critical business data.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop",
    pricing: "From 49,000 RWF/mo",
    features: ["Automated backups", "Cloud redundancy", "Quick recovery", "Compliance ready"],
  },
  {
    id: "s15",
    name: "Remote Support",
    category: "Managed IT Services",
    description: "Fast remote IT support for your team. Screen sharing, troubleshooting, and issue resolution without wait times.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop",
    pricing: "From 79,000 RWF/mo",
    features: ["Unlimited tickets", "15-min response", "Remote access", "Knowledge base"],
  },
  {
    id: "s16",
    name: "Cloud Solutions",
    category: "Managed IT Services",
    description: "Cloud migration, management, and optimization. AWS, Azure, and Google Cloud expertise.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    pricing: "Custom Quote",
    features: ["Cloud migration", "Cost optimization", "Security hardening", "Multi-cloud support"],
  },
];

export const REPAIR_SERVICES = [
  { name: "Screen Replacement", icon: "Monitor", price: "From 75,000 RWF", duration: "30-60 min" },
  { name: "Battery Replacement", icon: "Battery", price: "From 45,000 RWF", duration: "20-45 min" },
  { name: "Water Damage Repair", icon: "Droplets", price: "From 95,000 RWF", duration: "1-3 days" },
  { name: "Data Recovery", icon: "HardDrive", price: "From 145,000 RWF", duration: "1-5 days" },
  { name: "Virus Removal", icon: "Shield", price: "From 35,000 RWF", duration: "1-2 hours" },
  { name: "Hardware Diagnostics", icon: "Cpu", price: "Free", duration: "30 min" },
];

export const DEVICE_TYPES = [
  "Laptop", "Desktop", "Smartphone", "Tablet", "Gaming Console",
  "Printer", "Monitor", "Router", "Other",
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    title: "The Best Laptops for 2026: A Complete Buyer's Guide",
    slug: "best-laptops-2026-buyers-guide",
    excerpt: "Our experts review the top laptops across every category — from ultrabooks to gaming powerhouses.",
    content: "Choosing the right laptop in 2026 requires understanding your specific needs...",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=500&fit=crop",
    category: "Buying Guides",
    author: "Sarah Chen",
    date: "2026-06-15",
    readTime: "12 min",
  },
  {
    id: "b2",
    title: "How to Fix a Cracked Phone Screen at Home (And When to Call a Pro)",
    slug: "fix-cracked-phone-screen-guide",
    excerpt: "Step-by-step guide to understanding phone screen damage and your repair options.",
    content: "A cracked phone screen is one of the most common device issues...",
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&h=500&fit=crop",
    category: "Repair Guides",
    author: "Mike Rodriguez",
    date: "2026-06-10",
    readTime: "8 min",
  },
  {
    id: "b3",
    title: "WiFi 7 vs WiFi 6E: Is It Worth Upgrading Your Network?",
    slug: "wifi-7-vs-wifi-6e-comparison",
    excerpt: "We break down the differences between WiFi standards and help you decide if an upgrade makes sense.",
    content: "Wireless networking continues to evolve rapidly...",
    image: "https://images.unsplash.com/photo-1606900591393-1c8f4c4e0b0e?w=800&h=500&fit=crop",
    category: "Tech News",
    author: "David Park",
    date: "2026-06-08",
    readTime: "10 min",
  },
  {
    id: "b4",
    title: "MacBook Pro M3 Max Review: Power Meets Portability",
    slug: "macbook-pro-m3-max-review",
    excerpt: "In-depth review of Apple's latest flagship laptop for creative professionals.",
    content: "Apple's M3 Max chip represents a significant leap in laptop performance...",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=500&fit=crop",
    category: "Product Reviews",
    author: "Sarah Chen",
    date: "2026-06-05",
    readTime: "15 min",
  },
  {
    id: "b5",
    title: "5 Cybersecurity Essentials Every Small Business Needs",
    slug: "cybersecurity-essentials-small-business",
    excerpt: "Protect your business from cyber threats with these fundamental security practices.",
    content: "Small businesses are increasingly targeted by cybercriminals...",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop",
    category: "Business Technology Tips",
    author: "David Park",
    date: "2026-06-01",
    readTime: "7 min",
  },
  {
    id: "b6",
    title: "Building the Ultimate Gaming Setup on a Budget",
    slug: "ultimate-gaming-setup-budget",
    excerpt: "Create an impressive gaming station without breaking the bank with our expert recommendations.",
    content: "A great gaming setup doesn't have to cost thousands...",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop",
    category: "Buying Guides",
    author: "Mike Rodriguez",
    date: "2026-05-28",
    readTime: "11 min",
  },
];

export const BLOG_CATEGORIES = [
  "All", "Tech News", "Product Reviews", "Repair Guides", "Buying Guides", "Business Technology Tips",
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Jean Baptiste N.",
    role: "IT Director",
    company: "Bank of Kigali Partner",
    content: "ITZONE has been our trusted hardware supplier for 3 years. Their HP EliteBooks and Ubiquiti networking gear power our entire branch network across Rwanda.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
  {
    id: "t2",
    name: "Alice Mukamana",
    role: "Business Owner",
    company: "Kigali Creative Studio",
    content: "Fast delivery in Kigali, genuine products, and excellent support. I equipped my entire office with Dell laptops and monitors at great corporate pricing.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
  {
    id: "t3",
    name: "Patrick Habimana",
    role: "Network Engineer",
    company: "Rwanda Tech Solutions",
    content: "Their MikroTik and Ubiquiti stock is unmatched in Rwanda. ITZONE helped us deploy a complete UniFi network for a client in under a week.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    id: "t4",
    name: "Grace Uwase",
    role: "Software Developer",
    company: "Independent",
    content: "Got my MacBook Pro and iPhone 16 Pro Max here — both genuine with full warranty. Best IT shop in Kigali, hands down.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
];

export const WHY_CHOOSE_US = [
  { icon: "ShieldCheck", title: "Genuine Products", description: "100% authentic IT hardware from authorized distributors with full manufacturer warranties in Rwanda." },
  { icon: "Truck", title: "Fast Delivery", description: "Same-day delivery in Kigali. Nationwide shipping across Rwanda on all in-stock items." },
  { icon: "Headphones", title: "Expert Technical Support", description: "Certified technicians available 6 days a week for pre and post-sale support in Kinyarwanda, English & French." },
  { icon: "Wrench", title: "Professional Repairs", description: "Authorized repair center with 90-day warranty on all laptop and phone repair services." },
  { icon: "Building2", title: "Business Solutions", description: "Corporate pricing, bulk orders, and dedicated account managers for Rwandan businesses and NGOs." },
];

export const TEAM_MEMBERS: TeamMember[] = [
  { id: "tm1", name: "Eric Nshimiyimana", role: "CEO & Founder", bio: "15+ years supplying IT hardware across East Africa.", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop" },
  { id: "tm2", name: "Claire Mutoni", role: "Head of Technology", bio: "Certified network engineer specializing in enterprise deployments.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop" },
  { id: "tm3", name: "David Hakizimana", role: "Director of Services", bio: "ITIL-certified with 12 years of managed services in Rwanda.", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop" },
  { id: "tm4", name: "Marie Uwimana", role: "Customer Experience Lead", bio: "Passionate about delivering world-class service to Rwandan customers.", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop" },
];

export const CERTIFICATIONS = [
  "HP Authorized Partner",
  "Dell Technologies Partner",
  "Lenovo Partner",
  "Ubiquiti Authorized Reseller",
  "MikroTik Certified",
  "Apple Authorized Reseller",
];

export const PARTNER_LOGOS = [
  { name: "HP", logo: "💻" },
  { name: "Dell", logo: "🖥️" },
  { name: "Lenovo", logo: "💻" },
  { name: "Apple", logo: "🍎" },
  { name: "Ubiquiti", logo: "📡" },
  { name: "Samsung", logo: "📱" },
];

export const ACHIEVEMENTS = [
  { value: "10+", label: "Years in Rwanda" },
  { value: "5K+", label: "Happy Customers" },
  { value: "168+", label: "Products Available" },
  { value: "99%", label: "Customer Satisfaction" },
];

export const COUPONS = [
  { code: "WELCOME10", description: "10% off your first order", discount: 10, type: "percentage" },
  { code: "KIGALI50K", description: "50,000 RWF off orders over 500,000 RWF", discount: 50000, type: "fixed" },
  { code: "TECH15", description: "15% off networking equipment", discount: 15, type: "percentage" },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(currentSlug: string, category: string, limit = 3): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.slug !== currentSlug && p.category === category).slice(0, limit);
}
