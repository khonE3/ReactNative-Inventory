import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Animated,
  Easing,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { CyberPunkTheme } from '../constants/theme';
import { CyberPunkBackground } from './CyberPunkBackground';

interface LoginScreenProps {
  onSwitchToRegister: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();

  // Animation values
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const glowAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulse animation for demo credentials
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.02,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    // Glow animation
    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnimation, {
          toValue: 1,
          duration: 3000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: false,
        }),
        Animated.timing(glowAnimation, {
          toValue: 0,
          duration: 3000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: false,
        }),
      ])
    );

    pulseLoop.start();
    glowLoop.start();

    return () => {
      pulseLoop.stop();
      glowLoop.stop();
    };
  }, []);

  const handleDemoCredentials = () => {
    setUsername('admin');
    setPassword('123456');
    Alert.alert(
      '✨ Demo Credentials Loaded!', 
      'ข้อมูลทดสอบถูกกรอกให้แล้ว คลิก "เข้าสู่ระบบ" เพื่อดำเนินการต่อ',
      [{ text: 'OK', style: 'default' }]
    );
  };

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('ข้อผิดพลาด', 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
      return;
    }

    try {
      await login({ username: username.trim(), password });
    } catch (err) {
      Alert.alert('เข้าสู่ระบบไม่สำเร็จ', error || 'กรุณาลองใหม่อีกครั้ง');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <CyberPunkBackground />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Inventory Management System</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>ชื่อผู้ใช้</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="กรอกชื่อผู้ใช้"
              placeholderTextColor={CyberPunkTheme.colors.textMuted}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>รหัสผ่าน</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="กรอกรหัสผ่าน"
              placeholderTextColor={CyberPunkTheme.colors.textMuted}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}

          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={CyberPunkTheme.colors.textPrimary} />
            ) : (
              <Text style={styles.loginButtonText}>เข้าสู่ระบบ</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switchButton}
            onPress={handleDemoCredentials}
          >
            <Animated.View style={[
              styles.demoCredentialsContainer,
              {
                transform: [{ scale: pulseAnimation }],
                borderColor: glowAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['rgba(0, 255, 255, 0.3)', 'rgba(0, 255, 255, 0.6)']
                }),
                shadowOpacity: glowAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.2, 0.4]
                })
              }
            ]}>
              <Text style={styles.demoCredentialsTitle}>🚀 Demo Credentials</Text>
              <View style={styles.credentialRow}>
                <View style={styles.credentialItem}>
                  <Text style={styles.credentialLabel}>👤 User:</Text>
                  <Text style={styles.credentialValue}>admin</Text>
                </View>
                <View style={styles.credentialSeparator} />
                <View style={styles.credentialItem}>
                  <Text style={styles.credentialLabel}>🔑 Pass:</Text>
                  <Text style={styles.credentialValue}>123456</Text>
                </View>
              </View>
              <Text style={styles.demoHint}>✨ Tap to use demo credentials</Text>
            </Animated.View>
          </TouchableOpacity>

          {/* Register Button */}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={onSwitchToRegister}
          >
            <Text style={styles.registerButtonText}>
              ยังไม่มีบัญชี? <Text style={styles.registerButtonHighlight}>สมัครสมาชิก</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CyberPunkTheme.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: CyberPunkTheme.colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: CyberPunkTheme.colors.textMuted,
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: CyberPunkTheme.colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: CyberPunkTheme.colors.primary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: CyberPunkTheme.colors.textPrimary,
    backgroundColor: CyberPunkTheme.colors.surface,
  },
  errorText: {
    color: CyberPunkTheme.colors.error,
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: CyberPunkTheme.colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: CyberPunkTheme.colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  switchButton: {
    marginTop: 24,
    alignItems: 'center',
  },
  switchButtonText: {
    color: CyberPunkTheme.colors.textMuted,
    fontSize: 14,
  },
  switchButtonTextHighlight: {
    color: CyberPunkTheme.colors.primary,
    fontWeight: '600',
  },
  // Enhanced Demo Credentials Styles
  demoCredentialsContainer: {
    backgroundColor: 'rgba(0, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 255, 0.3)',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 8,
    shadowColor: CyberPunkTheme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  demoCredentialsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: CyberPunkTheme.colors.primary,
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.5,
    textShadowColor: CyberPunkTheme.colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  credentialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  credentialItem: {
    flex: 1,
    alignItems: 'center',
  },
  credentialSeparator: {
    width: 1,
    height: 30,
    backgroundColor: CyberPunkTheme.colors.primary,
    opacity: 0.4,
    marginHorizontal: 12,
  },
  credentialLabel: {
    fontSize: 12,
    color: CyberPunkTheme.colors.textSecondary,
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  credentialValue: {
    fontSize: 16,
    color: CyberPunkTheme.colors.textPrimary,
    fontWeight: '800',
    backgroundColor: 'rgba(0, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 255, 0.4)',
    textShadowColor: CyberPunkTheme.colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  demoHint: {
    fontSize: 12,
    color: CyberPunkTheme.colors.textMuted,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 4,
    opacity: 0.8,
  },
  // Register Button Styles
  registerButton: {
    marginTop: 16,
    alignItems: 'center',
    paddingVertical: 12,
  },
  registerButtonText: {
    color: CyberPunkTheme.colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
  },
  registerButtonHighlight: {
    color: CyberPunkTheme.colors.neonPink,
    fontWeight: '700',
    textDecorationLine: 'underline',
    textShadowColor: CyberPunkTheme.colors.neonPink,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
});
