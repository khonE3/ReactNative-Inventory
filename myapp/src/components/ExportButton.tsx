import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Modal, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { CyberPunkTheme } from '../constants/theme';
import { ExportService } from '../services/exportService';
import { Product } from '../types';

export interface ExportButtonProps {
  products: Product[];
  disabled?: boolean;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ 
  products, 
  disabled = false 
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPress = () => {
    if (products.length === 0) {
      Alert.alert('ไม่มีข้อมูล', 'ไม่มีสินค้าในระบบสำหรับส่งออก');
      return;
    }
    setShowModal(true);
  };

  const handleExportType = async (type: 'excel' | 'pdf') => {
    setShowModal(false);
    setIsExporting(true);

    try {
      // Temporarily disabled export functionality
      Alert.alert('ข้อมูล', `การส่งออก ${type} ถูกปิดการใช้งานชั่วคราว`);
      // if (type === 'excel') {
      //   await ExportService.exportToExcel(products);
      // } else {
      //   await ExportService.exportToPDF(products);
      // }
    } catch (error) {
      console.error('Export error:', error);
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถส่งออกข้อมูลได้');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      {/* Export Button */}
      <TouchableOpacity
        onPress={handleExportPress}
        disabled={disabled || isExporting}
        activeOpacity={0.8}
        style={{
          borderRadius: 12,
          elevation: 3,
          shadowColor: CyberPunkTheme.colors.neonGreen,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          opacity: disabled || isExporting ? 0.6 : 1,
        }}
      >
        <LinearGradient
          colors={[CyberPunkTheme.colors.neonGreen, CyberPunkTheme.colors.success]}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 12,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: CyberPunkTheme.colors.neonGreen + '40',
            minWidth: 120,
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {isExporting ? (
              <>
                <Ionicons name="hourglass" size={18} color="white" />
                <Text style={{
                  color: 'white',
                  fontWeight: 'bold',
                  marginLeft: 6,
                  fontSize: 14,
                  textShadowColor: 'rgba(0,0,0,0.3)',
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
                }}>
                  กำลังส่งออก...
                </Text>
              </>
            ) : (
              <>
                <Ionicons name="download" size={18} color="white" />
                <Text style={{
                  color: 'white',
                  fontWeight: 'bold',
                  marginLeft: 6,
                  fontSize: 14,
                  textShadowColor: 'rgba(0,0,0,0.3)',
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
                }}>
                  ส่งออกข้อมูล
                </Text>
              </>
            )}
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* Export Options Modal */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.7)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}>
          <LinearGradient
            colors={[CyberPunkTheme.colors.surface, CyberPunkTheme.colors.background]}
            style={{
              borderRadius: 20,
              padding: 30,
              minWidth: 300,
              maxWidth: 400,
              borderWidth: 2,
              borderColor: CyberPunkTheme.colors.primary + '60',
              elevation: 10,
              shadowColor: CyberPunkTheme.colors.primary,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
            }}
          >
            {/* Header */}
            <View style={{ alignItems: 'center', marginBottom: 25 }}>
              <View style={{
                backgroundColor: CyberPunkTheme.colors.primary + '20',
                padding: 15,
                borderRadius: 50,
                marginBottom: 15,
              }}>
                <Ionicons 
                  name="download-outline" 
                  size={30} 
                  color={CyberPunkTheme.colors.primary} 
                />
              </View>
              <Text style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: CyberPunkTheme.colors.textPrimary,
                textAlign: 'center',
                marginBottom: 8,
              }}>
                📤 ส่งออกข้อมูลสินค้า
              </Text>
              <Text style={{
                fontSize: 14,
                color: CyberPunkTheme.colors.textSecondary,
                textAlign: 'center',
              }}>
                เลือกรูปแบบการส่งออก {products.length} รายการ
              </Text>
            </View>

            {/* Export Options */}
            <View style={{ gap: 15 }}>
              {/* Excel Option */}
              <TouchableOpacity
                onPress={() => handleExportType('excel')}
                activeOpacity={0.8}
                style={{
                  borderRadius: 15,
                  elevation: 3,
                  shadowColor: CyberPunkTheme.colors.neonGreen,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                }}
              >
                <LinearGradient
                  colors={[CyberPunkTheme.colors.neonGreen + '30', CyberPunkTheme.colors.neonGreen + '15']}
                  style={{
                    padding: 20,
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: CyberPunkTheme.colors.neonGreen + '40',
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                      backgroundColor: CyberPunkTheme.colors.neonGreen + '30',
                      padding: 12,
                      borderRadius: 10,
                      marginRight: 15,
                    }}>
                      <Ionicons name="grid" size={24} color={CyberPunkTheme.colors.neonGreen} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: CyberPunkTheme.colors.textPrimary,
                        marginBottom: 4,
                      }}>
                        📊 Excel Spreadsheet
                      </Text>
                      <Text style={{
                        fontSize: 14,
                        color: CyberPunkTheme.colors.textSecondary,
                      }}>
                        ไฟล์ .xlsx สำหรับวิเคราะห์ข้อมูล
                      </Text>
                    </View>
                    <Ionicons 
                      name="chevron-forward" 
                      size={20} 
                      color={CyberPunkTheme.colors.neonGreen} 
                    />
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              {/* PDF Option */}
              <TouchableOpacity
                onPress={() => handleExportType('pdf')}
                activeOpacity={0.8}
                style={{
                  borderRadius: 15,
                  elevation: 3,
                  shadowColor: CyberPunkTheme.colors.neonOrange,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                }}
              >
                <LinearGradient
                  colors={[CyberPunkTheme.colors.neonOrange + '30', CyberPunkTheme.colors.neonOrange + '15']}
                  style={{
                    padding: 20,
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: CyberPunkTheme.colors.neonOrange + '40',
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                      backgroundColor: CyberPunkTheme.colors.neonOrange + '30',
                      padding: 12,
                      borderRadius: 10,
                      marginRight: 15,
                    }}>
                      <Ionicons name="document-text" size={24} color={CyberPunkTheme.colors.neonOrange} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: CyberPunkTheme.colors.textPrimary,
                        marginBottom: 4,
                      }}>
                        📄 PDF Document
                      </Text>
                      <Text style={{
                        fontSize: 14,
                        color: CyberPunkTheme.colors.textSecondary,
                      }}>
                        ไฟล์ HTML สำหรับพิมพ์เป็น PDF
                      </Text>
                    </View>
                    <Ionicons 
                      name="chevron-forward" 
                      size={20} 
                      color={CyberPunkTheme.colors.neonOrange} 
                    />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Cancel Button */}
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={{
                marginTop: 20,
                padding: 15,
                borderRadius: 12,
                backgroundColor: CyberPunkTheme.colors.surface + '80',
                borderWidth: 1,
                borderColor: CyberPunkTheme.colors.textMuted + '40',
                alignItems: 'center',
              }}
              activeOpacity={0.7}
            >
              <Text style={{
                color: CyberPunkTheme.colors.textMuted,
                fontSize: 16,
                fontWeight: '600',
              }}>
                ❌ ยกเลิก
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>
    </>
  );
};