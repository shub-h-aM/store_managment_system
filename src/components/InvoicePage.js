import React, { useState } from 'react';

const InvoicePage = () => {
    const [customerName, setCustomerName] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [items, setItems] = useState([]);
    const [discount, setDiscount] = useState(0);
    const [totalGST, setTotalGST] = useState(18);


    const handleAddItem = () => {
        // Here, you can prompt the user to enter item details and add them to the "items" state
        const itemName = prompt('Enter item name:');
        const ratePerPiece = parseFloat(prompt('Enter rate per piece:'));
        const quantity = parseInt(prompt('Enter quantity:'));
        const newItem = {
            itemName: itemName,
            ratePerPiece: ratePerPiece,
            quantity: quantity,
            amount: ratePerPiece * quantity
        };
        setItems([...items, newItem]);
    };

    // Implement handleSaveInvoice function
    const handleSaveInvoice = () => {
        // Prepare the data for the API request
        const invoiceData = {
            customerName: customerName,
            items: items
        };
        // Send a POST request to save the invoice data
        fetch('/api/invoices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(invoiceData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Invoice saved successfully:', data);
                // Reset form fields or perform other actions as needed
            })
            .catch(error => {
                console.error('Error saving invoice:', error);
                // Handle error
            });
    };

    return (
        <div className="invoice-page">
            {/* Header section */}
            <div className="header">
                <div>
                    <p>GSTIn No: GSTInv0922up2973</p>
                    <p>TIN No: 87ytghu76</p>
                    <p>Invoice No: 00</p>
                </div>
                <div>
                    <img src="shop_logo.png" alt="Shop Logo"/>
                    <p>Shop Name</p>
                    <p>Shop Address</p>
                    <p>Contact Number Of Shop</p>
                </div>
            </div>
            <hr/>
            {/* Customer details section */}
            <div className="customer-details">
                <p>Customer Name: <input type="text" value={customerName}
                                         onChange={(e) => setCustomerName(e.target.value)}/></p>
                <p>Customer Address: <input type="text" value={customerAddress}
                                            onChange={(e) => setCustomerAddress(e.target.value)}/></p>
            </div>
            <hr/>
            {/* Items section */}
            <div className="items">
                <table>
                    <thead>
                    <tr>
                        <th>Serial No.</th>
                        <th>Item Name</th>
                        <th>Rate per piece</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Map through items and render each item dynamically */}
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.itemName}</td>
                            <td>{item.ratePerPiece}</td>
                            <td>{item.quantity}</td>
                            <td>{item.amount}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button onClick={handleAddItem}>Add Item</button>
            </div>
            <hr />
            {/* Totals section */}
            <div className="totals">
                <p>Total Amount: ${items.reduce((acc, item) => acc + item.amount, 0)}</p>
                <p>Total GST: $<input type="number" min={0} value={totalGST} onChange={(e) => setTotalGST(e.target.value)}/></p>
                <p>Discount: $<input type="number" min={0} value={discount} onChange={(e) => setDiscount(e.target.value)}/></p>
                <p>Grand Total:
                    ${(items.reduce((acc, item) => acc + item.amount, 0) + parseFloat(totalGST)) - parseFloat(discount)}</p>
            </div>

            <hr/>
            {/* Footer section */}
            <div className="footer">
                <p>Thank you for shopping with us!</p>
            </div>
            {/* Save Invoice button */}
            <button onClick={handleSaveInvoice}>Save Invoice</button>
        </div>
    );
};

export default InvoicePage;
