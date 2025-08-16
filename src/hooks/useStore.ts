import { useState, useEffect } from 'react';
import { getProducts, getCategories, getProductsByCategory, getProduct } from '../services/api';
import { Product } from '../types';

export type SortOption = 'price-asc' | 'price-desc' | 'rating-asc' | 'rating-desc' | 'name-asc' | 'name-desc';

// Hook for browsing and filtering products
export const useProductBrowser = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [productsData, categoriesData] = await Promise.all([
        getProducts(),
        getCategories()
      ]);
      setProducts(productsData.products);
      setCategories(categoriesData);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterByCategory = async (selectedCategory: string) => {
    try {
      setLoading(true);
      setError(null);
      setCategory(selectedCategory);
      const data = selectedCategory === '' 
        ? await getProducts()
        : await getProductsByCategory(selectedCategory);
      setProducts(data.products);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      console.error('Error filtering by category:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortProducts = (sortOption: SortOption) => {
    setSortBy(sortOption);
    const sortedProducts = [...products].sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-asc':
          return a.rating - b.rating;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
    setProducts(sortedProducts);
  };

  const retry = () => {
    loadData();
  };

  return { 
    products, 
    categories, 
    loading, 
    error,
    category, 
    sortBy,
    filterByCategory, 
    sortProducts,
    retry
  };
};

// Hook for viewing a single product's details
export const useProductViewer = (id: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProduct(id);
        setProduct(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const retry = () => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProduct(id);
        setProduct(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  };

  return { product, loading, error, retry };
};

