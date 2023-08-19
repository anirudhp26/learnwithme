import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/home';
import Profile from './views/profile';
import Explore from './views/explore';
import Pricing from './views/pricing';
import Layout from './views/Layout';
// import Blog from './views/blog';
import EditProfile from './views/editProfile';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import Inbox from './views/inbox';
import { SocketContext, socket } from './context/SocketContext';
import TextEditor from './views/blogCreator';
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SocketContext.Provider value={socket}>
          <Routes>
            <Route element={<Home />} path='/' index></Route>
            <Route element={<Home />} path='/home' index></Route>
            <Route element={<Layout />}>
              <Route element={<Explore />} path='/explore'></Route>
              <Route element={<Pricing />} path='/pricing'></Route>
              <Route element={<TextEditor />} path='/blog'></Route>
              <Route element={<Profile />} path='/profile/:user'></Route>
              <Route element={<EditProfile />} path='/editprofile'></Route>
              <Route element={<Inbox />} path='/inbox'></Route>
              {/* <Route element={<TextEditor />} path='/blog'></Route> */}
            </Route>
          </Routes>
        </SocketContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;
