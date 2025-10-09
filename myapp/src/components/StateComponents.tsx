import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { stateStyles } from '../styles';
import { CafeTheme } from '../constants/cafeTheme';

export const LoadingScreen = () => (
  <View style={stateStyles.loadingContainer}>
    <ActivityIndicator size="large" color={CafeTheme.colors.primary} />
    <Text style={stateStyles.loadingText}>☕ กำลังโหลดข้อมูล... 🐱</Text>
  </View>
);

interface ErrorScreenProps {
  error: string;
  onRetry: () => void;
}

export const ErrorScreen = ({ error, onRetry }: ErrorScreenProps) => (
  <View style={stateStyles.errorContainer}>
    <Text style={stateStyles.errorText}>� เกิดข้อผิดพลาด: {error}</Text>
    <TouchableOpacity onPress={onRetry}>
      <Text style={stateStyles.retryText}>ลองใหม่อีกครั้ง 🔄</Text>
    </TouchableOpacity>
  </View>
);

export const EmptyState = () => (
  <View style={stateStyles.emptyContainer}>
    <Text style={stateStyles.emptyText}>🐰 ยังไม่มีข้อมูล</Text>
    <Text style={stateStyles.emptySubtext}>เพิ่มรายการสินค้าเพื่อเริ่มต้น ✨</Text>
  </View>
);
