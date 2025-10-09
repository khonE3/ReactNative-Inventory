import React, { useState } from 'react';
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
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import CafeTheme from '../constants/cafeTheme';

interface LoginScreenProps {
  onSwitchToRegister: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onSwitchToRegister }) => {
  const [username, setUsername] = useState('testD');
  const [password, setPassword] = useState('123456');
  const { login, isLoading, error } = useAuth();

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
      <View style={styles.content}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>ชื่อผู้ใช้</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="กรอกชื่อผู้ใช้"
              placeholderTextColor={CafeTheme.colors.textMuted}
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
              placeholderTextColor={CafeTheme.colors.textMuted}
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
              <ActivityIndicator color={CafeTheme.colors.textPrimary} />
            ) : (
              <Text style={styles.loginButtonText}>เข้าสู่ระบบ</Text>
            )}
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
    backgroundColor: CafeTheme.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
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
    color: CafeTheme.colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: CafeTheme.colors.primary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: CafeTheme.colors.textPrimary,
    backgroundColor: CafeTheme.colors.surface,
  },
  errorText: {
    color: CafeTheme.colors.error,
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: CafeTheme.colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: CafeTheme.colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  // Register Button Styles
  registerButton: {
    marginTop: 16,
    alignItems: 'center',
    paddingVertical: 12,
  },
  registerButtonText: {
    color: CafeTheme.colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
  },
  registerButtonHighlight: {
    color: CafeTheme.colors.primary,
    fontWeight: '700',
    textDecorationLine: 'underline',
    textShadowColor: CafeTheme.colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
});
