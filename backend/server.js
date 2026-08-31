const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware global
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ✅ Import Routes
const authRoutes = require('./src/routes/authRoutes');
const logbookRoutes = require('./src/routes/logbookRoutes');
const alatLogbookRoutes = require('./src/routes/alatLogbookRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

// ✅ Gunakan Routes
app.use('/api/auth', authRoutes);
app.use('/api/logbooks', logbookRoutes);
app.use('/api/logbooks', alatLogbookRoutes);
app.use('/api/admin', adminRoutes); // Tambahkan ini

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Backend Express berjalan di port ${PORT}`);
    console.log(`📋 Admin routes: http://localhost:${PORT}/api/admin`);
    console.log(`🔐 Auth routes: http://localhost:${PORT}/api/auth`);
});