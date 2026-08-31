const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT || 3306,
    multipleStatements: true
});

connection.connect((err) => {
    if (err) {
        console.error('❌ Gagal terhubung ke MySQL:', err.message);
        process.exit(1);
    }
    console.log('✅ Terhubung ke server MySQL.');

    const sqlFile = path.join(__dirname, 'init_db.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');

    connection.query(sql, async (err) => {
        if (err) {
            console.error('❌ Error inisialisasi schema:', err.message);
            connection.end();
            process.exit(1);
        }
        console.log('✅ Skema tabel database berhasil diperbarui/dibuat!');

        // Seed Default Users
        const defaultPassword = 'password123';
        const hashedPassword = bcrypt.hashSync(defaultPassword, 10);

        const researcherUser = [
            'Researcher ABEL',
            'researcher@abel.edu',
            hashedPassword,
            'researcher',
            'Departemen Teknik Kimia',
            '2006123456',
            'Teknik Bioproses'
        ];

        const laboranUser = [
            'Laboran ABEL',
            'laboran@abel.edu',
            hashedPassword,
            'laboran',
            'Laboratorium ABEL FTUI',
            '198501012010121001'
        ];

        const kepalaLabUser = [
            'Prof. Dr. Kepala Lab',
            'kepala_lab@abel.edu',
            hashedPassword,
            'kepala_lab',
            'Laboratorium ABEL FTUI',
            '197505052000031002'
        ];

        // Seed researcher
        connection.query(
            `INSERT INTO lab_management_system.account_research (full_name, email, password, category, institusi_departemen, nim_atau_nik, prodi)
             VALUES (?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE full_name=VALUES(full_name), password=VALUES(password)`,
            researcherUser,
            (err) => {
                if (err) console.error('Warning seed researcher:', err.message);
                else console.log('👤 Akun Seed Researcher ready: researcher@abel.edu (password: password123)');
            }
        );

        // Seed laboran
        connection.query(
            `INSERT INTO lab_management_system.account_laboran (nama_lengkap, email, password, role, institusi_departemen, nip_atau_nik)
             VALUES (?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE nama_lengkap=VALUES(nama_lengkap), password=VALUES(password)`,
            laboranUser,
            (err) => {
                if (err) console.error('Warning seed laboran:', err.message);
                else console.log('👤 Akun Seed Laboran ready: laboran@abel.edu (password: password123)');
            }
        );

        // Seed kepala lab
        connection.query(
            `INSERT INTO lab_management_system.account_kepala_lab (nama_lengkap, email, password, role, institusi_departemen, nip_atau_nik)
             VALUES (?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE nama_lengkap=VALUES(nama_lengkap), password=VALUES(password)`,
            kepalaLabUser,
            (err) => {
                if (err) console.error('Warning seed kepala_lab:', err.message);
                else console.log('👤 Akun Seed Kepala Lab ready: kepala_lab@abel.edu (password: password123)');
                
                console.log('🎉 Setup Database Selesai dengan Sukses!');
                connection.end();
            }
        );
    });
});