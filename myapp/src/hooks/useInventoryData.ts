import { useState, useEffect, useCallback } from 'react';
import { Product, ProductFormData } from '../types';
import { 
  fetchProducts, 
  searchProducts, 
  filterProductsByCategory, 
  getUniqueCategories,
  createProduct,
  updateProduct as updateProductAPI,
  deleteProduct as deleteProductAPI
} from '../services/api';

export const useInventoryData = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(['ทั้งหมด']);
  const [selectedCategory, setSelectedCategory] = useState<string>('ทั้งหมด');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Validate and clean product data
  const validateProduct = (product: any): Product => {
    // Helper function to convert price to number
    const parsePrice = (price: any): number => {
      if (typeof price === 'number') return price;
      if (typeof price === 'string') {
        const parsed = parseFloat(price);
        return isNaN(parsed) ? 0 : parsed;
      }
      return 0;
    };

    // Helper function to convert stock to number
    const parseStock = (stock: any): number => {
      if (typeof stock === 'number') return stock;
      if (typeof stock === 'string') {
        const parsed = parseInt(stock);
        return isNaN(parsed) ? 0 : parsed;
      }
      return 0;
    };

    return {
      id: product.id || 0,
      name: product.name || 'ไม่ระบุชื่อ',
      category: product.category || 'ไม่ระบุหมวดหมู่',
      price: parsePrice(product.price),
      unit: product.unit || 'ชิ้น',
      image: product.image || '',
      stock: parseStock(product.stock),
      location: product.location || 'ไม่ระบุ',
      status: product.status || 'active',
      brand: product.brand || 'ไม่ระบุ',
      sizes: product.sizes || '',
      productCode: product.productCode || '',
      orderName: product.orderName || '',
      storeAvailability: product.storeAvailability || [],
      lastUpdate: product.lastUpdate || new Date().toISOString(),
    };
  };

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchProducts();
      console.log('Fetched products data:', data); // Debug log
      
      // Log sample raw product data from API
      if (data.length > 0) {
        console.log('Raw product sample:', data[0]);
        console.log('Raw price type:', typeof data[0].price, 'value:', data[0].price);
        console.log('Raw stock type:', typeof data[0].stock, 'value:', data[0].stock);
      }
      
      // Validate and clean data
      const validatedProducts = data.map(validateProduct);
      console.log('Validated products:', validatedProducts); // Debug log
      
      // Log sample validated product data
      if (validatedProducts.length > 0) {
        console.log('Validated product sample:', validatedProducts[0]);
        console.log('Validated price type:', typeof validatedProducts[0].price, 'value:', validatedProducts[0].price);
        console.log('Validated stock type:', typeof validatedProducts[0].stock, 'value:', validatedProducts[0].stock);
      }
      
      setProducts(validatedProducts);
      setFilteredProducts(validatedProducts);
      setCategories(getUniqueCategories(validatedProducts));
      setLastUpdated(new Date().toLocaleString('th-TH', {
        timeZone: 'Asia/Bangkok',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
  }, [fetchData]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    let filtered = searchProducts(products, query);
    filtered = filterProductsByCategory(filtered, selectedCategory);
    setFilteredProducts(filtered);
  }, [products, selectedCategory]);

  const handleCategoryFilter = useCallback((category: string) => {
    setSelectedCategory(category);
    let filtered = filterProductsByCategory(products, category);
    filtered = searchProducts(filtered, searchQuery);
    setFilteredProducts(filtered);
  }, [products, searchQuery]);

  const getProductsByStatus = useCallback((status: 'Active' | 'Inactive') => {
    return products.filter(product => product.status === status);
  }, [products]);

  const getLowStockProducts = useCallback((threshold: number = 20) => {
    return products.filter(product => product.stock <= threshold);
  }, [products]);

  const getTotalInventoryValue = useCallback(() => {
    return products.reduce((total, product) => total + (product.price * product.stock), 0);
  }, [products]);

  const getStockStatistics = useCallback(() => {
    const totalProducts = products.length;
    const activeProducts = getProductsByStatus('Active').length;
    const lowStockProducts = getLowStockProducts().length;
    const totalValue = getTotalInventoryValue();
    
    return {
      totalProducts,
      activeProducts,
      lowStockProducts,
      totalValue,
    };
  }, [products, getProductsByStatus, getLowStockProducts, getTotalInventoryValue]);

  // Product CRUD operations
  const addProduct = useCallback(async (productData: ProductFormData) => {
    try {
      setError(null);
      
      // Call API to create product in database
      const productToCreate = {
        name: productData.name,
        category: productData.category,
        price: parseFloat(productData.price) || 0,
        unit: productData.unit,
        image: productData.image,
        stock: parseInt(productData.stock) || 0,
        location: productData.location,
        status: productData.status,
        brand: productData.brand,
        sizes: productData.sizes,
        productCode: productData.productCode || `PRD${Date.now()}`,
        orderName: productData.orderName,
      };
      
      const newProduct = await createProduct(productToCreate);
      
      // Refresh data from database to ensure consistency
      await fetchData();
      
      console.log('Product added successfully:', newProduct);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการเพิ่มสินค้า');
      throw err; // Re-throw for component error handling
    }
  }, [fetchData]);

  const updateProduct = useCallback(async (id: number, productData: ProductFormData) => {
    try {
      setError(null);
      
      // Call API to update product in database
      const productToUpdate = {
        name: productData.name,
        category: productData.category,
        price: parseFloat(productData.price) || 0,
        unit: productData.unit,
        image: productData.image,
        stock: parseInt(productData.stock) || 0,
        location: productData.location,
        status: productData.status,
        brand: productData.brand,
        sizes: productData.sizes,
        productCode: productData.productCode,
        orderName: productData.orderName,
      };
      
      const updatedProduct = await updateProductAPI(id, productToUpdate);
      
      // Refresh data from database to ensure consistency
      await fetchData();
      
      console.log('Product updated successfully:', updatedProduct);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการอัปเดตสินค้า');
      throw err; // Re-throw for component error handling
    }
  }, [fetchData]);

  const deleteProduct = useCallback(async (id: number) => {
    console.log('� useInventoryData: deleteProduct function entry point');
    console.log('📋 useInventoryData: Input parameters:', { id, type: typeof id });
    console.log('�🗑️ useInventoryData: deleteProduct called with ID:', id);
    console.log('🔄 useInventoryData: Current state before delete:', {
      productsCount: products.length,
      loading,
      error,
      timestamp: new Date().toISOString()
    });
    
    try {
      console.log('🧹 useInventoryData: Clearing error state...');
      setError(null);
      console.log('⏳ useInventoryData: Setting loading to true...');
      setLoading(true); // Show loading during delete
      console.log('📞 useInventoryData: About to call deleteProductAPI...');
      
      // Call API to delete product from database
      await deleteProductAPI(id);
      
      console.log('✅ useInventoryData: API call successful, refreshing data...');
      // Refresh data from database to ensure consistency
      await fetchData();
      
      console.log('🎉 useInventoryData: Product deleted successfully:', id);
    } catch (err) {
      console.error('❌ useInventoryData: Delete product error:', err);
      console.error('💥 useInventoryData: Error details:', {
        message: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : 'No stack trace',
        type: typeof err,
        timestamp: new Date().toISOString()
      });
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการลบสินค้า');
      throw err; // Re-throw for component error handling
    } finally {
      console.log('🏁 useInventoryData: Finally block - stopping loading...');
      setLoading(false); // Stop loading
    }
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    products: filteredProducts,
    allProducts: products,
    categories,
    selectedCategory,
    searchQuery,
    loading,
    refreshing,
    error,
    lastUpdated,
    onRefresh,
    fetchData,
    handleSearch,
    handleCategoryFilter,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsByStatus,
    getLowStockProducts,
    getTotalInventoryValue,
    getStockStatistics,
  };
};
