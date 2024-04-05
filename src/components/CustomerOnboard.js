import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from "axios";

class CustomerOnboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerName: '',
            customerAddress: '',
            contactNumber: ''
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { customerName, customerAddress, contactNumber } = this.state;

        axios.post('http://localhost:5000/api/customer', {
            customerName,
            customerAddress,
            contactNumber
        })
            .then(response => {
                console.log(response.data);
                this.setState({
                    customerName: '',
                    customerAddress: '',
                    contactNumber: ''
                });
                alert('Customer added successfully!');
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Failed to Create Customer Data.")
            });
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>Customer</h1>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="customerName">
                                <Form.Label>Customer Name</Form.Label>
                                <Form.Control type="text" name="customerName" value={this.state.customerName} onChange={this.handleInputChange} placeholder="Enter customer name" required />
                            </Form.Group>
                            <Form.Group controlId="customerAddress">
                                <Form.Label>Customer Address</Form.Label>
                                <Form.Control type="text" name="customerAddress" value={this.state.customerAddress} onChange={this.handleInputChange} placeholder="Enter customer address" required />
                            </Form.Group>
                            <Form.Group controlId="contactNumber">
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control type="tel" name="contactNumber" value={this.state.contactNumber} onChange={this.handleInputChange} placeholder="Enter contact number" required />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default CustomerOnboard;
