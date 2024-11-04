import React from 'react';
import { Paper, Typography, Button } from '@mui/material';

const Cart = ({ cartItems, removeFromCart, placeOrder }) => {
    const calculateCartTotal = () => cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

    return (
        <Paper elevation={3} style={{ padding: '16px', marginTop: '20px' }}>
            <Typography variant="h5">Cart</Typography>
            {cartItems.length === 0 ? (
                <Typography>No items in the cart.</Typography>
            ) : (
                <>
                    {cartItems.map((item, index) => (
                        <div key={index}>
                            <Typography>{item.productName} - ₹{item.price} x {item.quantity}</Typography>
                            <Button color="error" onClick={() => removeFromCart(index)}>Remove</Button>
                        </div>
                    ))}
                    <Typography variant="h6">Total: ₹{calculateCartTotal().toFixed(2)}</Typography>
                    <Button variant="contained" color="primary" onClick={placeOrder}>Place Order</Button>
                </>
            )}
        </Paper>
    );
};

export default Cart;
