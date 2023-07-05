import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/home';
import Profile from './views/profile';
import Explore from './views/explore';
import Pricing from './views/pricing';
import Layout from './views/Layout';
import Blog from './views/blog';
import BlogCreator from './views/blogCreator';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from "@mui/material";
import { useSelector } from 'react-redux';
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = createTheme({
    palette: {
      mode: mode, // Set the default mode to light

      // Light mode colors
      primary: {
        main: '#FFFFFF', // Primary color for light mode
      },
      secondary: {
        main: '#000000', // Secondary color for light mode
      },
      neutral: {
        main: '#64748B',
        contrastText: '#fff',
      },
      // Dark mode colors
      dark: {
        primary: '#000000', // Primary color for dark mode
        secondary: '#FFFFFF', // Secondary color for dark mode
      },

    },
  });
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<Home />} path='/' index></Route>
          <Route element={<Home />} path='/home' index></Route>
          <Route element={<Layout />}>
            <Route element={<Explore />} path='/explore'></Route>
            <Route element={<Pricing />} path='/pricing'></Route>
            <Route element={<Blog />} path='/blog'></Route>
            <Route element={<Profile />} path='/profile/:user'></Route>
            <Route element={<BlogCreator />} path='/blogcreator'></Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;
