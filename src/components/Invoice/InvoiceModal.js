import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function GenerateInvoice() {
    html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
        const imgData = canvas.toDataURL('image/png', 1.0);
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: [612, 792]
        });
        pdf.internal.scaleFactor = 1;
        const imgProps= pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('invoice-001.pdf');
    });
}

class InvoiceModal extends React.Component {
    handleSave = () => {
        fetch('http://localhost:5000/api/invoices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customerName: this.props.info.billTo,
                items: this.props.items,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Invoice saved successfully:', data);
                alert("Invoice saved successfully:");
            })
            .catch(error => {
                console.error('Error saving invoice:', error);
                alert("Failed to Save Invoice Data!")
            });
    };

    handleEmailShare = () => {
        const emailSubject = encodeURIComponent('Invoice');
        const emailBody = encodeURIComponent('Please find the attached invoice.');
        window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
    }

    handleWhatsAppShare = () => {
        const message = encodeURIComponent('Please find the attached invoice.');
        window.location.href = `https://wa.me/?text=${message}`;
    }

    render() {
        return(
            <div>
                <Modal show={this.props.showModal} onHide={this.props.closeModal} size="lg" centered>
                    <div id="invoiceCapture">
                        <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
                            <div className="w-100">
                                <h6 className="fw-bold text-secondary mb-1">GST #: 345trf656ytf6</h6>
                                <h6 className="fw-bold text-secondary mb-1">
                                    Invoice #: {this.props.info.invoiceNumber||''}
                                </h6>
                                {/*<h4 className="fw-bold my-2" style={{textAlign: 'center'}}>{this.props.info.billFrom||'Shubham'}</h4>*/}
                            </div>
                            <div className="text-end ms-4">
                                <h6 className="fw-bold mt-1 mb-2">Amount&nbsp;Due:</h6>
                                <h5 className="fw-bold text-secondary"> {this.props.currency} {this.props.total}</h5>
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
                                    <div>{this.props.info.billTo||''}</div>
                                    <div>{this.props.info.billToAddress||''}</div>
                                    <div>{this.props.info.billToEmail||''}</div>
                                </Col>
                                <Col md={4}>
                                    <div className="fw-bold mt-2">Date Of Issue:</div>
                                    <div>{this.props.info.dateOfIssue||''}</div>
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
                                    return (
                                        <tr id={i} key={i}>
                                            <td style={{width: '50px'}}>
                                                {item.sno}]
                                            </td>
                                            <td>
                                                {item.name}
                                            </td>
                                            <td style={{width: '60px'}}>
                                                {item.quantity}
                                            </td>
                                            <td className="text-end"
                                                style={{width: '100px'}}>{this.props.currency} {item.price}</td>
                                            <td className="text-end"
                                                style={{width: '100px'}}>{this.props.currency} {item.price * item.quantity}</td>
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
                                    <td className="fw-bold" style={{width: '100px'}}>SUBTOTAL</td>
                                    <td className="text-end" style={{width: '100px'}}>{this.props.currency} {this.props.subTotal}</td>
                                </tr>
                                {this.props.taxAmount !== 0.00 &&
                                    <tr className="text-end">
                                        <td></td>
                                        <td className="fw-bold" style={{width: '100px'}}>TAX</td>
                                        <td className="text-end" style={{width: '100px'}}>{this.props.currency} {this.props.taxAmount}</td>
                                    </tr>
                                }
                                {this.props.discountAmount !== 0.00 &&
                                    <tr className="text-end">
                                        <td></td>
                                        <td className="fw-bold" style={{width: '100px'}}>DISCOUNT</td>
                                        <td className="text-end" style={{width: '100px'}}>{this.props.currency} {this.props.discountAmount}</td>
                                    </tr>
                                }
                                <tr className="text-end">
                                    <td></td>
                                    <td className="fw-bold" style={{width: '100px'}}>TOTAL</td>
                                    <td className="text-end" style={{width: '100px'}}>{this.props.currency} {this.props.total}</td>
                                </tr>
                                </tbody>
                            </Table>
                            {this.props.info.notes &&
                                <div className="bg-light py-3 px-4 rounded">
                                    {this.props.info.notes}
                                </div>}
                        </div>
                    </div>
                    <div className="pb-4 px-4">
                        <Row>
                            <Col md={2}>
                                <Button variant="primary" className="d-block w-100 mt-3 mt-md-0" onClick={this.handleSave}>
                                    <BiPaperPlane style={{width: '16px', height: '16px', marginTop: '-3px'}} className="me-2"/>
                                    Save
                                </Button>
                            </Col>
                            <Col md={3}>
                                <Button variant="outline-primary" className="d-block w-100 mt-3 mt-md-0" onClick={GenerateInvoice}>
                                    <BiCloudDownload style={{width: '16px', height: '16px', marginTop: '-3px'}} className="me-2"/>
                                    Download Copy
                                </Button>
                            </Col>
                            <Col md={2}>
                                <Button variant="secondary" className="d-block w-100 mt-3 mt-md-0" style={{ "--bs-btn-bg": "#c95955" }} onClick={this.props.closeModal}>
                                    Close
                                </Button>

                            </Col>
                            <Col md={2}>
                                <Button variant="info" className="d-block w-100 mt-3 mt-md-0" onClick={this.handleEmailShare}>
                                    <BiPaperPlane style={{width: '16px', height: '16px', marginTop: '-3px'}} className="me-2"/>
                                    Email
                                </Button>
                            </Col>
                            <Col md={2}>
                                <Button variant="success" className="d-block w-100 mt-3 mt-md-0" onClick={this.handleWhatsAppShare}>
                                    <BiPaperPlane style={{width: '16px', height: '16px', marginTop: '-3px'}} className="me-2"/>
                                    <FontAwesomeIcon icon={faWhatsapp} />
                                </Button>
                            </Col>

                        </Row>
                    </div>
                </Modal>
                <hr className="mt-4 mb-3"/>
            </div>
        )
    }
}

export default InvoiceModal;