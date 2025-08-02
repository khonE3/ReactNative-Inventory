# ReactNative-Inventory

# 🏪 ระบบจัดการสินค้าไซเบอร์ (Cyberpunk Inventory Management System)

![Inventory System](./assets/screenshots/inventory-main.png)

## 📋 คำอธิบายโครงการ

ระบบจัดการสินค้าไซเบอร์เป็นแอปพลิเคชัน React Native ที่ออกแบบมาเพื่อจัดการสินค้าคงคลังในร้านค้า พร้อมกับ UI ที่มีธีมไซเบอร์พังค์ที่ทันสมัยและน่าสนใจ

### ✨ คุณสมบัติหลัก

- 📱 **Cross-Platform**: รองรับทั้ง iOS, Android และ Web
- 🎨 **Cyberpunk UI**: ธีมไซเบอร์พังค์ที่สวยงามและทันสมัย
- 🔍 **ค้นหาแบบเรียลไทม์**: ค้นหาสินค้าได้ทันที
- 🏷️ **กรองตามหมวดหมู่**: จัดกลุ่มสินค้าตามประเภท
- 📊 **สถิติสินค้าคงคลัง**: แสดงข้อมูลสถิติแบบเรียลไทม์
- 🔄 **Refresh ข้อมูล**: อัพเดทข้อมูลสินค้าได้ทันที
- 📍 **ตำแหน่งสินค้า**: แสดงตำแหน่งสินค้าในคลัง
- 🏪 **สถานะร้านค้า**: ตรวจสอบความพร้อมของสินค้าในแต่ละสาขา

## 🖼️ ภาพตัวอย่างระบบ

### หน้าหลักระบบสินค้าคงคลัง
![Inventory Overview](./assets/screenshots/inventory-overview.png)

*แสดงรายการสินค้าทั้งหมดพร้อมสถิติการจัดการสินค้าคงคลัง*

### การจัดการสินค้าแบบ Card View
![Product Cards](./assets/screenshots/product-cards-1.png)

*การแสดงสินค้าในรูปแบบ Card พร้อมรายละเอียดครบถ้วน*

![Product Cards 2](./assets/screenshots/product-cards-2.png)

*ตัวอย่างสินค้าประเภทต่างๆ พร้อมสถานะสต็อก*

![Product Cards 3](./assets/screenshots/product-cards-3.png)

*สินค้าที่มีสถานะพิเศษ เช่น สินค้าที่หมด หรือสินค้าใหม่*

## 🏗️ สถาปัตยกรรมระบบ

```
myapp/
├── 📱 Frontend (React Native + Expo)
│   ├── src/
│   │   ├── components/     # คอมโพเนนต์ UI
│   │   ├── hooks/         # Custom Hooks
│   │   ├── services/      # API Services
│   │   ├── styles/        # Styling
│   │   ├── types/         # TypeScript Types
│   │   └── constants/     # ค่าคงที่
│   └── App.tsx           # Main App Component
└── 🔧 Backend (Node.js + Express)
    └── server.js         # API Server
```

## 🔧 Backend API

### 📊 Express.js Server

Backend ของระบบพัฒนาด้วย **Node.js** และ **Express.js** ทำหน้าที่เป็น API Gateway

#### 🚀 คุณสมบัติ Backend:

```javascript
// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3006;

app.use(cors()); // เปิดการเข้าถึงข้าม Origin

// API Endpoint สำหรับดึงข้อมูลสินค้า
app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get('http://nindam.sytes.net/std6630202015/Inventory/info.json');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});
```

#### 🌐 API Endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | ดึงข้อมูลสินค้าทั้งหมด |

#### 📦 Dependencies:

```json
{
  "express": "^5.1.0",    // Web Framework
  "axios": "^1.11.0",     // HTTP Client
  "cors": "^2.8.5"        // Cross-Origin Resource Sharing
}
```

#### 🔄 Data Flow:

1. **Frontend** ส่ง Request ไปยัง Backend API
2. **Backend** ดึงข้อมูลจาก External JSON API
3. **Backend** ประมวลผลและส่งข้อมูลกลับไปยัง Frontend
4. **Frontend** แสดงข้อมูลในรูปแบบ UI ที่สวยงาม

## 📱 Frontend (React Native)

### 🎨 UI Components

#### 🏠 หลักการออกแบบ:

- **CyberPunk Theme**: ใช้สีฟ้าอิเล็กทรอนิก, สีม่วง, และการเรืองแสง
- **Card-based Layout**: แสดงสินค้าในรูปแบบ Card
- **Responsive Design**: ปรับตัวตามขนาดหน้าจอ

#### 🧩 Component Structure:

```typescript
// Main Components
├── CyberPunkBackground    // พื้นหลังแบบไซเบอร์พังค์
├── InventoryHeader       // หัวข้อและสถิติ
├── SearchBar            // ช่องค้นหา
├── CategoryFilter       // กรองหมวดหมู่
├── ProductCard          // การ์ดสินค้า
├── EmptyInventoryState  // สถานะเมื่อไม่มีสินค้า
├── LoadingScreen        // หน้าจอ Loading
└── ErrorScreen          // หน้าจอ Error
```

### 📊 Data Management

#### 🔗 Custom Hook - useInventoryData:

```typescript
interface InventoryData {
  products: Product[];
  categories: string[];
  selectedCategory: string;
  searchQuery: string;
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  lastUpdated: Date | null;
}
```

#### 🏷️ Product Data Structure:

```typescript
interface Product {
  id: number;
  name: string;           // ชื่อสินค้า
  category: string;       // หมวดหมู่
  price: number;          // ราคา
  unit: string;           // หน่วย
  image: string;          // รูปภาพ
  stock: number;          // จำนวนสต็อก
  location: string;       // ตำแหน่งในคลัง
  status: string;         // สถานะสินค้า
  brand: string;          // แบรนด์
  productCode: string;    // รหัสสินค้า
  storeAvailability: StoreAvailability[];
}
```

## 🚀 การติดตั้งและรันโปรเจค

### 📋 ข้อกำหนดระบบ:

- **Node.js** >= 18.x
- **npm** หรือ **yarn**
- **Expo CLI**
- **Android Studio** (สำหรับ Android)
- **Xcode** (สำหรับ iOS - เฉพาะ macOS)

### 🔧 การติดตั้ง:

1. **Clone โปรเจค:**
```bash
git clone <repository-url>
cd ReactNative-Inventory/myapp
```

2. **ติดตั้ง Dependencies:**
```bash
# Frontend
npm install

# Backend
cd backend
npm install
```

3. **รัน Backend Server:**
```bash
cd backend
npm start
# Server จะรันที่ http://localhost:3006
```

4. **รัน Frontend:**
```bash
# กลับไปที่ root directory
cd ..
npm start
# เลือกแพลตฟอร์มที่ต้องการ (iOS/Android/Web)
```

### 📱 การรันบนแพลตฟอร์มต่างๆ:

```bash
# Android
npm run android

# iOS (เฉพาะ macOS)
npm run ios

# Web
npm run web
```

## 🎯 คุณสมบัติเด่น

### 🔍 ระบบค้นหาแบบอัจฉริยะ
- ค้นหาตามชื่อสินค้า, รหัสสินค้า, หรือแบรนด์
- การกรองแบบเรียลไทม์
- รองรับการค้นหาภาษาไทย

### 📊 สถิติและการวิเคราะห์
- จำนวนสินค้าทั้งหมด
- สินค้าที่มีสต็อกอยู่
- สินค้าที่หมดสต็อก
- มูลค่ารวมของสินค้าคงคลัง

### 🎨 UI/UX ที่โดดเด่น
- ธีมไซเบอร์พังค์ที่มีเอกลักษณ์
- Animations และ Transitions ที่ลื่นไหล
- การออกแบบที่ตอบสนองต่อการใช้งาน

### 🔄 การจัดการข้อมูล
- Refresh ข้อมูลแบบ Pull-to-refresh
- การจัดการ Error และ Loading States
- Caching ข้อมูลเพื่อประสิทธิภาพ

## 🔮 แผนการพัฒนาต่อไป

- [ ] 🔐 ระบบ Authentication
- [ ] 📝 การเพิ่ม/แก้ไข/ลบสินค้า
- [ ] 📊 Dashboard ขั้นสูง
- [ ] 🔔 ระบบแจ้งเตือนสต็อกน้อย
- [ ] 📱 Push Notifications
- [ ] 🌐 Multi-language Support
- [ ] 📈 รายงานการขาย
- [ ] 🏪 จัดการหลายสาขา

## 🤝 การมีส่วนร่วม

1. Fork โปรเจค
2. สร้าง Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add some AmazingFeature'`)
4. Push ไปยัง Branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request

## 📄 License

โปรเจคนี้อยู่ภายใต้ MIT License

## 👨‍💻 ผู้พัฒนา

- **Frontend**: React Native + TypeScript
- **Backend**: Node.js + Express.js
- **Design**: Cyberpunk Theme UI/UX

---

🌟 **ระบบจัดการสินค้าไซเบอร์** - จัดการสินค้าคงคลังอย่างมีสไตล์ในยุคดิจิทัล 🌟
