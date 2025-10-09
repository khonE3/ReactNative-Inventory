import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CafeTheme } from '../constants/cafeTheme';
import { AddIcon, UserIcon, SQLExportIcon } from './Icons';

interface ActionButtonProps {
  onPress: () => void;
  title: string;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  disabled?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  onPress,
  title,
  icon,
  variant = 'primary',
  disabled = false,
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return [styles.button, styles.secondaryButton];
      case 'danger':
        return [styles.button, styles.dangerButton];
      case 'success':
        return [styles.button, styles.successButton];
      default:
        return [styles.button, styles.primaryButton];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'secondary':
        return [styles.buttonText, styles.secondaryText];
      case 'danger':
        return [styles.buttonText, styles.dangerText];
      case 'success':
        return [styles.buttonText, styles.successText];
      default:
        return [styles.buttonText, styles.primaryText];
    }
  };

  const renderButtonContent = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {icon === '➕' && (
        <AddIcon 
          size={18} 
          color={variant === 'secondary' ? CafeTheme.colors.primary : CafeTheme.colors.background} 
        />
      )}
      {icon === '👤' && (
        <UserIcon />
      )}
      {icon === '🗃️' && (
        <SQLExportIcon 
          size={18} 
          color={variant === 'secondary' ? CafeTheme.colors.success : 
                 variant === 'success' ? CafeTheme.colors.background : 
                 CafeTheme.colors.background} 
        />
      )}
      <Text style={[getTextStyle(), { marginLeft: icon ? 6 : 0 }]}>
        {title}
      </Text>
    </View>
  );

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        style={[
          styles.button,
          disabled && styles.disabledButton,
        ]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[CafeTheme.colors.cat, CafeTheme.colors.primary]}
          style={styles.primaryGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {renderButtonContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (variant === 'success') {
    return (
      <TouchableOpacity
        style={[
          styles.button,
          disabled && styles.disabledButton,
        ]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[CafeTheme.colors.success, CafeTheme.colors.success]}
          style={styles.successGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {renderButtonContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={[
        ...getButtonStyle(),
        { borderRadius: 12, flex: 1, minHeight: 44 }
      ]}>
        {renderButtonContent()}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    elevation: 4,
    shadowColor: CafeTheme.colors.cat,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  primaryButton: {
    backgroundColor: CafeTheme.colors.primary,
    borderColor: CafeTheme.colors.primary,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderColor: CafeTheme.colors.primary,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dangerButton: {
    backgroundColor: CafeTheme.colors.error,
    borderColor: CafeTheme.colors.error,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successButton: {
    backgroundColor: CafeTheme.colors.success,
    borderColor: CafeTheme.colors.success,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: CafeTheme.colors.background,
  },
  secondaryText: {
    color: CafeTheme.colors.primary,
  },
  dangerText: {
    color: 'white',
  },
  successText: {
    color: CafeTheme.colors.background,
  },
  primaryGradient: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minHeight: 44,
    flex: 1,
    borderWidth: 1,
    borderColor: CafeTheme.colors.cat + '60',
  },
  successGradient: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minHeight: 44,
    flex: 1,
    borderWidth: 1,
    borderColor: CafeTheme.colors.success + '60',
  },
});
