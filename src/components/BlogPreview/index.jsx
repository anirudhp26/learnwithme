import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function BlogPreview({title, coverImg, content}) {
    const navigate = useNavigate();
  return (
    <Box width={'70%'} margin={'2rem auto'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <img src={coverImg.preview} alt='Cover' style={{ width: '100%', height: 'auto', aspectRatio: '4/1', margin: '2rem 0' }}></img>
        <Typography textAlign={'center'} margin={'2rem 0'}>
            {title}
        </Typography>
        <Box margin={'2rem auto'} width={'100%'}>
            {content}
        </Box>
        <Box>
            <Button onClick={() => {
                navigate('/blog');
            }}>Edit</Button>
            <Button>Post</Button>
        </Box>
    </Box>
    )
}
