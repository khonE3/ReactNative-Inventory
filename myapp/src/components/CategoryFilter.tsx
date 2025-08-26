import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { inventoryStyles } from '../styles/inventory';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategorySelect
}) => {
  return (
    <View style={inventoryStyles.categoryContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={inventoryStyles.categoryScrollView}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={category || `category-${index}`} // Fallback key if category is empty
            style={[
              inventoryStyles.categoryButton,
              selectedCategory === category && inventoryStyles.categoryButtonActive
            ]}
            onPress={() => onCategorySelect(category)}
            activeOpacity={0.8}
          >
            <Text style={[
              inventoryStyles.categoryFilter,
              selectedCategory === category && inventoryStyles.categoryTextActive
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
