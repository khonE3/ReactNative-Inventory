import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Product } from '../types';
import { inventoryStyles } from '../styles/inventory';
import { CyberPunkTheme } from '../constants/theme';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onPress, 
  onEdit, 
  onDelete 
}) => {
  const isLowStock = (product.stock || 0) <= 20;
  const isActive = product.status === 'active';

  const formatPrice = (price: number | undefined | null): string => {
    if (price === undefined || price === null || isNaN(price)) {
      return '0';
    }
    return price.toLocaleString('th-TH', { 
      minimumFractionDigits: 0,
      maximumFractionDigits: 2 
    });
  };

  const formatStock = (stock: number | undefined | null): string => {
    if (stock === undefined || stock === null || isNaN(stock)) {
      return '0';
    }
    return stock.toLocaleString('th-TH');
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(product);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'ยืนยันการลบ',
      `คุณต้องการลบสินค้า "${product.name}" หรือไม่?`,
      [
        {
          text: 'ยกเลิก',
          style: 'cancel',
        },
        {
          text: 'ลบ',
          style: 'destructive',
          onPress: () => {
            if (onDelete) {
              onDelete(product.id);
            }
          },
        },
      ]
    );
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

      {/* Action Buttons */}
      {(onEdit || onDelete) && (
        <View style={inventoryStyles.actionButtons}>
          {onEdit && (
            <TouchableOpacity 
              style={inventoryStyles.editButton}
              onPress={handleEdit}
              activeOpacity={0.7}
            >
              <Text style={inventoryStyles.editButtonText}>✏️</Text>
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity 
              style={inventoryStyles.deleteButton}
              onPress={handleDelete}
              activeOpacity={0.7}
            >
              <Text style={inventoryStyles.deleteButtonText}>🗑️</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};
