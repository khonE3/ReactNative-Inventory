import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { legacyStyles } from '../styles';
import { CyberPunkTheme } from '../constants/theme';

interface UserIconProps {
  name?: string;
}

interface IconProps {
  size?: number;
  color?: string;
}

export const UserIcon = ({ name }: UserIconProps) => (
  <View style={legacyStyles.iconContainer}>
    {name ? (
      <Text style={legacyStyles.iconText}>{name.charAt(0).toUpperCase()}</Text>
    ) : (
      <Ionicons name="person" size={20} color={CyberPunkTheme.colors.primary} />
    )}
  </View>
);

export const MailIcon = ({ size = 20, color = CyberPunkTheme.colors.primary }: IconProps) => (
  <Ionicons name="mail" size={size} color={color} />
);

export const PhoneIcon = ({ size = 20, color = CyberPunkTheme.colors.primary }: IconProps) => (
  <Ionicons name="call" size={size} color={color} />
);

export const LocationIcon = ({ size = 20, color = CyberPunkTheme.colors.primary }: IconProps) => (
  <Ionicons name="location" size={size} color={color} />
);

export const CompanyIcon = ({ size = 20, color = CyberPunkTheme.colors.primary }: IconProps) => (
  <Ionicons name="business" size={size} color={color} />
);

// Additional icons for ProductCard - ใช้ชื่อ icon พื้นฐานที่แน่ใจว่าใช้ได้
export const WarningIcon = ({ size = 20, color = CyberPunkTheme.colors.warning }: IconProps) => (
  <Ionicons name="alert-circle" size={size} color={color} />
);

export const PackageIcon = ({ size = 20, color = CyberPunkTheme.colors.primary }: IconProps) => (
  <Ionicons name="cube" size={size} color={color} />
);

export const CategoryIcon = ({ size = 20, color = CyberPunkTheme.colors.primary }: IconProps) => (
  <Ionicons name="pricetag" size={size} color={color} />
);

export const EditIcon = ({ size = 20, color = CyberPunkTheme.colors.neonPink }: IconProps) => (
  <Ionicons name="pencil" size={size} color={color} />
);

export const DeleteIcon = ({ size = 20, color = CyberPunkTheme.colors.error }: IconProps) => (
  <Ionicons name="trash" size={size} color={color} />
);

export const AddIcon = ({ size = 20, color = CyberPunkTheme.colors.success }: IconProps) => (
  <Ionicons name="add-circle" size={size} color={color} />
);

export const ViewIcon = ({ size = 20, color = CyberPunkTheme.colors.primary }: IconProps) => (
  <Ionicons name="eye" size={size} color={color} />
);

export const BrandIcon = ({ size = 20, color = CyberPunkTheme.colors.primary }: IconProps) => (
  <Ionicons name="ribbon" size={size} color={color} />
);

export const SQLExportIcon = ({ size = 20, color = CyberPunkTheme.colors.neonGreen }: IconProps) => (
  <Ionicons name="server" size={size} color={color} />
);
