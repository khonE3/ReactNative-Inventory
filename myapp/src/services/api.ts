import { Product } from '../types';

const BACKEND_URL = 'http://localhost:3006';
const BASE_URL = 'http://nindam.sytes.net/std6630202015/Inventory';

// Inventory API Functions
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
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
