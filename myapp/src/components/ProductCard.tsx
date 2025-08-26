import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Product } from '../types';
import { inventoryStyles } from '../styles/inventory';
import { CyberPunkTheme } from '../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

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

  const formatPrice = (price: number): string => {
    if (price === undefined || price === null || isNaN(price)) {
      return '0';
    }
    return price.toLocaleString('th-TH', { 
      minimumFractionDigits: 0,
      maximumFractionDigits: 2 
    });
  };

  const formatStock = (stock: number): string => {
    if (stock === undefined || stock === null || isNaN(stock)) {
      return '0';
    }
    return stock.toLocaleString('th-TH');
  };

  const formatLastUpdate = (lastUpdate: string | undefined | null): string => {
    if (!lastUpdate) return 'ไม่ระบุ';
    
    try {
      const date = new Date(lastUpdate);
      return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'ไม่ระบุ';
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'in_stock':
        return CyberPunkTheme.colors.success;
      case 'inactive':
      case 'out_of_stock':
        return CyberPunkTheme.colors.error;
      case 'low_stock':
        return CyberPunkTheme.colors.warning;
      default:
        return CyberPunkTheme.colors.textSecondary;
    }
  };

  const getStatusText = (status: string): string => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'พร้อมขาย';
      case 'inactive':
        return 'ไม่พร้อมขาย';
      case 'in_stock':
        return 'มีสินค้า';
      case 'out_of_stock':
        return 'สินค้าหมด';
      case 'low_stock':
        return 'สต็อกต่ำ';
      default:
        return status || 'ไม่ระบุ';
    }
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
      style={[inventoryStyles.productCard, { elevation: 8, shadowOpacity: 0.3 }]} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Enhanced Glow Effect */}
      <LinearGradient
        colors={[
          CyberPunkTheme.colors.primary + '20',
          CyberPunkTheme.colors.primary + '05',
          'transparent'
        ]}
        style={inventoryStyles.productGlow}
      />
      
      {/* Status Indicator with pulse animation */}
      <View 
        style={[
          inventoryStyles.statusIndicator,
          isActive ? 
            { backgroundColor: CyberPunkTheme.colors.success, shadowColor: CyberPunkTheme.colors.success, shadowOpacity: 0.6, shadowRadius: 4 } : 
            { backgroundColor: CyberPunkTheme.colors.error, shadowColor: CyberPunkTheme.colors.error, shadowOpacity: 0.6, shadowRadius: 4 }
        ]} 
      />

      {/* Enhanced Low Stock Warning */}
      {isLowStock && (
        <LinearGradient
          colors={[CyberPunkTheme.colors.warning, CyberPunkTheme.colors.warning + '80']}
          style={[inventoryStyles.lowStockWarning, { borderRadius: 8, elevation: 4 }]}
        >
          <Text style={[inventoryStyles.lowStockText, { fontSize: 11, fontWeight: 'bold' }]}>
            ⚠️ สต็อกต่ำ!
          </Text>
        </LinearGradient>
      )}

      {/* Enhanced Product Image */}
      <View style={[inventoryStyles.imageContainer, { elevation: 4, borderRadius: 12 }]}>
        {product.image ? (
          <Image 
            source={{ uri: product.image }}
            style={[inventoryStyles.productImage, { borderRadius: 10 }]}
            resizeMode="cover"
          />
        ) : (
          <LinearGradient
            colors={[CyberPunkTheme.colors.surfaceLight, CyberPunkTheme.colors.surface]}
            style={[inventoryStyles.productImagePlaceholder, { borderRadius: 10 }]}
          >
            <Text style={[inventoryStyles.placeholderText, { fontSize: 32 }]}>📦</Text>
          </LinearGradient>
        )}
      </View>

      {/* Enhanced Product Info */}
      <View style={inventoryStyles.productInfo}>
        <Text style={[inventoryStyles.productName, { fontSize: 16, fontWeight: 'bold' }]} numberOfLines={2}>
          {product.name}
        </Text>
        
        <View style={{ backgroundColor: CyberPunkTheme.colors.primary + '20', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginVertical: 4, alignSelf: 'flex-start' }}>
          <Text style={[inventoryStyles.productCode, { fontSize: 11, color: CyberPunkTheme.colors.primary, fontWeight: '600' }]}>
            {product.productCode}
          </Text>
        </View>
        
        <LinearGradient
          colors={[CyberPunkTheme.colors.primary + '30', CyberPunkTheme.colors.primary + '15']}
          style={[inventoryStyles.categoryBadge, { borderRadius: 12, borderWidth: 1, borderColor: CyberPunkTheme.colors.primary + '40' }]}
        >
          <Text style={[inventoryStyles.categoryText, { fontWeight: '600' }]}>
            🏷️ {product.category}
          </Text>
        </LinearGradient>
      </View>

      {/* Enhanced Price and Stock */}
      <View style={[inventoryStyles.bottomInfo, { backgroundColor: CyberPunkTheme.colors.surface + '80', borderRadius: 8, margin: 8, padding: 8, elevation: 2 }]}>
        <View style={inventoryStyles.priceSection}>
          <Text style={[inventoryStyles.productPrice, { fontSize: 18, fontWeight: 'bold', color: CyberPunkTheme.colors.primary }]}>
            ฿{formatPrice(product.price)}
          </Text>
          <Text style={[inventoryStyles.productUnit, { fontSize: 11 }]}>
            ต่อ {product.unit}
          </Text>
        </View>
        
        <View style={inventoryStyles.stockSection}>
          <Text style={[
            inventoryStyles.productStock,
            { 
              fontSize: 16, 
              fontWeight: 'bold',
              color: isLowStock ? CyberPunkTheme.colors.error : CyberPunkTheme.colors.success 
            }
          ]}>
            {formatStock(product.stock)}
          </Text>
          <Text style={[inventoryStyles.stockLabel, { fontSize: 11 }]}>คงเหลือ</Text>
        </View>
      </View>

      {/* Enhanced Location and Brand */}
      <View style={[inventoryStyles.additionalInfo, { backgroundColor: CyberPunkTheme.colors.surfaceLight + '50', borderRadius: 6, margin: 8, padding: 6 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
          <Text style={[inventoryStyles.locationText, { fontSize: 11, flex: 1 }]}>
            📍 {product.location}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[inventoryStyles.brandText, { fontSize: 11, flex: 1 }]}>
            � {product.brand}
          </Text>
        </View>
      </View>

      {/* Enhanced Status and Last Update */}
      <View style={[inventoryStyles.statusUpdateInfo, { backgroundColor: CyberPunkTheme.colors.background + '80', borderRadius: 6, margin: 8, padding: 6 }]}>
        <View style={[inventoryStyles.statusInfo, { marginBottom: 2 }]}>
          <Text style={[inventoryStyles.statusLabel, { fontSize: 10, fontWeight: '600' }]}>สถานะ:</Text>
          <View style={{ 
            backgroundColor: getStatusColor(product.status) + '20', 
            paddingHorizontal: 6, 
            paddingVertical: 1, 
            borderRadius: 4, 
            borderWidth: 1, 
            borderColor: getStatusColor(product.status) + '40' 
          }}>
            <Text style={[
              inventoryStyles.statusValue,
              { color: getStatusColor(product.status), fontSize: 10, fontWeight: 'bold' }
            ]}>
              {getStatusText(product.status)}
            </Text>
          </View>
        </View>
        <View style={inventoryStyles.updateInfo}>
          <Text style={[inventoryStyles.updateLabel, { fontSize: 9 }]}>อัปเดต:</Text>
          <Text style={[inventoryStyles.updateValue, { fontSize: 9 }]}>
            {formatLastUpdate(product.lastUpdate)}
          </Text>
        </View>
      </View>

      {/* Enhanced Action Buttons */}
      {(onEdit || onDelete) && (
        <View style={[inventoryStyles.actionButtons, { backgroundColor: CyberPunkTheme.colors.surface, borderRadius: 8, margin: 8, padding: 4, elevation: 2 }]}>
          {onEdit && (
            <TouchableOpacity 
              style={[inventoryStyles.editButton, { 
                backgroundColor: CyberPunkTheme.colors.primary,
                borderRadius: 6,
                paddingHorizontal: 12,
                paddingVertical: 6,
                elevation: 2
              }]}
              onPress={handleEdit}
              activeOpacity={0.8}
            >
              <Text style={[inventoryStyles.editButtonText, { fontSize: 12, fontWeight: 'bold', color: 'white' }]}>
                ✏️ แก้ไข
              </Text>
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity 
              style={[inventoryStyles.deleteButton, { 
                backgroundColor: CyberPunkTheme.colors.error,
                borderRadius: 6,
                paddingHorizontal: 12,
                paddingVertical: 6,
                elevation: 2
              }]}
              onPress={handleDelete}
              activeOpacity={0.8}
            >
              <Text style={[inventoryStyles.deleteButtonText, { fontSize: 12, fontWeight: 'bold', color: 'white' }]}>
                🗑️ ลบ
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};
