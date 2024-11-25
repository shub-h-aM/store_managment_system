import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import PageHeader from '../components/PageHeader'
import ReusableButton from '../components/ReusableButton';
import { useNavigate } from 'react-router-dom';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';

function CreateItem() {
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemModel, setItemModel] = useState('');
    const [color, setColor] = useState('');
    const [brand, setBrand] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [rate, setRate] = useState('');
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [colors] = useState(['Red', 'Blue', 'Silver','Green', 'Yellow', 'Black', 'White', 'Orange', 'Purple', 'Pink', 'Brown','Others']); // Predefined colors
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/get/item-categories');
                setCategories(response.data.categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
                alert('Failed to load item categories.');
            }
        };

        const fetchBrands = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/get/item-brand');
                setBrands(response.data.brand);
            } catch (error) {
                console.error('Error fetching brands:', error);
                alert('Failed to load item brands.');
            }
        };

        fetchCategories();
        fetchBrands();
    }, []);

    const handleBack = () => {
        navigate('/get/item');
        console.log('Back clicked');
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
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
                itemName,
                itemDescription,
                itemModel,
                color,
                brand,
                itemCategory,
                rate,
            });
            console.log(response.data);
            setItemName('');
            setItemDescription('');
            setItemModel('');
            setColor('');
            setBrand('');
            setItemCategory('');
            setRate('');
            alert('Item added successfully!');
            console.log('Submit clicked');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to create item.');
        }
    };

    return (
        <div>
            <header>
                <PageHeader title="Create Item" color="#FF5722" align="center" />
            </header>
            <Container maxWidth="sm">
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
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
                            <FormControl fullWidth>
                                <InputLabel id="color-label">Color</InputLabel>
                                <Select
                                    labelId="color-label"
                                    name="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                >
                                    {colors.map((color) => (
                                        <MenuItem key={color} value={color}>
                                            {color}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="brand-label">Brand</InputLabel>
                                <Select
                                    labelId="brand-label"
                                    name="brand"
                                    value={brand}
                                    onChange={handleInputChange}
                                >
                                    {brands.map((brand) => (
                                        <MenuItem key={brand.brand_id} value={brand.brand_name}>
                                            {brand.brand_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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
                                        <MenuItem key={category.category_id} value={category.category_name}>
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
                                InputProps={{
                                    inputProps: {min: 0,},
                                }}
                            />
                        </Grid>
                        <Grid container spacing={2} sx={{ mt: 3 }}>
                            <Grid item xs={6}>
                                <ReusableButton
                                    variant="outlined"
                                    color="secondary"
                                    onClick={handleBack}
                                    label="Back"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <ReusableButton
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit}
                                    label="Submit"
                                    type="submit"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>
    );
}

export default CreateItem;
