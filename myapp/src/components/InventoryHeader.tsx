import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { inventoryStyles } from '../styles/inventory';
import { CyberPunkTheme } from '../constants';
import { Product } from '../types';

interface InventoryHeaderProps {
  totalProducts: number;
  activeProducts: number;
  lowStockProducts: number;
  totalValue: number;
  lastUpdated: string;
  products?: Product[]; // เพิ่มเพื่อส่งให้ PDF Export
  onRefresh?: () => void;
}

export const InventoryHeader: React.FC<InventoryHeaderProps> = ({
  totalProducts,
  activeProducts,
  lowStockProducts,
  totalValue,
  lastUpdated,
  products = [],
  onRefresh
}) => {
  // Animation values
  const glowAnimation = useRef(new Animated.Value(0)).current;
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const titleAnimation = useRef(new Animated.Value(0)).current;

  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('th-TH', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  };

  useEffect(() => {
    // Continuous glow animation
    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnimation, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: false,
        }),
        Animated.timing(glowAnimation, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: false,
        }),
      ])
    );

    // Pulse animation for border
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.05,
          duration: 1500,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );

    // Title entrance animation
    Animated.timing(titleAnimation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.out(Easing.back(1.7)),
      useNativeDriver: true,
    }).start();

    glowLoop.start();
    pulseLoop.start();

    return () => {
      glowLoop.stop();
      pulseLoop.stop();
    };
  }, []);

  const animatedGlowOpacity = glowAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.1, 0.25],
  });

  const animatedInnerGlowOpacity = glowAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.02, 0.08],
  });

  return (
    <View style={inventoryStyles.header}>
      {/* Multiple animated glow layers for enhanced cyberpunk effect */}
      <Animated.View style={[
        inventoryStyles.headerGlow,
        { opacity: animatedGlowOpacity }
      ]} />
      <Animated.View style={[
        inventoryStyles.headerInnerGlow,
        { opacity: animatedInnerGlowOpacity }
      ]} />
      <Animated.View style={[
        inventoryStyles.headerPulse,
        { transform: [{ scale: pulseAnimation }] }
      ]} />
      
      <View style={styles.headerTop}>
        <View style={{ flex: 1 }}>
          <Animated.Text style={[
            inventoryStyles.headerTitle,
            {
              transform: [
                { scale: titleAnimation },
                { translateY: titleAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0]
                })}
              ],
              opacity: titleAnimation
            }
          ]}>
              ​​Inventory Management System
          </Animated.Text>
        </View>
      </View>
      
      <View style={inventoryStyles.statsContainer}>
        <View style={[inventoryStyles.statItem, styles.statCardEnhanced]}>
          <Text style={[inventoryStyles.statValue, styles.statValueGlow]}>📦 {totalProducts}</Text>
          <Text style={inventoryStyles.statLabel}>สินค้าทั้งหมด</Text>
        </View>
        
        <View style={[inventoryStyles.statItem, styles.statCardActive]}>
          <Text style={[inventoryStyles.statValue, styles.statValueGlow]}>✅ {activeProducts}</Text>
          <Text style={inventoryStyles.statLabel}>สินค้าพร้อมขาย</Text>
        </View>
        
        <View style={[inventoryStyles.statItem, lowStockProducts > 0 ? styles.statCardWarning : styles.statCardSuccess]}>
          <Text style={[
            inventoryStyles.statValue, 
            styles.statValueGlow,
            { color: lowStockProducts > 0 ? CyberPunkTheme.colors.error : CyberPunkTheme.colors.success }
          ]}>
            {lowStockProducts > 0 ? '⚠️' : '✨'} {lowStockProducts}
          </Text>
          <Text style={inventoryStyles.statLabel}>สต็อกต่ำ</Text>
        </View>
        
        <View style={[inventoryStyles.statItem, styles.statCardValue]}>
          <Text style={[inventoryStyles.statValue, styles.statValueGlow]}>💰 ฿{formatCurrency(totalValue)}</Text>
          <Text style={inventoryStyles.statLabel}>มูลค่ารวม</Text>
        </View>
      </View>
      
      {lastUpdated && (
        <View style={styles.lastUpdatedContainer}>
          <View style={styles.lastUpdatedDivider} />
          <Text style={styles.lastUpdatedText}>
            🕒 อัพเดทล่าสุด: {lastUpdated}
          </Text>
          <View style={styles.lastUpdatedDivider} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  lastUpdatedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 12,
  },
  lastUpdatedDivider: {
    flex: 1,
    height: 1,
    backgroundColor: CyberPunkTheme.colors.primary,
    opacity: 0.3,
    marginHorizontal: 12,
  },
  lastUpdatedText: {
    fontSize: 12,
    color: CyberPunkTheme.colors.textSecondary,
    fontWeight: '600',
    letterSpacing: 0.5,
    textShadowColor: CyberPunkTheme.colors.textSecondary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
    paddingHorizontal: 8,
  },
  // Enhanced stat card styles
  statCardEnhanced: {
    backgroundColor: 'rgba(0, 255, 255, 0.12)',
    borderColor: 'rgba(0, 255, 255, 0.4)',
  },
  statCardActive: {
    backgroundColor: 'rgba(0, 255, 65, 0.12)',
    borderColor: 'rgba(0, 255, 65, 0.4)',
  },
  statCardWarning: {
    backgroundColor: 'rgba(255, 0, 64, 0.12)',
    borderColor: 'rgba(255, 0, 64, 0.4)',
  },
  statCardSuccess: {
    backgroundColor: 'rgba(46, 213, 115, 0.12)',
    borderColor: 'rgba(46, 213, 115, 0.4)',
  },
  statCardValue: {
    backgroundColor: 'rgba(255, 255, 0, 0.12)',
    borderColor: 'rgba(255, 255, 0, 0.4)',
  },
  statValueGlow: {
    textShadowColor: CyberPunkTheme.colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
});
