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
  ScrollView,
} from 'react-native';
import { CafeTheme } from '../constants/cafeTheme';
import { authService } from '../services/auth';

interface RegisterScreenProps {
  onSwitchToLogin: () => void;
  onRegisterSuccess: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onSwitchToLogin,
  onRegisterSuccess,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    // Validate empty fields
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert(
        '❌ ข้อมูลไม่ครบถ้วน',
        'กรุณากรอกข้อมูลให้ครบทุกช่อง',
        [{ text: 'ตกลง', style: 'default' }]
      );
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      Alert.alert(
        '⚠️ รหัสผ่านไม่ตรงกัน',
        'กรุณาตรวจสอบรหัสผ่านและยืนยันรหัสผ่านให้ตรงกัน',
        [{ text: 'ตกลง', style: 'default' }]
      );
      return;
    }

    // Validate password length
    if (password.length < 6) {
      Alert.alert(
        '⚠️ รหัสผ่านสั้นเกินไป',
        'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร',
        [{ text: 'ตกลง', style: 'default' }]
      );
      return;
    }

    try {
      setIsLoading(true);
      
      // Register user
      await authService.register(username.trim(), password, 'user');

      // Success alert with callback
      Alert.alert(
        '✅ สร้างบัญชีสำเร็จ!',
        `ยินดีต้อนรับ ${username}!\nคุณสามารถเข้าสู่ระบบได้แล้ว 🎉`,
        [
          {
            text: 'เข้าสู่ระบบเลย',
            style: 'default',
            onPress: () => {
              // Clear form
              setUsername('');
              setPassword('');
              setConfirmPassword('');
              // Navigate to login
              onRegisterSuccess();
            }
          }
        ],
        { cancelable: false } // Prevent dismissing by tapping outside on Android
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการสร้างบัญชี';
      Alert.alert(
        '❌ ลงทะเบียนไม่สำเร็จ',
        errorMessage,
        [{ text: 'ลองอีกครั้ง', style: 'default' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>สร้างบัญชีใหม่</Text>
            <Text style={styles.subtitle}>Inventory Management System</Text>
          </View>

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
                placeholder="กรอกรหัสผ่าน (อย่างน้อย 6 ตัวอักษร)"
                placeholderTextColor={CafeTheme.colors.textMuted}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>ยืนยันรหัสผ่าน</Text>
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="กรอกรหัสผ่านอีกครั้ง"
                placeholderTextColor={CafeTheme.colors.textMuted}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <TouchableOpacity
              style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={CafeTheme.colors.background} />
              ) : (
                <Text style={styles.registerButtonText}>สร้างบัญชี</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.switchButton}
              onPress={onSwitchToLogin}
            >
              <Text style={styles.switchButtonText}>
                มีบัญชีแล้ว? <Text style={styles.switchButtonTextHighlight}>เข้าสู่ระบบ</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CafeTheme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: CafeTheme.colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: CafeTheme.colors.textMuted,
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
  registerButton: {
    backgroundColor: CafeTheme.colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  registerButtonDisabled: {
    opacity: 0.7,
  },
  registerButtonText: {
    color: CafeTheme.colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  switchButton: {
    marginTop: 24,
    alignItems: 'center',
  },
  switchButtonText: {
    color: CafeTheme.colors.textMuted,
    fontSize: 14,
  },
  switchButtonTextHighlight: {
    color: CafeTheme.colors.primary,
    fontWeight: '600',
  },
});
