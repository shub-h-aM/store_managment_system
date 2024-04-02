import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import '../index.css';
import TablePagination from "@mui/material/TablePagination";

const ItemDetails = () => {
    const [formData, setFormData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0); // Changed initial page to 0
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [indexOfFirstItem, setIndexOfFirstItem] = useState(0);
    const [indexOfLastItem, setIndexOfLastItem] = useState(itemsPerPage);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData =  async () => {
        try {
            setLoading(true);
            const response = await  axios.get('http://localhost:5000/api/itemDetails');
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching item data:', error);
            alert("Failed to get data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
        const newIndexOfFirstItem = newPage * itemsPerPage;
        const newIndexOfLastItem = newIndexOfFirstItem + itemsPerPage;
        setIndexOfFirstItem(newIndexOfFirstItem);
        setIndexOfLastItem(newIndexOfLastItem);
    };

    const handleChangeRowsPerPage = (event) => {
        setItemsPerPage(+event.target.value);
        setCurrentPage(0); // Reset current page when changing rows per page
        setIndexOfFirstItem(0); // Reset index of first item
        setIndexOfLastItem(+event.target.value); // Reset index of last item
    };

    const filteredItems = formData.filter(item =>
        item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.item_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.item_category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="container">
            <h2>Item Details</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-button" onClick={fetchData} disabled={loading}>
                    {loading ? 'Loading...' : <FaSearch />}
                </button>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>Purchase Date</th>
                            <th>Item</th>
                            <th>Item Type</th>
                            <th>Brand</th>
                            <th>Item Category</th>
                            <th>Quantity</th>
                            <th>Rate Per Piece</th>
                            <th>Total GST</th>
                            <th>Location</th>
                            <th>Supplier</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentItems.map((data, index) => (
                            <tr key={index}>
                                <td>{data.date_of_purchase.split('T')[0]}</td>
                                <td>{data.item}</td>
                                <td>{data.item_type}</td>
                                <td>{data.brand}</td>
                                <td>{data.item_category}</td>
                                <td>{data.qty}</td>
                                <td>{Math.round((data.total_amount / data.qty) + (((data.total_amount / data.qty) * data.total_gst) / 100))}</td>
                                <td>{data.total_gst}</td>
                                <td>{data.location}</td>
                                <td>{data.supplier}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={filteredItems.length}
                rowsPerPage={itemsPerPage}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};

export default ItemDetails;
