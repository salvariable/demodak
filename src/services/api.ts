import axios, { AxiosError } from 'axios';
import { 
  mapApiProductsResponseToProductsResponse, 
  mapApiProductToProduct,
  mapApiCategoriesToCategories 
} from '../mappers/productMapper';
import { ProductsResponse, Product } from '../types';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
});

// Error handling utility
const handleApiError = (error: AxiosError): never => {
  if (error.response) {
    // Server responded with error status
    throw new Error(`API Error: ${error.response.status} - ${error.response.statusText}`);
  } else if (error.request) {
    // Network error
    throw new Error('Network error: Unable to connect to the server');
  } else {
    // Other error
    throw new Error(`Request error: ${error.message}`);
  }
};

export const getProducts = async (limit = 20, skip = 0): Promise<ProductsResponse> => {
  try {
    const response = await api.get(`/products?limit=${limit}&skip=${skip}`);
    return mapApiProductsResponseToProductsResponse(response.data);
  } catch (error) {
    return handleApiError(error as AxiosError);
  }
};

export const getProduct = async (id: number): Promise<Product> => {
  try {
    const response = await api.get(`/products/${id}`);
    return mapApiProductToProduct(response.data);
  } catch (error) {
    return handleApiError(error as AxiosError);
  }
};

export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await api.get('/products/categories');
    const categories = response.data;
    
    // Ensure we have a valid array
    if (!Array.isArray(categories)) {
      console.warn('Categories API returned non-array data:', categories);
      return [];
    }
    
    return mapApiCategoriesToCategories(categories);
  } catch (error) {
    return handleApiError(error as AxiosError);
  }
};

export const getProductsByCategory = async (category: string): Promise<ProductsResponse> => {
  try {
    const response = await api.get(`/products/category/${category}`);
    return mapApiProductsResponseToProductsResponse(response.data);
  } catch (error) {
    return handleApiError(error as AxiosError);
  }
};
