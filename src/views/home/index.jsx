import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import Blog from '../blog';
import FriendList from '../../components/FriendList';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';

const Home = () => {
    const [feed, setFeed] = useState([]);
    const [friends, setFriends] = useState([]);
    const [isloading, setIsloading] = useState(true);
    const mode = useSelector((state) => state.mode);
    const isLoggedin = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const theme = useTheme();
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API_URL}/blog/getRecommendations`, { id: user._id }, { headers: { Authorization: `Bearer ${isLoggedin}` } }).then((recommendations) => {
            setFeed(recommendations.data.blogs);
            setFriends(recommendations.data.friends);
            console.log(recommendations.data.blogs);
            setIsloading(false);
        }).catch((error) => {
            console.log(error);
            setIsloading(false);
        })
    }, [user, isLoggedin]);
    return (
        <>
            {isloading
                ?
                <>
                    <CircularProgress
                        sx={{ margin: "20vh auto", display: "flex" }}
                        color={mode === "light" ? "secondary" : "primary"}
                    />
                </>
                :
                <>
                    <Typography textAlign={'center'} margin={'2rem 0'} fontSize={theme.typography.h2}>Where words come to <span style={{ color: 'goldenrod' }}>life</span> and <span style={{ color: 'goldenrod' }}>stories</span> find their home.</Typography>
                    <Box display={'flex'} width={'100%'} justifyContent={'center'}>
                        <Box width={'50%'} margin={'0 1rem 1rem 1rem'}>
                            {feed.map((blog) => {
                                return (
                                    <Blog
                                        title={blog.title}
                                        user={blog.user}
                                        content={blog.content}
                                        coverPath={blog.coverPath}
                                        impressed={blog.impressed.length}
                                        createdAt={blog.createdAt}
                                        key={blog._id}
                                        id={blog._id}
                                    />
                                );
                            })}
                        </Box>
                        <Box display={friends.length === 0 ? "none" : "flex"} width={'20%'} margin={'1rem 0'} sx={{
                            "@media only screen and (max-width: 1250px)":
                            {
                                display: 'none'
                            },
                        }}>
                            <FriendList friends={friends} />
                        </Box>
                    </Box>
                </>}
        </>
    )
}

export default Home;
