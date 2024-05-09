import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Footer from "../Footer";

function CustomerOnboard() {
    const [customerName, setCustomerName] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'customerName') setCustomerName(value);
        else if (name === 'customerAddress') setCustomerAddress(value);
        else if (name === 'contactNumber') setContactNumber(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/api/customer', {
            customerName,
            customerAddress,
            contactNumber
        })
            .then(response => {
                console.log(response.data);
                setCustomerName('');
                setCustomerAddress('');
                setContactNumber('');
                alert('Customer added successfully!');
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Failed to Create Customer Data.");
            });
    };

    return (
        <div style={{position:'fixed',width:'90%',marginLeft:'5%',marginTop:'5%'}}>
            <header>
                <h1>Create Customer</h1>
            </header>
            <Container maxWidth="sm">
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Customer Name"
                                name="customerName"
                                value={customerName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Customer Address"
                                name="customerAddress"
                                value={customerAddress}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Contact Number"
                                name="contactNumber"
                                value={contactNumber}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit" fullWidth style={{borderRadius:'10px'}}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
            <Footer />
        </div>
    );
}

export default CustomerOnboard;
