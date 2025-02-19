import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Grid2 } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';

import Calculator from './Calculator'
import Navbar from './Navbar';

import './css/App.scss'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  var firstMode;
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  if (!localStorage.getItem('mode')) {
    localStorage.setItem('mode', prefersDarkMode ? 'dark' : 'light');
    firstMode = prefersDarkMode ? 'dark' : 'light';
  } else {
    firstMode = localStorage.getItem('mode');
  }
  const [mode, setMode] = useState(firstMode);
  const theme = mode === 'dark' ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={theme} defaultMode="system">
      <CssBaseline />
      <Navbar 
        mode={mode}
        onChange={(mode) => {
          setMode(mode);
          localStorage.setItem('mode', mode);
        }}
        height={"60px"}
      />
      <main>
      <Grid2 container spacing={0} alignItems={'center'} alignContent={'center'} justifyContent={'left'}>
        <Grid2 size={{xs: 1, md: 0}} offset={'auto'} sx={{ display: { xs: 'block', md: 'none'} }}>
        </Grid2>
        <Grid2 size={{xs: 0, md: 1}}></Grid2>
        <Grid2 size={{xs: 12, md: 10}}>
          <h1>New Contract Backpay Calculator</h1>
        </Grid2>
        <Grid2 size={{xs: 0, md: 1}} sx={{ display: { xs: 'none', md: 'block'}, height: '100%'}}>
        </Grid2>
      </Grid2>
      <Calculator />
      </main>
    </ThemeProvider>
  )
}

export default App
