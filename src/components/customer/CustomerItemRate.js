import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { Button,Typography, TextField, Select, MenuItem, Checkbox, ListItemText, Table, TableHead, TableBody, TableRow, TableCell, TablePagination, CircularProgress } from '@mui/material';
import { LiaFileDownloadSolid } from "react-icons/lia";
import { GrDocumentDownload } from "react-icons/gr";
import { generateExcelFile } from "../helpers/GenerateItemExcel";
import { GenerateRateList } from "../helpers/GenerateRateList";

const CustomerItemRate = () => {
    const [formData, setFormData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [indexOfFirstItem, setIndexOfFirstItem] = useState(0);
    const [indexOfLastItem, setIndexOfLastItem] = useState(itemsPerPage);
    const [selectedBrands, setSelectedBrands] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/get/get-items');
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching item data:', error);
            alert("Failed to get data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/get/items');
            setFormData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching item data:', error);
            alert("Failed to get data. Please try again later.");
            setLoading(false);
        }
    };

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
        const newIndexOfFirstItem = newPage * itemsPerPage;
        const newIndexOfLastItem = newIndexOfFirstItem + itemsPerPage;
        setIndexOfFirstItem(newIndexOfFirstItem);
        setIndexOfLastItem(newIndexOfLastItem);
    };

    const handleChangeRowsPerPage = (event) => {
        const newItemsPerPage = +event.target.value;
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(0);
        setIndexOfFirstItem(0);
        setIndexOfLastItem(newItemsPerPage);
    };

    const handleGeneratePDF = () => {
        GenerateRateList(true);
    };

    const handleGenerateExcel = async () => {
        setLoading(true);
        await generateExcelFile();
        setLoading(false);
    };

    const handleBrandChange = (event) => {
        const selectedValues = event.target.value;
        setSelectedBrands(selectedValues);
    };

    const filteredItems = formData.filter(item => {
        const isBrandMatch = selectedBrands.length === 0 || selectedBrands.includes(item.brand);
        const isSearchMatch =
            (item.item_name && item.item_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.item_description && item.item_description.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.brand && item.brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (typeof item.rate === 'string' && item.rate.toLowerCase().includes(searchTerm.toLowerCase()));

        return isBrandMatch && isSearchMatch;
    });

    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div style={{ width: '90%', margin: '0 auto', marginTop: '2%' }}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                <Typography variant="h4" gutterBottom>Item Rate List</Typography>
                <div style={{display: 'flex', alignItems: 'center', flexGrow: 1, maxWidth: '300px'}}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{marginRight: '20px'}}
                    />
                </div>
                <div style={{width: '300px'}}>
                    <Select
                        label="Select Brand"
                        multiple
                        value={selectedBrands}
                        onChange={handleBrandChange}
                        renderValue={(selected) => selected.length === 0 ? "Select Brand" : selected.join(', ')}
                        fullWidth
                        displayEmpty
                    >
                        {Array.from(new Set(formData.map(item => item.brand))).map(brand => (
                            <MenuItem key={brand} value={brand}>
                                <Checkbox checked={selectedBrands.indexOf(brand) > -1}/>
                                <ListItemText primary={brand}/>
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </div>

            {loading ? (
                <CircularProgress/>
            ) : (
                <div id='print'>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <h3>Shubham Electronics & Enterprises</h3>
                        <h4>Item Rate List</h4>
                        <Button
                            onClick={handleGeneratePDF}
                            variant="contained"
                            color="primary"
                            style={{marginLeft: '10px'}}
                        >
                            <LiaFileDownloadSolid style={{marginRight: '7px'}}/> Download PDF
                        </Button>
                        <Button
                            onClick={handleGenerateExcel}
                            variant="contained"
                            color="primary"
                            style={{ marginLeft: '10px' }}
                        >
                            <GrDocumentDownload style={{ marginRight: '7px' }} /> Download Excel
                        </Button>
                    </div>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>S.No.</TableCell>
                                <TableCell>Item Name</TableCell>
                                <TableCell>Item Description</TableCell>
                                <TableCell>Brand</TableCell>
                                <TableCell>Rate</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentItems.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{item.item_name}</TableCell>
                                    <TableCell>{item.item_description}</TableCell>
                                    <TableCell>{item.brand}</TableCell>
                                    <TableCell>₹ {((parseFloat(item.rate) * 107) / 100).toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50]}
                        component="div"
                        count={filteredItems.length}
                        rowsPerPage={itemsPerPage}
                        page={currentPage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            )}
        </div>
    );
};

export default CustomerItemRate;
