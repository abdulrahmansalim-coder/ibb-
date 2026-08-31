const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// =====================================================
// LOGIN
// =====================================================

exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Email dan password wajib diisi'
        });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    console.log("📩 Menerima request login untuk email:", cleanEmail);
    console.log("🔑 Password length:", cleanPassword.length);

    // =====================================================
    // CEK ACCOUNT RESEARCHER
    // =====================================================

    const researcherSQL = `
        SELECT
            id_account_researcher AS id,
            full_name AS nama_lengkap,
            email,
            password,
            category AS role
        FROM account_research
        WHERE LOWER(TRIM(email)) = ?
    `;

    console.log("🔍 Mengecek akun researcher...");

    db.query(researcherSQL, [cleanEmail], (err, researcherRows) => {
        if (err) {
            console.error("❌ Error account_research:", err.message);
            return res.status(500).json({
                message: 'Database error: ' + err.message
            });
        }

        if (researcherRows.length > 0) {
            console.log("👤 Akun ditemukan di account_research");
            return prosesLogin(researcherRows[0], 'researcher');
        }

        // =================================================
        // CEK ACCOUNT LABORAN
        // =================================================
        const laboranSQL = `
            SELECT
                id_account_laboran AS id,
                nama_lengkap,
                email,
                password,
                COALESCE(role, 'laboran') AS role
            FROM account_laboran
            WHERE LOWER(TRIM(email)) = ?
        `;

        console.log("🔍 Researcher tidak ditemukan. Mengecek akun laboran...");

        db.query(laboranSQL, [cleanEmail], (err, laboranRows) => {
            if (err) {
                console.error("❌ Error account_laboran:", err.message);
                return res.status(500).json({
                    message: 'Database error: ' + err.message
                });
            }

            if (laboranRows.length > 0) {
                console.log("👤 Akun ditemukan di account_laboran");
                console.log("📧 Email di database:", laboranRows[0].email);
                
                const isMatch = bcrypt.compareSync(cleanPassword, laboranRows[0].password);
                console.log("🔐 Hasil pengecekan password:", isMatch);
                
                if (isMatch) {
                    return prosesLogin(laboranRows[0], 'laboran');
                } else {
                    console.log("❌ Password salah untuk laboran");
                    return res.status(401).json({
                        message: 'Password salah'
                    });
                }
            }

            // =============================================
            // CEK ACCOUNT KEPALA LAB
            // =============================================
            const kepalaLabSQL = `
                SELECT
                    id_account_kepala_lab AS id,
                    nama_lengkap,
                    email,
                    password,
                    COALESCE(role, 'kepala_lab') AS role
                FROM account_kepala_lab
                WHERE LOWER(TRIM(email)) = ?
            `;

            console.log("🔍 Laboran tidak ditemukan. Mengecek akun kepala lab...");

            db.query(kepalaLabSQL, [cleanEmail], (err, kepalaLabRows) => {
                if (err) {
                    console.error("❌ Error account_kepala_lab:", err.message);
                    return res.status(500).json({
                        message: 'Database error: ' + err.message
                    });
                }

                if (kepalaLabRows.length > 0) {
                    console.log("👤 Akun ditemukan di account_kepala_lab");
                    
                    const isMatch = bcrypt.compareSync(cleanPassword, kepalaLabRows[0].password);
                    console.log("🔐 Hasil pengecekan password:", isMatch);
                    
                    if (isMatch) {
                        return prosesLogin(kepalaLabRows[0], 'kepala_lab');
                    } else {
                        console.log("❌ Password salah untuk kepala lab");
                        return res.status(401).json({
                            message: 'Password salah'
                        });
                    }
                }

                // =========================================
                // TIDAK ADA AKUN
                // =========================================
                console.log("❌ Email tidak ditemukan di semua tabel:", cleanEmail);
                return res.status(401).json({
                    message: 'Email tidak ditemukan'
                });
            });
        });
    });

    // =====================================================
    // FUNCTION PROSES LOGIN
    // =====================================================

    function prosesLogin(user, role) {
        console.log("✅ Login berhasil untuk:", user.email, "| Role:", role);

        // Cek JWT SECRET
        if (!process.env.JWT_SECRET) {
            console.error("❌ JWT_SECRET tidak ditemukan!");
            return res.status(500).json({
                message: 'JWT_SECRET belum dikonfigurasi'
            });
        }

        // Buat JWT
        const token = jwt.sign(
            {
                id: user.id,
                role: role,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );

        console.log("✅ Token JWT berhasil dibuat");

        return res.json({
            message: 'Login berhasil',
            token,
            user: {
                id: user.id,
                nama: user.nama_lengkap,
                email: user.email,
                role: role
            }
        });
    }
};

// =====================================================
// REGISTER RESEARCHER
// =====================================================

exports.register = (req, res) => {
    const { fullName, nama_lengkap, email, password, institusi_departemen, nim_atau_nik, prodi } = req.body;
    const name = fullName ? fullName.trim() : (nama_lengkap ? nama_lengkap.trim() : '');
    const cleanEmail = email ? email.trim().toLowerCase() : '';
    const cleanPassword = password ? password.trim() : '';

    console.log("📝 Menerima request register researcher untuk email:", cleanEmail, "| Nama:", name);

    if (!name || !cleanEmail || !cleanPassword) {
        return res.status(400).json({
            message: 'Nama lengkap, email, dan password wajib diisi'
        });
    }

    if (cleanPassword.length < 6) {
        return res.status(400).json({
            message: 'Password minimal 6 karakter'
        });
    }

    // Cek email terdaftar
    const checkResearcherSQL = "SELECT email FROM account_research WHERE LOWER(TRIM(email)) = ?";
    const checkLaboranSQL = "SELECT email FROM account_laboran WHERE LOWER(TRIM(email)) = ?";
    const checkKepalaLabSQL = "SELECT email FROM account_kepala_lab WHERE LOWER(TRIM(email)) = ?";

    db.query(checkResearcherSQL, [cleanEmail], (err, rRows) => {
        if (err) {
            console.error("❌ Database error saat cek email researcher:", err.message);
            return res.status(500).json({ message: 'Database error: ' + err.message });
        }
        if (rRows.length > 0) {
            return res.status(400).json({ message: 'Email sudah terdaftar sebagai researcher' });
        }

        db.query(checkLaboranSQL, [cleanEmail], (err, lRows) => {
            if (err) {
                console.error("❌ Database error saat cek email laboran:", err.message);
                return res.status(500).json({ message: 'Database error: ' + err.message });
            }
            if (lRows.length > 0) {
                return res.status(400).json({ message: 'Email sudah terdaftar sebagai laboran' });
            }

            db.query(checkKepalaLabSQL, [cleanEmail], (err, kRows) => {
                if (err) {
                    console.error("❌ Database error saat cek email kepala lab:", err.message);
                    return res.status(500).json({ message: 'Database error: ' + err.message });
                }
                if (kRows.length > 0) {
                    return res.status(400).json({ message: 'Email sudah terdaftar sebagai kepala lab' });
                }

                const hashedPassword = bcrypt.hashSync(cleanPassword, 10);

                const insertSQL = `
                    INSERT INTO account_research (full_name, email, password, category, institusi_departemen, nim_atau_nik, prodi)
                    VALUES (?, ?, ?, 'researcher', ?, ?, ?)
                `;

                db.query(insertSQL, [name, cleanEmail, hashedPassword, institusi_departemen || null, nim_atau_nik || null, prodi || null], (err, result) => {
                    if (err) {
                        console.error("❌ Gagal menyimpan akun researcher ke database:", err.message);
                        return res.status(500).json({ message: 'Gagal membuat akun: ' + err.message });
                    }

                    console.log(`✅ Berhasil mendaftarkan researcher ID: ${result.insertId} (${cleanEmail})`);

                    return res.status(201).json({
                        message: 'Registrasi researcher berhasil',
                        user: {
                            id: result.insertId,
                            nama: name,
                            email: cleanEmail,
                            role: 'researcher'
                        }
                    });
                });
            });
        });
    });
};

// =====================================================
// REGISTER LABORAN
// =====================================================

exports.registerLaboran = (req, res) => {
    // PERBAIKI: Gunakan 'full_name' sesuai dengan struktur database
    const { full_name, email, password, no_telepon, alamat, tanggal_masuk } = req.body;
    const name = full_name ? full_name.trim() : '';
    const cleanEmail = email ? email.trim().toLowerCase() : '';
    const cleanPassword = password ? password.trim() : '';

    console.log("📝 Menerima request register laboran untuk email:", cleanEmail, "| Nama:", name);

    if (!name || !cleanEmail || !cleanPassword) {
        return res.status(400).json({
            message: 'Nama lengkap, email, dan password wajib diisi'
        });
    }

    if (cleanPassword.length < 6) {
        return res.status(400).json({
            message: 'Password minimal 6 karakter'
        });
    }

    const checkResearcherSQL = "SELECT email FROM account_research WHERE LOWER(TRIM(email)) = ?";
    const checkLaboranSQL = "SELECT email FROM account_laboran WHERE LOWER(TRIM(email)) = ?";
    const checkKepalaLabSQL = "SELECT email FROM account_kepala_lab WHERE LOWER(TRIM(email)) = ?";

    db.query(checkResearcherSQL, [cleanEmail], (err, rRows) => {
        if (err) {
            console.error("❌ Database error saat cek email researcher:", err.message);
            return res.status(500).json({ message: 'Database error: ' + err.message });
        }
        if (rRows.length > 0) {
            return res.status(400).json({ message: 'Email sudah terdaftar sebagai researcher' });
        }

        db.query(checkLaboranSQL, [cleanEmail], (err, lRows) => {
            if (err) {
                console.error("❌ Database error saat cek email laboran:", err.message);
                return res.status(500).json({ message: 'Database error: ' + err.message });
            }
            if (lRows.length > 0) {
                return res.status(400).json({ message: 'Email sudah terdaftar sebagai laboran' });
            }

            db.query(checkKepalaLabSQL, [cleanEmail], (err, kRows) => {
                if (err) {
                    console.error("❌ Database error saat cek email kepala lab:", err.message);
                    return res.status(500).json({ message: 'Database error: ' + err.message });
                }
                if (kRows.length > 0) {
                    return res.status(400).json({ message: 'Email sudah terdaftar sebagai kepala lab' });
                }

                const hashedPassword = bcrypt.hashSync(cleanPassword, 10);

                // PERBAIKI: Gunakan 'full_name' sesuai struktur database
                const insertSQL = `
                    INSERT INTO account_laboran (
                        full_name,  -- PERBAIKI: gunakan full_name
                        email, 
                        password, 
                        role,
                        no_telepon,
                        alamat,
                        tanggal_masuk
                    ) VALUES (?, ?, ?, 'laboran', ?, ?, ?)
                `;

                db.query(insertSQL, [name, cleanEmail, hashedPassword, no_telepon || null, alamat || null, tanggal_masuk || null], (err, result) => {
                    if (err) {
                        console.error("❌ Gagal menyimpan akun laboran ke database:", err.message);
                        return res.status(500).json({ message: 'Gagal membuat akun: ' + err.message });
                    }

                    console.log(`✅ Berhasil mendaftarkan laboran ID: ${result.insertId} (${cleanEmail})`);

                    return res.status(201).json({
                        message: 'Registrasi laboran berhasil',
                        user: {
                            id: result.insertId,
                            nama: name,
                            email: cleanEmail,
                            role: 'laboran'
                        }
                    });
                });
            });
        });
    });
};

// =====================================================
// REGISTER KEPALA LAB
// =====================================================

exports.registerKepalaLab = (req, res) => {
    // PERBAIKI: Gunakan 'full_name' sesuai dengan struktur database
    const { full_name, email, password, no_telepon, alamat, tanggal_bergabung, spesialisasi } = req.body;
    const name = full_name ? full_name.trim() : '';
    const cleanEmail = email ? email.trim().toLowerCase() : '';
    const cleanPassword = password ? password.trim() : '';

    console.log("📝 Menerima request register kepala lab untuk email:", cleanEmail, "| Nama:", name);

    if (!name || !cleanEmail || !cleanPassword) {
        return res.status(400).json({
            message: 'Nama lengkap, email, dan password wajib diisi'
        });
    }

    if (cleanPassword.length < 6) {
        return res.status(400).json({
            message: 'Password minimal 6 karakter'
        });
    }

    const checkResearcherSQL = "SELECT email FROM account_research WHERE LOWER(TRIM(email)) = ?";
    const checkLaboranSQL = "SELECT email FROM account_laboran WHERE LOWER(TRIM(email)) = ?";
    const checkKepalaLabSQL = "SELECT email FROM account_kepala_lab WHERE LOWER(TRIM(email)) = ?";

    db.query(checkResearcherSQL, [cleanEmail], (err, rRows) => {
        if (err) {
            console.error("❌ Database error saat cek email researcher:", err.message);
            return res.status(500).json({ message: 'Database error: ' + err.message });
        }
        if (rRows.length > 0) {
            return res.status(400).json({ message: 'Email sudah terdaftar sebagai researcher' });
        }

        db.query(checkLaboranSQL, [cleanEmail], (err, lRows) => {
            if (err) {
                console.error("❌ Database error saat cek email laboran:", err.message);
                return res.status(500).json({ message: 'Database error: ' + err.message });
            }
            if (lRows.length > 0) {
                return res.status(400).json({ message: 'Email sudah terdaftar sebagai laboran' });
            }

            db.query(checkKepalaLabSQL, [cleanEmail], (err, kRows) => {
                if (err) {
                    console.error("❌ Database error saat cek email kepala lab:", err.message);
                    return res.status(500).json({ message: 'Database error: ' + err.message });
                }
                if (kRows.length > 0) {
                    return res.status(400).json({ message: 'Email sudah terdaftar sebagai kepala lab' });
                }

                const hashedPassword = bcrypt.hashSync(cleanPassword, 10);

                // PERBAIKI: Gunakan 'full_name' sesuai struktur database
                const insertSQL = `
                    INSERT INTO account_kepala_lab (
                        full_name,  -- PERBAIKI: gunakan full_name
                        email, 
                        password, 
                        role,
                        no_telepon,
                        alamat,
                        tanggal_bergabung,
                        spesialisasi
                    ) VALUES (?, ?, ?, 'kepala_lab', ?, ?, ?, ?)
                `;

                db.query(insertSQL, [name, cleanEmail, hashedPassword, no_telepon || null, alamat || null, tanggal_bergabung || null, spesialisasi || null], (err, result) => {
                    if (err) {
                        console.error("❌ Gagal menyimpan akun kepala lab ke database:", err.message);
                        return res.status(500).json({ message: 'Gagal membuat akun: ' + err.message });
                    }

                    console.log(`✅ Berhasil mendaftarkan kepala lab ID: ${result.insertId} (${cleanEmail})`);

                    return res.status(201).json({
                        message: 'Registrasi kepala lab berhasil',
                        user: {
                            id: result.insertId,
                            nama: name,
                            email: cleanEmail,
                            role: 'kepala_lab'
                        }
                    });
                });
            });
        });
    });
};