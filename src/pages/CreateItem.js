import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
// import Footer from "../components/Footer";
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';

function CreateItem() {
    const [itemCode, setItemCode] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemModel, setItemModel] = useState('');
    const [brand, setBrand] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [rate, setRate] = useState('');
    const [categories, setCategories] = useState([]);

    // Fetch item categories when the component mounts
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/get/item-categories');
                setCategories(response.data.categories); // Use the correct structure
            } catch (error) {
                console.error('Error fetching categories:', error);
                alert('Failed to load item categories.');
            }
        };

        fetchCategories();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'itemCode') setItemCode(value);
        if (name === 'itemName') setItemName(value);
        if (name === 'itemDescription') setItemDescription(value);
        if (name === 'itemModel') setItemModel(value);
        if (name === 'brand') setBrand(value);
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
                            <FormControl fullWidth>
                                <InputLabel id="item-category-label">Item Category</InputLabel>
                                <Select
                                    labelId="item-category-label"
                                    name="itemCategory"
                                    value={itemCategory}
                                    onChange={(e) => setItemCategory(e.target.value)}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category.category_id} value={category.category_id}>
                                            {category.category_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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
            {/*<Footer />*/}
        </div>
    );
}

export default CreateItem;
