import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Button, Divider, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
export default function Profile() {
  const { user } = useParams();

  const logged_user = useSelector((state) => state.user);

  const follow_edit_btn = () => {
    if (user === logged_user) {
      return(
        <Button
              variant="outlined"
              sx={{
                width: '50%',
                backgroundColor: 'white',
                margin: '0 auto',
                color: 'black',
                '&:hover': {
                  backgroundColor: 'black',
                  color: 'white'
                },
                border: '1px solid grey'
              }}
              id='follow-btn'
              onClick={() => {
                document.getElementById('follow-loading').classList.toggle('disable');
              }}
            >
              <i style={{ margin: '0 10px' }} id='follow-loading' className="fa-solid fa-spinner fa-spin disable"></i>
              <span>
                Edit Profile
              </span>
            </Button>
      )
    } else {
      return (
        <Button
              variant="outlined"
              sx={{
                width: '50%',
                backgroundColor: 'white',
                margin: '0 auto',
                color: 'black',
                '&:hover': {
                  backgroundColor: 'black',
                  color: 'white'
                },
                border: '1px solid grey'
              }}
              id='follow-btn'
              onClick={() => {
                document.getElementById('follow-loading').classList.toggle('disable');
              }}
            >
              <i style={{ margin: '0 10px' }} id='follow-loading' className="fa-solid fa-spinner fa-spin disable"></i>
              <span>
                Follow
              </span>
            </Button>
      )
    }
  }

  return (
    <>
      <Box sx={{ width: '90%', margin: 'auto' }}>
        <Box sx={{ width: '50%', margin: '2rem auto',
          '@media only screen and (max-width: 1100px)': {
              width: '90%'
          }
        }}>
          <Box display='flex' flexDirection='row' alignItems='center' sx={{
            '@media only screen and (max-width: 530px)': {
              flexDirection: 'column',
              justifyContent: 'center',
            }
          }}>
            <img src='/img/user-default-logo.png' alt='' width='150px'></img>
            <Box margin='2rem 0 2rem 4rem' sx={{
              '@media only screen and (max-width: 530px)': {
                width: '90%',
                margin: 'auto'
              }
            }}>
              <Typography sx={{ fontSize: '35px' }}>{user}</Typography>
              <Typography sx={{ fontSize: '20px' }} color='#757575'>Anirudh Patel</Typography>
              <Typography sx={{ fontSize: '15px' }} color='#757575'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni ex reprehenderit cupiditate odio nulla quo assumenda voluptatibus eius temporibus cum tempore, modi repellendus voluptate!</Typography>
            </Box>
          </Box>
          <Divider variant='middle' />
          <Box width='50%' p='2rem 0' margin='0 auto' display='flex' flexDirection='row' justifyContent='space-around' textAlign='center'
            sx={{
              '@media only screen and (max-width: 530px)': {
                width: '90%'
            }
            }}
          >
            <Box>
              <Typography>100</Typography>
              <Typography color='#757575'>Followers</Typography>
            </Box>
            <Box>
              <Typography>100</Typography>
              <Typography color='#757575'>Following</Typography>
            </Box>
          </Box>
          <Box width='100%' justifyContent='center' display='flex'>
            {follow_edit_btn()}
          </Box>
        </Box>
      </Box>
    </>
  )
}
