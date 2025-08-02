import React from 'react';
import { View, Text } from 'react-native';
import { inventoryStyles } from '../styles/inventory';

interface InventoryHeaderProps {
  totalProducts: number;
  activeProducts: number;
  lowStockProducts: number;
  totalValue: number;
  lastUpdated: string;
}

export const InventoryHeader: React.FC<InventoryHeaderProps> = ({
  totalProducts,
  activeProducts,
  lowStockProducts,
  totalValue,
  lastUpdated
}) => {
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('th-TH', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  };

  return (
    <View style={inventoryStyles.header}>
      <View style={inventoryStyles.headerGlow} />
      
      <Text style={inventoryStyles.headerTitle}>
        ระบบจัดการสินค้าไซเบอร์
      </Text>
      
      <View style={inventoryStyles.statsContainer}>
        <View style={inventoryStyles.statItem}>
          <Text style={inventoryStyles.statValue}>{totalProducts}</Text>
          <Text style={inventoryStyles.statLabel}>สินค้าทั้งหมด</Text>
        </View>
        
        <View style={inventoryStyles.statItem}>
          <Text style={inventoryStyles.statValue}>{activeProducts}</Text>
          <Text style={inventoryStyles.statLabel}>สินค้าพร้อมขาย</Text>
        </View>
        
        <View style={inventoryStyles.statItem}>
          <Text style={[inventoryStyles.statValue, { color: lowStockProducts > 0 ? '#ff4757' : '#2ed573' }]}>
            {lowStockProducts}
          </Text>
          <Text style={inventoryStyles.statLabel}>สต็อกต่ำ</Text>
        </View>
        
        <View style={inventoryStyles.statItem}>
          <Text style={inventoryStyles.statValue}>฿{formatCurrency(totalValue)}</Text>
          <Text style={inventoryStyles.statLabel}>มูลค่ารวม</Text>
        </View>
      </View>
      
      {lastUpdated && (
        <Text style={[inventoryStyles.statLabel, { textAlign: 'center', marginTop: 10 }]}>
          อัพเดทล่าสุด: {lastUpdated}
        </Text>
      )}
    </View>
  );
};
