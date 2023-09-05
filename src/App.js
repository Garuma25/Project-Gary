import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import CreateUser from './components/CreateUser';
const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <h1>Analyst Portal</h1>
        <CreateUser />
      </div>
    </ThemeProvider>
  );
}

export default App;