require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3018;
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_in_.env';

// ---------- Middlewares ----------
app.use(cors());
app.use(express.json({ limit: '5mb' }));

// ---------- MySQL Pool ----------
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

// quick startup test (non-fatal log if fails)
(async function testMySQL() {
  try {
    const conn = await pool.getConnection();
    console.log('✅ Connected to MySQL:', process.env.DB_NAME);
    conn.release();
  } catch (err) {
    console.error('⚠️  MySQL connection failed on boot:', err.message);
  }
})();

// ---------- Helpers ----------
function authToken(req, res, next) {
  console.log('🔒 Auth middleware called for:', req.method, req.path);
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  
  console.log('🔑 Token check:', { 
    hasAuthHeader: !!authHeader, 
    hasToken: !!token,
    tokenPrefix: token?.substring(0, 10) + '...' 
  });
  
  if (!token) {
    console.log('❌ Auth: No token provided');
    return res.status(401).json({ error: 'Access Token Required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log('❌ Auth: Token verification failed:', err.message);
      return res.status(403).json({ error: 'Invalid Token' });
    }
    console.log('✅ Auth: Token verified for user:', user.username);
    req.user = user;
    next();
  });
}

// ---------- Health / Meta ----------
app.get('/api', (req, res) => {
  res.status(200).json({ ok: true, service: 'myapi', version: '1.0.0' });
});

// Health check
app.get('/api/ping', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    return res.status(200).json({
      ok: true,
      service: 'myapi',
      time: new Date().toISOString(),
      db: 'up',
    });
  } catch (e) {
    return res.status(500).json({
      ok: false,
      service: 'myapi',
      time: new Date().toISOString(),
      db: 'down',
      error: e.message,
    });
  }
});

// Check database schema
app.get('/api/check-schema', async (req, res) => {
  try {
    console.log('🔍 Checking database schema...');
    
    // Get table columns
    const [columns] = await pool.query('DESCRIBE products');
    const idColumn = columns.find(col => col.Field === 'id');
    
    // Get AUTO_INCREMENT info
    const [autoIncrementInfo] = await pool.query(`
      SELECT AUTO_INCREMENT 
      FROM information_schema.tables 
      WHERE table_schema = DATABASE() 
      AND table_name = 'products'
    `);
    
    // Get PRIMARY KEY info
    const [primaryKeyInfo] = await pool.query(`
      SELECT COLUMN_NAME
      FROM information_schema.KEY_COLUMN_USAGE 
      WHERE table_schema = DATABASE() 
      AND table_name = 'products' 
      AND CONSTRAINT_NAME = 'PRIMARY'
    `);
    
    // Analyze issues
    const issues = [];
    const fixes = [];
    
    if (!idColumn) {
      issues.push('id column not found');
      fixes.push('CREATE id column');
    } else {
      if (idColumn.Key !== 'PRI') {
        issues.push('id is not PRIMARY KEY');
        fixes.push('ADD PRIMARY KEY (id)');
      }
      if (!idColumn.Extra?.includes('auto_increment')) {
        issues.push('id does not have AUTO_INCREMENT');
        fixes.push('MODIFY id to AUTO_INCREMENT');
      }
    }
    
    console.log('📊 Schema analysis:', { issues, fixes });
    
    return res.json({
      columns: columns,
      idColumn: idColumn,
      autoIncrement: autoIncrementInfo[0]?.AUTO_INCREMENT || 'Not set',
      primaryKey: primaryKeyInfo.map(pk => pk.COLUMN_NAME),
      issues: issues,
      fixes: fixes,
      needsFix: issues.length > 0,
      recommendations: {
        needsAutoIncrement: !idColumn?.Extra?.includes('auto_increment'),
        needsPrimaryKey: idColumn?.Key !== 'PRI',
        sqlFix: 'POST /api/fix-schema to automatically fix all issues'
      }
    });
  } catch (e) {
    console.error('❌ Schema check error:', e);
    return res.status(500).json({ error: e.message });
  }
});

// Execute raw SQL endpoint (for manual fixes)
app.post('/api/execute-sql', async (req, res) => {
  try {
    const { sql, description } = req.body;
    
    if (!sql) {
      return res.status(400).json({ error: 'SQL command is required' });
    }
    
    console.log('🔧 Executing SQL:', description || 'Manual SQL command');
    console.log('📝 SQL:', sql);
    
    const result = await pool.query(sql);
    console.log('✅ SQL executed successfully');
    
    return res.json({
      success: true,
      message: `SQL executed successfully: ${description || sql}`,
      result: result[0]
    });
  } catch (e) {
    console.error('❌ SQL execution error:', e);
    return res.status(500).json({
      error: 'Failed to execute SQL',
      details: e.message,
      sqlError: e.code,
      sqlState: e.sqlState
    });
  }
});

// Test DELETE endpoint (for debugging)
app.post('/api/test-delete/:id', authToken, async (req, res) => {
  const { id } = req.params;
  console.log('🧪🧪🧪 TEST DELETE ENDPOINT CALLED!');
  console.log('🧪 Test delete for product ID:', id);
  console.log('🧪 Headers:', req.headers);
  console.log('🧪 User:', req.user);
  
  try {
    // Check if product exists
    const [found] = await pool.query('SELECT id, name FROM products WHERE id = ?', [id]);
    
    if (found.length === 0) {
      console.log('🧪 Product not found with ID:', id);
      return res.status(404).json({ error: 'Product not found' });
    }
    
    console.log('🧪 Product found:', found[0]);
    
    // Actually delete the product
    const [deleteResult] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
    console.log('🧪 Delete result:', deleteResult);
    
    return res.json({
      success: true,
      message: 'Test delete successful',
      productId: id,
      deletedProduct: found[0],
      deleteResult: deleteResult
    });
  } catch (e) {
    console.error('🧪 Test delete error:', e);
    return res.status(500).json({
      error: 'Test delete failed',
      details: e.message
    });
  }
});

// Fix database schema endpoint  
app.post('/api/fix-schema', async (req, res) => {
  try {
    console.log('🔧 Starting database schema fix...');
    
    // Check current schema
    const [columns] = await pool.query('DESCRIBE products');
    const idColumn = columns.find(col => col.Field === 'id');
    console.log('📋 Current id column:', idColumn);
    
    // Check all indexes and constraints
    const [indexes] = await pool.query(`SHOW INDEX FROM products`);
    console.log('📋 All indexes:', indexes);
    
    // Check if there are any existing records
    const [existingRecords] = await pool.query('SELECT COUNT(*) as count FROM products');
    console.log('📊 Existing records count:', existingRecords[0].count);
    
    // Check current AUTO_INCREMENT status
    const hasAutoIncrement = idColumn?.Extra?.includes('auto_increment');
    console.log('🔍 id has AUTO_INCREMENT:', hasAutoIncrement);
    
    if (!hasAutoIncrement) {
      console.log('🔧 Need to add AUTO_INCREMENT to id column');
      
      // Method 1: Try direct modification without touching constraints
      try {
        console.log('🔧 Attempting to modify id column directly...');
        await pool.query('ALTER TABLE products MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT');
        console.log('✅ Successfully added AUTO_INCREMENT to id column');
        
        // Set proper starting value if needed
        if (existingRecords[0].count > 0) {
          const [maxId] = await pool.query('SELECT MAX(id) as maxId FROM products');
          const nextId = (maxId[0].maxId || 0) + 1;
          await pool.query(`ALTER TABLE products AUTO_INCREMENT = ${nextId}`);
          console.log(`✅ Set AUTO_INCREMENT to start from ${nextId}`);
        }
        
      } catch (directError) {
        console.log('⚠️ Direct modification failed:', directError.message);
        
        // Method 2: Manual SQL approach
        console.log('🔧 Trying alternative approach...');
        
        // Get max ID first
        let nextId = 1;
        if (existingRecords[0].count > 0) {
          const [maxId] = await pool.query('SELECT MAX(id) as maxId FROM products');
          nextId = (maxId[0].maxId || 0) + 1;
        }
        
        // Execute raw SQL
        const alterSQL = `ALTER TABLE products MODIFY id INT NOT NULL AUTO_INCREMENT PRIMARY KEY`;
        console.log('🔧 Executing SQL:', alterSQL);
        await pool.query(alterSQL);
        
        // Set AUTO_INCREMENT start value
        await pool.query(`ALTER TABLE products AUTO_INCREMENT = ${nextId}`);
        console.log(`✅ Set AUTO_INCREMENT to start from ${nextId}`);
      }
      
      // Verify the changes
      const [newColumns] = await pool.query('DESCRIBE products');
      const newIdColumn = newColumns.find(col => col.Field === 'id');
      console.log('📋 Updated id column:', newIdColumn);
      
      return res.json({
        success: true,
        message: 'Database schema fixed successfully - AUTO_INCREMENT added',
        changes: {
          before: idColumn,
          after: newIdColumn,
          recordCount: existingRecords[0].count
        }
      });
    } else {
      console.log('ℹ️ id already has AUTO_INCREMENT, no changes needed');
      return res.json({
        success: true,
        message: 'Database schema is already correct - no changes needed',
        idColumn: idColumn,
        recordCount: existingRecords[0].count
      });
    }
    
  } catch (e) {
    console.error('❌ Schema Fix Error:', e);
    return res.status(500).json({ 
      error: 'Failed to fix schema', 
      details: e.message,
      sqlError: e.code,
      sqlState: e.sqlState,
      errno: e.errno,
      suggestion: 'Please try running this SQL manually: ALTER TABLE products MODIFY id INT NOT NULL AUTO_INCREMENT;'
    });
  }
});

// ---------- Auth ----------
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: 'Missing body' });

    const [found] = await pool.query(
      'SELECT user_id FROM users WHERE username = ?',
      [username]
    );
    if (found.length > 0)
      return res.status(400).json({ error: 'Username exists' });

    const hash = await bcrypt.hash(password, 10);
    const [rs] = await pool.query(
      'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)',
      [username, hash, email || null, 'user']
    );
    return res.status(201).json({ success: true, userId: rs.insertId });
  } catch (e) {
    console.error('Register Error:', e);
    return res.status(500).json({ error: 'Register failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: 'Missing body' });

    const [u] = await pool.query(
      'SELECT user_id, username, password, role FROM users WHERE username = ?',
      [username]
    );
    if (u.length === 0)
      return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, u[0].password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: u[0].user_id, username: u[0].username, role: u[0].role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({
      token,
      user: {
        id: u[0].user_id,
        username: u[0].username,
        role: u[0].role,
      },
    });
  } catch (e) {
    console.error('Login Error:', e);
    return res.status(500).json({ error: 'Login failed' });
  }
});

// ---------- Products CRUD (Enhanced) ----------

// GET /api/categories (ดึงรายการ categories ทั้งหมด)
app.get('/api/categories', authToken, async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT DISTINCT category 
      FROM products 
      WHERE category IS NOT NULL AND category != ''
      ORDER BY category ASC
    `);
    
    const categories = ['ทั้งหมด', ...rows.map(row => row.category)];
    console.log('✅ Categories fetched:', categories.length);
    return res.json(categories);
  } catch (e) {
    console.error('❌ Categories Error:', e);
    return res.status(500).json({ error: 'ไม่สามารถดึงข้อมูล categories ได้' });
  }
});

// GET /api/products/search/:query (ค้นหาสินค้า)
app.get('/api/products/search/:query', authToken, async (req, res) => {
  try {
    const { query } = req.params;
    console.log('🔍 Searching products with query:', query);
    
    const [rows] = await pool.query(`
      SELECT 
        id, name, category, price, unit, image, stock, location, 
        status, brand, sizes, productCode, orderName, lastUpdate
      FROM products 
      WHERE 
        name LIKE ? OR 
        category LIKE ? OR 
        brand LIKE ? OR 
        productCode LIKE ? OR
        location LIKE ?
      ORDER BY lastUpdate DESC
    `, [
      `%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`
    ]);
    
    const products = rows.map(product => ({
      ...product,
      price: parseFloat(product.price) || 0,
      stock: parseInt(product.stock) || 0,
      storeAvailability: []
    }));
    
    console.log('✅ Found', products.length, 'products for query:', query);
    return res.json(products);
  } catch (e) {
    console.error('❌ Search Error:', e);
    return res.status(500).json({ error: 'ไม่สามารถค้นหาสินค้าได้' });
  }
});

// GET /api/products/category/:category (ดึงสินค้าตาม category)
app.get('/api/products/category/:category', authToken, async (req, res) => {
  try {
    let { category } = req.params;
    console.log('📂 Fetching products by category:', category);
    
    let query, params;
    if (category === 'ทั้งหมด' || category === 'all') {
      query = `
        SELECT 
          id, name, category, price, unit, image, stock, location, 
          status, brand, sizes, productCode, orderName, lastUpdate
        FROM products 
        ORDER BY lastUpdate DESC
      `;
      params = [];
    } else {
      query = `
        SELECT 
          id, name, category, price, unit, image, stock, location, 
          status, brand, sizes, productCode, orderName, lastUpdate
        FROM products 
        WHERE category = ?
        ORDER BY lastUpdate DESC
      `;
      params = [category];
    }
    
    const [rows] = await pool.query(query, params);
    
    const products = rows.map(product => ({
      ...product,
      price: parseFloat(product.price) || 0,
      stock: parseInt(product.stock) || 0,
      storeAvailability: []
    }));
    
    console.log('✅ Found', products.length, 'products in category:', category);
    return res.json(products);
  } catch (e) {
    console.error('❌ Category Filter Error:', e);
    return res.status(500).json({ error: 'ไม่สามารถดึงสินค้าตาม category ได้' });
  }
});

// GET /api/products (fetch all products)
app.get('/api/products', authToken, async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        id, 
        name, 
        category, 
        price, 
        unit, 
        image, 
        stock, 
        location, 
        status, 
        brand, 
        sizes,
        productCode,
        orderName,
        lastUpdate
      FROM products 
      ORDER BY lastUpdate DESC
    `);
    
    // Ensure price and stock are numbers
    const products = rows.map(product => ({
      ...product,
      price: parseFloat(product.price) || 0,
      stock: parseInt(product.stock) || 0,
      // Add default storeAvailability for frontend compatibility
      storeAvailability: []
    }));
    
    console.log(`✅ Fetched ${products.length} products successfully`);
    return res.json(products);
  } catch (e) {
    console.error('Products Error:', e);
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:id (ดึงข้อมูลสินค้าตัวเดียว)
app.get('/api/products/:id', authToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log('🔍 Fetching product ID:', id);
    
    const [rows] = await pool.query(
      `SELECT 
        id, name, category, price, unit, image, stock, location, 
        status, brand, sizes, productCode, orderName, lastUpdate
      FROM products WHERE id = ?`,
      [id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'ไม่พบสินค้าที่ต้องการ' });
    }
    
    const product = {
      ...rows[0],
      price: parseFloat(rows[0].price) || 0,
      stock: parseInt(rows[0].stock) || 0,
      storeAvailability: []
    };
    
    console.log('✅ Product found:', product.name);
    return res.json(product);
  } catch (e) {
    console.error('❌ Product Fetch Error:', e);
    return res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลสินค้าได้' });
  }
});

// POST /api/products
app.post('/api/products', authToken, async (req, res) => {
  try {
    const {
      name, stock, category, location, image, status, brand, sizes, productCode, orderName, price, unit
    } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    // Check if id field has AUTO_INCREMENT
    const [columns] = await pool.query('DESCRIBE products');
    const idColumn = columns.find(col => col.Field === 'id');
    const hasAutoIncrement = idColumn?.Extra?.includes('auto_increment');

    let query, values;
    
    if (hasAutoIncrement) {
      // Use AUTO_INCREMENT (don't specify id)
      query = `INSERT INTO products
        (name, stock, category, location, image, status, brand, sizes, productCode, orderName, price, unit, lastUpdate)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`;
      values = [
        name, stock || 0, category || null, location || null,
        image || null, status || 'active', brand || null, sizes || null, productCode || null,
        orderName || null, parseFloat(price) || 0, unit || 'ชิ้น'
      ];
    } else {
      // Manual ID generation (fallback)
      const [maxIdResult] = await pool.query('SELECT COALESCE(MAX(id), 0) + 1 as nextId FROM products');
      const nextId = maxIdResult[0].nextId;
      
      query = `INSERT INTO products
        (id, name, stock, category, location, image, status, brand, sizes, productCode, orderName, price, unit, lastUpdate)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`;
      values = [
        nextId, name, stock || 0, category || null, location || null,
        image || null, status || 'active', brand || null, sizes || null, productCode || null,
        orderName || null, parseFloat(price) || 0, unit || 'ชิ้น'
      ];
    }

    const [rs] = await pool.query(query, values);
    const productId = hasAutoIncrement ? rs.insertId : values[0];
    
    return res.status(201).json({ success: true, productId: productId });
  } catch (e) {
    console.error('Create Product Error:', e);
    
    if (e.code === 'ER_NO_DEFAULT_FOR_FIELD') {
      return res.status(500).json({ 
        error: 'Database schema issue: id field needs AUTO_INCREMENT',
        solution: 'Please run: ALTER TABLE products MODIFY COLUMN id INT AUTO_INCREMENT PRIMARY KEY;',
        fixEndpoint: 'POST /api/fix-schema'
      });
    }
    
    return res.status(500).json({ error: 'Failed to create product', details: e.message });
  }
});

// PUT /api/products/:id
app.put('/api/products/:id', authToken, async (req, res) => {
  console.log('Received body:', req.body);
  try {
    const { id } = req.params;
    const { name, stock, status, category, location, image, brand, sizes, productCode, orderName, price, unit } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const [found] = await pool.query(
      'SELECT id FROM products WHERE id = ?',
      [id]
    );
    if (found.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await pool.query(
      `UPDATE products SET name = ?, stock = ?, status = ?, category = ?, location = ?, image = ?, brand = ?, sizes = ?, productCode = ?, orderName = ?, price = ?, unit = ?, lastUpdate = NOW() WHERE id = ?`,
      [
        name, stock || 0, status || 'Active', category || null, location || null,
        image || null, brand || null, sizes || null, productCode || null, orderName || null, 
        parseFloat(price) || 0, unit || 'ชิ้น', id
      ]
    );
    return res.json({ success: true, productId: id });
  } catch (e) {
    console.error('Update Product Error:', {
      message: e.message,
      stack: e.stack,
      params: req.params,
      body: req.body,
      time: new Date().toISOString(),
    });
    return res.status(500).json({ error: 'Failed to update product', details: e.message });
  }
});

// DELETE /api/products/:id
app.delete('/api/products/:id', authToken, async (req, res) => {
  console.log('🚨🚨🚨 DELETE ENDPOINT HIT! 🚨🚨🚨');
  console.log('⏰ Request timestamp:', new Date().toISOString());
  const { id } = req.params;
  console.log('🗑️ DELETE request received for product ID:', id);
  console.log('📋 Full request details:', {
    method: req.method,
    url: req.url,
    params: req.params,
    headers: Object.keys(req.headers),
    body: req.body
  });
  console.log('🔍 Request headers:', JSON.stringify(req.headers, null, 2));
  console.log('👤 Authenticated user:', req.user?.username);
  
  try {
    // Check if product exists
    console.log('🔍 Checking if product exists...');
    const [found] = await pool.query(
      'SELECT id, name FROM products WHERE id = ?',
      [id]
    );
    
    if (found.length === 0) {
      console.log('❌ Product not found with ID:', id);
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const productName = found[0].name;
    console.log('✅ Product found:', productName, '(ID:', id, ')');
    
    // Perform deletion
    console.log('🗑️ Attempting to delete product from database...');
    const [deleteResult] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
    
    console.log('📊 Delete result:', {
      affectedRows: deleteResult.affectedRows,
      changedRows: deleteResult.changedRows,
      insertId: deleteResult.insertId
    });
    
    if (deleteResult.affectedRows === 0) {
      console.log('⚠️ No rows affected during deletion');
      return res.status(404).json({ error: 'Product not found or already deleted' });
    }
    
    console.log('✅ Product deleted successfully:', productName, '(ID:', id, ')');
    return res.json({ 
      success: true, 
      productId: id,
      message: `Product "${productName}" deleted successfully`
    });
    
  } catch (e) {
    console.error('❌ Delete Product Error:', {
      message: e.message,
      stack: e.stack,
      productId: id,
      params: req.params,
      time: new Date().toISOString(),
      sqlState: e.sqlState,
      errno: e.errno,
      code: e.code
    });
    return res.status(500).json({ 
      error: 'Failed to delete product', 
      details: e.message,
      productId: id
    });
  }
});

// ---------- Bulk Operations ----------

// POST /api/products/bulk-delete (ลบสินค้าหลายรายการ)
app.post('/api/products/bulk-delete', authToken, async (req, res) => {
  try {
    const { productIds } = req.body;
    
    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ error: 'กรุณาระบุ ID สินค้าที่ต้องการลบ' });
    }
    
    console.log('🗑️ Bulk delete request for products:', productIds);
    
    // Check which products exist
    const placeholders = productIds.map(() => '?').join(',');
    const [found] = await pool.query(
      `SELECT id, name FROM products WHERE id IN (${placeholders})`,
      productIds
    );
    
    if (found.length === 0) {
      return res.status(404).json({ error: 'ไม่พบสินค้าที่ต้องการลบ' });
    }
    
    // Delete products
    await pool.query(
      `DELETE FROM products WHERE id IN (${placeholders})`,
      productIds
    );
    
    console.log('✅ Bulk deleted', found.length, 'products');
    return res.json({
      success: true,
      message: `ลบสินค้าเรียบร้อยแล้ว ${found.length} รายการ`,
      deletedCount: found.length,
      deletedProducts: found
    });
  } catch (e) {
    console.error('❌ Bulk Delete Error:', e);
    return res.status(500).json({ error: 'ไม่สามารถลบสินค้าได้', details: e.message });
  }
});

// PUT /api/products/bulk-update-status (อัปเดตสถานะสินค้าหลายรายการ)
app.put('/api/products/bulk-update-status', authToken, async (req, res) => {
  try {
    const { productIds, status } = req.body;
    
    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ error: 'กรุณาระบุ ID สินค้าที่ต้องการอัปเดต' });
    }
    
    if (!status) {
      return res.status(400).json({ error: 'กรุณาระบุสถานะที่ต้องการ' });
    }
    
    console.log('🔄 Bulk status update for products:', productIds, 'to status:', status);
    
    const placeholders = productIds.map(() => '?').join(',');
    
    // Update status
    const [result] = await pool.query(
      `UPDATE products SET status = ?, lastUpdate = NOW() WHERE id IN (${placeholders})`,
      [status, ...productIds]
    );
    
    console.log('✅ Bulk updated status for', result.affectedRows, 'products');
    return res.json({
      success: true,
      message: `อัปเดตสถานะเรียบร้อยแล้ว ${result.affectedRows} รายการ`,
      updatedCount: result.affectedRows,
      newStatus: status
    });
  } catch (e) {
    console.error('❌ Bulk Status Update Error:', e);
    return res.status(500).json({ error: 'ไม่สามารถอัปเดตสถานะได้', details: e.message });
  }
});

// ---------- Statistics & Analytics ----------

// GET /api/stats/dashboard (สถิติหน้า dashboard)
app.get('/api/stats/dashboard', authToken, async (req, res) => {
  try {
    console.log('📊 Fetching dashboard statistics');
    
    // Total products
    const [totalResult] = await pool.query('SELECT COUNT(*) as total FROM products');
    const totalProducts = totalResult[0].total;
    
    // Active products
    const [activeResult] = await pool.query('SELECT COUNT(*) as active FROM products WHERE status = ?', ['Active']);
    const activeProducts = activeResult[0].active;
    
    // Low stock products (stock < 10)
    const [lowStockResult] = await pool.query('SELECT COUNT(*) as lowStock FROM products WHERE stock < ?', [10]);
    const lowStockProducts = lowStockResult[0].lowStock;
    
    // Products by category
    const [categoryStats] = await pool.query(`
      SELECT category, COUNT(*) as count 
      FROM products 
      WHERE category IS NOT NULL AND category != ''
      GROUP BY category 
      ORDER BY count DESC
    `);
    
    // Recent products (last 7 days)
    const [recentResult] = await pool.query(`
      SELECT COUNT(*) as recent 
      FROM products 
      WHERE lastUpdate >= DATE_SUB(NOW(), INTERVAL 7 DAY)
    `);
    const recentProducts = recentResult[0].recent;
    
    const stats = {
      totalProducts,
      activeProducts,
      lowStockProducts,
      recentProducts,
      categoryStats,
      lastUpdated: new Date().toISOString()
    };
    
    console.log('✅ Dashboard stats generated');
    return res.json(stats);
  } catch (e) {
    console.error('❌ Dashboard Stats Error:', e);
    return res.status(500).json({ error: 'ไม่สามารถดึงสถิติได้', details: e.message });
  }
});

// GET /api/stats/low-stock (สินค้าที่เหลือน้อย)
app.get('/api/stats/low-stock', authToken, async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    console.log('📉 Fetching low stock products, limit:', limit);
    
    const [rows] = await pool.query(`
      SELECT 
        id, name, category, stock, status, lastUpdate
      FROM products 
      WHERE stock < 10
      ORDER BY stock ASC
      LIMIT ?
    `, [parseInt(limit)]);
    
    console.log('✅ Found', rows.length, 'low stock products');
    return res.json(rows);
  } catch (e) {
    console.error('❌ Low Stock Error:', e);
    return res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลสินค้าที่เหลือน้อยได้' });
  }
});

// ---------- Global Error Guard ----------
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  return res.status(500).json({ error: 'Internal Server Error' });
});

// ---------- Start Server ----------
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 API running on port ${PORT}`);
});

// Graceful shutdown (PM2 friendly)
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
async function shutdown() {
  try {
    console.log('Shutting down gracefully...');
    await pool.end();
    server.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
    // force exit after 5s
    setTimeout(() => process.exit(0), 5000).unref();
  } catch (e) {
    console.error('Shutdown error:', e);
    process.exit(1);
  }
}