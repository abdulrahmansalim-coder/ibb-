const db = require('../config/database');

let tableReady;

function ensureTable() {
    if (!tableReady) {
        tableReady = new Promise((resolve, reject) => {
            const sql = `CREATE TABLE IF NOT EXISTS data_logbook_lab_user (
                logbook_lab_id INT AUTO_INCREMENT PRIMARY KEY,
                id_account_researcher INT NULL,
                sub_lab_lab_id VARCHAR(50) NULL,
                researcher_name VARCHAR(150) NOT NULL,
                institusi_atau_departemen VARCHAR(150) NULL,
                prodi VARCHAR(100) NULL,
                proyek_penelitian VARCHAR(200) NULL,
                periode_penelitian VARCHAR(100) NULL,
                waktu_mulai DATETIME NULL,
                waktu_selesai DATETIME NULL,
                detail_aktivitas VARCHAR(255) NULL,
                aktivitas_dilakukan TEXT NULL,
                identitas_researcher LONGTEXT NULL,
                paraf_researcher LONGTEXT NULL,
                paraf_pi LONGTEXT NULL,
                status_paraf_researcher VARCHAR(50) DEFAULT 'signed',
                status_paraf_laboran VARCHAR(50) DEFAULT 'pending',
                status_paraf_kepala_lab VARCHAR(50) DEFAULT 'pending',
                catatan_tambahan TEXT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`;
            db.query(sql, (error) => {
                if (error) return reject(error);
                db.query('ALTER TABLE data_logbook_lab_user ADD COLUMN nim_atau_nik VARCHAR(50) NULL', (alterError) => {
                    if (alterError && alterError.code !== 'ER_DUP_FIELDNAME') return reject(alterError);
                    db.query('ALTER TABLE data_logbook_lab_user ADD COLUMN detail_aktivitas VARCHAR(255) NULL', (detailError) => {
                        if (detailError && detailError.code !== 'ER_DUP_FIELDNAME') return reject(detailError);
                        resolve();
                    });
                });
            });
        });
    }
    return tableReady;
}

exports.createLabLogbook = async (req, res) => {
    try {
        await ensureTable();
        const {
            researcherName, npm, room, institusi, prodi, proyekPenelitian,
            tanggalMulai, waktuMulai, tanggalSelesai, waktuSelesai,
            kegiatan, detailAktivitas, identitasFile, parafResearcherFile, parafPiFile, catatan
        } = req.body;

        if (!researcherName || !room || !proyekPenelitian || !tanggalMulai || !waktuMulai ||
            !tanggalSelesai || !waktuSelesai || !detailAktivitas || !identitasFile ||
            !parafResearcherFile || !parafPiFile) {
            return res.status(400).json({ message: 'Data logbook dan semua file wajib diisi' });
        }

        const sql = `INSERT INTO data_logbook_lab_user
            (sub_lab_lab_id, researcher_name, nim_atau_nik, institusi_atau_departemen, prodi,
             proyek_penelitian, periode_penelitian, waktu_mulai, waktu_selesai,
             detail_aktivitas, aktivitas_dilakukan, identitas_researcher, paraf_researcher, paraf_pi,
             catatan_tambahan)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            room, researcherName, npm || null, institusi || null, prodi || null,
            proyekPenelitian, `${tanggalMulai} - ${tanggalSelesai}`,
            `${tanggalMulai} ${waktuMulai}:00`, `${tanggalSelesai} ${waktuSelesai}:00`,
            detailAktivitas, detailAktivitas, identitasFile, parafResearcherFile, parafPiFile, catatan || null
        ];

        db.query(sql, values, (error, result) => {
            if (error) return res.status(500).json({ message: 'Gagal menyimpan logbook: ' + error.message });
            return res.status(201).json({ message: 'Logbook berhasil disimpan', id: result.insertId });
        });
    } catch (error) {
        return res.status(500).json({ message: 'Gagal menyiapkan tabel logbook: ' + error.message });
    }
};

exports.getLabLogbooks = async (req, res) => {
    try {
        await ensureTable();
        db.query('SELECT * FROM data_logbook_lab_user ORDER BY created_at DESC', (error, rows) => {
            if (error) return res.status(500).json({ message: 'Gagal mengambil logbook: ' + error.message });
            return res.json(rows);
        });
    } catch (error) {
        return res.status(500).json({ message: 'Gagal menyiapkan tabel logbook: ' + error.message });
    }
};