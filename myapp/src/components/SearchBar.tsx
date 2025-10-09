import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { inventoryStyles } from '../styles/inventory';
import { CafeTheme } from '../constants/cafeTheme';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterPress?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onFilterPress
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={inventoryStyles.searchContainer}>
      <TextInput
        style={[
          inventoryStyles.searchInput,
          isFocused && {
            borderColor: CafeTheme.colors.cat,
            shadowColor: CafeTheme.colors.primary,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4,
          }
        ]}
        placeholder="🔍 ค้นหาสินค้า รหัส หรือหมวดหมู่..."
        placeholderTextColor={CafeTheme.colors.textSecondary}
        value={searchQuery}
        onChangeText={onSearchChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        returnKeyType="search"
      />
      
      {onFilterPress && (
        <TouchableOpacity 
          style={inventoryStyles.filterButton}
          onPress={onFilterPress}
          activeOpacity={0.8}
        >
          <Text style={{ color: CafeTheme.colors.primary, fontSize: 18 }}>
            🎛️
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
