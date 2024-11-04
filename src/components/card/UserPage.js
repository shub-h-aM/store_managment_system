import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, CircularProgress } from '@mui/material';
import ImageCard from './ImageCard'; // ImageCard to display individual items

const UserPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading
    const [error, setError] = useState(null); // State to manage errors

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/ops/get/product');
                setItems(response.data);
            } catch (err) {
                console.error('Error fetching items:', err);
                setError('Failed to fetch items. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (loading) {
        return (
            <Container style={{ textAlign: 'center', marginTop: '50px' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Typography variant="h6" color="error" style={{ marginTop: '15px' }}>
                    {error}
                </Typography>
            </Container>
        );
    }

    return (
        <Container >
            <Typography variant="h4" gutterBottom style={{ marginTop: '15px' }}>
                User Page
            </Typography>
            <Grid container spacing={3}>
                {items.length === 0 ? (
                    <Typography variant="h6" style={{ margin: '20px auto' }}>
                        No items available.
                    </Typography>
                ) : (
                    items.map(item => (
                        <Grid item xs={12} sm={6} lg={3} key={item.id}>
                            <ImageCard item={item} />
                        </Grid>
                    ))
                )}
            </Grid>
        </Container>
    );
};

export default UserPage;
