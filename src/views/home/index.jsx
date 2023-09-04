import React from 'react'
import { useSelector } from 'react-redux';
import { Typography, Box, Button } from '@mui/material';
import axios from 'axios';

const Home = () => {
    const isLoggedin = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const handleRecommendations = async () => {
        const recommendations = await axios.post(`${process.env.REACT_APP_API_URL}/blog/getRecommendations`, { id: user._id }, { headers: { Authorization: `Bearer ${isLoggedin}`}});
        console.log(recommendations);
    }

    return(
        <>
                    <Box width={'90%'} margin={'1rem auto'}>
                        <Typography>Home page</Typography>
                        <Button onClick={() => { handleRecommendations() }}>Get recommendations</Button>
                    </Box>
        </>
    )
}

export default Home;
