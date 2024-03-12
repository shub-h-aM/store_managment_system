const XLSX = require('xlsx');

const headers = ['Name', 'Email', 'Username', 'Password', 'ContactNumber'];
const lowercaseHeaders = headers.map(header => header.toLowerCase());

// Create a new workbook and worksheet
const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.aoa_to_sheet([lowercaseHeaders]);

// Add worksheet to the workbook
XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');

// Write workbook to a file
XLSX.writeFile(workbook, 'user_data.xlsx', { bookType: 'xlsx' });
