const mysql = require('mysql');
require('dotenv').config();

console.log('Connecting to MySQL with config:', {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306
});

const connection = mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME,
    port: 3306,
    connectTimeout: 5000
});

connection.connect((err) => {
    if (err) {
        console.error('❌ Connection error message:', err.message);
        console.error('❌ Error code:', err.code);
        process.exit(1);
    } else {
        console.log('✅ Connection successful!');
        connection.query('SHOW TABLES', (err, rows) => {
            if (err) {
                console.error('❌ Query error:', err.message);
            } else {
                console.log('✅ Tables in DB:', rows);
            }
            connection.end();
            process.exit(0);
        });
    }
});
