import React, { useEffect, useState } from 'react'
import { Alert, Box, Button, Snackbar, TextField, Typography } from '@mui/material'
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../../redux';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const [isLogin, setisLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const token = useSelector((state) => state.token);
  useEffect(() => { 
    if (token != null) {
      navigate('/home');
    }
  })
  const dispatch = useDispatch();
  const navigate  = useNavigate();
  const handleSubmit = () => {
    Axios.post("https://backend-sm.vercel.app/auth/login", {username: username, password: password}).then(async (responce) => {
      if (responce.data) {
        dispatch(
          setLogin({
            user: responce.data.user,
            token: responce.data.token,
          })
        )
        document.getElementById('login-loading').classList.toggle('disable');
        navigate('/home');
      } else{
        console.log(responce);
        document.getElementById('login-loading').classList.toggle('disable');
      }
  })
  }

  return (
    <div style={{display: 'flex', backgroundColor: '#436efa', width: '100%', height: '100%', margin: 0}}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      {isLogin ?
        <>
          <Box
            width='30%'
            display='flex'
            flexDirection='column'
            alignItems='center'
            height='65vh'
            borderRadius='5px'
            minWidth='320px'
            margin='10vh auto 0 auto'
            bgcolor='white'
          >
            <Typography
              letterSpacing='2px'
              fontSize='35px'
              fontWeight='600'
              sx={{
                fontFamily: 'Rubik',
                margin: '2rem 0 0 0',
              }}
              paragraph
              className='heading-custom'
            >
              Login
            </Typography>
            <Box
              display='flex'
              flexDirection='column'
              margin='2rem 0'
              justifyContent='space-between'
              height='30%'
              width='80%'
            >
              <TextField id="standard-basic" label="username" variant="standard" onChange={(e) => { setUsername(e.target.value) }} />
              <TextField id="standard-basic" type='password' label="password" variant="standard" onChange={(e) => { setPassword(e.target.value) }} />
            </Box>
            <Button
              variant="outlined"
              sx={{
                width: '50%',
                backgroundColor: 'white',
                margin: '2rem auto',
                color: 'black',
                '&:hover': {
                  backgroundColor: 'black',
                  color: 'white'
                },
                border: '1px solid grey'
              }}
              id='follow-btn'
              onClick={() => {
                handleSubmit();
                document.getElementById('login-loading').classList.toggle('disable');
              }}
            >
              <i style={{ margin: '0 10px' }} id='login-loading' className="fa-solid fa-spinner fa-spin disable"></i>
              <span>
                Login
              </span>
            </Button>
            <Button variant='primary'
              sx={{
                textTransform: 'none',
                color: 'grey'
              }}
              onClick={() => {
                setisLogin(!isLogin)
              }}
            >
              Don't have an Account ?
            </Button>
          </Box>
        </>
        :
        <>
          <Box
            width='30%'
            display='flex'
            flexDirection='column'
            alignItems='center'
            top='15vh'
            borderRadius='5px'
            height='75vh'
            bgcolor='white'
            minWidth='320px'
            margin='10vh auto 0 auto'
          >
            <Typography
              letterSpacing='2px'
              fontSize='35px'
              fontWeight='600'
              sx={{
                margin: '2rem 0 0 0'
              }}
              paragraph
              className='heading-custom'
            >
              Sign Up
            </Typography>
            <Box
              display='flex'
              flexDirection='column'
              margin='2rem 0'
              justifyContent='space-between'
              height='45%'
              width='80%'
            >
              <TextField id="standard-basic" label="full Name" variant="standard" onChange={(e) => { setName(e.target.value) }} />
              <TextField id="standard-basic" label="username" variant="standard" onChange={(e) => { setUsername(e.target.value) }} />
              <TextField id="standard-basic" type='password' label="password" variant="standard" onChange={(e) => { setPassword(e.target.value) }} />
              <TextField id="standard-basic" type='password' label="confirm password" variant="standard" onChange={(e) => { setcPassword(e.target.value) }} />
            </Box>
            <Button variant="outlined"
              sx={{
                textTransform: 'none',
                margin: '2rem 0',
                backgroundColor: 'white',
                boxShadow: 'none',
                color: 'black',
                '&:hover': {
                  backgroundColor: 'black',
                  color: 'white',
                }
              }}
              onClick={() => {
                setLoading(!loading)
                if (password !== cpassword) {
                  setError("Passwords dosen't match")
                  setOpen(!open)
                }
              }}
            >
              <span>
                <i class="fa-solid fa-loader fa-spin text-black"></i>
              </span>
              Sign Up
            </Button>
            <Button variant='primary'
              sx={{
                textTransform: 'none',
                color: 'grey'
              }}
              onClick={() => {
                setisLogin(!isLogin)
              }}
            >
              Already have an Account ?
            </Button>
          </Box>
        </>}
    </div>
  )
}
