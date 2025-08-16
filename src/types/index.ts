export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
  brand: string;
  category: string;
  stock: number;
  rating: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
}

export interface Category {
  name?: string;
  slug?: string;
  url?: string;
}

