// Main component for creating a user.
// It handles email verification, user creation and file uploads.
import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
//import UploadJSON from './UploadJSON';
//import UploadMicroscopeImages  from './UploadMicroscopeImages';
//import UploadHairCharts   from './UploadHairCharts';
import UploadFiles from './UploadFiles'; 
import { createUser, verifyEmail  } from '../services/apiService';
import { Snackbar } from '@mui/material';

function CreateUser() {
    const [isUserCreated, setIsUserCreated] = useState(false);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [customerType, setCustomerType] = useState('');

    const [currentView, setCurrentView] = useState('verifyUser');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    
    
    const handleVerifyEmail = async () => {
        try {
            const response = await verifyEmail(email);
            if (response.exists) {
                setSnackbarMessage("User exists.");
                setOpenSnackbar(true);
                setCurrentView('uploadFiles');
            } else {
                setSnackbarMessage("User does not exist.");
                setOpenSnackbar(true);
                setCurrentView('createUser');
            }
        } catch (error) {
            setSnackbarMessage("Error verifying email. Please try again.");
            setOpenSnackbar(true);
        }
    };
    
    
      const handleSubmit = async () => {
        try {
            const response = await createUser({ email, firstName, lastName, customerType });
            if (response.success) {
                setSnackbarMessage("User created successfully!");
                setOpenSnackbar(true);
                setCurrentView('uploadFiles');
            } else {
                throw new Error();
            }
        } catch (error) {
            setSnackbarMessage("Error creating user. Please try again later.");
            setOpenSnackbar(true);
        }
      };
    
      return (
        <div>
            {/* Email verification UI */}
            {currentView === 'verifyUser' && (
                <>
                    <h2>Is the user already created?</h2>
                    <Button onClick={() => setIsUserCreated(true)}>Yes</Button>
                    <Button onClick={() => {
                        setIsUserCreated(false);
                        setCurrentView('createUser');
                    }}>No</Button>
    
                    {isUserCreated && (
                        <div>
                            <TextField
                                label="Email"
                                variant="outlined"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <Button variant="contained" color="secondary" onClick={handleVerifyEmail}>
                                Verify User Email
                            </Button>
                        </div>
                    )}
                </>
            )}
             {/* User creation UI */}
            {currentView === 'createUser' && (
                <>
                    <h2>Create User</h2>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Customer Type</InputLabel>
                        <Select
                            value={customerType}
                            onChange={e => setCustomerType(e.target.value)}
                        >
                            <MenuItem value="Bellu">Bellu</MenuItem>
                            <MenuItem value="Gimme">Gimme</MenuItem>
                            <MenuItem value="Renew Hair Loss Center">Renew Hair Loss Center</MenuItem>
                            <MenuItem value="Aspen Salon Utah">Aspen Salon Utah</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Create User
                    </Button>
                </>
            )}
             {/* File upload UI */}
            {currentView === 'uploadFiles' && (
                <div>
                    <UploadFiles defaultEmail={email} />
                </div>
            )}
            {/* Snackbar for showing messages */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
                action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={() => setOpenSnackbar(false)}>
                            Close
                        </Button>
                    </React.Fragment>
                }
            />
        </div>
    );
}
    
    export default CreateUser;