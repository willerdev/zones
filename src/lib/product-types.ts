export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  specs: ProductSpec[];
  condition: "NEW" | "REFURBISHED" | "USED";
  availability: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK" | "PRE_ORDER";
  stock: number;
  warranty: string;
  rating: number;
  reviewCount: number;
  popularity: number;
  featured: boolean;
  category: string;
  categorySlug: string;
  brand: string;
  brandSlug: string;
}
