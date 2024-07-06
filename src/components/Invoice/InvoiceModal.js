import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
import { GenerateInvoice } from '../helpers/GenerateInvoice';

class InvoiceModal extends React.Component {
    state = {
        invoiceSaved: false,
    };

    handleSave = () => {
        const { billTo, billToContact, invoiceNumber, subTotal, discountAmount, cgstAmount, sgstAmount, grandTotal, dueAmount, paidAmount, dateOfDue } = this.props.info;
        const items = this.props.items.map(item => ({
            itemName: item.name,
            rate: item.price,
            quantity: item.quantity,
            amount: parseFloat((item.price * item.quantity).toFixed(2)),
        }));

        Promise.all([
            fetch('http://localhost:5000/api/invoices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customer_name: billTo,
                    customer_number: billToContact,
                    invoice_number: invoiceNumber,
                    items: items,
                }),
            }),
            fetch('http://localhost:5000/api/invoice_transaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customer_name: billTo,
                    customer_number: billToContact,
                    invoice_number: invoiceNumber,
                    sub_total: subTotal,
                    discount_amount: discountAmount,
                    cgst_amount: cgstAmount,
                    sgst_amount: sgstAmount,
                    grand_total: grandTotal,
                    paid_amount: paidAmount,
                    due_amount: dueAmount,
                    date_of_due: dateOfDue,
                }),
            }),
        ])
            .then(([invoiceResponse, transactionResponse]) => Promise.all([invoiceResponse.json(), transactionResponse.json()]))
            .then(([invoiceData, transactionData]) => {
                console.log('Invoice saved successfully:', invoiceData);
                console.log('Transaction saved successfully:', transactionData);
                alert("Invoice and transaction saved successfully:");
                this.setState({ invoiceSaved: true });
            })
            .catch(error => {
                console.error('Error saving invoice and transaction:', error);
                alert("Failed to Save Invoice and Transaction Data!");
            });
    };

    handleNext = () => {
        if (this.state.invoiceSaved) {
            this.props.closeModal();
            window.location.reload();
        } else {
            alert("Please save the invoice before proceeding to the next step.");
        }
    };

    handleDownload = () => {
        if (this.state.invoiceSaved) {
            GenerateInvoice(this.props.info.invoiceNumber);
        } else {
            alert("Please save the invoice before downloading.");
        }
    };

    render() {
        return (
            <div>
                <Modal show={this.props.showModal} onHide={this.props.closeModal} size="lg" centered>
                    <div id="print">
                        <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
                            <div className="w-100">
                                <h6 className="fw-bold text-secondary mb-1">GST #: 345trf656ytf6</h6>
                                <h6 className="fw-bold text-secondary mb-1">
                                    Invoice #: {this.props.info.invoiceNumber || ''}
                                </h6>
                            </div>
                            <div className="text-end ms-4">
                                <h6 className="fw-bold mt-1 mb-2">Amount&nbsp;Due:</h6>
                                <h5 className="fw-bold text-secondary">{this.props.currency} {this.props.dueAmount}</h5>
                            </div>
                        </div>
                        <div className="p-4">
                            <Row className="mb-4">
                                <Col md={4}>
                                    <div className="fw-bold">Billed From:</div>
                                    <div>{"Shubham Tripathi"}</div>
                                    <div>{"Delhi, 122022"}</div>
                                    <div>{"9090909090"}</div>
                                </Col>
                                <Col md={4}>
                                    <div className="fw-bold">Billed to:</div>
                                    <div>{this.props.info.billTo || ''}</div>
                                    <div>{this.props.info.billToAddress || ''}</div>
                                    <div>{this.props.info.billToContact || ''}</div>
                                </Col>
                                <Col md={4}>
                                    <div className="fw-bold mt-2">Date Of Issue:</div>
                                    <div>{new Date().toLocaleDateString()}</div>
                                    {this.props.info.dateOfDue && (
                                        <div>
                                            <div className="fw-bold mt-2">Due Payment Date:</div>
                                            <div>{this.props.info.dateOfDue || ''}</div>
                                        </div>
                                    )}
                                </Col>
                            </Row>
                            <Table className="mb-0">
                                <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>ITEM DESCRIPTION</th>
                                    <th>QTY</th>
                                    <th className="text-end">PRICE</th>
                                    <th className="text-end">AMOUNT</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.props.items.map((item, i) => {
                                    const serialNumber = i + 1;
                                    return (
                                        <tr key={i}>
                                            <td style={{ width: '50px' }}>{serialNumber}</td>
                                            <td>{item.name}</td>
                                            <td style={{ width: '60px' }}>{item.quantity}</td>
                                            <td className="text-end" style={{ width: '100px' }}>{this.props.currency} {item.price}</td>
                                            <td className="text-end" style={{ width: '100px' }}>{this.props.currency} {item.price * item.quantity}</td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </Table>
                            <Table>
                                <tbody>
                                <tr>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr className="text-end">
                                    <td></td>
                                    <td className="fw-bold" style={{ width: '100px' }}>SUBTOTAL</td>
                                    <td className="text-end" style={{ width: '100px' }}>{this.props.currency} {this.props.subTotal}</td>
                                </tr>
                                {this.props.cgstAmount !== 0.00 && (
                                    <tr className="text-end">
                                        <td></td>
                                        <td className="fw-bold" style={{ width: '100px' }}>CGST </td>
                                        <td className="text-end" style={{ width: '100px' }}>{this.props.currency} {this.props.cgstAmount}</td>
                                    </tr>
                                )}
                                {this.props.sgstAmount !== 0.00 && (
                                    <tr className="text-end">
                                        <td></td>
                                        <td className="fw-bold" style={{ width: '100px' }}>SGST </td>
                                        <td className="text-end" style={{ width: '100px' }}>{this.props.currency} {this.props.sgstAmount}</td>
                                    </tr>
                                )}
                                {this.props.discountAmount !== 0.00 && (
                                    <tr className="text-end">
                                        <td></td>
                                        <td className="fw-bold" style={{ width: '100px' }}>DISCOUNT</td>
                                        <td className="text-end" style={{ width: '100px' }}>{this.props.currency} {this.props.discountAmount}</td>
                                    </tr>
                                )}
                                <tr className="text-end">
                                    <td></td>
                                    <td className="fw-bold" style={{ width: '100px' }}>GRAND TOTAL</td>
                                    <td className="text-end" style={{ width: '100px' }}>{this.props.currency} {this.props.grandTotal}</td>
                                </tr>
                                </tbody>
                            </Table>
                            {this.props.info.notes && (
                                <div className="bg-light py-3 px-4 rounded">
                                    {this.props.info.notes}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="pb-4 px-4">
                        <Row className="d-flex justify-content-between">
                            <Col md={3} className="d-flex align-items-center">
                                <div className="fw-bold">Paid Amount:</div>
                                <div className="fw-bold text-secondary">&nbsp;{this.props.currency} {this.props.info.paidAmount}</div>
                            </Col>
                            <Col md={3} className="d-flex align-items-center">
                                <div className="fw-bold">Due Amount:</div>
                                <div className="fw-bold text-secondary">&nbsp; {this.props.currency} {this.props.info.dueAmount}</div>
                            </Col>
                        </Row>
                    </div>
                    <div className="pb-4 px-4">
                        <Row>
                            <Col md={3}>
                                <Button variant="outline-primary" className="d-block w-100 mt-3 mt-md-0" onClick={this.handleSave}>
                                    <BiPaperPlane style={{ width: '16px', height: '16px', marginTop: '-3px' }} className="me-2" />
                                    Save
                                </Button>
                            </Col>
                            <Col md={3}>
                                <Button id="downloadButton" variant="outline-primary" className="d-block w-100 mt-3 mt-md-0" onClick={this.handleDownload}>
                                    <BiCloudDownload style={{ width: '16px', height: '16px', marginTop: '-3px' }} className="me-2" />
                                    Download
                                </Button>
                            </Col>
                            <Col md={3}>
                                <Button variant="secondary" className="d-block w-100 mt-3 mt-md-0" style={{ "--bs-btn-bg": "#c95955" }} onClick={this.props.closeModal}>
                                    Close
                                </Button>
                            </Col>
                            <Col md={3}>
                                <Button variant="primary" className="d-block w-100 mt-3 mt-md-0" onClick={this.handleNext}>
                                    Next
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Modal>
                <hr className="mt-4 mb-3" />
            </div>
        );
    }
}

export default InvoiceModal;
