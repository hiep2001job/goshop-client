import React, { useEffect, useState } from 'react';

import './style.css';
import { Product } from '../models/product';
import Catalog from '../../features/catalog/Catalog';
import Header from './Header';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const paleteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paleteType,
      background: {
        default: paleteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>

  );
}

export default App;