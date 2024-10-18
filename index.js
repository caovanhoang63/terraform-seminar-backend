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
    res.send([
        {name: "carrot",price: "10",unit:"kg"},
        {name: "chili",price: "11",unit:"kg"},
        {name: "mango",price: "2",unit:"kg"}
    ]);
});

app.get('/db-check', (req, res) => {
    pool.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).send('An error occurred while fetching database');
        }

        console.log('The solution is: ', rows[0].solution)
        res.send("connect database success")
    })
})

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



