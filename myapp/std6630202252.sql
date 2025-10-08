-- ==========================================
-- SQL Export: Inventory Database
-- Generated: 2025-10-08 13:14:19
-- Student ID: std6630202252
-- Total Products: 18
-- Database: it_std6630202252
-- ==========================================

-- ใช้ฐานข้อมูลที่มีอยู่แล้ว
USE `it_std6630202252`;

-- Drop table if exists
DROP TABLE IF EXISTS `products`;

-- Create products table
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `unit` varchar(50) DEFAULT NULL,
  `image` TEXT DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `brand` varchar(100) DEFAULT NULL,
  `sizes` varchar(255) DEFAULT NULL,
  `productCode` varchar(100) DEFAULT NULL,
  `orderName` varchar(255) DEFAULT NULL,
  `lastUpdate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_category` (`category`),
  KEY `idx_brand` (`brand`),
  KEY `idx_productCode` (`productCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert product data
INSERT INTO `products` (
  `id`, `name`, `category`, `price`, `unit`, `image`, 
  `stock`, `location`, `status`, `brand`, `sizes`, 
  `productCode`, `orderName`, `lastUpdate`
) VALUES
(15, 'น้ำส้มแฟนต้า', 'เครื่องดื่ม', 12, 'ขวด', 'http://nindam.sytes.net/std6630202252/Inventory/image-inventory/น้ำส้มแฟนต้า.jpg', 5, 'ชั้น A3', 'active', 'แฟนต้า', '325ml', 'FT015', 'น้ำส้มแฟนต้า', '2025-10-07 17:00:00'),
(7, 'ผงซักฟอก', 'ของใช้ในบ้าน', 35, 'ถุง', 'http://nindam.sytes.net/std6630202252/Inventory/image-inventory/ผงซักฟอก.webp', 100, 'ชั้น E1', 'Active', 'ผงซักฟอก', '1kg', 'DT007', 'ผงซักฟอก', '2025-10-07 17:00:00'),
(14, 'ขนมถั่วตัด', 'ขนม', 10, 'ชิ้น', 'http://nindam.sytes.net/std6630202252/Inventory/image-inventory/ขนมถั่วตัด.jpg', 5, 'ชั้น I1', 'Active', 'ขนมถั่วตัด', '50g', 'SN014', 'ขนมถั่วตัด', '2025-10-07 17:00:00'),
(13, 'ขนมปังฟาร์มเฮ้าส์', 'เบเกอรี่', 25, 'ห่อ', 'http://nindam.sytes.net/std6630202252/Inventory/image-inventory/ขนมปังฟาร์มเฮ้าส์.webp', 80, 'ชั้น H1', 'Active', 'ฟาร์มเฮ้าส์', '350g', 'BR013', 'ขนมปังฟาร์มเฮ้าส์', '2025-10-07 17:00:00'),
(5, 'น้ำปลาแท้', 'เครื่องปรุง', 18, 'ขวด', 'http://nindam.sytes.net/std6630202252/Inventory/image-inventory/น้ำปลาแท้.avif', 20, 'ชั้น C1', 'Active', 'น้ำปลาแท้', '300ml', 'FS005', 'น้ำปลาแท้', '2025-08-26 17:00:00'),
(1, 'น้ำดื่มคริสตัล 600ml', 'เครื่องดื่ม', 7, 'ขวด', 'http://nindam.sytes.net/std6630202252/Inventory/image-inventory/คริสตัล.webp', 50, 'ชั้น E3', 'Active', 'คริสตัล', '600ml', 'CR001', 'น้ำดื่มคริสตัล', '2025-08-26 17:00:00'),
(10, 'แชมพูซันซิล', 'ของใช้ส่วนตัว', 55, 'ขวด', 'http://nindam.sytes.net/std6630202252/Inventory/image-inventory/แชมพูซันซิล%20.webp', 25, 'ชั้น F3', 'Active', 'ซันซิล', '400ml', 'SH010', 'แชมพูซันซิล', '2025-07-31 17:00:00'),
(16, 'ข้าวหอมมะลิ', 'ของแห้ง', 120, 'ถุง', 'http://nindam.sytes.net/std6630202252/Inventory/image-inventory/ข้าวหอมมะลิ.jpg', 60, 'ชั้น J1', 'Active', 'ข้าวหอมมะลิ', '5kg', 'RC016', 'ข้าวหอมมะลิ', '2025-07-31 17:00:00'),
(12, 'ปลากระป๋องสามแม่ครัว', 'อาหารกระป๋อง', 22, 'กระป๋อง', 'http://nindam.sytes.net/std6630202252/Inventory/image-inventory/ปลากระป๋องสามแม่ครัว.webp', 45, 'ชั้น G1', 'Active', 'สามแม่ครัว', '155g', 'CF012', 'ปลากระป๋องสามแม่ครัว', '2025-07-31 17:00:00'),
(11, 'น้ำมันพืชปาล์ม', 'เครื่องปรุง', 48, 'ขวด', 'http://nindam.sytes.net/std6630202252/Inventory/image-inventory/น้ำมันพืชปาล์ม.webp', 30, 'ชั้น C2', 'Active', 'น้ำมันปาล์ม', '1L', 'OL011', 'น้ำมันพืชปาล์ม', '2025-07-31 17:00:00'),
(9, 'ยาสีฟันคอลเกต', 'ของใช้ส่วนตัว', 45, 'หลอด', 'http://nindam.sytes.net/std6630202252/Inventory/image-inventory/ยาสีฟันคอลเกต.webp', 35, 'ชั้น F2', 'Active', 'คอลเกต', '150g', 'TP009', 'ยาสีฟันคอลเกต', '2025-07-31 17:00:00'),
(8, 'สบู่ลักส์', 'ของใช้ส่วนตัว', 20, 'ก้อน', 'http://nindam.sytes.net/std6630202252/Inventory/image-inventory/สบู่ลักส์.jpg', 60, 'ชั้น F1', 'Active', 'ลักส์', '75g', 'SP008', 'สบู่ลักส์', '2025-07-31 17:00:00'),
(6, 'น้ำตาลทรายขาว', 'ของแห้ง', 28, 'กิโลกรัม', 'http://nindam.sytes.net/std6630202252/Inventory/image-inventory/น้ำตาลทรายขาว.webp', 25, 'ชั้น D1', 'Active', 'น้ำตาลทรายขาว', '1kg', 'SG006', 'น้ำตาลทรายขาว', '2025-07-31 17:00:00'),
(4, 'ไข่ไก่ เบอร์ 2', 'อาหารสด', 4, 'ฟอง', 'http://nindam.sytes.net/std6630202252/Inventory/image-inventory/ไข่ไก่เบอร์2.jpeg', 200, 'ตู้เย็น A', 'Active', 'ไข่ไก่ธรรมชาติ', 'เบอร์ 2', 'EG004', 'ไข่ไก่เบอร์2', '2025-07-31 17:00:00'),
(3, 'มาม่าต้มยำกุ้ง', 'บะหมี่กึ่งสำเร็จรูป', 6, 'ซอง', 'http://nindam.sytes.net/std6630202252/Inventory/image-inventory/มาม่าบะหมี่กึ่งสำเร็จรูปรสต้มยำกุ้งน้ำข้น.webp', 100, 'ชั้น B1', 'Active', 'มาม่า', '55g', 'MM003', 'มาม่าต้มยำกุ้ง', '2025-07-31 17:00:00'),
(2, 'โค้กกระป๋อง', 'เครื่องดื่ม', 15, 'กระป๋อง', 'http://nindam.sytes.net/std6630202252/Inventory/image-inventory/โค้กน้ำอัดลม.webp', 30, 'ชั้น A2', 'Active', 'Coca-Cola', '325ml', 'CC002', 'โค้กกระป๋อง', '2025-07-31 17:00:00');

-- ==========================================
-- Database Statistics
-- ==========================================
-- Total products: 16
-- Categories: 10
-- Brands: 16
-- Locations: 16
-- 
-- Category breakdown:
-- เครื่องดื่ม: 3 items
-- ของใช้ในบ้าน: 1 items
-- ขนม: 1 items
-- เบเกอรี่: 1 items
-- เครื่องปรุง: 2 items
-- ของใช้ส่วนตัว: 3 items
-- ของแห้ง: 2 items
-- อาหารกระป๋อง: 1 items
-- อาหารสด: 1 items
-- บะหมี่กึ่งสำเร็จรูป: 1 items
-- ==========================================
-- End of SQL Export
-- ==========================================