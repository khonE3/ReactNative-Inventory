#!/usr/bin/env node

console.log('🔧 Testing Delete Function Debugging...');

// Test script for debugging delete functionality
console.log('='.repeat(50));
console.log('🧪 Delete Function Test Script');
console.log('='.repeat(50));

console.log('✅ 1. เพิ่ม Alert ในปุ่มลบหลัก');
console.log('✅ 2. เพิ่ม Alert ใน handleDelete function');
console.log('✅ 3. เพิ่ม useEffect สำหรับ debug การ mount');
console.log('✅ 4. เพิ่ม Test Delete button');

console.log('\n🎯 วิธีการทดสอบ:');
console.log('1. รันแอป: npm start');
console.log('2. ดูใน ProductCard จะมีปุ่ม:');
console.log('   - 🗑️ ลบ (ปุ่มหลัก)');
console.log('   - Debug Info (ปุ่มส้ม)');
console.log('   - Test Delete (ปุ่มแดง)');
console.log('3. ลองกดแต่ละปุ่มเพื่อดูว่าทำงานหรือไม่');

console.log('\n📱 Alert ที่ควรเห็น:');
console.log('- เมื่อกดปุ่มลบหลัก: "🚨 DEBUG - ปุ่มลบถูกกด!"');
console.log('- เมื่อกด Test Delete: "🧪 TEST - ปุ่มทดสอบทำงาน!"');
console.log('- เมื่อ handleDelete ทำงาน: "🚀 DEBUG - handleDelete function ถูกเรียก!"');

console.log('\n🔍 หากไม่เห็น Alert:');
console.log('- ตรวจสอบว่าแอปรันอยู่หรือไม่');
console.log('- ตรวจสอบ React Native Debugger');
console.log('- ลองรีโหลดแอป (Cmd+R หรือ Ctrl+R)');

console.log('\n' + '='.repeat(50));