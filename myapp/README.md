# 🏪 ระบบจัดการสินค้าไซเบอร์ (Cyberpunk Inventory Management System)

![Inventory System](./assets/screenshots/inventory-main.png)

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Expo](https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

## 📋 คำอธิบายโครงการ

ระบบจัดการสินค้าไซเบอร์เป็นแอปพลิเคชัน React Native ที่ออกแบบมาเพื่อจัดการสินค้าคงคลังในร้านค้า พร้อมด้วย:
- 🔐 **ระบบ Authentication** - เข้าสู่ระบบด้วย JWT Token
- 🎨 **Cyberpunk UI Design** - ธีมไซเบอร์พังค์ที่ทันสมัยและน่าสนใจ
- 🗄️ **MySQL Database** - จัดเก็บข้อมูลแบบ Relational Database
- 🌐 **RESTful API** - Backend API ที่ Complete และ Scalable

### ✨ คุณสมบัติหลัก

- 📱 **Cross-Platform**: รองรับทั้ง iOS, Android และ Web
- 🔐 **Authentication System**: ระบบเข้าสู่ระบบและสมัครสมาชิก
- 🎨 **Cyberpunk UI**: ธีมไซเบอร์พังค์ที่สวยงามและทันสมัย
- 🔍 **ค้นหาแบบเรียลไทม์**: ค้นหาสินค้าได้ทันที
- 🏷️ **กรองตามหมวดหมู่**: จัดกลุ่มสินค้าตามประเภท
- 📊 **สถิติสินค้าคงคลัง**: แสดงข้อมูลสถิติแบบเรียลไทม์
- 🔄 **Refresh ข้อมูล**: อัพเดทข้อมูลสินค้าได้ทันที
- 📝 **CRUD Operations**: เพิ่ม แก้ไข ลบสินค้าได้
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
├── 📱 Frontend (React Native + Expo + TypeScript)
│   ├── src/
│   │   ├── components/     # คอมโพเนนต์ UI
│   │   ├── hooks/         # Custom Hooks
│   │   ├── services/      # API Services & Authentication
│   │   ├── styles/        # Styling & Themes
│   │   ├── types/         # TypeScript Type Definitions
│   │   └── constants/     # ค่าคงที่และ Theme
│   ├── App.tsx           # Main App Component
│   ├── MainApp.tsx       # App Wrapper with Auth Context
│   └── assets/           # รูปภาพและ Icons
├── 🔧 Backend (Node.js + Express.js + MySQL)
│   ├── server.js         # API Server หลัก
│   ├── .env             # Environment Variables
│   └── package.json     # Backend Dependencies
├── 📱 Platform Specific
│   ├── android/         # Android Native Code
│   ├── ios/            # iOS Native Code
│   └── web/            # Web Build Output
└── 📚 Documentation
    ├── README.md       # คู่มือการใช้งาน
    └── note.md         # บันทึกการพัฒนา
```

## 🔑 ระบบ Authentication

### 🔐 คุณสมบัติการรักษาความปลอดภัย:

- **JWT Token Authentication**: ระบบการยืนยันตัวตนแบบ Stateless
- **bcrypt Password Hashing**: เข้ารหัสรหัสผ่านด้วย bcrypt
- **Secure Token Storage**: เก็บ Token ใน AsyncStorage อย่างปลอดภัย
- **Auto Token Refresh**: ระบบต่ออายุ Token อัตโนมัติ
- **Role-based Access**: ระบบสิทธิ์การเข้าถึงตามบทบาท

### 👥 บัญชี Mock ที่พร้อมใช้งาน:

| บทบาท | Username | Password | สิทธิ์การเข้าถึง |
|--------|----------|----------|----------------|
| **Admin** | `admin` | `123456` | เข้าถึงได้ทุกฟังก์ชัน |
| **User** | `user` | `123456` | ดูและค้นหาสินค้า |
| **Test** | `test` | `test123` | ทดสอบระบบ |

## 🔧 Backend API

### �️ MySQL Database Server

Backend ของระบบพัฒนาด้วย **Node.js**, **Express.js** และ **MySQL** ทำหน้าที่เป็น Full-Stack API Server

#### 🚀 คุณสมบัติ Backend:

```javascript
// server.js - Main API Configuration
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: '+07:00',
});
```

#### 🌐 API Endpoints:

| Method | Endpoint | Description | Authorization |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/login` | เข้าสู่ระบบ | Public |
| `POST` | `/api/auth/register` | สมัครสมาชิก | Public |
| `GET` | `/api/products` | ดึงข้อมูลสินค้าทั้งหมด | Required |
| `POST` | `/api/products` | เพิ่มสินค้าใหม่ | Admin Only |
| `PUT` | `/api/products/:id` | แก้ไขข้อมูลสินค้า | Admin Only |
| `DELETE` | `/api/products/:id` | ลบสินค้า | Admin Only |
| `GET` | `/api/categories` | ดึงหมวดหมู่สินค้า | Required |
| `GET` | `/api/dashboard/stats` | สถิติสินค้าคงคลัง | Required |

#### 📦 Dependencies:

```json
{
  "express": "^5.1.0",        // Web Framework
  "mysql2": "^3.14.3",       // MySQL Database Driver
  "cors": "^2.8.5",          // Cross-Origin Resource Sharing
  "bcrypt": "^6.0.0",        // Password Hashing
  "jsonwebtoken": "^9.0.2",  // JWT Token Management
  "dotenv": "^17.2.1",       // Environment Variables
  "axios": "^1.11.0"         // HTTP Client
}
}
```

#### 🔄 Data Flow:

1. **Client Authentication** → ส่ง Login Request พร้อม Credentials
2. **JWT Token Generation** → Server สร้าง JWT Token หลังจากยืนยันตัวตน
3. **Secure API Access** → Client ใช้ Token เพื่อเข้าถึง Protected APIs
4. **Database Operations** → Server ทำ CRUD Operations กับ MySQL Database
5. **Real-time Updates** → Frontend ได้รับข้อมูลใหม่และ Refresh UI

#### 🔐 Environment Variables (.env):

```bash
# Database Configuration
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=inventory_db
DB_PORT=3306

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here

# Server Configuration
PORT=3006
NODE_ENV=development
```

## 📱 Frontend (React Native)

### 🎨 UI Components

#### 🏠 หลักการออกแบบ:

- **CyberPunk Theme**: ใช้สีฟ้าอิเล็กทรอนิก, สีม่วง, และการเรืองแสง
- **Card-based Layout**: แสดงสินค้าในรูปแบบ Card
- **Responsive Design**: ปรับตัวตามขนาดหน้าจอ

#### 🧩 Component Structure:

```typescript
// Authentication Components
├── AuthScreen              // หน้าจอเลือก Login/Register
├── LoginScreen            // หน้าจอเข้าสู่ระบบ
├── RegisterScreen         // หน้าจอสมัครสมาชิก

// Main App Components  
├── InventoryManagementApp // Component หลักของแอป
├── CyberPunkBackground    // พื้นหลังแบบไซเบอร์พังค์
├── InventoryHeader       // หัวข้อและสถิติ
├── SearchBar            // ช่องค้นหา
├── CategoryFilter       // กรองหมวดหมู่
├── ProductCard          // การ์ดสินค้า
├── ProductForm          // ฟอร์มเพิ่ม/แก้ไขสินค้า

// State & Utility Components
├── EmptyInventoryState  // สถานะเมื่อไม่มีสินค้า
├── LoadingScreen        // หน้าจอ Loading
├── ErrorScreen          // หน้าจอ Error
├── ActionButton         // ปุ่มดำเนินการ
└── Icons                // ไอคอน UI
```

### 📊 Data Management

#### 🔗 Custom Hook - useAuth:
```typescript
interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
}
```

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
  // CRUD Operations
  addProduct: (product: ProductInput) => Promise<void>;
  updateProduct: (id: number, product: ProductInput) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  refreshData: () => Promise<void>;
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
- **Expo CLI** (`npm install -g @expo/cli`)
- **MySQL Server** >= 8.0
- **Android Studio** (สำหรับ Android)
- **Xcode** (สำหรับ iOS - เฉพาะ macOS)

### 🗄️ การติดตั้ง MySQL Database:

1. **ติดตั้ง MySQL Server:**
```bash
# macOS (ใช้ Homebrew)
brew install mysql
brew services start mysql

# Ubuntu/Debian
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql

# Windows
# ดาวน์โหลดจาก https://dev.mysql.com/downloads/mysql/
```

2. **สร้าง Database และ Tables:**
```sql
-- สร้าง Database
CREATE DATABASE inventory_db;
USE inventory_db;

-- สร้างตาราง users
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- สร้างตาราง products
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  image TEXT,
  stock INT DEFAULT 0,
  location VARCHAR(100),
  status VARCHAR(50) DEFAULT 'in_stock',
  brand VARCHAR(100),
  productCode VARCHAR(50) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- เพิ่มข้อมูล Mock Users
INSERT INTO users (username, email, password, role) VALUES
('admin', 'admin@inventory.com', '$2b$10$hashedpassword123456', 'admin'),
('user', 'user@inventory.com', '$2b$10$hashedpassword123456', 'user'),
('test', 'test@inventory.com', '$2b$10$hashedpasswordtest123', 'user');
```

### 🔧 การติดตั้ง:

1. **Clone โปรเจค:**
```bash
git clone https://github.com/Kritchanaxt/ReactNative-Inventory.git
cd ReactNative-Inventory/myapp
```

2. **ติดตั้ง Dependencies:**
```bash
# Frontend Dependencies
npm install

# Backend Dependencies
cd backend
npm install
cd ..
```

3. **ตั้งค่า Environment Variables:**
```bash
# สร้างไฟล์ .env ในโฟลเดอร์ backend/
cd backend
cp .env.example .env

# แก้ไขไฟล์ .env ตามการตั้งค่า MySQL ของคุณ
nano .env
```

4. **รัน Backend Server:**
```bash
cd backend
npm start
# หรือ node server.js
# Server จะรันที่ http://localhost:3006
```

5. **รัน Frontend (เปิด Terminal ใหม่):**
```bash
# กลับไปที่ root directory
cd ..
npm start
# เลือกแพลตฟอร์มที่ต้องการ (iOS/Android/Web)
```

### 📱 การรันบนแพลตฟอร์มต่างๆ:

```bash
# Android (ต้องเปิด Android Emulator หรือเชื่อมต่อ Android Device)
npm run android

# iOS (เฉพาะ macOS - ต้องเปิด iOS Simulator)
npm run ios

# Web Browser
npm run web

# Development Build
npx expo run:android --variant debug
npx expo run:ios --configuration Debug
```

### 🔧 การ Debug และ Development:

```bash
# ดู Logs แบบ Real-time
npx expo start --tunnel

# Reset Cache หากมีปัญหา
npx expo start --clear

# Bundle Analysis
npx expo export --dump-sourcemap

# TypeScript Type Checking
npx tsc --noEmit
```

## 🧪 การทดสอบระบบ

### 🔐 ทดสอบ Authentication:

1. **เปิดแอป** → หน้าจอ Login จะปรากฏขึ้น
2. **ใช้บัญชี Mock** → ใส่ username: `admin`, password: `123456`
3. **ตรวจสอบ Token** → ระบบจะสร้าง JWT Token และเก็บใน AsyncStorage
4. **ทดสอบ Auto Login** → ปิดแอปแล้วเปิดใหม่ ควรเข้าสู่ระบบอัตโนมัติ

### 📊 ทดสอบ Inventory Features:

- ✅ **ดูรายการสินค้า** → แสดงสินค้าทั้งหมดจาก Database
- ✅ **ค้นหาสินค้า** → พิมพ์ชื่อสินค้าใน Search Bar
- ✅ **กรองหมวดหมู่** → เลือกหมวดหมู่จาก CategoryFilter
- ✅ **เพิ่มสินค้าใหม่** → กดปุ่ม + (Admin เท่านั้น)
- ✅ **แก้ไขสินค้า** → กดที่สินค้าและเลือก Edit (Admin เท่านั้น)
- ✅ **ลบสินค้า** → Swipe หรือกดปุ่ม Delete (Admin เท่านั้น)
- ✅ **Pull to Refresh** → ดึงหน้าจอลงเพื่อ Refresh ข้อมูล

## 🎯 คุณสมบัติเด่น

### � ระบบรักษาความปลอดภัยขั้นสูง
- **JWT Authentication** → ระบบยืนยันตัวตนแบบ Stateless
- **bcrypt Hashing** → เข้ารหัสรหัสผ่านด้วยอัลกอริทึมที่ปลอดภัย
- **Role-based Access Control** → จำกัดสิทธิ์การเข้าถึงตามบทบาท
- **Auto Token Refresh** → ต่ออายุ Token อัตโนมัติ
- **Secure Storage** → เก็บข้อมูลสำคัญใน Encrypted Storage

### �🔍 ระบบค้นหาแบบอัจฉริยะ
- ค้นหาตามชื่อสินค้า, รหัสสินค้า, หรือแบรนด์
- การกรองแบบเรียลไทม์ (Real-time Filtering)
- รองรับการค้นหาภาษาไทยและอังกฤษ
- Search History และ Auto-suggestion
- Advanced Filter Options

### 📊 สถิติและการวิเคราะห์แบบเรียลไทม์
- จำนวนสินค้าทั้งหมดในระบบ
- สินค้าที่มีสต็อกอยู่ (In Stock)
- สินค้าที่หมดสต็อก (Out of Stock)
- มูลค่ารวมของสินค้าคงคลัง (Total Inventory Value)
- สถิติการขายรายวัน/รายเดือน
- Top Selling Products
- Low Stock Alerts

### 🎨 UI/UX ที่โดดเด่น
- **Cyberpunk Design Language** → ธีมไซเบอร์พังค์ที่มีเอกลักษณ์
- **Smooth Animations** → Transitions และ Micro-interactions ที่ลื่นไหล
- **Responsive Design** → ปรับตัวได้กับทุกขนาดหน้าจอ
- **Dark Mode Optimized** → ออกแบบเพื่อการใช้งานในที่มืด
- **Accessible UI** → รองรับผู้ใช้ที่มีความต้องการพิเศษ
- **Gesture Support** → รองรับการ Swipe, Pinch, และ Gesture อื่นๆ

### 🔄 การจัดการข้อมูลขั้นสูง
- **Pull-to-refresh** → ดึงหน้าจอลงเพื่อ Refresh ข้อมูล
- **Infinite Scrolling** → โหลดข้อมูลเพิ่มเติมเมื่อ Scroll ถึงท้าย
- **Offline Support** → ทำงานได้แม้ไม่มีอินเทอร์เน็ต (Partial)
- **Error Handling** → จัดการ Error และแสดง Fallback UI
- **Loading States** → แสดงสถานะการโหลดข้อมูลอย่างชัดเจา
- **Data Caching** → เก็บ Cache เพื่อประสิทธิภาพที่ดีขึ้น
- **Real-time Updates** → อัพเดทข้อมูลแบบเรียลไทม์

### 📱 Cross-Platform Excellence
- **React Native** → รันได้บนทั้ง iOS และ Android ด้วย Codebase เดียว
- **Expo Managed Workflow** → พัฒนาและ Deploy ได้ง่าย
- **Web Support** → รันบน Web Browser ได้
- **Native Performance** → ประสิทธิภาพใกล้เคียง Native Apps
- **Platform-specific UI** → ปรับ UI ให้เหมาะกับแต่ละแพลตฟอร์ม

## 🔮 แผนการพัฒนาต่อไป (Roadmap)

### 🎯 Phase 1: Core Features Enhancement
- [x] ✅ ระบบ Authentication (JWT Token)
- [x] ✅ ระบบ CRUD Products 
- [x] ✅ MySQL Database Integration
- [x] ✅ Search & Filter Functions
- [x] ✅ Cyberpunk UI Design

### 🚀 Phase 2: Advanced Features (Q1 2025)
- [ ] 🔔 **ระบบแจ้งเตือนสต็อกน้อย** (Low Stock Alerts)
- [ ] � **Dashboard ขั้นสูง** (Advanced Analytics Dashboard)
- [ ] �📱 **Push Notifications** (Firebase Cloud Messaging)
- [ ] 🌐 **Multi-language Support** (Thai/English/Chinese)
- [ ] 📈 **รายงานการขาย** (Sales Reports & Analytics)
- [ ] 🏪 **จัดการหลายสาขา** (Multi-store Management)
- [ ] 📷 **Barcode Scanner** (Product Scanning)
- [ ] 🔄 **Offline Mode** (Complete Offline Support)

### 💡 Phase 3: Business Intelligence (Q2 2025)
- [ ] 🤖 **AI-powered Demand Forecasting** (การพยากรณ์ความต้องการ)
- [ ] 📊 **Advanced Analytics** (Business Intelligence Dashboard)
- [ ] 🔗 **ERP Integration** (SAP, Oracle Integration)
- [ ] 📦 **Supply Chain Management** (การจัดการห่วงโซ่อุปทาน)
- [ ] 💰 **Financial Reports** (รายงานทางการเงิน)
- [ ] 📈 **Performance Metrics** (KPI Tracking)

### 🌟 Phase 4: Enterprise Features (Q3 2025)
- [ ] 👥 **Team Collaboration** (การทำงานเป็นทีม)
- [ ] 🔐 **Advanced Security** (2FA, SSO, LDAP)
- [ ] ☁️ **Cloud Deployment** (AWS, Azure, GCP)
- [ ] 🔧 **API Gateway** (GraphQL, REST API v2)
- [ ] 📱 **Mobile Admin Panel** (การจัดการขั้นสูง)
- [ ] 🌍 **Global Scaling** (Multi-region Support)

## 🛠️ การแก้ไขปัญหาที่พบบ่อย (Troubleshooting)

### 🔧 ปัญหา Backend

#### MySQL Connection Error:
```bash
# ตรวจสอบ MySQL Service
# macOS
brew services list | grep mysql
brew services restart mysql

# Ubuntu/Linux
sudo systemctl status mysql
sudo systemctl restart mysql

# Windows
net start mysql
```

#### Port 3006 Already in Use:
```bash
# ค้นหา Process ที่ใช้ Port 3006
lsof -i :3006
kill -9 <PID>

# หรือเปลี่ยน Port ในไฟล์ .env
PORT=3007
```

### 📱 ปัญหา Frontend

#### Expo CLI Issues:
```bash
# อัพเดท Expo CLI
npm install -g @expo/cli@latest

# Clear Expo Cache
npx expo install --fix
npx expo start --clear
```

#### Metro Bundler Error:
```bash
# Reset Metro Cache
npx expo start --clear
npx react-native start --reset-cache

# Clear node_modules และ reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Android Build Issues:
```bash
# Clean Android Build
cd android
./gradlew clean
cd ..

# Reset Android folder
npx expo run:android --clean
```

### 🗄️ ปัญหา Database

#### Table doesn't exist:
```sql
-- ตรวจสอบ Tables ที่มีอยู่
SHOW TABLES;

-- สร้าง Tables ใหม่
SOURCE database/schema.sql;
```

#### Permission Denied:
```sql
-- สร้าง User ใหม่และให้สิทธิ์
CREATE USER 'inventory_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON inventory_db.* TO 'inventory_user'@'localhost';
FLUSH PRIVILEGES;
```

## 📚 เอกสารเพิ่มเติม

### 🔗 Links ที่เป็นประโยชน์:
- 📖 [React Native Documentation](https://reactnative.dev/docs/getting-started)
- 🎯 [Expo Documentation](https://docs.expo.dev/)
- 🗄️ [MySQL Documentation](https://dev.mysql.com/doc/)
- 🔐 [JWT.io](https://jwt.io/) - JWT Token Debugger
- 🎨 [React Native Elements](https://reactnativeelements.com/)

### 🏗️ Architecture Patterns:
- **MVVM Pattern** → Model-View-ViewModel
- **Hooks Pattern** → Custom Hooks for State Management
- **Context API** → Global State Management
- **RESTful API** → Standard REST API Design
- **JWT Authentication** → Stateless Authentication

## 🤝 การมีส่วนร่วม (Contributing)

เรายินดีรับการมีส่วนร่วมจากทุกคน! 🎉

### 🚀 วิธีการมีส่วนร่วม:

1. **Fork โปรเจค**
```bash
git clone https://github.com/Kritchanaxt/ReactNative-Inventory.git
cd ReactNative-Inventory
```

2. **สร้าง Feature Branch**
```bash
git checkout -b feature/amazing-new-feature
```

3. **ทำการพัฒนา**
- เขียนโค้ดที่สะอาดและมี Comments
- ทดสอบการทำงานให้ครบถ้วน
- ปฏิบัติตาม Coding Standards

4. **Commit การเปลี่ยนแปลง**
```bash
git add .
git commit -m "✨ Add amazing new feature"
```

5. **Push ไปยัง Branch**
```bash
git push origin feature/amazing-new-feature
```

6. **เปิด Pull Request**
- อธิบายการเปลี่ยนแปลงอย่างชัดเจน
- แนบ Screenshots หากมีการเปลี่ยนแปลง UI
- อ้างอิง Issue ที่เกี่ยวข้อง

### � Coding Standards:

```typescript
// ✅ Good - ใช้ TypeScript Types
interface Product {
  id: number;
  name: string;
  price: number;
}

// ✅ Good - Descriptive naming
const fetchProductsByCategory = async (categoryId: string) => {
  // Implementation
};

// ✅ Good - Error handling
try {
  const products = await api.getProducts();
  return products;
} catch (error) {
  console.error('Failed to fetch products:', error);
  throw error;
}
```

### 🐛 Bug Reports:

เมื่อพบ Bug กรุณา Report โดยใส่ข้อมูลดังนี้:
- **Description**: อธิบาย Bug ที่พบ
- **Steps to Reproduce**: ขั้นตอนการทำให้เกิด Bug
- **Expected Behavior**: พฤติกรรมที่คาดหวัง
- **Actual Behavior**: พฤติกรรมที่เกิดขึ้นจริง
- **Environment**: OS, Device, App Version
- **Screenshots**: รูปภาพประกอบ (ถ้ามี)

### 💡 Feature Requests:

- อธิบาย Feature ที่ต้องการ
- ระบุเหตุผลที่ Feature นี้มีประโยชน์
- แนะนำวิธีการ Implementation (ถ้ามี)

## 📞 ติดต่อและสนับสนุน

### 👨‍💻 Developer Information:
- **Name**: Kritchanat
- **GitHub**: [@Kritchanaxt](https://github.com/Kritchanaxt)
- **Email**: kritchanat.dev@gmail.com

### 🆘 การขอความช่วยเหลือ:
- 📖 ดู Documentation ใน `/docs` folder
- 🐛 Report Issues ใน GitHub Issues
- 💬 ถาม Questions ใน Discussions
- 📧 ส่งอีเมลสำหรับการสนับสนุนเชิงพาณิชย์

### 🌟 การสนับสนุนโปรเจค:
- ⭐ Star โปรเจคใน GitHub
- 🍴 Fork และแบ่งปันต่อ
- 📢 แนะนำให้เพื่อนๆ
- 💰 Sponsor ผ่าน GitHub Sponsors

## 📄 License

โปรเจคนี้อยู่ภายใต้ **MIT License** - ดูรายละเอียดใน [LICENSE](LICENSE) file

```
MIT License

Copyright (c) 2025 Kritchanat

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 🏆 Credits และ Acknowledgments

### 🙏 ขขอบคุณ Libraries และ Tools:
- **React Native Team** - สำหรับ Framework ที่ยอดเยี่ยม
- **Expo Team** - สำหรับ Development Tools ที่สะดวก
- **MySQL Team** - สำหรับ Database ที่เสถียร
- **TypeScript Team** - สำหรับ Type Safety
- **Community Contributors** - สำหรับการสนับสนุนและ Feedback

### 🎨 Design Inspiration:
- **Cyberpunk 2077** - สำหรับแรงบันดาลใจในการออกแบบ
- **Material Design** - สำหรับ UX Principles
- **Apple Human Interface Guidelines** - สำหรับ iOS Design

---

<div align="center">

### 🌟 **ระบบจัดการสินค้าไซเบอร์** 🌟
#### จัดการสินค้าคงคลังอย่างมีสไตล์ในยุคดิจิทัล

![Made with ❤️ in Thailand](https://img.shields.io/badge/Made%20with%20❤️%20in-Thailand-red?style=for-the-badge)

**⚡ Ready for the Digital Future ⚡**

[⭐ Star us on GitHub](https://github.com/Kritchanaxt/ReactNative-Inventory) • [🐛 Report Bug](https://github.com/Kritchanaxt/ReactNative-Inventory/issues) • [💡 Request Feature](https://github.com/Kritchanaxt/ReactNative-Inventory/issues)

</div>
