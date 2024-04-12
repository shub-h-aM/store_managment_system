import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Typography, TextField, InputAdornment, Grid, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import Pagination from '@mui/material/Pagination';

function CustomerDetails() {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        // Fetch customer details from the API
        axios.get('http://localhost:5000/api/customers')
            .then(response => {
                setCustomers(response.data);
                setFilteredCustomers(response.data); // Initially set filtered customers to all customers
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

    // Function to filter customers based on search term
    const filterCustomers = (searchTerm) => {
        const filtered = customers.filter(customer =>
            customer.customerName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCustomers(filtered);
        setCurrentPage(1); // Reset current page when search term changes
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
            <Typography variant="h3" gutterBottom>Customer</Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                </div>
                <Button component={Link} to="/create-customer" variant="contained" color="primary">Create Customer</Button>
            </div>
            <div style={{ marginTop: '20px' }}>
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
        </div>
    );
}

export default CustomerDetails;
