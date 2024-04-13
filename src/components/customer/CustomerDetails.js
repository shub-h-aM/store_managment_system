import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Typography, TextField, InputAdornment, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import Pagination from '@mui/material/Pagination';

function CustomerDetails() {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        // Fetch customer details from the API
        axios.get('http://localhost:5000/api/customers')
            .then(response => {
                setCustomers(response.data);
                setFilteredCustomers(response.data);
            })
            .catch(error => {
                console.error('Error fetching customer details:', error);
            });
    }, []);

    // Function to handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        filterCustomers(event.target.value);
    };

    const filterCustomers = (searchTerm) => {
        const filtered = customers.filter(customer =>
            customer.customerName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCustomers(filtered);
        setCurrentPage(1);
    };

    // Function to handle pagination
    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    // Calculate the index of the first and last item of the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Typography variant="h3" gutterBottom>
                    Customer
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button onClick={() => filterCustomers(searchTerm)} size="small">Search</Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button component={Link} to="/create-customer" variant="contained" color="primary" style={{ marginLeft: '10px' }}>Create Customer</Button>
                </div>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Customer Name</TableCell>
                        <TableCell>Customer Address</TableCell>
                        <TableCell>Contact Number</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentItems.map(customer => (
                        <TableRow key={customer.id}>
                            <TableCell>{customer.customerName}</TableCell>
                            <TableCell>{customer.customerAddress}</TableCell>
                            <TableCell>{customer.contactNumber}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* Pagination */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Pagination
                    count={Math.ceil(filteredCustomers.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </div>
        </div>
    );
}

export default CustomerDetails;
