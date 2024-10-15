import React, { useState, useEffect } from 'react';
import { createOrder } from '../services/apiService';
import {
    Container, TextField, Button, Grid, Typography, Paper, IconButton
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import axios from 'axios';

const OrderForm = () => {
    const [items, setItems] = useState([{ productName: '', quantity: 1, price: 0 }]);
    const [productList, setProductList] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const BaseUrl = "http://localhost:5000";
                const response = await axios.get(BaseUrl + '/api/get/items', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // Extract only item_description and rate from the response
                const formattedProductList = response.data.map(product => ({
                    itemId: product.id, // Assuming you need itemId for further reference
                    productName: product.item_description, // Use item_description for product name
                    price: product.rate, // Use rate for price
                }));
                setProductList(formattedProductList);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, [token]);

    const handleSubmit = async () => {
        try {
            await createOrder({ items, totalAmount: calculateTotal() }, token);
            alert('Order placed successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to place order.');
        }
    };

    const calculateTotal = () =>
        items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    const handleAddItem = () => {
        setItems([...items, { productName: '', quantity: 1, price: 0 }]);
    };

    const handleRemoveItem = (index) => {
        setItems(items.filter((_, idx) => idx !== index));
    };

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Order Form
            </Typography>

            <Paper elevation={3} sx={{ p: 3 }}>
                <Grid container spacing={2}>
                    {items.map((item, index) => (
                        <Grid item xs={12} key={index} container spacing={2} alignItems="center">
                            <Grid item xs={4}>
                                <TextField
                                    label="Product Name"
                                    select
                                    variant="outlined"
                                    fullWidth
                                    value={item.productName}
                                    onChange={(e) =>
                                        setItems(items.map((i, idx) =>
                                            idx === index
                                                ? {
                                                    ...i,
                                                    productName: e.target.value,
                                                    price: productList.find(product => product.productName === e.target.value)?.price || 0
                                                }
                                                : i
                                        ))
                                    }
                                    SelectProps={{
                                        native: true,
                                    }}
                                    InputLabelProps={{
                                        shrink: true, // Ensures the label is always in the shrunk position when focused or filled
                                    }}
                                >
                                    <option value="">Select a product</option>
                                    {productList.map((product) => (
                                        <option key={product.itemId} value={product.productName}>
                                            {product.productName}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>


                            <Grid item xs={3}>
                                <TextField
                                    label="Quantity"
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                    value={item.quantity}
                                    onChange={(e) =>
                                        setItems(items.map((i, idx) =>
                                            idx === index
                                                ? { ...i, quantity: parseInt(e.target.value) }
                                                : i
                                        ))
                                    }
                                />
                            </Grid>

                            <Grid item xs={3}>
                                <TextField
                                    label="Rate"
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                    value={item.price}
                                    onChange={(e) =>
                                        setItems(items.map((i, idx) =>
                                            idx === index
                                                ? { ...i, price: parseFloat(e.target.value) }
                                                : i
                                        ))
                                    }
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>

                            <Grid item xs={2}>
                                <IconButton
                                    color="error"
                                    onClick={() => handleRemoveItem(index)}
                                >
                                    <Delete />
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}

                    <Grid item xs={12}>
                        <Button
                            variant="outlined"
                            startIcon={<Add />}
                            onClick={handleAddItem}
                            fullWidth
                        >
                            Add Product
                        </Button>
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <Typography variant="h6">
                            Total Amount: ₹{calculateTotal().toFixed(2)}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            fullWidth
                        >
                            Place Order
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default OrderForm;
