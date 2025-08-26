# 🚀 React Native Inventory Management System

## Overview
ระบบจัดการสินค้าคลังสินค้าสมัยใหม่ด้วยธีม Cyber Punk ที่สามารถจัดการสินค้า (CRUD), ระบบ Authentication และ UI ที่สวยงาม

## Features ที่มีครบแล้ว ✅

### 🔐 Authentication System
- **Login/Logout** ด้วยระบบ Mock Authentication
- **User Management** พร้อม Role-based access
- **JWT Token** สำหรับ Security
- **Auto-logout** และ Session management

#### Mock Users พร้อมใช้งาน:
```
Username: admin | Password: 123456 | Role: admin
Username: user  | Password: 123456 | Role: user  
Username: test  | Password: test123 | Role: user
```

### 📦 Inventory Management (CRUD)
- **Create**: เพิ่มสินค้าใหม่ผ่านฟอร์มที่สมบูรณ์
- **Read**: ดูรายการสินค้าทั้งหมดพร้อม Filter และ Search
- **Update**: แก้ไขข้อมูลสินค้าผ่านฟอร์ม
- **Delete**: ลบสินค้าพร้อม Confirmation dialog

### 🎯 Advanced Features
- **Search & Filter**: ค้นหาและกรองสินค้าตาม Category
- **Stock Management**: แสดงสถานะ Stock และ Low Stock Warning
- **Statistics Dashboard**: แสดงสถิติสินค้าแบบเรียลไทม์
- **Responsive Design**: UI ที่ใช้งานง่ายบนมือถือ
- **Pull-to-Refresh**: รีเฟรชข้อมูลแบบ Pull down
- **Loading States**: แสดงสถานะการโหลดข้อมูล

## 🛠 การติดตั้งและรันโปรเจค

### Prerequisites
```bash
# ติดตั้ง Node.js, npm และ Expo CLI
npm install -g expo-cli
```

### การรันโปรเจค
```bash
# เข้าไปในโฟลเดอร์โปรเจค
cd /Users/kritchanaxt_./Desktop/ReactNative-Inventory/myapp

# รันโปรเจค
npm start

# หรือ
expo start
```

### การทดสอบบนอุปกรณ์
1. **iOS**: ใช้ Camera app สแกน QR code
2. **Android**: ใช้ Expo Go app สแกน QR code
3. **Web**: เปิด http://localhost:8083

## 📱 วิธีการใช้งาน

### 1. เข้าสู่ระบบ
- เปิดแอป → จะเจอหน้า Login
- ใส่ Username/Password ตามที่ระบุด้านบน
- กดปุ่ม "เข้าสู่ระบบ"

### 2. จัดการสินค้า
- **เพิ่มสินค้า**: กดปุ่ม "➕ เพิ่มสินค้า" → กรอกข้อมูล → บันทึก
- **แก้ไขสินค้า**: กดปุ่ม "✏️" บน Product Card → แก้ไขข้อมูล → บันทึก
- **ลบสินค้า**: กดปุ่ม "🗑️" บน Product Card → ยืนยันการลบ
- **ค้นหาสินค้า**: ใช้ Search bar ด้านบน
- **กรองหมวดหมู่**: เลือก Category ที่ต้องการ

### 3. ออกจากระบบ
- กดปุ่ม "👤 สวัสดี [username]" → ยืนยันการออกจากระบบ

## 🏗 Architecture & Structure

```
src/
├── components/          # UI Components
│   ├── AuthScreen.tsx      # หน้า Authentication
│   ├── ProductCard.tsx     # การ์ดแสดงสินค้า (พร้อม Edit/Delete)
│   ├── ProductForm.tsx     # ฟอร์มเพิ่ม/แก้ไขสินค้า
│   ├── InventoryManagementApp.tsx  # หน้าหลักจัดการสินค้า
│   └── ...
├── hooks/               # Custom Hooks
│   ├── useAuth.tsx         # Authentication logic
│   └── useInventoryData.ts # Inventory CRUD operations
├── services/            # Services Layer
│   ├── mockAuth.ts         # Mock Authentication Service
│   ├── mockApi.ts          # Mock Inventory API
│   └── auth.ts            # Auth Service Wrapper
├── types/               # TypeScript Types
└── styles/              # Styling
```

## 🔧 Tech Stack
- **React Native** + **Expo**
- **TypeScript** for type safety
- **AsyncStorage** for local data persistence
- **JWT** for authentication
- **Custom Hooks** for state management
- **Cyber Punk Theme** for modern UI

## 🎨 UI/UX Features
- **Cyber Punk Theme**: สีและ design ที่ทันสมัย
- **Neon Effects**: เอฟเฟ็กต์ glow และ neon
- **Responsive Cards**: การ์ดสินค้าที่ใช้งานง่าย
- **Smooth Animations**: อนิเมชันที่ลื่นไหล
- **Loading States**: แสดงสถานะการโหลดอย่างชัดเจน

## 📊 Product Data Structure
```typescript
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  image: string;
  stock: number;
  location: string;
  status: 'active' | 'inactive' | 'discontinued';
  brand: string;
  sizes: string;
  productCode: string;
  orderName: string;
  storeAvailability: StoreAvailability[];
  lastUpdate: string;
}
```

## 🔄 CRUD Operations

### CREATE (เพิ่มสินค้า)
```typescript
const newProduct = await addProduct({
  name: 'iPhone 15 Pro',
  category: 'Electronics',
  price: '39900',
  stock: '25',
  // ... ข้อมูลอื่นๆ
});
```

### READ (อ่านข้อมูล)
```typescript
const products = await mockInventoryService.getProducts();
const categories = await mockInventoryService.getCategories();
```

### UPDATE (แก้ไข)
```typescript
const updatedProduct = await updateProduct(productId, {
  name: 'Updated Product Name',
  price: '45900',
  // ... ข้อมูลอื่นๆ
});
```

### DELETE (ลบ)
```typescript
await deleteProduct(productId);
```

## 🚀 Next Steps / Future Enhancements
- [ ] Real Backend API integration
- [ ] Image upload functionality
- [ ] Barcode scanning
- [ ] Export/Import data
- [ ] Advanced reporting
- [ ] Push notifications
- [ ] Offline mode support

## 🐛 Known Issues
- ไม่มี issues ที่ทราบในขณะนี้

## 📝 Notes
- ข้อมูลจะถูกเก็บใน AsyncStorage (Local Storage)
- Mock data จะถูก initialize อัตโนมัติเมื่อเริ่มแอป
- ระบบ Authentication ใช้ Mock service พร้อม JWT tokens
- UI responsive สำหรับหน้าจอมือถือ

---
**🎯 ระบบนี้พร้อมใช้งานแล้ว! มีฟีเจอร์ครบถ้วนตามที่ร้องขอ: CRUD operations, Authentication และ UI ที่สวยงาม**
