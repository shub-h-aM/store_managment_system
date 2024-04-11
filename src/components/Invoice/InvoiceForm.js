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
            dateOfIssue: '',
            billTo: '',
            billToContact: '',
            billToAddress: '',
            billFrom: 'Shubham Tripathi',
            billFromContact: '9090909090',
            billFromAddress: 'Delhi, 122022',
            notes: '',
            total: '0.00',
            subTotal: '0.00',
            taxRate: '',
            taxAmount: '0.00',
            discountRate: '',
            discountAmount: '0.00',
            discountType: '%',
            customers: []
        };
        this.state.items = [
            {
                id: 0,
                sno: 1,
                name: '',
                price: '1.00',
                quantity: 1
            }
        ];
        this.editField = this.editField.bind(this);
        this.handleCustomerSelect = this.handleCustomerSelect.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/getLastInvoiceNumber')
            .then(response => {
                const lastInvoiceNumber = response.data.lastInvoiceNumber;
                this.setState(prevState => ({
                    invoiceNumber: lastInvoiceNumber + 1,
                }));
            })
            .catch(error => {
                console.error('Error fetching last invoice number:', error);
                alert('Failed to fetch last invoice number. Please try again later.');
            });
    }

    handleRowDel(items) {
        const index = this.state.items.indexOf(items);
        this.state.items.splice(index, 1);
        this.setState(this.state.items);
    };

    handleAddEvent() {
        const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
        const items = {
            id: id,
            sno: 1,
            name: '',
            price: '1.00',
            quantity: 1
        };
        this.state.items.push(items);
        this.setState(this.state.items);
    }

    handleCalculateTotal() {
        const { items, taxRate, discountRate, discountType } = this.state;
        let subTotal = 0;

        items.forEach(item => {
            subTotal += parseFloat(item.price) * parseInt(item.quantity);
        });

        const taxAmount = parseFloat(subTotal * (taxRate / 100)).toFixed(2);

        let discountAmount;
        if (discountType === '%') {
            discountAmount = parseFloat((subTotal * discountRate) / 100).toFixed(2);
        } else {
            discountAmount = parseFloat(discountRate).toFixed(2);
        }

        const total = (subTotal - discountAmount) + parseFloat(taxAmount);

        this.setState({
            subTotal: subTotal.toFixed(2),
            taxAmount,
            discountAmount,
            total: total.toFixed(2)
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
                if (key === item.name && items.id == item.id) {
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
        return (<Form onSubmit={this.openModal}>
            <Row>
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
                                    <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>
                                    <Form.Control type="date" value={this.state.dateOfIssue} name={"dateOfIssue"}
                                                  onChange={(event) => this.editField(event)} style={{
                                        maxWidth: '150px'
                                    }} required="required"/>
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
                                <Form.Label className="fw-bold">Bill from:</Form.Label>
                                <Form.Control placeholder={"Who is this invoice from?"} rows={3} value={"Shubham Tripathi"} type="text" name="billFrom" className="my-2" onChange={(event) => this.editField(event)} autoComplete="name" />
                                <Form.Control placeholder={"Billing address"} value={"Delhi, 122022"} type="text" name="billFromAddress" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} />
                                <Form.Control placeholder={"Contact Number"} value={"9090909090"} type="tel" max={10} name="billFromContact" className="my-2" onChange={(event) => this.editField(event)} autoComplete="contact" />
                            </Col>
                            <Col>
                                <Form.Label className="fw-bold">Bill to:</Form.Label>
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
                        <InvoiceItem onItemizedItemEdit={this.onItemizedItemEdit.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} currency={this.state.currency} items={this.state.items}/>
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
                                    <span className="fw-bold">Tax:</span>
                                    <span>
                                        <span className="small ">({this.state.taxRate || 0}%)</span>
                                        {this.state.currency}
                                        {this.state.taxAmount || 0}
                                    </span>
                                </div>
                                <hr/>
                                <div className="d-flex flex-row align-items-start justify-content-between" style={{
                                    fontSize: '1.125rem'}}>
                                    <span className="fw-bold">Total:</span>
                                    <span className="fw-bold">{this.state.currency}
                                        {this.state.total || 0}</span>
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
                        <InvoiceModal showModal={this.state.isOpen} closeModal={this.closeModal} info={this.state} items={this.state.items} currency={this.state.currency} subTotal={this.state.subTotal} taxAmount={this.state.taxAmount} discountAmount={this.state.discountAmount} total={this.state.total}/>
                        <Form.Group className="my-3">
                            <Form.Label className="fw-bold">Tax rate:</Form.Label>
                            <InputGroup className="my-1 flex-nowrap">
                                <Form.Control name="taxRate" type="number" value={this.state.taxRate} onChange={(event) => this.editField(event)} className="bg-white border" placeholder="0.0" min="0.00" step="0.01" max="100.00"/>
                                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                                    %
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="my-3">
                            <Form.Label className="fw-bold">Discount rate:</Form.Label>
                            <InputGroup className="my-1 flex-nowrap">
                                <Form.Control as="select" name="discountType" value={this.state.discountType} onChange={(event) => this.editField(event)} className="bg-white border">
                                    <option value="%">%</option>
                                    <option value="₹">₹</option>
                                </Form.Control>
                                <Form.Control name="discountRate" type="number" value={this.state.discountRate} onChange={(event) => this.editField(event)} className="bg-white border" placeholder="0.0" min="0.00" step="0.01" max="100.00"/>
                            </InputGroup>
                        </Form.Group>
                    </div>
                </Col>
            </Row>
        </Form>)
    }
}

export default InvoiceForm;
