import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types';
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
    getProductsByStatus,
    getLowStockProducts,
    getTotalInventoryValue,
    getStockStatistics,
  };
};
