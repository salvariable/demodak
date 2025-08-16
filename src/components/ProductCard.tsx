import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '../types';

interface Props {
  product: Product;
  onPress: () => void;
}

export const ProductCard = ({ product, onPress }: Props) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={{ uri: product.thumbnail }} style={styles.image} />
    <View style={styles.content}>
      <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>★ {product.rating.toFixed(1)}</Text>
        <Text style={styles.stock}>
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </Text>
      </View>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    flex: 1,
    maxWidth: '48%',
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: 'cover',
  },
  content: {
    padding: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
    lineHeight: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  rating: {
    fontSize: 10,
    color: '#FF9800',
    fontWeight: '600',
  },
  stock: {
    fontSize: 9,
    color: '#666',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2196F3',
  },
});

