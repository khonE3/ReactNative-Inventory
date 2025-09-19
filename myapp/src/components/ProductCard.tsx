import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert, Platform } from 'react-native';
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
  console.warn('🃏🃏🃏 ProductCard render:', {
    productName: product.name,
    productId: product.id,
    hasOnDelete: !!onDelete,
    hasOnEdit: !!onEdit,
    hasOnPress: !!onPress,
    onDeleteType: typeof onDelete,
    onDeleteValue: onDelete
  });
  
  console.error('🃏🃏🃏 ProductCard render (ERROR LOG):', product.name, 'DELETE?', !!onDelete);

  // DEBUG: Check onDelete prop
  React.useEffect(() => {
    console.log('🚨 ProductCard useEffect - onDelete check:', {
      productName: product.name,
      hasOnDelete: !!onDelete,
      onDeleteType: typeof onDelete
    });
  }, [product.name, onDelete]);

  // เพิ่ม Alert เพื่อ debug การ render
  React.useEffect(() => {
    if (onDelete) {
      console.log('🎯 ProductCard mounted with DELETE function for:', product.name);
    }
  }, [onDelete, product.name]);
  
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
    console.error('🚀🚀🚀 ProductCard: handleDelete called!');
    console.error('🗑️ ProductCard: Product:', product.name, 'ID:', product.id);
    console.error('🔍 ProductCard: onDelete exists?', !!onDelete);
    console.error('🔍 ProductCard: onDelete type:', typeof onDelete);
    console.error('⏰ ProductCard: Delete button clicked at:', new Date().toISOString());
    
    // Force alert to show progress
    alert('handleDelete function called!');
    
    // SKIP Alert dialog - call onDelete directly for testing
    console.error('🚀🚀🚀 ProductCard: SKIPPING Alert, calling onDelete directly!');
    console.error('⏰ ProductCard: Direct call at:', new Date().toISOString());
    console.error('📞 ProductCard: About to call onDelete function...');
    
    if (onDelete) {
      console.error('✅✅✅ ProductCard: Calling onDelete with ID:', product.id);
      alert('Calling onDelete function now...');
      onDelete(product.id);
      console.error('✅✅✅ ProductCard: onDelete function called');
      alert('onDelete function called successfully!');
    } else {
      console.error('❌❌❌ ProductCard: No onDelete function provided');
      alert('ERROR: No onDelete function provided!');
    }
  };



  console.log('🎯 ProductCard about to render with delete button:', !!onDelete);
  console.log('🎯 Product details for rendering:', {
    id: product.id,
    name: product.name,
    onDeleteExists: !!onDelete,
    buttonWillRender: !!(onEdit || onDelete)
  });
  
  // FORCE SHOW TEST BUTTON ALWAYS for debugging
  console.log('🚨 DEBUGGING: onDelete =', onDelete);
  console.log('🚨 DEBUGGING: Will render onDelete block?', !!onDelete);

  return (
    <View style={[inventoryStyles.productCard, { elevation: 8, shadowOpacity: 0.3 }]}>
      {/* TEMPORARILY REMOVED: Invisible touchable overlay - might be blocking delete button */}
      {/* <TouchableOpacity 
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 60 }}
        onPress={onPress}
        activeOpacity={0.9}
      /> */}
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



      {/* Action Buttons */}
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.1)',
        margin: 5,
        borderRadius: 10
      }}>
        {onEdit && (
          <TouchableOpacity 
            style={{
              backgroundColor: CyberPunkTheme.colors.primary,
              paddingHorizontal: 15,
              paddingVertical: 8,
              borderRadius: 8,
              flex: 1,
              marginRight: onDelete ? 5 : 0,
              alignItems: 'center'
            }}
            onPress={handleEdit}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              ✏️ แก้ไข
            </Text>
          </TouchableOpacity>
        )}
        
{(() => {
          console.error('🔍 RENDER CHECK: onDelete exists?', !!onDelete);
          console.error('🔍 RENDER CHECK: Product ID:', product.id, 'Name:', product.name);
          console.error('🔍 RENDER CHECK: Will render delete button?', !!onDelete);
          return onDelete;
        })() && (
          <TouchableOpacity 
            style={{
              backgroundColor: 'red', // เปลี่ยนเป็นสีแดงเต็มๆ เพื่อให้เห็นชัด
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: 8,
              flex: 1,
              marginLeft: onEdit ? 5 : 0,
              alignItems: 'center',
              borderWidth: 3, // เพิ่มขอบ
              borderColor: 'yellow', // ขอบสีเหลือง
              elevation: 10, // เพิ่ม shadow
              zIndex: 1000 // ให้อยู่บนสุด
            }}
            activeOpacity={0.1} // ให้เห็นการกดชัดเจน
            disabled={false} // แน่นอนว่าไม่ disable
            onPress={() => {
              console.warn('🔴🔴🔴 DELETE BUTTON PRESSED!');
              console.error('🔴🔴🔴 DELETE BUTTON PRESSED! (ERROR LOG)');
              console.info('🔴🔴🔴 DELETE BUTTON PRESSED! (INFO LOG)');
              alert('DELETE BUTTON PRESSED!'); // Force show alert
              handleDelete();
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
              🗑️ ลบ DELETE TEST
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
