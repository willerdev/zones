import type { Product, ProductSpec } from "./product-types";
import { slugify } from "./utils";

const IMAGES = {
  laptops: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop",
  macbook: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop",
  smartphones: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop",
  iphone: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=600&fit=crop",
  networking: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
  servers: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
  accessories: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=600&fit=crop",
  monitors: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=600&fit=crop",
  printers: "https://images.unsplash.com/photo-1612815154855-91312e2a6d0e?w=800&h=600&fit=crop",
};

interface CatalogEntry {
  name: string;
  brand: string;
  category: string;
  categorySlug: string;
  basePrice: number;
  condition?: "NEW" | "REFURBISHED" | "USED";
  specs?: ProductSpec[];
  featured?: boolean;
  image?: string;
}

function brandSlug(brand: string): string {
  return slugify(brand);
}

function createProduct(entry: CatalogEntry, id: number): Product {
  const slug = slugify(entry.name);
  const condition = entry.condition ?? (entry.name.includes("Refurb") ? "REFURBISHED" : "NEW");
  const hasDiscount = id % 4 === 0;
  const discountPct = 0.08;

  return {
    id: String(id),
    name: entry.name,
    slug,
    description: `Genuine ${entry.brand} ${entry.name} — available at ITZONE Rwanda. ${condition === "REFURBISHED" ? "Certified refurbished with warranty." : "Brand new with full manufacturer warranty."} Ideal for businesses and professionals across Rwanda.`,
    price: entry.basePrice,
    discountPrice: hasDiscount ? Math.round(entry.basePrice * (1 - discountPct)) : undefined,
    images: [entry.image ?? IMAGES[entry.categorySlug as keyof typeof IMAGES] ?? IMAGES.accessories],
    specs: entry.specs ?? [
      { label: "Brand", value: entry.brand },
      { label: "Condition", value: condition },
      { label: "Warranty", value: "1 Year ITZONE Warranty" },
      { label: "Availability", value: "Kigali & Nationwide Delivery" },
    ],
    condition,
    availability: id % 11 === 0 ? "LOW_STOCK" : "IN_STOCK",
    stock: 5 + (id % 20),
    warranty: condition === "REFURBISHED" ? "90-Day ITZONE Warranty" : "1 Year Manufacturer Warranty",
    rating: 4.3 + (id % 7) * 0.1,
    reviewCount: 12 + id * 3,
    popularity: 50 + (id % 50),
    featured: entry.featured ?? id <= 12,
    category: entry.category,
    categorySlug: entry.categorySlug,
    brand: entry.brand,
    brandSlug: brandSlug(entry.brand),
  };
}

function laptop(brand: string, name: string, price: number, featured = false, condition?: "NEW" | "REFURBISHED"): CatalogEntry {
  const displayName = name.startsWith(brand) ? name : `${brand} ${name}`;
  return {
    name: displayName,
    brand,
    category: "Laptops",
    categorySlug: "laptops",
    basePrice: price,
    featured,
    condition,
    image: brand === "Apple" ? IMAGES.macbook : IMAGES.laptops,
    specs: [
      { label: "Type", value: "Business Laptop" },
      { label: "Brand", value: brand },
      { label: "Condition", value: condition ?? "NEW" },
      { label: "OS", value: brand === "Apple" ? "macOS" : "Windows 11 Pro" },
    ],
  };
}

function phone(brand: string, name: string, price: number, featured = false): CatalogEntry {
  return {
    name,
    brand,
    category: "Smartphones",
    categorySlug: "smartphones",
    basePrice: price,
    featured,
    image: brand === "Apple" ? IMAGES.iphone : IMAGES.smartphones,
    specs: [
      { label: "Brand", value: brand },
      { label: "Network", value: "4G/5G Unlocked" },
      { label: "Warranty", value: "1 Year" },
    ],
  };
}

function network(brand: string, name: string, price: number, featured = false): CatalogEntry {
  return {
    name,
    brand,
    category: "Networking Equipment",
    categorySlug: "networking",
    basePrice: price,
    featured,
    image: IMAGES.networking,
    specs: [
      { label: "Brand", value: brand },
      { label: "Category", value: "Enterprise Networking" },
      { label: "Support", value: "ITZONE Configuration Available" },
    ],
  };
}

function server(brand: string, name: string, price: number): CatalogEntry {
  return {
    name,
    brand,
    category: "Servers",
    categorySlug: "servers",
    basePrice: price,
    image: IMAGES.servers,
    specs: [
      { label: "Brand", value: brand },
      { label: "Type", value: "Rack Server" },
      { label: "Support", value: "Installation & Setup Available" },
    ],
  };
}

function accessory(name: string, brand: string, price: number, sub?: string): CatalogEntry {
  return {
    name,
    brand,
    category: "Accessories",
    categorySlug: "accessories",
    basePrice: price,
    image: name.toLowerCase().includes("monitor") ? IMAGES.monitors :
           name.toLowerCase().includes("printer") ? IMAGES.printers : IMAGES.accessories,
    specs: [
      { label: "Type", value: sub ?? "Computer Accessory" },
      { label: "Brand", value: brand },
    ],
  };
}

const CATALOG: CatalogEntry[] = [
  // HP Laptops
  ...[
    ["EliteBook 840 G11", 1850000],
    ["EliteBook 845 G11", 1920000],
    ["EliteBook 860 G11", 2100000],
    ["EliteBook Ultra G1i", 2450000],
    ["ProBook 440 G11", 1280000],
    ["ProBook 450 G11", 1350000],
    ["ProBook 445 G10", 1180000],
    ["EliteBook 830 G10", 1650000],
    ["EliteBook x360 1040 G11", 2280000],
    ["OmniBook Ultra 14", 1750000],
    ["EliteBook 640 G11", 1420000],
    ["ProBook 460 G11", 1480000],
    ["EliteBook 650 G10", 1580000],
    ["ZBook Power G11", 2650000],
    ["EliteBook 1040 G11", 2380000],
    ["ProBook 455 G10", 1250000],
    ["EliteBook 845 G10", 1780000],
    ["OmniBook X 14", 1680000],
    ["EliteBook 630 G10", 1320000],
    ["ProBook 440 G10", 1150000, "REFURBISHED" as const],
  ].map(([name, price, cond], i) => laptop("HP", name as string, price as number, i < 3, cond as "REFURBISHED" | undefined)),

  // Dell Laptops
  ...[
    ["Latitude 5450", 1380000],
    ["Latitude 5550", 1450000],
    ["Latitude 7455", 1980000],
    ["Latitude 3550", 980000],
    ["Latitude 5455", 1420000],
    ["XPS 14 (2025)", 2650000],
    ["XPS 16", 2980000],
    ["Latitude 9350 2-in-1", 2150000],
    ["Latitude 7340", 1720000],
    ["Precision 5690 Workstation", 3850000],
    ["Latitude 5540", 1280000],
    ["Latitude 7440", 1850000],
    ["Latitude 3555", 1050000],
    ["Pro 14", 1180000],
    ["Pro 16", 1350000],
  ].map(([name, price], i) => laptop("Dell", name as string, price as number, i < 2)),

  // Lenovo Laptops
  ...[
    ["ThinkPad E16 Gen 2", 1150000],
    ["ThinkPad T14s Gen 6", 1850000],
    ["ThinkPad X1 Carbon Gen 13", 2650000],
    ["ThinkBook 14 G7", 1080000],
    ["ThinkPad L14 Gen 5", 980000],
    ["ThinkPad T14 Gen 6", 1580000],
    ["ThinkBook 16 G7", 1220000],
    ["ThinkPad X1 Yoga Gen 9", 2450000],
    ["ThinkPad E14 Gen 6", 1050000],
    ["ThinkPad T16 Gen 3", 1680000],
    ["ThinkPad P16s Gen 3", 2280000],
    ["ThinkBook 15 G4", 950000],
  ].map(([name, price], i) => laptop("Lenovo", name as string, price as number, i < 2)),

  // MacBook
  ...[
    ['MacBook Air 13" M5', 1680000],
    ['MacBook Air 15" M5', 1980000],
    ['MacBook Pro 14" M5', 2850000],
    ['MacBook Pro 16" M5 Pro/Max', 4250000],
    ['MacBook Air 13" M4', 1480000],
    ['MacBook Air 15" M4', 1780000],
    ['MacBook Pro 14" M4 Pro', 2650000],
    ['MacBook Pro 16" M4 Max', 3950000],
    ['MacBook Air 13" M3', 1280000],
    ['MacBook Pro 14" M3 Pro', 2380000],
  ].map(([name, price], i) => laptop("Apple", name as string, price as number, i < 4)),

  // iPhones
  ...[
    ["iPhone 11", 420000], ["iPhone 11 Pro", 520000], ["iPhone 11 Pro Max", 580000],
    ["iPhone 12", 550000], ["iPhone 12 Pro", 680000], ["iPhone 12 Pro Max", 750000],
    ["iPhone 13", 650000], ["iPhone 13 Pro", 820000], ["iPhone 13 Pro Max", 920000],
    ["iPhone 14", 780000], ["iPhone 14 Plus", 850000], ["iPhone 14 Pro", 1050000], ["iPhone 14 Pro Max", 1180000],
    ["iPhone 15", 980000], ["iPhone 15 Plus", 1080000], ["iPhone 15 Pro", 1280000], ["iPhone 15 Pro Max", 1450000],
    ["iPhone 16", 1180000], ["iPhone 16 Plus", 1280000], ["iPhone 16 Pro", 1580000], ["iPhone 16 Pro Max", 1780000],
    ["iPhone 17", 1380000], ["iPhone 17 Air", 1480000], ["iPhone 17 Pro", 1680000], ["iPhone 17 Pro Max", 1880000],
  ].map(([name, price], i) => phone("Apple", name as string, price as number, i >= 20)),

  // Samsung Phones
  ...[
    ["Samsung Galaxy S21", 380000], ["Samsung Galaxy S21 Ultra", 520000],
    ["Samsung Galaxy S22", 450000], ["Samsung Galaxy S22 Ultra", 580000],
    ["Samsung Galaxy S23", 550000], ["Samsung Galaxy S23 Ultra", 720000],
    ["Samsung Galaxy S24", 680000], ["Samsung Galaxy S24 Ultra", 950000],
    ["Samsung Galaxy S25", 820000], ["Samsung Galaxy S25 Ultra", 1150000],
    ["Samsung Galaxy S26 Ultra", 1280000],
    ["Samsung Galaxy A16", 185000], ["Samsung Galaxy A26", 245000], ["Samsung Galaxy A36", 320000],
    ["Samsung Galaxy A56", 420000], ["Samsung Galaxy A57", 480000],
    ["Samsung Galaxy M14", 165000], ["Samsung Galaxy M34", 225000], ["Samsung Galaxy M54", 350000], ["Samsung Galaxy M55", 385000],
    ["Samsung Galaxy Z Fold 6", 1850000], ["Samsung Galaxy Z Flip 6", 980000],
  ].map(([name, price], i) => phone("Samsung", name as string, price as number, i >= 18)),

  // Ubiquiti UniFi
  ...[
    ["Ubiquiti Dream Machine Pro", 685000],
    ["Ubiquiti Dream Machine SE", 520000],
    ["Ubiquiti U7 Pro Access Point", 285000],
    ["Ubiquiti U6 Enterprise AP", 320000],
    ["Ubiquiti USW-Pro-Max 24 PoE", 890000],
    ["Ubiquiti USW-Pro-Max 48 PoE", 1450000],
    ["Ubiquiti Cloud Gateway Ultra", 245000],
    ["Ubiquiti G5 Pro Camera", 385000],
  ].map(([name, price], i) => network("Ubiquiti", name as string, price as number, i < 2)),

  // MikroTik
  ...[
    ["MikroTik hAP ax3", 185000],
    ["MikroTik RB4011", 320000],
    ["MikroTik CCR2004", 1250000],
    ["MikroTik CCR2116", 2850000],
    ["MikroTik CRS326 Switch", 285000],
    ["MikroTik CRS328 Switch", 385000],
    ["MikroTik hAP ac3", 125000],
    ["MikroTik RB5009", 245000],
  ].map(([name, price]) => network("MikroTik", name as string, price as number)),

  // TP-Link
  ...[
    ["TP-Link Omada EAP670", 195000],
    ["TP-Link Omada EAP773", 285000],
    ["TP-Link Archer BE900 Router", 485000],
    ["TP-Link JetStream TL-SG3428 PoE", 320000],
    ["TP-Link TL-SG108E Switch", 65000],
    ["TP-Link Deco XE75 Mesh", 245000],
  ].map(([name, price]) => network("TP-Link", name as string, price as number)),

  // D-Link & Cisco
  ...[
    ["D-Link DGS-1210-28 Switch", 185000],
    ["D-Link DIR-X5460 Router", 145000],
    ["D-Link DAP-2680 Access Point", 125000],
    ["Cisco Catalyst 9200 24-Port", 1850000],
    ["Cisco ISR 4331 Router", 1250000],
    ["Cisco Meraki MR46 AP", 485000],
  ].map(([name, price]) => network(name.startsWith("D-Link") ? "D-Link" : "Cisco", name as string, price as number)),

  // Servers
  ...[
    ["HPE ProLiant DL380 Gen10", 8500000],
    ["HPE ProLiant DL380 Gen11", 12500000],
    ["HPE ProLiant DL380 Gen12", 15800000],
    ["HPE ProLiant DL360 Gen11", 9800000],
    ["HPE ProLiant ML350 Gen11", 7200000],
    ["Dell PowerEdge R650", 11200000],
    ["Dell PowerEdge R750", 14500000],
    ["Dell PowerEdge R760", 16800000],
    ["Dell PowerEdge R660", 12800000],
  ].map(([name, price]) => server(name.startsWith("HPE") ? "HPE" : "Dell", name as string, price as number)),

  // Computer Accessories
  accessory("HP USB-C Dock G5", "HP", 185000, "Docking Station"),
  accessory("Dell Thunderbolt Dock WD22TB4", "Dell", 245000, "Docking Station"),
  accessory("Lenovo ThinkPad Thunderbolt 4 Dock", "Lenovo", 228000, "Docking Station"),
  accessory('HP 27" Monitor M27f', "HP", 285000, "Monitor"),
  accessory('Dell 27" Monitor P2722H', "Dell", 320000, "Monitor"),
  accessory('LG 32" UltraFine Monitor', "LG", 485000, "Monitor"),
  accessory('Samsung 27" Odyssey Monitor', "Samsung", 520000, "Monitor"),
  accessory("Samsung T7 1TB External SSD", "Samsung", 125000, "Storage"),
  accessory("WD Black 2TB External HDD", "WD", 95000, "Storage"),
  accessory("Kingston 16GB DDR5 RAM", "Kingston", 85000, "RAM Upgrade"),
  accessory("Logitech MX Keys Keyboard", "Logitech", 95000, "Keyboard"),
  accessory("Logitech MX Master 3S Mouse", "Logitech", 85000, "Mouse"),
  accessory("Jabra Evolve2 65 Headset", "Jabra", 185000, "Headset"),
  accessory("Logitech C920 HD Webcam", "Logitech", 95000, "Webcam"),
  accessory("APC 1500VA UPS", "APC", 285000, "UPS"),
  accessory("Targus Laptop Bag 15.6\"", "Targus", 45000, "Laptop Bag"),
  accessory("Cooler Master Laptop Cooling Pad", "Cooler Master", 35000, "Cooling Pad"),
  accessory("HP LaserJet Pro M404dn", "HP", 485000, "Printer"),

  // Phone Accessories
  accessory("Anker 65W Fast Charger", "Anker", 35000, "Phone Charger"),
  accessory("Anker PowerCore 20000mAh", "Anker", 45000, "Power Bank"),
  accessory("Tempered Glass Screen Protector (Universal)", "ITZONE", 8000, "Screen Protector"),
  accessory("Silicone Phone Case (Universal)", "ITZONE", 12000, "Phone Case"),
  accessory("Apple AirPods Pro 2", "Apple", 285000, "Earbuds"),
  accessory("Samsung Galaxy Buds3 Pro", "Samsung", 185000, "Earbuds"),
  accessory("USB-C to Lightning Cable 2m", "Anker", 15000, "Cable"),
  accessory("MagSafe Wireless Charger", "Anker", 28000, "Wireless Charger"),
  accessory("Car Phone Mount", "Baseus", 18000, "Car Mount"),
  accessory("Bluetooth Selfie Stick", "Baseus", 22000, "Selfie Stick"),
];

export const CATALOG_PRODUCTS: Product[] = CATALOG.map((entry, i) => createProduct(entry, i + 1));

export const CATALOG_BRANDS = [...new Set(CATALOG.map((e) => e.brand))].sort();
