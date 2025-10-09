// 🐾☕ Cute Cafe Animal Theme - ธีมคาเฟ่สัตว์น่ารัก
export const CafeTheme = {
  // Pastel & Cute Colors - สีพาสเทลน่ารัก
  colors: {
    // Main Backgrounds - พื้นหลังหลัก
    background: '#FFF8F0', // Cream white
    surface: '#FFFFFF', // Pure white
    surfaceLight: '#FFFBF5', // Light cream
    card: '#FFF5E6', // Peach cream
    
    // Primary Colors - สีหลักน่ารัก
    primary: '#FF9AA2', // Pastel pink (แมว)
    primaryDark: '#FF7B82', // Darker pink
    primaryLight: '#FFB5BC', // Light pink
    
    // Cute Animal Colors - สีสัตว์น่ารัก
    cat: '#FFB6C1', // Light pink - แมว
    dog: '#FFE5B4', // Peach - หมา
    rabbit: '#E0BBE4', // Lavender - กระต่าย
    bear: '#D4A5A5', // Dusty rose - หมี
    hamster: '#FFDAB9', // Peach puff - แฮมสเตอร์
    bird: '#C7CEEA', // Soft blue - นก
    
    // Accent Colors - สีเสริม
    accent: '#FFDAC1', // Peach
    accentSecondary: '#B5EAD7', // Mint green
    accentTertiary: '#E2F0CB', // Light green
    
    // Text Colors - สีข้อความ
    textPrimary: '#4A4A4A', // Dark gray
    textSecondary: '#8B8B8B', // Medium gray
    textMuted: '#B8B8B8', // Light gray
    textAccent: '#FF9AA2', // Pink accent
    
    // Status Colors - สีสถานะแบบนุ่มนวล
    success: '#B5EAD7', // Mint green
    warning: '#FFDAB9', // Peach puff
    error: '#FFB4B4', // Light red
    info: '#C7CEEA', // Soft blue
    
    // Border & Dividers - เส้นขอบ
    border: '#F0E6D2', // Light beige
    borderLight: '#F5F0E6',
    divider: '#E8DCC4',
    
    // Shadows - เงา
    shadow: 'rgba(0, 0, 0, 0.08)',
    shadowStrong: 'rgba(0, 0, 0, 0.12)',
    shadowLight: 'rgba(0, 0, 0, 0.04)',
    
    // Gradient Colors - สีไล่โทน
    gradient1: '#FFE8E8', // Light pink
    gradient2: '#FFF4E6', // Cream
    gradient3: '#E8F5E9', // Light mint
    
    // Glass Effect - แก้วโปร่งใส
    glass: 'rgba(255, 255, 255, 0.7)',
    glassStrong: 'rgba(255, 255, 255, 0.9)',
    glassLight: 'rgba(255, 255, 255, 0.5)',
  },
  
  // Spacing - ระยะห่าง
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
    '5xl': 80,
  },
  
  // Border Radius - มุมโค้ง
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    '2xl': 24,
    round: 999,
    circle: '50%',
  },
  
  // Shadows - เงา
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 4,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 16,
      elevation: 8,
    },
    cute: {
      shadowColor: '#FF9AA2',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    neon: {
      shadowColor: '#FF9AA2',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 6,
    },
  },
  
  // Typography - ตัวอักษร
  typography: {
    fontFamily: {
      regular: 'System',
      medium: 'System',
      bold: 'System',
      black: 'System',
    },
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 24,
      xxl: 32,
      xxxl: 40,
      display: 48,
    },
    weights: {
      light: '300' as const,
      regular: '400' as const,
      medium: '500' as const,
      semibold: '600' as const,
      bold: '700' as const,
      black: '900' as const,
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  // Animation - แอนิเมชัน
  animation: {
    duration: {
      fast: 200,
      normal: 300,
      slow: 500,
    },
    easing: {
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
  
  // Icons & Emojis - ไอคอนและอิโมจิ
  emojis: {
    cat: '🐱',
    dog: '🐶',
    rabbit: '🐰',
    bear: '🐻',
    hamster: '🐹',
    bird: '🐦',
    coffee: '☕',
    cake: '🍰',
    cookie: '🍪',
    heart: '💕',
    star: '⭐',
    sparkle: '✨',
  },
};

// Export as CyberPunkTheme for backward compatibility
export const CyberPunkTheme = CafeTheme;

export default CafeTheme;
