import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Grid } from '@mui/material';
import {Link} from "react-router-dom";

const CreateItemDetails = () => {
    const initialFormData = {
        date_of_purchase: '',
        month_name: '',
        item: '',
        item_description: '',
        item_type: '',
        invoice_number: '',
        brand: '',
        item_category: '',
        qty: 0,
        total_amount: 0,
        total_gst: 0,
        location: '',
        supplier: ''
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleSubmit = () => {
        axios.post('http://localhost:5000/api/item/details', formData)
            .then((response) => {
                console.log(response.data.message);
                setFormData(initialFormData);
                alert("Item Details Added Successfully!")
            })
            .catch((error) => {
                console.error(error);
                alert("Failed To Submit Data!")
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name.trim() !== '') {
            if (name === 'total_amount' || name === 'total_gst') {
                setFormData({ ...formData, [name]: parseFloat(value) || 0 });
            } else {
                setFormData({ ...formData, [name]: value });
            }
        }
    };

    return (
        <div style={{
            maxWidth: '600px',
            margin: 'auto',
            padding: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            backgroundColor: '#f9f9f9',
            marginTop: '20px'
        }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
                <Typography variant="h5" gutterBottom>Create Item Details</Typography>
                <Button component={Link} to="/upload/item/details" variant="contained" color="primary">Upload Item
                    File</Button>
            </div>
            <div style={{marginBottom: '16px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField fullWidth type="date" name="date_of_purchase"
                                   value={formData.date_of_purchase} onChange={handleInputChange}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Month" fullWidth type="text" name="month_name"
                                   value={formData.month_name} onChange={handleInputChange}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Item" fullWidth type="text" name="item"
                                   value={formData.item} onChange={handleInputChange}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Item Description" fullWidth type="text" name="item_description"
                                   value={formData.item_description} onChange={handleInputChange}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Item Type" fullWidth type="text" name="item_type"
                                   value={formData.item_type} onChange={handleInputChange}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Invoice Number" fullWidth type="text" name="invoice_number"
                                   value={formData.invoice_number} onChange={handleInputChange}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Brand" fullWidth type="text" name="brand"
                                   value={formData.brand} onChange={handleInputChange}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Item Category" fullWidth type="text" name="item_category"
                                   value={formData.item_category} onChange={handleInputChange}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Quantity" type="number" name="qty" fullWidth
                                   value={formData.qty} onChange={handleInputChange} InputProps={{inputProps: {min: 0}}}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Total Amount" type="number" fullWidth name="total_amount"
                                   value={formData.total_amount || 0} onChange={handleInputChange}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Total GST" type="number" fullWidth name="total_gst"
                                   value={formData.total_gst || 0} onChange={handleInputChange}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Location" name="location" type="text" fullWidth
                                   value={formData.location} onChange={handleInputChange}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Supplier" fullWidth name="supplier" type="text"
                                   value={formData.supplier} onChange={handleInputChange}/>
                    </Grid>
                </Grid>
            </div>
            <div style={{textAlign: 'center'}}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    );
};

export default CreateItemDetails;
