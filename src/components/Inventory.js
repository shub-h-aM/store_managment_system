import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';
import { FaSearch } from 'react-icons/fa';

const Inventory = () => {
    const [formData, setFormData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);

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

    const handleGetData = () => {
        // Removed fetchData from handleGetData to avoid redundant API calls
    };

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = formData.slice(indexOfFirstItem, indexOfLastItem);

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
                <button className="search-button" onClick={handleGetData} disabled={loading}>
                    {loading ? 'Loading...' : <FaSearch />}
                </button>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Contact Number</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentItems.map((data, index) => (
                        <tr key={index}>
                            <td>{data.Name}</td>
                            <td>{data.Email}</td>
                            <td>{data.Username}</td>
                            <td>{data.ContactNumber}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                {Array.from({ length: Math.ceil(formData.length / itemsPerPage) }, (_, index) => (
                    <button key={index} onClick={() => handlePagination(index + 1)}>{index + 1}</button>
                ))}
            </div>
        </div>
    );
};

export default Inventory;
