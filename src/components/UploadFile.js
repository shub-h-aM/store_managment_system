import React, { useState } from 'react';
import axios from 'axios';

const UploadFile = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
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


    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default UploadFile;



