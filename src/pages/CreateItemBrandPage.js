import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';


const CreateItemBrand = () => {
    const [brandName, setBrandName] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/create/item-brand', {
                brand_name: brandName,
            });

            // Show success message using alert
            alert(response.data.message);
            setBrandName('');
        } catch (error) {
            // Show error message using alert
            alert(error.response ? error.response.data.message : 'Error creating brand');
        }
    };

    const handleBack = () => {
        navigate('/ops/get-brand'); 
    };

    return (
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <PageHeader title="Create Item Brand" color="#FF5722" align="center" />
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Brand Name"
                    variant="outlined"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    required
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Create Brand
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleBack} sx={{ mt: 2, ml: 2 }}>
                    Back
                </Button>
            </form>
        </div>
    );
};

export default CreateItemBrand;
