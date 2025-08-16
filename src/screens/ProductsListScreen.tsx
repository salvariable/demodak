import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { ProductCard } from '../components/ProductCard';
import { SortSelector } from '../components/SortSelector';
import { useProductBrowser } from '../hooks/useStore';
import { Product } from '../types';

export const ProductsListScreen = ({ navigation }: any) => {
  const { 
    products, 
    categories, 
    loading, 
    error,
    category, 
    sortBy,
    filterByCategory, 
    sortProducts,
    retry
  } = useProductBrowser();

  // Update navigation title with product count
  useEffect(() => {
    navigation.setOptions({
      title: `Products (${products.length} found)`
    });
  }, [products.length, navigation]);

  // Debug: Log categories and current filter
  useEffect(() => {
    console.log('Categories loaded:', categories.length);
    console.log('Categories:', categories);
    console.log('Current category filter:', category);
    console.log('Products count:', products.length);
  }, [categories, category, products.length]);

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard 
      product={item} 
      onPress={() => navigation.navigate('ProductDetail', { id: item.id })} 
    />
  );

  const renderCategory = ({ item }: { item: string }) => {
    const isShowAll = item === 'Show All';
    const isActive = isShowAll ? category === '' : category === item;
    
    return (
      <TouchableOpacity
        style={[styles.category, isActive && styles.categoryActive]}
        onPress={() => filterByCategory(isShowAll ? '' : item)}
      >
        <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  // Add "Show All" option to categories
  const defaultCategories = ['Beauty', 'Fragrances', 'Furniture', 'Groceries', 'Electronics', 'Clothing'];
  const allCategories = ['Show All', ...(categories.length > 0 ? categories : defaultCategories)];

  if (loading && products.length === 0) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.loadingText}>Loading products...</Text>
      </SafeAreaView>
    );
  }

  if (error && products.length === 0) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorText}>Something went wrong</Text>
        <Text style={styles.errorSubtext}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={retry}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Categories Filter */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.categoriesTitle}>Categories</Text>
        <FlatList
          data={allCategories}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categories}
          renderItem={renderCategory}
          keyExtractor={item => item}
          contentContainerStyle={styles.categoriesContent}
          ListEmptyComponent={
            <Text style={styles.categoriesEmpty}>Loading categories...</Text>
          }
        />
      </View>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <SortSelector sortBy={sortBy} onSortChange={sortProducts} />
      </View>

      {/* Error Banner */}
      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorBannerText}>{error}</Text>
          <TouchableOpacity onPress={retry}>
            <Text style={styles.errorBannerRetry}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Products List */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.products}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products found</Text>
            <Text style={styles.emptySubtext}>
              Try adjusting your filters or search criteria
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  retryButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  categoriesContainer: {
    backgroundColor: 'white',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sortContainer: {
    backgroundColor: 'white',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  errorBanner: {
    backgroundColor: '#ffebee',
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ffcdd2',
  },
  errorBannerText: {
    fontSize: 12,
    color: '#c62828',
    flex: 1,
  },
  errorBannerRetry: {
    fontSize: 12,
    color: '#2196F3',
    fontWeight: '600',
  },
  categories: {
    paddingHorizontal: 16,
  },
  categoriesContent: {
    paddingRight: 16,
    gap: 8,
  },
  category: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minWidth: 80,
    alignItems: 'center',
  },
  categoryActive: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  categoryText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  categoryTextActive: {
    color: 'white',
  },
  products: {
    padding: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  categoriesTitle: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingBottom: 8,
    color: '#333',
  },
  categoriesEmpty: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
});
