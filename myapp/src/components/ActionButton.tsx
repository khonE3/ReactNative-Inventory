import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { CyberPunkTheme } from '../constants/theme';
import { AddIcon, UserIcon } from './Icons';

interface ActionButtonProps {
  onPress: () => void;
  title: string;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'danger';
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
      default:
        return [styles.buttonText, styles.primaryText];
    }
  };

  return (
    <TouchableOpacity
      style={[
        ...getButtonStyle(),
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {icon === '➕' && (
          <AddIcon 
            size={16} 
            color={variant === 'secondary' ? CyberPunkTheme.colors.primary : CyberPunkTheme.colors.background} 
          />
        )}
        {icon === '👤' && (
          <UserIcon />
        )}
        <Text style={[getTextStyle(), { marginLeft: icon ? 6 : 0 }]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  primaryButton: {
    backgroundColor: CyberPunkTheme.colors.primary,
    borderColor: CyberPunkTheme.colors.primary,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderColor: CyberPunkTheme.colors.primary,
  },
  dangerButton: {
    backgroundColor: CyberPunkTheme.colors.error,
    borderColor: CyberPunkTheme.colors.error,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: CyberPunkTheme.colors.background,
  },
  secondaryText: {
    color: CyberPunkTheme.colors.primary,
  },
  dangerText: {
    color: 'white',
  },
});
