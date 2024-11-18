const express = require('express');
const multer = require('multer');
const exceljs = require('exceljs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const path = require("path");
const fs = require('fs');
const {get} = require("axios");
const {utils, write} = require("xlsx");

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


// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT || 3306,
// });

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

// Api endpoint for item page
app.post('/api/items', (req, res) => {
    const { itemCode, itemName, itemDescription, itemModel, brand, itemCategory, rate } = req.body;
    const sql = 'INSERT INTO items ( item_name, item_description, item_model, brand, item_category, rate) VALUES (?, ?, ?, ?, ?,?)';
    db.query(sql, [ itemName, itemDescription, itemModel, brand, itemCategory, rate], (err, result) => {
        if (err) {
            console.error('Error inserting item data:', err);
            return res.status(500).json({ error: 'Error submitting item' });
        }
        console.log('Item data inserted successfully');
        res.status(200).json({ message: 'Item submitted successfully' });
    });
});

// api to delete items
app.delete('/api/delete/items/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM items WHERE id = ?', [id]);
        res.status(200).send({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting Item:', error);
        res.status(500).send({ message: 'Failed to delete item' });
    }
});

// API Endpoint to retrieve form data

app.get('/api/get/get-items', (req, res) => {
    const sql = 'SELECT * FROM items';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error retrieving item data:', err);
            return res.status(500).json({ error: 'Error retrieving item data' });
        }
        console.log('Item data retrieved successfully');
        res.status(200).json(result);
    });
});

app.get('/api/generate-excel', async (req, res) => {
    try {
        // Fetch data from your API endpoint
        const response = await get('http://localhost:5000/api/get/get-items');
        const formData = response.data;

        // Prepare data for Excel
        const worksheet = utils.json_to_sheet(formData.map((item, index) => ({
            'S.No.': index + 1,
            // 'Item Name': item.item_name,
            'Item Description': item.item_description,
            'Brand': item.brand,
            'Rate': `₹ ${((parseFloat(item.rate) * 107) / 100).toFixed(2)}`
        })));
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, 'Item Rates');

        // Convert Excel to buffer
        const excelBuffer = write(workbook, { type: 'buffer' });

        // Set response headers
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="item_rates.xlsx"');

        // Send the Excel file
        res.send(excelBuffer);
    } catch (error) {
        console.error('Error generating Excel:', error);
        res.status(500).send('Failed to generate Excel. Please try again later.');
    }
});



app.post('/api/item/details', (req, res) => {
    const { date_of_purchase,month_name, item,item_description, item_type,invoice_number, brand, item_category, qty, total_amount, total_gst, supplier, location } = req.body;
    const sql =
        'INSERT INTO item_inventory (date_of_purchase,month_name, item, item_description, item_type,invoice_number, brand, item_category, qty, total_amount, total_gst, supplier, location) VALUES (?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [date_of_purchase,month_name, item, item_description, item_type,invoice_number, brand, item_category, qty, total_amount, total_gst,supplier, location], (err, result) => {
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
    const { username, email, password } = req.body;
    const sql = 'SELECT * FROM user WHERE (username = ? OR email = ?) AND password = ?';
    db.query(sql, [username, email, password], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Error logging in' });
            return;
        }
        if (result.length > 0) {
            // User found, login successful
            const loggedInUser = result[0];
            res.status(200).json({ message: 'Login successful', username: loggedInUser.username });
        } else {
            // User not found or invalid credentials
            res.status(401).json({ error: 'Invalid username or email or password' });
        }
    });
});



// API endpoint for uploading Excel file
app.post('/api/upload', upload.single('file'), async (req, res) => {
    const workbook = new exceljs.Workbook();
    const filePath = path.join(__dirname, '../upload_doc/uploads/', req.file.filename);

    if (!fs.existsSync(filePath)) {
        console.error('File not found:', filePath);
        return res.status(404).json({ message: 'File not found' });
    }

    try {
        await workbook.xlsx.readFile(filePath);
        const sheet = workbook.getWorksheet(1);
        const dataRows = [];

        // Iterate over each row starting from the second row (excluding the header row)
        for (let i = 2; i <= sheet.rowCount; i++) {
            const rowValues = sheet.getRow(i).values;
            const trimmedRow = rowValues.slice(1);

            // Check if the row is empty
            if (!trimmedRow.every(value => value === null || value === '')) {
                dataRows.push(trimmedRow);
            }
        }

        console.log('Data Rows:', dataRows);

        // Insert rows into MySQL database
        const query = 'INSERT INTO item_inventory (date_of_purchase, item, item_type, brand, item_category, qty, total_amount, total_gst, location, supplier) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const promises = dataRows.map(row => {
            return new Promise((resolve, reject) => {
                db.query(query, row, (error, results) => {
                    if (error) {
                        console.error(error);
                        reject(error);
                    }
                    console.log('Inserted row:', row);
                    resolve();
                });
            });
        });

        await Promise.all(promises);

        res.json({ message: 'Data uploaded successfully' });
    } catch (error) {
        console.error('Error reading Excel file:', error);
        res.status(400).json({ message: 'Error parsing Excel file' });
    }
});




// API Endpoint to retrieve item data
app.get('/api/get/item-inventory', (req, res) => {
    const sql = 'SELECT * FROM item_inventory';
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
    const { customer_name,customer_number, invoice_number, items } = req.body;

    const sql = 'INSERT INTO invoices (customer_name,customer_number, invoice_number, item_name,brand, rate, quantity, amount) VALUES (?,?, ?, ?, ?, ?, ?, ?)';

    const promises = [];

    items.forEach(item => {
        const promise = new Promise((resolve, reject) => {
            db.query(sql, [customer_name, customer_number, invoice_number, item.itemName,item.brand, item.rate, item.quantity, item.amount], (err, result) => {
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
    const { customer_name, customer_number, invoice_number, sub_total, discount_amount, cgst_amount, sgst_amount, grand_total, paid_amount, due_amount,date_of_due } = req.body;

    const sql = 'INSERT INTO invoice_transaction (customer_name, customer_number, invoice_number, sub_total, discount_amount, cgst_amount,sgst_amount, grand_total, paid_amount, due_amount, date_of_due) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)';

    db.query(sql, [customer_name, customer_number, invoice_number, sub_total, discount_amount, cgst_amount, sgst_amount, grand_total, paid_amount, due_amount, date_of_due], (err, result) => {
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

// get all invoice transaction
app.get('/api/invoice/transactions', (req, res) => {
    const sql = 'SELECT * FROM invoice_transaction';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error retrieving form data:', err);
            res.status(500).json({ error: 'Error retrieving form data' });
            alert("Failed to Get Transaction Details!")
            return;
        }
        console.log('Form data retrieved successfully');
        res.status(200).json(result);
    });
});

// update transaction Due amount details
app.post('/api/invoice/transactions/update', (req, res) => {
    const { transaction_id, newPaidAmount, newDueAmount, comments, updatedAt } = req.body;

    console.log('Request Body:', req.body);
    // Example code to update the transaction:
    const sql = `UPDATE invoice_transaction SET paid_amount = ${newPaidAmount}, due_amount = ${newDueAmount}, comments = '${comments}', updated_at = '${updatedAt}' WHERE transaction_id = ${transaction_id}`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error updating transaction:', err);
            res.status(500).json({ error: 'Error updating transaction' });
            return;
        }
        console.log('Transaction updated successfully');
        res.status(200).json({ message: 'Transaction updated successfully' });
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

// API endpoint to create a new item category

app.post('/api/create/item-category', (req, res) => {
    const { category_name } = req.body;
    const sql = `INSERT INTO ItemCategory (category_name) VALUES (?)`;
    db.query(sql, [category_name], (err, result) => {
        if (err) {
            console.error('Error inserting category data:', err);
            res.status(500).json({ error: 'Error creating Category' });
            return;
        }
        console.log('Item Category created successfully');
        res.status(200).json({ message: 'Item categorry created successfully' });
    });
});
//get item category

app.get('/api/get/item-categories', async (req, res) => {
    try {
        const query = 'SELECT * FROM ItemCategory'; // Use correct table name (ItemCategory)
        db.query(query, (err, result) => {
            if (err) {
                console.error('Error retrieving item category data:', err);
                return res.status(500).json({ error: 'Error retrieving Category data' });
            }
            console.log('Item Category data retrieved successfully');
            res.status(200).json({ categories: result }); // Wrap result in an object
        });
    } catch (error) {
        console.error('Error retrieving Category data:', error);
        res.status(500).json({ error: 'Error retrieving Category data' });
    }
});
//delete item category
app.delete('/api/delete/item-category/:categoryId', async (req, res) => {
    const { categoryId } = req.params;
    try {
        await db.query('DELETE FROM ItemCategory WHERE category_id = ?', [categoryId]);
        res.status(200).send({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting Category:', error);
        res.status(500).send({ message: 'Failed to delete category' });
    }
});

// API endpoint to create a new item Brand

app.post('/api/create/item-brand', (req, res) => {
    const { brand_name } = req.body;
    const sql = `INSERT INTO Brand (brand_name) VALUES (?)`;
    db.query(sql, [brand_name], (err, result) => {
        if (err) {
            console.error('Error inserting brand data:', err);
            res.status(500).json({ error: 'Error creating Brand' });
            return;
        }
        console.log('Item Brand created successfully');
        res.status(200).json({ message: 'Item Brand created successfully' });
    });
});
//get item Brand

app.get('/api/get/item-brand', async (req, res) => {
    try {
        const query = 'SELECT * FROM Brand';
        db.query(query, (err, result) => {
            if (err) {
                console.error('Error retrieving item Brand data:', err);
                return res.status(500).json({ error: 'Error retrieving Brand data' });
            }
            console.log('Item Brand data retrieved successfully');
            res.status(200).json({ brand: result });
        });
    } catch (error) {
        console.error('Error retrieving Brand data:', error);
        res.status(500).json({ error: 'Error retrieving Brand data' });
    }
});

//delete item brand
app.delete('/api/delete/item-brand/:brandId', async (req, res) => {
    const { brandId } = req.params;
    try {
        await db.query('DELETE FROM Brand WHERE brand_id = ?', [brandId]);
        res.status(200).send({ message: 'Brand deleted successfully' });
    } catch (error) {
        console.error('Error deleting brand:', error);
        res.status(500).send({ message: 'Failed to delete brand' });
    }
});


// API Endpoint to Add an Image on admin page
app.post('/api/ops/admin/images', (req, res) => {
    const { name, about, mrp, image_url } = req.body;

    console.log('Received Payload:', req.body);

    const query = 'INSERT INTO admin_card_page (name, about, mrp, image_url) VALUES (?, ?, ?, ?)';
    db.query(query, [name, about, mrp, image_url], (err, result) => {
        if (err) {
            console.error('Error inserting image:', err);
            return res.status(500).json({ error: 'Database error', details: err });
        }
        res.status(201).json({ id: result.insertId, name, about, mrp, image_url });
    });
});

//API Endpoint to get the details of product with image added by admin
app.get('/api/ops/get/product', (req, res) => {
    const query = 'SELECT * FROM admin_card_page';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching items:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Get All Users, Roles, and Pages
app.get('/api/access-management', (req, res) => {
    const usersQuery = db.query('SELECT * FROM user');
    const rolesQuery = db.query('SELECT * FROM roles');
    const pagesQuery = db.query('SELECT * FROM pages');

    Promise.all([usersQuery, rolesQuery, pagesQuery])
        .then((results) => {
            console.log('Query results:', results); // Log all results

            const users = results[0][0]; // Get the user data
            const roles = results[1][0]; // Get the roles data
            const pages = results[2][0]; // Get the pages data

            // Check if data is empty
            if (!users || !roles || !pages) {
                console.error('Data is empty');
            }

            // Return structured data
            res.json({ users, roles, pages });
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'Server Error', details: error.message });
        });
});




//  Assign Role and Access to User
app.post('/api/access-management/assign', async (req, res) => {
    const { userId, pageId, roleId } = req.body;
    try {
        const query = 'INSERT INTO user_access (user_id, page_id, role_id) VALUES (?, ?, ?)';
        await db.query(query, [userId, pageId, roleId]);
        res.status(200).json({ message: 'Access assigned successfully' });
    } catch (error) {
        console.error('Error assigning access:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

//API Endpoints for Roles Management
   //Get All Roles
app.get('/api/ops/roles', (req, res) => {
    const sql = 'SELECT * FROM roles';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error retrieving form data:', err);
            res.status(500).json({ error: 'Error retrieving form data' });
            alert("Failed to Get Roles Details!")
            return;
        }
        console.log('Form data retrieved successfully');
        res.status(200).json(result);
    });
});
// Add a New Role
app.post('/api/roles', async (req, res) => {
    const { roleName } = req.body;
    try {
        await db.query('INSERT INTO roles (role_name) VALUES (?)', [roleName]);
        res.status(201).json({ message: 'Role added successfully' });
    } catch (error) {
        console.error('Error adding role:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});
//Edit a Role
app.put('/api/roles/:id', async (req, res) => {
    const { id } = req.params;
    const { roleName } = req.body;
    try {
        await db.query('UPDATE roles SET role_name = ? WHERE id = ?', [roleName, id]);
        res.status(200).json({ message: 'Role updated successfully' });
    } catch (error) {
        console.error('Error updating role:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});
// Delete a Role
app.delete('/api/roles/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM roles WHERE id = ?', [id]);
        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
        console.error('Error deleting role:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

//API Endpoints for Managing Pages
//Get All Pages
app.get('/api/get/pages', (req, res) => {
    const sql = 'SELECT * FROM pages';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error retrieving form data:', err);
            res.status(500).json({ error: 'Error retrieving form data' });
            alert("Failed to Get Page Details!")
            return;
        }
        console.log('Form data retrieved successfully');
        res.status(200).json(result);
    });
});

//Add a New Page
app.post('/api/pages', async (req, res) => {
    const { pageName, description } = req.body;
    try {
        await db.query('INSERT INTO pages (page_name, description) VALUES (?, ?)', [pageName, description]);
        res.status(201).json({ message: 'Page added successfully' });
    } catch (error) {
        console.error('Error adding page:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});
//Edit a Page
app.put('/api/pages/:id', async (req, res) => {
    const { id } = req.params;
    const { pageName, description } = req.body;
    try {
        await db.query('UPDATE pages SET page_name = ?, description = ? WHERE id = ?', [pageName, description, id]);
        res.status(200).json({ message: 'Page updated successfully' });
    } catch (error) {
        console.error('Error updating page:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});
//Delete a Page
app.delete('/api/pages/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM pages WHERE id = ?', [id]);
        res.status(200).json({ message: 'Page deleted successfully' });
    } catch (error) {
        console.error('Error deleting page:', error);
        res.status(500).json({ error: 'Server Error' });
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
