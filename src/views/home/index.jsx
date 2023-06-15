import React from 'react'
import { useSelector } from 'react-redux';
import Login from '../login';
import Navbar from '../../components/Navbar';
import { Typography, Box } from '@mui/material';
import Blog from '../blog';

const Home = () => {
    const isLoggedin = useSelector((state) => state.token);
    const blogs = [
        {
            user: {
                name: 'Anirudh Patel',
                username: 'anirudhp26'
            },
            title: 'How to setup react-router-dom',
            id: '12231'
        },
        {
            user: {
                name: 'Anirudh Patel',
                username: 'anirudhp26'
            },
            title: 'How to setup react-router-dom',
            id: '12236'
        },
        {
            user: {
                name: 'Anirudh Patel',
                username: 'anirudhp26'
            },
            title: 'How to setup react-router-dom',
            id: '12238'
        },
        {
            user: {
                name: 'Anirudh Patel',
                username: 'anirudhp26'
            },
            title: 'How to setup react-router-dom',
            id: '12239'
        },
        {
            user: {
                name: 'Anirudh Patel',
                username: 'anirudhp26'
            },
            title: 'How to setup react-router-dom',
            id: '12232'
        },
    ]
    const ifloggedIn = () => {
        if (isLoggedin) {
            return(
                <>
                    <Navbar/>
                    <Box width={'90%'} margin={'1rem auto'}>
                        <Typography>Home page</Typography>
                        {blogs.map((blog) => {
                            return(
                                <Blog title={blog.title} user={blog.user} key={blog.id} id={blog.id} />
                            )
                        })}
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