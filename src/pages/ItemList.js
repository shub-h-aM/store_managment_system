import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import {  TextField, InputAdornment, Table, TableHead, TableRow, TableCell, TableBody, MenuItem, Select, FormControl, InputLabel, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Pagination from '@mui/material/Pagination';

function ItemList() {
    const [items, setItems] = useState([]);
    const [brands, setBrands] = useState([]); // To store brand options
    const [selectedBrand, setSelectedBrand] = useState(''); // To store selected brand filter
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [newRate, setNewRate] = useState('');

    useEffect(() => {
        fetchData();
        fetchBrands(); // Fetch brands
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

    const fetchBrands = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/get/item-brand');
            setBrands(response.data.brand); // Assuming `response.data.brand` contains the list of brands
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    };

    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        filterItems(term, selectedBrand);
    };

    const handleBrandChange = (event) => {
        const brand = event.target.value;
        setSelectedBrand(brand);
        filterItems(searchTerm, brand);
    };

    const filterItems = (term, brand) => {
        let filtered = items;

        if (term) {
            filtered = filtered.filter(item =>
                Object.values(item).some(value =>
                    value && value.toString().toLowerCase().includes(term.toLowerCase())
                )
            );
        }

        if (brand) {
            filtered = filtered.filter(item => item.brand === brand);
        }

        setFilteredItems(filtered);
        setCurrentPage(1);
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

    const handleEditClick = (item) => {
        setEditItem(item);
        setNewRate(item.rate); // Set the existing rate of the item for editing
        setOpenEditDialog(true);
    };

    const handleEditSave = async () => {
        try {
            // Update the rate of the selected item
            await axios.put(`http://localhost:5000/api/update/items/${editItem.id}`, { rate: newRate });

            // Update the rate in the local state
            setItems(items.map(item =>
                item.id === editItem.id ? { ...item, rate: newRate } : item
            ));
            setFilteredItems(filteredItems.map(item =>
                item.id === editItem.id ? { ...item, rate: newRate } : item
            ));
            alert('Rate updated successfully.');
            setOpenEditDialog(false); // Close the dialog
        } catch (error) {
            console.error('Error updating rate:', error);
            alert('Failed to update rate.');
        }
    };

    const handleEditClose = () => {
        setOpenEditDialog(false); // Close the dialog without saving
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div style={{ position: 'fixed', width: '80%', marginLeft: '10%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <PageHeader title="Item List" color="#FF5722" align="center" />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FormControl style={{ marginRight: '10px' }}>
                        <InputLabel>Select Brand</InputLabel>
                        <Select
                            value={selectedBrand}
                            onChange={handleBrandChange}
                            // style={{ width: 150 }}
                            style={{minWidth: '200px',maxHeight: '50px'}}
                        >
                            <MenuItem value="">All Brands</MenuItem>
                            {brands.map(brand => (
                                <MenuItem key={brand.brand_id} value={brand.brand_name}>
                                    {brand.brand_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button onClick={() => filterItems(searchTerm, selectedBrand)} size="small">Search</Button>
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
                        <TableCell>Item Name</TableCell>
                        <TableCell>Item Description</TableCell>
                        <TableCell>Item Model</TableCell>
                        <TableCell>Warranty</TableCell>
                        <TableCell>Color</TableCell>
                        <TableCell>Brand</TableCell>
                        <TableCell>Item Category</TableCell>
                        <TableCell>Rate</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentItems.map(item => (
                        <TableRow key={item.id}>
                            <TableCell>{item.item_name}</TableCell>
                            <TableCell>{item.item_description}</TableCell>
                            <TableCell>{item.item_model}</TableCell>
                            <TableCell>{item.warranty}</TableCell>
                            <TableCell>{item.color}</TableCell>
                            <TableCell>{item.brand}</TableCell>
                            <TableCell>{item.item_category}</TableCell>
                            <TableCell>{item.rate}</TableCell>
                            <TableCell>
                                <Tooltip title="Delete" arrow>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        style={{ marginRight: '8px' }}
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                </Tooltip>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => handleEditClick(item)}
                                >
                                    Edit
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

            {/* Edit Rate Dialog */}
            <Dialog open={openEditDialog} onClose={handleEditClose}>
                <DialogTitle>Edit Item Rate</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Rate"
                        variant="outlined"
                        value={newRate}
                        onChange={(e) => setNewRate(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ItemList;
