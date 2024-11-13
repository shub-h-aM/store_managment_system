import React, { useState } from 'react';
import axios from 'axios';
import { FaUpload } from "react-icons/fa";
import Footer from "../components/Footer";

const UploadFile = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        setUploading(true);
        setUploadError(null);

        const formData = new FormData();
        formData.append('file', file);

        axios.post('http://localhost:5000/api/upload', formData)
            .then((response) => {
                console.log(response.data.message);
                // Reset file state after successful upload
                setFile(null);
            })
            .catch((error) => {
                console.error(error);
                setUploadError("Failed to upload file. Please try again.");
            })
            .finally(() => {
                setUploading(false);
            });
    };

    return (
        <div className="upload-container" style={{margin:"20px",width:"40%", backgroundColor:'#f2f2f2'}}>
            <input type="file" onChange={handleFileChange} style={{margin:"20px",width:"60%"}}/>
            <button onClick={handleUpload} disabled={uploading} style={{borderRadius:"20px"}}>
                <FaUpload style={{marginBottom:"6px",marginRight:"4px"}}/>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            {uploadError && <div className="error-message">{uploadError}</div>}
            <Footer />
        </div>
    );
};

export default UploadFile;
