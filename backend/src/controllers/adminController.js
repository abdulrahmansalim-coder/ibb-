const db = require('../config/database');

// Initial seed data generator for Lab if table is empty
const seedInitialLabData = (callback) => {
    const labRooms = [
        'Lab 801 (Rekayasa Bioproses)',
        'Lab 802 (Bioproses Hilir)',
        'Lab 803 (Biologi Molekuler)',
        'Lab 804 (Kultur Jaringan)',
        'Lab 805 (Analisis Instrumental)',
        'Lab 806 (Bioinformatika)'
    ];
    const proyekList = [
        'Produksi Bioetanol dari Limbah Kelapa Sawit',
        'Ekstraksi Senyawa Bioaktif dari Tanaman Obat',
        'Fermentasi Asam Sitrat Menggunakan Aspergillus niger',
        'Purifikasi Protein Rekombinan untuk Aplikasi Biomedis',
        'Kultur Suspensi Sel Tanaman untuk Produksi Metabolit Sekunder'
    ];
    const aktivitasList = [
        'Analisis morfologik nanopartikel perak pada substrat polimer',
        'Karakterisasi SEM/EDX sampel biopolimer',
        'Uji FTIR untuk identifikasi gugus fungsi',
        'Pengujian aktivitas antioksidan DPPH',
        'Analisis XRD untuk struktur kristal',
        'Pengukuran viskositas larutan polimer'
    ];
    const namaList = [
        'Budi Santoso', 'Siti Rahayu', 'Ahmad Fauzi', 'Dewi Lestari',
        'Rizky Pratama', 'Maya Anggraini', 'Indra Wijaya', 'Fitri Handayani'
    ];
    const npmList = [
        '1906324551', '1906324552', '1906324553', '1906324554',
        '1906324555', '1906324556', '1906324557', '1906324558'
    ];
    const statusOptions = ['approved', 'pending', 'rejected'];

    const getCatatan = (status, index) => {
        if (status === 'approved') {
            return ['Hasil analisis sangat jelas.', 'Data telah diverifikasi.', 'Validasi berhasil.'][index % 3];
        } else if (status === 'rejected') {
            return ['Perlu validasi ulang.', 'Data tidak sesuai standar.', 'Perbaiki metode analisis.'][index % 3];
        } else {
            return ['Menunggu persetujuan.', 'Dalam proses review.', 'Pending approval.'][index % 3];
        }
    };

    const values = [];
    for (let i = 0; i < 8; i++) {
        const labIndex = i % labRooms.length;
        const statusIndex = i % statusOptions.length;
        const parafKLab = statusOptions[(statusIndex + 2) % 3];
        const parafLabr = statusOptions[(statusIndex + 1) % 3];
        const parafStud = statusOptions[statusIndex];

        values.push([
            1, // id_account_researcher
            `LAB-${801 + labIndex}`, // sub_lab_lab_id
            namaList[i % namaList.length], // researcher_name
            npmList[i % npmList.length], // nim_atau_nik
            'Universitas Indonesia', // institusi_atau_departemen
            'Teknik Bioproses', // prodi
            proyekList[i % proyekList.length], // proyek_penelitian
            `2023-05-${10 + i}`, // periode_penelitian
            `2023-05-${10 + i} 08:00:00`, // waktu_mulai
            `2023-05-${10 + i} 16:00:00`, // waktu_selesai
            `Aktivitas ${i + 1} - ${labRooms[labIndex]}`, // detail_aktivitas
            aktivitasList[i % aktivitasList.length], // aktivitas_dilakukan
            namaList[i % namaList.length], // identitas_researcher
            parafStud, // paraf_student
            'approved', // paraf_pi
            parafLabr, // paraf_laboran
            parafKLab, // paraf_kepala_lab
            parafStud, // status_paraf_researcher
            parafLabr, // status_paraf_laboran
            parafKLab, // status_paraf_kepala_lab
            getCatatan(parafStud, i + 2), // catatan_tambahan
            getCatatan(parafLabr, i + 1), // catatan_laboran
            getCatatan(parafKLab, i) // catatan_kepala_lab
        ]);
    }

    const insertSql = `
        INSERT INTO data_logbook_lab_user (
            id_account_researcher, sub_lab_lab_id, researcher_name, nim_atau_nik,
            institusi_atau_departemen, prodi, proyek_penelitian, periode_penelitian,
            waktu_mulai, waktu_selesai, detail_aktivitas, aktivitas_dilakukan,
            identitas_researcher, paraf_student, paraf_pi, paraf_laboran, paraf_kepala_lab,
            status_paraf_researcher, status_paraf_laboran, status_paraf_kepala_lab,
            catatan_tambahan, catatan_laboran, catatan_kepala_lab
        ) VALUES ?
    `;

    db.query(insertSql, [values], (err, results) => {
        if (err) {
            console.error('Error seeding lab data:', err.message);
            if (callback) callback(err);
        } else {
            console.log('✅ Initial lab logbook seed data created');
            if (callback) callback(null, results);
        }
    });
};

// Initial seed data generator for Alat if table is empty
const seedInitialAlatData = (callback) => {
    const alatRooms = [
        'Spectrophotometer UV-Vis (ABEL-01)',
        'HPLC System (ABEL-02)',
        'Gas Chromatography (ABEL-03)',
        'Freeze Dryer (ABEL-04)',
        'Rotary Evaporator (ABEL-05)',
        'Autoclave Vertical (ABEL-06)'
    ];
    const namaList = [
        'Budi Santoso', 'Siti Rahayu', 'Ahmad Fauzi', 'Dewi Lestari',
        'Rizky Pratama', 'Maya Anggraini', 'Indra Wijaya', 'Fitri Handayani'
    ];
    const npmList = [
        '1906324551', '1906324552', '1906324553', '1906324554',
        '1906324555', '1906324556', '1906324557', '1906324558'
    ];
    const statusOptions = ['approved', 'pending', 'rejected'];

    const values = [];
    for (let i = 0; i < 8; i++) {
        const alatIndex = i % alatRooms.length;
        const statusKLab = statusOptions[(i + 1) % 3];
        const statusLabr = statusOptions[i % 3];
        const statusStud = 'approved';

        values.push([
            1, // id_account_researcher
            `ALAT-${101 + alatIndex}`, // sub_lab_alat_id
            namaList[i % namaList.length], // nama_lengkap
            npmList[i % npmList.length], // nim_atau_nik
            'Universitas Indonesia', // institusi_departemen
            'Teknik Kimia / Bioproses', // prodi
            `2023-05-${10 + i}`, // periode_penggunaan_alat
            `2023-05-${10 + i} 09:00:00`, // waktu_mulai
            `2023-05-${10 + i} 15:00:00`, // waktu_selesai
            namaList[i % namaList.length], // nama_researcher
            'Sampel Bioetanol / Ekstrak Herbal', // jenis_sample
            'Pengujian Spektrofotometri & Kromatografi', // jenis_pengujian
            'Karakterisasi senyawa aktif', // tujuan_pengujian
            'Alat dalam kondisi baik dan berfungsi normal', // kondisi_teknis
            statusStud, // paraf_student
            statusLabr, // paraf_laboran
            statusKLab, // paraf_kepala_lab
            statusStud, // status_paraf_student
            statusLabr, // status_paraf_laboran
            statusKLab, // status_paraf_kepala_lab
            'Tidak ada kendala pada alat', // catatan_tambahan
            `Catatan laboran untuk penggunaan alat ${i + 1}`, // catatan_laboran
            `Data divalidasi oleh Kepala Lab (${i + 1})` // catatan_kepala_lab
        ]);
    }

    const insertSql = `
        INSERT INTO data_logbook_alat_user (
            id_account_researcher, sub_lab_alat_id, nama_lengkap, nim_atau_nik,
            institusi_departemen, prodi, periode_penggunaan_alat, waktu_mulai, waktu_selesai,
            nama_researcher, jenis_sample, jenis_pengujian, tujuan_pengujian,
            kondisi_teknis, paraf_student, paraf_laboran, paraf_kepala_lab,
            status_paraf_student, status_paraf_laboran, status_paraf_kepala_lab,
            catatan_tambahan, catatan_laboran, catatan_kepala_lab
        ) VALUES ?
    `;

    db.query(insertSql, [values], (err, results) => {
        if (err) {
            console.error('Error seeding alat data:', err.message);
            if (callback) callback(err);
        } else {
            console.log('✅ Initial alat logbook seed data created');
            if (callback) callback(null, results);
        }
    });
};

// ==========================================
// 1. LOGBOOK LAB CONTROLLERS
// ==========================================

// Get All Lab Logbooks
exports.getAllLogbookLab = (req, res) => {
    const query = 'SELECT * FROM data_logbook_lab_user ORDER BY logbook_lab_id DESC';
    db.query(query, (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error: ' + err.message });
        }

        if (rows.length === 0) {
            // Seed initial data if empty
            seedInitialLabData((seedErr) => {
                if (seedErr) {
                    return res.status(500).json({ success: false, message: 'Error seeding data: ' + seedErr.message });
                }
                db.query(query, (err2, newRows) => {
                    if (err2) {
                        return res.status(500).json({ success: false, message: 'Database error: ' + err2.message });
                    }
                    return res.json({ success: true, data: newRows });
                });
            });
        } else {
            return res.json({ success: true, data: rows });
        }
    });
};

// Get Single Lab Logbook by ID
exports.getLogbookLabById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM data_logbook_lab_user WHERE logbook_lab_id = ?';
    db.query(query, [id], (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error: ' + err.message });
        }
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Data logbook lab tidak ditemukan' });
        }
        return res.json({ success: true, data: rows[0] });
    });
};

// Create New Lab Logbook (from Researcher)
exports.createLogbookLab = (req, res) => {
    const {
        id_account_researcher,
        sub_lab_lab_id,
        researcher_name,
        nim_atau_nik,
        institusi_atau_departemen,
        prodi,
        proyek_penelitian,
        periode_penelitian,
        waktu_mulai,
        waktu_selesai,
        detail_aktivitas,
        aktivitas_dilakukan,
        identitas_researcher,
        paraf_student,
        catatan_tambahan
    } = req.body;

    const sql = `
        INSERT INTO data_logbook_lab_user (
            id_account_researcher, sub_lab_lab_id, researcher_name, nim_atau_nik,
            institusi_atau_departemen, prodi, proyek_penelitian, periode_penelitian,
            waktu_mulai, waktu_selesai, detail_aktivitas, aktivitas_dilakukan,
            identitas_researcher, paraf_student, status_paraf_researcher,
            catatan_tambahan, status_paraf_laboran, status_paraf_kepala_lab
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'signed', ?, 'pending', 'pending')
    `;

    const values = [
        id_account_researcher || null,
        sub_lab_lab_id || null,
        researcher_name || 'Peneliti',
        nim_atau_nik || '-',
        institusi_atau_departemen || '-',
        prodi || '-',
        proyek_penelitian || '-',
        periode_penelitian || '-',
        waktu_mulai || new Date(),
        waktu_selesai || new Date(),
        detail_aktivitas || '-',
        aktivitas_dilakukan || '-',
        identitas_researcher || researcher_name,
        paraf_student || null,
        catatan_tambahan || ''
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error: ' + err.message });
        }
        return res.status(201).json({
            success: true,
            message: 'Logbook lab berhasil disimpan',
            logbook_lab_id: result.insertId
        });
    });
};

// Update Catatan & Paraf Lab (by Kepala Lab or Laboran)
exports.updateLabReview = (req, res) => {
    const { id } = req.params;
    const {
        role, // 'kepala_lab' or 'laboran'
        catatan,
        paraf,
        status, // 'approved', 'rejected', or 'pending'
        id_account
    } = req.body;

    if (!role) {
        return res.status(400).json({ success: false, message: 'Role (kepala_lab atau laboran) wajib disertakan' });
    }

    let updateFields = [];
    let updateValues = [];

    const normRole = role.toLowerCase().trim();

    if (normRole === 'kepala_lab') {
        if (catatan !== undefined) {
            updateFields.push('catatan_kepala_lab = ?');
            updateValues.push(catatan);
        }
        if (paraf !== undefined) {
            updateFields.push('paraf_kepala_lab = ?');
            updateValues.push(paraf);
        }
        if (status !== undefined) {
            updateFields.push('status_paraf_kepala_lab = ?');
            updateValues.push(status.toLowerCase());
        }
        if (id_account) {
            updateFields.push('id_account_kepala_lab = ?');
            updateValues.push(id_account);
        }
    } else if (normRole === 'laboran') {
        if (catatan !== undefined) {
            updateFields.push('catatan_laboran = ?');
            updateValues.push(catatan);
        }
        if (paraf !== undefined) {
            updateFields.push('paraf_laboran = ?');
            updateValues.push(paraf);
        }
        if (status !== undefined) {
            updateFields.push('status_paraf_laboran = ?');
            updateValues.push(status.toLowerCase());
        }
        if (id_account) {
            updateFields.push('id_account_laboran = ?');
            updateValues.push(id_account);
        }
    } else {
        return res.status(400).json({ success: false, message: 'Role tidak valid' });
    }

    if (updateFields.length === 0) {
        return res.status(400).json({ success: false, message: 'Tidak ada data catatan/paraf yang diupdate' });
    }

    updateValues.push(id);

    const updateSql = `
        UPDATE data_logbook_lab_user 
        SET ${updateFields.join(', ')}, updated_at = NOW() 
        WHERE logbook_lab_id = ?
    `;

    db.query(updateSql, updateValues, (err, result) => {
        if (err) {
            console.error('Error update lab review:', err.message);
            return res.status(500).json({ success: false, message: 'Database error: ' + err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Data logbook lab tidak ditemukan' });
        }

        // Insert to history audit table if applicable
        if (normRole === 'kepala_lab') {
            const auditSql = `
                INSERT INTO admin_logbook_lab_kepala_lab (logbook_lab_id, id_account_kepala_lab, Paraf, Catatan)
                VALUES (?, ?, ?, ?)
            `;
            db.query(auditSql, [id, id_account || null, paraf || status || null, catatan || null]);
        } else {
            const auditSql = `
                INSERT INTO admin_logbook_lab_laboran (logbook_lab_id, id_account_laboran, Paraf, Catatan)
                VALUES (?, ?, ?, ?)
            `;
            db.query(auditSql, [id, id_account || null, paraf || status || null, catatan || null]);
        }

        return res.json({
            success: true,
            message: `Catatan dan paraf ${normRole === 'kepala_lab' ? 'Kepala Lab' : 'Laboran'} berhasil disimpan ke logbook dan database!`
        });
    });
};

// ==========================================
// 2. LOGBOOK ALAT CONTROLLERS
// ==========================================

// Get All Alat Logbooks
exports.getAllLogbookAlat = (req, res) => {
    const query = 'SELECT * FROM data_logbook_alat_user ORDER BY logbook_id DESC';
    db.query(query, (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error: ' + err.message });
        }

        if (rows.length === 0) {
            // Seed initial data if empty
            seedInitialAlatData((seedErr) => {
                if (seedErr) {
                    return res.status(500).json({ success: false, message: 'Error seeding data: ' + seedErr.message });
                }
                db.query(query, (err2, newRows) => {
                    if (err2) {
                        return res.status(500).json({ success: false, message: 'Database error: ' + err2.message });
                    }
                    return res.json({ success: true, data: newRows });
                });
            });
        } else {
            return res.json({ success: true, data: rows });
        }
    });
};

// Get Single Alat Logbook by ID
exports.getLogbookAlatById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM data_logbook_alat_user WHERE logbook_id = ?';
    db.query(query, [id], (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error: ' + err.message });
        }
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Data logbook alat tidak ditemukan' });
        }
        return res.json({ success: true, data: rows[0] });
    });
};

// Create New Alat Logbook (from Researcher)
exports.createLogbookAlat = (req, res) => {
    const {
        id_account_researcher,
        sub_lab_alat_id,
        nama_lengkap,
        nim_atau_nik,
        institusi_departemen,
        prodi,
        periode_penggunaan_alat,
        waktu_mulai,
        waktu_selesai,
        nama_researcher,
        jenis_sample,
        jenis_pengujian,
        tujuan_pengujian,
        kondisi_teknis,
        paraf_student,
        catatan_tambahan
    } = req.body;

    const sql = `
        INSERT INTO data_logbook_alat_user (
            id_account_researcher, sub_lab_alat_id, nama_lengkap, nim_atau_nik,
            institusi_departemen, prodi, periode_penggunaan_alat, waktu_mulai, waktu_selesai,
            nama_researcher, jenis_sample, jenis_pengujian, tujuan_pengujian,
            kondisi_teknis, paraf_student, status_paraf_student,
            catatan_tambahan, status_paraf_laboran, status_paraf_kepala_lab
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'signed', ?, 'pending', 'pending')
    `;

    const values = [
        id_account_researcher || null,
        sub_lab_alat_id || null,
        nama_lengkap || 'Peneliti',
        nim_atau_nik || '-',
        institusi_departemen || '-',
        prodi || '-',
        periode_penggunaan_alat || '-',
        waktu_mulai || new Date(),
        waktu_selesai || new Date(),
        nama_researcher || nama_lengkap,
        jenis_sample || '-',
        jenis_pengujian || '-',
        tujuan_pengujian || '-',
        kondisi_teknis || '-',
        paraf_student || null,
        catatan_tambahan || ''
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error: ' + err.message });
        }
        return res.status(201).json({
            success: true,
            message: 'Logbook alat berhasil disimpan',
            logbook_id: result.insertId
        });
    });
};

// Update Catatan & Paraf Alat (by Kepala Lab or Laboran)
exports.updateAlatReview = (req, res) => {
    const { id } = req.params;
    const {
        role, // 'kepala_lab' or 'laboran'
        catatan,
        paraf,
        status, // 'approved', 'rejected', or 'pending'
        id_account
    } = req.body;

    if (!role) {
        return res.status(400).json({ success: false, message: 'Role (kepala_lab atau laboran) wajib disertakan' });
    }

    let updateFields = [];
    let updateValues = [];

    const normRole = role.toLowerCase().trim();

    if (normRole === 'kepala_lab') {
        if (catatan !== undefined) {
            updateFields.push('catatan_kepala_lab = ?');
            updateValues.push(catatan);
        }
        if (paraf !== undefined) {
            updateFields.push('paraf_kepala_lab = ?');
            updateValues.push(paraf);
        }
        if (status !== undefined) {
            updateFields.push('status_paraf_kepala_lab = ?');
            updateValues.push(status.toLowerCase());
        }
        if (id_account) {
            updateFields.push('id_account_kepala_lab = ?');
            updateValues.push(id_account);
        }
    } else if (normRole === 'laboran') {
        if (catatan !== undefined) {
            updateFields.push('catatan_laboran = ?');
            updateValues.push(catatan);
        }
        if (paraf !== undefined) {
            updateFields.push('paraf_laboran = ?');
            updateValues.push(paraf);
        }
        if (status !== undefined) {
            updateFields.push('status_paraf_laboran = ?');
            updateValues.push(status.toLowerCase());
        }
        if (id_account) {
            updateFields.push('id_account_laboran = ?');
            updateValues.push(id_account);
        }
    } else {
        return res.status(400).json({ success: false, message: 'Role tidak valid' });
    }

    if (updateFields.length === 0) {
        return res.status(400).json({ success: false, message: 'Tidak ada data catatan/paraf yang diupdate' });
    }

    updateValues.push(id);

    const updateSql = `
        UPDATE data_logbook_alat_user 
        SET ${updateFields.join(', ')}, updated_at = NOW() 
        WHERE logbook_id = ?
    `;

    db.query(updateSql, updateValues, (err, result) => {
        if (err) {
            console.error('Error update alat review:', err.message);
            return res.status(500).json({ success: false, message: 'Database error: ' + err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Data logbook alat tidak ditemukan' });
        }

        // Insert to history audit table if applicable
        if (normRole === 'kepala_lab') {
            const auditSql = `
                INSERT INTO admin_logbook_alat_kepala_lab (logbook_id, id_account_kepala_lab, Paraf, Catatan)
                VALUES (?, ?, ?, ?)
            `;
            db.query(auditSql, [id, id_account || null, paraf || status || null, catatan || null]);
        } else {
            const auditSql = `
                INSERT INTO admin_logbook_alat_laboran (logbook_id, id_account_laboran, Paraf, Catatan)
                VALUES (?, ?, ?, ?)
            `;
            db.query(auditSql, [id, id_account || null, paraf || status || null, catatan || null]);
        }

        return res.json({
            success: true,
            message: `Catatan dan paraf ${normRole === 'kepala_lab' ? 'Kepala Lab' : 'Laboran'} berhasil disimpan ke logbook dan database!`
        });
    });
};