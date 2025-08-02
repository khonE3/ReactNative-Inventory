import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { inventoryStyles } from '../styles/inventory';
import { CyberPunkTheme } from '../constants/theme';

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
            borderColor: CyberPunkTheme.colors.primaryLight,
            shadowColor: CyberPunkTheme.colors.primary,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 10,
            elevation: 5,
          }
        ]}
        placeholder="🔍 ค้นหาสินค้า รหัส หรือหมวดหมู่..."
        placeholderTextColor={CyberPunkTheme.colors.textSecondary}
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
          <Text style={{ color: CyberPunkTheme.colors.primary, fontSize: 18 }}>
            🎛️
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
