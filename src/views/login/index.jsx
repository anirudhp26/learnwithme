import React, { useState } from 'react'
import { Alert, Box, Button, Snackbar, TextField, Typography } from '@mui/material'
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../redux';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Login() {
  const [isLogin, setisLogin] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleloginSubmit = () => {
    Axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { username: username, password: password }).then(async (responce) => {
      document.getElementById('login-loading').classList.toggle('disable');
      if (responce.data.loginStatus) {
        console.log(responce.data);
        dispatch(
          setLogin({
            user: responce.data.user,
            token: responce.data.token,
          })
        )
      } else {
        setError(responce.data.message);
        setOpen(!open)
      }
    }).catch((error) => {
      document.getElementById('signup-loading').classList.toggle('disable');
      setError(error.message);
      setOpen(!open)
    })
  }

  const handlesignupSubmit = () => {
    Axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, { username: username, password: password, name: name, bio: bio }).then(async (responce) => {
      document.getElementById('signup-loading').classList.toggle('disable');
      console.log(responce.data);
      if (responce.data.loginStatus) {
        dispatch(
          setLogin({
            user: responce.data.user,
            token: responce.data.token,
          })
        )
      } else {
        setError(responce.data.message);
        setOpen(!open)
      }
    }).catch((error) => {
      setError(error.message);
      setOpen(!open)
      document.getElementById('signup-loading').classList.toggle('disable');
    })
  }

  return (
    <div style={{ display: 'flex', backgroundColor: '#436efa', width: '100%', height: '100%', margin: 0, justifyContent: 'center', alignItems: 'center' }}>
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
            height='60vh'
            minWidth='320px'
            bgcolor='white'
          >
            <Typography
              letterSpacing='2px'
              sx={{
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
              <TextField id="standard-basic" label="username" color='secondary' variant="standard" onChange={(e) => { setUsername(e.target.value) }} />
              <FormControl variant="standard">
                <InputLabel color='secondary' htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  onChange={(e) => { setPassword(e.target.value) }}
                  color='secondary'
                />
              </FormControl>
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
                handleloginSubmit();
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
            width='40%'
            display='flex'
            flexDirection='column'
            alignItems='center'
            height='90vh'
            bgcolor='white'
            minWidth='320px'
          >
            <Typography
              letterSpacing='2px'
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
              height='55%'
              width='80%'
            >
              <TextField id="standard-basic" label="username" color='secondary' variant="standard" onChange={(e) => { setUsername(e.target.value) }} />
              <TextField id="outlined-basic" label="describe yourself.." color='secondary' variant="outlined" onChange={(e) => { setBio(e.target.value) }} multiline rows='3' />
              <TextField id="standard-basic" label="full Name" color='secondary' variant="standard" onChange={(e) => { setName(e.target.value) }} />
              <FormControl variant="standard">
                <InputLabel color='secondary' htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  onChange={(e) => { setPassword(e.target.value) }}
                  color='secondary'
                />
              </FormControl>
              <FormControl variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  onChange={(e) => { setcPassword(e.target.value) }}
                  color='secondary'
                />
              </FormControl>
            </Box>
            <Button variant="outlined"
              sx={{
                textTransform: 'none',
                margin: '0 0 1rem 0',
                backgroundColor: 'white',
                boxShadow: 'none',
                borderRadius: '0',
                color: 'black',
                '&:hover': {
                  backgroundColor: 'black',
                  color: 'white',
                },
                borderColor: 'black',

              }}
              onClick={() => {
                if (password !== cpassword) {
                  setError("Passwords dosen't match")
                  setOpen(!open)
                } else {
                  handlesignupSubmit();
                  document.getElementById('signup-loading').classList.toggle('disable');
                }

              }}
            >
              <i style={{ margin: '0 10px' }} id='signup-loading' className="fa-solid fa-spinner fa-spin disable"></i>
              <span>
                Sign Up
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
              Already have an Account ?
            </Button>
          </Box>
        </>}
    </div>
  )
}