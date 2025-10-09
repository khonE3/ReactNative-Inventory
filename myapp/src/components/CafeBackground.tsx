import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CafeTheme from '../constants/cafeTheme';

const { width, height } = Dimensions.get('window');

interface FloatingAnimalProps {
  delay?: number;
  emoji: string;
  left?: number;
}

const FloatingAnimal: React.FC<FloatingAnimalProps> = ({ delay = 0, emoji, left = 50 }) => {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const floatAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3000,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );

    const rotateAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 4000,
          delay: delay + 500,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    );

    floatAnimation.start();
    rotateAnimation.start();

    return () => {
      floatAnimation.stop();
      rotateAnimation.stop();
    };
  }, [delay]);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '10deg'],
  });

  return (
    <Animated.Text
      style={[
        styles.floatingAnimal,
        {
          left: `${left}%`,
          transform: [{ translateY }, { rotate }],
        },
      ]}
    >
      {emoji}
    </Animated.Text>
  );
};

export const CyberPunkBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={[
          CafeTheme.colors.gradient1,
          CafeTheme.colors.gradient2,
          CafeTheme.colors.background,
        ]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Floating Animals */}
      <View style={styles.animalsContainer}>
        <FloatingAnimal emoji="๐ฑ" delay={0} left={10} />
        <FloatingAnimal emoji="๐ถ" delay={500} left={85} />
        <FloatingAnimal emoji="๐ฐ" delay={1000} left={25} />
        <FloatingAnimal emoji="๐ป" delay={1500} left={70} />
        <FloatingAnimal emoji="โ•" delay={2000} left={50} />
        <FloatingAnimal emoji="๐ฐ" delay={2500} left={40} />
        <FloatingAnimal emoji="โจ" delay={3000} left={60} />
      </View>

      {/* Decorative Circles */}
      <View style={styles.decorativeCircles}>
        <View style={[styles.circle, styles.circleLarge, { top: '10%', left: '5%' }]} />
        <View style={[styles.circle, styles.circleMedium, { top: '60%', right: '10%' }]} />
        <View style={[styles.circle, styles.circleSmall, { bottom: '15%', left: '15%' }]} />
        <View style={[styles.circle, styles.circleMedium, { top: '30%', right: '5%' }]} />
      </View>

      {/* Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  animalsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  floatingAnimal: {
    position: 'absolute',
    fontSize: 40,
    opacity: 0.3,
    top: '20%',
  },
  decorativeCircles: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  circle: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.1,
  },
  circleLarge: {
    width: 200,
    height: 200,
    backgroundColor: CafeTheme.colors.primary,
  },
  circleMedium: {
    width: 120,
    height: 120,
    backgroundColor: CafeTheme.colors.accent,
  },
  circleSmall: {
    width: 60,
    height: 60,
    backgroundColor: CafeTheme.colors.cat,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});

export default CyberPunkBackground;
