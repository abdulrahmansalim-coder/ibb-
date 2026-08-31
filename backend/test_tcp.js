const net = require('net');

console.log('Testing raw TCP connection to 127.0.0.1:3306...');
const client = net.createConnection({ host: '127.0.0.1', port: 3306 }, () => {
    console.log('✅ TCP connected to 127.0.0.1:3306!');
});

client.on('data', (data) => {
    console.log('✅ Received from MySQL server:', data.toString('utf8', 0, 50));
    client.end();
    process.exit(0);
});

client.on('error', (err) => {
    console.error('❌ TCP error:', err.message);
    process.exit(1);
});

setTimeout(() => {
    console.log('⏱️ TCP timeout after 4s');
    process.exit(1);
}, 4000);
