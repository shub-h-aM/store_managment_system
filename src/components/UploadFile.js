import React, { useState } from 'react';
import axios from 'axios';
import { FaUpload } from "react-icons/fa";

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
        <div className="upload-container">
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'} <FaUpload />
            </button>
            {uploadError && <div className="error-message">{uploadError}</div>}
        </div>
    );
};

export default UploadFile;
