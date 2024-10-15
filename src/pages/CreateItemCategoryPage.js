import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const CreateItemCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = "${config.BASE_URL}";
            const response = await axios.post(url+'/api/create/item-category', {
                category_name: categoryName,
            });

            // Show success message using alert
            alert(response.data.message);
            setCategoryName('');
        } catch (error) {
            // Show error message using alert
            alert(error.response ? error.response.data.message : 'Error creating category');
        }
    };

    const handleBack = () => {
        navigate('/ops/get-category'); // Redirect to the item category page
    };

    return (
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom>Create Item Category</Typography>
            <form onSubmit={handleSubmit}>
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
