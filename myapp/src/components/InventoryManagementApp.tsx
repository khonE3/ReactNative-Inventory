import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  RefreshControl,
  FlatList,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import { LoadingScreen, ErrorScreen } from './StateComponents';
import { CyberPunkBackground } from './CyberPunkBackground';
import { ProductCard } from './ProductCard';
import { InventoryHeader } from './InventoryHeader';
import { CategoryFilter } from './CategoryFilter';
import { SearchBar } from './SearchBar';
import { EmptyInventoryState } from './EmptyInventoryState';
import { ProductForm } from './ProductForm';
import { ActionButton } from './ActionButton';
import { layoutStyles, inventoryStyles } from '../styles';
import { useInventoryData } from '../hooks/useInventoryData';
import { useAuth } from '../hooks/useAuth';
import { CyberPunkTheme } from '../constants';
import { Product, ProductFormData } from '../types';

export const InventoryManagementApp = () => {
  console.log('🏠 InventoryManagementApp component rendered');
  const { user, logout } = useAuth();
  const {
    products,
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
    getStockStatistics,
  } = useInventoryData();

  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formMode, setFormMode] = useState<'add' | 'edit' | 'view'>('add');

  const inventoryStats = getStockStatistics();

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormMode('add');
    setShowProductForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormMode('edit');
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (productId: number) => {
    console.log('� MAIN APP: handleDeleteProduct function called!');
    console.log('�🔄 InventoryManagementApp: handleDeleteProduct called with ID:', productId);
    
    // Show loading alert
    Alert.alert('กำลังลบสินค้า...', 'กรุณารอสักครู่', [], { cancelable: false });
    
    try {
      console.log('📞 Calling deleteProduct function...');
      await deleteProduct(productId);
      console.log('✅ Delete successful');
      
      // Show success alert
      Alert.alert(
        'สำเร็จ! ✅', 
        'ลบสินค้าเรียบร้อยแล้ว',
        [{ text: 'ตกลง', style: 'default' }]
      );
    } catch (error) {
      console.error('❌ Delete error:', error);
      
      // Show error alert
      Alert.alert(
        'เกิดข้อผิดพลาด ❌', 
        error instanceof Error ? error.message : 'ไม่สามารถลบสินค้าได้',
        [{ text: 'ตกลง', style: 'default' }]
      );
    }
  };

  const handleProductFormSubmit = async (data: ProductFormData) => {
    try {
      if (formMode === 'add') {
        await addProduct(data);
      } else if (editingProduct) {
        await updateProduct(editingProduct.id, data);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'ออกจากระบบ',
      'คุณต้องการออกจากระบบหรือไม่?',
      [
        {
          text: 'ยกเลิก',
          style: 'cancel',
        },
        {
          text: 'ออกจากระบบ',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              Alert.alert('ข้อผิดพลาด', 'ไม่สามารถออกจากระบบได้');
            }
          },
        },
      ]
    );
  };

  const handleViewProduct = (product: Product) => {
    console.log('Viewing product:', product); // Debug log
    setEditingProduct(product);
    setFormMode('view');
    setShowProductForm(true);
  };

  const renderProductCard = ({ item }: { item: Product }) => {
    console.log('🎯 Rendering ProductCard for:', item.name, 'with onDelete:', !!handleDeleteProduct);
    console.log('🎯 Product details:', {
      id: item.id,
      name: item.name,
      hasDeleteHandler: !!handleDeleteProduct,
      deleteHandler: typeof handleDeleteProduct
    });
    return (
      <ProductCard
        product={item}
        onPress={() => handleViewProduct(item)}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={[layoutStyles.container, { backgroundColor: CyberPunkTheme.colors.background }]}>
        <CyberPunkBackground />
        <StatusBar barStyle="light-content" backgroundColor={CyberPunkTheme.colors.background} />
        <LoadingScreen />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[layoutStyles.container, { backgroundColor: CyberPunkTheme.colors.background }]}>
        <CyberPunkBackground />
        <StatusBar barStyle="light-content" backgroundColor={CyberPunkTheme.colors.background} />
        <ErrorScreen error={error} onRetry={() => fetchData()} />
      </SafeAreaView>
    );
  }

  console.log('🎯 About to render main UI with', products.length, 'products');
  console.log('🎯 handleDeleteProduct is:', typeof handleDeleteProduct);

  return (
    <SafeAreaView style={[layoutStyles.container, { backgroundColor: CyberPunkTheme.colors.background }]}>
      <CyberPunkBackground />
      <StatusBar barStyle="light-content" backgroundColor={CyberPunkTheme.colors.background} />
      
      <FlatList
        ListHeaderComponent={
          <>
            <InventoryHeader
              totalProducts={inventoryStats.totalProducts}
              activeProducts={inventoryStats.activeProducts}
              lowStockProducts={inventoryStats.lowStockProducts}
              totalValue={inventoryStats.totalValue}
              lastUpdated={lastUpdated}
            />
            
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearch}
            />
            
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategoryFilter}
            />

            {/* Action Buttons */}
            <View style={styles.actionButtonsContainer}>
              <ActionButton
                title="เพิ่มสินค้า"
                icon="➕"
                onPress={handleAddProduct}
                variant="primary"
              />
              <ActionButton
                title={`สวัสดี ${user?.username}`}
                icon="👤"
                onPress={handleLogout}
                variant="secondary"
              />
            </View>
          </>
        }
        data={products}
        keyExtractor={(item, index) => item.id ? `product-${item.id}` : `product-${index}`}
        renderItem={renderProductCard}
        numColumns={2}
        columnWrapperStyle={{ 
          justifyContent: 'space-between',
          paddingHorizontal: 8,
        }}
        contentContainerStyle={inventoryStyles.gridContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[CyberPunkTheme.colors.primary]}
            tintColor={CyberPunkTheme.colors.primary}
            title="กำลังซิงค์สินค้าไซเบอร์... ⚡"
            titleColor={CyberPunkTheme.colors.textPrimary}
          />
        }
        ListEmptyComponent={
          <EmptyInventoryState
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />
        }
      />

      <ProductForm
        visible={showProductForm}
        onClose={() => setShowProductForm(false)}
        onSubmit={handleProductFormSubmit}
        initialData={editingProduct}
        mode={formMode}
        onEdit={handleEditProduct}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  actionButtonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
  },
});
