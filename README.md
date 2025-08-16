# Product Listing App

A React Native app that displays products with filtering, sorting, and detailed views. Built with Expo and TypeScript.

https://github.com/user-attachments/assets/424efa6a-f388-411d-bbec-da54e8f22626

## Features

- **Product Grid**: Browse products with images, prices, and ratings
- **Category Filter**: Filter by electronics, clothing, groceries, etc.
- **Sort Options**: Sort by name, price, or rating
- **Product Details**: View detailed product information
- **Error Handling**: Graceful error states with retry functionality

## Quick Start

```bash
npm install
npm start
```

## Architecture

The app uses a clean architecture pattern:

```
UI Components → Hooks → API Service → Mappers → DummyJSON API
```

- **UI**: React Native screens and components
- **Hooks**: `useProductBrowser()` and `useProductViewer()`
- **API**: HTTP requests with error handling
- **Mappers**: Transform raw API data to clean UI data

## Project Structure

```
src/
├── components/     # ProductCard, SortSelector
├── hooks/         # useStore.ts (data management)
├── mappers/       # productMapper.ts (data transformation)
├── screens/       # ProductsListScreen, ProductDetailScreen
├── services/      # api.ts (HTTP requests)
└── types/         # TypeScript definitions
```

## API

Uses [DummyJSON](https://dummyjson.com) for product data:
- `GET /products` - Product listings
- `GET /products/{id}` - Product details
- `GET /products/categories` - Available categories
