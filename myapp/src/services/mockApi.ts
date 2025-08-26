import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product, ProductFormData } from '../types';

const PRODUCTS_KEY = 'inventory_products';

// Mock products data
const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    category: 'Electronics',
    price: 39900,
    unit: 'ชิ้น',
    image: 'https://images.unsplash.com/photo-1592286829302-f3e4dd5c41e0?w=300',
    stock: 25,
    location: 'A-001',
    status: 'active',
    brand: 'Apple',
    sizes: '128GB, 256GB, 512GB',
    productCode: 'IP15P-001',
    orderName: 'iPhone 15 Pro',
    storeAvailability: [
      { location: 'Bangkok', available: true },
      { location: 'Chiang Mai', available: true },
    ],
    lastUpdate: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24',
    category: 'Electronics',
    price: 29900,
    unit: 'ชิ้น',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300',
    stock: 15,
    location: 'A-002',
    status: 'active',
    brand: 'Samsung',
    sizes: '128GB, 256GB',
    productCode: 'SGS24-001',
    orderName: 'Galaxy S24',
    storeAvailability: [
      { location: 'Bangkok', available: true },
      { location: 'Chiang Mai', available: false },
    ],
    lastUpdate: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'MacBook Air M3',
    category: 'Electronics',
    price: 45900,
    unit: 'ชิ้น',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300',
    stock: 8,
    location: 'B-001',
    status: 'active',
    brand: 'Apple',
    sizes: '13-inch, 15-inch',
    productCode: 'MBA-M3-001',
    orderName: 'MacBook Air M3',
    storeAvailability: [
      { location: 'Bangkok', available: true },
      { location: 'Chiang Mai', available: true },
    ],
    lastUpdate: new Date().toISOString(),
  },
  {
    id: 4,
    name: 'Nike Air Max 270',
    category: 'Fashion',
    price: 4500,
    unit: 'คู่',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
    stock: 30,
    location: 'C-001',
    status: 'active',
    brand: 'Nike',
    sizes: '7, 8, 9, 10, 11',
    productCode: 'NAM270-001',
    orderName: 'Air Max 270',
    storeAvailability: [
      { location: 'Bangkok', available: true },
      { location: 'Chiang Mai', available: true },
    ],
    lastUpdate: new Date().toISOString(),
  },
  {
    id: 5,
    name: 'Adidas Ultraboost 22',
    category: 'Fashion',
    price: 5200,
    unit: 'คู่',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300',
    stock: 20,
    location: 'C-002',
    status: 'active',
    brand: 'Adidas',
    sizes: '7, 8, 9, 10',
    productCode: 'AUB22-001',
    orderName: 'Ultraboost 22',
    storeAvailability: [
      { location: 'Bangkok', available: true },
      { location: 'Chiang Mai', available: false },
    ],
    lastUpdate: new Date().toISOString(),
  },
];

export const mockInventoryService = {
  async initializeProducts(): Promise<void> {
    try {
      const existingProducts = await AsyncStorage.getItem(PRODUCTS_KEY);
      if (!existingProducts) {
        await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(DEFAULT_PRODUCTS));
      }
    } catch (error) {
      console.error('Error initializing products:', error);
    }
  },

  async getProducts(): Promise<Product[]> {
    try {
      const products = await AsyncStorage.getItem(PRODUCTS_KEY);
      return products ? JSON.parse(products) : DEFAULT_PRODUCTS;
    } catch (error) {
      console.error('Error getting products:', error);
      return DEFAULT_PRODUCTS;
    }
  },

  async addProduct(productData: ProductFormData): Promise<Product> {
    try {
      const products = await this.getProducts();
      const newId = Math.max(...products.map(p => p.id), 0) + 1;
      
      const newProduct: Product = {
        id: newId,
        name: productData.name,
        category: productData.category,
        price: parseFloat(productData.price),
        unit: productData.unit,
        image: productData.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300',
        stock: parseInt(productData.stock),
        location: productData.location,
        status: productData.status,
        brand: productData.brand,
        sizes: productData.sizes,
        productCode: productData.productCode,
        orderName: productData.orderName,
        storeAvailability: [
          { location: 'Bangkok', available: true },
          { location: 'Chiang Mai', available: true },
        ],
        lastUpdate: new Date().toISOString(),
      };

      products.push(newProduct);
      await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
      return newProduct;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  async updateProduct(id: number, productData: ProductFormData): Promise<Product> {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex(p => p.id === id);
      
      if (productIndex === -1) {
        throw new Error('ไม่พบสินค้าที่ต้องการแก้ไข');
      }

      const updatedProduct: Product = {
        ...products[productIndex],
        name: productData.name,
        category: productData.category,
        price: parseFloat(productData.price),
        unit: productData.unit,
        image: productData.image || products[productIndex].image,
        stock: parseInt(productData.stock),
        location: productData.location,
        status: productData.status,
        brand: productData.brand,
        sizes: productData.sizes,
        productCode: productData.productCode,
        orderName: productData.orderName,
        lastUpdate: new Date().toISOString(),
      };

      products[productIndex] = updatedProduct;
      await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
      return updatedProduct;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  async deleteProduct(id: number): Promise<void> {
    try {
      const products = await this.getProducts();
      const filteredProducts = products.filter(p => p.id !== id);
      
      if (filteredProducts.length === products.length) {
        throw new Error('ไม่พบสินค้าที่ต้องการลบ');
      }

      await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(filteredProducts));
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  async getProduct(id: number): Promise<Product | null> {
    try {
      const products = await this.getProducts();
      return products.find(p => p.id === id) || null;
    } catch (error) {
      console.error('Error getting product:', error);
      return null;
    }
  },

  async searchProducts(query: string): Promise<Product[]> {
    try {
      const products = await this.getProducts();
      const lowercaseQuery = query.toLowerCase();
      
      return products.filter(product =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery) ||
        product.brand.toLowerCase().includes(lowercaseQuery) ||
        product.productCode.toLowerCase().includes(lowercaseQuery)
      );
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const products = await this.getProducts();
      return category === 'All' 
        ? products 
        : products.filter(p => p.category === category);
    } catch (error) {
      console.error('Error getting products by category:', error);
      return [];
    }
  },

  async getCategories(): Promise<string[]> {
    try {
      const products = await this.getProducts();
      const categoriesSet = new Set(products.map(p => p.category));
      const categories = Array.from(categoriesSet);
      return ['All', ...categories];
    } catch (error) {
      console.error('Error getting categories:', error);
      return ['All'];
    }
  },

  // Helper method to reset products to default
  async resetProducts(): Promise<void> {
    try {
      await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(DEFAULT_PRODUCTS));
    } catch (error) {
      console.error('Error resetting products:', error);
    }
  },
};
