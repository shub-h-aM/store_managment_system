import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';
import TablePagination from '@mui/material/TablePagination';
import { FaSearch } from 'react-icons/fa';

// Assuming you still want to use the same column configuration as in ColumnGroupingTable
const columns = [
    { id: 'Name', label: 'Name', minWidth: 170 },
    { id: 'Email', label: 'Email', minWidth: 170 },
    { id: 'Username', label: 'Username', minWidth: 170 },
    { id: 'ContactNumber', label: 'Contact Number', minWidth: 170 }
];

const Inventory = () => {
    const [formData, setFormData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Use useState instead of React.useState

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true); // Set loading state to true
            const response = await axios.get('http://localhost:5000/api/inventory');
            setFormData(response.data); // Update formData state with fetched data
        } catch (error) {
            console.error('Error fetching form data:', error);
            alert("Failed to get data.");
        } finally {
            setLoading(false); // Set loading state to false regardless of success or failure
        }
    };

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setItemsPerPage(+event.target.value);
        setCurrentPage(0); // Reset current page when changing rows per page
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Filter the formData based on searchTerm
    const filteredItems = formData.filter(item =>
        item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ContactNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get the currentItems based on pagination and filteredItems
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="container">
            <h2>Inventory</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-button" disabled={loading}>
                    {loading ? 'Loading...' : <FaSearch />}
                </button>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.id}>{column.label}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {currentItems.map((data, index) => (
                        <tr key={index}>
                            {columns.map((column) => (
                                <td key={column.id}>{data[column.id]}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={filteredItems.length} // Use filteredItems.length instead of formData.length
                rowsPerPage={itemsPerPage}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};

export default Inventory;
