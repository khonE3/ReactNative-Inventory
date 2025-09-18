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

export const deleteProduct = async (id: number): Promise<void> => {
  console.log('🚀 API: deleteProduct function called');
  console.log('📋 API: Input parameters:', { id, type: typeof id });
  
  if (!id || isNaN(id)) {
    throw new Error('ไม่พบ ID สินค้าที่ต้องการลบ');
  }
  
  try {
    console.log('🗑️ API: Starting delete for product ID:', id);
    const headers = await getHeaders();
    const headersObj = headers as Record<string, string>;
    console.log('🔑 API: Headers prepared:', { 
      hasAuth: !!headersObj['Authorization'],
      contentType: headersObj['Content-Type'],
      authToken: headersObj['Authorization'] ? headersObj['Authorization'].substring(0, 20) + '...' : 'None'
    });
    
    const deleteUrl = `${BACKEND_URL}/api/products/${id}`;
    console.log('🌐 API: Sending DELETE request to:', deleteUrl);
    console.log('🌐 API: Full request details:', {
      url: deleteUrl,
      method: 'DELETE',
      headers: {
        ...headersObj,
        Authorization: headersObj['Authorization'] ? 'Bearer ***' : 'None'
      }
    });
    
    const response = await fetch(deleteUrl, {
      method: 'DELETE',
      headers,
    });
    
    console.log('📡 API: Delete response received');
    console.log('📊 API: Response details:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      url: response.url
    });

    // Get response text first for debugging
    const responseText = await response.text();
    console.log('📄 API: Raw response text:', responseText);
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication required. Please login again.');
      }
      if (response.status === 404) {
        throw new Error('ไม่พบสินค้าที่ต้องการลบ');
      }
      
      let errorData: any = {};
      try {
        errorData = JSON.parse(responseText);
      } catch (e) {
        console.log('📄 API: Response is not JSON, using as text');
      }
      
      throw new Error(`Failed to delete product: ${response.status} ${response.statusText} - ${errorData.error || responseText || ''}`);
    }
    
    let result = {};
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      console.log('📄 API: Success response is not JSON, treating as success');
      result = { success: true, message: responseText };
    }
    
    console.log('✅ API: Product deleted successfully:', result);
  } catch (error) {
    console.error('❌ Delete Product API Error:', error);
    console.error('💥 API: Error stack:', error instanceof Error ? error.stack : 'No stack');
    
    // Better error messages for common issues
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต');
    }
    
    throw error;
  }
};
