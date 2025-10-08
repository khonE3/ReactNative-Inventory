-- ==========================================
-- SQL Export: Inventory Database
-- Generated: 2025-10-08 13:14:19
-- Student ID: std6630202015
-- Total Products: 18
-- ==========================================

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS `inventory_std6630202252`;
USE `inventory_std6630202252`;

-- Drop table if exists
DROP TABLE IF EXISTS `products`;

-- Create products table
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `unit` varchar(50) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
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
(25, 'GotJiTAG', 'เครื่องดื่ม', 1500, 'ชิ้น', 'https://scontent.futp2-1.fna.fbcdn.net/v/t1.6435-9/155427539_1207203093053611_2360214402819867480_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=dS6SqM-fb7MQ7kNvwE-AODw&_nc_oc=AdkBMxoYybeX8i44SSx6tV4qHtiQxJ6FjdEu-Tr2iebKMDuOMHhpisxrLxO351FIZ1WxxJDdssl4s1MWnquieAoo&_nc_zt=23&_nc_ht=scontent.futp2-1.fna&_nc_gid=hyVcW4DY-bzXzqkZlujUAA&oh=00_AffheBCUei4vXGtcTnHlFpoeKZNiHeqMlzDzNvHBpEm8JA&oe=690DD9BB', 1, 'UDON', 'inactive', 'E3', 'S', 'E3-v1', 'E3Got', '2025-10-07T17:00:00.000Z'),
(18, 'GotE3', 'เครื่องดื่ม', 100, 'ชิ้น', 'https://scontent.futp2-1.fna.fbcdn.net/v/t1.6435-9/131528329_1153838085056779_2077599428430755237_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEu1N3FKdCLnWjtNw5xCj0AhvLssl6aS_eG8uyyXppL9-Wl0kVszFmT6TtHi9TFb9Q6HAw7jy1fRKCuN11BZksl&_nc_ohc=zfyWIWpW7g8Q7kNvwGNXx3p&_nc_oc=AdkcU3IIn-_Yg_1jSCN1qvuAnRJu0n5BUppICd24IVXZfwI1nMgWBsc5gMdg6iFgeeUjjEm8wvMS26s47H2USqAJ&_nc_zt=23&_nc_ht=scontent.futp2-1.fna&_nc_gid=Dc_sTZKlA5EVFyqKtcg9kg&oh=00_AfZy0aQ5KEFJdmlbvLnMz0PBeHa5GFyHXevUT8XYpZ-ixg&oe=68F35CA5', 1, 'E301', 'discontinued', 'Gotjitag', 'M', 'E301', 'E3 Got', '2025-10-07T17:00:00.000Z'),
(15, 'น้ำส้มแฟนต้า', 'เครื่องดื่ม', 12, 'ขวด', 'http://nindam.sytes.net/std6630202015/Inventory/image-inventory/น้ำส้มแฟนต้า.jpg', 5, 'ชั้น A3', 'active', 'แฟนต้า', '325ml', 'FT015', 'น้ำส้มแฟนต้า', '2025-10-07T17:00:00.000Z'),
(7, 'ผงซักฟอก', 'ของใช้ในบ้าน', 35, 'ถุง', 'http://nindam.sytes.net/std6630202015/Inventory/image-inventory/ผงซักฟอก.webp', 100, 'ชั้น E1', 'Active', 'ผงซักฟอก', '1kg', 'DT007', 'ผงซักฟอก', '2025-10-07T17:00:00.000Z'),
(14, 'ขนมถั่วตัด', 'ขนม', 10, 'ชิ้น', 'http://nindam.sytes.net/std6630202015/Inventory/image-inventory/ขนมถั่วตัด.jpg', 5, 'ชั้น I1', 'Active', 'ขนมถั่วตัด', '50g', 'SN014', 'ขนมถั่วตัด', '2025-10-07T17:00:00.000Z'),
(13, 'ขนมปังฟาร์มเฮ้าส์', 'เบเกอรี่', 25, 'ห่อ', 'http://nindam.sytes.net/std6630202015/Inventory/image-inventory/ขนมปังฟาร์มเฮ้าส์.webp', 80, 'ชั้น H1', 'Active', 'ฟาร์มเฮ้าส์', '350g', 'BR013', 'ขนมปังฟาร์มเฮ้าส์', '2025-10-07T17:00:00.000Z'),
(5, 'น้ำปลาแท้', 'เครื่องปรุง', 18, 'ขวด', 'http://nindam.sytes.net/std6630202015/Inventory/image-inventory/น้ำปลาแท้.avif', 20, 'ชั้น C1', 'Active', 'น้ำปลาแท้', '300ml', 'FS005', 'น้ำปลาแท้', '2025-08-26T17:00:00.000Z'),
(1, 'น้ำดื่มคริสตัล 600ml', 'เครื่องดื่ม', 7, 'ขวด', 'http://nindam.sytes.net/std6630202015/Inventory/image-inventory/คริสตัล.webp', 50, 'ชั้น E3', 'Active', 'คริสตัล', '600ml', 'CR001', 'น้ำดื่มคริสตัล', '2025-08-26T17:00:00.000Z'),
(10, 'แชมพูซันซิล', 'ของใช้ส่วนตัว', 55, 'ขวด', 'http://nindam.sytes.net/std6630202015/Inventory/image-inventory/แชมพูซันซิล%20.webp', 25, 'ชั้น F3', 'Active', 'ซันซิล', '400ml', 'SH010', 'แชมพูซันซิล', '2025-07-31T17:00:00.000Z'),
(16, 'ข้าวหอมมะลิ', 'ของแห้ง', 120, 'ถุง', 'http://nindam.sytes.net/std6630202015/Inventory/image-inventory/ข้าวหอมมะลิ.jpg', 60, 'ชั้น J1', 'Active', 'ข้าวหอมมะลิ', '5kg', 'RC016', 'ข้าวหอมมะลิ', '2025-07-31T17:00:00.000Z'),
(12, 'ปลากระป๋องสามแม่ครัว', 'อาหารกระป๋อง', 22, 'กระป๋อง', 'http://nindam.sytes.net/std6630202015/Inventory/image-inventory/ปลากระป๋องสามแม่ครัว.webp', 45, 'ชั้น G1', 'Active', 'สามแม่ครัว', '155g', 'CF012', 'ปลากระป๋องสามแม่ครัว', '2025-07-31T17:00:00.000Z'),
(11, 'น้ำมันพืชปาล์ม', 'เครื่องปรุง', 48, 'ขวด', 'http://nindam.sytes.net/std6630202015/Inventory/image-inventory/น้ำมันพืชปาล์ม.webp', 30, 'ชั้น C2', 'Active', 'น้ำมันปาล์ม', '1L', 'OL011', 'น้ำมันพืชปาล์ม', '2025-07-31T17:00:00.000Z'),
(9, 'ยาสีฟันคอลเกต', 'ของใช้ส่วนตัว', 45, 'หลอด', 'http://nindam.sytes.net/std6630202015/Inventory/image-inventory/ยาสีฟันคอลเกต.webp', 35, 'ชั้น F2', 'Active', 'คอลเกต', '150g', 'TP009', 'ยาสีฟันคอลเกต', '2025-07-31T17:00:00.000Z'),
(8, 'สบู่ลักส์', 'ของใช้ส่วนตัว', 20, 'ก้อน', 'http://nindam.sytes.net/std6630202015/Inventory/image-inventory/สบู่ลักส์.jpg', 60, 'ชั้น F1', 'Active', 'ลักส์', '75g', 'SP008', 'สบู่ลักส์', '2025-07-31T17:00:00.000Z'),
(6, 'น้ำตาลทรายขาว', 'ของแห้ง', 28, 'กิโลกรัม', 'http://nindam.sytes.net/std6630202015/Inventory/image-inventory/น้ำตาลทรายขาว.webp', 25, 'ชั้น D1', 'Active', 'น้ำตาลทรายขาว', '1kg', 'SG006', 'น้ำตาลทรายขาว', '2025-07-31T17:00:00.000Z'),
(4, 'ไข่ไก่ เบอร์ 2', 'อาหารสด', 4, 'ฟอง', 'http://nindam.sytes.net/std6630202015/Inventory/image-inventory/ไข่ไก่เบอร์2.jpeg', 200, 'ตู้เย็น A', 'Active', 'ไข่ไก่ธรรมชาติ', 'เบอร์ 2', 'EG004', 'ไข่ไก่เบอร์2', '2025-07-31T17:00:00.000Z'),
(3, 'มาม่าต้มยำกุ้ง', 'บะหมี่กึ่งสำเร็จรูป', 6, 'ซอง', 'http://nindam.sytes.net/std6630202015/Inventory/image-inventory/มาม่าบะหมี่กึ่งสำเร็จรูปรสต้มยำกุ้งน้ำข้น.webp	', 100, 'ชั้น B1', 'Active', 'มาม่า', '55g', 'MM003', 'มาม่าต้มยำกุ้ง', '2025-07-31T17:00:00.000Z'),
(2, 'โค้กกระป๋อง', 'เครื่องดื่ม', 15, 'กระป๋อง', 'http://nindam.sytes.net/std6630202015/Inventory/image-inventory/โค้กน้ำอัดลม.webp', 30, 'ชั้น A2', 'Active', 'Coca-Cola', '325ml', 'CC002', 'โค้กกระป๋อง', '2025-07-31T17:00:00.000Z');

-- ==========================================
-- Database Statistics
-- ==========================================
-- Total products: 18
-- Categories: 10
-- Brands: 18
-- Locations: 18
-- 
-- Category breakdown:
-- เครื่องดื่ม: 5 items
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