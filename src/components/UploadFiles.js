// Component for uploading different types of files.
// Allows uploading JSON, microscope images, and hair charts.
import React, { useState } from 'react';
import { Button, TextField, Snackbar  } from '@mui/material';
import {uploadJSON,uploadMicroscopeImages,uploadHairCharts} from '../services/apiService';

function UploadFiles({ defaultEmail }) {
    const [jsonFiles, setJsonFiles] = useState([]);
    const [microscopeImages, setMicroscopeImages] = useState([]);
    const [hairCharts, setHairCharts] = useState([]);
    const [message, setMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleFileChange = (e, setFiles) => {
        const files = Array.from(e.target.files);
        setFiles(files);
    };

    const handleUploadAll = async () => {
        try {
            if (jsonFiles.length) {
                await uploadJSON(defaultEmail, jsonFiles);
            }
            if (microscopeImages.length) {
                await uploadMicroscopeImages(defaultEmail, microscopeImages);
            }
            if (hairCharts.length) {
                await uploadHairCharts(defaultEmail, hairCharts);
            }
            setMessage("Files uploaded successfully!");
        } catch (error) {
            setMessage("Something went wrong. Please try again later.");
        } finally {
            setOpenSnackbar(true);
        }
    };
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    return (
        <div>
            {/* File upload UI with pre-populated email */}
            <h3>Upload Files</h3>
            <TextField
                label="Email"
                variant="outlined"
                defaultValue={defaultEmail}
                fullWidth
            />
            
            <div>
                <label>JSON File(s):</label>
                <input 
                    type="file" 
                    accept=".json"
                    onChange={(e) => handleFileChange(e, setJsonFiles)}
                />
            </div>

            <div>
                <label>Microscope Image(s):</label>
                <input 
                     type="file" 
                     accept="image/*"
            
                     onChange={(e) => handleFileChange(e, setMicroscopeImages)}
                />
            </div>

            <div>
                <label>Hair Chart(s):</label>
                <input 
                    type="file" 
                    accept="image/png"
                    onChange={(e) => handleFileChange(e, setHairCharts)}
                />
            </div>

            <Button variant="contained" color="primary" onClick={handleUploadAll}>
                Upload All
            </Button>
            <Snackbar 
                open={openSnackbar} 
                autoHideDuration={6000} 
                onClose={handleCloseSnackbar}
                message={message}
            />
        </div>
    );
}

export default UploadFiles;