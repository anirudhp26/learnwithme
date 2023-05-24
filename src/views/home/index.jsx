import React from 'react'
import { useSelector } from 'react-redux';
import Login from '../login';
import Navbar from '../../components/Navbar';
import { Typography } from '@mui/material';

const Home = () => {
    const isLoggedin = useSelector((state) => state.token);

    const ifloggedIn = () => {
        if (isLoggedin) {
            return(
                <>
                    <Navbar/>
                    <Typography>Home page</Typography>
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