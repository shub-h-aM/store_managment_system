import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Typography, TextField, InputAdornment, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import Pagination from '@mui/material/Pagination';

function ItemList() {
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
            const response = await axios.get('http://localhost:5000/api/get/get-items');
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
        if (items.length > 0) {
            const filtered = items.filter(item =>
                Object.values(item).some(value =>
                    value && value.toString().toLowerCase().includes(term.toLowerCase())
                )
            );
            setFilteredItems(filtered);
            setCurrentPage(1);
        }
    };

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const handleDelete = async (id) => {
        const confirmation = window.confirm('Are you sure you want to delete this item?');
        if (!confirmation) return;

        try {
            await axios.delete(`http://localhost:5000/api/delete/items/${id}`);
            setItems(items.filter(item => item.id !== id));
            setFilteredItems(filteredItems.filter(item => item.id !== id));
            alert('Item deleted successfully.');
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('Failed to delete item.');
        }
    };
    

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div style={{ position: 'fixed', width: '80%', marginLeft: '10%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Typography variant="h3" gutterBottom>
                    Item List
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
                        {/*<TableCell>Item Code</TableCell>*/}
                        <TableCell>Item Name</TableCell>
                        <TableCell>Item Description</TableCell>
                        <TableCell>Item Model</TableCell>
                        <TableCell>Brand</TableCell>
                        <TableCell>Item Category</TableCell>
                        <TableCell>Rate</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentItems.map(item => (
                        <TableRow key={item.id}>
                            {/*<TableCell>{item.item_code}</TableCell>*/}
                            <TableCell>{item.item_name}</TableCell>
                            <TableCell>{item.item_description}</TableCell>
                            <TableCell>{item.item_model}</TableCell>
                            <TableCell>{item.brand}</TableCell>
                            <TableCell>{item.item_category}</TableCell>
                            <TableCell>{item.rate}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    style={{ marginRight: '8px' }}
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
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

export default ItemList;