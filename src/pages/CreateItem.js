import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Footer from "../components/Footer";

function CreateItem() {
    const [itemCode, setItemCode] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemModel, setItemModel] = useState('');
    const [brand, setBrand] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [rate, setRate] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'itemCode') setItemCode(value);
        if (name === 'itemName') setItemName(value);
        if (name === 'itemDescription') setItemDescription(value);
        if (name === 'itemModel') setItemModel(value);
        if (name === 'brand') setBrand(value);
        if (name === 'itemCategory') setItemCategory(value);
        if (name === 'rate') setRate(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/items', {
                itemCode,
                itemName,
                itemDescription,
                itemModel,
                brand,
                itemCategory,
                rate
            });
            console.log(response.data);
            setItemCode('');
            setItemName('');
            setItemDescription('');
            setItemModel('');
            setBrand('');
            setItemCategory('');
            setRate('');
            alert('Item added successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to create item.');
        }
    };

    return (
        <div>
            <header>
                <h1>Create Item</h1>
            </header>
            <Container maxWidth="sm">
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Item Code"
                                name="itemCode"
                                value={itemCode}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Item Name"
                                name="itemName"
                                value={itemName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Item Description"
                                name="itemDescription"
                                value={itemDescription}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Item Model"
                                name="itemModel"
                                value={itemModel}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Brand"
                                name="brand"
                                value={brand}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Item Category"
                                name="itemCategory"
                                value={itemCategory}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Rate Per Piece"
                                name="rate"
                                type="number"
                                value={rate}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit" fullWidth>
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

export default CreateItem;

