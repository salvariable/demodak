import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductsListScreen } from '../screens/ProductsListScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen 
        name="Products" 
        component={ProductsListScreen}
        options={{ title: 'Products' }}
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen}
        options={{ title: 'Product Details' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

