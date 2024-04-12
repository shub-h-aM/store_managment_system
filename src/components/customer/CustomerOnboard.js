import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

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
            <Container maxWidth="sm">
                <form onSubmit={this.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Customer Name"
                                name="customerName"
                                value={this.state.customerName}
                                onChange={this.handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Customer Address"
                                name="customerAddress"
                                value={this.state.customerAddress}
                                onChange={this.handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Contact Number"
                                name="contactNumber"
                                value={this.state.contactNumber}
                                onChange={this.handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit" fullWidth>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        );
    }
}

export default CustomerOnboard;
