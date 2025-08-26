import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import { CyberPunkTheme } from '../constants';
import { ProductFormData, Product } from '../types';

interface ProductFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => Promise<void>;
  initialData?: Product | null;
  mode: 'add' | 'edit' | 'view';
  onEdit?: (product: Product) => void;
}

const categories = ['Electronics', 'Fashion', 'Home', 'Sports', 'Books', 'Food'];
const statuses = ['active', 'inactive', 'discontinued'];
const units = ['ชิ้น', 'คู่', 'กิโลกรัม', 'ลิตร', 'ชุด', 'แพ็ค'];

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
    category: initialData?.category || 'Electronics',
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
        category: initialData.category || 'Electronics',
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
        category: 'Electronics',
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
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {mode === 'add' ? 'เพิ่มสินค้าใหม่' : mode === 'edit' ? 'แก้ไขสินค้า' : 'รายละเอียดสินค้า'}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

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
              <View style={styles.pickerContainer}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.pickerOption,
                      formData.category === category && styles.pickerOptionSelected
                    ]}
                    onPress={() => mode !== 'view' && updateField('category', category)}
                    disabled={mode === 'view'}
                  >
                    <Text style={[
                      styles.pickerOptionText,
                      formData.category === category && styles.pickerOptionTextSelected
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
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
                <View style={styles.unitPicker}>
                  {units.map((unit) => (
                    <TouchableOpacity
                      key={unit}
                      style={[
                        styles.unitOption,
                        formData.unit === unit && styles.unitOptionSelected
                      ]}
                      onPress={() => mode !== 'view' && updateField('unit', unit)}
                      disabled={mode === 'view'}
                    >
                      <Text style={[
                        styles.unitOptionText,
                        formData.unit === unit && styles.unitOptionTextSelected
                      ]}>
                        {unit}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
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
                    key={status}
                    style={[
                      styles.statusOption,
                      formData.status === status && styles.statusOptionSelected
                    ]}
                    onPress={() => mode !== 'view' && updateField('status', status)}
                    disabled={mode === 'view'}
                  >
                    <Text style={[
                      styles.statusOptionText,
                      formData.status === status && styles.statusOptionTextSelected
                    ]}>
                      {status === 'active' ? 'ใช้งาน' : 
                       status === 'inactive' ? 'ไม่ใช้งาน' : 'ยกเลิก'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
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
                <Text style={styles.submitButtonText}>แก้ไข</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.submitButton, loading && styles.submitButtonDisabled]}
                onPress={handleSubmit}
                disabled={loading}
              >
                <Text style={styles.submitButtonText}>
                  {loading ? 'กำลังบันทึก...' : mode === 'add' ? 'เพิ่มสินค้า' : 'บันทึกการแก้ไข'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: CyberPunkTheme.colors.surface,
    borderRadius: 16,
    width: '90%',
    maxHeight: '90%',
    borderWidth: 1,
    borderColor: CyberPunkTheme.colors.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: CyberPunkTheme.colors.surfaceLight,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: CyberPunkTheme.colors.textPrimary,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: CyberPunkTheme.colors.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  form: {
    padding: 20,
    maxHeight: 400,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: CyberPunkTheme.colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: CyberPunkTheme.colors.background,
    borderWidth: 1,
    borderColor: CyberPunkTheme.colors.surfaceLight,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: CyberPunkTheme.colors.textPrimary,
  },
  disabledInput: {
    backgroundColor: CyberPunkTheme.colors.surfaceLight,
    borderColor: CyberPunkTheme.colors.textSecondary,
    opacity: 0.7,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  halfInput: {
    flex: 0.48,
  },
  pickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pickerOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: CyberPunkTheme.colors.background,
    borderWidth: 1,
    borderColor: CyberPunkTheme.colors.surfaceLight,
  },
  pickerOptionSelected: {
    backgroundColor: CyberPunkTheme.colors.primary,
    borderColor: CyberPunkTheme.colors.primary,
  },
  pickerOptionText: {
    fontSize: 14,
    color: CyberPunkTheme.colors.textSecondary,
  },
  pickerOptionTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  unitPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  unitOption: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: CyberPunkTheme.colors.background,
    borderWidth: 1,
    borderColor: CyberPunkTheme.colors.surfaceLight,
  },
  unitOptionSelected: {
    backgroundColor: CyberPunkTheme.colors.primary,
    borderColor: CyberPunkTheme.colors.primary,
  },
  unitOptionText: {
    fontSize: 12,
    color: CyberPunkTheme.colors.textSecondary,
  },
  unitOptionTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  statusPicker: {
    flexDirection: 'row',
    gap: 8,
  },
  statusOption: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: CyberPunkTheme.colors.background,
    borderWidth: 1,
    borderColor: CyberPunkTheme.colors.surfaceLight,
    alignItems: 'center',
  },
  statusOptionSelected: {
    backgroundColor: CyberPunkTheme.colors.primary,
    borderColor: CyberPunkTheme.colors.primary,
  },
  statusOptionText: {
    fontSize: 14,
    color: CyberPunkTheme.colors.textSecondary,
  },
  statusOptionTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: CyberPunkTheme.colors.surfaceLight,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: CyberPunkTheme.colors.surface,
    borderWidth: 1,
    borderColor: CyberPunkTheme.colors.surfaceLight,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: CyberPunkTheme.colors.textSecondary,
  },
  submitButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: CyberPunkTheme.colors.primary,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});
