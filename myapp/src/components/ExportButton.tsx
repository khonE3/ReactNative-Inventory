import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { CafeTheme } from '../constants/cafeTheme';
import { ExportService } from '../services/exportService';
import { Product } from '../types';

export interface ExportButtonProps {
  products: Product[];
  disabled?: boolean;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ 
  products, 
  disabled = false 
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPress = async () => {
    if (products.length === 0) {
      Alert.alert('ไม่มีข้อมูล', 'ไม่มีสินค้าในระบบสำหรับส่งออก');
      return;
    }
    
    setIsExporting(true);
    try {
      // Use the centralized export options which includes SQL export
      await ExportService.showExportOptions(products);
    } catch (error) {
      console.error('Export error:', error);
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถเรียกใช้ระบบส่งออกได้');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleExportPress}
      disabled={disabled || isExporting}
      activeOpacity={0.8}
      style={{
        borderRadius: 12,
        elevation: 3,
        shadowColor: CafeTheme.colors.success,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        opacity: disabled || isExporting ? 0.6 : 1,
      }}
    >
      <LinearGradient
        colors={[CafeTheme.colors.success, CafeTheme.colors.success]}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 12,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: CafeTheme.colors.success + '40',
          minWidth: 120,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons 
            name="download-outline" 
            size={18} 
            color={CafeTheme.colors.background}
            style={{ marginRight: 8 }}
          />
          <Text style={{
            color: CafeTheme.colors.background,
            fontSize: 14,
            fontWeight: '600',
          }}>
            ส่งออกข้อมูล
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};
