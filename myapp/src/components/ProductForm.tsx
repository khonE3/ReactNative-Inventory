import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet
} from 'react-native';
import { ProductFormData, Product } from '../types';
import { LinearGradient } from 'expo-linear-gradient';
import { CyberPunkTheme } from '../constants/theme';
import { AddIcon, EditIcon, ViewIcon, PackageIcon } from './Icons';

interface ProductFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => Promise<void>;
  initialData?: Product | null;
  mode: 'add' | 'edit' | 'view';
  onEdit?: (product: Product) => void;
}

const categories = [
  { id: 'เครื่องดื่ม', name: 'เครื่องดื่ม', icon: '🥤' },
  { id: 'ประกอบสำเร็จรูป', name: 'ประกอบสำเร็จรูป', icon: '🍜' },
  { id: 'อาหารสด', name: 'อาหารสด', icon: '🥘' },
  { id: 'ของแห้ง', name: 'ของแห้ง', icon: '🥜' },
  { id: 'ของใช้ในบ้าน', name: 'ของใช้ในบ้าน', icon: '🏠' },
  { id: 'ของใช้ส่วนตัว', name: 'ของใช้ส่วนตัว', icon: '🧴' },
  { id: 'เบเกอรี่', name: 'เบเกอรี่', icon: '🍞' },
  { id: 'ขนม', name: 'ขนม', icon: '🍪' },
  { id: 'อื่นๆ', name: 'อื่นๆ', icon: '📦' }
];

const statuses = [
  { id: 'active', name: 'ใช้งาน', icon: '✅', color: CyberPunkTheme.colors.success },
  { id: 'inactive', name: 'ไม่ใช้งาน', icon: '⏸️', color: CyberPunkTheme.colors.warning },
  { id: 'discontinued', name: 'ยกเลิก', icon: '❌', color: CyberPunkTheme.colors.error }
];

const units = [
  { id: 'ชิ้น', name: 'ชิ้น', icon: '📦' },
  { id: 'ขวด', name: 'ขวด', icon: '🍶' },
  { id: 'ซอง', name: 'ซอง', icon: '📄' },
  { id: 'กระป๋อง', name: 'กระป๋อง', icon: '🥫' },
  { id: 'ถุง', name: 'ถุง', icon: '🛍️' },
  { id: 'ห่อ', name: 'ห่อ', icon: '📦' },
  { id: 'กิโลกรัม', name: 'กิโลกรัม', icon: '⚖️' },
  { id: 'ลิตร', name: 'ลิตร', icon: '🥤' }
];

export const ProductForm: React.FC<ProductFormProps> = ({
  visible,
  onClose,
  onSubmit,
  initialData,
  mode,
  onEdit,
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: initialData?.name || '',
        category: initialData?.category || 'เครื่องดื่ม',
        price: initialData?.price?.toString() || '',
        unit: initialData?.unit || 'ชิ้น',
    image: initialData?.image || '',
    stock: initialData?.stock?.toString() || '',
    location: initialData?.location || '',
    status: initialData?.status || 'active',
    brand: initialData?.brand || '',
    sizes: initialData?.sizes || '',
    productCode: initialData?.productCode || '',
    orderName: initialData?.orderName || '',
  });

  const [loading, setLoading] = useState(false);

  // Update form data when initialData changes
  useEffect(() => {
    if (initialData) {
      console.log('ProductForm initialData:', initialData); // Debug log
      setFormData({
        name: initialData.name || '',
        category: initialData.category || 'เครื่องดื่ม',
        price: (initialData.price !== null && initialData.price !== undefined) ? initialData.price.toString() : '0',
        unit: initialData.unit || 'ชิ้น',
        image: initialData.image || '',
        stock: (initialData.stock !== null && initialData.stock !== undefined) ? initialData.stock.toString() : '0',
        location: initialData.location || '',
        status: initialData.status || 'active',
        brand: initialData.brand || '',
        sizes: initialData.sizes || '',
        productCode: initialData.productCode || '',
        orderName: initialData.orderName || '',
      });
    } else {
      // Reset form when no initialData
      setFormData({
        name: '',
        category: 'เครื่องดื่ม',
        price: '',
        unit: 'ชิ้น',
        image: '',
        stock: '',
        location: '',
        status: 'active',
        brand: '',
        sizes: '',
        productCode: '',
        orderName: '',
      });
    }
  }, [initialData]);

  const handleSubmit = async () => {
    // Validation
    if (!formData.name.trim()) {
      Alert.alert('ข้อผิดพลาด', 'กรุณากรอกชื่อสินค้า');
      return;
    }
    if (!formData.price.trim() || isNaN(parseFloat(formData.price))) {
      Alert.alert('ข้อผิดพลาด', 'กรุณากรอกราคาที่ถูกต้อง');
      return;
    }
    if (!formData.stock.trim() || isNaN(parseInt(formData.stock))) {
      Alert.alert('ข้อผิดพลาด', 'กรุณากรอกจำนวนสต็อกที่ถูกต้อง');
      return;
    }
    if (!formData.productCode.trim()) {
      Alert.alert('ข้อผิดพลาด', 'กรุณากรอกรหัสสินค้า');
      return;
    }

    try {
      setLoading(true);
      await onSubmit(formData);
      onClose();
      Alert.alert(
        'สำเร็จ', 
        mode === 'add' ? 'เพิ่มสินค้าสำเร็จ' : 'แก้ไขสินค้าสำเร็จ'
      );
    } catch (error) {
      Alert.alert('ข้อผิดพลาด', error instanceof Error ? error.message : 'เกิดข้อผิดพลาด');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof ProductFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.9)']}
        style={styles.modalOverlay}
      >
        <LinearGradient
          colors={[CyberPunkTheme.colors.surface, CyberPunkTheme.colors.background]}
          style={styles.modalContent}
        >
          <LinearGradient
            colors={[CyberPunkTheme.colors.primary + '20', CyberPunkTheme.colors.primary + '10']}
            style={styles.header}
          >
            <View style={styles.headerContent}>
              <View style={styles.headerIcon}>
                {mode === 'add' ? (
                  <AddIcon size={24} color={CyberPunkTheme.colors.primary} />
                ) : mode === 'edit' ? (
                  <EditIcon size={24} color={CyberPunkTheme.colors.neonPink} />
                ) : (
                  <ViewIcon size={24} color={CyberPunkTheme.colors.textSecondary} />
                )}
              </View>
              <Text style={styles.headerTitle}>
                {mode === 'add' ? 'เพิ่มสินค้าใหม่' : mode === 'edit' ? 'แก้ไขสินค้า' : 'รายละเอียดสินค้า'}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </LinearGradient>

          <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>ชื่อสินค้า *</Text>
              <TextInput
                style={[styles.input, mode === 'view' && styles.disabledInput]}
                value={formData.name}
                onChangeText={(value) => mode !== 'view' && updateField('name', value)}
                placeholder="กรอกชื่อสินค้า"
                placeholderTextColor={CyberPunkTheme.colors.textSecondary}
                editable={mode !== 'view'}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>หมวดหมู่</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                style={styles.horizontalPicker}
                contentContainerStyle={styles.pickerContainer}
              >
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.pickerOption,
                      formData.category === category.id && styles.pickerOptionSelected
                    ]}
                    onPress={() => mode !== 'view' && updateField('category', category.id)}
                    disabled={mode === 'view'}
                  >
                    <Text style={styles.pickerIcon}>{category.icon}</Text>
                    <Text style={[
                      styles.pickerOptionText,
                      formData.category === category.id && styles.pickerOptionTextSelected
                    ]}>
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>ราคา (บาท) *</Text>
                <TextInput
                  style={[styles.input, mode === 'view' && styles.disabledInput]}
                  value={formData.price}
                  onChangeText={(value) => mode !== 'view' && updateField('price', value)}
                  placeholder="0.00"
                  keyboardType="numeric"
                  placeholderTextColor={CyberPunkTheme.colors.textSecondary}
                  editable={mode !== 'view'}
                />
              </View>
              <View style={styles.halfInput}>
                <Text style={styles.label}>หน่วย</Text>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false} 
                  style={styles.horizontalPicker}
                  contentContainerStyle={styles.unitPicker}
                >
                  {units.map((unit) => (
                    <TouchableOpacity
                      key={unit.id}
                      style={[
                        styles.unitOption,
                        formData.unit === unit.id && styles.unitOptionSelected
                      ]}
                      onPress={() => mode !== 'view' && updateField('unit', unit.id)}
                      disabled={mode === 'view'}
                    >
                      <Text style={styles.unitIcon}>{unit.icon}</Text>
                      <Text style={[
                        styles.unitOptionText,
                        formData.unit === unit.id && styles.unitOptionTextSelected
                      ]}>
                        {unit.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>จำนวนสต็อก *</Text>
                <TextInput
                  style={[styles.input, mode === 'view' && styles.disabledInput]}
                  value={formData.stock}
                  onChangeText={(value) => mode !== 'view' && updateField('stock', value)}
                  placeholder="0"
                  keyboardType="numeric"
                  placeholderTextColor={CyberPunkTheme.colors.textSecondary}
                  editable={mode !== 'view'}
                />
              </View>
              <View style={styles.halfInput}>
                <Text style={styles.label}>ตำแหน่ง</Text>
                <TextInput
                  style={[styles.input, mode === 'view' && styles.disabledInput]}
                  value={formData.location}
                  onChangeText={(value) => mode !== 'view' && updateField('location', value)}
                  placeholder="เช่น A-001"
                  placeholderTextColor={CyberPunkTheme.colors.textSecondary}
                  editable={mode !== 'view'}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>แบรนด์</Text>
              <TextInput
                style={[styles.input, mode === 'view' && styles.disabledInput]}
                value={formData.brand}
                onChangeText={(value) => mode !== 'view' && updateField('brand', value)}
                placeholder="กรอกชื่อแบรนด์"
                placeholderTextColor={CyberPunkTheme.colors.textSecondary}
                editable={mode !== 'view'}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>ขนาด/รุ่น</Text>
              <TextInput
                style={[styles.input, mode === 'view' && styles.disabledInput]}
                value={formData.sizes}
                onChangeText={(value) => mode !== 'view' && updateField('sizes', value)}
                placeholder="เช่น S, M, L หรือ 128GB, 256GB"
                placeholderTextColor={CyberPunkTheme.colors.textSecondary}
                editable={mode !== 'view'}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>รหัสสินค้า *</Text>
              <TextInput
                style={[styles.input, mode === 'view' && styles.disabledInput]}
                value={formData.productCode}
                onChangeText={(value) => mode !== 'view' && updateField('productCode', value)}
                placeholder="เช่น IP15P-001"
                placeholderTextColor={CyberPunkTheme.colors.textSecondary}
                editable={mode !== 'view'}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>ชื่อสำหรับออเดอร์</Text>
              <TextInput
                style={[styles.input, mode === 'view' && styles.disabledInput]}
                value={formData.orderName}
                onChangeText={(value) => mode !== 'view' && updateField('orderName', value)}
                placeholder="ชื่อสินค้าแบบย่อ"
                placeholderTextColor={CyberPunkTheme.colors.textSecondary}
                editable={mode !== 'view'}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>URL รูปภาพ</Text>
              <TextInput
                style={[styles.input, mode === 'view' && styles.disabledInput]}
                value={formData.image}
                onChangeText={(value) => mode !== 'view' && updateField('image', value)}
                placeholder="https://example.com/image.jpg"
                placeholderTextColor={CyberPunkTheme.colors.textSecondary}
                editable={mode !== 'view'}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>สถานะ</Text>
              <View style={styles.statusPicker}>
                {statuses.map((status) => (
                  <TouchableOpacity
                    key={status.id}
                    style={[
                      styles.statusOption,
                      formData.status === status.id && styles.statusOptionSelected,
                      { borderColor: status.color + '40' }
                    ]}
                    onPress={() => mode !== 'view' && updateField('status', status.id)}
                    disabled={mode === 'view'}
                  >
                    <Text style={styles.statusIcon}>{status.icon}</Text>
                    <Text style={[
                      styles.statusOptionText,
                      formData.status === status.id && styles.statusOptionTextSelected,
                      formData.status === status.id && { color: status.color }
                    ]}>
                      {status.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <LinearGradient
            colors={[CyberPunkTheme.colors.primary, CyberPunkTheme.colors.primary + '80']}
            style={styles.buttonContainer}
          >
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
              disabled={loading}
            >
              <Text style={styles.cancelButtonText}>
                {mode === 'view' ? 'ปิด' : 'ยกเลิก'}
              </Text>
            </TouchableOpacity>
            {mode === 'view' ? (
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => initialData && onEdit && onEdit(initialData)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <EditIcon size={16} color="white" />
                  <Text style={[styles.submitButtonText, { marginLeft: 4 }]}>แก้ไข</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.submitButton, 
                  mode === 'edit' && styles.submitButtonEdit,
                  loading && styles.submitButtonDisabled
                ]}
                onPress={handleSubmit}
                disabled={loading}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {loading ? null : mode === 'add' ? (
                    <AddIcon size={16} color="white" />
                  ) : (
                    <EditIcon size={16} color="black" />
                  )}
                  <Text style={[
                    styles.submitButtonText, 
                    mode === 'edit' && styles.submitButtonTextEdit,
                    { marginLeft: loading ? 0 : 4 }
                  ]}>
                    {loading ? 'กำลังบันทึก...' : mode === 'add' ? 'เพิ่มสินค้า' : 'บันทึกการแก้ไข'}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </LinearGradient>
        </LinearGradient>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    borderRadius: 20,
    width: '92%',
    maxHeight: '90%',
    borderWidth: 2,
    borderColor: CyberPunkTheme.colors.primary,
    elevation: 10,
    shadowColor: CyberPunkTheme.colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomWidth: 1,
    borderBottomColor: CyberPunkTheme.colors.primary + '30',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: CyberPunkTheme.colors.textPrimary,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: CyberPunkTheme.colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  form: {
    padding: 20,
    maxHeight: 420,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: CyberPunkTheme.colors.textPrimary,
    marginBottom: 12,
    textShadowColor: CyberPunkTheme.colors.primary + '30',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  input: {
    backgroundColor: CyberPunkTheme.colors.background,
    borderWidth: 2,
    borderColor: CyberPunkTheme.colors.surfaceLight,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: CyberPunkTheme.colors.textPrimary,
    elevation: 2,
  },
  disabledInput: {
    backgroundColor: CyberPunkTheme.colors.surfaceLight,
    borderColor: CyberPunkTheme.colors.textSecondary,
    opacity: 0.7,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  halfInput: {
    flex: 0.48,
  },
  horizontalPicker: {
    maxHeight: 60,
  },
  pickerContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 16,
  },
  pickerOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: CyberPunkTheme.colors.background,
    borderWidth: 2,
    borderColor: CyberPunkTheme.colors.surfaceLight,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    minWidth: 120,
  },
  pickerOptionSelected: {
    backgroundColor: CyberPunkTheme.colors.primary,
    borderColor: CyberPunkTheme.colors.primary,
    elevation: 4,
  },
  pickerIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  pickerOptionText: {
    fontSize: 14,
    color: CyberPunkTheme.colors.textSecondary,
    fontWeight: '600',
  },
  pickerOptionTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  unitPicker: {
    flexDirection: 'row',
    gap: 6,
    paddingRight: 16,
  },
  unitOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: CyberPunkTheme.colors.background,
    borderWidth: 2,
    borderColor: CyberPunkTheme.colors.surfaceLight,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    minWidth: 80,
  },
  unitOptionSelected: {
    backgroundColor: CyberPunkTheme.colors.primary,
    borderColor: CyberPunkTheme.colors.primary,
    elevation: 4,
  },
  unitIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  unitOptionText: {
    fontSize: 12,
    color: CyberPunkTheme.colors.textSecondary,
    fontWeight: '600',
  },
  unitOptionTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  statusPicker: {
    flexDirection: 'row',
    gap: 10,
  },
  statusOption: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: CyberPunkTheme.colors.background,
    borderWidth: 2,
    borderColor: CyberPunkTheme.colors.surfaceLight,
    alignItems: 'center',
    elevation: 2,
  },
  statusOptionSelected: {
    backgroundColor: CyberPunkTheme.colors.primary,
    borderColor: CyberPunkTheme.colors.primary,
    elevation: 4,
  },
  statusIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  statusOptionText: {
    fontSize: 14,
    color: CyberPunkTheme.colors.textSecondary,
    fontWeight: '600',
  },
  statusOptionTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 16,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    borderTopWidth: 1,
    borderTopColor: CyberPunkTheme.colors.primary + '30',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: CyberPunkTheme.colors.surface,
    borderWidth: 2,
    borderColor: CyberPunkTheme.colors.surfaceLight,
    alignItems: 'center',
    elevation: 3,
  },
  cancelButtonText: {
    fontSize: 16,
    color: CyberPunkTheme.colors.textSecondary,
    fontWeight: '600',
  },
  submitButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: CyberPunkTheme.colors.primary,
    alignItems: 'center',
    elevation: 4,
  },
  submitButtonEdit: {
    backgroundColor: CyberPunkTheme.colors.neonGreen,
  },
  submitButtonDisabled: {
    opacity: 0.6,
    elevation: 1,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  submitButtonTextEdit: {
    color: 'black',
  },
});
