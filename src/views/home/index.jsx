import React from 'react'
import { useSelector } from 'react-redux';
import Login from '../login';
import Navbar from '../../components/Navbar';
import { Typography, Box, Button } from '@mui/material';

const Home = () => {
    const isLoggedin = useSelector((state) => state.token);
    const ifloggedIn = () => {
        if (isLoggedin) {
            return(
                <>
                    <Navbar/>
                    <Box width={'90%'} margin={'1rem auto'}>
                        <Typography>Home page</Typography>
                    </Box>
                </>
            )
        } else {
            return(
                <Login />
            )
        }
    }

    return(
        <>
            {ifloggedIn()}
        </>
    )
}

export default Home;
