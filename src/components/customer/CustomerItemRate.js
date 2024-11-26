import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button, Typography, TextField, Select, MenuItem, Checkbox, ListItemText, Table, TableHead, TableBody,
    TableRow, TableCell, TablePagination, CircularProgress,} from '@mui/material';
import { LiaFileDownloadSolid } from 'react-icons/lia';
import { GrDocumentDownload } from 'react-icons/gr';
import { generateExcelFile } from '../helpers/GenerateItemExcel';
import { GenerateRateList } from '../helpers/GenerateRateList';

const CustomerItemRate = () => {
    // State variables
    const [formData, setFormData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedBrands, setSelectedBrands] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    // Fetch data from API
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/get/get-items');
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching item data:', error);
            alert('Failed to get data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };


    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        const newItemsPerPage = +event.target.value;
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(0);
    };

    // Handle PDF and Excel generation
    const handleGeneratePDF = () => GenerateRateList(true);

    const handleGenerateExcel = async () => {
        setLoading(true);
        await generateExcelFile();
        setLoading(false);
    };

    // Handle brand filter change
    const handleBrandChange = (event) => setSelectedBrands(event.target.value);

    // Filter items based on search and selected brands
    const filteredItems = formData.filter((item) => {
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(item.brand);
        const matchesSearch =
            (item.item_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.item_description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.rate?.toString().includes(searchTerm));

        return matchesBrand && matchesSearch;
    });

    // Paginate items
    const currentItems = filteredItems.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <div style={{ width: '90%', margin: '0 auto', marginTop: '2%' }}>
            <div style={{marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderBottom: '2px solid #ddd'}}>
                <Typography variant="h4">Customer Rate</Typography>
                <div style={{display: 'flex', gap: '20px', marginTop: '10px',marginBottom: '10px'}}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Select
                        multiple
                        value={selectedBrands}
                        onChange={handleBrandChange}
                        renderValue={(selected) => (selected.length === 0 ? 'Select Brand' : selected.join(', '))}
                        fullWidth
                        displayEmpty
                        style={{minWidth: '200px',maxHeight: '50px'}}
                    >
                        {Array.from(new Set(formData.map((item) => item.brand))).map((brand) => (
                            <MenuItem key={brand} value={brand}>
                                <Checkbox checked={selectedBrands.includes(brand)}/>
                                <ListItemText primary={brand}/>
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <div style={{display: 'flex', gap: '10px'}}>
                    <Button
                        onClick={handleGeneratePDF}
                        variant="contained"
                        color="primary"
                        startIcon={<LiaFileDownloadSolid/>}
                    >
                        Download PDF
                    </Button>
                    <Button
                        onClick={handleGenerateExcel}
                        variant="contained"
                        color="primary"
                        startIcon={<GrDocumentDownload/>}
                    >
                        Download Excel
                    </Button>
                </div>
            </div>
            {/* Table Section */}
            {loading ? (
                <CircularProgress/>
            ) : (
                <div >
                    <div id='print'>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                marginBottom: '10px', borderBottom: '2px solid #ddd', paddingBottom: '10px',}}>
                            <Typography variant="h5" gutterBottom style={{textAlign: 'left'}}>
                                Shubham Electronics & Electrical<br/>
                                Kundi, Varanasi, 221204
                            </Typography>
                            <Typography variant="h5" gutterBottom style={{textAlign: 'right'}}>
                                Item Rate List
                            </Typography>
                        </div>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>S.No.</TableCell>
                                    <TableCell>Product Name</TableCell>
                                    {/*<TableCell>Item Description</TableCell>*/}
                                    <TableCell>Brand</TableCell>
                                    <TableCell>Rate</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentItems.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1 + currentPage * itemsPerPage}</TableCell>
                                        {/*<TableCell>{item.item_name }</TableCell>*/}
                                        <TableCell>{item.item_description}</TableCell>
                                        <TableCell>{item.brand}</TableCell>
                                        <TableCell>₹ {(item.rate).toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

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
