import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { Typography, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';

const columns = [
    { id: 'Name', label: 'Name', minWidth: 170 },
    { id: 'Email', label: 'Email', minWidth: 170 },
    { id: 'Username', label: 'Username', minWidth: 170 },
    { id: 'ContactNumber', label: 'Contact Number', minWidth: 170 }
];

const UserDetails = () => {
    const [formData, setFormData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/userDetails');
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching form data:', error);
            alert("Failed to get data.");
        } finally {
            setLoading(false);
        }
    };

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setItemsPerPage(+event.target.value);
        setCurrentPage(0);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const filteredItems = formData.filter(item =>
        item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ContactNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div style={{position:'fixed',width:'80%',marginLeft:'10%',marginTop:'7%'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h3" gutterBottom>User Details</Typography>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <Button onClick={fetchData} disabled={loading} size="small">
                                    {loading ? 'Loading...' : <FaSearch />}
                                </Button>
                            ),
                        }}
                    />
                </div>
            </div>
            <div style={{marginTop: '20px'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id}>{column.label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentItems.map((data, index) => (
                            <TableRow key={index}>
                                {columns.map((column) => (
                                    <TableCell key={column.id}>{data[column.id]}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
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

export default UserDetails;
