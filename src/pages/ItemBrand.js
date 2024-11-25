import React, { useEffect, useState } from 'react';
import { Button,Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import DeleteIcon from '@mui/icons-material/Delete';
import config from '../config';

const ItemBrandPage = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/api/get/item-brand`);
                setBrands(response.data.brand);
            } catch (error) {
                console.error('Error fetching brands:', error);
                alert('Failed to load brands');
            } finally {
                setLoading(false);
            }
        };

        fetchBrands();
    }, []);

    const handleCreateBrand = () => {
        navigate('/create-item-brand');
    };

    const handleDeleteBrand = async (brandId) => {
        if (window.confirm('Are you sure you want to delete this brand?')) {
            try {
                await axios.delete(`${config.BASE_URL}/api/delete/item-brand/${brandId}`);
                setBrands(brands.filter((brand) => brand.brand_id !== brandId));
                alert('Brand deleted successfully.');
            } catch (error) {
                console.error('Error deleting brand:', error);
                alert('Failed to delete brand.');
            }
        }
    };

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                }}
            >
                <PageHeader title="Item Brand" color="#FF5722" align="center" />
                <Button variant="contained" color="primary" onClick={handleCreateBrand}>
                    Create Item Brand
                </Button>
            </div>

            {loading ? (
                <CircularProgress />
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {/*<TableCell>Icon</TableCell>*/}
                                <TableCell>Brand Name</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {brands.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        <Typography variant="body1">No brands found.</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                brands.map((brand) => (
                                    <TableRow key={brand.brand_id}>
                                        {/*<TableCell>*/}
                                        {/*    <CorporateFareIcon />*/}
                                        {/*</TableCell>*/}
                                        <TableCell>{brand.brand_name}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleDeleteBrand(brand.brand_id)}
                                            >
                                                <DeleteIcon />Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default ItemBrandPage;
