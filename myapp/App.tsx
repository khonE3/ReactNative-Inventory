import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  RefreshControl,
  FlatList,
} from 'react-native';
import { 
  LoadingScreen, 
  ErrorScreen, 
  CyberPunkBackground,
  ProductCard,
  InventoryHeader,
  CategoryFilter,
  SearchBar,
  EmptyInventoryState,
} from './src/components';
import { layoutStyles, inventoryStyles } from './src/styles';
import { useInventoryData } from './src/hooks/useInventoryData';
import { CyberPunkTheme } from './src/constants';
import { Product } from './src/types';

const App = () => {
  // Inventory Data
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
    getStockStatistics,
  } = useInventoryData();

  const inventoryStats = getStockStatistics();

  const renderProductCard = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      onPress={() => {
        console.log('Product selected:', item.name);
      }}
    />
  );

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
          </>
        }
        data={products}
        keyExtractor={(item) => `product-${item.id}`}
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
    </SafeAreaView>
  );
};

export default App;