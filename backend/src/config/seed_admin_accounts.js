const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
require('dotenv').config();

const db = require('./database');

const adminAccounts = [
    {
        table: 'account_kepala_lab',
        idField: 'id_account_kepala_lab',
        name: 'Kepala Laboratorium ABEL',
        email: 'kepala.lab@abel.edu',
        password: 'password123',
        role: 'kepala_lab',
        institusi_departemen: 'Laboratorium ABEL FTUI',
        nip_atau_nik: '197505052000031002'
    },
    {
        table: 'account_laboran',
        idField: 'id_account_laboran',
        name: 'Laboran ABEL',
        email: 'laboran@abel.edu',
        password: 'Laboran@ABEL2026!',
        role: 'laboran',
        institusi_departemen: 'Laboratorium ABEL FTUI',
        nip_atau_nik: '198501012010121001'
    }
];

async function seedAdmins() {
    console.log('🌱 Memulai proses seeding akun admin...');
    for (const account of adminAccounts) {
        const hashedPassword = bcrypt.hashSync(account.password, 10);
        
        await new Promise((resolve) => {
            // Cek apakah akun dengan email ini sudah ada
            const checkQuery = `SELECT * FROM ${account.table} WHERE LOWER(TRIM(email)) = ?`;
            db.query(checkQuery, [account.email.toLowerCase().trim()], (err, rows) => {
                if (err) {
                    console.error(`❌ Error cek ${account.table}:`, err.message);
                    return resolve();
                }

                if (rows && rows.length > 0) {
                    // Update akun pertama
                    const primaryId = rows[0][account.idField];
                    const updateQuery = `
                        UPDATE ${account.table} 
                        SET nama_lengkap = ?, password = ?, role = ?, institusi_departemen = ?, nip_atau_nik = ?
                        WHERE ${account.idField} = ?
                    `;
                    db.query(updateQuery, [account.name, hashedPassword, account.role, account.institusi_departemen, account.nip_atau_nik, primaryId], (updateErr) => {
                        if (updateErr) {
                            console.error(`❌ Gagal update ${account.table}:`, updateErr.message);
                        } else {
                            console.log(`✅ Berhasil update ${account.table}: ${account.email} (Password: ${account.password})`);
                        }

                        // Hapus record duplikat jika ada
                        if (rows.length > 1) {
                            const duplicateIds = rows.slice(1).map(r => r[account.idField]);
                            const deleteQuery = `DELETE FROM ${account.table} WHERE ${account.idField} IN (?) AND ${account.idField} != ?`;
                            db.query(deleteQuery, [duplicateIds, primaryId], (delErr) => {
                                if (!delErr) {
                                    console.log(`🧹 Membersihkan ${rows.length - 1} duplikat di ${account.table}`);
                                }
                                resolve();
                            });
                        } else {
                            resolve();
                        }
                    });
                } else {
                    // Insert baru
                    const insertQuery = `
                        INSERT INTO ${account.table} (nama_lengkap, email, password, role, institusi_departemen, nip_atau_nik)
                        VALUES (?, ?, ?, ?, ?, ?)
                    `;
                    db.query(insertQuery, [account.name, account.email, hashedPassword, account.role, account.institusi_departemen, account.nip_atau_nik], (insErr) => {
                        if (insErr) {
                            console.error(`❌ Gagal insert ${account.table}:`, insErr.message);
                        } else {
                            console.log(`✅ Berhasil tambah ${account.table}: ${account.email} (Password: ${account.password})`);
                        }
                        resolve();
                    });
                }
            });
        });
    }
    console.log('🎉 Selesai seeding akun admin!');
    process.exit(0);
}

seedAdmins();