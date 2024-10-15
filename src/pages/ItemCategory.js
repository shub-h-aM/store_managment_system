import React, { useEffect, useState } from 'react';
import { Button, Typography, Paper, Grid, CircularProgress, Card, CardContent, CardActions } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import Footer from '../components/Footer';

const ItemCategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/get/item-categories');
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

    return (
        <div style={{maxWidth: 800, margin: '0 auto', padding: '20px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
                <Typography variant="h4">
                    Item Category
                </Typography>
                <Button variant="contained" color="primary" onClick={handleCreateCategory}>
                    Create Item Category
                </Button>
            </div>

            {loading ? (
                <CircularProgress/>
            ) : (
                <Grid container spacing={2}>
                    {categories.length === 0 ? (
                        <Grid item xs={12}>
                            <Paper elevation={3} sx={{p: 2}}>
                                <Typography variant="body1">No categories found.</Typography>
                            </Paper>
                        </Grid>
                    ) : (
                        categories.map((category) => (
                            <Grid item xs={12} sm={6} md={4} key={category.category_id}>
                                <Card elevation={3}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            <CategoryIcon sx={{marginRight: 1}}/>
                                            {category.category_name}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>
            )}
            <Footer />
        </div>
    );
};

export default ItemCategoryPage;
