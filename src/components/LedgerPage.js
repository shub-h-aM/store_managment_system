import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import { styled } from '@mui/system';
import { FaSearch } from "react-icons/fa";

const StyledTableContainer = styled('div')({
    marginBottom: '20px',
});

const StyledPaginationContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
});

const LedgerPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [invoiceTransactions, setInvoiceTransactions] = useState([]);
    const [filteredInvoiceTransactions, setFilteredInvoiceTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [dueAmountFilter, setDueAmountFilter] = useState(false); // State for the checkbox

    useEffect(() => {
        fetchInvoiceTransactions();
    }, []);

    const fetchInvoiceTransactions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/invoice/transactions');
            setInvoiceTransactions(response.data);
            setFilteredInvoiceTransactions(response.data);
        } catch (error) {
            console.error('Error fetching invoice transactions:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        const filteredTransactions = invoiceTransactions.filter((transaction) =>
            Object.values(transaction).some(
                (value) =>
                    typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        setFilteredInvoiceTransactions(filteredTransactions);
        setCurrentPage(1);
    };

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const handleDueAmountFilterChange = (event) => {
        setDueAmountFilter(event.target.checked);
        filterTransactions(event.target.checked);
    };

    const filterTransactions = (dueAmountFilter) => {
        let filteredTransactions = invoiceTransactions;
        if (dueAmountFilter) {
            filteredTransactions = filteredTransactions.filter(transaction => transaction.due_amount > 0);
        }
        setFilteredInvoiceTransactions(filteredTransactions);
        setCurrentPage(1);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTransactions = filteredInvoiceTransactions.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                <Typography variant="h3" gutterBottom>
                    Ledger
                </Typography>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <label style={{marginRight: '10px', border:'1px solid #ccc', borderRadius:'5px',padding:'10px',marginTop:'9px'}}>
                        <input type="checkbox" checked={dueAmountFilter} onChange={handleDueAmountFilterChange}/>
                        &nbsp; Due Amount > 0
                    </label>
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        InputProps={{
                            endAdornment: (
                                <Button onClick={handleSearch} color="primary" size="small">
                                    <FaSearch/>
                                </Button>
                            ),
                        }}
                    />
                </div>
            </div>
            <StyledTableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Invoice Number</TableCell>
                            <TableCell>Sub Total</TableCell>
                            <TableCell>Discount Amount</TableCell>
                            <TableCell>Tax Amount</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Paid Amount</TableCell>
                            <TableCell>Due Amount</TableCell>
                            <TableCell>Date of Due</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentTransactions.map((transaction) => (
                            <TableRow key={transaction.transaction_id}>
                                <TableCell>{transaction.customer_name}<br />{transaction.customer_number}</TableCell>
                                <TableCell>{transaction.invoice_number}</TableCell>
                                <TableCell>{transaction.sub_total}</TableCell>
                                <TableCell>{transaction.discount_amount}</TableCell>
                                <TableCell>{transaction.tax_amount}</TableCell>
                                <TableCell>{transaction.total}</TableCell>
                                <TableCell>{transaction.paid_amount}</TableCell>
                                <TableCell>{transaction.due_amount}</TableCell>
                                <TableCell>{transaction.date_of_due}</TableCell>
                                <TableCell>
                                    <Button variant="contained">
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>
            <StyledPaginationContainer>
                <Pagination
                    count={Math.ceil(filteredInvoiceTransactions.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </StyledPaginationContainer>
        </>
    );
};

export default LedgerPage;
