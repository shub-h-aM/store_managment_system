import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Typography, TextField, InputAdornment, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import Pagination from '@mui/material/Pagination';

function CustomerItemRate() {
    const [customerRate, setCustomerRate] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        // Fetch customer details from the API
        axios.get('http://localhost:5000/api/get/items')
            .then(response => {
                setCustomerRate(response.data);
                setFilteredCustomers(response.data);
            })
            .catch(error => {
                console.error('Error fetching customer details:', error);
            });
    }, []);

    // Function to handle search input change
    const handleSearchChange = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredList = customerRate.filter(itemRate =>
            itemRate.item.toLowerCase().includes(searchTerm) ||
            itemRate.item_description.toLowerCase().includes(searchTerm) ||
            itemRate.brand.toLowerCase().includes(searchTerm) ||
            itemRate.rate.toLowerCase().includes(searchTerm)
        );
        setFilteredCustomers(filteredList);
        setSearchTerm(event.target.value);
    };


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
                    />
                    {/*<Button component={Link} to="/create-customer" variant="contained" color="primary" style={{ marginLeft: '10px' }}>Create Customer</Button>*/}
                </div>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Item Name</TableCell>
                        <TableCell>Item Description</TableCell>
                        <TableCell>Brand</TableCell>
                        <TableCell>Rate</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentItems.map(itemRate => (
                        <TableRow key={itemRate.id}>
                            <TableCell>{itemRate.item_name}</TableCell>
                            <TableCell>{itemRate.item_description}</TableCell>
                            <TableCell>{itemRate.brand}</TableCell>
                            <TableCell> ₹ {parseFloat(itemRate.rate) + (parseFloat(itemRate.rate) * 0.07)}</TableCell>
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

export default CustomerItemRate;
