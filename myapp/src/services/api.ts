import { Product } from '../types';
import { authService } from './auth';

// http://nindam.sytes.net:3006
const BACKEND_URL = 'http://nindam.sytes.net:3006'; 
const BASE_URL = 'http://nindam.sytes.net/std6630202015/Inventory';

// Helper function to get headers with auth token
const getHeaders = async (): Promise<HeadersInit> => {
  const token = await authService.getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// Inventory API Functions
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    console.log('Fetching products from:', `${BACKEND_URL}/api/products`);
    const headers = await getHeaders();
    const response = await fetch(`${BACKEND_URL}/api/products`, {
      headers,
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication required. Please login again.');
      }
      throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
    }
    const products = await response.json();
    console.log('Products fetched successfully:', products.length, 'items');
    return products;
  } catch (error) {
    console.error('Inventory API Error:', error);
    throw error;
  }
};

export const getProductImageUrl = (imageName: string): string => {
  return `${BASE_URL}/image-inventory/${imageName}`;
};

export const searchProducts = (products: Product[], query: string): Product[] => {
  if (!query.trim()) return products;
  
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery) ||
    product.productCode.toLowerCase().includes(lowercaseQuery)
  );
};

export const filterProductsByCategory = (products: Product[], category: string): Product[] => {
  if (!category || category === 'ทั้งหมด') return products;
  return products.filter(product => product.category === category);
};

export const getUniqueCategories = (products: Product[]): string[] => {
  const categories = products.map(product => product.category);
  return ['ทั้งหมด', ...Array.from(new Set(categories))];
};
