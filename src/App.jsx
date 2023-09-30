import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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
import BlogCreator from './views/blogCreator';
import BlogView from './components/BlogView';
import Login from './views/login';
import VerifyPhoneorEmail from './views/VerifyPnE';
function App() {
  const mode = useSelector((state) => state.mode);
  const token = useSelector((state) => state.token);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SocketContext.Provider value={socket}>
          <Routes>
            <Route element={<Login />} path='/login'></Route>
            <Route element={<VerifyPhoneorEmail />} path='/verifyPnE'></Route>
            <Route element={token ? <BlogCreator /> : <Navigate to={'/login'} />} path='/blog'></Route>
            <Route element={<Layout />}>
              <Route element={<Home />} path='/' index></Route>
              <Route element={<Home />} path='/home' index></Route>
              <Route element={<Explore />} path='/explore'></Route>
              <Route element={<Pricing />} path='/pricing'></Route>
              <Route element={<Profile />} path='/profile/:user'></Route>
              <Route element={<BlogView />} path='/blogs/:blogId'></Route>
              <Route element={<EditProfile />} path='/editprofile'></Route>
              <Route element={<Inbox />} path='/inbox'></Route>
            </Route>
          </Routes>
        </SocketContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;
