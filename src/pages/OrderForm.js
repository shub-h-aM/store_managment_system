import React, { useState, useEffect } from 'react';
import { createOrder } from '../services/apiService';
import {Container, TextField, Button, Grid, Typography, Paper, IconButton, Dialog, DialogTitle, DialogContent,
    DialogActions } from '@mui/material';
import { Add, Delete, ShoppingCart } from '@mui/icons-material';
import axios from 'axios';
import Cart from '../components/Cart';

const OrderForm = () => {
    const [items, setItems] = useState([{ productName: '', productBrand: '', quantity: 1, price: 0 }]);
    const [productList, setProductList] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const BaseUrl = "http://localhost:5000";
                const response = await axios.get(BaseUrl + '/api/get/get-items', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const formattedProductList = response.data.map(product => ({
                    itemId: product.id,
                    productName: product.item_description,
                    productBrand: product.brand,
                    price: product.rate,
                }));
                setProductList(formattedProductList);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, [token]);

    const handleAddToCart = () => {
        setCartItems([...cartItems, ...items.filter(item => item.productName)]);
        alert('All items added to cart successfully!');
    };

    // const handleSubmit = async () => {
    //     try {
    //         await createOrder({ items: cartItems, totalAmount: calculateTotal(cartItems) }, token);
    //         alert('Order placed successfully!');
    //     } catch (error) {
    //         console.error(error);
    //         alert('Failed to place order.');
    //     }
    // };



    const calculateTotal = (itemList) =>
        itemList.reduce((sum, item) => sum + item.quantity * item.price, 0);

    const handleAddItem = () => {
        setItems([...items, { productName: '', productType: '', quantity: 1, price: 0 }]);
    };

    const handleRemoveItem = (index) => {
        setItems(items.filter((_, idx) => idx !== index));
    };

    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };

    const removeFromCart = (index) => {
        setCartItems(cartItems.filter((_, idx) => idx !== index));
    };
    const handleRateChange = (e, id) => {
        const updatedValue = e.target.value;
        // Update the state with the new value for the specific item
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, price: updatedValue } : item
            )
        );
    };
    const handleSubmit = async () => {
        const orderData = {
            items: cartItems,
            totalAmount: calculateTotal(cartItems),
        };

        try {
            const response = await axios.post('http://localhost:5000/api/create-order', orderData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Order placed successfully!');
        } catch (error) {
            console.error('Error placing order:', error.response?.data || error.message);
            alert(`Failed to place order. ${error.response?.data?.message || ''}`);
        }
    };



    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={6}>
                    <Typography variant="h4" gutterBottom>
                        Order
                    </Typography>
                </Grid>
                <Grid item xs={6} container justifyContent="flex-end" alignItems="center">
                    <IconButton color="primary" onClick={toggleCart}>
                        <ShoppingCart />
                    </IconButton>
                    <Typography variant="body1" display="inline" sx={{ ml: 1 }} onClick={toggleCart}>
                        View Cart
                    </Typography>
                </Grid>
            </Grid>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Grid container spacing={2}>
                    {items.map((item, index) => (
                        <Grid item xs={12} key={index} container spacing={2} alignItems="center">
                            <Grid item xs={3}>
                                <TextField
                                    label="Product Company"
                                    select
                                    variant="outlined"
                                    fullWidth
                                    value={item.productBrand}
                                    onChange={(e) =>
                                        setItems(items.map((i, idx) =>
                                            idx === index
                                                ? { ...i, productBrand: e.target.value }
                                                : i
                                        ))
                                    }
                                    SelectProps={{
                                        native: true,
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                >
                                    <option value="">Select Company Brand</option>
                                    {[...new Set(productList.map(product => product.productBrand))].map((type, idx) => (
                                        <option key={idx} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>


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
                                        shrink: true,
                                    }}
                                >
                                    <option value="">Select Product</option>
                                    {productList
                                        .filter(product => product.productBrand === item.productBrand)
                                        .map((product) => (
                                            <option key={product.itemId} value={product.productName}>
                                                {product.productName}
                                            </option>
                                        ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={2}>
                                <TextField
                                    label="Quantity"
                                    type="number"
                                    variant="outlined"
                                    inputProps={{ min: 1 }}
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

                            <Grid item xs={2}>
                                <TextField
                                    label="Rate"
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                    inputProps={{ min: 1 }}
                                    value={item.price}
                                    onChange={(e) => {
                                        const updatedPrice = parseFloat(e.target.value);
                                        setItems(items.map((i, idx) =>
                                            idx === index
                                                ? { ...i, price: updatedPrice }
                                                : i
                                        ));
                                    }}
                                />
                            </Grid>


                            <Grid item xs={1}>
                                <IconButton
                                    color="error"
                                    onClick={() => handleRemoveItem(index)}
                                >
                                    <Delete />
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}

                    <Grid item xs={4}>
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
                            Total Amount: ₹{calculateTotal(items).toFixed(2)}
                        </Typography>
                    </Grid>

                    <Grid item xs={6} sx={{ mt: 2 }}>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleAddToCart}
                            fullWidth
                        >
                            Add to Cart
                        </Button>
                    </Grid>

                    <Grid item xs={6} sx={{ mt: 2 }}>
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
            <Dialog open={cartOpen} onClose={toggleCart}>
                <DialogTitle>Shopping Cart</DialogTitle>
                <DialogContent>
                    <Cart
                        cartItems={cartItems}
                        removeFromCart={removeFromCart}
                        placeOrder={handleSubmit}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleCart} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default OrderForm;
