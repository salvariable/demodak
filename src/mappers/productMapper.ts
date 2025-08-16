import { Product, ProductsResponse } from '../types';

// API response interfaces
interface ApiProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface ApiProductsResponse {
  products: ApiProduct[];
  total: number;
  skip: number;
  limit: number;
}

// Mapper functions
export const mapApiProductToProduct = (apiProduct: ApiProduct): Product => {
  return {
    id: apiProduct.id,
    title: apiProduct.title,
    description: apiProduct.description,
    price: apiProduct.price,
    thumbnail: apiProduct.thumbnail,
    brand: apiProduct.brand,
    category: apiProduct.category,
    stock: apiProduct.stock,
    rating: apiProduct.rating,
  };
};

export const mapApiProductsResponseToProductsResponse = (apiResponse: ApiProductsResponse): ProductsResponse => {
  return {
    products: apiResponse.products.map(mapApiProductToProduct),
    total: apiResponse.total,
  };
};

export const mapApiCategoriesToCategories = (apiCategories: string[]): string[] => {
  if (!Array.isArray(apiCategories)) {
    return [];
  }
  
  return apiCategories
    .filter(category => category != null && typeof category === 'string' && category.length > 0)
    .map(category => {
      try {
        return category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
      } catch (error) {
        console.warn('Invalid category format:', category);
        return category; // Return original if transformation fails
      }
    });
};

