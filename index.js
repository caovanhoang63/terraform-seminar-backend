const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/products', (req, res) => {
    pool.query('SELECT * FROM product', (err, rows, fields) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).send('An error occurred while fetching products');
            return;
        }
        res.send(rows);
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// Properly close the pool when the app is terminating
process.on('SIGINT', () => {
    pool.end(err => {
        if (err) {
            console.error('Error closing MySQL pool:', err);
        }
        console.log('MySQL pool closed');
        process.exit(0);
    });
});



