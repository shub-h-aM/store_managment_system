import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';

class InvoiceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            currentDate: '',
            currency: "₹",
            invoiceNumber: 1,
            dateOfDue: '',
            billTo: '',
            billToContact: '',
            billToAddress: '',
            billFrom: 'Shubham Electronics & Enterprises',
            billFromContact: '7309173451',
            billFromAddress: 'Kundi Bazar, Baragaon, Varanasi, 221204',
            notes: '',
            grandTotal: '0.00',
            subTotal: '0.00',
            cgstRate: '',
            sgstRate: '',
            cgstAmount: '0.00',
            sgstAmount: '0.00',
            discountRate: '',
            discountAmount: '0.00',
            discountType: '%',
            paidAmount: '0',
            dueAmount: '0.00',
            customers: [],
            items: [
                {
                    id: 0,
                    sno: 1,
                    name: '',
                    brand: 'Brand',
                    price: '0.00',
                    quantity: 0
                }
            ],
            availableItems: []
        };
        this.editField = this.editField.bind(this);
        this.handleCustomerSelect = this.handleCustomerSelect.bind(this);
        this.onItemizedItemEdit = this.onItemizedItemEdit.bind(this);
        this.handleAddEvent = this.handleAddEvent.bind(this);
        this.handleRowDel = this.handleRowDel.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/getLastInvoiceNumber')
            .then(response => {
                const lastInvoiceNumber = response.data.lastInvoiceNumber;
                this.setState(prevState => ({
                    ...prevState,
                    invoiceNumber: lastInvoiceNumber + 1,
                }));
            })
            .catch(error => {
                console.error('Error fetching last invoice number:', error);
                alert('Failed to fetch last invoice number. Please try again later.');
            });

        axios.get('http://localhost:5000/api/get/get-items')
            .then(response => {
                this.setState({ availableItems: response.data });
            })
            .catch(error => {
                console.error('Error fetching item data:', error);
                alert('Failed to fetch item data. Please try again later.');
            });
    }


    handleRowDel(items) {
        const index = this.state.items.indexOf(items);
        this.state.items.splice(index, 1);
        this.setState(this.state.items);
        this.handleCalculateTotal();
    }
    handleAddEvent(selectedItem) {
        console.log("Selected Item:", selectedItem);
        const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
        const items = {
            id: id,
            sno: 1,
            name: selectedItem.item_name,
            brand: selectedItem.brand,
            price: selectedItem.rate,
            quantity: 1
        };
        this.setState(prevState => ({
            items: [...prevState.items, items]
        }), () => {
            console.log("Updated Items:", this.state.items);
        });
    }

    handleCalculateTotal() {
        const { items, cgstRate, sgstRate, discountRate, discountType, paidAmount } = this.state;
        let subTotal = 0;

        items.forEach(item => {
            subTotal += parseFloat(item.price) * parseInt(item.quantity);
        });

        const cgstAmount = parseFloat(subTotal * (cgstRate / 100)).toFixed(2);
        const sgstAmount = parseFloat(subTotal * (sgstRate / 100)).toFixed(2);

        let discountAmount;
        if (discountType === '%') {
            discountAmount = parseFloat((subTotal * discountRate) / 100).toFixed(2);
        } else {
            discountAmount = parseFloat(discountRate).toFixed(2);
        }

        const grandTotal = (subTotal - discountAmount) + parseFloat(cgstAmount) + parseFloat(sgstAmount);
        const dueAmount = parseFloat(grandTotal) - parseFloat(paidAmount);

        this.setState({
            subTotal: subTotal.toFixed(2),
            cgstAmount,
            sgstAmount,
            discountAmount,
            grandTotal: grandTotal.toFixed(2),
            dueAmount: dueAmount.toFixed(2)
        });
    }

    onItemizedItemEdit(evt) {
        const item = {
            id: evt.target.id,
            name: evt.target.name,
            value: evt.target.value
        };
        const items = this.state.items.slice();
        const newItems = items.map(function (items) {
            for (const key in items) {
                if (key === item.name && items.id === item.id) {
                    items[key] = item.value;
                }
            }
            return items;
        });
        this.setState({ items: newItems });
        this.handleCalculateTotal();
    }

    editField = (event) => {
        if (event.target.name === 'discountType') {
            this.setState({
                [event.target.name]: event.target.value
            }, () => {
                this.handleCalculateTotal();
            });
        } else if (event.target.name === 'paidAmount') {
            this.setState({
                [event.target.name]: event.target.value
            }, () => {
                this.handleCalculateTotal();
            });
        } else if (event.target.name === 'dateOfDue') {
            const currentDate = new Date();
            const selectedDate = new Date(event.target.value);

            if (selectedDate < currentDate) {
                alert('Due date cannot be less than the current date');
                return; // Prevent further execution
            }
            this.setState({
                [event.target.name]: event.target.value
            }, () => {
                this.handleCalculateTotal();
            });
        } else {
            this.setState({
                [event.target.name]: event.target.value
            }, () => {
                this.handleCalculateTotal();
            });
        }
    };

    openModal = (event) => {
        event.preventDefault();
        this.handleCalculateTotal();
        this.setState({ isOpen: true });
    };

    closeModal = () => this.setState({ isOpen: false });

    // Function to fetch customer data when "Bill to" section is clicked
    handleBillToClick = () => {
        axios.get('http://localhost:5000/api/customers')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ customers: response.data });
                } else {
                    alert('Failed to fetch customer data');
                }
            })
            .catch(error => {
                console.error('Error fetching customers:', error);
                alert('Failed to fetch customer data');
            });
    };

    handleCustomerSelect(customerId) {
        const selectedCustomer = this.state.customers.find(customer => customer.id === customerId);
        if (selectedCustomer) {
            this.setState({
                billTo: selectedCustomer.customerName,
                billToContact: selectedCustomer.contactNumber,
                billToAddress: selectedCustomer.customerAddress
            });
        }
    }
    render() {
        return (
            <Form onSubmit={this.openModal} >
            <Row style={{height:'80%',margin:'20px'}}>
                <Col md={8} lg={9}>
                    <Card className="p-4 p-xl-5 my-3 my-xl-4">
                        <div className="d-flex flex-row align-items-start justify-content-between mb-3">
                            <div className="d-flex flex-column">
                                <div className="d-flex flex-column">
                                    <div className="mb-2">
                                        <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                                        <span className="current-date">{new Date().toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="d-flex flex-row align-items-center">
                                    <span className="fw-bold me-2">Due&nbsp;Date: </span>
                                    {parseFloat(this.state.dueAmount) > 0 ? (
                                        <Form.Control
                                            type="date" value={this.state.dateOfDue} name={"dateOfDue"}
                                            onChange={(event) => this.editField(event)}
                                            style={{maxWidth: '150px'}} required="required" />
                                    ) : null}
                                </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                                <span className="fw-bold me-2">Invoice&nbsp;Number:&nbsp;</span>
                                <span>{this.state.invoiceNumber}</span>
                            </div>
                        </div>
                        <hr className="my-4"/>
                        <Row className="mb-5">
                            <Col>
                                <Form.Label className="fw-bold">Bill From:</Form.Label>
                                <Form.Control placeholder={"Who is this invoice from?"} rows={3}
                                              value={"Shubham Electronics & Enterprises"} type="text" name="billFrom" className="my-2" onChange={(event) => this.editField(event)} autoComplete="name" />
                                <Form.Control placeholder={"Billing address"} value={"Kundi Bazar, Baragaon, Varanasi, 221204"} type="text" name="billFromAddress" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} />
                                <Form.Control placeholder={"Contact Number"} value={"7309173451"} type="tel" max={10} name="billFromContact" className="my-2" onChange={(event) => this.editField(event)} autoComplete="contact" />
                            </Col>
                            <Col>
                                <Form.Label className="fw-bold">Bill To:</Form.Label>
                                <Form.Control as="select" onClick={this.handleBillToClick} className="my-2" rows={3} onChange={(event) => this.handleCustomerSelect(parseInt(event.target.value))}>
                                    <option>Select a customer</option>
                                    {this.state.customers && this.state.customers.map(customer => (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.customerName}
                                        </option>
                                    ))}
                                </Form.Control>
                                <Form.Control placeholder="Billing address" value={this.state.billToAddress} type="text" name="billToAddress" className="my-2" autoComplete="address" required />
                                <Form.Control placeholder="Contact Number" value={this.state.billToContact} type="text" name="billToContact" className="my-2" autoComplete="contactNumber" required />
                            </Col>
                        </Row>
                        <InvoiceItem onItemizedItemEdit={this.onItemizedItemEdit.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} currency={this.state.currency} items={this.state.items} availableItems={this.state.availableItems}/>
                        <Row className="mt-4 justify-content-end">
                            <Col lg={6}>
                                <div className="d-flex flex-row align-items-start justify-content-between">
                                    <span className="fw-bold">Subtotal:</span>
                                    <span>{this.state.subTotal}</span>
                                </div>
                                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                                    <span className="fw-bold">Discount:</span>
                                    <span>
                                        <span className="small">({this.state.discountRate || 0}{this.state.discountType})
                                        </span>
                                        {this.state.currency}
                                        {this.state.discountAmount || 0}
                                    </span>
                                </div>
                                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                                    <span className="fw-bold">CGST :</span>
                                    <span>
                                        <span className="small ">({this.state.cgstRate || 0}%)</span>
                                        {this.state.currency}
                                        {this.state.cgstAmount || 0}
                                    </span>
                                </div>
                                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                                    <span className="fw-bold">SGST :</span>
                                    <span>
                                        <span className="small ">({this.state.sgstRate || 0}%)</span>
                                        {this.state.currency}
                                        {this.state.sgstAmount || 0}
                                    </span>
                                </div>
                                <hr/>
                                <div className="d-flex flex-row align-items-start justify-content-between" style={{
                                    fontSize: '1.125rem'
                                }}>
                                    <span className="fw-bold">Grand Total:</span>
                                    <span className="fw-bold">{this.state.currency}
                                        {this.state.grandTotal || 0}</span>
                                </div>
                            </Col>
                        </Row>
                        <hr className="my-4"/>
                        <Form.Label className="fw-bold">Notes:</Form.Label>
                        <Form.Control value="Thank you for doing business with us!" name="notes"
                                      onChange={(event) =>
                                          this.editField(event)} type="text" className="my-2" rows={1}/>
                    </Card>
                </Col>
                <Col md={4} lg={3}>
                <div className="sticky-top pt-md-3 pt-xl-4">
                        <Button variant="primary" type="submit" className="d-block w-100 btn-secondary">Review Invoice</Button>
                        <InvoiceModal showModal={this.state.isOpen} closeModal={this.closeModal.bind(this)} info={this.state} items={this.state.items} currency={this.state.currency}
                                      subTotal={this.state.subTotal} cgstAmount={this.state.cgstAmount} sgstAmount={this.state.sgstAmount} discountAmount={this.state.discountAmount} grandTotal={this.state.grandTotal}
                                      dueAmount={this.state.dueAmount} paidAmount={this.state.paidAmount} dateOfDue={this.state.dateOfDue}/>
                        <Form.Group className="my-3">
                            <Form.Label className="fw-bold">CGST Rate:</Form.Label>
                            <InputGroup className="my-1 flex-nowrap">
                                <Form.Control name="cgstRate" type="number" value={this.state.cgstRate} onChange={(event) => this.editField(event)} className="bg-white border" placeholder="0.0" min="0.00" step="0.01" max="100.00"/>
                                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                                    %
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="my-3">
                            <Form.Label className="fw-bold">SGST Rate: </Form.Label>
                            <InputGroup className="my-1 flex-nowrap">
                                <Form.Control name="sgstRate" type="number" value={this.state.sgstRate} onChange={(event) => this.editField(event)} className="bg-white border" placeholder="0.0" min="0.00" step="0.01" max="100.00"/>
                                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                                    %
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="my-3">
                            <Form.Label className="fw-bold">Discount Rate:</Form.Label>
                            <InputGroup className="my-1 flex-nowrap">
                                <Form.Control as="select" name="discountType" value={this.state.discountType} onChange={(event) => this.editField(event)} className="bg-white border">
                                    <option value="%">%</option>
                                    <option value="₹">₹</option>
                                </Form.Control>
                                <Form.Control
                                    name="discountRate"
                                    type="number"
                                    value={this.state.discountRate}
                                    onChange={(event) => this.editField(event)}
                                    className="bg-white border"
                                    placeholder="0.0"
                                    min="0.00"
                                    max={this.state.discountType === '%' ? "100.00" : this.state.grandTotal}
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="my-3">
                            <Form.Label className="fw-bold">Paid Amount:</Form.Label>
                            <InputGroup className="my-1 flex-nowrap">
                                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                                    {this.state.currency}
                                </InputGroup.Text>
                                <Form.Control
                                    name="paidAmount" type="number" value={this.state.paidAmount} onChange={(event) => this.editField(event)}
                                    className="bg-white border"  min="0.00" step="0.01" />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="my-3">
                            <Form.Label className="fw-bold">Due Amount:</Form.Label>
                            <InputGroup className="my-1 flex-nowrap">
                                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                                    {this.state.currency}
                                </InputGroup.Text>
                                <Form.Control name="dueAmount" type="text" value={this.state.dueAmount} readOnly className="bg-white border"/>
                            </InputGroup>
                        </Form.Group>
                    </div>
                </Col>
            </Row>
        </Form>)
    }
}

export default InvoiceForm;
