import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, TextField, Button } from '@mui/material';
import TablePagination from "@mui/material/TablePagination";

const ItemDetails = () => {
    const [formData, setFormData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(15);
    const [indexOfFirstItem, setIndexOfFirstItem] = useState(0);
    const [indexOfLastItem, setIndexOfLastItem] = useState(itemsPerPage);

    // State variables for filters
    const [filters, setFilters] = useState({
        item: '',
        brand: '',
        month_name: '',
        supplier: '',
        invoice_number: ''
    });

    

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/itemDetails', { params: filters });
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching item data:', error);
            alert("Failed to get data. Please try again later.");
        } finally {
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
        setItemsPerPage(+event.target.value);
        setCurrentPage(0);
        setIndexOfFirstItem(0);
        const newIndexOfLastItem = indexOfFirstItem + +event.target.value;
        setIndexOfLastItem(newIndexOfLastItem);
    };

    // Function to handle changes in filter values
    const handleFilterChange = (key, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: value
        }));
    };

    const filteredItems = formData.filter(item =>
        (!filters.item || item.item?.toLowerCase().includes(filters.item.toLowerCase())) &&
        (!filters.brand || item.brand?.toLowerCase().includes(filters.brand.toLowerCase())) &&
        (!filters.month_name || item.month_name?.toLowerCase().includes(filters.month_name.toLowerCase())) &&
        (!filters.supplier || item.supplier?.toLowerCase().includes(filters.supplier.toLowerCase())) &&
        (!filters.invoice_number || item.invoice_number?.toLowerCase().includes(filters.invoice_number.toLowerCase()))
    );

    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h3" gutterBottom> Item Details</Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField label="Search" variant="outlined" size="small" value={searchTerm}
                               onChange={(e) => setSearchTerm(e.target.value)}
                               InputProps={{
                                   endAdornment: (
                                       <Button onClick={fetchData} disabled={loading} variant="contained" color="primary">
                                           {loading ? 'Loading...' : 'Search'}
                                       </Button>
                                   ),
                               }}
                    />
                    <TextField label="Item" variant="outlined" size="small" value={filters.item}
                               onChange={(e) => handleFilterChange('item', e.target.value)} />
                    <TextField label="Brand" variant="outlined" size="small" value={filters.brand}
                               onChange={(e) => handleFilterChange('brand', e.target.value)} />
                    <TextField label="Month" variant="outlined" size="small" value={filters.month_name}
                               onChange={(e) => handleFilterChange('month_name', e.target.value)} />
                    <TextField label="Supplier" variant="outlined" size="small" value={filters.supplier}
                               onChange={(e) => handleFilterChange('supplier', e.target.value)} />
                    <TextField label="Invoice Number" variant="outlined" size="small" value={filters.invoice_number}
                               onChange={(e) => handleFilterChange('invoice_number', e.target.value)} />
                </div>
            </div>
            {loading ? (
                <Typography>Loading...</Typography>
            ) : (
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>Purchase Date</th>
                            <th>Month</th>
                            <th>Item</th>
                            <th>Item Description</th>
                            <th>Item Type</th>
                            <th>Invoice</th>
                            <th>Brand</th>
                            <th>Item Category</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Rate Per Piece</th>
                            <th>Total GST</th>
                            <th>Supplier</th>
                            <th>Location</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentItems.map((data, index) => (
                            <tr key={index}>
                                <td>{data.date_of_purchase.split('T')[0]}</td>
                                <td>{data.month_name}</td>
                                <td>{data.item}</td>
                                <td>{data.item_description}</td>
                                <td>{data.item_type}</td>
                                <td>{data.invoice_number}</td>
                                <td>{data.brand}</td>
                                <td>{data.item_category}</td>
                                <td>{data.qty}</td>
                                <td>{data.total_amount}</td>
                                <td>{Math.round((data.total_amount / data.qty) + (((data.total_amount / data.qty) * data.total_gst) / 100))}</td>
                                <td>{data.total_gst}</td>
                                <td>{data.supplier}</td>
                                <td>{data.location}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
            <TablePagination
                rowsPerPageOptions={[15, 25, 100]}
                component="div"
                count={filteredItems.length}
                rowsPerPage={itemsPerPage}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};

export default ItemDetails;
