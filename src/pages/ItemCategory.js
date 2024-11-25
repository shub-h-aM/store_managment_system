import React, { useEffect, useState } from 'react';
import {
    Button,
    Typography,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import DeleteIcon from '@mui/icons-material/Delete';
import config from '../config';

const ItemCategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/api/get/item-categories`);
                setCategories(response.data.categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
                alert('Failed to load categories');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleCreateCategory = () => {
        navigate('/create-item-category');
    };

    const handleDeleteCategory = async (categoryId) => {
        const confirmation = window.confirm('Are you sure you want to delete this category?');
        if (!confirmation) return; // Exit if the user cancels

        try {
            await axios.delete(`${config.BASE_URL}/api/delete/item-category/${categoryId}`);
            setCategories(categories.filter((category) => category.category_id !== categoryId));
            alert('Category deleted successfully.');
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('Failed to delete category.');
        }
    };


    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                }}
            >
                <Typography variant="h4">Item Category</Typography>
                <Button variant="contained" color="primary" onClick={handleCreateCategory}>
                    Create Item Category
                </Button>
            </div>

            {loading ? (
                <CircularProgress />
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Icon</TableCell>
                                <TableCell>Category Name</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        <Typography variant="body1">No categories found.</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                categories.map((category) => (
                                    <TableRow key={category.category_id}>
                                        <TableCell>
                                            <CategoryIcon />
                                        </TableCell>
                                        <TableCell>{category.category_name}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleDeleteCategory(category.category_id)}
                                            >
                                                <DeleteIcon />Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default ItemCategoryPage;
