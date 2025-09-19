import { Product } from '../types';
import { authService } from './auth';

// Using production server IP address for React Native compatibility
const BACKEND_URL = 'http://119.59.102.61:3006'; 
const BASE_URL = 'http://nindam.sytes.net/std6630202015/Inventory';

// Helper function to get headers with auth token
const getHeaders = async (): Promise<HeadersInit> => {
  const token = await authService.getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    console.log('🔑 API: Using token:', token.substring(0, 20) + '...');
  } else {
    console.log('⚠️ API: No token available');
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
    console.log('Sample product:', products[0]); // Debug: show first product
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
  const categories = products
    .map(product => product.category)
    .filter(category => category && category.trim() !== ''); // Remove null, undefined, and empty strings
  return ['ทั้งหมด', ...Array.from(new Set(categories))];
};

// CRUD Operations for Products
export const createProduct = async (productData: Partial<Product>): Promise<Product> => {
  try {
    console.log('Creating product:', productData);
    const headers = await getHeaders();
    const response = await fetch(`${BACKEND_URL}/api/products`, {
      method: 'POST',
      headers,
      body: JSON.stringify(productData),
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication required. Please login again.');
      }
      throw new Error(`Failed to create product: ${response.status} ${response.statusText}`);
    }
    
    const newProduct = await response.json();
    console.log('Product created successfully:', newProduct);
    return newProduct;
  } catch (error) {
    console.error('Create Product API Error:', error);
    throw error;
  }
};

export const updateProduct = async (id: number, productData: Partial<Product>): Promise<Product> => {
  try {
    console.log('Updating product:', id, productData);
    const headers = await getHeaders();
    const response = await fetch(`${BACKEND_URL}/api/products/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(productData),
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication required. Please login again.');
      }
      throw new Error(`Failed to update product: ${response.status} ${response.statusText}`);
    }
    
    const updatedProduct = await response.json();
    console.log('Product updated successfully:', updatedProduct);
    return updatedProduct;
  } catch (error) {
    console.error('Update Product API Error:', error);
    throw error;
  }
};


// Test function เพื่อทดสอบ network connection
export const testNetworkConnection = async (): Promise<void> => {
  console.log('🧪 TEST: Testing network connection...');
  try {
    const response = await fetch('https://httpbin.org/get');
    console.log('🧪 TEST: Network test successful:', response.status);
  } catch (error) {
    console.error('🧪 TEST: Network test failed:', error);
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  console.log('🚀🚀🚀 API: deleteProduct function called');
  console.log('📋 API: Input parameters:', { id, type: typeof id });
  console.log('⏰ API: Delete request timestamp:', new Date().toISOString());
  console.log('🌍 API: Environment check - fetch available?', typeof fetch);
  console.log('🔗 API: Backend URL:', BACKEND_URL);
  
  // Show console.warn to confirm function is called (more visible than console.log)
  console.warn('🚀🚀🚀 API: deleteProduct function DEFINITELY called!');
  console.warn('🚀🚀🚀 API: This should be visible in console!');
  
  // Test network first
  console.log('🧪 API: About to test network connection...');
  await testNetworkConnection();
  console.log('🧪 API: Network connection test completed');
  
  if (!id || isNaN(id)) {
    console.error('❌ API: Invalid ID provided:', id);
    throw new Error('ไม่พบ ID สินค้าที่ต้องการลบ');
  }
  
  console.log('✅ API: ID validation passed');
  
  try {
    console.log('🗑️ API: Starting delete for product ID:', id);
    
    // Add delay to see logs clearly
    console.log('⏳ API: Waiting 1 second before proceeding...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // First test simple GET request to backend
    console.log('🧪 API: Testing backend connection with simple GET...');
    try {
      const testResponse = await fetch(`${BACKEND_URL}/`);
      console.log('🧪 API: Backend connection test:', testResponse.status);
    } catch (testError) {
      console.error('🧪 API: Backend connection failed:', testError);
    }
    
    console.log('⏳ API: Waiting another second...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('🔑 API: Getting headers...');
    const headers = await getHeaders();
    console.log('🔑 API: Headers obtained:', Object.keys(headers as Record<string, string>));
    console.log('🔑 API: Headers content:', headers);
    
    const deleteUrl = `${BACKEND_URL}/api/products/${id}`;
    console.log('🌐 API: Sending DELETE request to:', deleteUrl);
    console.log('🌐 API: Full URL check:', deleteUrl.includes('undefined') ? 'URL HAS UNDEFINED!' : 'URL looks OK');
    
    // First try without auth headers to see if request reaches backend
    console.log('🧪 API: Testing DELETE without auth headers...');
    try {
      const testDeleteResponse = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log('🧪 API: Test DELETE response:', testDeleteResponse.status, testDeleteResponse.statusText);
    } catch (testError) {
      console.error('🧪 API: Test DELETE failed:', testError);
    }
    
    console.log('📡 API: About to call fetch with full headers...');
    console.log('📡 API: Fetch parameters:', {
      url: deleteUrl,
      method: 'DELETE',
      headers: headers
    });
    
    // Add timeout for debugging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log('⏰ API: Fetch timeout after 10 seconds');
      controller.abort();
    }, 10000);
    
    const response = await fetch(deleteUrl, {
      method: 'DELETE',
      headers,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    console.log('📡 API: Fetch completed without timeout');
    
    console.log('📡 API: Delete response received');
    console.log('📊 API: Response status:', response.status, response.statusText);
    console.log('📊 API: Response OK:', response.ok);
    
    if (!response.ok) {
      console.log('❌ API: Response not OK, reading error...');
      const errorText = await response.text();
      console.log('❌ API: Error response text:', errorText);
      
      if (response.status === 401) {
        throw new Error('Authentication required. Please login again.');
      }
      if (response.status === 404) {
        throw new Error('ไม่พบสินค้าที่ต้องการลบ');
      }
      
      throw new Error(`Failed to delete product: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    console.log('✅ API: Response OK, reading result...');
    const result = await response.json();
    console.log('✅ API: Product deleted successfully:', result);
    
  } catch (error) {
    console.error('❌ Delete Product API Error:', error);
    console.error('❌ API: Error type:', typeof error);
    console.error('❌ API: Error name:', error instanceof Error ? error.name : 'Unknown');
    console.error('❌ API: Error message:', error instanceof Error ? error.message : String(error));
    console.error('❌ API: Error stack:', error instanceof Error ? error.stack : 'No stack');
    console.error('❌ API: Full error object:', error);
    
    if (error instanceof TypeError) {
      console.error('❌ API: TypeError details:', {
        message: error.message,
        cause: error.cause,
        stack: error.stack
      });
      
      if (error.message.includes('fetch') || error.message.includes('network')) {
        throw new Error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต');
      }
    }
    
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('การเชื่อมต่อใช้เวลานานเกินไป กรุณาลองใหม่อีกครั้ง');
    }
    
    throw error;
  }
};
