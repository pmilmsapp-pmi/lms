import { pgPool } from '../config/pgClient';

const initTables = async () => {
  const client = await pgPool.connect();
  try {
    console.log("🛠️  Memulai inisialisasi tabel PostgreSQL...");

    // 1. Tabel User
    await client.query(`
      CREATE TABLE IF NOT EXISTS sync_users (
        mongo_id VARCHAR(255) PRIMARY KEY,
        email VARCHAR(255),
        role VARCHAR(50),
        data JSONB,
        synced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Tabel Kursus
    await client.query(`
      CREATE TABLE IF NOT EXISTS sync_courses (
        mongo_id VARCHAR(255) PRIMARY KEY,
        title TEXT,
        data JSONB,
        synced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. Tabel Log Sinkronisasi
    await client.query(`
      CREATE TABLE IF NOT EXISTS sync_logs (
        id SERIAL PRIMARY KEY,
        status VARCHAR(50),
        message TEXT,
        admin_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. Tabel Log Backup ZIP
    await client.query(`
      CREATE TABLE IF NOT EXISTS backup_logs (
        id SERIAL PRIMARY KEY,
        filename TEXT,
        size BIGINT,
        path TEXT,
        status VARCHAR(50),
        triggered_by VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Semua tabel berhasil disiapkan di PostgreSQL server Anda.");
  } catch (err: any) {
    console.error("❌ Gagal menyiapkan tabel:", err.message);
  } finally {
    client.release();
    process.exit();
  }
};

initTables();