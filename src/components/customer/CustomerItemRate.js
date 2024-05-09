import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import "../../index.css";
import TablePagination from "@mui/material/TablePagination";
import { GenerateRateList } from "../helpers/GenerateRateList";
import {Button} from "@mui/material";
import {LiaFileDownloadSolid} from "react-icons/lia";
import {GrDocumentDownload} from "react-icons/gr";
import Footer from "../Footer";

const CustomerItemRate = () => {
    const [formData, setFormData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [indexOfFirstItem, setIndexOfFirstItem] = useState(0);
    const [indexOfLastItem, setIndexOfLastItem] = useState(itemsPerPage);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/get/items');
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching item data:', error);
            alert("Failed to get data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/get/items');
            setFormData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching item data:', error);
            alert("Failed to get data. Please try again later.");
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
        const newItemsPerPage = +event.target.value;
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(0);
        setIndexOfFirstItem(0);
        setIndexOfLastItem(newItemsPerPage);
    };

    const handleGeneratePDF = () => {
        // Call GenerateRateList function with appropriate parameters
        GenerateRateList(true);
    };

    const handleGenerateExcel = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/generate-excel', {
                responseType: 'blob'
            });
            const currentDate = new Date();
            const month = currentDate.toLocaleString('default', { month: 'long' });
            const fileName = `Shubham_Ele_item_rates_${month}.xlsx`;
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            setLoading(false);
        } catch (error) {
            console.error('Error generating Excel:', error);
            alert("Failed to generate Excel. Please try again later.");
            setLoading(false);
        }
    };

    const filteredItems = formData.filter(item =>
        (item.item_name && item.item_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.item_description && item.item_description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.brand && item.brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (typeof item.rate === 'string' && item.rate.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="container"
             style={{position: 'revert-layer', width: '90%', marginLeft: '5%', marginTop: '1%', height: 'auto'}}>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-button" onClick={handleSearch} disabled={loading}>
                    {loading ? 'Loading...' : <FaSearch/>}
                </button>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div id='print'>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <h3>Shubham </h3>
                        <h5>Delhi </h5>
                        <h4>Item Rate List</h4>
                        <Button onClick={handleGeneratePDF} variant="contained" color="primary"
                                style={{position: 'fixed', top: '100px', right: '10px'}}>
                            <LiaFileDownloadSolid style={{marginRight: '7px', marginLeft: "-4px"}}/>Download PDF
                        </Button>
                        <Button onClick={handleGenerateExcel} variant="contained" color="primary"
                                style={{position: 'fixed', top: '100px', right: '179px'}}>
                            <GrDocumentDownload style={{marginRight: '7px', color: 'wheat', marginLeft: "-4px"}}/>Download
                            Excel
                        </Button>
                    </div>
                    <table>
                        <thead style={{backgroundColor: '#f2f2f2'}}>
                        <tr>
                            <th>S.No.</th>
                            <th>Item Name</th>
                            <th>Item Description</th>
                            <th>Brand</th>
                            <th>Rate</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.item_name}</td>
                                <td>{item.item_description}</td>
                                <td>{item.brand}</td>
                                <td>₹ {((parseFloat(item.rate) * 107) / 100).toFixed(2)}</td>
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
            <Footer />
        </div>
    );
};

export default CustomerItemRate;
