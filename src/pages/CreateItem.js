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
    const [warranty, setWarranty] = useState('');
    const [color, setColor] = useState('');
    const [brand, setBrand] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [rate, setRate] = useState('');
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [colors] = useState(['White','Silver','Grey','Red', 'Blue','Green', 'Yellow', 'Black', 'Orange', 'Purple', 'Pink', 'Brown','Others','All']); // Predefined colors
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/get/item-brand');
                setBrands(response.data.brand);
            } catch (error) {
                console.error('Error fetching brands:', error);
                alert('Failed to load item brands.');
            }
        };

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
        if (name === 'warranty') setWarranty(value);
        if (name === 'brand') setBrand(value);
        if (name === 'rate') setRate(value);
    };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //
    //     // Check if the item already exists
    //     try {
    //         const checkResponse = await axios.get('http://localhost:5000/api/items/check', {
    //             params: {
    //                 item_name: itemName,
    //                 brand,
    //             },
    //         });
    //
    //         if (checkResponse.data.exists) {
    //             alert('Item with this name and brand already exists!');
    //             return; // Stop submission if the item exists
    //         }
    //     } catch (error) {
    //         console.error('Error checking item existence:', error);
    //         alert('Failed to validate item. Please try again.');
    //         return;
    //     }
    //
    //     // Proceed with item creation if it does not exist
    //     try {
    //         const response = await axios.post('http://localhost:5000/api/items', {
    //             itemName,
    //             itemDescription,
    //             itemModel,
    //             warranty,
    //             color,
    //             brand,
    //             itemCategory,
    //             rate,
    //         });
    //
    //         console.log(response.data);
    //         setItemName('');
    //         setItemDescription('');
    //         setItemModel('');
    //         setWarranty('');
    //         setColor('');
    //         setBrand('');
    //         setItemCategory('');
    //         setRate('');
    //         alert('Item added successfully!');
    //         console.log('Submit clicked');
    //     } catch (error) {
    //         console.error('Error creating item:', error);
    //         alert('Failed to create item.');
    //     }
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Map the brand_id to its corresponding brand_name
        const selectedBrand = brands.find((b) => b.brand_id === brand);
        const brandName = selectedBrand ? selectedBrand.brand_name : '';

        if (!brandName) {
            alert('Invalid brand selection.');
            return;
        }

        // Check if the item already exists
        try {
            const checkResponse = await axios.get('http://localhost:5000/api/items/check', {
                params: {
                    item_name: itemName,
                    brand: brandName, // Pass brand name for validation
                },
            });

            if (checkResponse.data.exists) {
                alert('Item with this name and brand already exists!');
                return; // Stop submission if the item exists
            }
        } catch (error) {
            console.error('Error checking item existence:', error);
            alert('Failed to validate item. Please try again.');
            return;
        }

        // Proceed with item creation if it does not exist
        try {
            const response = await axios.post('http://localhost:5000/api/items', {
                itemName,
                itemDescription,
                itemModel,
                warranty,
                color,
                brand: brandName, // Send brand name instead of brand_id
                itemCategory,
                rate,
            });

            console.log(response.data);
            // Clear the form fields
            setItemName('');
            setItemDescription('');
            setItemModel('');
            setWarranty('');
            setColor('');
            setBrand('');
            setItemCategory('');
            setRate('');
            alert('Item added successfully!');
        } catch (error) {
            console.error('Error creating item:', error);
            alert('Failed to create item.');
        }
    };


    const handleBrandChange = async (event) => {
        const selectedBrand = event.target.value;
        setBrand(selectedBrand);

        // Fetch categories for the selected brand
        try {
            const response = await axios.get('http://localhost:5000/api/get/categories-by-brand', {
                params: { brand_id: selectedBrand },
            });
            setCategories(response.data.categories);
        } catch (error) {
            console.error('Error fetching categories for the selected brand:', error);
            alert('Failed to load categories for the selected brand.');
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
                            <TextField
                                fullWidth
                                label="Warranty"
                                name="warranty"
                                value={warranty}
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
                                    onChange={handleBrandChange} // Use the updated handler
                                >
                                    {brands.map((brand) => (
                                        <MenuItem key={brand.brand_id} value={brand.brand_id}>
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
