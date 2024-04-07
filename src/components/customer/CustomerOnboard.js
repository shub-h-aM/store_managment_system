import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

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
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <form onSubmit={this.handleSubmit}>
                            <div className="input-field">
                                <label htmlFor="customerName">Customer Name</label>
                                <input id="customerName" type="text" name="customerName" value={this.state.customerName} onChange={this.handleInputChange} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="customerAddress">Customer Address</label>
                                <input id="customerAddress" type="text" name="customerAddress" value={this.state.customerAddress} onChange={this.handleInputChange} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="contactNumber">Contact Number</label>
                                <input id="contactNumber" type="text" name="contactNumber" value={this.state.contactNumber} onChange={this.handleInputChange} />
                            </div>
                            <Button variant="#456b5a8a" type="submit" className="d-block w-100 btn-secondary ">Submit</Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CustomerOnboard;
