import { Box, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Blog(props) {
  const navigate = useNavigate();
  const user = props.user;
  return (
    <Box width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'space-around'} margin={'1rem auto'} sx={{
      transition: 'all 0.5s',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'black',
        padding: '0.5rem 0',
        color: "white",
      },
      '@media only screen and (max-width: 530px)': {
        flexDirection: 'column'
      },
      border: '1px solid grey'
    }}
      onClick={() => {
        navigate(`/blogs/${props.id}`)
      }}
    >
      <Box width={'42%'} height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{
        '@media only screen and (max-width: 530px)': {
          width: '90%',
          margin: '0 auto'
        }
      }}>
        <Box width={'100%'} display='flex' flexDirection='row' alignItems='center' margin='1rem auto' sx={{
          '@media only screen and (max-width: 530px)': {
            flexDirection: 'column',
            justifyContent: 'center',
          }
        }}>
          <img src='/img/user-default-logo.png' alt='' width='50px'></img>
          <Box margin='2rem 0 2rem 2rem' textAlign={'center'} sx={{
            '@media only screen and (max-width: 530px)': {
              width: '90%',
              margin: 'auto',
            }
          }}>
            <Typography sx={{ fontSize: '1.5rem' }}>{user.name}</Typography>
            <Typography sx={{ fontSize: '1rem', marginTop: '0.5rem' }} color='#757575'>{user.username}</Typography>
          </Box>
        </Box>
      </Box>
      <Box width={'50%'} display={'flex'} alignItems={'center'}
         sx={{
          '@media only screen and (max-width: 530px)': {
            width: '90%',
            margin: 'auto',
          }
        }}
      >
        <Typography fontSize={'1.5rem'} sx={{
            '@media only screen and (max-width: 530px)': {
              margin: '1rem auto',
            }
          }}>{props.title}</Typography>
      </Box>
    </Box>
  )
}
