import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Typography, TextField, InputAdornment, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import Pagination from '@mui/material/Pagination';

function Item() {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/get/items');
            setItems(response.data);
            setFilteredItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        filterItems(term);
    };

    const filterItems = (term) => {
        const filtered = items.filter(item =>
            item.itemName.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredItems(filtered);
        setCurrentPage(1);
    };

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Typography variant="h3" gutterBottom>
                    Item
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
                                    <Button onClick={() => filterItems(searchTerm)} size="small">Search</Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button component={Link} to="/create-item" variant="contained" color="primary" style={{ marginLeft: '10px' }}>Create Item</Button>
                </div>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Item Code</TableCell>
                        <TableCell>Item Name</TableCell>
                        <TableCell>Item Description</TableCell>
                        <TableCell>Item Model</TableCell>
                        <TableCell>Brand</TableCell>
                        <TableCell>Item Category</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentItems.map(item => (
                        <TableRow key={item.id}>
                            <TableCell>{item.item_code}</TableCell>
                            <TableCell>{item.item_name}</TableCell>
                            <TableCell>{item.item_description}</TableCell>
                            <TableCell>{item.item_model}</TableCell>
                            <TableCell>{item.brand}</TableCell>
                            <TableCell>{item.item_category}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Pagination
                    count={Math.ceil(filteredItems.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </div>
        </div>
    );
}

export default Item;
