import './App.css'
import Entry from './Entry'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';


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
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = prefersDarkMode ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={theme} defaultMode="system">
      <CssBaseline />
      <h1>Contract Raise Calculator</h1>
      <div className="entry">
        <Entry />
      </div>
    </ThemeProvider>
  )
}

export default App
