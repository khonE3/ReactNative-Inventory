import { StyleSheet, Dimensions } from 'react-native';
import { CafeTheme } from '../constants/cafeTheme';

const { width } = Dimensions.get('window');

export const inventoryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CafeTheme.colors.background,
  },
  
  // Header Styles - Enhanced Cyberpunk Design
  header: {
    backgroundColor: CafeTheme.colors.surface,
    borderWidth: 2,
    borderColor: CafeTheme.colors.primary,
    borderRadius: 16,
    margin: 16,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
    // Enhanced shadow for depth
    shadowColor: CafeTheme.colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  headerGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    backgroundColor: CafeTheme.colors.primary,
    opacity: 0.15,
    borderRadius: 18,
  },
  // Additional glow layers for enhanced effect
  headerInnerGlow: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: 2,
    bottom: 2,
    backgroundColor: CafeTheme.colors.cat,
    opacity: 0.05,
    borderRadius: 14,
  },
  headerPulse: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: CafeTheme.colors.primaryLight,
    borderRadius: 16,
    opacity: 0.6,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: CafeTheme.colors.primary,
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 1.5,
    // Enhanced text shadow effect
    textShadowColor: CafeTheme.colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    // Additional shadow layers
    textDecorationColor: CafeTheme.colors.primaryLight,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  statItem: {
    alignItems: 'center',
    minWidth: 80,
    marginBottom: 8,
    backgroundColor: 'rgba(0, 255, 255, 0.08)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 255, 0.2)',
    // Enhanced shadow for stat cards
    shadowColor: CafeTheme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: CafeTheme.colors.textPrimary,
    textShadowColor: CafeTheme.colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    letterSpacing: 0.5,
  },
  statLabel: {
    fontSize: 11,
    color: CafeTheme.colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.3,
    textShadowColor: CafeTheme.colors.textSecondary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },

  // Search & Filter Styles
  searchContainer: {
    flexDirection: 'row',
    margin: 12,
    marginTop: 0,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: CafeTheme.colors.surface,
    borderWidth: 1,
    borderColor: CafeTheme.colors.primary,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: CafeTheme.colors.textPrimary,
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: CafeTheme.colors.surface,
    borderWidth: 1,
    borderColor: CafeTheme.colors.primary,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Category Filter Styles
  categoryContainer: {
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  categoryScrollView: {
    paddingVertical: 5,
  },
  categoryButton: {
    backgroundColor: CafeTheme.colors.surface,
    borderWidth: 1,
    borderColor: CafeTheme.colors.primary,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    opacity: 0.7,
  },
  categoryButtonActive: {
    backgroundColor: CafeTheme.colors.primary,
    opacity: 1,
    shadowColor: CafeTheme.colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  categoryFilter: {
    color: CafeTheme.colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: CafeTheme.colors.background,
    fontWeight: 'bold',
  },

  // Product Card Styles
  productCard: {
    backgroundColor: CafeTheme.colors.surface,
    borderWidth: 1,
    borderColor: CafeTheme.colors.primary,
    borderRadius: 12,
    margin: 4,
    padding: 12,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 300,
    flex: 1,
  },
  productGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: CafeTheme.colors.primary,
    opacity: 0.05,
    borderRadius: 12,
  },
  
  // Image Container
  imageContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: CafeTheme.colors.primary,
  },
  productImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: CafeTheme.colors.primary,
    backgroundColor: CafeTheme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: CafeTheme.colors.textSecondary,
    fontSize: 24,
  },
  
  // Product Info
  productInfo: {
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: CafeTheme.colors.textPrimary,
    marginBottom: 4,
    textAlign: 'center',
    minHeight: 32,
  },
  productCode: {
    fontSize: 10,
    color: CafeTheme.colors.primary,
    textAlign: 'center',
    marginBottom: 6,
  },
  
  // Category Badge
  categoryBadge: {
    backgroundColor: CafeTheme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: 'center',
  },
  categoryText: {
    fontSize: 10,
    color: CafeTheme.colors.background,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  // Bottom Info
  bottomInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: CafeTheme.colors.primary,
  },
  priceSection: {
    alignItems: 'flex-start',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: CafeTheme.colors.primary,
  },
  productUnit: {
    fontSize: 10,
    color: CafeTheme.colors.textSecondary,
  },
  stockSection: {
    alignItems: 'flex-end',
  },
  productStock: {
    fontSize: 14,
    fontWeight: '600',
  },
  stockLabel: {
    fontSize: 10,
    color: CafeTheme.colors.textSecondary,
  },
  
  // Additional Info
  additionalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 0.5,
    borderTopColor: CafeTheme.colors.primary + '30',
  },
  locationText: {
    fontSize: 9,
    color: CafeTheme.colors.textSecondary,
  },
  brandText: {
    fontSize: 9,
    color: CafeTheme.colors.textSecondary,
  },
  
  // Low Stock Warning
  lowStockWarning: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ff4757',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  lowStockText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  emptyText: {
    fontSize: 18,
    color: CafeTheme.colors.textSecondary,
    textAlign: 'center',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: CafeTheme.colors.textSecondary,
    textAlign: 'center',
    marginTop: 10,
    opacity: 0.7,
  },

  // Grid Layout
  gridContainer: {
    paddingHorizontal: 4,
    paddingBottom: 20,
  },
  
  // Status Indicators
  statusIndicator: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusActive: {
    backgroundColor: '#2ed573',
  },
  statusInactive: {
    backgroundColor: '#ff4757',
  },

  // Action Buttons
  actionButtons: {
    flexDirection: 'row',
    position: 'absolute',
    top: 8,
    right: 8,
    gap: 4,
  },
  editButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: CafeTheme.colors.glass,
    borderWidth: 1,
    borderColor: CafeTheme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 12,
  },
  deleteButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: CafeTheme.colors.glass,
    borderWidth: 1,
    borderColor: CafeTheme.colors.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 12,
  },

  // Status and Update Info Styles
  statusUpdateInfo: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: CafeTheme.colors.primaryDark,
  },
  statusInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusLabel: {
    fontSize: 11,
    color: CafeTheme.colors.textSecondary,
    fontWeight: '500',
  },
  statusValue: {
    fontSize: 11,
    fontWeight: 'bold',
    textShadowColor: CafeTheme.colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
  updateInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  updateLabel: {
    fontSize: 10,
    color: CafeTheme.colors.textSecondary,
    fontWeight: '500',
  },
  updateValue: {
    fontSize: 10,
    color: CafeTheme.colors.textSecondary,
    fontStyle: 'italic',
  },
});

export default inventoryStyles;
