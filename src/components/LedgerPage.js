import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, ThemeProvider, createTheme, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

const theme = createTheme();

const StyledContainer = styled(Container)({
    marginTop: theme.spacing(4),
});

const StyledSearchContainer = styled('div')({
    marginBottom: theme.spacing(2),
});

const StyledTextField = styled(TextField)({
    marginRight: theme.spacing(2),
    width: '250px', // Adjust width as needed
});

const StyledButton = styled(Button)({});

const LedgerPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [invoiceTransactions, setInvoiceTransactions] = useState([]);
    const [filteredInvoiceTransactions, setFilteredInvoiceTransactions] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null); // For menu anchor
    const [selectedTransaction, setSelectedTransaction] = useState(null); // For selected transaction
    const [openDialog, setOpenDialog] = useState(false); // For opening dialog
    const [editedTransaction, setEditedTransaction] = useState(null); // For edited transaction

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
    };
    const handleActionClick = (event, transaction) => {
        setAnchorEl(event.currentTarget);
        setSelectedTransaction(transaction);
        console.log('Selected Transaction:', transaction);
        setOpenDialog(true);
        setEditedTransaction({
            ...transaction,
            new_payment: '',
            comments: '',
        });
    };


    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedTransaction(null);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setEditedTransaction(null);
    };

    const handleSave = async () => {
        try {
            // Calculate new paid amount by adding new payment to existing paid amount
            const newPaidAmount = parseFloat(selectedTransaction.paid_amount) + parseFloat(editedTransaction.new_payment);

            const newDueAmount = parseFloat(selectedTransaction.total) - newPaidAmount;
            const updatedAt = new Date().toISOString();
            console.log('Edited Transaction:', editedTransaction);

            if (!editedTransaction || !editedTransaction.transaction_id) {
                console.error('Transaction ID is undefined');
                return;
            }
            // Send a POST request to update API
            const response = await axios.post('http://localhost:5000/api/invoice/transactions/update', {
                transaction_id: editedTransaction.transaction_id,
                newPaidAmount: newPaidAmount,
                newDueAmount: newDueAmount,
                comments: editedTransaction.comments,
                updatedAt: updatedAt,

            });

            console.log('Transaction updated successfully:', response.data);
            handleDialogClose();
            fetchInvoiceTransactions();   // Refresh rth transactions
        } catch (error) {
            console.error('Error updating transaction:', error);
        }
    };



    const handleNewPaymentChange = (event) => {
        setEditedTransaction({
            ...editedTransaction,
            new_payment: event.target.value,
        });
    };

    const handleCommentsChange = (event) => {
        setEditedTransaction({
            ...editedTransaction,
            comments: event.target.value,
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <StyledContainer>
                <StyledSearchContainer>
                    <StyledTextField
                        label="Search"
                        variant="outlined"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <StyledButton variant="contained" color="primary" onClick={handleSearch}>
                        Search
                    </StyledButton>
                </StyledSearchContainer>
                <TableContainer component={Paper}>
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
                            {filteredInvoiceTransactions.map((transaction) => (
                                <TableRow key={transaction.transaction_id}>
                                    <TableCell>{transaction.customer_name}</TableCell>
                                    <TableCell>{transaction.invoice_number}</TableCell>
                                    <TableCell>{transaction.sub_total}</TableCell>
                                    <TableCell>{transaction.discount_amount}</TableCell>
                                    <TableCell>{transaction.tax_amount}</TableCell>
                                    <TableCell>{transaction.total}</TableCell>
                                    <TableCell>{transaction.paid_amount}</TableCell>
                                    <TableCell>{transaction.due_amount}</TableCell>
                                    <TableCell>{transaction.date_of_due}</TableCell>
                                    <TableCell>
                                        <StyledButton variant="contained" onClick={(event) => handleActionClick(event, transaction)}>
                                            Edit
                                        </StyledButton>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog open={openDialog} onClose={handleDialogClose}>
                    <DialogTitle>Edit Transaction</DialogTitle>
                    <DialogContent>
                        <div className="fw-bold">Due Amount: ₹ {selectedTransaction ? selectedTransaction.due_amount : 0}</div>
                    <TextField
                        label="New Payment" type="number" min="0"
                            value={editedTransaction ? editedTransaction.new_payment : ''}
                            onChange={handleNewPaymentChange}
                        />
                        <TextField
                            label="Comments" value={editedTransaction ? editedTransaction.comments : ''}
                            onChange={handleCommentsChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose}>Cancel</Button>
                        <Button onClick={handleSave} color="primary">Save</Button>
                    </DialogActions>
                </Dialog>
            </StyledContainer>
        </ThemeProvider>
    );
};

export default LedgerPage;
