import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Typography, Box } from '@mui/material';
import axios from 'axios';
import Blog from '../blog';

const Home = () => {
    const [feed, setFeed] = useState([]);
    const isLoggedin = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API_URL}/blog/getRecommendations`, { id: user._id }, { headers: { Authorization: `Bearer ${isLoggedin}` } }).then((recommendations) => {
            setFeed(recommendations.data.blogs);
        }).catch((error) => {
            console.log(error);
        })
    }, [user, isLoggedin]);
    return (
        <>
            <Box width={'90%'} margin={'1rem auto'}>
                <Typography>Home page</Typography>
                {feed.map((blog) => {
                    return (
                        <Blog
                            title={blog.title}
                            content={blog.content}
                            key={blog._id}
                            id={blog._id}
                        />
                    );
                })}
            </Box>
        </>
    )
}

export default Home;
