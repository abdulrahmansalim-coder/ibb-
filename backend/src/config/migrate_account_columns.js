const db = require('./database');

const queries = [
    // 1. account_research
    "ALTER TABLE account_research ADD COLUMN IF NOT EXISTS institusi_departemen VARCHAR(150) NULL AFTER category",
    "ALTER TABLE account_research ADD COLUMN IF NOT EXISTS nim_atau_nik VARCHAR(50) NULL AFTER institusi_departemen",
    "ALTER TABLE account_research ADD COLUMN IF NOT EXISTS prodi VARCHAR(100) NULL AFTER nim_atau_nik",
    "ALTER TABLE account_research ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'researcher' AFTER prodi",

    // 2. account_laboran
    "ALTER TABLE account_laboran ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'laboran' AFTER password",
    "ALTER TABLE account_laboran ADD COLUMN IF NOT EXISTS institusi_departemen VARCHAR(150) DEFAULT 'Laboratorium ABEL FTUI' AFTER role",
    "ALTER TABLE account_laboran ADD COLUMN IF NOT EXISTS nip_atau_nik VARCHAR(50) NULL AFTER institusi_departemen",

    // 3. account_kepala_lab
    "ALTER TABLE account_kepala_lab ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'kepala_lab' AFTER password",
    "ALTER TABLE account_kepala_lab ADD COLUMN IF NOT EXISTS institusi_departemen VARCHAR(150) DEFAULT 'Laboratorium ABEL FTUI' AFTER role",
    "ALTER TABLE account_kepala_lab ADD COLUMN IF NOT EXISTS nip_atau_nik VARCHAR(50) NULL AFTER institusi_departemen"
];

async function migrate() {
    for (const q of queries) {
        await new Promise((resolve) => {
            db.query(q, (err, result) => {
                if (err) {
                    console.log('Info/Error on:', q, '->', err.message);
                } else {
                    console.log('✅ Executed:', q);
                }
                resolve();
            });
        });
    }

    db.query('DESCRIBE account_research', (err, rows) => {
        console.log('\n--- Struktur Baru account_research ---');
        console.table(rows.map(r => ({ Field: r.Field, Type: r.Type, Null: r.Null })));
        process.exit(0);
    });
}

migrate();
