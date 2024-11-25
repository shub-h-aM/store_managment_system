import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container, Typography, Grid, Button, Select, MenuItem, FormControl, InputLabel,
    Table, TableBody, TableCell, TableHead, TableRow
} from '@mui/material';

const AccessManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [pages, setPages] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedPage, setSelectedPage] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/access-management');
                console.log(data); 

                setUsers(data.users || []); 
                setRoles(data.roles || []);
                setPages(data.pages || []);

                console.log('Users:', data.users);
                console.log('Roles:', data.roles);
                console.log('Pages:', data.pages);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);



    const handleAssignAccess = async () => {
        if (!selectedUser || !selectedPage || !selectedRole) return;

        try {
            await axios.post('http://localhost:5000/api/access-management/assign', {
                userId: selectedUser,
                pageId: selectedPage,
                roleId: selectedRole,
            });
            alert('Access assigned successfully!');
        } catch (error) {
            console.error('Error assigning access:', error);
        }
    };

    if (loading) return <Typography>Loading...</Typography>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom style={{ marginTop: '15px' }}>
                Access Management Page
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                        <InputLabel>User</InputLabel>
                        <Select value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
                            {users.map(user => (
                                <MenuItem key={user.id} value={user.id}>
                                    {user.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                        <InputLabel>Page</InputLabel>
                        <Select value={selectedPage} onChange={e => setSelectedPage(e.target.value)}>
                            {pages.map(page => (
                                <MenuItem key={page.id} value={page.id}>
                                    {page.page_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                        <InputLabel>Role</InputLabel>
                        <Select value={selectedRole} onChange={e => setSelectedRole(e.target.value)}>
                            {roles.map(role => (
                                <MenuItem key={role.id} value={role.id}>
                                    {role.role_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAssignAccess}
                        style={{ marginTop: '15px' }}
                    >
                        Assign Access
                    </Button>
                </Grid>
            </Grid>

            <Typography variant="h5" style={{ marginTop: '30px' }}>User Access List</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell>Page</TableCell>
                        <TableCell>Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user => (
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            {/* Replace with actual access data */}
                            <TableCell>-</TableCell>
                            <TableCell>-</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default AccessManagementPage;
