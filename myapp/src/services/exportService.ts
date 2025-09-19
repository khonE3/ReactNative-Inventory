import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { Product } from '../types';
import { Alert, Platform } from 'react-native';

export interface ExportData {
  products: Product[];
  exportType: 'excel' | 'sql';
}

export class ExportService {
  // Export ข้อมูลเป็น Excel
  static async exportToExcel(products: Product[]): Promise<void> {
    try {
      // Check if we're on web platform
      if (Platform.OS !== 'web') {
        Alert.alert('ข้อมูล', 'การส่งออก Excel รองรับเฉพาะเว็บเบราว์เซอร์เท่านั้น');
        return;
      }

      // Dynamic import for web only
      const XLSX = await import('xlsx');
      
      // เตรียมข้อมูลสำหรับ Excel
      const excelData = products.map((product, index) => ({
        'ลำดับ': index + 1,
        'รหัสสินค้า': product.productCode || '',
        'ชื่อสินค้า': product.name || '',
        'หมวดหมู่': product.category || '',
        'ราคา (บาท)': product.price || 0,
        'จำนวนคงเหลือ': product.stock || 0,
        'หน่วย': product.unit || '',
        'สถานที่': product.location || '',
        'แบรนด์': product.brand || '',
        'สถานะ': product.status || '',
        'ขนาด': product.sizes || '',
        'ชื่อผู้สั่ง': product.orderName || '',
        'วันที่อัปเดต': product.lastUpdate ? new Date(product.lastUpdate).toLocaleDateString('th-TH') : '',
      }));

      // สร้าง workbook และ worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(excelData);

      // ปรับความกว้างคอลัมน์
      const colWidths = [
        { wch: 8 },   // ลำดับ
        { wch: 15 },  // รหัสสินค้า
        { wch: 25 },  // ชื่อสินค้า
        { wch: 15 },  // หมวดหมู่
        { wch: 12 },  // ราคา
        { wch: 12 },  // จำนวนคงเหลือ
        { wch: 10 },  // หน่วย
        { wch: 15 },  // สถานที่
        { wch: 15 },  // แบรนด์
        { wch: 10 },  // สถานะ
        { wch: 15 },  // ขนาด
        { wch: 15 },  // ชื่อผู้สั่ง
        { wch: 15 },  // วันที่อัปเดต
      ];
      ws['!cols'] = colWidths;

      // เพิ่ม worksheet เข้า workbook
      XLSX.utils.book_append_sheet(wb, ws, 'รายการสินค้า');

      // สร้างชื่อไฟล์พร้อมวันที่
      const currentDate = new Date().toLocaleDateString('th-TH').replace(/\//g, '-');
      const fileName = `รายการสินค้า_${currentDate}.xlsx`;

      if (Platform.OS === 'web') {
        // สำหรับ web platform - ใช้ browser download
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        
        // สร้าง download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        Alert.alert('สำเร็จ', `ส่งออกข้อมูล ${products.length} รายการเป็น Excel เรียบร้อยแล้ว`);
      } else {
        // สำหรับ mobile platform
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });
        const fileUri = FileSystem.documentDirectory + fileName;

        // เขียนไฟล์
        await FileSystem.writeAsStringAsync(fileUri, wbout, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // แชร์ไฟล์
        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          dialogTitle: 'ส่งออกรายการสินค้า Excel',
        });

        Alert.alert('สำเร็จ', `ส่งออกข้อมูล ${products.length} รายการเป็น Excel เรียบร้อยแล้ว`);
      }
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถส่งออกข้อมูลเป็น Excel ได้');
    }
  }

  // Export ข้อมูลเป็น SQL Database
  static async exportToSQL(products: Product[]): Promise<void> {
    try {
      console.log('🗃️ Starting SQL export...', { productCount: products.length });
      
      // สร้างชื่อไฟล์ตามที่ต้องการ
      const fileName = 'std6630202015.sql';
      
      // สร้างเนื้อหา SQL
      const sqlContent = this.generateSQLContent(products);
      console.log('📝 Generated SQL content length:', sqlContent.length);
      console.log('📄 Preview (first 200 chars):', sqlContent.substring(0, 200));
      
      if (Platform.OS === 'web') {
        console.log('🌐 Web platform detected - creating browser download');
        // สำหรับ web platform - ใช้ browser download
        const blob = new Blob([sqlContent], { type: 'application/sql' });
        console.log('📦 Created blob:', { size: blob.size, type: blob.type });
        
        // สร้าง download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        console.log('🔗 Created download link:', { href: url, download: fileName });
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        console.log('✅ Download triggered successfully');
        
        Alert.alert('สำเร็จ', `ส่งออกฐานข้อมูล ${products.length} รายการเป็น SQL (${fileName}) เรียบร้อยแล้ว\n\nตรวจสอบไฟล์ในโฟลเดอร์ Downloads`);
      } else {
        console.log('📱 Mobile platform detected - using file system');
        // สำหรับ mobile platform
        const fileUri = FileSystem.documentDirectory + fileName;
        console.log('💾 Saving to path:', fileUri);

        // เขียนไฟล์ SQL
        await FileSystem.writeAsStringAsync(fileUri, sqlContent, {
          encoding: FileSystem.EncodingType.UTF8,
        });
        console.log('✅ File written successfully');

        // แชร์ไฟล์
        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/sql',
          dialogTitle: 'ส่งออกฐานข้อมูล SQL',
        });
        console.log('📤 File shared successfully');

        Alert.alert('สำเร็จ', `ส่งออกฐานข้อมูล ${products.length} รายการเป็น SQL (${fileName}) เรียบร้อยแล้ว`);
      }
    } catch (error) {
      console.error('Error exporting to SQL:', error);
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถส่งออกข้อมูลเป็น SQL ได้');
    }
  }

  // สร้างเนื้อหา SQL สำหรับการส่งออก
  private static generateSQLContent(products: Product[]): string {
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    let sql = `-- ==========================================
-- SQL Export: Inventory Database
-- Generated: ${currentDate}
-- Student ID: std6630202015
-- Total Products: ${products.length}
-- ==========================================

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS \`inventory_std6630202015\`;
USE \`inventory_std6630202015\`;

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

    // สร้าง INSERT statements สำหรับแต่ละสินค้า
    const insertValues = products.map((product, index) => {
      const escapedValues = [
        product.id || 'NULL',
        this.escapeSQL(product.name || ''),
        this.escapeSQL(product.category || ''),
        product.price || 'NULL',
        this.escapeSQL(product.unit || ''),
        this.escapeSQL(product.image || ''),
        product.stock || 'NULL',
        this.escapeSQL(product.location || ''),
        this.escapeSQL(product.status || ''),
        this.escapeSQL(product.brand || ''),
        this.escapeSQL(product.sizes || ''),
        this.escapeSQL(product.productCode || ''),
        this.escapeSQL(product.orderName || ''),
        product.lastUpdate ? `'${product.lastUpdate}'` : 'CURRENT_TIMESTAMP'
      ];
      
      return `(${escapedValues.join(', ')})`;
    });

    sql += insertValues.join(',\n');
    sql += ';\n\n';

    // เพิ่มข้อมูลสถิติ
    sql += `-- ==========================================
-- Database Statistics
-- ==========================================
-- Total products: ${products.length}
-- Categories: ${this.getUniqueValues(products, 'category').length}
-- Brands: ${this.getUniqueValues(products, 'brand').length}
-- Locations: ${this.getUniqueValues(products, 'location').length}
-- 
-- Category breakdown:`;

    const categoryStats = this.getCategoryStats(products);
    Object.entries(categoryStats).forEach(([category, count]) => {
      sql += `\n-- ${category}: ${count} items`;
    });

    sql += `\n-- ==========================================
-- End of SQL Export
-- ==========================================`;

    return sql;
  }

  // Escape SQL strings
  private static escapeSQL(value: string): string {
    if (!value) return "''";
    return "'" + value.replace(/'/g, "''").replace(/\\/g, "\\\\") + "'";
  }

  // Get unique values from products array
  private static getUniqueValues(products: Product[], field: keyof Product): string[] {
    const values = products
      .map(product => product[field] as string)
      .filter(value => value && value.trim() !== '');
    return Array.from(new Set(values));
  }

  // Get category statistics
  private static getCategoryStats(products: Product[]): Record<string, number> {
    const stats: Record<string, number> = {};
    products.forEach(product => {
      const category = product.category || 'ไม่ระบุหมวดหมู่';
      stats[category] = (stats[category] || 0) + 1;
    });
    return stats;
  }

  // ฟังก์ชันช่วยเหลือสำหรับการเลือกประเภทการ Export
  static async showExportOptions(products: Product[]): Promise<void> {
    return new Promise((resolve) => {
      Alert.alert(
        '📤 ส่งออกข้อมูล',
        `เลือกรูปแบบการส่งออกข้อมูล ${products.length} รายการ`,
        [
          {
            text: '📊 Excel',
            onPress: async () => {
              await this.exportToExcel(products);
              resolve();
            }
          },
          {
            text: '️ SQL Database',
            onPress: () => {
              this.exportToSQL(products)
                .then(() => resolve())
                .catch((error) => {
                  console.error('SQL export failed:', error);
                  resolve();
                });
            }
          },
          {
            text: '❌ ยกเลิก',
            style: 'cancel',
            onPress: () => resolve()
          }
        ]
      );
    });
  }
}