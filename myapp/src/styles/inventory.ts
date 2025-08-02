import { StyleSheet, Dimensions } from 'react-native';
import { CyberPunkTheme } from '../constants/theme';

const { width } = Dimensions.get('window');

export const inventoryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CyberPunkTheme.colors.background,
  },
  
  // Header Styles
  header: {
    backgroundColor: CyberPunkTheme.colors.surface,
    borderWidth: 1,
    borderColor: CyberPunkTheme.colors.primary,
    borderRadius: 12,
    margin: 16,
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  headerGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: CyberPunkTheme.colors.primary,
    opacity: 0.1,
    borderRadius: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: CyberPunkTheme.colors.primary,
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: CyberPunkTheme.colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  statItem: {
    alignItems: 'center',
    minWidth: 70,
    marginBottom: 5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: CyberPunkTheme.colors.textPrimary,
  },
  statLabel: {
    fontSize: 10,
    color: CyberPunkTheme.colors.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },

  // Search & Filter Styles
  searchContainer: {
    flexDirection: 'row',
    margin: 16,
    marginTop: 0,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: CyberPunkTheme.colors.surface,
    borderWidth: 1,
    borderColor: CyberPunkTheme.colors.primary,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: CyberPunkTheme.colors.textPrimary,
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: CyberPunkTheme.colors.surface,
    borderWidth: 1,
    borderColor: CyberPunkTheme.colors.primary,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Category Filter Styles
  categoryContainer: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  categoryScrollView: {
    paddingVertical: 5,
  },
  categoryButton: {
    backgroundColor: CyberPunkTheme.colors.surface,
    borderWidth: 1,
    borderColor: CyberPunkTheme.colors.primary,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    opacity: 0.7,
  },
  categoryButtonActive: {
    backgroundColor: CyberPunkTheme.colors.primary,
    opacity: 1,
    shadowColor: CyberPunkTheme.colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  categoryFilter: {
    color: CyberPunkTheme.colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: CyberPunkTheme.colors.background,
    fontWeight: 'bold',
  },

  // Product Card Styles
  productCard: {
    backgroundColor: CyberPunkTheme.colors.surface,
    borderWidth: 1,
    borderColor: CyberPunkTheme.colors.primary,
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
    backgroundColor: CyberPunkTheme.colors.primary,
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
    borderColor: CyberPunkTheme.colors.primary,
  },
  productImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: CyberPunkTheme.colors.primary,
    backgroundColor: CyberPunkTheme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: CyberPunkTheme.colors.textSecondary,
    fontSize: 24,
  },
  
  // Product Info
  productInfo: {
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: CyberPunkTheme.colors.textPrimary,
    marginBottom: 4,
    textAlign: 'center',
    minHeight: 32,
  },
  productCode: {
    fontSize: 10,
    color: CyberPunkTheme.colors.primary,
    textAlign: 'center',
    marginBottom: 6,
  },
  
  // Category Badge
  categoryBadge: {
    backgroundColor: CyberPunkTheme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: 'center',
  },
  categoryText: {
    fontSize: 10,
    color: CyberPunkTheme.colors.background,
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
    borderTopColor: CyberPunkTheme.colors.primary,
  },
  priceSection: {
    alignItems: 'flex-start',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: CyberPunkTheme.colors.primary,
  },
  productUnit: {
    fontSize: 10,
    color: CyberPunkTheme.colors.textSecondary,
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
    color: CyberPunkTheme.colors.textSecondary,
  },
  
  // Additional Info
  additionalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 0.5,
    borderTopColor: CyberPunkTheme.colors.primary + '30',
  },
  locationText: {
    fontSize: 9,
    color: CyberPunkTheme.colors.textSecondary,
  },
  brandText: {
    fontSize: 9,
    color: CyberPunkTheme.colors.textSecondary,
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
    color: CyberPunkTheme.colors.textSecondary,
    textAlign: 'center',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: CyberPunkTheme.colors.textSecondary,
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
});

export default inventoryStyles;
