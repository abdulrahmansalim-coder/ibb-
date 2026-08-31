const db = require('../config/database');

let tableReady;

function ensureTable() {
    if (!tableReady) {
        tableReady = new Promise((resolve, reject) => {
            const sql = `CREATE TABLE IF NOT EXISTS data_logbook_alat_user (
                logbook_id INT AUTO_INCREMENT PRIMARY KEY,
                sub_lab_alat_id VARCHAR(50) NULL,
                nama_alat VARCHAR(150) NULL,
                nama_lengkap VARCHAR(150) NOT NULL,
                institusi_departemen VARCHAR(150) NULL,
                prodi VARCHAR(100) NULL,
                periode_penggunaan_alat VARCHAR(100) NULL,
                waktu_mulai DATETIME NULL,
                waktu_selesai DATETIME NULL,
                nama_researcher VARCHAR(150) NULL,
                jenis_sample VARCHAR(150) NULL,
                jenis_pengujian VARCHAR(150) NULL,
                tujuan_pengujian TEXT NULL,
                kondisi_teknis TEXT NULL,
                paraf_student LONGTEXT NULL,
                status_paraf_student VARCHAR(50) DEFAULT 'approved',
                status_paraf_laboran VARCHAR(50) DEFAULT 'pending',
                status_paraf_kepala_lab VARCHAR(50) DEFAULT 'pending',
                catatan_tambahan TEXT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`;
            db.query(sql, (error) => {
                if (error) {
                    return reject(error);
                }
                // Try adding the column if it doesn't exist (fails silently if it does)
                db.query(`ALTER TABLE data_logbook_alat_user ADD COLUMN nama_alat VARCHAR(150) NULL AFTER sub_lab_alat_id`, () => {
                    resolve();
                });
            });
        });
    }
    return tableReady;
}

exports.createAlatLogbook = async (req, res) => {
    try {
        await ensureTable();
        const {
            namaLengkap, institusi, prodi, room, namaAlat, jenisSample, researcherName,
            jenisPengujian, tujuanPengujian, mulaiTanggal, mulaiWaktu,
            selesaiTanggal, selesaiWaktu, kondisiAlat, notes, parafFile
        } = req.body;

        if (!namaLengkap || !room || !namaAlat || !jenisSample || !researcherName || !jenisPengujian ||
            !tujuanPengujian || !mulaiTanggal || !mulaiWaktu || !selesaiTanggal ||
            !selesaiWaktu || !kondisiAlat || !notes || !parafFile) {
            return res.status(400).json({ message: 'Semua data logbook alat wajib diisi' });
        }

        const sql = `INSERT INTO data_logbook_alat_user
            (sub_lab_alat_id, nama_alat, nama_lengkap, institusi_departemen, prodi,
             periode_penggunaan_alat, waktu_mulai, waktu_selesai, nama_researcher,
             jenis_sample, jenis_pengujian, tujuan_pengujian, kondisi_teknis,
             paraf_student, catatan_tambahan)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            room, namaAlat, namaLengkap, institusi || null, prodi || null,
            `${mulaiTanggal} - ${selesaiTanggal}`,
            `${mulaiTanggal} ${mulaiWaktu}:00`, `${selesaiTanggal} ${selesaiWaktu}:00`,
            researcherName, jenisSample, jenisPengujian, tujuanPengujian,
            kondisiAlat, parafFile, notes || null
        ];

        db.query(sql, values, (error, result) => {
            if (error) return res.status(500).json({ message: 'Gagal menyimpan logbook alat: ' + error.message });
            return res.status(201).json({ message: 'Logbook alat berhasil disimpan', id: result.insertId });
        });
    } catch (error) {
        return res.status(500).json({ message: 'Gagal menyiapkan tabel logbook alat: ' + error.message });
    }
};

exports.getAlatLogbooks = async (req, res) => {
    try {
        await ensureTable();
        db.query('SELECT * FROM data_logbook_alat_user ORDER BY created_at DESC', (error, rows) => {
            if (error) return res.status(500).json({ message: 'Gagal mengambil logbook alat: ' + error.message });
            return res.json(rows);
        });
    } catch (error) {
        return res.status(500).json({ message: 'Gagal menyiapkan tabel logbook alat: ' + error.message });
    }
};