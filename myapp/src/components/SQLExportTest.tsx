import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { Product } from '../types';

// Simple test component to directly test SQL export
export const SQLExportTest: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);

  // Sample test data
  const testProducts: Product[] = [
    {
      id: 1,
      name: 'Test Product 1',
      category: 'Electronics',
      price: 1000,
      unit: 'ชิ้น',
      image: 'test1.jpg',
      stock: 10,
      location: 'Warehouse A',
      status: 'in_stock',
      brand: 'TestBrand',
      sizes: 'M',
      productCode: 'TEST001',
      orderName: 'Test Order',
      storeAvailability: [],
      lastUpdate: '2024-09-19 10:00:00'
    },
    {
      id: 2,
      name: 'Test Product 2',
      category: 'Clothing',
      price: 500,
      unit: 'ชิ้น',
      image: 'test2.jpg',
      stock: 20,
      location: 'Warehouse B',
      status: 'in_stock',
      brand: 'TestBrand2',
      sizes: 'L',
      productCode: 'TEST002',
      orderName: 'Test Order 2',
      storeAvailability: [],
      lastUpdate: '2024-09-19 11:00:00'
    }
  ];

  const generateSQLContent = (products: Product[]): string => {
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    let sql = `-- ==========================================
-- SQL Export: Inventory Database
-- Generated: ${currentDate}
-- Student ID: std6630202252
-- Total Products: ${products.length}
-- ==========================================

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS \`inventory_std6630202252\`;
USE \`inventory_std6630202252\`;

-- Drop table if exists
DROP TABLE IF EXISTS \`products\`;

-- Create products table
CREATE TABLE \`products\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(255) NOT NULL,
  \`category\` varchar(100) DEFAULT NULL,
  \`price\` decimal(10,2) DEFAULT NULL,
  \`unit\` varchar(50) DEFAULT NULL,
  \`image\` varchar(255) DEFAULT NULL,
  \`stock\` int(11) DEFAULT NULL,
  \`location\` varchar(255) DEFAULT NULL,
  \`status\` varchar(50) DEFAULT NULL,
  \`brand\` varchar(100) DEFAULT NULL,
  \`sizes\` varchar(255) DEFAULT NULL,
  \`productCode\` varchar(100) DEFAULT NULL,
  \`orderName\` varchar(255) DEFAULT NULL,
  \`lastUpdate\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`idx_category\` (\`category\`),
  KEY \`idx_brand\` (\`brand\`),
  KEY \`idx_productCode\` (\`productCode\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert product data
INSERT INTO \`products\` (
  \`id\`, \`name\`, \`category\`, \`price\`, \`unit\`, \`image\`, 
  \`stock\`, \`location\`, \`status\`, \`brand\`, \`sizes\`, 
  \`productCode\`, \`orderName\`, \`lastUpdate\`
) VALUES\n`;

    const insertValues = products.map((product) => {
      const escapeSQL = (value: string): string => {
        if (!value) return "''";
        return "'" + value.replace(/'/g, "''").replace(/\\/g, "\\\\") + "'";
      };

      const escapedValues = [
        product.id || 'NULL',
        escapeSQL(product.name || ''),
        escapeSQL(product.category || ''),
        product.price || 'NULL',
        escapeSQL(product.unit || ''),
        escapeSQL(product.image || ''),
        product.stock || 'NULL',
        escapeSQL(product.location || ''),
        escapeSQL(product.status || ''),
        escapeSQL(product.brand || ''),
        escapeSQL(product.sizes || ''),
        escapeSQL(product.productCode || ''),
        escapeSQL(product.orderName || ''),
        product.lastUpdate ? `'${product.lastUpdate}'` : 'CURRENT_TIMESTAMP'
      ];
      
      return `(${escapedValues.join(', ')})`;
    });

    sql += insertValues.join(',\n');
    sql += ';\n\n';

    sql += `-- ==========================================
-- Database Statistics
-- ==========================================
-- Total products: ${products.length}
-- Generated on: ${currentDate}
-- ==========================================`;

    return sql;
  };

  const testSQLExport = async () => {
    setIsExporting(true);
    
    try {
      console.log('🧪 Starting SQL export test...');
      
      const fileName = 'std6630202252.sql';
      const sqlContent = generateSQLContent(testProducts);
      
      console.log('📝 Generated SQL content length:', sqlContent.length);
      console.log('📄 First 200 characters:', sqlContent.substring(0, 200));
      
      if (Platform.OS === 'web') {
        // Web platform - direct download
        const blob = new Blob([sqlContent], { type: 'application/sql' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        Alert.alert('✅ สำเร็จ', `ส่งออกไฟล์ ${fileName} เรียบร้อยแล้ว! ตรวจสอบ Downloads folder`);
      } else {
        // Mobile platform
        const fileUri = FileSystem.documentDirectory + fileName;
        console.log('💾 Saving to:', fileUri);

        await FileSystem.writeAsStringAsync(fileUri, sqlContent, {
          encoding: FileSystem.EncodingType.UTF8,
        });
        
        console.log('✅ File saved successfully');

        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/sql',
          dialogTitle: 'ส่งออกฐานข้อมูล SQL',
        });

        Alert.alert('✅ สำเร็จ', `ส่งออกไฟล์ ${fileName} เรียบร้อยแล้ว!`);
      }
    } catch (error) {
      console.error('❌ SQL Export Test Error:', error);
      Alert.alert('❌ ข้อผิดพลาด', `ไม่สามารถส่งออกไฟล์ได้: ${error}`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>
        🧪 SQL Export Test
      </Text>
      
      <TouchableOpacity
        onPress={testSQLExport}
        disabled={isExporting}
        style={{
          backgroundColor: isExporting ? '#666' : '#007AFF',
          padding: 15,
          borderRadius: 10,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
          {isExporting ? '⏳ กำลังสร้างไฟล์...' : '📄 ทดสอบส่งออก SQL'}
        </Text>
      </TouchableOpacity>
      
      <Text style={{ marginTop: 15, fontSize: 14, color: '#666' }}>
        จะสร้างไฟล์ std6630202252.sql พร้อมข้อมูลทดสอบ {testProducts.length} รายการ
      </Text>
    </View>
  );
};