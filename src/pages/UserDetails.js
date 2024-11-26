import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaTrash } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import {TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, TablePagination,
    CircularProgress, Paper, Toolbar, IconButton,} from '@mui/material';

const columns = [
    { id: 'Name', label: 'Name', minWidth: 150 },
    { id: 'Email', label: 'Email', minWidth: 150 },
    { id: 'Username', label: 'Username', minWidth: 150 },
    { id: 'ContactNumber', label: 'Contact Number', minWidth: 150 },
    { id: 'Action', label: 'Action', minWidth: 100 },
];

const UserDetails = () => {
    const [formData, setFormData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
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
            console.error('Error fetching data:', error);
            alert('Failed to fetch data.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/delete/userDetails/${id}`);
                if (response.status === 200) {
                    setFormData((prevData) => prevData.filter((user) => user.userId !== id));
                    alert('User deleted successfully.');
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Failed to delete user.');
            }
        }
    };

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setItemsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    const filteredItems = formData.filter(
        (item) =>
            item.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.Email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.Username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.ContactNumber?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfFirstItem = currentPage * itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

    return (
        <Paper elevation={3} style={{ padding: '20px', margin: '20px auto', maxWidth: '90%' }}>
            <Toolbar style={{ justifyContent: 'space-between' }}>
                <PageHeader title="User Details" color="#FF5722" align="center" />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={fetchData} disabled={loading}>
                                    {loading ? <CircularProgress size={20} /> : <FaSearch />}
                                </IconButton>
                            ),
                        }}
                    />
                </div>
            </Toolbar>
            <Table stickyHeader>
                <TableHead>
                    <TableRow
                        sx={{
                            backgroundColor: '#f5f5f5', 
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}
                    >
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                style={{
                                    minWidth: column.minWidth,
                                    fontWeight: 'bold',
                                    backgroundColor: '#f0f0f0', // Subtle header background
                                    color: '#333', // Text color
                                    textAlign: 'center',
                                }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentItems.map((row, index) => (
                        <TableRow key={row.userId || index}>
                            {columns.map((column) => {
                                if (column.id === 'Action') {
                                    return (
                                        <TableCell key={column.id}>
                                            <Button
                                                color="error"
                                                variant="outlined"
                                                size="small"
                                                onClick={() => handleDelete(row.userId)}
                                                startIcon={<FaTrash />}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    );
                                }
                                return <TableCell key={column.id}>{row[column.id]}</TableCell>;
                            })}
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
        </Paper>
    );
};

export default UserDetails;
