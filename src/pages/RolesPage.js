import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container, Typography, Table, TableHead, TableBody, TableRow, TableCell,
    Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const RolesPage = () => {
    const [roles, setRoles] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentRole, setCurrentRole] = useState({ id: '', roleName: '' });

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/ops/roles');
            setRoles(data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const handleOpenDialog = (role = { id: '', roleName: '' }) => {
        setCurrentRole(role);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setCurrentRole({ id: '', roleName: '' });
        setOpenDialog(false);
    };

    const handleSaveRole = async () => {
        try {
            if (currentRole.id) {
                // Update existing role
                await axios.put(`http://localhost:5000/api/roles/${currentRole.id}`, {
                    roleName: currentRole.roleName,
                });
                alert('Role updated successfully');
            } else {
                // Add new role
                await axios.post('http://localhost:5000/api/roles', {
                    roleName: currentRole.roleName,
                });
                alert('Role added successfully');
            }
            fetchRoles();
            handleCloseDialog();
        } catch (error) {
            console.error('Error saving role:', error);
        }
    };

    const handleDeleteRole = async (id) => {
        if (window.confirm('Are you sure you want to delete this role?')) {
            try {
                await axios.delete(`http://localhost:5000/api/roles/${id}`);
                alert('Role deleted successfully');
                fetchRoles();
            } catch (error) {
                console.error('Error deleting role:', error);
            }
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom style={{ marginTop: '15px' }}>
                Roles Management
            </Typography>

            <Button
                variant="contained"
                color="primary"
                style={{ marginBottom: '15px' }}
                onClick={() => handleOpenDialog()}
            >
                Add Role
            </Button>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Role Name</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {roles.map((role) => (
                        <TableRow key={role.id}>
                            <TableCell>{role.id}</TableCell>
                            <TableCell>{role.role_name}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleOpenDialog(role)}>
                                    <Edit />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteRole(role.id)}>
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{currentRole.id ? 'Edit Role' : 'Add Role'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Role Name"
                        fullWidth
                        value={currentRole.roleName}
                        onChange={(e) =>
                            setCurrentRole({ ...currentRole, roleName: e.target.value })
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveRole} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default RolesPage;
