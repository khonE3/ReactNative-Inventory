import React from 'react';
import { View, Text } from 'react-native';
import { inventoryStyles } from '../styles/inventory';

interface EmptyInventoryStateProps {
  searchQuery?: string;
  selectedCategory?: string;
}

export const EmptyInventoryState: React.FC<EmptyInventoryStateProps> = ({
  searchQuery,
  selectedCategory
}) => {
  const getEmptyMessage = () => {
    if (searchQuery && selectedCategory && selectedCategory !== 'ทั้งหมด') {
      return {
        emoji: '🔍💔',
        title: 'ไม่พบสินค้าที่ค้นหา',
        subtitle: `ไม่พบสินค้าในหมวด "${selectedCategory}" ที่ตรงกับ "${searchQuery}"`
      };
    } else if (searchQuery) {
      return {
        emoji: '🔍❌',
        title: 'ไม่พบสินค้าที่ค้นหา',
        subtitle: `ไม่พบสินค้าที่ตรงกับ "${searchQuery}"`
      };
    } else if (selectedCategory && selectedCategory !== 'ทั้งหมด') {
      return {
        emoji: '📂🚫',
        title: 'ไม่มีสินค้าในหมวดนี้',
        subtitle: `ไม่มีสินค้าในหมวด "${selectedCategory}"`
      };
    } else {
      return {
        emoji: '📦🤖',
        title: 'ยังไม่มีสินค้าในระบบ',
        subtitle: 'เริ่มต้นเพิ่มสินค้าเข้าสู่ระบบไซเบอร์ของคุณ'
      };
    }
  };

  const { emoji, title, subtitle } = getEmptyMessage();

  return (
    <View style={inventoryStyles.emptyContainer}>
      <Text style={{ fontSize: 60, marginBottom: 10 }}>
        {emoji}
      </Text>
      <Text style={inventoryStyles.emptyText}>
        {title}
      </Text>
      <Text style={inventoryStyles.emptySubtext}>
        {subtitle}
      </Text>
    </View>
  );
};
