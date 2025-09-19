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
  console.log('🏠🏠🏠 InventoryManagementApp RENDERING!');
  console.log('📱 CONSOLE LOG TEST - InventoryManagementApp is rendering!');
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
  
  // DEBUG: Check handleDeleteProduct on mount
  React.useEffect(() => {
    console.log('🧪 InventoryManagementApp mounted');
    console.log('🧪 handleDeleteProduct available:', !!deleteProduct);
    console.log('🧪 handleDeleteProduct type:', typeof deleteProduct);
  }, [deleteProduct]);
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
    console.log('🚀🚀🚀 MAIN APP: handleDeleteProduct function CALLED!');
    console.log('🔄 InventoryManagementApp: handleDeleteProduct called with ID:', productId);
    console.log('🕐 MAIN APP: Function called at:', new Date().toISOString());
    console.log('🎯 MAIN APP: deleteProduct function exists?', !!deleteProduct);
    console.log('🎯 MAIN APP: deleteProduct type:', typeof deleteProduct);
    console.log('🔍 MAIN APP: deleteProduct function:', deleteProduct);
    
    // Find product name for better user experience
    const productName = products.find(p => p.id === productId)?.name || `ID: ${productId}`;
    console.log('🎯 MAIN APP: Deleting product:', productName);
    
    try {
      console.log('📞 MAIN APP: About to call deleteProduct function...');
      console.log('🎯 MAIN APP: deleteProduct reference:', deleteProduct);
      console.log('📋 MAIN APP: productId to delete:', productId);
      
      console.log('🚀 MAIN APP: CALLING deleteProduct NOW!');
      await deleteProduct(productId);
      console.log('✅ MAIN APP: Delete successful - deleteProduct returned');
      
      // Show success alert
      Alert.alert(
        'สำเร็จ! ✅', 
        `ลบสินค้า "${productName}" เรียบร้อยแล้ว`,
        [{ text: 'ตกลง', style: 'default' }]
      );
    } catch (error) {
      console.error('❌ MAIN APP: Delete error:', error);
      console.error('💥 MAIN APP: Error details:', {
        error,
        productId,
        productName,
        timestamp: new Date().toISOString()
      });
      
      // Show detailed error alert
      const errorMessage = error instanceof Error ? error.message : 'ไม่สามารถลบสินค้าได้';
      Alert.alert(
        'เกิดข้อผิดพลาด ❌', 
        `ไม่สามารถลบสินค้า "${productName}" ได้\n\nข้อผิดพลาด: ${errorMessage}`,
        [
          { text: 'ตกลง', style: 'default' },
          { text: 'ลองใหม่', style: 'default', onPress: () => handleDeleteProduct(productId) }
        ]
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
    console.log('🎯🎯🎯 RENDERING ProductCard for:', item.name);
    console.log('🎯 Product details:', {
      id: item.id,
      name: item.name,
      hasDeleteHandler: !!handleDeleteProduct,
      deleteHandler: typeof handleDeleteProduct,
      handleDeleteProductFunction: handleDeleteProduct
    });
    console.warn('🎯 About to pass onDelete to ProductCard:', !!handleDeleteProduct);
    console.warn('🎯 RENDER ProductCard for:', item.name, 'with onDelete:', !!handleDeleteProduct);
    console.warn('🎯 deleteProduct from hook:', !!deleteProduct, typeof deleteProduct);
    console.error('🎯 PASSING onDelete to ProductCard (ERROR LOG):', item.name, !!handleDeleteProduct);
    
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
              products={products}
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

            {/* SQL Export Test Button - Development Only */}
            {__DEV__ && (
              <View style={{ padding: 10, backgroundColor: '#ffffcc', margin: 10, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
                <ActionButton
                  title={`🧪 SQL Export (${products.length} รายการ)`}
                  onPress={async () => {
                    try {
                      console.log('🧪 Testing SQL export with', products.length, 'products');
                      Alert.alert('🧪 Debug Info', `กำลังทดสอบ SQL Export\nจำนวนสินค้า: ${products.length} รายการ\nเปิด Console เพื่อดู logs`);
                      const { ExportService } = await import('../services/exportService');
                      await ExportService.exportToSQL(products);
                    } catch (error) {
                      console.error('❌ SQL Export test failed:', error);
                      Alert.alert('ข้อผิดพลาด', `ทดสอบ SQL Export ล้มเหลว: ${error}`);
                    }
                  }}
                  variant="secondary"
                />
              </View>
            )}

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
