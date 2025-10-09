const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'nindam.sytes.net',
  port: 3306,
  user: 'std6630202252',
  password: 'Pq7@j9Bz',
  database: 'it_std6630202252',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function checkStats() {
  try {
    console.log('\n📊 === DATABASE STATISTICS CHECK ===\n');
    
    // Get statistics
    const [stats] = await pool.query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN LOWER(status) = 'active' THEN 1 ELSE 0 END) as active,
        SUM(CASE WHEN stock < 10 THEN 1 ELSE 0 END) as lowStock,
        SUM(price * stock) as totalValue
      FROM products
    `);
    
    console.log('Total Products:', stats[0].total);
    console.log('Active Products:', stats[0].active);
    console.log('Low Stock Products:', stats[0].lowStock);
    console.log('Total Value: ฿' + stats[0].totalValue?.toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2}));
    
    console.log('\n📦 === SAMPLE PRODUCTS (First 10) ===\n');
    
    // Get sample products
    const [products] = await pool.query(`
      SELECT id, name, price, stock, status, (price * stock) as value
      FROM products
      ORDER BY id
      LIMIT 10
    `);
    
    console.table(products);
    
    console.log('\n💰 === VALUE BREAKDOWN ===\n');
    
    // Get value summary
    const [valueBreakdown] = await pool.query(`
      SELECT 
        status,
        COUNT(*) as count,
        SUM(price * stock) as totalValue
      FROM products
      GROUP BY status
    `);
    
    console.table(valueBreakdown);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

checkStats();
