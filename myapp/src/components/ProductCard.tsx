import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Product } from '../types';
import { inventoryStyles } from '../styles/inventory';
import { CyberPunkTheme } from '../constants/theme';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const isLowStock = product.stock <= 20;
  const isActive = product.status === 'Active';

  const formatPrice = (price: number): string => {
    return price.toLocaleString('th-TH', { 
      minimumFractionDigits: 0,
      maximumFractionDigits: 2 
    });
  };

  const formatStock = (stock: number): string => {
    return stock.toLocaleString('th-TH');
  };

  return (
    <TouchableOpacity 
      style={inventoryStyles.productCard} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Glow Effect */}
      <View style={inventoryStyles.productGlow} />
      
      {/* Status Indicator */}
      <View 
        style={[
          inventoryStyles.statusIndicator,
          isActive ? inventoryStyles.statusActive : inventoryStyles.statusInactive
        ]} 
      />

      {/* Low Stock Warning */}
      {isLowStock && (
        <View style={inventoryStyles.lowStockWarning}>
          <Text style={inventoryStyles.lowStockText}>สต็อกต่ำ!</Text>
        </View>
      )}

      {/* Product Image */}
      <View style={inventoryStyles.imageContainer}>
        {product.image ? (
          <Image 
            source={{ uri: product.image }}
            style={inventoryStyles.productImage}
            resizeMode="cover"
          />
        ) : (
          <View style={inventoryStyles.productImagePlaceholder}>
            <Text style={inventoryStyles.placeholderText}>📦</Text>
          </View>
        )}
      </View>

      {/* Product Info */}
      <View style={inventoryStyles.productInfo}>
        <Text style={inventoryStyles.productName} numberOfLines={2}>
          {product.name}
        </Text>
        
        <Text style={inventoryStyles.productCode}>
          รหัส: {product.productCode}
        </Text>
        
        <View style={inventoryStyles.categoryBadge}>
          <Text style={inventoryStyles.categoryText}>
            {product.category}
          </Text>
        </View>
      </View>

      {/* Price and Stock */}
      <View style={inventoryStyles.bottomInfo}>
        <View style={inventoryStyles.priceSection}>
          <Text style={inventoryStyles.productPrice}>
            ฿{formatPrice(product.price)}
          </Text>
          <Text style={inventoryStyles.productUnit}>
            ต่อ {product.unit}
          </Text>
        </View>
        
        <View style={inventoryStyles.stockSection}>
          <Text style={[
            inventoryStyles.productStock,
            { color: isLowStock ? CyberPunkTheme.colors.error : CyberPunkTheme.colors.success }
          ]}>
            {formatStock(product.stock)}
          </Text>
          <Text style={inventoryStyles.stockLabel}>คงเหลือ</Text>
        </View>
      </View>

      {/* Location and Brand */}
      <View style={inventoryStyles.additionalInfo}>
        <Text style={inventoryStyles.locationText}>
          📍 {product.location}
        </Text>
        <Text style={inventoryStyles.brandText}>
          🏷️ {product.brand}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
