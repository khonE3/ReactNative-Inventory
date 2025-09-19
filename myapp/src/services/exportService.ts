import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { Product } from '../types';
import { Alert, Platform } from 'react-native';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface ExportData {
  products: Product[];
  exportType: 'excel' | 'pdf';
}

export class ExportService {
  // Export ข้อมูลเป็น Excel
  static async exportToExcel(products: Product[]): Promise<void> {
    try {
      // เตรียมข้อมูลสำหรับ Excel
      const excelData = products.map((product, index) => ({
        'ลำดับ': index + 1,
        'รหัสสินค้า': product.productCode || '',
        'ชื่อสินค้า': product.name || '',
        'หมวดหมู่': product.category || '',
        'ราคา (บาท)': product.price || 0,
        'จำนวนคงเหลือ': product.stock || 0,
        'หน่วย': product.unit || '',
        'สถานที่': product.location || '',
        'แบรนด์': product.brand || '',
        'สถานะ': product.status || '',
        'ขนาด': product.sizes || '',
        'ชื่อผู้สั่ง': product.orderName || '',
        'วันที่อัปเดต': product.lastUpdate ? new Date(product.lastUpdate).toLocaleDateString('th-TH') : '',
      }));

      // สร้าง workbook และ worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(excelData);

      // ปรับความกว้างคอลัมน์
      const colWidths = [
        { wch: 8 },   // ลำดับ
        { wch: 15 },  // รหัสสินค้า
        { wch: 25 },  // ชื่อสินค้า
        { wch: 15 },  // หมวดหมู่
        { wch: 12 },  // ราคา
        { wch: 12 },  // จำนวนคงเหลือ
        { wch: 10 },  // หน่วย
        { wch: 15 },  // สถานที่
        { wch: 15 },  // แบรนด์
        { wch: 10 },  // สถานะ
        { wch: 15 },  // ขนาด
        { wch: 15 },  // ชื่อผู้สั่ง
        { wch: 15 },  // วันที่อัปเดต
      ];
      ws['!cols'] = colWidths;

      // เพิ่ม worksheet เข้า workbook
      XLSX.utils.book_append_sheet(wb, ws, 'รายการสินค้า');

      // สร้างชื่อไฟล์พร้อมวันที่
      const currentDate = new Date().toLocaleDateString('th-TH').replace(/\//g, '-');
      const fileName = `รายการสินค้า_${currentDate}.xlsx`;

      if (Platform.OS === 'web') {
        // สำหรับ web platform - ใช้ browser download
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        
        // สร้าง download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        Alert.alert('สำเร็จ', `ส่งออกข้อมูล ${products.length} รายการเป็น Excel เรียบร้อยแล้ว`);
      } else {
        // สำหรับ mobile platform
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });
        const fileUri = FileSystem.documentDirectory + fileName;

        // เขียนไฟล์
        await FileSystem.writeAsStringAsync(fileUri, wbout, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // แชร์ไฟล์
        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          dialogTitle: 'ส่งออกรายการสินค้า Excel',
        });

        Alert.alert('สำเร็จ', `ส่งออกข้อมูล ${products.length} รายการเป็น Excel เรียบร้อยแล้ว`);
      }
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถส่งออกข้อมูลเป็น Excel ได้');
    }
  }

    // Export ข้อมูลเป็น PDF
  static async exportToPDF(products: Product[]): Promise<void> {
    try {
      // สร้างชื่อไฟล์พร้อมวันที่
      const currentDate = new Date().toLocaleDateString('th-TH').replace(/\//g, '-');
      const fileName = `รายการสินค้า_${currentDate}.pdf`;

      if (Platform.OS === 'web') {
        // สำหรับ web platform - สร้าง PDF โดยตรงด้วย html2canvas + jsPDF
        await this.generatePDFFromHTML(products, fileName);
        
        Alert.alert('สำเร็จ', `ส่งออกข้อมูล ${products.length} รายการเป็น PDF พร้อมรองรับภาษาไทยเรียบร้อยแล้ว`);
      } else {
        // สำหรับ mobile platform - ใช้ HTML method เดิม
        const htmlContent = this.generateHTMLForPDF(products);
        const htmlFileName = `รายการสินค้า_${currentDate}.html`;
        const fileUri = FileSystem.documentDirectory + htmlFileName;

        // เขียนไฟล์ HTML
        await FileSystem.writeAsStringAsync(fileUri, htmlContent, {
          encoding: FileSystem.EncodingType.UTF8,
        });

        // แชร์ไฟล์ HTML
        await Sharing.shareAsync(fileUri, {
          mimeType: 'text/html',
          dialogTitle: 'ส่งออกรายการสินค้า HTML (รองรับภาษาไทย)',
        });

        Alert.alert(
          'สำเร็จ', 
          `ส่งออกข้อมูล ${products.length} รายการเป็น HTML เรียบร้อยแล้ว\n\nเปิดไฟล์ในเบราว์เซอร์แล้วกด Ctrl+P หรือ Cmd+P เพื่อบันทึกเป็น PDF (รองรับภาษาไทย)`
        );
      }
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถส่งออกข้อมูลเป็น PDF ได้');
    }
  }



  // สร้าง PDF จาก HTML โดยตรงด้วย html2canvas + jsPDF
  private static async generatePDFFromHTML(products: Product[], fileName: string): Promise<void> {
    try {
      console.log('Starting PDF generation with', products.length, 'products');
      
      // สร้าง temporary div สำหรับ render HTML
      const tempDiv = document.createElement('div');
      const htmlContent = this.generateHTMLForPDF(products);
      
      console.log('Generated HTML length:', htmlContent.length);
      
      tempDiv.innerHTML = htmlContent;
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '0';
      tempDiv.style.width = '1200px';
      tempDiv.style.backgroundColor = 'white';
      tempDiv.style.padding = '20px';
      document.body.appendChild(tempDiv);

      // รอให้ font โหลดเสร็จ
      await document.fonts.ready;
      console.log('Fonts loaded');
      
      // รอเล็กน้อยให้ CSS ทำงานเสร็จ
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('CSS rendering complete');

      const targetElement = tempDiv.firstElementChild as HTMLElement;
      console.log('Target element:', targetElement);
      console.log('Element dimensions:', {
        scrollWidth: targetElement?.scrollWidth,
        scrollHeight: targetElement?.scrollHeight,
        offsetWidth: targetElement?.offsetWidth,
        offsetHeight: targetElement?.offsetHeight
      });

      // ใช้ html2canvas แปลงเป็น image
      const canvas = await html2canvas(targetElement, {
        width: targetElement?.scrollWidth || 1200,
        height: targetElement?.scrollHeight || 800,
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: true,
        windowWidth: 1200,
        windowHeight: targetElement?.scrollHeight || 800,
        removeContainer: false,
        foreignObjectRendering: true
      });

      console.log('Canvas created:', {
        width: canvas.width,
        height: canvas.height
      });

      // ตรวจสอบว่า canvas มีข้อมูลหรือไม่
      const ctx = canvas.getContext('2d');
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      const hasContent = imageData?.data.some((pixel, index) => {
        // ตรวจสอบ RGB channels (ไม่รวม alpha)
        if ((index + 1) % 4 !== 0) {
          return pixel !== 255; // ถ้าไม่ใช่สีขาว (255, 255, 255)
        }
        return false;
      });

      console.log('Canvas has content:', hasContent);

      if (!hasContent) {
        console.warn('Canvas appears to be empty, using fallback method');
        // ใช้วิธี HTML download แทน
        const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName.replace('.pdf', '.html');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        document.body.removeChild(tempDiv);
        return;
      }

      // สร้าง PDF ด้วย jsPDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const canvasAspectRatio = canvas.height / canvas.width;
      const pdfContentWidth = pdfWidth - 20; // margin 10mm on each side
      const pdfContentHeight = pdfContentWidth * canvasAspectRatio;

      // เพิ่มรูปภาพในหน้าแรก
      pdf.addImage(
        canvas.toDataURL('image/png', 0.95), 
        'PNG', 
        10, // x position
        10, // y position
        pdfContentWidth, 
        Math.min(pdfContentHeight, pdfHeight - 20)
      );

      // ถ้าเนื้อหายาวเกินหน้าเดียว ให้เพิ่มหน้าใหม่
      if (pdfContentHeight > pdfHeight - 20) {
        let remainingHeight = pdfContentHeight - (pdfHeight - 20);
        let sourceY = (pdfHeight - 20) / canvasAspectRatio;
        
        while (remainingHeight > 0) {
          pdf.addPage();
          const pageContentHeight = Math.min(remainingHeight, pdfHeight - 20);
          
          // สร้าง canvas ใหม่สำหรับส่วนที่เหลือ
          const pageCanvas = document.createElement('canvas');
          pageCanvas.width = canvas.width;
          pageCanvas.height = (pageContentHeight / pdfContentWidth) * canvas.width;
          
          const pageCtx = pageCanvas.getContext('2d');
          pageCtx?.drawImage(canvas, 0, sourceY, canvas.width, pageCanvas.height, 0, 0, canvas.width, pageCanvas.height);
          
          pdf.addImage(
            pageCanvas.toDataURL('image/png', 0.95),
            'PNG',
            10,
            10,
            pdfContentWidth,
            pageContentHeight
          );
          
          remainingHeight -= (pdfHeight - 20);
          sourceY += pageCanvas.height;
        }
      }

      // ดาวน์โหลดไฟล์ PDF
      pdf.save(fileName);
      console.log('PDF saved successfully');

      // ลบ temporary div
      document.body.removeChild(tempDiv);
      
    } catch (error) {
      console.error('Error generating PDF from HTML:', error);
      throw error;
    }
  }

  // สร้าง HTML template สำหรับ PDF พร้อมรองรับภาษาไทย
  private static generateHTMLForPDF(products: Product[]): string {
    const currentDate = new Date().toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',  
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const productRows = products.map((product, index) => `
      <tr>
        <td style="text-align: center; padding: 8px; border: 1px solid #ddd;">${index + 1}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${product.productCode || '-'}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${product.name || '-'}</td>
        <td style="text-align: center; padding: 8px; border: 1px solid #ddd;">${product.category || '-'}</td>
        <td style="text-align: right; padding: 8px; border: 1px solid #ddd;">${product.price ? product.price.toLocaleString('th-TH') : '-'}</td>
        <td style="text-align: center; padding: 8px; border: 1px solid #ddd;">${product.stock || 0}</td>
        <td style="text-align: center; padding: 8px; border: 1px solid #ddd;">${product.unit || '-'}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${product.location || '-'}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${product.brand || '-'}</td>
        <td style="text-align: center; padding: 8px; border: 1px solid #ddd;">${product.status || '-'}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${product.sizes || '-'}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${product.orderName || '-'}</td>
        <td style="text-align: center; padding: 8px; border: 1px solid #ddd;">${product.lastUpdate ? new Date(product.lastUpdate).toLocaleDateString('th-TH') : '-'}</td>
      </tr>
    `).join('');

    return `
      <!DOCTYPE html>
      <html lang="th">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>รายการสินค้า - ${currentDate}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&display=swap');
          
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          
          body {
            font-family: 'Noto Sans Thai', Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: white;
            color: #2c3e50;
            font-size: 14px;
            line-height: 1.4;
            width: 100%;
            min-height: 100vh;
          }
          .container {
            background: white;
            padding: 20px;
            width: 100%;
            max-width: none;
            margin: 0;
            border-radius: 0;
            box-shadow: none;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #3498db;
            padding-bottom: 20px;
          }
          .header h1 {
            color: #2c3e50;
            font-size: 32px;
            margin: 0;
            font-weight: 600;
            margin-bottom: 10px;
          }
          .header .date {
            color: #7f8c8d;
            font-size: 16px;
            font-weight: 400;
          }
          .summary {
            background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 25px;
            text-align: center;
          }
          .summary h3 {
            margin: 0;
            font-size: 18px;
            font-weight: 500;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          th {
            background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
            color: white;
            padding: 12px 8px;
            font-weight: 600;
            font-size: 13px;
            text-align: center;
            border: none;
          }
          td {
            padding: 10px 8px;
            border-bottom: 1px solid #ecf0f1;
            font-size: 12px;
            color: #2c3e50;
          }
          tr:nth-child(even) {
            background: #f8f9fa;
          }
          tr:hover {
            background: #e3f2fd;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #3498db;
            color: #7f8c8d;
            font-size: 14px;
          }
          @media print {
            body {
              background: white;
              color: black;
              margin: 0;
              font-size: 12px;
            }
            .container {
              background: white;
              border: 1px solid #ddd;
              box-shadow: none;
              margin: 0;
              padding: 20px;
            }
            .header h1 {
              color: #333;
              font-size: 24px;
            }
            .summary {
              background: #f8f9fa;
              color: #333;
              border: 1px solid #ddd;
            }
            th {
              background: #f0f0f0 !important;
              color: #333 !important;
              font-size: 11px;
            }
            td {
              font-size: 10px;
            }
            tr:nth-child(even) {
              background: #f9f9f9;
            }
            .footer {
              border-top: 1px solid #ddd;
              color: #666;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📦 รายการสินค้าคงคลัง</h1>
            <div class="date">สร้างเมื่อ: ${currentDate}</div>
          </div>
          
          <div class="summary">
            <h3>📊 สรุปข้อมูล</h3>
            <p><strong>จำนวนสินค้าทั้งหมด:</strong> ${products.length} รายการ</p>
            <p><strong>มูลค่ารวม:</strong> ${products.reduce((sum, p) => sum + ((p.price || 0) * (p.stock || 0)), 0).toLocaleString('th-TH')} บาท</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>ลำดับ</th>
                <th>รหัสสินค้า</th>
                <th>ชื่อสินค้า</th>
                <th>หมวดหมู่</th>
                <th>ราคา (฿)</th>
                <th>คงเหลือ</th>
                <th>หน่วย</th>
                <th>สถานที่</th>
                <th>แบรนด์</th>
                <th>สถานะ</th>
              </tr>
            </thead>
            <tbody>
              ${productRows}
            </tbody>
          </table>

          <div class="footer">
            <p>🤖 สร้างโดยระบบจัดการคลังสินค้า CyberPunk Inventory</p>
            <p>วันที่พิมพ์: ${currentDate}</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ฟังก์ชันช่วยเหลือสำหรับการเลือกประเภทการ Export
  static async showExportOptions(products: Product[]): Promise<void> {
    return new Promise((resolve) => {
      Alert.alert(
        '📤 ส่งออกข้อมูล',
        `เลือกรูปแบบการส่งออกข้อมูล ${products.length} รายการ`,
        [
          {
            text: '📊 Excel',
            onPress: async () => {
              await this.exportToExcel(products);
              resolve();
            }
          },
          {
            text: '📄 PDF',
            onPress: async () => {
              await this.exportToPDF(products);
              resolve();
            }
          },
          {
            text: '❌ ยกเลิก',
            style: 'cancel',
            onPress: () => resolve()
          }
        ]
      );
    });
  }
}