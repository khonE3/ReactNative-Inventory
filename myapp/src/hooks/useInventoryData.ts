import { useState, useEffect, useCallback } from 'react';
import { Product, ProductFormData } from '../types';
import { fetchProducts, searchProducts, filterProductsByCategory, getUniqueCategories } from '../services/api';

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

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
      setCategories(getUniqueCategories(data));
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

  // Product CRUD operations (placeholder implementations)
  const addProduct = useCallback(async (productData: ProductFormData) => {
    try {
      // In a real app, this would call an API to add the product
      const newProduct: Product = {
        id: Date.now(), // Generate temporary ID
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
        lastUpdate: new Date().toISOString(),
        storeAvailability: [],
      };
      
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      setCategories(getUniqueCategories(updatedProducts));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการเพิ่มสินค้า');
    }
  }, [products]);

  const updateProduct = useCallback(async (id: number, productData: ProductFormData) => {
    try {
      // In a real app, this would call an API to update the product
      const updatedProducts = products.map(product => 
        product.id === id 
          ? { 
              ...product, 
              name: productData.name,
              category: productData.category,
              price: parseFloat(productData.price) || product.price,
              unit: productData.unit,
              image: productData.image,
              stock: parseInt(productData.stock) || product.stock,
              location: productData.location,
              status: productData.status,
              brand: productData.brand,
              sizes: productData.sizes,
              productCode: productData.productCode || product.productCode,
              orderName: productData.orderName,
              lastUpdate: new Date().toISOString() 
            }
          : product
      );
      
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      setCategories(getUniqueCategories(updatedProducts));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการอัปเดตสินค้า');
    }
  }, [products]);

  const deleteProduct = useCallback(async (id: number) => {
    try {
      // In a real app, this would call an API to delete the product
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      setCategories(getUniqueCategories(updatedProducts));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการลบสินค้า');
    }
  }, [products]);

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
