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
        console.log('Destination Path:', destinationPath);
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
app.post('/api/signup', (req, res) => {
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



app.post('/api/item', (req, res) => {
    const { date_of_purchase, item, item_type, brand, item_category, qty, total_amount, total_gst, location, supplier } = req.body;
    const sql = 'INSERT INTO item (date_of_purchase, item, item_type, brand, item_category, qty, total_amount, total_gst, location, supplier) VALUES (?, ?, ?, ?, ?,?, ?, ?, ?, ?)';
    db.query(sql, [date_of_purchase, item, item_type, brand, item_category, qty, total_amount, total_gst, location, supplier], (err, result) => {
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
app.get('/api/userDetails', (req, res) => {
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

// Login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM user WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Error logging in' });
            return;
        }
        if (result.length > 0) {
            // User found, login successful
            const loggedInUser = result[0]; // Assuming username is unique, so we take the first user from the result
            res.status(200).json({ message: 'Login successful', username: loggedInUser.username });

        } else {
            // User not found or invalid credentials
            res.status(401).json({ error: 'Invalid username or password' });
        }
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

            const query = 'INSERT INTO item (date_of_purchase, item, item_type, brand, item_category, qty, total_amount, total_gst, location, supplier) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
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

app.post('/api/invoices', (req, res) => {
    const { customer_name, invoice_number, items } = req.body;

    const sql = 'INSERT INTO invoices (customer_name, invoice_number, item_name, rate, quantity, amount) VALUES (?, ?, ?, ?, ?, ?)';

    const promises = [];

    items.forEach(item => {
        const promise = new Promise((resolve, reject) => {
            db.query(sql, [customer_name, invoice_number, item.itemName, item.rate, item.quantity, item.amount], (err, result) => {
                if (err) {
                    console.error('Error inserting invoice data:', err);
                    reject(err);
                    return;
                }
                console.log('Invoice item inserted successfully');
                resolve();
            });
        });
        promises.push(promise);
    });

    Promise.all(promises)
        .then(() => {
            console.log('All invoice items inserted successfully');
            res.status(200).json({ message: 'All invoice items inserted successfully' });
        })
        .catch(error => {
            console.error('Error inserting invoice data:', error);
            res.status(500).json({ error: 'Error creating invoice' });
        });
});

app.post('/api/invoice_transaction', (req, res) => {
    const { customer_name, invoice_number, sub_total, discount_amount, tax_amount, total, paid_amount, due_amount,date_of_due } = req.body;

    const sql = 'INSERT INTO invoice_transaction (customer_name, invoice_number, sub_total, discount_amount, tax_amount, total, paid_amount, due_amount, date_of_due) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(sql, [customer_name, invoice_number, sub_total, discount_amount, tax_amount, total, paid_amount, due_amount, date_of_due], (err, result) => {
        if (err) {
            console.error('Error inserting transaction data:', err);
            res.status(500).json({ error: 'Error creating transaction' });
            return;
        }
        console.log('Invoice transaction inserted successfully');
        res.status(200).json({ message: 'Invoice transaction inserted successfully' });
    });
});

//End point to get the details of invoice transaction
// 1. Fetch last invoice number added
app.get('/api/getLastInvoiceNumber', (req, res) => {
    const sql = 'SELECT MAX(invoice_number) AS last_invoice_number FROM invoice_transaction';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error retrieving last invoice number:', err);
            res.status(500).json({ error: 'Error retrieving last invoice number' });
            return;
        }
        const lastInvoiceNumber = result[0].last_invoice_number || 0;
        console.log('Last invoice number retrieved successfully:', lastInvoiceNumber);
        res.status(200).json({ lastInvoiceNumber });
    });
});




// Endpoint to insert customer data
app.post('/api/customer', (req, res) => {
    const { customerName, customerAddress, contactNumber } = req.body;
    const sql = `INSERT INTO customers (customerName, customerAddress, contactNumber) VALUES (?, ?, ?)`;
    db.query(sql, [customerName, customerAddress, contactNumber], (err, result) => {
        if (err) {
            console.error('Error inserting invoice data:', err);
            res.status(500).json({ error: 'Error creating invoice' });
            return;
        }
        console.log('Invoice created successfully');
        res.status(200).json({ message: 'Customer created successfully' });
    });
});

// Endpoint to get customer data

app.get('/api/customers', async (req, res) => {
    try {
        const customers = await new Promise((resolve, reject) => {
            const query = 'SELECT * FROM customers';
            db.query(query, (err, result) => {
                if (err) {
                    console.error('Error retrieving customer data:', err);
                    reject(err);
                } else {
                    console.log('Customer data retrieved successfully');
                    resolve(result);
                }
            });
        });
        res.status(200).json(customers);
    } catch (error) {
        console.error('Error retrieving customer data:', error);
        res.status(500).json({ error: 'Error retrieving customer data' });
    }
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