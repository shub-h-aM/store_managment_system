import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from "@mui/material/Button";
import { Typography, TextField, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import { GenerateRateList } from '../helpers/GenerateRateList';

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


    const handleSearchChange = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm); // Update searchTerm immediately
        const filteredList = customerRate.filter(itemRate =>
            (itemRate.item && itemRate.item.toLowerCase().includes(searchTerm)) ||
            (itemRate.item_description && itemRate.item_description.toLowerCase().includes(searchTerm)) ||
            (itemRate.brand && itemRate.brand.toLowerCase().includes(searchTerm)) ||
            (typeof itemRate.rate === 'string'  && itemRate.rate.toLowerCase().includes(searchTerm))
        );
        setFilteredCustomers(filteredList);
    };


    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const handleGeneratePDF = () => {
        // Call GenerateRateList function with appropriate parameters
        GenerateRateList(true);
    };

    // Calculate the index of the first and last item of the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Typography variant="h3" gutterBottom>
                    Item Rate List
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <Button onClick={handleGeneratePDF} variant="contained" color="primary" style={{ marginLeft: '10px' }}>
                        Download PDF
                    </Button>
                </div>
            </div>
            <div id="print">
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
            </div>

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
