import { StyleSheet } from 'react-native';
import { CafeTheme } from '../constants/cafeTheme';

const { colors, spacing, radius } = CafeTheme;

export const layoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingVertical: spacing['4xl'],
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    minHeight: '100%',
  },
  cardsWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: spacing.lg,
  },
});
