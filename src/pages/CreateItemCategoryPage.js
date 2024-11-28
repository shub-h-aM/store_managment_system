import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

const CreateItemCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const navigate = useNavigate();

    // Fetch brands when the component loads
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/get/item-brand');
                setBrands(response.data.brand);
            } catch (error) {
                console.error('Error fetching brands:', error);
                alert('Failed to load brands.');
            }
        };

        fetchBrands();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/create/item-category', {
                category_name: categoryName,
                brand_id: selectedBrand, // Include the selected brand ID
            });

            alert(response.data.message);
            setCategoryName('');
            setSelectedBrand(''); // Reset selected brand
        } catch (error) {
            alert(error.response ? error.response.data.message : 'Error creating category');
        }
    };

    const handleBack = () => {
        navigate('/ops/get-category'); // Redirect to the item category page
    };

    return (
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <PageHeader title="Create Item Category" color="#FF5722" align="center" />
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="brand-label">Select Brand</InputLabel>
                    <Select
                        labelId="brand-label"
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        required
                    >
                        {brands.map((brand) => (
                            <MenuItem key={brand.brand_id} value={brand.brand_id}>
                                {brand.brand_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    label="Category Name"
                    variant="outlined"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Create Category
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleBack} sx={{ mt: 2, ml: 2 }}>
                    Back
                </Button>
            </form>
        </div>
    );
};

export default CreateItemCategory;
