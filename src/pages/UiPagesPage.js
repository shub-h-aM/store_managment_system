import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container, Typography, Table, TableHead, TableBody, TableRow, TableCell,
    Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const UiPagesPage = () => {
    const [pages, setPages] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentPage, setCurrentPage] = useState({ id: '', pageName: '', description: '' });

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/get/pages');
            setPages(data);
        } catch (error) {
            console.error('Error fetching pages:', error);
        }
    };

    const handleOpenDialog = (page = { id: '', pageName: '', description: '' }) => {
        setCurrentPage(page);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setCurrentPage({ id: '', pageName: '', description: '' });
        setOpenDialog(false);
    };

    const handleSavePage = async () => {
        try {
            if (currentPage.id) {
                // Update existing page
                await axios.put(`http://localhost:5000/api/pages/${currentPage.id}`, {
                    pageName: currentPage.pageName,
                    description: currentPage.description,
                });
                alert('Page updated successfully');
            } else {
                // Add new page
                await axios.post('http://localhost:5000/api/pages', {
                    pageName: currentPage.pageName,
                    description: currentPage.description,
                });
                alert('Page added successfully');
            }
            fetchPages();
            handleCloseDialog();
        } catch (error) {
            console.error('Error saving page:', error);
        }
    };

    const handleDeletePage = async (id) => {
        if (window.confirm('Are you sure you want to delete this page?')) {
            try {
                await axios.delete(`http://localhost:5000/api/pages/${id}`);
                alert('Page deleted successfully');
                fetchPages();
            } catch (error) {
                console.error('Error deleting page:', error);
            }
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom style={{ marginTop: '15px' }}>
                Pages Management
            </Typography>

            <Button
                variant="contained"
                color="primary"
                style={{ marginBottom: '15px' }}
                onClick={() => handleOpenDialog()}
            >
                Add Page
            </Button>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Page Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pages.map((page) => (
                        <TableRow key={page.id}>
                            <TableCell>{page.id}</TableCell>
                            <TableCell>{page.page_name}</TableCell>
                            <TableCell>{page.description}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleOpenDialog(page)}>
                                    <Edit />
                                </IconButton>
                                <IconButton onClick={() => handleDeletePage(page.id)}>
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{currentPage.id ? 'Edit Page' : 'Add Page'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Page Name"
                        fullWidth
                        value={currentPage.pageName}
                        onChange={(e) =>
                            setCurrentPage({ ...currentPage, pageName: e.target.value })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        value={currentPage.description}
                        onChange={(e) =>
                            setCurrentPage({ ...currentPage, description: e.target.value })
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSavePage} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default UiPagesPage;
