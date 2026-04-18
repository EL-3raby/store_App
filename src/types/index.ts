export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  features?: string[];
  specs?: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}
