# 🚀 วิธี Deploy Backend ไปยัง nindam.sytes.net

## ขั้นตอนที่ 1: เตรียมไฟล์

### ไฟล์ที่ต้องอัพโหลด:
1. ✅ `server.js`
2. ✅ `package.json`
3. ✅ `.env.production` (เปลี่ยนชื่อเป็น `.env` บน server)

### ❌ ไฟล์ที่ไม่ต้องอัพโหลด:
- `node_modules/` (ติดตั้งใหม่บน server)
- `.env.local`
- `.git/`

---

## ขั้นตอนที่ 2: อัพโหลดผ่าน FileZilla

### 1. เชื่อมต่อ FTP:
- Host: `119.59.102.61`
- Username: `std6630202252`
- Password: `Pq7@j9Bz`

### 2. สร้างโฟลเดอร์:
```
/var/www/html/std6630202252/backend/
```

### 3. อัพโหลดไฟล์:
- ลาก `server.js` → Remote site
- ลาก `package.json` → Remote site
- ลาก `.env.production` → Remote site → เปลี่ยนชื่อเป็น `.env`

---

## ขั้นตอนที่ 3: SSH เข้า Server

```bash
ssh std6630202252@nindam.sytes.net
# กรอก password: Pq7@j9Bz
```

---

## ขั้นตอนที่ 4: ติดตั้ง Dependencies

```bash
# ไปที่โฟลเดอร์ backend
cd /var/www/html/std6630202252/backend
# หรือ
cd ~/www/html/std6630202252/backend

# ติดตั้ง dependencies
npm install

# ตรวจสอบไฟล์
ls -la
```

**ควรเห็นไฟล์:**
```
server.js
package.json
.env
node_modules/
```

---

## ขั้นตอนที่ 5: ทดสอบรัน

```bash
# ทดสอบรันแบบปกติ
node server.js
```

**ถ้าสำเร็จจะเห็น:**
```
🚀 API running on port 3018
✅ Connected to MySQL: it_std6630202252
```

**ทดสอบจากเบราว์เซอร์:**
```
http://nindam.sytes.net:3018/api/ping
```

**กด Ctrl+C เพื่อหยุด**

---

## ขั้นตอนที่ 6: รันด้วย PM2 (Background)

```bash
# ติดตั้ง PM2 (ครั้งแรกเท่านั้น)
npm install -g pm2

# รัน Backend
pm2 start server.js --name "inventory-api"

# บันทึก
pm2 save

# ตั้งให้รันอัตโนมัติเมื่อ server รีบูต
pm2 startup
# คัดลอกคำสั่งที่แสดงแล้วรัน

# ตรวจสอบสถานะ
pm2 status
```

---

## ขั้นตอนที่ 7: เปิด Port 3018 (ถ้าจำเป็น)

```bash
# ตรวจสอบ firewall
sudo ufw status

# เปิด port 3018
sudo ufw allow 3018/tcp

# หรือ
sudo iptables -A INPUT -p tcp --dport 3018 -j ACCEPT
```

---

## ขั้นตอนที่ 8: ทดสอบ API

### ทดสอบ Health Check:
```
http://nindam.sytes.net:3018/api/ping
```

**ควรได้:**
```json
{"ok":true,"service":"myapi","time":"...","db":"up"}
```

### ทดสอบ Register:
```bash
curl -X POST http://nindam.sytes.net:3018/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"123456","email":"test@test.com"}'
```

### ทดสอบ Login:
```bash
curl -X POST http://nindam.sytes.net:3018/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"123456"}'
```

---

## คำสั่ง PM2 ที่ใช้บ่อย

```bash
# ดูสถานะ
pm2 status

# ดู log
pm2 logs inventory-api

# รีสตาร์ท
pm2 restart inventory-api

# หยุด
pm2 stop inventory-api

# ลบ
pm2 delete inventory-api

# ดู log แบบ real-time
pm2 logs inventory-api --lines 50
```

---

## 🎯 Checklist

- [ ] อัพโหลดไฟล์ไปที่ server
- [ ] SSH เข้า server สำเร็จ
- [ ] รัน `npm install` สำเร็จ
- [ ] ทดสอบ `node server.js` เห็น "✅ Connected to MySQL"
- [ ] รัน `pm2 start server.js` สำเร็จ
- [ ] ทดสอบ `/api/ping` ได้ `"db":"up"`
- [ ] Frontend เชื่อมต่อสำเร็จ

---

## 🐛 แก้ปัญหา

### Error: MySQL connection failed
```bash
# ตรวจสอบ MySQL
sudo service mysql status

# เริ่ม MySQL
sudo service mysql start
```

### Error: Port 3018 already in use
```bash
# หา process
lsof -i :3018

# ฆ่า process
pm2 delete inventory-api
```

### Error: Cannot find module
```bash
# ติดตั้ง dependencies ใหม่
rm -rf node_modules
npm install
```

---

## 📞 ติดต่อ

ถ้ามีปัญหา:
1. ดู log: `pm2 logs inventory-api`
2. ตรวจสอบ port: `netstat -tulpn | grep 3018`
3. ตรวจสอบ MySQL: `sudo service mysql status`
