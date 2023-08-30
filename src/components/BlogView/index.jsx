import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

export default function BlogView() {
    const { blogId } = useParams();
    const token = useSelector((state) => state.token);
    const theme = useTheme();
    const [blog, setBlog] = useState({});
    useEffect(() => {
        const blog = axios.post(`${process.env.REACT_APP_API_URL}/blog/getBlogbyID`, { blogId: blogId }, { headers: { Authorization: `Bearer ${token}` } });
        if (blog.status === 200) {
            setBlog(blog.data.blog);
        }
    }, [blogId, token]);
  return (
    <Box>
        {blog
          ?
          <img src={`${process.env.REACT_APP_API_URL}/assets/` + blog.coverPath} alt='Cover' style={{ width: '100%', height: 'auto', aspectRatio: '4/1', margin: '2rem 0' }}></img>
          :
          <></>
        }
        <Typography fontSize={theme.typography.h1} textAlign={'center'} margin={'2rem 0'}>
          {blog.title}
        </Typography>
        <Box overflow={'hidden'} margin={'2rem auto'} width={'100%'}>
          <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
        </Box>
    </Box>
  )
}
