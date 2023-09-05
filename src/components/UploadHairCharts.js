import React from 'react';
import { Button, TextField } from '@mui/material';

function uploadHairCharts({ defaultEmail }) {
  return (
    <div>
      <h3>Upload JSON File</h3>
      <TextField
        label="Email"
        variant="outlined"
        defaultValue={defaultEmail}
        fullWidth
      />
      {/* This is a simplified file input. You might want to style or replace it later */}
      <input type="file" accept=".json" />
      <Button variant="contained" color="primary">Upload</Button>
    </div>
  );
}

export default uploadHairCharts;