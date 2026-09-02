import * as mariadb from 'mariadb';
import 'dotenv/config';

async function testConnection() {
  const dbUrl = new URL(process.env.DATABASE_URL || '');
  console.log('Connecting to:', dbUrl.hostname, 'port', dbUrl.port, 'database', dbUrl.pathname.slice(1));
  const pool = mariadb.createPool({
    host: dbUrl.hostname,
    port: Number(dbUrl.port) || 4000,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.slice(1),
    ssl: true,
  connectTimeout: 30000, // 30s — TiDB Serverless may take time to wake from sleep
  socketTimeout: 30000,
  });

  try {
    console.log('Requesting connection...');
    const conn = await pool.getConnection();
    console.log('Connected successfully!');
    const rows = await conn.query("SELECT 1 as val");
    console.log('Query result:', rows);
    conn.release();
  } catch (err) {
    console.error('Connection failed:', err);
  } finally {
    pool.end();
  }
}

testConnection();
