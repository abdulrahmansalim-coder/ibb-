const mysql = require('mysql');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
require('dotenv').config();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'lab_management_system',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    queueLimit: 0,
    charset: 'utf8mb4'
});

// Verifikasi koneksi awal saat server mulai
pool.getConnection((err, conn) => {
    if (err) {
        console.error('❌ Gagal koneksi ke database MySQL:', err.message);
        if (err.code === 'ECONNREFUSED') {
            console.error('👉 Petunjuk: Pastikan MySQL (XAMPP / Laragon / MySQL Service) sudah dinyalakan pada port ' + (process.env.DB_PORT || 3306));
        } else if (err.code === 'ER_BAD_DB_ERROR') {
            console.error(`👉 Petunjuk: Database "${process.env.DB_NAME || 'lab_management_system'}" belum ada. Jalankan: npm run setup:db`);
        } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('👉 Petunjuk: Akses ditolak! Periksa DB_USER dan DB_PASSWORD di file .env');
        }
    } else {
        console.log(`✅ Berhasil terhubung ke database MySQL [${process.env.DB_NAME || 'lab_management_system'}]!`);
        conn.release();
    }
});

module.exports = pool;