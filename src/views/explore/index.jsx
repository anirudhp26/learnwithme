import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { Box, InputAdornment, TextField, Typography, useTheme } from '@mui/material'
import Axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Explore() {
    const [users, setUsers] = React.useState([]);
    const navigate = useNavigate();
    const mode = useSelector((state) => state.mode);
    const theme = useTheme();
    const userSearch = (value) => {
        Axios.post(`${process.env.REACT_APP_API_URL}/auth/getUsers`, {
            keyword: value,
        })
            .then((responce) => {
                setUsers(responce.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleSearch = (value) => {
        userSearch(value);
    };
    return (
        <>
            <Box width='40%' margin='2rem auto' sx={{ 
                '@media only screen and (max-width: 1200px)': {
                    width: '90%'
                }
            }}>
                <TextField
                    fullWidth
                    id="input-with-icon-textfield"
                    label="Search for Users"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SentimentVerySatisfiedIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ ".Mui-focused": {
                            color: theme.palette.neutral.dark,
                        } 
                    }}
                    variant="outlined"
                    onChange={(e) => {
                        setTimeout(() => {
                            handleSearch(e.target.value);
                        }, 1000);
                    }}
                />

                <Box width={'100%'} margin={'1rem 0'} display='flex' flexDirection='column'>
                    {users.map((user) => {
                        return (
                            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'} width={'70%'} bgcolor={theme.palette.background.default} border={mode === 'light' ? '1px solid black' : '1px solid white'} padding={'1rem'} margin={'1rem auto'} sx={{
                                transition: 'all 0.5s',
                                cursor: 'pointer',
                                '@media only screen and (max-width: 700px)': {
                                    width: '80%',
                                }
                            }} key={user._id} onClick={() => { navigate(`/profile/${user.username}`) }}>
                                <Box width={'30%'} display={'flex'} justifyContent={'center'} sx={{
                                        '@media only screen and (max-width: 700px)': {
                                            width: '50%'
                                        }
                                    }}>
                                    <img src={user.picture === undefined ? '/img/user-default-logo.png' : user.picture} alt='' width='30%' style={{ borderRadius: '50%' }}></img>
                                </Box>
                                <Typography color={theme.palette.neutral.dark} width='35%' display='flex' justifyContent='center'>{user.username}</Typography>
                                <Typography sx={{
                                    '@media only screen and (max-width: 700px)': {
                                        display: 'none'
                                    }
                                }} color={theme.palette.neutral.mediumMain} width='35%' display='flex' justifyContent='center'>{user.name}</Typography>
                            </Box>
                        )
                    })}
                </Box>
            </Box>
        </>
    )
}
