import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

function CustomerDetails() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        // Fetch customer details from the API
        axios.get('http://localhost:5000/api/customers')
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                console.error('Error fetching customer details:', error);
            });
    }, []);
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Customer</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Button variant="secondary">
                                <Link to="/create-customer" className="nav-link">Create Customer</Link>
                            </Button>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="container">
                <table className="highlight">
                    <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Customer Address</th>
                        <th>Contact Number</th>
                    </tr>
                    </thead>
                    <tbody>
                    {customers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.customerName}</td>
                            <td>{customer.customerAddress}</td>
                            <td>{customer.contactNumber}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CustomerDetails;
