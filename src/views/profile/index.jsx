import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Button, Divider, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { setBlogs } from '../../redux';
import Blog from '../blog';
export default function Profile() {
  const { user } = useParams();
  const dispatch = useDispatch();
  const logged_user = useSelector((state) => state.user);
  const mode = useSelector((state) => state.mode);
  const blogs = useSelector((state) => state.blogs);
  const [errMessage, seterrMessage] = useState("Couldn't find any Blogs");
  useEffect(() => {
    Axios.post('https://lvm-backend.vercel.app/blog/getBlogbyUser', { user: logged_user._id }).then((responce) => {
      if (responce) {
        dispatch(
          setBlogs({
            blogs: responce.data.blogs
          })
        )
      } else {
        seterrMessage("Couldn't load the blogs right now, please check after some time...")
      }
    })
  }, [logged_user, dispatch])
  const follow_edit_btn = () => {
    if (user === logged_user.username) {
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
        <Box sx={{
          width: '50%', margin: '2rem auto',
          '@media only screen and (max-width: 1100px)': {
            width: '90%'
          }
        }}>
          <Box display='flex' flexDirection='row' alignItems='center' margin='1rem auto' sx={{
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
              <Typography sx={{ fontSize: '20px', marginTop: '1rem' }} color='#757575'>{logged_user.name}</Typography>
              <Typography sx={{ fontSize: '15px', marginTop: '1rem' }} color='#757575'>{logged_user.bio}</Typography>
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
              <Typography color={mode === 'light' ? 'black' : 'white'} fontSize='25px'>impressed <span style={{ fontWeight: '700' }}>{logged_user.impressed.length}</span>  users</Typography>
            </Box>
          </Box>
          <Box width='100%' justifyContent='center' display='flex'>
            {follow_edit_btn()}
          </Box>
        </Box>
      </Box>
      <Divider variant='middle' />
      <Box width={'90%'} height={'50vh'} margin={'2rem auto'}>
        <Typography margin={'2rem 0'} sx={{ fontSize: '2rem' }}>YOUR BLOGS</Typography>
        {blogs.length === 0
          ?
          <Typography>{errMessage}</Typography>
          :
          <>
            {blogs.map((blog) => {
              return (
                <Blog title={blog.title} content={blog.content} user={logged_user} key={blog._id} id={blog._id} />
              )
            })}
          </>
        }
      </Box>
    </>
  )
}
