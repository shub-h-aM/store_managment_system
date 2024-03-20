import React, { useState } from 'react';
import axios from 'axios';
import "../index.css";
import {FaUpload} from "react-icons/fa";

const UploadFile = () => {
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        date_of_purchase: '',
        item: '',
        item_type: '',
        brand: '',
        item_category: '',
        qty: '',
        total_amount: '',
        total_gst: '',
        location: '',
        supplier: ''
    });

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', file);

        axios.post('http://localhost:5000/api/upload', formData)
            .then((response) => {
                console.log(response.data.message);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleSubmit = () => {
        axios.post('http://localhost:5000/api/items', formData)
            .then((response) => {
                console.log(response.data.message);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="upload-container">
            <input type="file" onChange={handleFileChange}/>
            <button onClick={handleUpload}>Upload <FaUpload/></button>
            <div className="form-inputs">
                <label>Date of Purchase:</label>
                <input type="date" name="date_of_purchase" value={formData.date_of_purchase}
                       onChange={handleInputChange}/>
                <label>Item:</label>
                <input type="text" name="item" value={formData.item} onChange={handleInputChange}/>
                <label>Item Type:</label>
                <input type="text" name="item_type" value={formData.item_type} onChange={handleInputChange}/>
                <label>Brand:</label>
                <input type="text" name="brand" value={formData.brand} onChange={handleInputChange}/>
                <label>Item Category:</label>
                <input type="text" name="item_category" value={formData.item_category} onChange={handleInputChange}/>
                <label>Quantity:</label>
                <input type="number" name="qty" value={formData.qty} onChange={handleInputChange} min={0}/>
                <label>Total Amount:</label>
                <input type="number" name="total_amount" value={formData.total_amount} onChange={handleInputChange}/>
                <label>Total GST:</label>
                <input type="number" name="total_gst" value={formData.total_gst} onChange={handleInputChange}/>
                <label>Location:</label>
                <input type="text" name="location" value={formData.location} onChange={handleInputChange}/>
                <label>Supplier:</label>
                <input type="text" name="supplier" value={formData.supplier} onChange={handleInputChange}/>
            </div>
            <div className="button-container">
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default UploadFile;
