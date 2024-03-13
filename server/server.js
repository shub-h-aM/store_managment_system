const express = require('express');
const multer = require('multer');
const exceljs = require('exceljs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const path = require("path");
const fs = require('fs');

const app = express();
const port = 5000;


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.resolve(__dirname, '../upload_doc/uploads/');
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Shubham@21',
    database: 'store'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// API Endpoint to handle form submission
app.post('/api/user', (req, res) => {
    const { name, username, email, password, contactNumber } = req.body;
    const sql = 'INSERT INTO user (name, username, email, password, contactNumber) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, username, email, password, contactNumber], (err, result) => {
        if (err) {
            console.error('Error inserting form data:', err);
            res.status(500).json({ error: 'Error submitting form' });
            return;
        }
        console.log('Form data inserted successfully');
        res.status(200).json({ message: 'Form submitted successfully' });
    });
});

// API Endpoint to retrieve form data
app.get('/api/inventory', (req, res) => {
    const sql = 'SELECT * FROM user';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error retrieving form data:', err);
            res.status(500).json({ error: 'Error retrieving form data' });
            return;
        }
        console.log('Form data retrieved successfully');
        res.status(200).json(result);
    });
});

// API endpoint for uploading Excel file
app.post('/api/upload', upload.single('file'), (req, res) => {
    const workbook = new exceljs.Workbook();
    const filePath = path.join(__dirname, 'uploads', req.file.filename);

    if (!fs.existsSync(filePath)) {
        console.error('File not found:', filePath);
        return res.status(404).json({ message: 'File not found' });
    }

    workbook.xlsx.readFile(filePath)
        .then((worksheet) => {
            const sheet = worksheet.getWorksheet(1);
            const dataRows = [];

            // Iterate over each row starting from the second row (excluding the header row)
            for (let i = 2; i <= sheet.rowCount; i++) {
                const rowValues = sheet.getRow(i).values;
                const trimmedRow = rowValues.slice(1);
                dataRows.push(trimmedRow);
            }

            console.log('Data Rows:', dataRows);

            // Insert rows into MySQL database
            const query = 'INSERT INTO item (item, itemname, brand, itemcategory, supplier) VALUES (?, ?, ?, ?, ?)';
            dataRows.forEach(row => {
                db.query(query, row, (error, results) => {
                    if (error) {
                        console.error(error);
                        return res.status(500).json({ message: 'Internal server error' });
                    }
                    console.log('Inserted row:', row);
                });
            });

            res.json({ message: 'Data uploaded successfully' });
        })
        .catch((error) => {
            console.error('Error reading Excel file:', error);
            res.status(400).json({ message: 'Error parsing Excel file' });
        });
});

// API Endpoint to retrieve item data
app.get('/api/itemDetails', (req, res) => {
    const sql = 'SELECT * FROM item';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error retrieving form data:', err);
            res.status(500).json({ error: 'Error retrieving form data' });
            return;
        }
        console.log('Form data retrieved successfully');
        res.status(200).json(result);
    });
});



// Close the database connection when the server shuts down
process.on('SIGINT', () => {
    db.end((err) => {
        if (err) {
            console.error('Error closing MySQL connection:', err);
            process.exit(1);
        }
        console.log('MySQL connection closed');
        process.exit(0);
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});